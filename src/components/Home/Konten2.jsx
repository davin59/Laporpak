import React, { useEffect, useState, useRef } from "react";
import SearchBar from "./SearchBar";
import Konten3 from "./Konten3"; // Import Konten3

const Konten2 = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const sliderRef = useRef(null);

  useEffect(() => {
    fetch("/Data/Konten2.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((json) => setData(json))
      .catch((error) => console.error("Error:", error));
  }, []);

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const scrollSlider = (direction) => {
    if (direction === "left") {
      sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
    } else {
      sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="relative p-6">
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div
        ref={sliderRef}
        className="flex overflow-x-auto overflow-hidden gap-6 scrollbar-hide"
      >
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
              <p className="text-gray-700">Populasi: {item.population}</p>
            </div>
          ))
        ) : (
          <div className="text-gray-500 p-6">TIDAK ADA BERITA UNTUK PENCARIAN INI.</div>
        )}
      </div>

      {/* Tombol kiri di pojok kiri */}
      <button
        onClick={() => scrollSlider("left")}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-600"
      >
        ❮
      </button>

      {/* Tombol kanan di pojok kanan */}
      <button
        onClick={() => scrollSlider("right")}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-600"
      >
        ❯
      </button>

      {/* Konten3 displayed below Konten2 */}
      <Konten3 searchTerm={searchTerm} />
    </div>
  );
};

export default Konten2;
