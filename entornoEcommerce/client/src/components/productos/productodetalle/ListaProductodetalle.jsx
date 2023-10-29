import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ListaProductoDetalle = () => {

    const [detalles, setDetalles] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDetalleId, setSelectedDetalleId] = useState(null);

    const navigate = useNavigate();

    const handleEditClick = (id) => {
        navigate(`/dashboard/productos/productosdetalle/${id}/edit`);
    };

    const handleCreateClick= () =>{
        navigate(`/dashboard/productos/productosdetalle/create`);
    };

    const fetchDetalles = () => {
        axios.get('http://192.168.0.16/productos/productosdetalle/')
            .then(response => setDetalles(response.data))
            .catch(error => console.error('Error fetching data:', error));
    }

    const openModal = (detalleId) => {
        setSelectedDetalleId(detalleId);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedDetalleId(null);
    };

    const handleConfirmDelete = () => {
        axios.delete(`http://192.168.0.16/productos/productosdetalle/${selectedDetalleId}/`)
            .then(() => {
                closeModal();
                fetchDetalles();
            })
            .catch(error => {
                console.error("Error al eliminar el detalle:", error);
                alert("Hubo un error al eliminar el detalle. Por favor intenta nuevamente.");
            });
    };

    useEffect(() => {
        fetchDetalles();
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
        <h2>Lista de Detalles de Productos</h2>
        <button style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px 15px', borderRadius: '5px', marginBottom: '20px', cursor: 'pointer' }} onClick={handleCreateClick}>
            ➕ Crear Detalle
        </button>
        <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
            <thead>
                <tr>
                    <th>Producto</th>
                    <th>Color</th>
                    <th>Tamaño</th>
                    <th>Cantidad</th>
                    <th>Imagen 2D</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {detalles.map(detalle => (
                    <tr key={detalle.id}>
                        <td>{detalle.producto.nombre}</td>
                        <td>{detalle.color.nombre}</td>
                        <td><img src={detalle.imagen2D} alt={`Imagen 2D de ${detalle.producto.nombre}`} width="50" /></td>
                        <td>{detalle.estado}</td>
                        <td>
                            <button style={{ marginRight: '10px', cursor: 'pointer' }} onClick={() => handleEditClick(detalle.id)}>
                                ✏️ Editar
                            </button>
                            <button style={{ cursor: 'pointer' }} onClick={() => openModal(detalle.id)}>
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

export default ListaProductoDetalle;