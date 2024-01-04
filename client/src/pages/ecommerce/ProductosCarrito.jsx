import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

function CartView() {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);
    const location = useLocation();
    const userID = location.state?.userID;
    console.log(userID);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get(`http://143.244.183.182/transacciones/carritos/`);
                console.log(response);
                const userCart = response.data.find(cart => cart.usuario === userID);

                if (userCart) {
                    setCartItems(userCart.productos_detalle);
                    calculateTotal(userCart.productos_detalle);
                }
            } catch (error) {
                console.error('Error fetching cart items', error);
            }
        };

        fetchCartItems();
    }, [userID]);

    const calculateTotal = (items) => {
        let total = items.reduce((acc, item) => {
            const producto = item.productodetalle_detail.producto;
            let precio = producto.precio;
            let descuento = producto.descuento_porcentaje || 0;
            let precioConDescuento = precio - (precio * descuento / 100);
            let cantidad = item.cantidad || 0;

            return acc + (cantidad * precioConDescuento);
        }, 0);

        setTotal(total);
    };

    const handleCartClick = () => {
        navigate('/carrito/compras', {
            state: { userID, cartItems, total }
        });
    };

    return (
        <div style={{ padding: '50px' }}>
            <h2>Tu Carrito</h2>
            <div style={{ marginBottom: '50px' }}>
                {cartItems.map(item => {
                    const producto = item.productodetalle_detail.producto;
                    let precio = producto.precio;
                    let descuento = producto.descuento_porcentaje || 0;
                    let precioConDescuento = precio - (precio * descuento / 100);

                    return (
                        <div key={item.id} style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: '20px',
                            padding: '20px',
                            borderRadius: '5px',
                            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <img src={item.productodetalle_detail.imagen2D}
                                     alt={producto.nombre}
                                     style={{ width: '100px', marginRight: '20px', borderRadius: '5px' }} />
                                <div>
                                    <h4>{producto.nombre}</h4>
                                    <p>Cantidad: {item.cantidad}</p>
                                </div>
                            </div>
                            <h4>${precioConDescuento * item.cantidad}</h4>
                        </div>
                    );
                })}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h3>Total: ${total}</h3>
                <button style={{
                    padding: '10px 30px',
                    backgroundColor: '#f00',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '16px'
                }} onClick={handleCartClick}>Pagar</button>
            </div>
        </div>
    );
}

export default CartView;
