import React, { useState } from 'react';

function ImageSlider({ images }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const styles = {
        sliderContainer: {
            position: 'relative',
            width: '100%', // Ajuste al 100% del ancho del contenedor padre
            height: '100vh', // Ajuste al 100% de la altura de la ventana del navegador
            overflow: 'hidden', // Esconde las partes de la imagen que excedan el contenedor
        },
        sliderImage: {
            width: '100%',
            height: '100%',
            objectFit: 'cover', // Asegura que la imagen cubra todo el contenedor manteniendo su aspecto
        },
        arrow: {
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: 'transparent',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            zIndex: 1,
        },
        leftArrow: {
            left: '10px',
        },
        rightArrow: {
            right: '10px',
        },
    };

    const prevSlide = () => {
        const lastIndex = images.length - 1;
        setCurrentImageIndex(currentImageIndex === 0 ? lastIndex : currentImageIndex - 1);
    };

    const nextSlide = () => {
        const lastIndex = images.length - 1;
        setCurrentImageIndex(currentImageIndex === lastIndex ? 0 : currentImageIndex + 1);
    };

    return (
        <div style={styles.sliderContainer}>
            {images.length > 0 && (
                <>
                    <button style={{ ...styles.arrow, ...styles.leftArrow }} onClick={prevSlide}>&#10094;</button>
                    <img src={images[currentImageIndex]} alt="" style={styles.sliderImage} />
                    <button style={{ ...styles.arrow, ...styles.rightArrow }} onClick={nextSlide}>&#10095;</button>
                </>
            )}
            {images.length === 0 && <p>No hay imágenes disponibles</p>}
        </div>
    );
}

export default ImageSlider;
