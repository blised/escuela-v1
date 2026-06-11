"use client";
import { useState } from "react";
import Sidebar from "./Sidebar";
import PDFviewer from "./PDFviewer";
import { useUser } from "@/hooks/useUser";
import PythonPracticeRunner from "./PythonPracticeRunner";
import PseudocodePracticeRunner from "./PseudocodePracticeRunner";

export default function UnidadClient({ unidad }){

    const [temaActivo, setTemaActivo] = useState(unidad.temas[0] ?? null);
    const [practicaActiva, setPracticaActiva] = useState(null);
    const [tipoPractica, setTipoPractica] = useState(null); // "python" | "pseudo"
    const {isAdmin, loading} = useUser();

    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          Cargando permisos...
        </div>
      );
    }

    function seleccionarTema(tema) {
      setPracticaActiva(null); // limpiar práctica al cambiar tema
      setTipoPractica(null);
      setTemaActivo(tema);
    }

    function seleccionarPractica(practica, tipo) {
      setTemaActivo(null); // limpiar tema al ver práctica
      setPracticaActiva(practica);
      setTipoPractica(tipo);
    }

    return(
      <div className="Unidad-layout">
        <Sidebar 
          unidad={unidad}
          temaActivo={temaActivo}
          PracticaActiva={practicaActiva}
          onSelectTema={seleccionarTema}
          onSelectPractica={seleccionarPractica}
          isAdmin={isAdmin}
        />
        <main className="pdf1">
            <div className="pdf1-page">
              {practicaActiva && tipoPractica === "python" && (
                <PythonPracticeRunner practica={practicaActiva} />
              )}
              {practicaActiva && tipoPractica === "pseudo" && (
                <PseudocodePracticeRunner practica={practicaActiva} />
              )}
              {!practicaActiva && (
                <PDFviewer
                  tema={temaActivo}
                  isAdmin={isAdmin}
                  unidadId={unidad.id}
                />
              )}
            </div>
        </main>
      </div>
    );
}
