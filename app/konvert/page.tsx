'use client';

import Main from "@/components/main";
import dict, { literal } from "../leksikon/dict";
import FontCustom from "../font-custom";
import { useState } from "react";

const translate = (s: string): string =>
  [...dict.keys()]
    .sort((k, k1) => k.length - k1.length)
    .reduce((acc, k) => acc.replace(new RegExp('(?<![A-Za-z])' + k + '(?![A-Za-z])', 'g'), dict.get(k)!.signifier), s)
    .replace(/ '/g, `'`)
    .replace(/ -/g, `-`)
    .replace(/\*[A-Z]+/g, literal)
  ;

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