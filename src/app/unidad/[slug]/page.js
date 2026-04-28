// app/unidad/[slug]/page.js
import { getUnidadBySlug } from "@/data/unidades";
import { notFound } from "next/navigation";

export default async function UnidadPage({ params }) {
  const { slug } = await params;
  const unidad = getUnidadBySlug(slug);
  // ...


  // if it didnt find anything
  if (!unidad) {
    notFound(); //returns 404
  }

  return (
    <main>
      <h1>{unidad.titulo}</h1>
      <p>{unidad.descripcion}</p>
    </main>
  );
}