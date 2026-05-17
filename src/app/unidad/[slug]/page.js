// app/unidad/[slug]/page.js
import UnidadClient from "@/components/UnidadClient";
import { getUnidadBySlug } from "@/data/unidades";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";


export default async function UnidadPage({ params }) {
  const { slug } = await params;
  // const unidad = getUnidadBySlug(slug); // Data from UnidadCliente on components
  const supabase = await createClient();
  // ...

  const {data:unidad} = await supabase
  .from ("unidades")
  .select(`*, temas(*)`)
  .eq("slug", slug)
  .order("orden", {referencedTable: "temas"})
  .single();


  // if it didnt find anything
  if (!unidad) {
    notFound(); //returns 404
  }

  return (
    // <main>
    //   <h1>{unidad.titulo}</h1>
    //   <p>{unidad.descripcion}</p>
    // </main>
    <UnidadClient unidad={unidad} />
  );
}