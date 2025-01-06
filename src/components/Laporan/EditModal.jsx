import React from "react";

export default function EditModal({
  editIndex,
  nama,
  setNama,
  email,
  setEmail,
  wilayah,
  setWilayah,
  kecamatan,
  setKecamatan,
  deskripsi,
  setDeskripsi,
  gambarURL,
  handleImageChange,
  handleSaveEdit,
  handleDiscardEdit,
}) {
  if (editIndex === null) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-10 bg-gray-900 bg-opacity-50">
      <div className="modal-box bg-white p-5 rounded-lg shadow-lg">
        <h3 className="text-lg font-bold">Edit Laporan</h3>
        <form onSubmit={handleSaveEdit}>
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
              <span className="label-text">Deskripsi</span>
            </label>
            <textarea
              placeholder="Deskripsi masalah"
              className="textarea textarea-bordered"
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
            />
          </div>

          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Foto</span>
            </label>
            <input
              type="file"
              className="input input-bordered"
              onChange={handleImageChange}
            />
            {gambarURL && (
              <div className="mt-2">
                <img src={gambarURL} alt="Preview" className="w-32 h-32 object-cover rounded-xl" />
              </div>
            )}
          </div>

          <div className="modal-action">
            <button
              type="button"
              onClick={handleDiscardEdit}
              className="btn btn-error text-white"
            >
              Discard
            </button>
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
