import React, { useState, useEffect } from "react";
import { db } from "../Firebase";

const Absen = ({ user }) => {
  const [absensi, setAbsensi] = useState([]);

  useEffect(() => {
    const unsubscribe = db
      .collection("absensi")
      .where("uid", "==", user.uid)
      .orderBy("waktu", "desc")
      .onSnapshot((snapshot) => {
        const data = [];
        snapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });
        setAbsensi(data);
      });

    return unsubscribe;
  }, [user.uid]);

  return (
    <div>
      <h1>Absensi Mahasiswa</h1>
      <table>
        <thead>
          <tr>
            <th>Tanggal dan Waktu</th>
            <th>QR Code</th>
          </tr>
        </thead>
        <tbody>
          {absensi.map((absen) => (
            <tr key={absen.id}>
              <td>{absen.waktu}</td>
              <td>{absen.qrCode}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Absen;