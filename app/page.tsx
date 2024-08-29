'use client';

import Main from "@/components/main";
import { name } from "./dict";

export default function Root() {
  return <Main title={name}>
    <p>{name}は</p>
  </Main>
};