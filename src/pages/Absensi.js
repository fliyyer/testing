import React, { useState, useRef } from "react";
import QrReader from "react-webcam-qr-scanner";
import QRCode from "qrcode.react";
import { db } from "../Firebase";
import Navbar from "../component/Navbar";

const Absensi = ({ user }) => {
  const [scannedResult, setScannedResult] = useState(null);
  const [qrCodeValue, setQrCodeValue] = useState("");
  const webcamRef = useRef(null);
  const validQrCode = "https://qr-codes-svg.s3.amazonaws.com/Ov5IP8.svg?1680619761376";

  const handleScan = (result) => {
    if (result) {
      setScannedResult(result);
      setQrCodeValue(result.text);
      if (result.text === validQrCode) {
        const currentTime = new Date().toLocaleString();
        db.collection("absensi")
          .add({
            uid: user.uid,
            email: user.email,
            waktu: currentTime,
            qrCode: result.text,
          })
          .then(() => {
            setQrCodeValue("");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };

  const handleError = (error) => {
    console.log(error);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (qrCodeValue === validQrCode) {
      const currentTime = new Date().toLocaleString();
      db.collection("absensi")
        .add({
          uid: user.uid,
          email: user.email,
          waktu: currentTime,
          qrCode: qrCodeValue,
        })
        .then(() => {
          setQrCodeValue("");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div>
        <Navbar />
      <h1>Absensi Mahasiswa</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <QrReader
              ref={webcamRef}
              delay={300}
              onError={handleError}
              onScan={handleScan}
              style={{ width: "100%" }}
            />
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
      <div>
        {qrCodeValue ? (
          <div>
            <h3>QR Code Value: {qrCodeValue}</h3>
            <QRCode value={qrCodeValue} />
          </div>
        ) : (
          <h3>No QR code detected</h3>
        )}
      </div>
      <div>
        {scannedResult ? (
          <h3>Scanned Result: {scannedResult}</h3>
        ) : (
          <h3>No result yet</h3>
        )}
      </div>
    </div>
  );
};

export default Absensi;
