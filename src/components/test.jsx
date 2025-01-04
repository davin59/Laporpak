import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup as LeafletPopup,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

// SETUP LOKASI
const locations = {
  Yogyakarta: {
    Gondomanan: [-7.8024, 110.3671],
    Kotagede: [-7.8264, 110.4],
    Umbulharjo: [-7.8242, 110.3781],
  },
  Sleman: {
    Depok: [-7.7621, 110.4161],
    Ngaglik: [-7.7018, 110.3898],
    Gamping: [-7.7833, 110.3285],
  },
  Bantul: {
    Banguntapan: [-7.8501, 110.4153],
    Sewon: [-7.8818, 110.3576],
    Kasihan: [-7.8372, 110.3349],
  },
};

// NAVBAR DAN PEMILIHAN WILAYAH
const Navbar = ({ onSearch, toggleMenu, isMenuOpen }) => {
  const [wilayah, setWilayah] = useState("");
  const [kecamatan, setKecamatan] = useState("");

  return (
    <nav className="bg-gray-100 text-black p-4 flex items-center justify-between relative z-50">
      <div className="text-3xl font-bold">Laporpak.</div>
      <div className="hidden md:flex items-center gap-4">
        <select
          className="p-2 rounded bg-white-300"
          value={wilayah}
          onChange={(e) => setWilayah(e.target.value)}
        >
          <option value="">--Pilih Wilayah--</option>
          {Object.keys(locations).map((wil) => (
            <option key={wil} value={wil}>
              {wil}
            </option>
          ))}
        </select>
        <select
          className="p-2 rounded bg-white-300"
          value={kecamatan}
          onChange={(e) => setKecamatan(e.target.value)}
        >
          <option value="">--Pilih Kecamatan--</option>
          {wilayah &&
            Object.keys(locations[wilayah]).map((kec) => (
              <option key={kec} value={kec}>
                {kec}
              </option>
            ))}
        </select>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => onSearch(wilayah, kecamatan)}
        >
          Cari
        </button>
      </div>
      <div className="md:hidden">
        <button className="hamburger-menu p-2 rounded" onClick={toggleMenu}>
          ☰
        </button>
      </div>
      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white text-black p-4 flex flex-col gap-4 md:hidden">
          <select
            className="p-2 rounded bg-white"
            value={wilayah}
            onChange={(e) => setWilayah(e.target.value)}
          >
            <option value="">Pilih Wilayah</option>
            {Object.keys(locations).map((wil) => (
              <option key={wil} value={wil}>
                {wil}
              </option>
            ))}
          </select>
          <select
            className="p-2 rounded bg-white"
            value={kecamatan}
            onChange={(e) => setKecamatan(e.target.value)}
          >
            <option value="">Pilih Kecamatan</option>
            {wilayah &&
              Object.keys(locations[wilayah]).map((kec) => (
                <option key={kec} value={kec}>
                  {kec}
                </option>
              ))}
          </select>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            onClick={() => {
              onSearch(wilayah, kecamatan);
              toggleMenu();
            }}
          >
            Kirim
          </button>
        </div>
      )}
    </nav>
  );
};

// POP UP UNTUK MEMUNCULKAN INPUTAN
const Popup = ({ show, onClose, onReportClick }) => {
  return show ? (
    <div className="fixed bottom-0 md:bottom-4 right-0 md:right-4 md:w-1/5 w-full bg-blue-500 text-white p-4 rounded-t-lg md:rounded-lg shadow-lg z-50">
      <div className="flex justify-between items-center">
        <span className="font-bold">Buat Laporan Anda</span>
        <button className="text-white hover:text-gray-300" onClick={onClose}>
          ✖
        </button>
      </div>
      <button
        className="mt-4 bg-white text-blue-500 px-4 py-2 rounded w-full"
        onClick={onReportClick}
      >
        Buat Laporan
      </button>
    </div>
  ) : null;
};

