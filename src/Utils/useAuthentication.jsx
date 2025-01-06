import { useState, useEffect } from "react";

const useAuthentication = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Cek status autentikasi ketika komponen pertama kali di-mount
  useEffect(() => {
    const checkAuthentication = () => {
      const token = localStorage.getItem("dataRegisterUsers");

      // Periksa apakah token valid (contoh: tidak kosong dan berbentuk JSON)
      try {
        if (token && JSON.parse(token)) {
          setIsAuthenticated(true); // Set autentikasi menjadi true jika token valid
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error parsing token:", error);
        setIsAuthenticated(false);
      }
    };

    checkAuthentication();
  }, []); // Dependensi kosong memastikan ini hanya berjalan saat komponen pertama kali di-mount

  return isAuthenticated;
};

export default useAuthentication;