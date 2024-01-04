import React, { useState, useEffect, useCallback } from 'react'; // Añadido useCallback
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaPaypal, FaCcVisa, FaQrcode } from 'react-icons/fa';
function PaymentComponent() {
    const location = useLocation();
    const navigate = useNavigate();
    if (!location.state) {
        navigate('/carrito');
        return null;
    }

    const { userID, cartItems, total } = location.state;
    const [paymentTypes, setPaymentTypes] = useState([]);
    const [selectedPayment, setSelectedPayment] = useState('');
    const [address, setAddress] = useState('');
    const [loading, setLoading] = useState(false);
    const [userInfo, setUserInfo] = useState({ name: '', email: '' });

 const handlePrePayment = () => {
        setLoading(true);
    };
    useEffect(() => {
        axios.get(`http://137.184.190.92/users/usuarios-Trabajador/`, {
            params: { userID }
        })
        .then(response => {
            if (response.data.length > 0) {
                setUserInfo({
                    name: response.data[0].first_name,
                    email: response.data[0].email
                });
            }
        })
        .catch(error => {
            console.error('Error fetching user details', error);
        });

        axios.get('http://137.184.190.92/transacciones/tipos_pago/')
            .then(response => {
                setPaymentTypes(response.data);
                if (response.data.length > 0) {
                    setSelectedPayment(response.data[0].nombre);
                }
            })
            .catch(error => {
                console.error('Error fetching payment types', error);
            });
    }, [userID]);
    const handlePaymentSubmit = () => {
        if (!selectedPayment || !address) {
            alert('Please fill all the fields.');
            return;
        }

        // Otros detalles para enviar junto con la solicitud de pago.
        const paymentData = {
            userID: user.id,
            paymentType: selectedPayment,
            totalAmount: total,
            address: address
        };

        // Código para manejar el envío de datos a la API
        axios.post('http://137.184.190.92/transacciones/process_payment/', paymentData)
            .then(response => {
                alert('Payment Successful!');
            })
            .catch(error => {
                alert('An error occurred during the payment process. Please try again.');
            });
    };
    const handleEscape = useCallback((event) => {
        if (event.key === 'Escape') {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        window.addEventListener('keydown', handleEscape);
        return () => {
            window.removeEventListener('keydown', handleEscape);
        };
    }, [handleEscape]);
    return (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '50px',
        backgroundColor: '#1E272E',
        height: '100vh'
    }}>
        <div style={{
            backgroundColor: 'white',
            borderRadius: '10px',
            padding: '40px',
            width: '600px'
        }}>
            <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Proceso de Pago</h2>

            <div style={{ /* Estilos */ }}>
            {/* Componente de UI */}
            <div style={getSectionStyle()}>
                <h3>Detalles del Usuario</h3>
                <p>Nombre: {userInfo.name}</p>
                <p>Email: {userInfo.email}</p>
            </div>

            {/* Mostrar los productos del carrito con imágenes */}
<div style={getSectionStyle()}>
    <h3>Productos en el Carrito</h3>
    {cartItems.map(item => {
        const producto = item.productodetalle_detail.producto;
        let precioOriginal = producto.precio;
        let descuento = producto.descuento_porcentaje || 0;
        let precioConDescuento = precioOriginal - (precioOriginal * descuento / 100);

        return (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={item.productodetalle_detail.imagen2D}
                         alt={producto.nombre}
                         style={{ width: '100px', marginRight: '20px', borderRadius: '5px' }} />
                    <div>
                        <h4>{producto.nombre}</h4>
                        <p>Cantidad: {item.cantidad}</p>
                        {descuento > 0 ? (
                            <>
                                <p>Precio Original: ${precioOriginal}</p>
                                <p>Descuento: {descuento}%</p>
                                <p>Precio con Descuento: ${precioConDescuento}</p>
                            </>
                        ) : (
                            <p>Precio: ${precioOriginal}</p>
                        )}
                    </div>
                </div>
                <h4>${precioConDescuento * item.cantidad}</h4>
            </div>
        );
    })}
</div>
</div>

            <div style={getSectionStyle()}>
                <h3>Dirección</h3>
                <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    rows="4"
                    style={getTextAreaStyle()}
                ></textarea>
            </div>

            {loading &&
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1000
                }}>
                    <div style={{
                        backgroundColor: 'white',
                        padding: '40px',
                        borderRadius: '10px',
                        textAlign: 'center'
                    }}>
                        <h3>Procesando Pago</h3>
                        <p>Por favor, no cierre esta ventana.</p>
                    </div>
                </div>
            }

            <div style={getSectionStyle()}>
               {paymentTypes.map(type => (
    <div key={type.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <input
            type="radio"
            value={type.nombre}
            checked={selectedPayment === type.nombre}
            onChange={(e) => setSelectedPayment(e.target.value)}
            style={{ marginRight: '10px' }}
        />
        {/* Elige el icono basado en el tipo de pago */}
        {type.nombre === 'paypal' && <FaPaypal size={40} style={{ marginRight: '10px' }} />}
        {type.nombre === 'online' && <FaCcVisa size={40} style={{ marginRight: '10px' }} />}
        {type.nombre === 'transferencia' && <FaQrcode size={40} style={{ marginRight: '10px' }} />}
        {type.nombre}
    </div>
))}
            </div>

            <div style={getSectionStyle()}>
                <h3>Monto Total: ${total}</h3>
            </div>

            <button onClick={handlePrePayment}style={getButtonStyle()}>
                Completar Pago
            </button>
        </div>
    </div>
);
}

// Funciones de estilo reutilizables
function getSectionStyle() {
    return {
        marginBottom: '30px',
    };
}

function getTextAreaStyle() {
    return {
        width: '100%',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '20px',
        fontSize: '16px'
    };
}

function getButtonStyle() {
    return {
        padding: '10px 30px',
        borderRadius: '5px',
        backgroundColor: '#FF5733',
        color: 'white',
        fontSize: '18px',
        cursor: 'pointer',
        border: 'none',
        width: '100%'
    };
}

export default PaymentComponent;
