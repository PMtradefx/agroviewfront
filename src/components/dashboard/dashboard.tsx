import  { useEffect, useState } from 'react';
import { getLatestImages, getCameras, getAllImages } from '../../api/CameraApi';
import type { Camera, Image } from '../../lib/types';
import echo from '../../lib/echo';
import styles from './dashboard.module.css';
import Sidebar from './Sidebar';
import HeaderDash from './Header';
import Indexadmin from '../admin';
import UserList from '../admin/user/index';
import EditUser from '../admin/user/edit';
import CamerasIndex from '../admin/camaras/index';
import { Routes, Route } from 'react-router-dom';
import ShowUser from '../admin/user/show';
import CreateUser from '../admin/user/create';
import DeleteUser from '../admin/user/delete';
import CreateCamera from '../admin/camaras/create';
import ShowCamera from '../admin/camaras/show';
import EditCamera from '../admin/camaras/edit';
import DeleteCamera from '../admin/camaras/delete';
import UnifiedImageDashboard from './UnifiedImageDashboard';
import UsuarioCliente from '../client/usuariocliente';
import EditarUsuario from '../client/editarusuario';

const Dashboard = () => {
    const [selectedCamera, setSelectedCamera] = useState<Camera | null>(null);
    const [latestImages, setLatestImages] = useState<Camera[]>([]);
    const [imagesData, setImagesData] = useState<Image[]>([]);
    const [imagesTotal, setImagesTotal] = useState<number>(0);
    const [imagesPage, setImagesPage] = useState<number>(1);
    const recordsPerPage = 5;
    const [role, setRole] = useState<'admin' | 'user'>('user'); 
    const [name, setName] = useState<string | null>(null);

    // New state for filtered cameras based on client ID
    const [filteredCameras, setFilteredCameras] = useState<Camera[]>([]);

    // Set default selected camera when filteredCameras changes and no camera is selected
    useEffect(() => {
        if (filteredCameras.length > 0 && !selectedCamera) {
            setSelectedCamera(filteredCameras[0]);
        }
    }, [filteredCameras, selectedCamera]);

    const showBrowserNotification = (data: any) => {
        if (Notification.permission === 'granted') {
            const options = {
                body: `Se ha detectado una posible plaga: ${data.plague_type} en la cámara ${data.camera_id}.`,
                icon: data.image_url,
                requireInteraction: true,
            };
            new Notification('¡ALERTA DE PLAGA!', options);
        } else if (Notification.permission !== 'denied') {
            Notification.requestPermission();
        }
    };

    const fetchImagesData = async (page: number = 1) => {
        try {
            const clientIdStr = localStorage.getItem('id');
            const clientId = clientIdStr ? parseInt(clientIdStr) : undefined;
            const data = await getAllImages(clientId, page, 5);
            setImagesData(data.data);
            setImagesTotal(data.total);
            setImagesPage(page);
        } catch (error) {
            console.error('Error fetching images data:', error);
        }
    };

    useEffect(() => {
        const storedName = localStorage.getItem('name');
        const storedRole = localStorage.getItem('rol');
        if (storedName) {
            setName(storedName.charAt(0));
        }
        if (storedRole === 'admin' || storedRole === 'user') {
            setRole(storedRole);
        }

        const fetchInitialData = async () => {
            try {
                // Get client ID from localStorage
                const clientIdStr = localStorage.getItem('id');
                const clientId = clientIdStr ? parseInt(clientIdStr) : null;

                const camerasData = await getCameras(clientId || undefined);
                // setCameras(camerasData); // Removed unused state setter to fix TS error

                if (clientId !== null) {
                    // Filter cameras by client ID (assuming property is cliente_id)
                    const filtered = camerasData.filter(cam => cam.cliente_id === clientId);
                    setFilteredCameras(filtered);
                } else {
                    setFilteredCameras(camerasData);
                }

                const latestImagesData = await getLatestImages(clientId || undefined);
                setLatestImages(latestImagesData);

                await fetchImagesData(1);
            } catch (error) {
            }
        };

        fetchInitialData();

        const channel = echo.channel('plague-alerts');
        channel.listen('PlagueDetected', (e: any) => {
            console.log('PlagueDetected Event:', e);
            showBrowserNotification(e);
            setLatestImages(prevImages => {
                const updatedImages = [...prevImages];
                const index = updatedImages.findIndex(cam => cam.id === e.camera_id);
                if (index !== -1) {
                    updatedImages[index].images = [e];
                } else {
                    // Consider how to handle new cameras appearing via alerts if not in initial `getCameras`
                }
                return updatedImages;
            });
        });

        return () => {
            channel.stopListening('PlagueDetected');
        };
    }, []);

    const totalPages = Math.ceil(imagesTotal / recordsPerPage);


    const handlePrevPage = () => {
        if (imagesPage > 1) {
            fetchImagesData(imagesPage - 1);
        }
    };

    const handleNextPage = () => {
        if (imagesPage < totalPages) {
            fetchImagesData(imagesPage + 1);
        }
    };

    return (
        <div className={styles.dashboardContainer}>
            <Sidebar rol={role} />
            <div className={styles.mainContent}>
                <HeaderDash userInitial={name} />
                {role === 'admin' ? (
                    <Routes>
                        <Route index element={<Indexadmin />} />
                        <Route path="usuarios" element={<UserList />} />
                        <Route path="usuarios/:id/edit" element={<EditUser />} />
                        <Route path="usuarios/create" element={<CreateUser />} />
                        <Route path="usuarios/:id" element={<ShowUser />} />
                        <Route path="usuarios/:id/confirm-delete" element={<DeleteUser />} />
                        <Route path="camaras" element={<CamerasIndex />} />
                        <Route path="camaras/create" element={<CreateCamera />} />
                         <Route path="camaras/:id" element={<ShowCamera />} />
                         <Route path="camaras/:id/edit" element={<EditCamera />} />
                         <Route path="camaras/:id/confirm-delete" element={<DeleteCamera />} />
                    </Routes>
                ) : (
                    <Routes>
                        <Route index element={<UnifiedImageDashboard
                            latestImages={latestImages}
                            imagesData={imagesData}
                            imagesPage={imagesPage}
                            totalPages={totalPages}
                            handlePrevPage={handlePrevPage}
                            handleNextPage={handleNextPage}
                        />} />
                        <Route path="cuenta" element={<UsuarioCliente />} />
                        <Route path="cuenta/editar" element={<EditarUsuario />} />
                    </Routes>
                )}
            </div>
        </div>
    );
};
export default Dashboard;
