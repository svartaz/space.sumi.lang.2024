import { ReactNode } from "react";

export const Faint = (props: { children: ReactNode }) =>
  <span style={{ fontSize: 'smaller', opacity: 1 / 4 }}>{props.children}</span>
