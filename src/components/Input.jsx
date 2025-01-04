import React, { useState, useEffect } from "react";

const Input = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    image: null,
    choice1: "",
    choice2: "",
    comment: "",
  });
  const [submittedData, setSubmittedData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem("submittedData");
    if (storedData) {
      setSubmittedData(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("submittedData", JSON.stringify(submittedData));
  }, [submittedData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingIndex !== null) {
      const updatedData = submittedData.map((data, index) =>
        index === editingIndex ? formData : data
      );
      setSubmittedData(updatedData);
      setEditingIndex(null);
    } else {
      setSubmittedData([...submittedData, formData]);
    }
    setFormData({
      name: "",
      email: "",
      image: null,
      choice1: "",
    });
  };

  const handleDelete = (index) => {
    const updatedData = submittedData.filter((_, i) => i !== index);
    setSubmittedData(updatedData);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setFormData(submittedData[index]);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6">Masukan Laporan Anda</h1>
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Nama
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            name="name"
            type="text"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="image"
          >
            Image
          </label>
          <input
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            id="image"
            name="image"
            type="file"
            accept="image/*"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="comment"
          >
            Comment
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="comment"
            name="comment"
            placeholder="Enter your comment"
            value={formData.comment}
            onChange={handleChange}
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {editingIndex !== null ? "Update" : "Submit"}
        </button>
      </form>
      {submittedData.length > 0 && (
        <div className="mt-6 bg-white shadow-md rounded px-8 pt-6 pb-8">
          <h2 className="text-xl font-bold mb-4">Submitted Data</h2>
          {submittedData.map((data, index) => (
            <div key={index} className="mb-4 p-4 border-b">
              <p>
                <strong>Name:</strong> {data.name}
              </p>
              <p>
                <strong>Email:</strong> {data.email}
              </p>
              {data.image && (
                <div className="mt-4">
                  <strong>Image Preview:</strong>
                  <img
                    src={URL.createObjectURL(data.image)}
                    alt="Preview"
                    className="mt-2 max-w-xs rounded"
                  />
                </div>
              )}
              <p>
                <strong>Comment:</strong> {data.comment}
              </p>
              <button
                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded mt-2"
                onClick={() => handleEdit(index)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded mt-2"
                onClick={() => handleDelete(index)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Input;
