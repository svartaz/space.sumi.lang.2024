import Font from "@/components/font";
import { replaceAll } from "@/lib/sundry";
import { CSSProperties } from "react";

export default (props: { children: string, style?: CSSProperties }) =>
  <Font style={props?.style || {}}>{replaceAll(props.children, [
    [/-/g, ''],
    [/ǝ/g, 'E'],
    [/ø/g, 'O'],
    [/ṅ/g, 'N'],
    [/ḋ/g, 'D'],
    [/k/g, 'T'],
    [/q/g, 'k'],
    [/q/g, 'k'],
    [/x/g, 'S'],
    [/h/g, 'x'],
    [/j/g, 'Z'],
    [/(?<=[ieaou])i/g, 'j'],
    [/(?<=[ieaou])u/g, 'w'],
  ])}</Font>