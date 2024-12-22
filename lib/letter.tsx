/*
0 1 2
 3 4
  5
*/

const consonantPointToCoord = [
  [0, 0],
  [2, 0],
  [4, 0],
  [1, 2],
  [3, 2],
  [2, 4],
];

const consonants = {
  K: [5, 0, 2, 4],
  k: [2, 0, 5, 4],
  T: [2, 5, 0, 1],
  t: [0, 5, 2, 1],
  P: [0, 2, 5, 3],
  p: [5, 2, 0, 3],

  C: [5, 0, 2, 4, 3],
  c: [2, 0, 5, 4, 1],
  D: [2, 5, 0, 1, 4],
  d: [0, 5, 2, 1, 3],
  B: [0, 2, 5, 3, 1],
  b: [5, 2, 0, 3, 4],

  G: [2, 0, 3, 4, 3, 5],
  g: [5, 0, 1, 4, 1, 2],
  N: [0, 5, 4, 1, 4, 2],
  n: [2, 5, 3, 1, 3, 0],
  M: [5, 2, 1, 3, 1, 0],
  m: [0, 2, 4, 3, 4, 5],

  X: [2, 0, 3, 4, 5],
  x: [5, 0, 1, 4, 2],
  S: [0, 5, 4, 1, 2],
  s: [2, 5, 3, 1, 0],
  F: [5, 2, 1, 3, 0],
  f: [0, 2, 4, 3, 5],

  H: [2, 0, 5, 4, 3],
  h: [5, 0, 2, 4, 1],
  Z: [0, 5, 2, 1, 4],
  z: [2, 5, 0, 1, 3],
  V: [5, 2, 0, 3, 1],
  v: [0, 2, 5, 3, 4],

  //: [2, 0, 3, 4, 5],
  //: [5, 0, 1, 4, 2],
  j: [0, 5, 4, 1, 2],
  r: [2, 5, 3, 1, 0],
  W: [5, 2, 1, 3, 0],
  w: [0, 2, 4, 3, 5],

  l: [0, 5, 2],
};

/*
 0
123
*/

const vowelPointToCoord = [
  [1, 0],
  [0, 2],
  [1, 2],
  [2, 2],
];

const vowels = {
  i: [3, 1, 0],
  U: [3, 1, 0, 2],
  u: [1, 3, 0],
  I: [1, 3, 0, 2],

  e: [3, 0, 1, 2],
  O: [3, 0, 1, 2, 0],
  o: [1, 0, 3, 2],
  E: [1, 0, 3, 2, 0],

  a: [1, 0, 3],
  A: [1, 0, 2, 0, 3],
}

export const Letter = (props) => {
  const nx = Math.max(
    ...props.children
      .split('\n')
      .map((line) => {
        let x = 0;
        let afterConsonant = false;
        let afterVowelSpace = false;

        for (const c of [...line])
          switch (c) {
            case ' ':
              x += 2;
              afterVowelSpace = !afterConsonant;
              afterConsonant = true;
              break;
            default:
              if (c in consonants) {
                x += 4;
                afterConsonant = true
                afterVowelSpace = false;
              } else if (c in vowels) {
                if (x === 0)
                  0;
                else if (afterConsonant && !afterVowelSpace)
                  x -= 1
                else
                  x += 1

                x += 1;
                afterConsonant = false;
              }
          }

        if (!afterConsonant)
          x += 1;

        return x;
      })
  )
  const ny = props.children.split('\n').length

  let x = 0;
  let y = 0;
  let afterConsonant = false;
  let afterVowelSpace = false;

  let marginY = 3;

  const strokeWidth = 1 / 2;
  return <svg title={props.title} viewBox={`${-strokeWidth} ${-strokeWidth} ${nx + strokeWidth * 2} ${ny * (4 + marginY) - 2 + strokeWidth * 2}`} width={`${nx / 4}rem`} {...props} style={{ backgroundColor: 'transparent' }}>
    <g
      stroke='currentColor'
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
      strokeLinecap="round"
      fill='none'
    >
      {
        [...props.children].map((c) => {
          switch (c) {
            case '\n':
              x = 0;
              y += 4 + marginY;
              afterConsonant = false;
              afterVowelSpace = false;
              break;
            case ' ':
              x += 2;
              afterVowelSpace = !afterConsonant;
              afterConsonant = true;
              break;
            default:
              if (c in consonants) {
                const path = <path d={
                  'M' + consonants[c]
                    .map(p => {
                      const [dx, dy] = consonantPointToCoord[p];
                      return `${x + dx} ${y + dy}`;
                    })
                    .join('L')
                } />;

                x += 4;
                afterConsonant = true
                afterVowelSpace = false;
                return path;
              } else if (c in vowels) {
                if (x === 0)
                  0;
                else if (afterConsonant && !afterVowelSpace)
                  x -= 1
                else
                  x += 1

                const path = <path d={
                  'M' + vowels[c]
                    .map(p => {
                      const [dx, dy] = vowelPointToCoord[p];
                      return `${x + dx} ${y + dy + 3}`;
                    })
                    .join('L')
                } />;

                x += 1;
                afterConsonant = false;
                return path
              }
          }
        })
      }
    </g>
  </svg>
};
