import React, { useEffect, useState } from 'react';

const Konten3 = ({ searchTerm }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/Data/Konten3.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then((json) => setData(json))
      .catch((error) => console.error('Error:', error));
  }, []);

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative p-6">
      <div className="flex overflow-x-auto overflow-hidden gap-6 scrollbar-hide">
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 min-w-[300px]"
            >
              <img
                src={item.pict}
                alt={item.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h2 className="text-xl font-bold mb-2">{item.name}</h2>
              <p className="text-gray-700">Detail: {item.detail}</p>
            </div>
          ))
        ) : (
          <div ></div>
        )}
      </div>
    </div>
  );
};

export default Konten3;
