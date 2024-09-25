import { ReactNode } from "react";

export const Tags = ({ data }: { data: Array<string> }) =>
  data && data.length != 0
    ? <div className='tags'>{
      data.map((tag, i) => <div className='tag' key={i}>{tag}</div>)
    }</div>
    : <></>;

export default function Section(props: { children: ReactNode, title?: string, tags?: string[] }) {
  return <section>
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      {props.title && <h3 id={props.title}>{props.title}</h3>}
      <Tags data={props.tags || []} />
    </div>
    {props.children}
  </section>
};