'use client';

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import CheckIcon from '@mui/icons-material/Check';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import axios from "axios";

interface validateDataFace {
  name:string;
  [key:string]:any;
}

const validateData:validateDataFace = {
  name:"mehul mayavanshi",
  member:5,
  channel:'urban forest'
}


const QRCodeReader = () => {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  const [isValidUser, setIsValidUser] = useState<boolean | null>(null);
  const [notValid, setNotValid] = useState<boolean | null>(null);
  const [notValidData, setNotValidData] = useState<string | null>(null);
  const [validData, setValidData] = useState<validateDataFace | null>(null);
  const endRef = useRef<HTMLDivElement | null>(null);


  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  const events = [
    "0_Collaboration_&_Improvisation",
    "1_Threadscapes",
    "2_Cymatics",
    "3_Forest_bathing",
    "4_Be_the_superhero_of_your_life",
    "5_Flower_Pressing",
    "6_Mongolian_throat_singing",
    "7_Tataki_Zomé"
  ]

  const handleEventClick = (event : string) => {
    setSelectedEvent(event);
    console.log("event" , event);
    setScanResult(null);
    setIsValidUser(null);
    setNotValid(null);
    setNotValidData(null);
    setValidData(null);

    setTimeout(() => {
      scannerRef.current?.render(
        (decodedText) => {
          setScanResult(decodedText);
          scannerRef.current?.clear();
        },
        (errorMessage) => {
          console.error("QR Code scan error:", errorMessage);
        }
      );
    }, 100);
 
    endRef.current?.scrollIntoView({behavior:'smooth'})



    
  };







  useEffect(() => {

    const html5QrcodeScanner = new Html5QrcodeScanner(
      "reader",
      {
        fps: 10,
        qrbox: 250,

      },
      false
    );

    scannerRef.current = html5QrcodeScanner;

    html5QrcodeScanner.render(
      (decodedText) => {
        setScanResult(decodedText); 
        html5QrcodeScanner.clear(); 
      },
      (errorMessage) => {
        // console.error("QR Code scan error:", errorMessage);
      }
    );

    return () => {
      html5QrcodeScanner.clear().catch((error) => {
        console.error("Failed to clear QR scanner:", error);
      });
    };
  }, []);


  const validateQRCode = async () => {

    console.log(selectedEvent , scanResult);
    try {
      const res = await axios.post("http://localhost:3000/qrcode/validateqr", {
        qrstring: scanResult,
        eventName:selectedEvent
      });

      if (res.status === 200) {
        setIsValidUser(true);
        setNotValid(false);
        setNotValidData(null);
        console.log(res.data);
        setValidData(res.data.user);
      }
    } catch (err: any) {
      console.log(err);
      setIsValidUser(false);
      setNotValid(true);
      setNotValidData(err.response?.data?.message || "Validation failed");
    }
  };

  const ScanNewQR = () => {
    try {
      setScanResult(null);
      setIsValidUser(false);
      setNotValid(false);
      setNotValidData(null);
      setValidData(null);
      scannerRef.current?.render(
        (decodedText) => {
          setScanResult(decodedText);
          scannerRef.current?.clear();
        },
        (errorMessage) => {
          console.error("QR Code scan error:", errorMessage);
        }
      );
    } catch (err) {
      console.error("Error starting a new scan:", err);
    }
  };

  useEffect(() => {
    if(!scanResult) return;
    validateQRCode();
  }, [scanResult]);

  return (
    <div className="p-4 min-h-screen" ref={endRef}>

<div className="min-h-screen flex items-center justify-center bg-gray-100 py-10">
      <div className=" w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-semibold text-center mb-6">Select an Event</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event}
              className={`p-6 border rounded-lg shadow-md cursor-pointer transition-transform transform hover:scale-105 hover:shadow-xl ${
                selectedEvent === event ? 'bg-blue-500 text-white' : 'bg-white text-black'
              }`}
              onClick={() => handleEventClick(event)}
            >
              <h2 className="text-xl font-semibold text-center">{event.replace(/^\d+_/, "").replace(/_/g, " ")}</h2>
            </div>
          ))}
        </div>
        {selectedEvent && (
          <div className="mt-6 p-4 bg-blue-50 text-blue-800 rounded-lg">
            <p className="text-center">You selected: <strong>{selectedEvent.replace(/^\d+_/, "").replace(/_/g, " ")}</strong></p>
          </div>
        )}
      </div>
    </div>

  <div
        id="reader"
        className="shadow-lg relative"
        ref={endRef}
        style={{ width: "100%", maxWidth: "400px" }}
      ><div className="scanning-line"></div></div>




      {isValidUser && (
        <div className="flex flex-col items-center mt-5 bg-gray-100">
          <div className="max-w-lg w-full bg-white shadow-lg rounded-2xl p-6">
            <h1 className="text-2xl font-bold text-green-800 text-center mb-4">
              Validation Status
            </h1>
            <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-[10px] bg-green-600 flex justify-center items-center">
                <CheckIcon sx={{width:'200px',fontSize:32,color:'white'}}/>
                </div>
              <div className="flex flex-col items-center justify-center p-4 bg-green-100 rounded-lg">
                <h2 className="text-lg font-semibold text-green-700">Pass Details</h2>
                 <div className="p-2 rounded-[4px] bg-white w-full">
                  <label className="text-[14px] ">Name</label>
                  <div className="p-1 border-[1px] mt-1 border-[#d9d9d9] transition-all duration-200 outline-none rounded-sm font-medium text-[14px]"> {validData?.name}  </div>
                  </div>
                 <div className="p-2 rounded-[4px] mt-2 bg-white w-full">
                  <label className="text-[14px] ">phone</label>
                  <div className="p-1 border-[1px] mt-1 border-[#d9d9d9] transition-all duration-200 outline-none rounded-sm font-medium text-[14px]"> {validData?.phone} </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {notValid && notValidData && (
        <div className="flex flex-col items-center mt-5 bg-gray-100">
          <div className="max-w-lg w-full bg-white shadow-lg rounded-2xl p-6">
            <h1 className="text-lg font-bold text-red-800 text-center mb-4">
              Validation Status
            </h1>
            <div className="grid md:grid-cols-2 gap-4">
               <div className="rounded-[10px] bg-red-600 flex justify-center items-center">
                <DoNotDisturbIcon sx={{width:'200px',fontSize:32,color:'white'}}/>
                </div>
              <div className="flex flex-col items-center justify-center p-4 bg-red-100 rounded-lg">
                {/* <h2 className="text-lg font-semibold text-red-700">Error</h2> */}
                <p className="text-sm font-bold text-red-900">{notValidData}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {
        <h1>{scanResult}</h1>
      }

      {scanResult && (
        <div className="flex justify-center mt-5">
          <button
            type="button"
            onClick={ScanNewQR}
            className="text-white sm:w-auto w-full bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Scan New
          </button>
        </div>
      )}
    </div>
  );
};

export default QRCodeReader;
