import React, { useEffect, useState } from 'react';

const Konten1 = () => {
  const [data, setData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
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

  // Fungsi untuk navigasi ke container berikutnya (loop kembali ke awal setelah data terakhir)
  const handleNext = () => {
    if (currentIndex < data.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // Kembali ke data pertama
    }
  };

  // Fungsi untuk navigasi ke container sebelumnya (loop kembali ke data terakhir setelah data pertama)
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(data.length - 1); // Kembali ke data terakhir
    }
  };

  return (
    <div className="relative w-full h-screen bg-gray-100">
      {/* Container di bagian atas */}
      <div className="w-full h-[40%] bg-white shadow-lg rounded-lg p-6 flex items-center justify-between relative">
        {data.length > 0 && (
          <div className="flex items-center justify-between w-full">
            {/* Gambar di sebelah kiri */}
            <div className="w-1/2 pr-4">
              <img
                src={data[currentIndex].image}
                alt={data[currentIndex].name}
                className="w-full h-auto object-contain rounded-lg"
              />
            </div>

            {/* Teks di sebelah kanan */}
            <div className="w-1/2 pl-4">
              <h2 className="text-2xl font-bold mb-4">{data[currentIndex].name}</h2>
              <p className="text-gray-700">Populasi: {data[currentIndex].population}</p>
            </div>
          </div>
        )}

        {/* Tombol Navigasi Kiri */}
        <button
          onClick={handlePrev}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-300 hover:bg-gray-400 p-3 rounded-full"
          disabled={data.length === 0}
        >
          ◀
        </button>

        {/* Tombol Navigasi Kanan */}
        <button
          onClick={handleNext}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-300 hover:bg-gray-400 p-3 rounded-full"
          disabled={data.length === 0}
        >
          ▶
        </button>
      </div>
    </div>
  );
};

export default Konten1;
