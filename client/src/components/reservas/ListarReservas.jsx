import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ListarReservas = () => {
    const [reservas, setReservas] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedReservaId, setSelectedReservaId] = useState(null);

    const navigate = useNavigate();

    const handleEditClick = (id) => {
        navigate(`/dashboard/reservas/${id}/edit`);
    };

    const handleCreateClick= () => {
        navigate(`/dashboard/reservas/reservas/create`);
    };

    const fetchReservas = () => {
        axios.get('http://143.244.183.182/reservas/reservas/')
            .then(response => {
                setReservas(response.data);
            })
            .catch(error => console.error('Error fetching data:', error));
    };

    const openModal = (reservaId) => {
        setSelectedReservaId(reservaId);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedReservaId(null);
    };

    const handleConfirmDelete = () => {
        axios.delete(`http://143.244.183.182/reservas/reservas/${selectedReservaId}/`)
            .then(() => {
                closeModal();
                fetchReservas();
            })
            .catch(error => {
                console.error("Error al eliminar la reserva:", error);
                alert("Hubo un error al eliminar la reserva. Por favor intenta nuevamente.");
            });
    };

    useEffect(() => {
        fetchReservas();
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
                    <h2>Eliminar Usuario</h2>
                    <p>¿Estás seguro de que deseas eliminar este usuario?</p>
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
            <h2>Listado de Reservas</h2>
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
                ➕ Crear Reserva
            </button>
            <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th>Usuario</th>
                        <th>Producto Detalle</th>
                        <th>Fecha de Reserva</th>
                        <th>Cantidad</th>
                        <th>¿Expirado?</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {reservas.map(reserva => (
                        <tr key={reserva.id}>
                            <td>{reserva.usuario}</td>
                            <td>{reserva.producto_detalle.producto_nombre}</td>
                            <td>{new Date(reserva.fecha_reserva).toLocaleString()}</td>
                            <td>{reserva.cantidad}</td>
                            <td>{reserva.expirado ? "Sí" : "No"}</td>
                            <td>
                                <button
                                    style={{ marginRight: '10px', cursor: 'pointer' }}
                                    onClick={() => handleEditClick(reserva.id)}>
                                    ✏️ Editar
                                </button>
                                <button style={{ cursor: 'pointer' }}
                                        onClick={() => openModal(reserva.id)}>
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

export default ListarReservas;