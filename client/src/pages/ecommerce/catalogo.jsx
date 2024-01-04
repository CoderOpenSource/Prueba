import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Catalogo() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://137.184.190.92/productos/productos/');
                setProducts(response.data);
            } catch (error) {
                console.error('Hubo un error al obtener los productos', error);
            }
        };

        fetchProducts();
    }, []);

    const handleHombreClick = () => {
        navigate('/products/hombre');
    };

    const handleMujerClick = () => {
        navigate('/products/mujer');
    };

    const styles = {
        esultsPage: {
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
            justifyContent: 'flex-end',
            marginBottom: '20px',
        },
        filterButton: {
            marginLeft: '10px',
        },
        filterLabel: {
            marginRight: '10px',
        },
    };

    return (
        <div style={styles.resultsPage}>
            <div style={styles.resultsHeader}>
                <h1>Catálogo de Productos</h1>
            </div>

            <div style={styles.filterContainer}>
                <span style={styles.filterLabel}>Filtrar por:</span>
                <button style={styles.filterButton} onClick={handleHombreClick}>Hombre</button>
                <button style={styles.filterButton} onClick={handleMujerClick}>Mujer</button>
            </div>

            <div style={styles.resultsGrid}>
                {products.map(product => (
                    <div style={styles.productCard} key={product.id}>
                        <img
                            src={product.imagenes && product.imagenes.length > 0 ? product.imagenes[0].ruta_imagen : 'url_to_default_image'}
                            alt={product.nombre}
                            style={styles.productImage}
                        />
                        <div style={styles.productInfo}>
                            <h3>{product.nombre}</h3>
                            <p>${product.precio}</p>
                            <button onClick={() => navigate(`/products/productdetail/${product.id}`)}>Ver más</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Catalogo;

