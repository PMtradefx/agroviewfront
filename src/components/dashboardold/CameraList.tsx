import React from 'react';
import type { Camera } from '../../lib/types';

// Define las propiedades que este componente espera recibir
interface CameraListProps {
    cameras: Camera[]; // Un array de objetos Camera
    onSelectCamera: (camera: Camera) => void; // Una función para seleccionar una cámara
}

const CameraList: React.FC<CameraListProps> = ({ cameras, onSelectCamera }) => {
    return (
        <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '8px', marginBottom: '1rem' }}>
            <h4>Cámaras Registradas</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {cameras.map(camera => (
                    <li
                        key={camera.id}
                        onClick={() => onSelectCamera(camera)}
                        style={{
                            cursor: 'pointer',
                            padding: '0.8rem',
                            borderBottom: '1px solid #eee',
                            transition: 'background-color 0.2s',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <span>{camera.name} ({camera.location})</span>
                        <span style={{ fontSize: '0.8em', color: '#666' }}>ID: {camera.identifier}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CameraList;