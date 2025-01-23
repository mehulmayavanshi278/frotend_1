"use client"
import Image from "next/image";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { LineChart } from "@mui/x-charts/LineChart";

import AttendanceChart from "@/app/components/Home/AtendenceChart";
import TicketSaleChart from "@/app/components/Home/TicketSalesChart";
import { useEffect } from "react";
import axios from "axios";

export default function Home() {

  const data = [
    { id: 1, name: 'John Doe', age: 28, email: 'johndoe@example.com', through: 'instagram' },
    { id: 2, name: 'Jane Smith', age: 34, email: 'janesmith@example.com', through: 'facebook' },
    { id: 3, name: 'Samuel Green', age: 25, email: 'samuelgreen@example.com', through: 'youtube' },
    { id: 4, name: 'Alice Brown', age: 30, email: 'alicebrown@example.com', through: 'instagram' },
    { id: 5, name: 'Bob White', age: 40, email: 'bobwhite@example.com', through: 'instagram' },
  ];

  

  const getOnboardUser = async()=>{
    try{
       const res = await axios.get("http://localhost:5000/user");
       if(res.status===200){
        console.log(res.data);
       }
    }catch(err){
      console.log(err);
    }
  }
  useEffect(()=>{
     getOnboardUser();
  },[])
  return (
    <>
      <div className="p-[50px] bg-white ">
   
          <div className="">
            <div className="grid grid-cols-5 text-white gap-3 gap-x-10">
              <div className="bg-slate-500 p-4 shadow-lg rounded-[5px]">
                <div className="">
                  <h1 className="text-[18px]">Registered attendence</h1>
                  <div className="flex mt-3">
                    <div className="flex flex-row items-end space-x-3">
                      <BookmarkBorderIcon
                        className="bg-slate-200 rounded-[10px]"
                        sx={{ fontSize: "40px", padding: 0 }}
                      />
                      <p className="relative -bottom-2 text-[15px] align-bottom">
                        13
                      </p>
                    </div>
                  </div>
                  <div className="h-[100px]">

                  </div>
                  <div className="">
                    <p className="text-[14px]">0% down from last month</p>
                  </div>
                </div>
              </div>
              <div className="bg-orange-300 p-4 shadow-lg rounded-[5px]">
                <div className="">
                  <h1 className="text-[18px]">Ticket Sales</h1>
                  <div className="flex mt-3">
                    <div className="flex flex-row items-end space-x-3">
                      <h1
                        className=" text-[20px] rounded-[10px]"
                      >CBP</h1>
                      <p className="relative -bottom-2 text-[15px] align-bottom">
                        13
                      </p>
                    </div>
                  </div>
                  <div className="h-[100px]">

                  </div>
                  <div className="">
                    <p className="text-[14px]">0% down from last month</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-500 p-4 shadow-lg rounded-[5px]">
                <div className="">
                  <h1 className="text-[18px]">Stand sales</h1>
                  <div className="flex mt-3">
                    <div className="flex flex-row items-end space-x-3">
                    <h1
                        className=" text-[20px] rounded-[10px]"
                      >CBP</h1>
                      <p className="relative -bottom-2 text-[15px] align-bottom">
                        13
                      </p>
                    </div>
                  </div>
                  <div className="h-[100px]">

                  </div>
                  <div className="">
                    <p className="text-[14px]">0% down from last month</p>
                  </div>
                </div>
              </div>
              <div className="bg-red-500 p-4 shadow-lg rounded-[5px]">
                <div className="">
                  <h1 className="text-[18px]">Schedules meetings</h1>
                  <div className="flex mt-3">
                    <div className="flex flex-row items-end space-x-3">
                    <h1
                        className=" text-[20px] rounded-[10px]"
                      >CBP</h1>
                      <p className="relative -bottom-2 text-[15px] align-bottom">
                        13
                      </p>
                    </div>
                  </div>
                  <div className="h-[100px]">

                  </div>
                  <div className="">
                    <p className="text-[14px]">0% down from last month</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-400 p-4 shadow-lg rounded-[5px]">
                <div className="">
                  <h1 className="text-[18px]">Top website visits</h1>
                  <div className="flex mt-3">
                    <div className="flex flex-row items-end space-x-3">
                      <BookmarkBorderIcon
                        className="bg-slate-200 rounded-[10px]"
                        sx={{ fontSize: "40px", padding: 0 }}
                      />
                      <p className="relative -bottom-2 text-[15px] align-bottom">
                        13
                      </p>
                    </div>
                  </div>
                  <div className="h-[100px]">

                  </div>
                  <div className="">
                    <p className="text-[14px]">0% down from last month</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
          <div className="bg-red-300 mt-5">
          <div className="overflow-x-auto bg-white rounded-lg shadow-lg p-5">
      <table className="min-w-full table-auto">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">ID</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Age</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">through</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((row) => (
            <tr key={row.id} className="border-b hover:bg-gray-100">
              <td className="px-6 py-3 text-sm text-gray-700">{row.id}</td>
              <td className="px-6 py-3 text-sm text-gray-700">{row.name}</td>
              <td className="px-6 py-3 text-sm text-gray-700">{row.age}</td>
              <td className="px-6 py-3 text-sm text-gray-700">{row.email}</td>
              <td className="px-6 py-3 text-sm text-gray-700">{row.through}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
          </div>
          <div className="mt-5">
            <AttendanceChart/>
          </div>
          <div className="mt-5 grid grid-cols-[1fr,200px]">
             <div className="">
              <TicketSaleChart/>
             </div>
             <div className="">
               <h1 className="text-[20px] text-[gray]">CPG 150</h1>
               <h1 className="text-[20px] text-[gray]">Total charges</h1>
               <h1 className="text-[20px] text-[gray]">CBP 0</h1>
               <h1 className="text-[20px] text-[gray]">Collected</h1>
               <h1 className="text-[20px] text-[gray]">GBP 150</h1>
               <p className="text-[14px] text-[gray]">Pending</p>
             </div>

             
          </div>

      </div>
    </>
  );
}
