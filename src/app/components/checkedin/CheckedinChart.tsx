'use client';

import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions } from 'chart.js';

type userActivity = {
   id:number,
   name:string,
   age:number,
   email:string,
   through:string,
   status:string
}

export const userActivityData:userActivity[] = [
  { id: 1, name: 'Alice', age: 25, email: 'alice@example.com', through: 'instagram', status: 'Checked In' },
  { id: 2, name: 'Bob', age: 30, email: 'bob@example.com', through: 'instagram', status: 'Not Checked In' },
  { id: 3, name: 'Charlie', age: 28, email: 'charlie@example.com', through: 'facebook', status: 'Checked In' },
  { id: 4, name: 'David', age: 35, email: 'david@example.com', through: 'youtube', status: 'Checked In' },
  { id: 5, name: 'Eve', age: 22, email: 'eve@example.com', through: 'instagram', status: 'Not Checked In' },
];


const checkedInUsers = userActivityData.filter(user => user.status === 'Checked In');
const notCheckedInUsers = userActivityData.filter(user => user.status === 'Not Checked In');


const checkedInCount = checkedInUsers.length;
const notCheckedInCount = notCheckedInUsers.length;

export const userData = {
  labels: ['Checked In', 'Not Checked In'],
  datasets: [
    {
      label: 'users',
      data: [checkedInCount, notCheckedInCount],
      backgroundColor: ['#36A2EB', '#FF6384'], // Colors for Checked In and Not Checked In
      hoverBackgroundColor: ['#36A2EB', '#FF6384'],
    },
  ],
};

const options:ChartOptions<'doughnut'> = {
  plugins:{
    legend:{
      position:'top'
    }
  }
}

ChartJS.register(ArcElement, Tooltip, Legend);

export default function CheckedinChart() {
  const totalUsers = checkedInCount + notCheckedInCount;

  return (
    <div className='bg-white min-h-screen p-3'>
      <div className="w-[350px] mx-auto">
        <h2 className="text-center text-lg font-bold mb-4">User Check-in Status</h2>
        
        <Doughnut data={userData} options={options}/>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">Total Users: {totalUsers}</p>
          <p className="text-sm text-gray-600">Checked In: {checkedInCount}</p>
          <p className="text-sm text-gray-600">Not Checked In: {notCheckedInCount}</p>
        </div>



      </div>


     <div className='grid lg:grid-cols-2 gap-x-2 items-stretch'>

     
      <div className="bg-blue-100 mt-5 p-5 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-700 mb-3">Checked In Users</h3>
          <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
            <table className="min-w-full table-auto">
              <thead className="bg-blue-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">ID</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">through</th>
                </tr>
              </thead>
              <tbody>
                {checkedInUsers.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-100">
                    <td className="px-6 py-3 text-sm text-gray-700">{user.id}</td>
                    <td className="px-6 py-3 text-sm text-gray-700">{user.name}</td>
                    <td className="px-6 py-3 text-sm text-gray-700">{user.email}</td>
                    <td className="px-6 py-3 text-sm text-gray-700">{user.through}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-red-100 mt-5 p-5 rounded-lg">
          <h3 className="text-lg font-semibold text-red-700 mb-3">Not Checked In Users</h3>
          <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
            <table className="min-w-full table-auto">
              <thead className="bg-red-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">ID</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">through</th>
                </tr>
              </thead>
              <tbody>
                {notCheckedInUsers.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-100">
                    <td className="px-6 py-3 text-sm text-gray-700">{user.id}</td>
                    <td className="px-6 py-3 text-sm text-gray-700">{user.name}</td>
                    <td className="px-6 py-3 text-sm text-gray-700">{user.email}</td>
                    <td className="px-6 py-3 text-sm text-gray-700">{user.through}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        </div>
    </div>
  );
}
