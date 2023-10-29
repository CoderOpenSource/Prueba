import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Autocomplete({ onSelected }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!query) return;

    setIsLoading(true);
    axios.get(`http://192.168.0.16/productos/productos/?search=${query}`)
      .then(response => {
        setResults(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Error fetching autocomplete results:", error);
        setIsLoading(false);
      });
  }, [query]);

  return (
    <div style={styles.formGroup}>
      <div style={styles.inputWrapper}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Escribe el nombre del producto..."
          style={styles.whiteInput}
        />
        <span style={styles.searchIcon}>🔍</span>
      </div>
      {isLoading && <div style={{ ...styles.label, ...styles.error }}>Cargando...</div>}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {results.map(producto => (
          <li
            key={producto.id}
            onClick={() => {
              setQuery(producto.nombre);
              onSelected(producto.id);
              setResults([]);  // Clear the results once an item is selected
            }}
            style={{ padding: '5px', cursor: 'pointer', backgroundColor: '#002855', color: 'white', marginTop: '5px', borderRadius: '5px' }}
          >
            {producto.nombre}
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  formGroup: {
    marginBottom: '15px',
    textAlign: 'left',
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
  label: {
    fontSize: '18px',
    marginBottom: '5px',
  },
  error: {
    color: 'red',
    marginBottom: '10px',
  },
  inputWrapper: {
    position: 'relative',
    width: '100%'
  },
  searchIcon: {
    position: 'absolute',
    right: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    cursor: 'pointer',
    fontSize: '16px'
  }
};

export default Autocomplete;
