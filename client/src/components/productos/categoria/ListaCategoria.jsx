import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ListaCategorias = () => {
    const [categorias, setCategorias] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCategoriaId, setSelectedCategoriaId] = useState(null);

    const navigate = useNavigate();

    const handleEditClick = (id) => {
        navigate(`/dashboard/productos/categorias/${id}/edit`);
    };

    const handleCreateClick = () => {
        navigate(`/dashboard/productos/categorias/create`);
    };

    const fetchCategorias = () => {
        axios.get('http://137.184.190.92/productos/categorias/')
            .then(response => setCategorias(response.data))
            .catch(error => console.error('Error fetching data:', error));
    };

    const openModal = (categoriaId) => {
        setSelectedCategoriaId(categoriaId);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedCategoriaId(null);
    };

    const handleConfirmDelete = () => {
        axios.delete(`http://137.184.190.92/productos/categorias/${selectedCategoriaId}/`)
            .then(() => {
                closeModal();
                fetchCategorias();
            })
            .catch(error => {
                console.error("Error al eliminar la categoría:", error);
                alert("Hubo un error al eliminar la categoría. Por favor intenta nuevamente.");
            });
    };

    useEffect(() => {
        fetchCategorias();
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
            <div style={{ ...cardStyle, position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                <h2>Eliminar Categoría</h2>
                <p>¿Estás seguro de que deseas eliminar esta categoría?</p>
                <button style={{ margin: '10px', backgroundColor: '#e74c3c', padding: '10px 20px', cursor: 'pointer' }} onClick={handleConfirmDelete}>Confirmar</button>
                <button style={{ margin: '10px', backgroundColor: '#ccc', padding: '10px 20px', cursor: 'pointer' }} onClick={closeModal}>Cancelar</button>
            </div>
        );
    }

    return (
        <div style={cardStyle}>
            <h2>Lista de Categorías</h2>
            <button style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px 15px', borderRadius: '5px', marginBottom: '20px', cursor: 'pointer' }} onClick={handleCreateClick}>
                ➕ Crear Categoría
            </button>
            <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {categorias.map(categoria => (
                        <tr key={categoria.id}>
                            <td>{categoria.nombre}</td>
                            <td>
                                <button style={{ marginRight: '10px', cursor: 'pointer' }} onClick={() => handleEditClick(categoria.id)}>
                                    ✏️ Editar
                                </button>
                                <button style={{ cursor: 'pointer' }} onClick={() => openModal(categoria.id)}>
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

export default ListaCategorias;
