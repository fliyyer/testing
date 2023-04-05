import React, { useState, useEffect } from "react";
import { db } from "../Firebase";
import Navbar from "../component/Navbar";

const ListAbsen = () => {
  const [absenData, setAbsenData] = useState([]);
  const [tanggalAbsen, setTanggalAbsen] = useState("");

  const handleTanggalChange = (e) => {
    setTanggalAbsen(e.target.value);
  };

  useEffect(() => {
    let absensiRef = db.collection("absensi");

    if (tanggalAbsen) {
      absensiRef = absensiRef.where("waktu", ">=", new Date(tanggalAbsen));
    }

    absensiRef.orderBy("waktu", "desc").onSnapshot((snapshot) => {
      const data = [];
      snapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      setAbsenData(data);
    });
  }, [tanggalAbsen]);

  const getKeteranganColor = (keterangan) => {
    switch (keterangan) {
      case "Hadir":
        return "bg-green-300 text-black";
      case "Izin":
        return "bg-yellow-300 text-black";
      case "Sakit":
        return "bg-red-300 text-black";
      default:
        return "";
    }
  };

  return (
    <div>
      <Navbar />
      <h2 className="text-center font-medium mt-4">Daftar Absensi</h2>
      <div className="flex flex-col items-center justify-center mt-5">
        <label htmlFor="tanggalAbsen" className="mb-2">
          Lihat absensi tanggal:
        </label>
        <input
          type="date"
          id="tanggalAbsen"
          value={tanggalAbsen}
          onChange={handleTanggalChange}
          className="border-2 border-gray-200 p-2 rounded-lg"
        />
      </div>
      <div className="px-4 mt-12">
        <table className="min-w-full ">
          <thead>
            <tr>
              <th className="text-left">No</th>
              <th className="text-left">Nama</th>
              <th className="text-left">Keterangan</th>
              <th className="text-left">Divisi</th>
              <th className="text-left">Waktu</th>
            </tr>
          </thead>
          <tbody>
            {absenData.map((absen, index) => (
              <tr key={absen.id}>
                <td className="border-2 text-sm border-gray-200 px-1 py-1 sm:px-4 sm:py-2">
                  {index + 1}
                </td>
                <td className="border-2 text-sm border-gray-200 px-1 py-1 sm:px-4 sm:py-2">
                  {absen.nama}
                </td>
                <td
                  className={`border-2 border-gray-200 px-1 py-1 sm:px-4 sm:py-2 ${getKeteranganColor(
                    absen.keterangan
                  )}`}
                >
                  {absen.keterangan}
                </td>
                <td className="border-2 border-gray-200 px-1 py-1 sm:px-4 sm:py-2">
                  {absen.option}
                </td>
                <td className="border-2 border-gray-200 px-1 py-1 sm:px-4 sm:py-2">
                  {absen.waktu &&
                    new Date(absen.waktu.seconds * 1000).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListAbsen;
