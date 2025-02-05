'use client';

import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions } from 'chart.js';
import React, { useEffect, useState } from 'react';
import axios from 'axios';


interface UserActivity {
  userId: number;
  name: string;
  age: number;
  email: string;
  event: string;
  status: string;
}

ChartJS.register(ArcElement, Tooltip, Legend);

const options: ChartOptions<'doughnut'> = {
  plugins: {
    legend: {
      position: 'top',
    },
  },
};


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

export default function CheckedinChart() {
  const [checkedInUsers, setCheckedInUsers] = useState<UserActivity[]>([]);
  const [notCheckedInUsers, setNotCheckedInUsers] = useState<UserActivity[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  
    const [status, setStatus] = useState("Checked In");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const checkedInRes = await axios.get<UserActivity[]>(
          `${process.env.NEXT_PUBLIC_LOCAL_BASEURL}/qrcode/checkedin`,
          { params: { queryType: 'checkedin' } }
        );
        setCheckedInUsers(checkedInRes.data);
      } catch (error) {
        console.error('Error fetching checked-in users:', error);
      }

      try {
        const notCheckedInRes = await axios.get<UserActivity[]>(
          `${process.env.NEXT_PUBLIC_LOCAL_BASEURL}/qrcode/checkedin`,
          { params: { queryType: 'notcheckedin' } }
        );
        setNotCheckedInUsers(notCheckedInRes.data);
      } catch (error) {
        console.error('Error fetching not-checked-in users:', error);
      }
    };

    fetchData();
  }, []);

  const checkedInCount = checkedInUsers.length;
  const notCheckedInCount = notCheckedInUsers.length;
  const totalUsers = checkedInCount + notCheckedInCount;

 
  const userData = {
    labels: ['Checked In', 'Not Checked In'],
    datasets: [
      {
        label: 'Users',
        data: [checkedInCount, notCheckedInCount],
        backgroundColor: ['#36A2EB', '#FF6384'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  };

  const [selected, setSelected] = useState("checkedin");
  const [eventUsers , setEventUsers] = useState([]);

  const fetchPerticulerEventUsers = async(val:string , status:string)=>{
    console.log(val);
    try{
    const res = await axios.get(process.env.NEXT_PUBLIC_LOCAL_BASEURL+'/qrcode/events' , {
      params:{
        eventName:val,
        queryType:status
      }
    })

    if(res.status===200){
      setEventUsers(res.data);
    }
    }catch(err){
      console.log(err);
    }
  }


  const handleEventClick = async(event : string , status:string) => {
    setSelectedEvent(event);  
    
    await fetchPerticulerEventUsers(event , status);
  };


  return (
    <div className='bg-white min-h-screen p-3'>
      <div className='w-[350px] mx-auto'>
        <h2 className='text-center text-lg font-bold mb-4'>User Check-in Status</h2>
        <Doughnut data={userData} options={options} />
        <div className='mt-6 text-center'>
          <p className='text-sm text-gray-600'>Total: {totalUsers}</p>
          <p className='text-sm text-gray-600'>Checked In: {checkedInCount}</p>
          <p className='text-sm text-gray-600'>Not Checked In: {notCheckedInCount}</p>
        </div>
      </div>

      <div className='grid lg:grid-cols-2 gap-x-2 items-stretch'>
        {/* Checked-in users table */}
        <div className='bg-blue-100 mt-5 p-5 rounded-lg'>
          <h3 className='text-lg font-semibold text-blue-700 mb-3'>Checked In Users</h3>
          <div className='overflow-x-auto bg-white rounded-lg shadow-lg'>
            <table className='min-w-full table-auto'>
              <thead className='bg-blue-200'>
                <tr>
                  <th className='px-6 py-3 text-left text-sm font-semibold text-gray-700'>ID</th>
                  <th className='px-6 py-3 text-left text-sm font-semibold text-gray-700'>Name</th>
                  <th className='px-6 py-3 text-left text-sm font-semibold text-gray-700'>Email</th>
                  <th className='px-6 py-3 text-left text-sm font-semibold text-gray-700'>event</th>
                </tr>
              </thead>
              <tbody>
                {checkedInUsers.map((user,id) => (
                  <tr key={id+user.name+id} className='border-b hover:bg-gray-100'>
                    <td className='px-6 py-3 text-sm text-gray-700'>{user.userId}</td>
                    <td className='px-6 py-3 text-sm text-gray-700'>{user.name}</td>
                    <td className='px-6 py-3 text-sm text-gray-700'>{user.email}</td>
                    <td className='px-6 py-3 text-sm text-gray-700'>{user.event.replace(/^\d+_/, "").replace(/_/g, " ")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Not checked-in users table */}
        <div className='bg-red-100 mt-5 p-5 rounded-lg'>
          <h3 className='text-lg font-semibold text-red-700 mb-3'>Not Checked In Users</h3>
          <div className='overflow-x-auto bg-white rounded-lg shadow-lg'>
            <table className='min-w-full table-auto'>
              <thead className='bg-red-200'>
                <tr>
                  <th className='px-6 py-3 text-left text-sm font-semibold text-gray-700'>ID</th>
                  <th className='px-6 py-3 text-left text-sm font-semibold text-gray-700'>Name</th>
                  <th className='px-6 py-3 text-left text-sm font-semibold text-gray-700'>Email</th>
                  <th className='px-6 py-3 text-left text-sm font-semibold text-gray-700'>event</th>
                </tr>
              </thead>
              <tbody>
                {notCheckedInUsers.map((user, id) => (
                  <tr key={id+user.event+id} className='border-b hover:bg-gray-100'>
                    <td className='px-6 py-3 text-sm text-gray-700'>{user.userId}</td>
                    <td className='px-6 py-3 text-sm text-gray-700'>{user.name}</td>
                    <td className='px-6 py-3 text-sm text-gray-700'>{user.email}</td>
                    <td className='px-6 py-3 text-sm text-gray-700'>{user.event.replace(/^\d+_/, "").replace(/_/g, " ")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="mt-5 w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-semibold text-center mb-6">Select an Event</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event}
              className={`p-6 border rounded-lg shadow-md cursor-pointer transition-transform transform hover:scale-105 hover:shadow-xl ${
                selectedEvent === event ? 'bg-blue-500 text-white' : 'bg-white text-black'
              }`}
              onClick={() => handleEventClick(event , selected)}
            >
              <h2 className="text-xl font-semibold text-center">{event.replace(/^\d+_/, "").replace(/_/g, " ")}</h2>
            </div>
          ))}
        </div>
        {selectedEvent && (
          <div className="mt-6 p-4 bg-blue-50 text-blue-800 rounded-lg">
            <p className="text-center">You selected: <strong>{selectedEvent?.replace(/^\d+_/, "").replace(/_/g, " ")}</strong></p>
          </div>
        )}
      </div>


{   selectedEvent &&   <div className=" mt-[50px]  w-full mx-auto p-4 bg-white">

      <div className="flex flex-grow gap-3  mb-6">
        <div
              className={`p-6 w-full border rounded-lg shadow-md cursor-pointer transition-transform transform  hover:shadow-xl ${
                selected === "checkedin" ? 'bg-blue-500 text-white' : 'bg-white text-black'
              }`}
          onClick={() =>{ setSelected("checkedin");fetchPerticulerEventUsers(selectedEvent , "checkedin")}}
        >
          Checked In
        </div>
        <div
              className={`p-6 w-full border rounded-lg shadow-md cursor-pointer transition-transform transform  hover:shadow-xl ${
                selected === "notCheckedIn" ? 'bg-blue-500 text-white' : 'bg-white text-black'
              }`}
          onClick={() =>{ setSelected("notCheckedIn");fetchPerticulerEventUsers(selectedEvent , "notCheckedIn")}}
        >
          Not Checked In
        </div>
      </div>


      <div className="bg-blue-100  shadow-md rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className='bg-blue-200'>
            <tr className=" text-gray-700">
              <th className="p-3">ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">phone</th>
            </tr>
          </thead>
          <tbody>
            {eventUsers.length > 0 ? (
              eventUsers.map((item , id) => (
                <tr key={id+item.name+id} className="border-b bg-white hover:bg-gray-50">
                  <td className="p-3">{item.userId}</td>
                  <td className="p-3">{item.name}</td>
                  <td className="p-3">{item.phone}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="p-3 text-center text-gray-500 bg-white">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>}

    </div>
  );
}