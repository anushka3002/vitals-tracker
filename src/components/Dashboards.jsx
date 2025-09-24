import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router';
import {
  Activity, Heart, Thermometer, Droplets, Scale,
  LayoutDashboard, HeartPlus, Calendar, CalendarArrowUp,
  Hospital, LucidePanelTopBottomDashed, BriefcaseMedical
} from 'lucide-react'
import BloodChart from './BloodChart'
import OxyChart from './OxyChart'
import { useState } from 'react';

const Dashboard = () => {
  const { vitals, currentDate } = useSelector(state => state.vitals)
  const [value, setValue] = useState("Dashboard")
  const navigate = useNavigate()

  const sidebarContent = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { label: "Health Records", icon: HeartPlus, path: "/vitalsRecord" },
    { label: "My Appointments", icon: Calendar, path: "/appointments" },
    { label: "My Schedule", icon: CalendarArrowUp, path: "/schedule" },
  ]

  const todayVitals = vitals.filter(vital => vital.date === currentDate)
  const latestVitals = todayVitals[todayVitals.length - 1]

  const calculateBMI = (height, weight) => {
    if (!height || !weight) return null
    const hM = height / 100
    return (weight / (hM * hM)).toFixed(1)
  }
  const bmi = latestVitals ? calculateBMI(latestVitals.height, latestVitals.weight) : null

  const calculateStats = (arr, key) => {
    const values = arr.map(item => item[key]);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const avg = values.reduce((sum, val) => sum + val, 0) / values.length;
    return { min, max, avg };
  }
  const diaStats = vitals.length > 0 ? calculateStats(vitals, 'bloodPressureDia') : 0

  return (
    <div className="bg-gray-50 p-4 md:p-6">
      <div className="text-sm text-gray-500 mb-4">
        Home &gt; <span className="text-gray-700 font-medium">Dashboard</span>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className="w-full md:w-56 bg-white shadow-md px-3 py-6 rounded-md">
          <div className="space-y-3">
            {sidebarContent.map((item, index) => (
              <div key={index}>
                <button
                  onClick={() => navigate(item.path)}
                  className={`group flex items-center p-3 w-full text-left rounded-lg 
                    ${value === item.label ? "bg-gray-100" : "hover:bg-gray-100"}`}
                >
                  <item.icon
                    className={`w-5 h-5 ${value === item.label
                        ? "text-blue-700"
                        : "text-gray-600"} group-hover:text-blue-600 mr-2`}
                  />
                  <span
                    className={`text-sm font-medium ${value === item.label
                        ? "text-blue-700"
                        : "text-gray-600"} group-hover:text-blue-700`}
                  >
                    {item.label}
                  </span>
                </button>
                {index < sidebarContent.length - 1 && (
                  <hr className="border border-gray-100 mt-3" />
                )}
              </div>
            ))}
          </div>
        </div>

        <main className="flex-1">
          {/* Profile & care plans */}
          <div className="flex flex-col md:flex-row mb-6 gap-4">
            <div className="flex-1">
              <p className='font-medium text-gray-700 mb-1'>Member profile</p>
              <select className="input-field w-full">
                <option>Mrs Ananya Singh</option>
              </select>
            </div>
            <div className="flex-1">
              <p className='text-gray-700 mb-1 font-medium'>Select care plans</p>
              <select className="input-field w-full">
                <option>Select</option>
                <option>Health care</option>
                <option>Diabetic Care</option>
                <option>Ortho Care</option>
              </select>
            </div>
          </div>

          {/* Care plan cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="w-full vital-card-d bg-purple-100 text-gray-800 flex">
              <div className='bg-white my-auto p-2 mr-3 rounded'>
                <HeartPlus className='text-blue-700' />
              </div>
              <div>
                <p className="font-bold">Heart Health package</p>
                <p className="text-sm">Expires on 20-01-2026</p>
              </div>
            </div>
            <div className="w-full vital-card-d bg-blue-100 text-gray-800 flex">
              <div className='bg-white my-auto p-2 mr-3 rounded'>
                <Hospital className='text-blue-700' />
              </div>
              <div>
                <p className="font-bold">Diabetic Care package</p>
                <p className="text-sm">Expires on 20-04-2026</p>
              </div>
            </div>
            <div className="w-full vital-card-d bg-pink-100 text-gray-800 flex">
              <div className='bg-white my-auto p-2 mr-3 rounded'>
                <LucidePanelTopBottomDashed className='text-blue-700' />
              </div>
              <div>
                <p className="font-bold">Ortho Care package</p>
                <p className="text-sm">Expires on 30-05-2027</p>
              </div>
            </div>
          </div>

          {/* Appointment card */}
          <div className="px-3 py-4 rounded-md flex flex-col md:flex-row md:justify-between md:items-center mt-6 mb-6 bg-white border border-gray-200 gap-3">
            <div className='flex items-center'>
              <BriefcaseMedical className='text-blue-700 mr-3' />
              <p>
                Next Appointment:{" "}
                <span className="font-medium text-blue-600">12th Dec at 6 pm</span>{" "}
                with Dr. Nishant Aggarwal.
              </p>
            </div>
            <button className="btn-primary w-full md:w-auto">Request for change</button>
          </div>

          <h3 className="text-lg font-semibold mb-4 text-gray-700">Overview of Vitals</h3>
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Blood Chart */}
            <div className="vital-card flex-1">
              <p className="font-medium mb-2">Blood Pressure</p>
              <p className="text-sm text-gray-500 mb-2">
                {diaStats?.min ?? 0} Min &nbsp; {diaStats.avg ?? 0} Avg &nbsp; {diaStats.max ?? 0} Max
              </p>
              <BloodChart />
            </div>

            {/* Pulse + Weight */}
            <div className="flex flex-col md:flex-row lg:flex-col gap-3 flex-1">
              <div className="vital-card flex flex-col items-center justify-center flex-1">
                <p className="font-medium mb-2">Pulse</p>
                <p className="text-2xl font-bold text-pink-500">
                  {vitals[vitals.length - 1]?.heartRate ?? 0} BPM
                </p>
              </div>
              <div className="vital-card flex flex-col items-center justify-center flex-1">
                <p className="font-medium mb-2">Weight</p>
                <p className="text-2xl font-bold">
                  {vitals[vitals.length - 1]?.weight ?? 0} kgs
                </p>
              </div>
            </div>

            {/* Oxygen Level */}
            <div className="vital-card flex-1">
              <p className="font-medium mb-2">Oxy Level</p>
              <p className="text-2xl font-bold text-green-500 mb-2">
                {vitals[vitals.length - 1]?.pulseOx
                  ? vitals[vitals.length - 1]?.pulseOx + "%"
                  : "0%"}
              </p>
              <OxyChart />
              <p className="text-xs mt-1 text-gray-500">Min SpO2 / Max PR</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Dashboard
