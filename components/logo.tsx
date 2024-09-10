const strokeWidth = 1 / 2;

const x = .25
const y = x;
const w = 2.5
const h = w

export default (props) => <svg viewBox={`${x} ${y} ${w} ${h}`} {...props}>
  <g
    fill='none'
    stroke='black'
    strokeWidth={strokeWidth}
    strokeLinecap='round'
    strokeLinejoin='round'
    transform='translate(.5,.5)'>
    <path d='M0 0l2 0' />

    <path d='M.75 1l-.75 0l0 1l.75 0' />
    <path d='M1.25 1l.75 0' />
    <path d='M1.25 2l.75 0' />
  </g>
</svg>