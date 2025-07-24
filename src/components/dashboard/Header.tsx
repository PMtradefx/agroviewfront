import React from 'react';
import styles from './dashboard.module.css';

interface HeaderDashProps {
    userInitial: string | null;
}


const HeaderDash: React.FC<HeaderDashProps> = ({ userInitial }) => {
    return (
        <div className={styles.header}>
            <div className={styles.headerIcons}>
                <div className={styles.userAvatar}>
                    {userInitial || 'U'}
                </div>
            </div>
        </div>
    );
};
export default HeaderDash;
