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
  K: [2, 5, 0, 1],
  k: [0, 5, 2],
  T: [5, 0, 2, 4],
  t: [2, 0, 5],
  P: [0, 2, 5, 3],
  p: [5, 2, 0],

  C: [2, 5, 0, 1, 4],
  c: [0, 5, 2, 1, 3],
  D: [5, 0, 2, 4, 3],
  d: [2, 0, 5, 4, 1],
  B: [0, 2, 5, 3, 1],
  b: [5, 2, 0, 3, 4],

  G: [0, 5, 4, 1, 4, 2],
  g: [2, 5, 3, 1, 3, 0],
  N: [2, 0, 3, 4, 3, 5],
  n: [5, 0, 1, 4, 1, 2],
  M: [5, 2, 1, 3, 1, 0],
  m: [0, 2, 4, 3, 4, 5],

  X: [0, 5, 4, 1, 2],
  x: [2, 5, 3, 1, 0],
  S: [2, 0, 3, 4, 5],
  s: [5, 0, 1, 4, 2],
  F: [5, 2, 1, 3, 0],
  f: [0, 2, 4, 3, 5],

  H: [0, 5, 2, 1, 4],
  h: [2, 5, 0, 1, 3],
  Z: [2, 0, 5, 4, 3],
  z: [5, 0, 2, 4, 1],
  V: [5, 2, 0, 3, 1],
  v: [0, 2, 5, 3, 4],

  j: [2, 0, 1, 4, 3, 5],
  r: [5, 0, 3, 4, 1, 2],
  w: [0, 2, 1, 3, 4, 5],

  l: [5, 0, 2, 5],
};

/*
  0
 1 2
3 4 5
*/

const vowelPointToCoord = [
  [2, 0],
  [1, 2],
  [3, 2],
  [0, 4],
  [2, 4],
  [4, 4],
];

const vowels = {
  a: [3, 0, 5],
  A: [3, 1, 4, 1, 0, 5],

  e: [5, 0, 3, 4],
  E: [5, 0, 3, 4, 1],
  o: [3, 0, 5, 4],
  O: [3, 0, 5, 4, 2],

  i: [0, 3, 5],
  I: [0, 1, 2, 1, 3, 5],
  u: [0, 5, 3],
  U: [3, 1, 4, 1, 0, 5],
};

export const Letter = (props) => {
  const nx = Math.max(
    ...props.children.split('\n').map((line) => {
      let x = 0;
      let before = '';

      for (const c of [...line])
        switch (c) {
          case ' ':
            x += 2;
            before = ' ';
            break;
          default:
            if (c in consonants) {
              if (before === 'C') x += 1;
              else if (before === 'V') x += -0.5;

              x += 4;
              before = 'C';
            } else if (c in vowels) {
              if (x === 0) 0;
              else if (before === 'C') x -= 0.5;
              else if (before === 'V') x += 1;
              else x += 1;

              x += 4;
              before = 'V';
            }
        }

      return x;
    })
  );
  const ny = props.children.split('\n').length;

  let x = 0;
  let y = 0;
  let before: '' | ' ' | 'C' | 'V' = '';

  let marginY = 2;

  const strokeWidth = 1 / 2;
  return (
    <svg
      title={props.title}
      viewBox={`${-strokeWidth} ${-strokeWidth} ${nx + strokeWidth * 2} ${
        ny * 4 + (ny - 1) * marginY + strokeWidth * 2
      }`}
      width={`${nx / 6}rem`}
      style={props.style}
      {...props}
    >
      <g
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        strokeLinecap="round"
        fill="none"
      >
        {[...props.children].map((c) => {
          switch (c) {
            case '\n':
              x = 0;
              y += 4 + marginY;
              before = '';
              break;
            case ' ':
              x += 2;
              before = ' ';
              break;
            default:
              if (c in consonants) {
                if (x === 0) 0;
                else if (before === 'C') x += 1;
                else if (before === 'V') x += -0.5;

                const path = (
                  <path
                    d={
                      'M' +
                      consonants[c]
                        .map((p) => {
                          const [dx, dy] = consonantPointToCoord[p];
                          return `${x + dx} ${y + dy}`;
                        })
                        .join('L')
                    }
                  />
                );

                x += 4;
                before = 'C';
                return path;
              } else if (c in vowels) {
                if (x === 0) 0;
                else if (before === 'C') x -= 0.5;
                else if (before === 'V') x += 1;

                const path = (
                  <path
                    d={
                      'M' +
                      vowels[c]
                        .map((p) => {
                          const [dx, dy] = vowelPointToCoord[p];
                          return `${x + dx} ${y + dy}`;
                        })
                        .join('L')
                    }
                  />
                );

                x += 4;
                before = 'V';
                return path;
              }
          }
        })}
      </g>
    </svg>
  );
};
