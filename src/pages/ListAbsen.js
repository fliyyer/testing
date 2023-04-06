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
    let startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    let endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    if (tanggalAbsen) {
      let selectedDate = new Date(tanggalAbsen);
      startOfDay = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate()
      );
      endOfDay = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
        23,
        59,
        59,
        999
      );
    }

    absensiRef = absensiRef
      .where("waktu", ">=", startOfDay)
      .where("waktu", "<=", endOfDay);

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

  const totalHadir = absenData.filter(
    (absen) => absen.keterangan === "Hadir"
  ).length;
  const totalIzin = absenData.filter(
    (absen) => absen.keterangan === "Izin"
  ).length;
  const totalSakit = absenData.filter(
    (absen) => absen.keterangan === "Sakit"
  ).length;

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
          max={new Date().toISOString().split("T")[0]}
          className="border-2 border-gray-200 p-2 rounded-lg"
        />
      </div>
      <div className="px-4 mt-12">
        <div className="mb-4">
          <div className="font-medium">
            Hadir: <span className="text-green-500">{totalHadir}</span>
          </div>
          <div className="font-medium">
            Izin: <span className="text-yellow-500">{totalIzin}</span>
          </div>
          <div className="font-medium">
            Sakit: <span className="text-red-500">{totalSakit}</span>
          </div>
        </div>
        <table className="min-w-full ">
          <thead>
            <tr >
              <th className="border-2 text-sm border-gray-200 px-1 py-1 text-center ">No</th>
              <th className="text-left border-2 text-sm border-gray-200 px-1 py-1 sm:px-4 sm:py-2 ">Nama</th>
              <th className="text-left border-2 text-sm border-gray-200 px-1 py-1 sm:px-4 sm:py-2 ">Keterangan</th>
              <th className="text-left border-2 text-sm border-gray-200 px-1 py-1 sm:px-4 sm:py-2 ">Divisi</th>
              <th className="text-left border-2 text-sm border-gray-200 px-1 py-1 sm:px-4 sm:py-2 ">Waktu</th>
            </tr>
          </thead>
          <tbody>
            {absenData.map((absen, index) => (
              <tr key={absen.id}>
                <td className="border-2 text-sm border-gray-200 px-1 py-1 text-center">
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
                    new Date(absen.waktu.seconds * 1000).toLocaleTimeString(
                      "en-US",
                      { hour: "numeric", minute: "numeric" }
                    )}
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
