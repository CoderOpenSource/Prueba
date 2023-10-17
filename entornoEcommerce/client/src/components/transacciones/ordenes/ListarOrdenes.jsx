import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ListaOrdenes = () => {
    const [ordenes, setOrdenes] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOrdenId, setSelectedOrdenId] = useState(null);
    const navigate = useNavigate();

    const handleEditClick = (id) => {
        navigate(`/dashboard/transacciones/ordenes/${id}/edit`);
    };

    const handleCreateClick = () => {
        navigate(`/dashboard/transacciones/ordenes/create`);
    };

    const fetchOrdenes = () => {
        axios.get('http://192.168.1.27/transacciones/ordenes/')
            .then(response => setOrdenes(response.data))
            .catch(error => console.error('Error fetching data:', error));
    };

    const openModal = (ordenId) => {
        setSelectedOrdenId(ordenId);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedOrdenId(null);
    };

    const handleConfirmDelete = () => {
        axios.delete(`http://192.168.1.27/transacciones/ordenes/${selectedOrdenId}/`)
            .then(() => {
                closeModal();
                fetchOrdenes();
            })
            .catch(error => {
                console.error("Error al eliminar la orden:", error);
                alert("Hubo un error al eliminar la orden. Por favor intenta nuevamente.");
            });
    };

    useEffect(() => {
        fetchOrdenes();
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
        color: '#333',
    };

    const modalButtonStyle = {
        padding: '10px 20px',
        margin: '10px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    };

    return (
        <div style={cardStyle}>
            <h2>Lista de Ordenes</h2>
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
                ➕ Crear Orden
            </button>
            <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th>Usuario</th>
                        <th>Estado</th>
                        <th>Fecha de Creación</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {ordenes.map(orden => (
                        <tr key={orden.id}>
                            <td>{orden.usuario_detail.username}</td>
                            <td>{orden.estado}</td>
                            <td>{orden.fecha_creacion}</td>
                            <td>
                                <button style={modalButtonStyle} onClick={() => handleEditClick(orden.id)}>
                                    ✏️ Editar
                                </button>
                                <button style={modalButtonStyle} onClick={() => openModal(orden.id)}>
                                    🗑️ Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {isModalOpen && (
                <div style={modalStyle}>
                    <div style={modalContentStyle}>
                        <p>¿Estás seguro de que deseas eliminar esta orden?</p>
                        <button style={modalButtonStyle} onClick={handleConfirmDelete}>Confirmar</button>
                        <button style={modalButtonStyle} onClick={closeModal}>Cancelar</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ListaOrdenes;
