"use client";
import { useState } from "react";
import Sidebar from "./Sidebar";
import PDFviewer from "./PDFviewer";
import { useUser } from "@/hooks/useUser";

export default function UnidadClient({ unidad }){

    const [temaActivo, setTemaActivo] = useState(unidad.temas[0] ?? null);
    const {isAdmin} = useUser();

    return(

      <div className="Unidad-layout">
        <Sidebar 
          unidad={unidad}
          temaActivo={temaActivo}
          onSelectTema={setTemaActivo}
          isAdmin={isAdmin}
        />
        <main className="pdf1">
            <div className="pdf1-page">
                <PDFviewer 
                  tema={temaActivo} 
                  isAdmin={isAdmin}
                  unidadId={unidad.id}
                />
            </div>
        </main>
      </div>
    );
}
