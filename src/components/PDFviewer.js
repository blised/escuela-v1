export default function PDFviewer({tema}){

    if (!tema) {
        return (
        <div className="pdf-div1">
            Selecciona un tema para ver el contenido.
        </div>
        );
    }

    return(
        <div className="pdf-div2">
            <h2 className="pdf-titulo1">{tema.titulo}</h2>

            {tema.descripcion && (
                <p className="pdf-descripcion1">{tema.descripcion}</p>
            )}
            <a
                href={tema.pdf}
                download
                className="pdf-download-btt" 
            > Descargar PDF</a>
            <object
                key={tema.id}
                data={tema.pdf}
                type="application/pdf"
                className="pdf-view1"
            >
                <p>
                No se pudo mostrar el PDF.{" "}
                {/* <a href={tema.pdf} target="_blank">
                    Abrir PDF
                </a> */}
{/* borrar esto luego */}
                </p>
            </object>
        </div>
    );
}