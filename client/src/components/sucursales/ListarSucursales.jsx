import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ListarSucursales = () => {
    const [sucursales, setSucursales] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSucursalId, setSelectedSucursalId] = useState(null);

    const navigate = useNavigate();

    const handleEditClick = (id) => {
        navigate(`/dashboard/sucursales/sucursales/${id}/edit`);
    };

    const handleCreateClick = () => {
        navigate(`/dashboard/sucursales/sucursales/create`);
    };

    const fetchSucursales = () => {
        fetch('http://137.184.190.92/sucursales/sucursales/')
            .then(response => response.json())
            .then(data => setSucursales(data))
            .catch(error => console.error('Error fetching data:', error));
    };

    const openModal = (sucursalId) => {
        setSelectedSucursalId(sucursalId);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedSucursalId(null);
    };

    const handleConfirmDelete = () => {
        axios.delete(`http://137.184.190.92/sucursales/sucursales/${selectedSucursalId}/`)
            .then(() => {
                closeModal();
                fetchSucursales();
            })
            .catch(error => {
                console.error("Error al eliminar la sucursal:", error);
                alert("Hubo un error al eliminar la sucursal. Por favor intenta nuevamente.");
            });
    };

    useEffect(() => {
        fetchSucursales();
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
                    <h2>Eliminar Sucursal</h2>
                    <p>¿Estás seguro de que deseas eliminar esta sucursal?</p>
                    <button style={{ ...modalButtonStyle, backgroundColor: '#e74c3c' }}
                            onClick={handleConfirmDelete}>
                        Confirmar
                    </button>
                    <button style={{ ...modalButtonStyle, backgroundColor: '#ccc' }}
                            onClick={closeModal}>
                        Cancelar
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={cardStyle}>
            <h2>Lista de Sucursales</h2>
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
                ➕ Crear Sucursal
            </button>
            <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Dirección</th>
                        <th>Teléfono</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {sucursales.map(sucursal => (
                        <tr key={sucursal.id}>
                            <td>{sucursal.nombre}</td>
                            <td>{sucursal.direccion}</td>
                            <td>{sucursal.telefono}</td>
                            <td>
                                <button
                                    style={{ marginRight: '10px', cursor: 'pointer' }}
                                    onClick={() => handleEditClick(sucursal.id)}>
                                    ✏️ Editar
                                </button>
                                <button style={{ cursor: 'pointer' }}
                                        onClick={() => openModal(sucursal.id)}>
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

export default ListarSucursales;