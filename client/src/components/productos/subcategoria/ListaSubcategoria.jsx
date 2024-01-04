import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ListaSubcategorias = () => {
    const [subcategorias, setSubcategorias] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSubcategoriaId, setSelectedSubcategoriaId] = useState(null);

    const navigate = useNavigate();

    const handleEditClick = (id) => {
        navigate(`/dashboard/productos/subcategorias/${id}/edit`);
    };

    const handleCreateClick = () => {
        navigate(`/dashboard/productos/subcategorias/create`);
    };

    const fetchSubcategorias = () => {
        axios.get('http://137.184.190.92/productos/subcategorias/')
            .then(response => setSubcategorias(response.data))
            .catch(error => console.error('Error fetching data:', error));
    };

    const openModal = (subcategoriaId) => {
        setSelectedSubcategoriaId(subcategoriaId);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedSubcategoriaId(null);
    };

    const handleConfirmDelete = () => {
        axios.delete(`http://137.184.190.92/productos/subcategorias/${selectedSubcategoriaId}/`)
            .then(() => {
                closeModal();
                fetchSubcategorias();
            })
            .catch(error => {
                console.error("Error al eliminar la subcategoría:", error);
                alert("Hubo un error al eliminar la subcategoría. Por favor intenta nuevamente.");
            });
    };

    useEffect(() => {
        fetchSubcategorias();
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
                <h2>Eliminar Subcategoría</h2>
                <p>¿Estás seguro de que deseas eliminar esta Subcategoría?</p>
                <button style={{ margin: '10px', backgroundColor: '#e74c3c', padding: '10px 20px', cursor: 'pointer' }} onClick={handleConfirmDelete}>Confirmar</button>
                <button style={{ margin: '10px', backgroundColor: '#ccc', padding: '10px 20px', cursor: 'pointer' }} onClick={closeModal}>Cancelar</button>
            </div>
        );
    }


    return (
        <div style={cardStyle}>
            <h2>Lista de Subcategorías</h2>
            <button style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px 15px', borderRadius: '5px', marginBottom: '20px', cursor: 'pointer' }} onClick={handleCreateClick}>
                ➕ Crear Subcategoría
            </button>
            <table tyle={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th>Nombre de Categoría</th>
                        <th>Nombre de Subcategoría</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {subcategorias.map(subcategoria => (
                        <tr key={subcategoria.id}>
                            <td>{subcategoria.categoria.nombre}</td>
                            <td>{subcategoria.nombre}</td>
                            <td>
                                <button style={{ marginRight: '10px', cursor: 'pointer' }} onClick={() => handleEditClick(producto.id)}>
                                    ✏️ Editar
                                </button>
                                <button style={{ cursor: 'pointer' }} onClick={() => openModal(producto.id)}>
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

export default ListaSubcategorias;
