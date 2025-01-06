import { useState } from "react";



import locations from "../../public/Data/data.json";

export default function NewNavbar({

  wilayah,
  setWilayah,
  kecamatan,
  setKecamatan,
  setUpdateMap,
}) {

    const handleWilayahChange = (e) => {
        const selectedWilayah = e.target.value;
        setWilayah(selectedWilayah);
        setKecamatan(""); // Reset kecamatan when wilayah changes
        setUpdateMap(true); // Trigger map update
        localStorage.setItem("wilayah", selectedWilayah); // Save to localStorage
      };
      
      const handleKecamatanChange = (e) => {
        const selectedKecamatan = e.target.value;
        setKecamatan(selectedKecamatan);
        setUpdateMap(true); // Trigger map update
        localStorage.setItem("kecamatan", selectedKecamatan); // Save to localStorage
      };
      


return (
    <div className="drawer z-40">
    <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
    <div className="drawer-content flex flex-col">
      {/* Navbar */}
    <div className="navbar bg-white w-full">
        <div className="flex-none lg:hidden">
        <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
            <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-6 w-6 stroke-current">
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
            </label>
        </div>
        <div className="mx-2 flex-1 text-3xl font-bold px-2">LaporPak.</div>
            <ul className="menu-horizontal gap-2">
                <select
                    className="rounded select  select-bordered select-sm bg-white hidden md:flex"
                    value={wilayah}
                    onChange={handleWilayahChange}
                >
                    <option value="">Pilih Wilayah</option>
                    {Object.keys(locations).map((wil) => (
                    <option key={wil} value={wil}>
                            {wil}
                        </option>
                        ))}
                </select>
                <select
                    className="rounded  select  select-bordered select-sm bg-white hidden md:flex     "
                    value={kecamatan}
                    onChange={handleKecamatanChange}>
                    <option value="">Pilih Kecamatan</option>
                    {wilayah &&
                    Object.keys(locations[wilayah]).map((kec) => (
                        <option key={kec} value={kec}>
                        {kec}
                        </option>
                ))}
            </select>
            <label htmlFor="my_modal_7" className="btn btn-sm border">MASUKAN LAPORAN ANDA </label>
            </ul>
        </div>
    </div>
    <div className="drawer-side ">
        <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 gap-2 min-h-full w-80 p-4 ">
        {/* Sidebar content here */}
        <p className="font-bold">LaporPak.</p>       
        <li>
            <select
                className="p-2 rounded bg-white"
                value={wilayah}
                onChange={handleWilayahChange}>
                <option value="">Pilih Wilayah</option>
                {Object.keys(locations).map((wil) => (
                <option key={wil} value={wil}>
                    {wil}
                </option>
            ))}</select>
        </li>
        <li>
            <select
                className="p-2 rounded bg-white"
                value={kecamatan}
                onChange={handleKecamatanChange}>
                <option value="">Pilih Kecamatan</option>
                {wilayah &&
                Object.keys(locations[wilayah]).map((kec) => (
                <option key={kec} value={kec}>
                {kec}
                </option>
                ))}
            </select>
        </li>
    </ul>
    </div>
    </div>
);
}