// FORM PENGISIAN INPUT UNTUK USER
const ReportForm = ({ show, onClose, onSubmit }) => {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [foto, setFoto] = useState(null);
  const [komentar, setKomentar] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ nama, email, foto, komentar });
    onClose();
  };

  return show ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-full md:w-1/3 p-6 rounded shadow-lg">
        <h2 className="text-lg font-bold mb-4">Formulir Laporan</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Nama</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Masukkan Nama"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-black">Email</label>
            <input
              type="email"
              className="w-full p-2 border rounded"
              placeholder="Masukkan Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-black">Foto</label>
            <input
              type="file"
              className="w-full p-2 border rounded"
              onChange={(e) => setFoto(e.target.files[0])}
            />
          </div>
          <div className="mb-4">
            <label className="block text-black">Komentar</label>
            <textarea
              className="w-full p-2 border rounded"
              placeholder="Masukkan Komentar"
              value={komentar}
              onChange={(e) => setKomentar(e.target.value)}
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-red-500 text-white px-4 py-2 rounded mr-2"
              onClick={onClose}
            >
              Batal
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Kirim
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : null;
};

// MENAMPILAKN OUTPUT DARI INPUTAN USER
const ReportContainer = ({ reports, onDelete }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4">
      {reports.map((report, index) => (
        <div key={index} className="bg-white shadow rounded p-4 relative">
          {/* Tombol Update dan Delete */}
          <div className="absolute top-4 right-4 flex space-x-2">
            <button
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              // Update logic here
            >
              Update
            </button>
            <button
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              onClick={() => onDelete(report.id)}
            >
              <img
                src="https://img.icons8.com/ios-filled/50/ffffff/trash.png" // Trash icon URL
                alt="Delete"
                className="w-5 h-5"
              />
            </button>
          </div>

          {/* Konten Laporan */}
          <p className="font-bold text-lg">
            <strong>Nama:</strong> {report.nama}
          </p>
          <p className="text-gray-600">
            <strong>Email:</strong> {report.email}
          </p>
          {report.foto && (
            <div>
              <strong>Foto:</strong>
              <img
                src={URL.createObjectURL(report.foto)}
                alt="Uploaded"
                className="w-32 h-32 object-cover rounded mt-2"
              />
            </div>
          )}
          <p className="text-gray-600">
            <strong>Komentar:</strong> {report.komentar}
          </p>
        </div>
      ))}
    </div>
  );
};

// KOMBINASI SEMUA KOMPONENNYA
const App = () => {
  const [reports, setReports] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const onSearch = (wilayah, kecamatan) => {
    if (wilayah && kecamatan) {
      setSearchResults(locations[wilayah][kecamatan]);
      setShowPopup(true);
    }
  };

  const onReportClick = () => {
    setShowForm(true);
  };

  const onFormClose = () => {
    setShowForm(false);
  };

  const onSubmitReport = (reportData) => {
    const newReport = { ...reportData, id: new Date().getTime() };
    setReports((prevReports) => [...prevReports, newReport]);
  };

  const onDeleteReport = (id) => {
    setReports((prevReports) => prevReports.filter((report) => report.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-200">
      <Navbar
        onSearch={onSearch}
        toggleMenu={toggleMenu}
        isMenuOpen={isMenuOpen}
      />
      <MapContainer
        center={[-7.7975, 110.3694]} // Central position for Yogyakarta
        zoom={13}
        style={{ width: "100%", height: "400px" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
        />
        {searchResults.map((position, index) => (
          <Marker position={position} key={index}>
            <LeafletPopup>
              <span>{Object.keys(locations)[index]}</span>
            </LeafletPopup>
          </Marker>
        ))}
      </MapContainer>

      <Popup show={showPopup} onClose={() => setShowPopup(false)} onReportClick={onReportClick} />
      <ReportForm show={showForm} onClose={onFormClose} onSubmit={onSubmitReport} />
      <ReportContainer reports={reports} onDelete={onDeleteReport} />
    </div>
  );
};

export default App;
