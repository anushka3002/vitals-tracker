import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router';
import { Activity, Heart, Thermometer, Droplets, Scale, LayoutDashboard, HeartPlus, Notebook, NotebookTabsIcon, Calendar, CalendarArrowUp, Hospital, BookOpen, BoneIcon, LucideBadgePoundSterling, LucidePanelTopBottomDashed, BriefcaseMedical } from 'lucide-react'
import BloodChart from './BloodChart'
import OxyChart from './OxyChart'
import { useState } from 'react';

const Dashboard = () => {
  const { vitals, currentDate } = useSelector(state => state.vitals)
  const [value, setValue] = useState("Dashboard")
  const navigate = useNavigate()

  const sidebarContent = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      label: "Health Records",
      icon: HeartPlus,
      path: "/vitalsRecord",
    },
    {
      label: "My Appointments",
      icon: Calendar,
      path: "/appointments",
    },
    {
      label: "My Schedule",
      icon: CalendarArrowUp,
      path: "/schedule",
    },
  ]

  const todayVitals = vitals.filter(vital => vital.date === currentDate)
  const latestVitals = todayVitals[todayVitals.length - 1]

  const calculateBMI = (height, weight) => {
    if (!height || !weight) return null
    const heightInMeters = height / 100
    return (weight / (heightInMeters * heightInMeters)).toFixed(1)
  }

  const bmi = latestVitals ? calculateBMI(latestVitals.height, latestVitals.weight) : null

  const vitalCards = [
    {
      title: 'Heart Rate',
      value: latestVitals?.heartRate ? `${latestVitals.heartRate} BPM` : '--',
      icon: Heart,
      color: 'text-red-500',
      bgColor: 'bg-red-50'
    },
    {
      title: 'Blood Pressure',
      value: latestVitals?.bloodPressureSys && latestVitals?.bloodPressureDia
        ? `${latestVitals.bloodPressureSys}/${latestVitals.bloodPressureDia}`
        : '--',
      icon: Activity,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Oxygen Level',
      value: latestVitals?.pulseOx ? `${latestVitals.pulseOx}%` : '--',
      icon: Droplets,
      color: 'text-green-500',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Temperature',
      value: latestVitals?.temperature ? `${latestVitals.temperature}°F` : '--',
      icon: Thermometer,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50'
    },
    {
      title: 'Weight',
      value: latestVitals?.weight ? `${latestVitals.weight} kg` : '--',
      icon: Scale,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'BMI',
      value: bmi ? bmi : '--',
      icon: Activity,
      color: 'text-indigo-500',
      bgColor: 'bg-indigo-50'
    }
  ]

  const calculateStats = (arr, key) => {
    const values = arr.map(item => item[key]);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const avg = values.reduce((sum, val) => sum + val, 0) / values.length;
    return { min, max, avg };
  };

  const diaStats = vitals.length > 0 ? calculateStats(vitals, 'bloodPressureDia') : 0


  return (
    <div className="bg-gray-50 p-5">
      <div className="text-sm text-gray-500 mb-4">
        Home &gt; <span className="text-gray-700 font-medium">Dashboard</span>
      </div>
      <div className='flex'>

        {/* Sidebar */}
        <div className="w-50 h-80 bg-white shadow-md px-3 py-6">
          <div className="space-y-3">
            {sidebarContent.map((item, index) => (
              <div key={index}>
                <button
                  onClick={() => navigate(item.path)}
                  className={`group flex items-center p-3 w-full text-left rounded-lg 
              ${value == item.label && "bg-gray-100" || "hover:bg-gray-100"}`}
                >
                  <item.icon className={`w-5 h-5 ${value == item.label ? "text-blue-700" : "text-gray-600"} group-hover:text-blue-600 mr-2`} />
                  <span className={`text-sm font-medium ${value == item.label ? "text-blue-700" : "text-gray-600"} group-hover:text-blue-700`}>
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

        <main className="flex-1 px-6">
          {/* Member profile & care plans */}
          <div className="flex mb-6 gap-4">
            <div><p className='font-medium text-gray-700 mb-1'>Member profile</p>
              <select className="input-field">
                <option>Mrs Ananya Singh</option>
              </select>
            </div>
            <div>
              <p className='text-gray-700 mb-1 font-medium'>Select care plans</p>
              <select className="input-field">
                <option>Select</option>
                <option>Health care</option>
                <option>Diabetic Care</option>
                <option>Ortho Care</option>
              </select>
            </div>
          </div>

          {/* Care plan cards */}
          <div className="w-full justify-between flex flex-col md:flex-row gap-4 mt-4 md:mt-0">
            <div className="w-full vital-card-d bg-purple-100 text-gray-800 flex">
              <div className='bg-white my-auto p-2 mr-3 rounded'><HeartPlus className='text-blue-700' /></div>
              <div>
                <p className="font-bold">Heart Health package</p>
                <p className="text-sm">Package expires on 20-01-2026</p>
              </div>
            </div>
            <div className="w-full vital-card-d bg-blue-100 text-gray-800 flex">
              <div className='bg-white my-auto p-2 mr-3 rounded'><Hospital className='text-blue-700' /></div>
              <div>
                <p className="font-bold">Diabetic Care package</p>
                <p className="text-sm">Package expires on 20-04-2026</p>
              </div>
            </div>
            <div className="w-full vital-card-d bg-pink-100 text-gray-800 flex">
              <div className='bg-white my-auto p-2 mr-3 rounded'><LucidePanelTopBottomDashed className='text-blue-700' /></div>
              <div>
                <p className="font-bold">Ortho Care package</p>
                <p className="text-sm">Package expires on 30-05-2027</p>
              </div>
            </div>
          </div>

          {/* Next appointment */}
          <div className="px-3 py-4 rounded-md flex justify-between items-center mt-6 mb-6 bg-white border border-gray-200">
            <div className='flex'>
              <BriefcaseMedical className='text-blue-700 mr-3' />
              <p>
                Next Appointment is on{" "}
                <span className="font-medium text-blue-600">12th Dec at 6 pm</span>{" "}
                with Dr. Nishant Aggarwal.
              </p>
            </div>
            <button className="btn-primary">Request for change</button>
          </div>

          <h3 className="text-lg font-semibold mb-4 text-gray-700">Overview of Vitals</h3>
          <div className="w-full flex gap-4 items-stretch">
            {/* Blood Chart */}
            <div className="vital-card w-full flex-1">
              <p className="font-medium mb-2">Blood Pressure</p>
              <p className="text-sm text-gray-500 mb-2">
                {diaStats?.min ?? 0} Min &nbsp; {diaStats.avg ?? 0} Average &nbsp; {diaStats.max ?? 0} Max
              </p>
              <BloodChart />
            </div>

            {/* Pulse + Weight */}
            <div className="flex flex-col gap-3">
              <div className="vital-card flex flex-col items-center justify-center flex-1">
                <p className="font-medium mb-2">Pulse</p>
                <p className="text-2xl font-bold text-pink-500">{vitals[vitals.length - 1]?.heartRate ?? 0} BPM</p>
              </div>
              <div className="vital-card flex flex-col items-center justify-center flex-1">
                <p className="font-medium mb-2">Weight</p>
                <p className="text-2xl font-bold">{vitals[vitals.length - 1]?.weight ?? 0} kgs</p>
              </div>
            </div>

            {/* Oxy Level */}
            <div className="vital-card w-full flex-1">
              <p className="font-medium mb-2">Oxy Level</p>
              <p className="text-2xl font-bold text-green-500 mb-2">{vitals[vitals.length - 1]?.pulseOx ? vitals[vitals.length - 1]?.pulseOx + "%" : 0 + "%"}</p>
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
