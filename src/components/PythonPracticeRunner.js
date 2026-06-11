"use client";
import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";

export default function PythonPracticeRunner({ practica }) {
    const [code, setCode] = useState(practica.codigo_inicial);
    const [output, setOutput] = useState("");
    const [pyodide, setPyodide] = useState(null);
    const [loadingPy, setLoadingPy] = useState(true);
    const [ejecutando, setEjecutando] = useState(false);
    const [resultado, setResultado] = useState(null); // "correcto" | "incorrecto" | null

    useEffect(() => {
        async function cargarPyodide() {
        if (window.pyodide) {
            setPyodide(window.pyodide);
            setLoadingPy(false);
            return;
        }

        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/pyodide/v0.29.4/full/pyodide.js";
        script.onload = async () => {
            const py = await window.loadPyodide();
            window.pyodide = py; // guardar globalmente para no recargar
            setPyodide(py);
            setLoadingPy(false);
        };
        document.body.appendChild(script);
        }

        cargarPyodide();
    }, []);

    async function ejecutarCodigo() {
        if (!pyodide) return;
        setEjecutando(true);
        setOutput("");
        setResultado(null);

        let capturedOutput = "";

        pyodide.setStdout({
        batched: (text) => {
            capturedOutput += text + "\n";
        },
        });

        pyodide.setStdin({
        stdin: () => prompt("Ingresa el dato solicitado:") ?? "",
        });

        try {
        await pyodide.runPythonAsync(code);
        const outputLimpio = capturedOutput.trim();
        setOutput(capturedOutput || "El programa se ejecutó sin salida.");

        // Verificar si coincide con la salida esperada
        if (practica.salida_esperada) {
            const esperada = practica.salida_esperada.trim().toLowerCase();
            const obtenida = outputLimpio.toLowerCase();
            setResultado(obtenida.includes(esperada) ? "correcto" : "incorrecto");
        }

        } catch (error) {
            setOutput("❌ Error:\n" + String(error));
            setResultado("incorrecto");
        }

        setEjecutando(false);
    }

    function resetearCodigo() {
        const confirmar = confirm("¿Resetear el código al inicial?");
        if (confirmar) {
            setCode(practica.codigo_inicial);
            setOutput("");
            setResultado(null);
        }
    }

    return (
        <div className="practica-container">
        {/* Info de la práctica */}
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
            {practica.salida_esperada && (
            <p className="practica-salida-esperada">
                <span className="font-semibold">Salida esperada:</span>{" "}
                {practica.salida_esperada}
            </p>
            )}
        </div>

        {/* Editor */}
        <div className="practica-editor">
            <Editor
            height="350px"
            language="python"
            value={code}
            onChange={(value) => setCode(value ?? "")}
            theme="vs-dark"
            options={{
                fontSize: 14,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
            }}
            />
        </div>

        {/* Botones */}
        <div className="practica-botones">
            <button
            onClick={ejecutarCodigo}
            disabled={loadingPy || ejecutando}
            className="practica-ejecutar"
            >
            {loadingPy
                ? "Cargando Python..."
                : ejecutando
                ? "Ejecutando..."
                : "▶ Ejecutar código"}
            </button>

            <button
            onClick={resetearCodigo}
            className="practica-resetear"
            >
            ↺ Resetear
            </button>
        </div>

        {/* Resultado */}
        {resultado && (
            <div className={`practica-resultado ${
            resultado === "correcto" ? "practica-correcto" : "practica-incorrecto"
            }`}>
            {resultado === "correcto"
                ? "✅ ¡Correcto! La salida coincide con la esperada."
                : "❌ La salida no coincide con la esperada. Intenta de nuevo."}
            </div>
        )}

        {/* Salida */}
        {output && (
            <div className="practica-output">
            <h2 className="practica-output-titulo">Salida:</h2>
            <pre className="practica-output-texto">{output}</pre>
            </div>
        )}
        </div>
    );
}