import { ReactNode } from "react";

export const Faint = (props: { children: ReactNode }) =>
  <span style={{ fontSize: 'smaller', opacity: .6 }}>{props.children}</span>
