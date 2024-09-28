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
  [/[BCDFHJKLMNPRSTVXZ]/g, it => it.toLowerCase() + 'a'],
  [/G/g, 'ni'],
  [/Q/g, 'ku'],

  [/Y/g, 'ju'],
  [/W/g, 'vi'],

  [/I/g, 'ji'],
  [/E/g, 'je'],
  [/A/g, 'ga'],
  [/O/g, 'go'],
  [/U/g, 'gu'],
]);