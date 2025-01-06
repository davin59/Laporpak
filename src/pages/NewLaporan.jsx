import React, { useState } from "react";
import NewNavbar from "../components/NewNavbar";
import Maps from "../components/Laporan/Maps";
import ModalAdd from "../components/Laporan/ModalAdd";
import CardLaporan from "../components/Laporan/CardLaporan";



export default function NewLaporan() {
  const [wilayah, setWilayah] = useState("");
  const [kecamatan, setKecamatan] = useState("");
  const [updateMap, setUpdateMap] = useState(false); // Track if map should update

  const onSearch = (wilayah, kecamatan) => {
    setWilayah(wilayah);
    setKecamatan(kecamatan);
  };

  return (
    <>
    
    <div className="flex flex-col">
      <NewNavbar
        wilayah={wilayah}
        setWilayah={setWilayah}
        kecamatan={kecamatan}
        setKecamatan={setKecamatan}
        onSearch={onSearch}
        setUpdateMap={setUpdateMap}
      />
      <Maps
        wilayah={wilayah}
        kecamatan={kecamatan}
        updateMap={updateMap} // Pass updateMap state to Maps component
      />
      <ModalAdd/>
    </div>
      <CardLaporan/>
      
      </>

  );
}
