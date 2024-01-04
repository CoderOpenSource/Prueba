import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ResultsPageHombre() {
    const [products, setProducts] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSubcategories = async () => {
            try {
                const response = await axios.get('http://137.184.190.92/productos/subcategorias/');
                const hombreSubcategories = response.data.filter(subcat => subcat.categoria.id === 1);
                console.log('Subcategories fetched:', hombreSubcategories);
                setSubcategories(hombreSubcategories);
            } catch (error) {
                console.error('Error fetching subcategories:', error);
            }
        };

        fetchSubcategories();
    }, []);

    useEffect(() => {
        const fetchProducts = async (subcategoryId) => {
            try {
                let url = 'http://137.184.190.92/productos/productos/';
                if (subcategoryId) {
                    url += `?subcategoria=${subcategoryId}`;
                }
                const response = await axios.get(url);
                console.log('All products fetched:', response.data);
                const hombreProducts = response.data.filter(producto => producto.categoria === 1);
                console.log('Filtered products for men:', hombreProducts);
                setProducts(hombreProducts);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts(selectedSubcategory);
    }, [selectedSubcategory]);

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
  };

    return (
        <div style={styles.resultsPage}>
            <div style={styles.resultsHeader}>
                <h1>Resultados para Hombres</h1>
                <h2>SubCategorías</h2>
                <div style={styles.filterContainer}>
                    {subcategories.map(subcat => (
                        <button key={subcat.id} onClick={() => setSelectedSubcategory(subcat.id)}>
                            {subcat.nombre}
                        </button>
                    ))}
                </div>
            </div>

            <div style={styles.resultsGrid}>
                {products.filter(Boolean).map(product => (
                    <div style={styles.productCard} key={product.id}>
                        <img
                            src={product.imagenes && product.imagenes.length > 0 ? product.imagenes[0].ruta_imagen : 'url_to_default_image'}
                            alt={product.nombre}
                            style={styles.productImage}
                        />
                        <div style={styles.productInfo}>
                            <h3>{product.nombre}</h3>
                            <p>${product.precio}</p>
                            <button onClick={() => handleViewMoreClick(product.id)}>Ver más</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ResultsPageHombre;
