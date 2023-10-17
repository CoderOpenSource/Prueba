import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ListaTamaños = () => {
    const [tamaños, setTamaños] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTamañoId, setSelectedTamañoId] = useState(null);

    const navigate = useNavigate();

    const handleEditClick = (id) => {
        navigate(`/dashboard/productos/tamaños/${id}/edit`);
    };

    const handleCreateClick = () => {
        navigate(`/dashboard/productos/tamaños/create`);
    };

    const fetchTamaños = () => {
        axios.get('http://192.168.26.85/productos/tamaños/')
            .then(response => setTamaños(response.data))
            .catch(error => console.error('Error fetching data:', error));
    }

    const openModal = (tamañoId) => {
        setSelectedTamañoId(tamañoId);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedTamañoId(null);
    };

    const handleConfirmDelete = () => {
        axios.delete(`http://192.168.26.85/tamaños/${selectedTamañoId}/`)
            .then(() => {
                closeModal();
                fetchTamaños();
            })
            .catch(error => {
                console.error("Error al eliminar el tamaño:", error);
                alert("Hubo un error al eliminar el tamaño. Por favor intenta nuevamente.");
            });
    };

    useEffect(() => {
        fetchTamaños();
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

    return (
        <div style={cardStyle}>
            <h2>Lista de Tamaños</h2>
            <button style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px 15px', borderRadius: '5px', marginBottom: '20px', cursor: 'pointer' }} onClick={handleCreateClick}>
                ➕ Crear Tamaño
            </button>
            <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Dimensiones</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {tamaños.map(tamaño => (
                        <tr key={tamaño.id}>
                            <td>{tamaño.nombre}</td>
                            <td>{tamaño.dimensiones}</td>
                            <td>
                                <button style={{ marginRight: '10px', cursor: 'pointer' }} onClick={() => handleEditClick(tamaño.id)}>
                                    ✏️ Editar
                                </button>
                                <button style={{ cursor: 'pointer' }} onClick={() => openModal(tamaño.id)}>
                                    🗑️ Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ListaTamaños;
