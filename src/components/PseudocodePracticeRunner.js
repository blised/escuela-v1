"use client";
import { useState, useEffect } from "react";

export default function PseudocodePracticeRunner({ practica }) {
    const bloques = practica.bloques; // array de {id, texto}
    const solucion = practica.solucion; // array de ids en orden correcto

    const [disponibles, setDisponibles] = useState([...bloques]);
    const [seleccionados, setSeleccionados] = useState([]);
    const [resultado, setResultado] = useState(null); // "correcto" | "incorrecto" | null
    const [intentos, setIntentos] = useState(0);

    function agregarBloque(bloque) {
        setDisponibles((prev) => prev.filter((b) => b.id !== bloque.id));
        setSeleccionados((prev) => [...prev, bloque]);
        setResultado(null);
    }

    function quitarBloque(bloque) {
        setSeleccionados((prev) => prev.filter((b) => b.id !== bloque.id));
        setDisponibles((prev) => [...prev, bloque]);
        setResultado(null);
    }

    function moverArriba(index) {
        if (index === 0) return;
        const nuevo = [...seleccionados];
        [nuevo[index - 1], nuevo[index]] = [nuevo[index], nuevo[index - 1]];
        setSeleccionados(nuevo);
        setResultado(null);
    }

    function moverAbajo(index) {
        if (index === seleccionados.length - 1) return;
        const nuevo = [...seleccionados];
        [nuevo[index], nuevo[index + 1]] = [nuevo[index + 1], nuevo[index]];
        setSeleccionados(nuevo);
        setResultado(null);
    }

    function validar() {
        if (seleccionados.length !== solucion.length) {
        setResultado("incompleto");
        return;
        }

        const respuesta = seleccionados.map((b) => b.id);
        const correcto = respuesta.join(",") === solucion.join(",");
        setResultado(correcto ? "correcto" : "incorrecto");
        setIntentos((prev) => prev + 1);
    }

    function resetear() {
        setDisponibles([...bloques]);
        setSeleccionados([]);
        setResultado(null);
    }

    return (
        <div className="practica-container">
        {/* Info */}
        <div className="practica-info">
            <h1 className="practica-titulo">{practica.titulo}</h1>
            {practica.objetivo && (
            <p className="practica-objetivo">
                <span className="font-semibold">Objetivo:</span> {practica.objetivo}
            </p>
            )}
            {practica.descripcion && (
            <p className="practica-descripcion">{practica.descripcion}</p>
            )}
        </div>

        <div className="pseudo-layout">
            {/* Bloques disponibles */}
            <div className="pseudo-panel">
            <h2 className="pseudo-panel-titulo">Bloques disponibles</h2>
            <p className="pseudo-panel-hint">
                Haz click para agregar al algoritmo
            </p>

            <div className="pseudo-bloques-lista">
                {disponibles.length === 0 ? (
                <p className="pseudo-vacio">Todos los bloques fueron usados</p>
                ) : (
                disponibles.map((bloque) => (
                    <button
                    key={bloque.id}
                    onClick={() => agregarBloque(bloque)}
                    className="pseudo-bloque-disponible"
                    >
                    {bloque.texto}
                    </button>
                ))
                )}
            </div>
            </div>

            {/* Algoritmo armado */}
            <div className="pseudo-panel">
            <h2 className="pseudo-panel-titulo">Tu algoritmo</h2>
            <p className="pseudo-panel-hint">
                Ordena los bloques con las flechas
            </p>

            <div className="pseudo-bloques-lista">
                {seleccionados.length === 0 ? (
                <p className="pseudo-vacio">
                    Agrega bloques desde la izquierda
                </p>
                ) : (
                seleccionados.map((bloque, index) => (
                    <div key={bloque.id} className="pseudo-bloque-seleccionado">
                    <div className="pseudo-bloque-controles">
                        <button
                        onClick={() => moverArriba(index)}
                        disabled={index === 0}
                        className="pseudo-flecha"
                        >
                        ▲
                        </button>
                        <button
                        onClick={() => moverAbajo(index)}
                        disabled={index === seleccionados.length - 1}
                        className="pseudo-flecha"
                        >
                        ▼
                        </button>
                    </div>

                    <span className="pseudo-bloque-texto">{bloque.texto}</span>

                    <button
                        onClick={() => quitarBloque(bloque)}
                        className="pseudo-quitar"
                    >
                        ✕
                    </button>
                    </div>
                ))
                )}
            </div>
            </div>
        </div>

        {/* Botones */}
        <div className="practica-botones">
            <button onClick={validar} className="practica-ejecutar">
            ✓ Validar algoritmo
            </button>
            <button onClick={resetear} className="practica-resetear">
            ↺ Resetear
            </button>
            {intentos > 0 && (
            <span className="pseudo-intentos">Intentos: {intentos}</span>
            )}
        </div>

        {/* Resultado */}
        {resultado && (
            <div className={`practica-resultado ${
            resultado === "correcto" ? "practica-correcto" : "practica-incorrecto"
            }`}>
            {resultado === "correcto" && (
                <>
                <p>✅ ¡Correcto! El algoritmo está bien ordenado.</p>
                {practica.retroalimentacion && (
                    <p className="mt-1 text-sm">{practica.retroalimentacion}</p>
                )}
                </>
            )}
            {resultado === "incorrecto" && (
                <p>❌ El orden no es correcto. Revisa la lógica e intenta de nuevo.</p>
            )}
            {resultado === "incompleto" && (
                <p>⚠️ Faltan bloques. Usa todos los bloques disponibles.</p>
            )}
            </div>
        )}
        </div>
    );
}