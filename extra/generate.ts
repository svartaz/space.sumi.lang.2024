import dic from '../lib/lexicology';
import { compare } from '../lib/phonology';
import { writeFile } from 'node:fs';

writeFile(
  'dic.json',
  JSON.stringify(
    Object.fromEntries(
      [...dic.entries()].sort(([, a], [, b]) => compare(a.token, b.token))
    ),
    null,
    2
  ),
  (err) => {
    console.error(err);
  }
);
