import React, { useEffect, useState, useRef } from "react";
import SearchBar from "./SearchBar";

const Mainkonten = () => {
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const sliderRef1 = useRef(null);
  const sliderRef2 = useRef(null);
  const sliderRef3 = useRef(null);

  // Fetch data from Konten2.json
  useEffect(() => {
    fetch("/Data/Konten1.json")
      .then((response) => response.json())
      .then((json) => setData1(json))
      .catch((error) => console.error("Error fetching Konten2:", error));
  }, []);

  // Fetch data from Konten3.json
  useEffect(() => {
    fetch("/Data/Konten2.json")
      .then((response) => response.json())
      .then((json) => setData2(json))
      .catch((error) => console.error("Error fetching Konten3:", error));
  }, []);

  // Fetch data from Konten4.json
  useEffect(() => {
    fetch("/Data/Konten3.json")
      .then((response) => response.json())
      .then((json) => setData3(json))
      .catch((error) => console.error("Error fetching Konten4:", error));
  }, []);

  // Filter data based on search term
  const filteredData1 = data1.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredData2 = data2.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredData3 = data3.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Scroll function for sliders
  const scrollSlider = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      ref.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="relative p-6">
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* Slider 1 - Konten1 */}
      <h2 className="text-2xl font-bold mb-4">Berita Hari Ini</h2>
      <div
        ref={sliderRef1}
        className="flex overflow-x-auto gap-6 scrollbar-hide"
      >
        {filteredData1.length > 0 ? (
          filteredData1.map((item) => (
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
              <p className="text-gray-700">{item.news}</p>
            </div>
          ))
        ) : (
          <div className="text-gray-500 p-6">TIDAK ADA BERITA YANG ANDA CARI</div>
        )}
      </div>

      {/* Slider 2 - Konten2 */}
      <h2 className="text-2xl font-bold mt-12 mb-4">Berita Kemaren</h2>
      <div
        ref={sliderRef2}
        className="flex overflow-x-auto gap-6 scrollbar-hide"
      >
        {filteredData2.length > 0 ? (
          filteredData2.map((item) => (
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
              <p className="text-gray-700"> {item.news}</p>
            </div>
          ))
        ) : (
          <div className="text-gray-500 p-6">TIDAK ADA BERITA YANG ANDA CARI</div>
        )}
      </div>

      {/* Slider 3 - Konten3 */}
      <h2 className="text-2xl font-bold mt-12 mb-4">Berita Lampau</h2>
      <div
        ref={sliderRef3}
        className="flex overflow-x-auto gap-6 scrollbar-hide"
      >
        {filteredData3.length > 0 ? (
          filteredData3.map((item) => (
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
              <p className="text-gray-700">{item.news}</p>
            </div>
          ))
        ) : (
          <div className="text-gray-500 p-6">TIDAK ADA BERITA YANG ANDA CARI</div>
        )}
      </div>
    </div>
  );
};

export default Mainkonten;
