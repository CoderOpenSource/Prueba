// Sidebar.js
import React from 'react';

function Sidebar() {
    return (
        <div style={styles.sidebarContainer}>
            <h3>Panel de Administración</h3>
            <ul style={styles.sidebarList}>
                <li><a href="/admin/usuarios">Gestionar Usuarios</a></li>
                // ... otros enlaces de administración
            </ul>
        </div>
    );
}

const styles = {
    sidebarContainer: {
        width: '20%',
        backgroundColor: '#2c3e50',
        minHeight: '100vh',
        color: '#ecf0f1',
        padding: '20px',
    },
    sidebarList: {
        listStyle: 'none',
        padding: 0,
    }
}

export default Sidebar;
