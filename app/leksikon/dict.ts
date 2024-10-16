import dictObj from "./dictObj";
import { EntryCore, EntryPre, Formation } from "./common";
import { phonemes, phonotactics } from "../phonology/page";

/* eslint-disable @typescript-eslint/no-unused-vars */
const compare = (a: string, b: string): number => {
  for (let i = 0; i < Math.min(a.length, b.length); i++) {
    if (a[i] === b[i])
      continue;
    else
      return (phonemes + ' ').indexOf(a[i]) - (phonemes + ' ').indexOf(b[i]);
  }

  return a.length - b.length;
};

const entries: [string, EntryPre][] = Object.entries(dictObj)
  // set formation
  .map(([k, v]) =>
    'formation' in v
      ? [k, v as EntryPre]
      : typeof v.signifier === 'string'
        ? [k, { ...v, formation: Formation.Root } as EntryPre]
        : [k, { ...v, formation: Formation.Compound } as EntryPre]
  );

const dictPre = new Map<string, EntryPre>(entries);

// generate compounds and idioms
for (let i = 0; i < dictPre.size; i++)
  for (const [k, v] of dictPre)
    if (Array.isArray(v.signifier)) {
      const components = v.signifier.map(component =>
        /^\$/.test(component)
          ? component.replace(/^\$/, '')
          : dictPre.get(component)?.signifier);

      if (components.every(component => typeof component === 'string')) {
        if (v.etym)
          void 0;
        else if (v.formation === Formation.Compound)
          v.etym = v.signifier.join('+');
        else if (v.formation === Formation.Idiom)
          v.etym = v.signifier.join(' ');

        switch (v.formation) {
          case Formation.Idiom:
            v.signifier = components
              .join(' ')
              .replace(/ -/g, '-');
            break;
          case Formation.Compound:
            v.signifier = components.join('');
        }
        dictPre.set(k, v);
      }
    }

// remove failed compounds and idioms
for (const [k, v] of dictPre)
  if (Array.isArray(v.signifier)) {
    console.log('generation failed', v.signifier);
    dictPre.delete(k);
  }

// phonotactics
for (const [k, v] of dictPre) {
  if (v.formation === Formation.Idiom) continue;

  const fixed = phonotactics(v.signifier as string);
  if (fixed !== v.signifier) {
    console.log('phonotactic conversion:', v?.signifier, fixed);
    v.signifier = fixed;
    dictPre.set(k, v);
  }
};

// phonotactics of roots
for (const [k, v] of dictPre)
  if (v.formation === Formation.Root && v.klass[0] === 'v' && !/^[^ieaou]{1,2}[jv]?[ieaou]{1,2}[jv]??[^ieaou]{1,2}$/.test(v?.signifier as string))
    console.error('root non-CCGVGCC', k, v?.signifier);

// homograph
const entriesP = [...dictPre.entries()];
for (let i = 0; i < dictPre.size; i++)
  for (let j = i + 1; j < dictPre.size; j++) {
    const [k0, v0] = entriesP[i];
    const [k1, v1] = entriesP[j];
    if (v0.signifier === v1.signifier)
      console.error('homograph', v0.signifier, k0, k1);
  }

interface Entry extends EntryCore {
  signifier: string;
  formation: Formation;
  etym: string;
}

const dict: Map<string, Entry> =
  new Map(
    Array.from(dictPre.entries())
      .map<[string, Entry]>(([k, v]) => [k,
        (Array.isArray(v.signifier)
          ? { ...v, signifier: 'THIS NEVER OCCURS' }
          : v
        ) as Entry
      ])
  );

export const name: string = dict.get('Self')?.signifier || 'THIS NEVER OCCURS';
export default dict;