'use client';

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import tocbot from "tocbot";
import { Tags } from "./section";

export default (props) => {
  const path = usePathname();

  useEffect(() => {
    tocbot.init({
      contentSelector: 'main',
      headingSelector: 'h3',
      hasInnerContainers: true,
      scrollContainer: 'main',
    })
    return () => tocbot.destroy()
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
