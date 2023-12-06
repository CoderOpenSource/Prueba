import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ListarInventarios = () => {
    const [inventarios, setInventarios] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedInventoryId, setSelectedInventoryId] = useState(null);

    const navigate = useNavigate();

    const handleEditClick = (id) => {
        navigate(`/dashboard/sucursales/inventarios/${id}/edit`);
    };

    const handleCreateClick= () => {
        navigate(`/dashboard/sucursales/inventarios/create`);
    };

    const fetchInventarios = () => {
        fetch('http://165.227.68.145/sucursales/inventarios/')
            .then(response => response.json())
            .then(data => setInventarios(data))
            .catch(error => console.error('Error fetching data:', error));
    };

    const openModal = (inventoryId) => {
        setSelectedInventoryId(inventoryId);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedInventoryId(null);
    };

    const handleConfirmDelete = () => {
        axios.delete(`http://165.227.68.145/sucursales/inventarios/${selectedInventoryId}/`)
            .then(() => {
                closeModal();
                fetchInventarios();
            })
            .catch(error => {
                console.error("Error al eliminar el inventario:", error);
                alert("Hubo un error al eliminar el inventario. Por favor intenta nuevamente.");
            });
    };

    useEffect(() => {
        fetchInventarios();
    }, []);

    const cardStyle = {
        padding: '20px',
        backgroundColor: '#002855',
        borderRadius: '8px',
        color: 'white',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
    };

    const modalStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    };

    const modalContentStyle = {
    width: '300px',
    padding: '20px',
    backgroundColor: 'white',
    borderRadius: '8px',
    textAlign: 'center',
    color: '#333',  // Color de texto oscuro
};


    const modalButtonStyle = {
        padding: '10px 20px',
        margin: '10px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    };
    if (isModalOpen) {
        return (
            <div style={modalStyle}>
                <div style={modalContentStyle}>
                    <h2>Eliminar Inventario</h2>
                    <p>¿Estás seguro de que deseas eliminar este inventario?</p>
                    <button style={{...modalButtonStyle, backgroundColor: '#e74c3c'}}
                            onClick={handleConfirmDelete}>
                        Confirmar
                    </button>
                    <button style={{...modalButtonStyle, backgroundColor: '#ccc'}}
                            onClick={closeModal}>
                        Cancelar
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={cardStyle}>
            <h2>Lista de Inventarios</h2>
            <button
                style={{
                    backgroundColor: '#4CAF50', // verde
                    color: 'white',
                    padding: '10px 15px',
                    borderRadius: '5px',
                    marginBottom: '20px',
                    cursor: 'pointer'
                }}
                onClick={handleCreateClick}
            >
               ➕ Crear Inventario
            </button>
            <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th>Sucursal</th>
                        <th>Producto Detalle</th>
                        <th>Cantidad</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {inventarios.map(inventario => (
                        <tr key={inventario.id}>
                            <td>{inventario.sucursal_nombre}</td>
                            <td>{inventario.producto_nombre}</td>
                            <td>{inventario.cantidad}</td>
                            <td>
                                <button
                                    style={{ marginRight: '10px', cursor: 'pointer' }}
                                    onClick={() => handleEditClick(inventario.id)}>
                                    ✏️ Editar
                                </button>
                                <button style={{ cursor: 'pointer' }}
                                        onClick={() => openModal(inventario.id)}>
                                    🗑️ Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListarInventarios;