import React from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faSearch } from '@fortawesome/free-solid-svg-icons';

function MainView() {
const navigate = useNavigate();

  const handleCatalogClick = () => {
    navigate('/products');
  };
  const handleOfertasClick = () => {
    navigate('/products/ofertas');
  };
  function SamplePrevArrow(props) {
    const { onClick } = props;
    return (
      <div
        className="slick-arrow slick-prev"
        style={{ left: '1%', zIndex: 1, color: 'white' }}
        onClick={onClick}
      >{'<'}
      </div>
    );
  }

  function SampleNextArrow(props) {
    const { onClick } = props;
    return (
      <div
        className="slick-arrow slick-next"
        style={{ right: '1%', zIndex: 1, color: 'white' }}
        onClick={onClick}
      >{'>'}
      </div>
    );
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <section style={styles.container}>
     <section style={styles.topHeaderContainer}>
       <header style={styles.topHeader}>
        <h2
          style={styles.catalogTitle}
          onClick={handleCatalogClick}
        >
          Ver Catálogo
        </h2>
      </header>
      <header style={styles.topHeader}>
        <h2
          style={styles.catalogTitle}
          onClick={handleOfertasClick}
        >
          Ver Ofertas
        </h2>
      </header>
      </section>

      <section style={styles.sliderSection}>
        <Slider {...settings}>
          <div>
            <img src="https://res.cloudinary.com/dkpuiyovk/image/upload/v1697485275/WhatsApp_Image_2023-10-16_at_10.08.56_lriuuu.jpg" alt="Imagen 1" style={styles.sliderImage}/>
          </div>
          <div>
            <img src="https://res.cloudinary.com/dkpuiyovk/image/upload/v1697485275/WhatsApp_Image_2023-10-16_at_10.09.09_dvv8h8.jpg" alt="Imagen 2" style={styles.sliderImage}/>
          </div>
          <div>
            <img src="https://res.cloudinary.com/dkpuiyovk/image/upload/v1697485276/WhatsApp_Image_2023-10-16_at_10.03.26_rwq3by.jpg" alt="Imagen 3" style={styles.sliderImage}/>
          </div>
          <div>
            <img src="https://images6.alphacoders.com/132/1325712.jpeg" alt="Imagen 4" style={styles.sliderImage}/>
          </div>
        </Slider>
      </section>

      <section style={styles.main}>
      <h2 style={styles.subtitle}>Características Principales de Stylo Store:</h2>
      <div style={styles.listContainer}>
        <ul style={styles.list}>
          <li>
            <span style={{ fontWeight: 'bold' }}>Edición en tiempo real por múltiples usuarios:</span> Stylo Store permite a su equipo de ventas y administradores gestionar el catálogo de productos en tiempo real, lo que garantiza que los clientes siempre vean las últimas novedades.
          </li>
          <li>
            <span style={{ fontWeight: 'bold' }}>Importación y exportación en formatos compatibles con Enterprise Architect:</span> Ofrecemos herramientas avanzadas de importación y exportación de datos para facilitar la administración de productos y la colaboración con otras plataformas.
          </li>
          <li>
            <span style={{ fontWeight: 'bold' }}>Autenticación segura y manejo de sesiones:</span> La seguridad es nuestra prioridad. Garantizamos una autenticación segura y un manejo eficiente de las sesiones de usuario para proteger la información personal.
          </li>
          <li>
            <span style={{ fontWeight: 'bold' }}>Alta escalabilidad y rendimiento:</span> Stylo Store está diseñada para crecer contigo. Nuestra infraestructura permite un alto nivel de escalabilidad y un rendimiento óptimo incluso en momentos de gran demanda.
          </li>
        </ul>
      </div>
    </section>
    </section>
  );
}

const styles = {
  container: {
    boxSizing: 'border-box',
    justifyContent: 'center',
    width: '100%',
    padding: '1rem',
    alignItems: 'center',
    overflow: 'hidden',
    maxWidth: '100%',
  },
  description: {
    margin: '1rem 0',
    fontSize: '1.2rem',
    lineHeight: '1.6',
  },
  sliderSection: {
    boxSizing: 'border-box',
    justifyContent: 'center',
    width: '100%',
    padding: '1rem',
    alignItems: 'center',
    overflow: 'hidden',
    maxWidth: '100%',
  },
  sliderImage: {
    width: '100%',
    maxWidth: '90%',
    margin: 'auto',
    borderRadius: '10px',
    overflow: 'hidden'
  },
  listContainer: {
    display: 'inline-block',
    textAlign: 'left',
  },
  main: {
    padding: '2rem',
    textAlign: 'center',
    backgroundColor: '#FFFFFF',
    borderTop: '1px solid #E0E0E0',
    borderBottom: '1px solid #E0E0E0',
  },
  subtitle: {
    fontSize: '1.5rem',
    margin: '1rem 0',
    fontWeight: '600',
  },
  list: {
    listStyleType: 'disc',
    paddingLeft: '2rem',
    margin: '0 auto',
  },
  topHeaderContainer: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: '#f0f0f0', // O el color que prefieras para el fondo
    padding: '1rem', // Espaciado dentro del contenedor
  },

  topHeader: {
    textAlign: 'center',
    padding: '0.5rem 2rem',
    backgroundColor: "#1E272E",
    color: '#fff',
    borderRadius: '25px',
  },
  catalogTitle: {
    margin: '0 auto',
    fontSize: '1.5rem',
    fontWeight: '600',
    cursor: 'pointer',
    textDecoration: 'underline',
  },

  header: {
    textAlign: 'center',
    padding: '1rem', // Reduce el padding para que el header sea más pequeño
    backgroundColor: '#FFFFFF',
    borderBottom: '1px solid #E0E0E0',
  },
  title: {
    margin: '1rem 0',
    fontSize: '2rem', // Tamaño de fuente más pequeño
    fontWeight: '600', // Fuente semi-negrita
  },
};

export default MainView;
