import React, { useState, useEffect } from "react";

export default function ModalAdd({ selectedReport, setSelectedReport }) {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [wilayah, setWilayah] = useState(localStorage.getItem("wilayah") || "");
  const [kecamatan, setKecamatan] = useState(localStorage.getItem("kecamatan") || "");
  const [deskripsi, setDeskripsi] = useState("");
  const [gambar, setGambar] = useState(null);
  const [gambarURL, setGambarURL] = useState(null);

  useEffect(() => {
    if (selectedReport) {
      setNama(selectedReport.nama);
      setEmail(selectedReport.email);
      setWilayah(selectedReport.wilayah);
      setKecamatan(selectedReport.kecamatan);
      setDeskripsi(selectedReport.deskripsi);
      setGambarURL(selectedReport.gambar); // For displaying the image preview when editing
    }
  }, [selectedReport]);

  useEffect(() => {
    if (gambar) {
      const fileURL = URL.createObjectURL(gambar);
      setGambarURL(fileURL);
    }
  }, [gambar]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert the image to base64 before saving it to localStorage
    const reader = new FileReader();
    reader.onloadend = () => {
      const existingReports = JSON.parse(localStorage.getItem("laporanPengguna")) || [];

      // If there's a selected report, replace it, otherwise add a new one
      const newReport = {
        nama,
        email,
        wilayah,
        kecamatan,
        deskripsi,
        gambar: reader.result, // Store the base64 string of the image
      };

      let updatedReports;
      if (selectedReport) {
        // Update the selected report
        updatedReports = existingReports.map((report) =>
          report.email === selectedReport.email ? newReport : report
        );
      } else {
        // Add new report
        updatedReports = [...existingReports, newReport];
      }

      // Save the updated reports to localStorage
      localStorage.setItem("laporanPengguna", JSON.stringify(updatedReports));

      // Reset form and close modal
      setNama("");
      setEmail("");
      setDeskripsi("");
      setGambar(null);
      setGambarURL(null); // Reset the image preview
      setSelectedReport(null); // Clear the selected report for editing

      alert("Laporan berhasil disimpan!");
      window.location.reload();
    };

    // Start reading the file as base64
    if (gambar) {
      reader.readAsDataURL(gambar);
    } else {
      // Handle the case where there is no image file selected
      const existingReports = JSON.parse(localStorage.getItem("laporanPengguna")) || [];

      const newReport = {
        nama,
        email,
        wilayah,
        kecamatan,
        deskripsi,
        gambar: "", // If no image is provided
      };

      let updatedReports;
      if (selectedReport) {
        updatedReports = existingReports.map((report) =>
          report.email === selectedReport.email ? newReport : report
        );
      } else {
        updatedReports = [...existingReports, newReport];
      }

      // Save the updated reports to localStorage
      localStorage.setItem("laporanPengguna", JSON.stringify(updatedReports));

      // Reset form and close modal
      setNama("");
      setEmail("");
      setDeskripsi("");
      setGambar(null);
      setGambarURL(null); // Reset the image preview
      setSelectedReport(null);

      alert("Laporan berhasil disimpan!");
      window.location.reload();
    }
  };

  return (
    <>
      <input type="checkbox" id="my_modal_7" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="text-lg font-bold">
            {selectedReport ? "Edit Laporan" : "Masukkan Laporan Anda"}
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Nama</span>
              </label>
              <input
                type="text"
                placeholder="Nama"
                className="input input-bordered"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
              />
            </div>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                placeholder="Email"
                className="input input-bordered"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Wilayah</span>
              </label>
              <input
                type="text"
                placeholder="Wilayah"
                className="input input-bordered"
                value={wilayah}
                onChange={(e) => setWilayah(e.target.value)}
              />
            </div>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Kecamatan</span>
              </label>
              <input
                type="text"
                placeholder="Kecamatan"
                className="input input-bordered"
                value={kecamatan}
                onChange={(e) => setKecamatan(e.target.value)}
              />
            </div>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Deskripsi Masalah Anda</span>
              </label>
              <textarea
                placeholder="Masukkan deskripsi masalah anda"
                className="textarea textarea-bordered"
                value={deskripsi}
                onChange={(e) => setDeskripsi(e.target.value)}
              />
            </div>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Upload Gambar</span>
              </label>
              <input
                type="file"
                className="file-input file-input-bordered"
                onChange={(e) => setGambar(e.target.files[0])}
              />
              {gambarURL && (
                <img src={gambarURL} alt="Preview" className="mt-2 w-32" />
              )}
            </div>

            <div className="modal-action">
              <label htmlFor="my_modal_7" className="btn btn-secondary">
                Batal
              </label>
              <button type="submit" className="btn btn-primary">
                {selectedReport ? "Simpan Perubahan" : "Kirim Laporan"}
              </button>
            </div>
          </form>
        </div>
        <label className="modal-backdrop" htmlFor="my_modal_7">
          Close
        </label>
      </div>
    </>
  );
}
