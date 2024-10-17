import { replaceAll } from "@/lib/sundry";

export enum Formation {
  Root,
  Compound,
  Idiom,
}

export interface EntryCore {
  date: string;
  klass: string[]
  signified: string;
  etym?: string;
}

export interface EntryPre extends EntryCore {
  signifier: string | string[];
  formation: Formation;
}

export const literal = (s: string): string => replaceAll(s, [
  [/[BCDFGJKLMNPRSTVXZ]/g, it => it.toLowerCase() + 'a'],
  [/Q/g, 'kva'],
  [/Y/g, 'ju'],
  [/W/g, 'vi'],

  [/I/g, 'hvi'],
  [/E/g, 'hve'],
  [/A/g, 'hva'],
  [/O/g, 'hvo'],
  [/U/g, 'hu'],
]);