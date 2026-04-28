"use client";
import { useState } from "react";
import Sidebar from "./Sidebar";
import PDFviewer from "./PDFviewer";

export default function UnidadClient({ unidad }){

    const [temaActivo, setTemaActivo] = useState(unidad.temas[0] ?? null);

    return(

      <div className="Unidad-layout">
        <Sidebar 
          unidad={unidad}
          temaActivo={temaActivo}
          onSelectTema={setTemaActivo}
        />
        <main className="pdf1">
            <div className="pdf1-page">
                <PDFviewer tema={temaActivo} />
            </div>
        </main>
      </div>
    );
}
