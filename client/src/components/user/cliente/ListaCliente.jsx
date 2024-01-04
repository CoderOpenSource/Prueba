import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ListaCliente = () => {
    const [trabajadores, setTrabajadores] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);

    const navigate = useNavigate();

    const handleEditClick = (id) => {
        navigate(`/dashboard/users/usuarios-cliente/${id}/edit`);
    };
    const handleCreateClick= () =>{
        navigate(`/dashboard/users/usuarios-cliente/create`);
    };
    const fetchTrabajadores = () => {
    fetch('http://143.244.183.182/users/usuarios-cliente/')
        .then(response => response.json())
        .then(data => setTrabajadores(data))
        .catch(error => console.error('Error fetching data:', error));
}
    const openModal = (userId) => {
        setSelectedUserId(userId);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedUserId(null);
    };

    const handleConfirmDelete = () => {
        axios.delete(`http://143.244.183.182/users/usuarios-cliente/${selectedUserId}/`)
            .then(() => {
                closeModal();
                fetchTrabajadores();
            })
            .catch(error => {
                console.error("Error al eliminar el usuario:", error);
                alert("Hubo un error al eliminar el usuario. Por favor intenta nuevamente.");
            });
    };

    useEffect(() => {
        fetch('http://143.244.183.182/users/usuarios-cliente/')
            .then(response => response.json())
            .then(data => setTrabajadores(data))
            .catch(error => console.error('Error fetching data:', error));
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
            <h2>Lista de Clientes</h2>
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
           ➕ Crear Cliente
        </button>
            <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th>Nombre de usuario</th>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Foto de perfil</th>
                        <th>Teléfono</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {trabajadores.map(trabajador => (
                        <tr key={trabajador.id}>
                            <td>{trabajador.username}</td>
                            <td>{trabajador.first_name}</td>
                            <td>{trabajador.email}</td>
                            <td><img src={trabajador.foto_perfil} alt="Foto de perfil" width="50" /></td>
                            <td>{trabajador.telefono}</td>
                            <td>
                                <button
                                    style={{ marginRight: '10px', cursor: 'pointer' }}
                                    onClick={() => handleEditClick(trabajador.id)}>
                                    ✏️ Editar
                                </button>
                                <button style={{ cursor: 'pointer' }}
                                        onClick={() => openModal(trabajador.id)}>
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

export default ListaCliente;