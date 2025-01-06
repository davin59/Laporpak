import React, { useEffect, useState } from "react";
import EditModal from "./EditModal";

export default function CardLaporan() {
  const [laporan, setLaporan] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [wilayah, setWilayah] = useState(localStorage.getItem("wilayah") || "");
  const [kecamatan, setKecamatan] = useState(localStorage.getItem("kecamatan") || "");
  const [deskripsi, setDeskripsi] = useState("");
  const [gambar, setGambar] = useState(null);
  const [gambarURL, setGambarURL] = useState(null);

  useEffect(() => {
    const storedLaporan = JSON.parse(localStorage.getItem("laporanPengguna")) || [];
    setLaporan(storedLaporan);
  }, []);

  const handleEdit = (index) => {
    const reportToEdit = laporan[index];
    setEditIndex(index);
    setNama(reportToEdit.nama);
    setEmail(reportToEdit.email);
    setWilayah(reportToEdit.wilayah);
    setKecamatan(reportToEdit.kecamatan);
    setDeskripsi(reportToEdit.deskripsi);
    setGambarURL(reportToEdit.gambar);
  };

  const handleDelete = (index) => {
    const updatedLaporan = laporan.filter((_, i) => i !== index);
    localStorage.setItem("laporanPengguna", JSON.stringify(updatedLaporan));
    setLaporan(updatedLaporan);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();

    const reader = new FileReader();
    reader.onloadend = () => {
      const updatedLaporan = [...laporan];
      updatedLaporan[editIndex] = {
        nama,
        email,
        wilayah,
        kecamatan,
        deskripsi,
        gambar: reader.result,
      };
      localStorage.setItem("laporanPengguna", JSON.stringify(updatedLaporan));
      setLaporan(updatedLaporan);
      resetForm();
    };

    if (gambar) {
      reader.readAsDataURL(gambar);
    } else {
      const updatedLaporan = [...laporan];
      updatedLaporan[editIndex] = {
        nama,
        email,
        wilayah,
        kecamatan,
        deskripsi,
        gambar: gambarURL, 
      };
      localStorage.setItem("laporanPengguna", JSON.stringify(updatedLaporan));
      setLaporan(updatedLaporan);
      resetForm();
    }
  };

  const resetForm = () => {
    setEditIndex(null);
    setNama("");
    setEmail("");
    setWilayah(localStorage.getItem("wilayah") || "");
    setKecamatan(localStorage.getItem("kecamatan") || "");
    setDeskripsi("");
    setGambar(null);
    setGambarURL(null);
  };

  const handleDiscardEdit = () => {
    resetForm();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setGambar(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setGambarURL(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="absolute gap-2 flex carousel p-2 -z-0 w-full mt-[320px] justify-start">
      {laporan.map((report, index) => (
        <div key={index} className="flex flex-col justify-between min-h-[300px] w-[300px] ju carousel-item bg-white p-3 rounded-xl shadow-sm border">
          {report.gambar && (
            <img
              src={report.gambar}
              alt="Gambar Laporan"
              className="w-full rounded-xl h-32 object-cover"
            />
          )}
          <p className="font-bold">{report.nama}</p>
          <p>Email: {report.email}</p>
          <p>Wilayah: {report.wilayah}</p>
          <p>Kecamatan: {report.kecamatan}</p>
          <q>Deskripsi: {report.deskripsi}</q>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => handleEdit(index)}
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(index)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      {/* Modal for Editing */}
      <EditModal
        editIndex={editIndex}
        nama={nama}
        setNama={setNama}
        email={email}
        setEmail={setEmail}
        wilayah={wilayah}
        setWilayah={setWilayah}
        kecamatan={kecamatan}
        setKecamatan={setKecamatan}
        deskripsi={deskripsi}
        setDeskripsi={setDeskripsi}
        gambarURL={gambarURL}
        handleImageChange={handleImageChange}
        handleSaveEdit={handleSaveEdit}
        handleDiscardEdit={handleDiscardEdit}
      />
    </div>
  );
}
