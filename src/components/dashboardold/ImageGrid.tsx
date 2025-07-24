import React, { useEffect, useState, useCallback } from 'react';
import type { Camera, Image } from '../../lib/types';
import { getImages } from '../../api/CameraApi';

// Define las propiedades que este componente espera recibir
interface ImageGridProps {
    selectedCamera: Camera | null; // La cámara seleccionada, puede ser nula
}

const ImageGrid: React.FC<ImageGridProps> = ({ selectedCamera }) => {
    const [images, setImages] = useState<Image[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [filterPlague, setFilterPlague] = useState<boolean>(false);

    // Función para obtener las imágenes desde el backend
    const fetchImages = useCallback(async (pageToFetch: number, cameraId?: number) => {
        setLoading(true);
        try {
            // Llama a la función de la API con los filtros de paginación y cámara
            const response = await getImages(pageToFetch, cameraId);
            setImages(response.data);
            // La API de Laravel Paginate devuelve información de paginación
            setTotalPages(response.total); 
        } catch (error) {
            console.error("Failed to fetch images:", error);
            setImages([]);
        } finally {
            setLoading(false);
        }
    }, []); // La dependencia es un array vacío, se crea solo una vez

    // Este useEffect se ejecuta cada vez que 'selectedCamera' cambia
    useEffect(() => {
        // Reinicia la paginación y carga las imágenes de la nueva cámara
        setPage(1);
        if (selectedCamera) {
            fetchImages(1, selectedCamera.id);
        } else {
            // Si no hay cámara seleccionada, muestra todas las imágenes
            fetchImages(1);
        }
    }, [selectedCamera, fetchImages]);

    // Filtra las imágenes en el cliente después de la carga
    const filteredImages = filterPlague ? images.filter(img => img.plague_detected) : images;

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
        fetchImages(newPage, selectedCamera?.id); // Vuelve a cargar los datos para la nueva página
    };

    return (
        <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h4>
                    {selectedCamera ? `Historial de ${selectedCamera.name}` : 'Todas las Imágenes'}
                </h4>
                <div>
                    <label>
                        <input
                            type="checkbox"
                            checked={filterPlague}
                            onChange={(e) => setFilterPlague(e.target.checked)}
                        />
                        Mostrar solo imágenes con plaga
                    </label>
                </div>
            </div>

            {loading ? (
                <p>Cargando imágenes...</p>
            ) : filteredImages.length === 0 ? (
                <p>No se encontraron imágenes.</p>
            ) : (
                <>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                        {filteredImages.map(image => (
                            <div key={image.id} style={{ border: '1px solid #eee', borderRadius: '8px', overflow: 'hidden' }}>
                                <img
                                    src={image.file_path}
                                    alt={`Captura de la cámara ${image.camera?.id ?? 'desconocida'}`}
                                    style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                                />
                                <div style={{ padding: '0.5rem', fontSize: '0.9em' }}>
                                    <p style={{ margin: 0 }}>
                                        Plaga: <strong>{image.plague_type || 'No detectada'}</strong>
                                    </p>
                                    <p style={{ margin: 0, color: '#666' }}>
                                        Fecha: {new Date(image.created_at).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Controles de paginación */}
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem', gap: '10px' }}>
                        <button onClick={() => handlePageChange(page - 1)} disabled={page <= 1}>
                            Anterior
                        </button>
                        <span>Página {page} de {totalPages}</span>
                        <button onClick={() => handlePageChange(page + 1)} disabled={page >= totalPages}>
                            Siguiente
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default ImageGrid;