import { fromDate } from "@/lib/time";

export default function Day(props: { children: string, style?: CSSPropertyRule }) {
  return <span style={{ inlineSize: 'fit-content', blockSize: 'fit-content', ...props.style || {} }}>
    {fromDate(props.children ? new Date(props.children) : null).text}
  </span>;
}