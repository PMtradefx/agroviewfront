import { useEffect, useState } from 'react';
import { getLatestImages, getCameras } from '../../api/CameraApi';
import type { Camera } from '../../lib/types';
import echo from '../../lib/echo';
import CameraList from './CameraList';
import ImageGrid from './ImageGrid';

const Dashboardold = () => {
    const [cameras, setCameras] = useState<Camera[]>([]);
    const [selectedCamera, setSelectedCamera] = useState<Camera | null>(null);
    const [latestImages, setLatestImages] = useState<Camera[]>([]);
    
    // Función para mostrar notificaciones del navegador
    const showBrowserNotification = (data: any) => {
        if (Notification.permission === 'granted') {
            const options = {
                body: `Se ha detectado una posible plaga: ${data.plague_type} en la cámara ${data.camera_id}.`,
                icon: data.image_url,
                requireInteraction: true, // Mantener la notificación hasta que el usuario interactúe
            };
            new Notification('¡ALERTA DE PLAGA!', options);
        } else if (Notification.permission !== 'denied') {
            Notification.requestPermission();
        }
    };

    useEffect(() => {
        // Carga las cámaras y las últimas imágenes al montar el componente
        const fetchInitialData = async () => {
            try {
                const camerasData = await getCameras();
                setCameras(camerasData);
                const latestImagesData = await getLatestImages();
                setLatestImages(latestImagesData);
            } catch (error) {
                console.error("Failed to fetch initial data:", error);
            }
        };

        fetchInitialData();

        // Configura el listener de WebSockets
        const channel = echo.channel('plague-alerts');
        channel.listen('PlagueDetected', (e: any) => {
            console.log('PlagueDetected Event:', e);
            showBrowserNotification(e); // Muestra la notificación en el navegador
            // Actualiza la lista de últimas imágenes
            setLatestImages(prevImages => {
                const updatedImages = [...prevImages];
                const index = updatedImages.findIndex(cam => cam.id === e.camera_id);
                if (index !== -1) {
                    updatedImages[index].images = [e]; // Reemplaza la última imagen
                }
                return updatedImages;
            });
        });

        // Limpieza al desmontar el componente
        return () => {
            channel.stopListening('PlagueDetected');
        };
    }, []);

    return (
        <div style={{ display: 'flex', padding: '1rem', gap: '1rem' }}>
            <div style={{ flex: 1 }}>
                <h3>Últimas Imágenes por Cámara</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
                    {latestImages.map(camera => (
                        <div key={camera.id} style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
                            <h4>{camera.name}</h4>
                            {camera.images && camera.images.length > 0 ? (
                                <div>
                                    <img src={camera.images[0].file_path} alt="Latest Capture" style={{ width: '100%', height: 'auto', borderRadius: '4px' }} />
                                    <p>Plaga Detectada: {camera.images[0].plague_detected ? 'Sí' : 'No'}</p>
                                    {camera.images[0].plague_type && <p>Tipo: {camera.images[0].plague_type}</p>}
                                    <p>Fecha: {new Date(camera.images[0].created_at).toLocaleString()}</p>
                                </div>
                            ) : (
                                <p>No hay imágenes disponibles.</p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <div style={{ flex: 2 }}>
                <h3>Historial de Imágenes</h3>
                <CameraList cameras={cameras} onSelectCamera={setSelectedCamera} />
                <ImageGrid selectedCamera={selectedCamera} />
            </div>
        </div>
    );
};

export default Dashboardold;