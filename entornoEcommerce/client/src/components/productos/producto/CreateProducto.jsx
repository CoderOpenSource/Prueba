import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreateProducto() {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [descuentoPorcentaje, setDescuentoPorcentaje] = useState('');
  const [categoria, setCategoria] = useState('');
  const [subcategoria, setSubcategoria] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [subcategorias, setSubcategorias] = useState([]);
  const [imagenes, setImagenes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Obtiene las categorías
    axios.get('http://165.227.68.145/productos/categorias/')
      .then(response => {
        setCategorias(response.data);
      })
      .catch(err => {
        console.error("Error al obtener categorías:", err);
        setError("Hubo un error al obtener las categorías. Por favor intenta nuevamente.");
      });
  }, []);

  useEffect(() => {
  if (categoria) {
    axios.get(`http://165.227.68.145/productos/subcategorias/`)
      .then(response => {
        const allSubcategorias = response.data;

        const filteredSubcategories = allSubcategorias.filter(sub => sub.categoria.id.toString() === categoria);


        setSubcategorias(filteredSubcategories);
      })
      .catch(err => {
        console.error("Error al obtener subcategorías:", err);
        setError("Hubo un error al obtener las subcategorías. Por favor intenta nuevamente.");
      });
  } else {
    setSubcategorias([]);
  }
}, [categoria]);



  const handleSubmit = (event) => {
    event.preventDefault();

    // Validaciones
    if (!nombre.trim()) {
        setError("El nombre es obligatorio.");
        return;
    }
    if (!descripcion.trim()) {
        setError("La descripción es obligatoria.");
        return;
    }
    if (!precio.trim() || isNaN(precio)) {
        setError("Introduce un precio válido.");
        return;
    }
    if (!categoria) {
        setError("Selecciona una categoría.");
        return;
    }
    if (imagenes.length === 0) {
        setError("Añade al menos una imagen.");
        return;
    }

    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('descripcion', descripcion);
    formData.append('precio', precio);
    formData.append('descuento_porcentaje', descuentoPorcentaje);
    formData.append('categoria', categoria);
    formData.append('subcategoria', subcategoria);
    imagenes.forEach(img => formData.append('imagenes', img));

    axios.post(`http://165.227.68.145/productos/productos/`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })
    .then(response => {
        navigate(`/dashboard/productos/productos/`);
    })
    .catch(err => {
        console.error("Error al crear el nuevo producto:", err);
        setError("Hubo un error al crear el producto. Por favor intenta nuevamente.");
    });
  }

  const handleImagenesChange = (event) => {
    const files = Array.from(event.target.files);
    setImagenes(prevImages => [...prevImages, ...files]);
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Crear Nuevo Producto</h2>

        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Nombre:</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              style={styles.whiteInput}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Descripción:</label>
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              style={styles.whiteInput}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Precio:</label>
            <input
              type="text"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              style={styles.whiteInput}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Descuento (%):</label>
            <input
              type="text"
              value={descuentoPorcentaje}
              onChange={(e) => setDescuentoPorcentaje(e.target.value)}
              style={styles.whiteInput}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Categoría:</label>
            <select value={categoria} onChange={(e) => setCategoria(e.target.value)} style={styles.whiteInput}>
              <option value="" disabled>Selecciona una categoría</option>
              {categorias.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.nombre}</option>
              ))}
            </select>
          </div>
		<div style={styles.formGroup}>
            <label style={styles.label}>Subcategoría:</label>
            <select value={subcategoria} onChange={(e) => setSubcategoria(e.target.value)} style={styles.whiteInput}>
              <option value="" disabled>Selecciona una subcategoría</option>
              {subcategorias.map(subcat => (
                <option key={subcat.id} value={subcat.id}>{subcat.nombre}</option>
              ))}
            </select>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Imágenes:</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImagenesChange}
              style={styles.uploadButton}
            />
            <div style={styles.imagesPreview}>
              {imagenes.map((img, idx) => (
                <img key={idx} src={URL.createObjectURL(img)} alt={`Nueva imagen ${idx}`} style={styles.imagePreview} />
              ))}
            </div>
          </div>

          {error && <p style={styles.error}>{error}</p>}

          <button style={styles.saveButton} type="submit">
            💾 Guardar
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: '100vh',
    paddingTop: '50px'
  },
  card: {
    padding: '30px',
    borderRadius: '15px',
    backgroundColor: '#002855',
    color: 'white',
    width: '500px',
    textAlign: 'center',
  },
  title: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  formGroup: {
    marginBottom: '15px',
    textAlign: 'left',
  },
  label: {
    fontSize: '18px',
    marginBottom: '5px',
  },
  whiteInput: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    backgroundColor: 'white',
    color: 'black',
    fontSize: '16px',
  },
  uploadButton: {
    display: 'inline-block',
    padding: '8px 16px',
    borderRadius: '7px',
    cursor: 'pointer',
    background: '#002855',
    color: 'white',
    border: 'none',
    fontSize: '16px',
    textAlign: 'center',
    marginTop: '5px',
    outline: 'none',
    appearance: 'none',
    WebkitAppearance: 'none',
    MozAppearance: 'none',
  },
  error: {
    color: 'red',
    marginBottom: '10px',
  },
  saveButton: {
    marginTop: '25px',
    backgroundColor: 'white',
    color: '#002855',
    border: 'none',
    borderRadius: '7px',
    cursor: 'pointer',
    padding: '8px 16px',
    fontSize: '18px',
  },
  imagesPreview: {
    marginTop: '10px',
    display: 'flex',
    flexWrap: 'wrap'
  },
  imagePreview: {
    width: '60px',
    height: '60px',
    borderRadius: '5px',
    margin: '5px',
    objectFit: 'cover'
  },
  imagenContenedor: {
    display: 'inline-block',
    position: 'relative',
    margin: '5px'
  },
  removeImageButton: {
    position: 'absolute',
    top: '0',
    right: '0',
    backgroundColor: 'red',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '20px',
    height: '20px',
    textAlign: 'center',
    lineHeight: '20px',
    cursor: 'pointer'
  }
};


export default CreateProducto;