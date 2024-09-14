'use client';

import Main from "@/components/main";
import FontCustom from "../font-custom";
import { useState } from "react";
import translate from "./translate";

export default function Konvert() {
  const [translated, setTranslated] = useState('');

  return <Main title='變換'>
    <div style={{ display: 'grid', gap: '1em', gridTemplateColumns: '1fr 1fr' }}>
      <textarea style={{ blockSize: '8em', font: 'inherit', borderColor: 'currentColor' }}
        onInput={(event) => {
          setTranslated(translate((event.target as HTMLTextAreaElement).value));
        }} />
      <textarea style={{ blockSize: '8em', font: 'inherit', borderColor: 'currentColor' }} value={translated} readOnly />
      <div style={{ fontSize: '200%', inlineSize: 'fit-content' }}>
        <FontCustom style={{ blockSize: 'fit-content', inlineSize: 'fit-content', gridColumn: '1/3' }}>
          {translated.replace(/[A-Za-z-]+/g, it => it.replace(/-/, ''))}
        </FontCustom>
      </div>
    </div>
  </Main>
};