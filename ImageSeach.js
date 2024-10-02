import React, { useState } from 'react';
import axios from 'axios';

function ImageSearch() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');

  // Function to fetch images
  const searchImages = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`https://pixabay.com/api/?key=46166847-40e887f0f1cbd269c98d3b401&q=${query.trim()}&image_type=photo`);
      setImages(response.data.hits);
      setError(''); // Clear any errors
    } catch (err) {
      setError('Error fetching images');
    }
  };

  return (
    <div style={{ textAlign: 'center', margin: '20px', border: '1px solid #000', padding: '20px' }}>
      <h2>Tìm kiếm hình ảnh</h2>
      <form onSubmit={searchImages}>
        <input
          type="text"
          placeholder="Tìm kiếm hình ảnh"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ padding: '10px', width: '300px', marginRight: '10px' }}
        />
        <button type="submit" style={{ padding: '10px' }}>Tìm</button>
      </form>
      {error && <p>{error}</p>}
      <div style={{ marginTop: '20px', textAlign: 'left', maxHeight: '500px', overflowY: 'auto' }}>
        {images.length === 0 ? (
          <p>Không tìm thấy hình ảnh.</p>
        ) : (
          images.map((image) => (
            <div key={image.id} style={{ marginBottom: '20px' }}>
              <img src={image.webformatURL} alt={image.tags} style={{ width: '200px', height: 'auto' }} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ImageSearch;
