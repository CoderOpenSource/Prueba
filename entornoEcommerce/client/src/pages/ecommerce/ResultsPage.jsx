import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
function ResultsPage() {
const navigate = useNavigate();
    const location = useLocation();
     // Primero, chequea si los resultados están presentes
    let products = location.state?.results || [];

    // Si no hay resultados, pero hay un producto, crea un array con ese producto
    if (products.length === 0 && location.state?.product) {
        products = [location.state.product];
    }
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
                <h1>Resultados de búsqueda</h1>
                <div style={styles.filterContainer}>
                    <select>
                        <option>Filtrar por precio</option>
                        <option>Ascendente</option>
                        <option>Descendente</option>
                    </select>
                    <button>Aplicar Filtros</button>
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

export default ResultsPage;