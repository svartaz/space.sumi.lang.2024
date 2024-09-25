'use client';

import { ReactNode, useEffect } from "react";
import { Tags } from "./section";
import { destroy, init } from "tocbot";

export default (props: { children: ReactNode, title: string, tags?: string[] }) => {
  useEffect(() => {
    init({
      contentSelector: 'main',
      headingSelector: 'h3',
      hasInnerContainers: true,
      scrollContainer: 'main',
    })
    return () => destroy()
  }, []);

  return <main {...props}>
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div>
        <h2>{props.title || ''}</h2>
      </div>
      <Tags data={props.tags || []} />
    </div>

    {props.children}
  </main>
};
