import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './dashboard.module.css';

type SidebarProps = {
    rol: 'admin' | 'user';
};

const Sidebar: React.FC<SidebarProps> = ({ rol }) => {
    const navigate = useNavigate();

    const adminNavItems = [
        { name: 'Dashboard', icon: '📊', path: '/dashboard' },
        { name: 'Usuarios', icon: '👥', path: '/dashboard/usuarios' },
        { name: 'Camaras', icon: '📷', path: '/dashboard/camaras' },
        { name: 'Salir', icon: '➡️', path: '/' },
    ];

    const userNavItems = [
        { name: 'Dashboard', icon: '📊', path: '/dashboard' },
        { name: 'Cuenta', icon: '👤', path: '/dashboard/cuenta' },
        { name: 'Salir', icon: '➡️', path: '/' },
    ];

    const navItems = rol === 'admin' ? adminNavItems : userNavItems;

    const handleClick = (itemName: string, path: string, event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
        if (itemName === 'Salir') {
            localStorage.clear();
        }
        navigate(path);
    };

    return (
        <div className={styles.sidebar}>
            <div className={styles.sidebarTitle}><img src="/DataFarmLogo.png" alt="Logo" /></div>
            <nav>
                <ul>
                    {navItems.map((item) => (
                        <li key={item.name} className={styles.sidebarNavItem}>
                            <a
                                href={item.path}
                                className={styles.sidebarNavLink}
                                onClick={(e) => handleClick(item.name, item.path, e)}
                            >
                                <span className={styles.sidebarNavIcon}>{item.icon}</span>
                                {item.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
