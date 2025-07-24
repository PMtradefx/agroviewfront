import { useEffect } from 'react';
import type { Camera, Image } from '../../lib/types';
import styles from './dashboard.module.css';
import './responsive-dashboard.css';
import echo from '../../lib/echo';

interface UnifiedImageDashboardProps {
    latestImages: Camera[];
    imagesData: Image[];
    imagesPage: number;
    totalPages: number;
    handlePrevPage: () => void;
    handleNextPage: () => void;
}

const UnifiedImageDashboard: React.FC<UnifiedImageDashboardProps> = ({
    latestImages,
    imagesData,
    imagesPage,
    totalPages,
    handlePrevPage,
    handleNextPage,
}) => {

    useEffect(() => {
        const channel = echo.channel('PlagueDetected');
        channel.listen('PlagueDetected', (e: any) => {
            console.log('Evento PlagueDetected recibido en UnifiedImageDashboard:', e);
            // Aquí puedes agregar la lógica para mostrar la notificación, por ejemplo:
            if (Notification.permission === 'granted') {
                const options = {
                    body: `Se ha detectado una posible plaga: ${e.plague_type}`,
                    icon: e.file_path,
                    requireInteraction: true,
                };
                new Notification('¡ALERTA DE PLAGA!', options);
            } else if (Notification.permission !== 'denied') {
                Notification.requestPermission();
            }
            // También puedes actualizar el estado o hacer otras acciones necesarias
        });

        return () => {
            channel.stopListening('PlagueDetected');
        };
    }, []);

    return (
        <div className={styles.imageGridsContainer}>
            {/* Latest Images per Camera */}
            <div className={styles.imageGridCard}>
                <h3 className={styles.chartTitle}>Últimas Imágenes por Cámara</h3>
                <div className={styles.latestImagesGrid}>
                    {latestImages.map(camera => (
                        <div key={camera.id} className={styles.latestImageCard}>
                            <h4>{camera.name}</h4>
                            {camera.images && camera.images.length > 0 ? (
                                <>
                                    <img
                                        src={camera.images[0].file_path.startsWith('http') ? camera.images[0].file_path : `${import.meta.env.VITE_image_URL}${camera.images[0].name}`}
                                        alt="Latest Capture"
                                        className={styles.latestImageCardImg}
                                    />
                                    <p>Plaga Detectada: {camera.images[0].plague_detected ? 'Sí' : 'No'}</p>
                                    {camera.images[0].plague_type && <p>Tipo: {camera.images[0].plague_type}</p>}
                                    <p>Fecha: {new Date(camera.images[0].created_at).toLocaleString()}</p>
                                </>
                            ) : (
                                <p className={styles.noImagesMessage}>No hay imágenes disponibles.</p>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Plague Detection History */}
            <div className={styles.imageGridCard}>
                <h3 className={styles.chartTitle}>Historial de detecciones de plagas</h3>
                <div className={styles.imageHistoryTableContainer}>
                    {imagesData.length > 0 ? (
                        <>
                            <table className={styles.imageHistoryTable}>
                                <thead>
                                    <tr>
                                        <th>Cámara</th>
                                        <th>Vista Previa</th>
                                        <th>Plaga Detectada</th>
                                        <th>Tipo de Plaga</th>
                                        <th>Fecha</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {imagesData.map((image: Image) => (
                                        <tr key={image.id}>
                                            <td>{image.camera ? image.camera.name : 'N/A'}</td>
                                            <td>
                                                <img
                                                    src={image.file_path.startsWith('http') ? image.file_path : `${import.meta.env.VITE_image_URL}${image.name}`}
                                                    alt="Vista previa"
                                                    className={styles.imageThumbnail}
                                                    style={{ width: '80px', height: 'auto' }}
                                                />
                                            </td>
                                            <td>{image.plague_detected ? 'Sí' : 'No'}</td>
                                            <td>{image.plague_detected ? image.plague_type : '-'}</td>
                                            <td>{new Date(image.created_at).toLocaleString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className={styles.paginationControls}>
                                <button onClick={handlePrevPage} disabled={imagesPage === 1}>Anterior</button>
                                <span>Página {imagesPage} de {totalPages}</span>
                                <button onClick={handleNextPage} disabled={imagesPage === totalPages}>Siguiente</button>
                            </div>
                        </>
                    ) : (
                        <p>No hay imágenes disponibles.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UnifiedImageDashboard;
