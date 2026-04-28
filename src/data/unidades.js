
export const unidades = [
    {
        id: 1,
        slug: "unidad-1",
        titulo: 'Unidad 1: Diseño de algoritmos mediante pseudocódigo',
        descripcion: 'dddddddd',
        carpetaPDF: '/pdfs/unidad1',
        temas: [
            {
                id: 'tema-1',
                titulo: 'titulo1',
                descripcion: 'descripcion 1',
                pdf: 'pdfs/unidad1/tema1.pdf',
            },
            {
                id: 'tema-2',
                titulo: 'titulo2',
                descripcion: 'descripcion 2',
                pdf: 'pdfs/unidad1/tema2.pdf',
            },
            {
                id: 'tema-3',
                titulo: 'titulo3',
                descripcion: 'descripcion 3',
                pdf: 'pdfs/unidad1/tema3.pdf',
            },
            {
                id: 'tema-4',
                titulo: 'titulo3',
                descripcion: 'descripcion 3',
                pdf: 'pdfs/unidad1/tema3.pdf',
            },
            {
                id: 'tema-5',
                titulo: 'titulo3',
                descripcion: 'descripcion 3',
                pdf: 'pdfs/unidad1/tema3.pdf',
            },
            {
                id: 'tema-6',
                titulo: 'titulo3',
                descripcion: 'descripcion 3',
                pdf: 'pdfs/unidad1/tema3.pdf',
            },
            {
                id: 'tema-7',
                titulo: 'titulo3',
                descripcion: 'descripcion 3',
                pdf: 'pdfs/unidad1/tema3.pdf',
            },
            {
                id: 'tema-8',
                titulo: 'titulo3',
                descripcion: 'descripcion 3',
                pdf: 'pdfs/unidad1/tema3.pdf',
            },
        ],
    },
    {
        id: 2,
        slug: 'unidad-2',
        titulo: 'Unidad 2:  Introducción a la lógica de programación aplicada a la seguridad.',
        descripcion: 'dddddddd',
        carpetaPDF: '/pdfs/unidad2',
        temas: [
            {
                id: 'tema-1',
                titulo: 'titulo1',
                descripcion: 'descripcion 1',
                pdf: 'pdfs/unidad2/tema1',
            },
            {
                id: 'tema-2',
                titulo: 'titulo2',
                descripcion: 'descripcion 2',
                pdf: 'pdfs/unidad2/tema2',
            },
            {
                id: 'tema-3',
                titulo: 'titulo3',
                descripcion: 'descripcion 3',
                pdf: 'pdfs/unidad2/tema3',
            },
        ],
    },
    {
        id:3,
        slug: 'unidad-3',
        titulo: 'Unidad 3:  Análisis de problemas de seguridad informática.',
        descripcion: 'dddddddd',
        carpetaPDF: '/pdfs/unidad3',
        temas: [
            {
                id: 'tema-1',
                titulo: 'titulo1',
                descripcion: 'descripcion 1',
                pdf: 'pdfs/unidad3/tema1',
            },
            {
                id: 'tema-2',
                titulo: 'titulo2',
                descripcion: 'descripcion 2',
                pdf: 'pdfs/unidad3/tema2',
            },
            {
                id: 'tema-3',
                titulo: 'titulo3',
                descripcion: 'descripcion 3',
                pdf: 'pdfs/unidad3/tema3',
            },
        ],
    },
    {
        id:4,
        slug: 'unidad-4',
        titulo: 'Unidad 4:  Análisis de problemas de seguridad informática.',
        descripcion: 'dddddddd',
        carpetaPDF: '/pdfs/unidad4',
        temas: [
            {
                id: 'tema-1',
                titulo: 'titulo1',
                descripcion: 'descripcion 1',
                pdf: 'pdfs/unidad4/tema1',
            },
            {
                id: 'tema-2',
                titulo: 'titulo2',
                descripcion: 'descripcion 2',
                pdf: 'pdfs/unidad4/tema2',
            },
            {
                id: 'tema-3',
                titulo: 'titulo3',
                descripcion: 'descripcion 3',
                pdf: 'pdfs/unidad4/tema3',
            },
        ],
    },
]

// para buscar una unidad por slug fácilmente 
export const getUnidadBySlug = (slug) =>
  unidades.find((u) => u.slug === slug);

export const getUnidadById = (id) =>
  unidades.find((u) => u.id === id);