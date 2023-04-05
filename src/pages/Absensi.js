import React, { useState, useEffect } from "react";
import { db } from "../Firebase";
import Navbar from "../component/Navbar";
import { auth } from "../Firebase";
import firebase from 'firebase/compat/app';
import { useNavigate } from "react-router-dom";
import 'firebase/firestore';
import Swal from 'sweetalert2'

const Absensi = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [option, setOption] = useState("");
  const [submittedToday, setSubmittedToday] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (user) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
  
      db.collection("absensi")
        .where("uid", "==", user.uid)
        .where("waktu", ">=", today)
        .where("waktu", "<", new Date(today.getTime() + 24 * 60 * 60 * 1000))
        .get()
        .then((querySnapshot) => {
          if (!querySnapshot.empty) {
            setSubmittedToday(true);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [user]);

  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser({
          uid: authUser.uid,
          email: authUser.email,
        });
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleKeteranganChange = (e) => {
    setKeterangan(e.target.value);
  };

  const handleOptionChange = (e) => {
    setOption(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Anda Harus Login Terlebih Dahulu!',
      })
      navigate("/login");
      return;
    }
  
    // mengambil tanggal saat ini dan mengubah formatnya menjadi yyyy-MM-dd
    const today = new Date().toISOString().slice(0, 10);
  
    // query untuk mencari data absensi pengguna dengan uid dan tanggal yang sama
    const absensiRef = db
      .collection("absensi")
      .where("uid", "==", user.uid)
      .where("tanggal", "==", today);
  
    // mengecek apakah pengguna sudah melakukan absen di hari yang sama atau tidak
    absensiRef.get().then((querySnapshot) => {
      if (!querySnapshot.empty) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Anda sudah melakukan absensi hari ini!',
        })
        return;
      }
  
      // jika belum melakukan absen, simpan data absensi ke Firestore
      if (name && keterangan && option) {
        const currentTime = firebase.firestore.Timestamp.now();
        db.collection("absensi")
          .add({
            uid: user.uid,
            email: user.email,
            waktu: currentTime,
            tanggal: today, // menyimpan tanggal saat ini
            nama: name,
            keterangan: keterangan,
            option: option,
          })
          .then(() => {
            setName("");
            setKeterangan("");
            setOption("");
            Swal.fire(
              'Good job!',
              'You clicked the button!',
              'success'
            )
            navigate("/listabsen");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };
  
  
  

  return (
    <div>
      <Navbar />
      <div class="flex flex-col items-center">
  <h1 class="text-center mt-8 text-xl font-bold">Absensi Mahasiswa</h1>
  <div class="mt-8 w-full max-w-md">
    <form onSubmit={handleSubmit} class="flex flex-col p-6 space-y-4">
      <label class="flex flex-col space-y-1">
        <span class="font-medium">Nama:</span>
        <input type="text" value={name} onChange={handleNameChange} class="rounded-lg border-gray-300 border p-2" />
      </label>
      <label class="flex flex-col space-y-1">
        <span class="font-medium">Keterangan:</span>
        <select value={keterangan} onChange={handleKeteranganChange} class="rounded-lg border-gray-300 border p-2">
          <option value="">Pilih keterangan</option>
          <option value="Hadir">Hadir</option>
          <option value="Sakit">Sakit</option>
          <option value="Izin">Izin</option>
        </select>
      </label>
      <label class="flex flex-col space-y-1">
        <span class="font-medium">Divisi:</span>
        <select value={option} onChange={handleOptionChange} class="rounded-lg border-gray-300 border p-2">
          <option value="">Pilih option</option>
          <option value="EMO">EMO</option>
          <option value="PMO">PMO</option>
          <option value="GDS BECdex">GDS BECdex</option>
          <option value="GDS MMPT">GDS MMPT</option>
          <option value="WDA BECdex">WDA BECdex</option>
          <option value="WDA MMH">WDA MMH</option>
        </select>
      </label>
      <button type="submit" disabled={submittedToday} class="bg-blue-500 text-white rounded-lg py-2 disabled:bg-gray-400 disabled:cursor-not-allowed">{submittedToday ? "Submitted Today" : "Submit"}</button>
    </form>
  </div>
</div>
    </div>

  );
};

export default Absensi;
