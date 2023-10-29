import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ListaProductos = () => {
    const CATEGORIAS_MAPA = {
        1: "Hombre",
        2: "Mujer",
        // ... y así sucesivamente para todas tus categorías
    };

    const [productos, setProductos] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);

    const navigate = useNavigate();

    const handleEditClick = (id) => {
        navigate(`/dashboard/productos/productos/${id}/edit`);
    };

    const handleCreateClick= () =>{
        navigate(`/dashboard/productos/productos/create`);
    };

    const fetchProductos = () => {
        axios.get('http://192.168.0.16/productos/productos/')
            .then(response => setProductos(response.data))
            .catch(error => console.error('Error fetching data:', error));
    }

    const openModal = (productId) => {
        setSelectedProductId(productId);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedProductId(null);
    };

    const handleConfirmDelete = () => {
        axios.delete(`http://192.168.0.16/productos/productos/${selectedProductId}/`)
            .then(() => {
                closeModal();
                fetchProductos();
            })
            .catch(error => {
                console.error("Error al eliminar el producto:", error);
                alert("Hubo un error al eliminar el producto. Por favor intenta nuevamente.");
            });
    };

    useEffect(() => {
        fetchProductos();
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
                <h2>Eliminar Producto</h2>
                <p>¿Estás seguro de que deseas eliminar este producto?</p>
                <button style={{ margin: '10px', backgroundColor: '#e74c3c', padding: '10px 20px', cursor: 'pointer' }} onClick={handleConfirmDelete}>Confirmar</button>
                <button style={{ margin: '10px', backgroundColor: '#ccc', padding: '10px 20px', cursor: 'pointer' }} onClick={closeModal}>Cancelar</button>
            </div>
        );
    }

    return (
    <div style={cardStyle}>
        <h2>Lista de Productos</h2>
        <button style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px 15px', borderRadius: '5px', marginBottom: '20px', cursor: 'pointer' }} onClick={handleCreateClick}>
            ➕ Crear Producto
        </button>
        <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Descripcion</th>
                    <th>Precio</th>
                    <th>Categoria</th>
                    <th>Subcategoria</th>
                    <th>Descuento (%)</th>
                    <th>Fecha de Creación</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {productos.map(producto => (
                    <tr key={producto.id}>
                        <td>{producto.nombre}</td>
                        <td>{producto.descripcion}</td>
                        <td>{producto.precio}</td>
                        <td>{CATEGORIAS_MAPA[producto.categoria] || 'Sin categoría'}</td>
                        <td>{producto.subcategoria_nombre || 'Sin subcategoría'}</td>
                        <td>{producto.descuento_porcentaje}</td>
                        <td>{new Date(producto.fecha_creacion).toLocaleDateString()}</td>
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

export default ListaProductos;
