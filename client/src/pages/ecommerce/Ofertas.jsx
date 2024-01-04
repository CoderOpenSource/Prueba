import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Ofertas() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://137.184.190.92/productos/productos/');
            // Aquí puedes filtrar los productos que están en oferta
            const ofertaProducts = response.data.filter(producto => parseFloat(producto.descuento_porcentaje) > 0);
            setProducts(ofertaProducts);
        } catch (error) {
            console.error('Hubo un error al obtener los productos', error);
        }
    };

    fetchProducts();
}, []);

    const handleViewMoreClick = (productId) => {
        navigate(`/products/productdetail/${productId}`);
    };

    const styles = {
        resultsPage: {
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
    },
    resultsHeader: {
      marginBottom: '20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    resultsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(5, 1fr)',
      gap: '20px',
    },
    productCard: {
      backgroundColor: '#fff',
      border: '1px solid #ccc',
      borderRadius: '5px',
      overflow: 'hidden',
      textAlign: 'center',
    },
    productImage: {
      width: '100%',
      height: '200px',
      objectFit: 'cover',
    },
    productInfo: {
      padding: '10px',
    },
    filterContainer: {
      display: 'flex',
      gap: '10px',
    },
        discountTag: {
            position: 'absolute',
            top: 0,
            left: 0,
            backgroundColor: 'red',
            color: 'white',
            padding: '5px 10px',
            fontSize: '14px',
        },
        oldPrice: {
            textDecoration: 'line-through',
            color: '#888',
        },
    };

    return (
        <div style={styles.resultsPage}>
            <div style={styles.resultsHeader}>
                <h1>Ofertas Especiales</h1>
            </div>

            <div style={styles.resultsGrid}>
                {products.map(product => (
                    <div style={styles.productCard} key={product.id}>
                        <div style={styles.discountTag}>{product.descuento}% OFF</div>
                        <img
                            src={product.imagenes && product.imagenes.length > 0 ? product.imagenes[0].ruta_imagen : 'url_to_default_image'}
                            alt={product.nombre}
                            style={styles.productImage}
                        />
                        <div style={styles.productInfo}>
                            <h3>{product.nombre}</h3>
                            <p style={styles.oldPrice}>Precio antes: Bs{product.precio}</p>
                            <p>Precio actual: Bs{product.precio - (product.precio * (product.descuento_porcentaje / 100))}</p>
                            <button onClick={() => handleViewMoreClick(product.id)}>Ver más</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Ofertas;