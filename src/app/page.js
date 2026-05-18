// src/app/page.js
import UnitCard from "@/components/UnitCard";
// import { unidades } from "@/data/unidades";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import HomeClient from "@/components/HomeClient";

export default async function Home() {
  const supabase = await createClient();

  const {data:unidades} = await supabase
  .from("unidades")
  .select("*")
  .order("orden");

  return (
    <HomeClient unidades={unidades ?? []} />
  );
}