import { ReactNode } from "react";

export default function Font(props: any) {
  const strokeWidth = 1 / 3;
  const widthPerHeight = 3 / 4;
  const spacePerNormal = 1;

  const svgProps = {
    viewBox: `${- strokeWidth} ${-2 - strokeWidth / 2} ${2 * widthPerHeight + strokeWidth * 2} ${5 + strokeWidth}`,
    style: { display: 'inline', overflow: 'visible', inlineSize: 'fit-content', blockSize: '2.5ex', verticalAlign: '-20%' }
  };

  const pathProps = {
    stroke: 'currentColor',
    strokeWidth,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    fill: 'none',
  };


  const f = s => s.replace(/\d+(?= \d+)/g, x => `${parseInt(x) * widthPerHeight}`)

  const shapes = new Map<string, ReactNode[]>(Object.entries({
    ' ': [<path {...pathProps} d={f('M1 1Z')} />],
    '◌': [<path {...pathProps} d={f('M0 0L2 0L2 2L0 2Z')} />],

    g: [<path {...pathProps} d={'M0 0L2 0L0 2'} />],
    N: [<path {...pathProps} d={f('M0 0L0 2L2 0')} />],
    n: [<path {...pathProps} d={f('M0 2L2 0L2 2')} />],
    m: [<path {...pathProps} d={f('M2 0L0 2L2 2')} />],

    l: [<path {...pathProps} d={f('M2 0L0 2L0 0L2 0L2 2L0 2')} />],

    c: [<path {...pathProps} d={f('M0 2L0 0L2 0L2 2')} />],
    D: [<path {...pathProps} d={f('M2 2L0 2L0 0L2 0')} />],
    d: [<path {...pathProps} d={f('M0 0L2 0L2 2L0 2')} />],
    b: [<path {...pathProps} d={f('M2 0L2 2L0 2L0 0')} />],

    k: [<path {...pathProps} d={f('M0 2L0 0L2 0')} />],
    T: [<path {...pathProps} d={f('M2 2L0 2L0 0')} />],
    t: [<path {...pathProps} d={f('M0 0L2 0L2 2')} />],
    p: [<path {...pathProps} d={f('M2 0L2 2L0 2')} />],

    x: [<path {...pathProps} d={f('M2 0L0 0L0 2L2 0Z')} />],
    S: [<path {...pathProps} d={f('M0 0L0 2L2 2')} />, <path {...pathProps} d={f('M2 0L0 2')} />],
    s: [<path {...pathProps} d={f('M0 0L2 0L2 2')} />, <path {...pathProps} d={f('M2 0L0 2')} />],
    f: [<path {...pathProps} d={f('M0 2L2 2L2 0L0 2Z')} />],

    h: [<path {...pathProps} d={f('M2 2L2 0L0 0L0 2L2 0')} />],
    Z: [<path {...pathProps} d={f('M2 2L0 2L0 0L2 0L0 2')} />],
    z: [<path {...pathProps} d={f('M0 0L2 0L2 2L0 2L2 0')} />],
    v: [<path {...pathProps} d={f('M0 0L0 2L2 2L2 0L0 2')} />],

    j: [<path {...pathProps} d={f('M0 0L2 0L0 2L2 2')} />],
    r: [<path {...pathProps} d={f('M2 0L0 2')} />],
    w: [<path {...pathProps} d={f('M0 0L0 2L2 0L2 2')} />],

    a: [<path {...pathProps} d={f('M0 3L2 3')} />],
    i: [<path {...pathProps} d={f('M1 2L0 3')} />],
    y: [<path {...pathProps} d={f('M0 3L1 2L2 3')} />],
    u: [<path {...pathProps} d={f('M1 2L2 3')} />],

    E: [<path {...pathProps} d={f('M1 3L1 3')} />],
    e: [<path {...pathProps} d={f('M1 2L0 3L2 3')} />],
    O: [<path {...pathProps} d={f('M0 3L1 2L2 3Z')} />],
    o: [<path {...pathProps} d={f('M1 2L2 3L0 3')} />],
  }));

  const s = props.children.toString();
  let i = 0;
  const svgs: ReactNode[] = [];

  while (i < s.length) {
    if (s[i] === ' ') {
      svgs.push(
        <svg key={i} {...svgProps} viewBox={`${- strokeWidth} ${-2 - strokeWidth / 2} ${(2 * widthPerHeight + strokeWidth * 2) * spacePerNormal} ${5 + strokeWidth}`}>
          {shapes.get(s[i])}
        </svg>
      )
      i += 1;
    } else if (i + 1 < props.children.length && /[gNnmrlkTtpcDdbxSsfhZzvjw][aiyuEeOo]/.test(s[i] + s[i + 1])) {
      svgs.push(
        <svg key={i} {...svgProps}>
          {[...shapes.get(s[i])!, ...shapes.get(s[i + 1])!]}
        </svg>
      )
      i += 2;
    } else if (/[aiyuEeOo]/.test(s[i])) {
      svgs.push(
        <svg key={i} {...svgProps}>
          {[...shapes.get('◌')!, ...shapes.get(s[i])!]}
        </svg>
      )
      i++;
    } else if (shapes.has(s[i])) {
      svgs.push(
        <svg key={i} {...svgProps}>
          {shapes.get(s[i])}
        </svg>
      )
      i++;
    } else if (s[i] === '\n') {
      svgs.push(
        <br key={i} />
      )
      i++;
    } else {
      <span key={i} >{s[i]}</span>
      i++;
    }
  }

  return <span style={{ inlineSize: 'fit-content', display: 'inline' }}>
    {svgs}
  </span>
};