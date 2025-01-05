import React, { useEffect, useState } from 'react';

const Konten1 = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Perbaiki path untuk mengambil file JSON dari folder public
    fetch('/Data/Konten1.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then((json) => setData(json))
      .catch((error) => console.error('Error:', error));
  }, []);

  return (
    <div>
      <h1>Daftar Kota di Indonesia</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            {item.name} - Populasi: {item.population}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Konten1;
