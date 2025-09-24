import { Calendar, Bell, Activity, Heart, Thermometer, Droplets, Scale } from 'lucide-react'
import { setCurrentDate } from '../redux/vitalSlice'
import { useDispatch, useSelector } from 'react-redux'
import { formatDate, formatDateTime } from '../constant'

const VitalsRecord = () => {
  const dispatch = useDispatch()
  const { vitals, alerts, currentDate } = useSelector(state => state.vitals)

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
      date:latestVitals?.date ?? "--",
      color: 'text-white',
      bgColor: 'bg-blue-600'
    },
    {
      title: 'Blood Pressure',
      value: latestVitals?.bloodPressureSys && latestVitals?.bloodPressureDia
        ? `${latestVitals.bloodPressureSys}/${latestVitals.bloodPressureDia}`
        : '--',
      icon: Activity,
      color: 'text-white',
      bgColor: 'bg-blue-600'
    },
    {
      title: 'Temperature',
      value: latestVitals?.temperature ? `${latestVitals.temperature}°F` : '--',
      icon: Thermometer,
      color: 'text-white',
      bgColor: 'bg-blue-600'
    },
    {
      title: 'Oxygen Level',
      value: latestVitals?.pulseOx ? `${latestVitals.pulseOx}%` : '--',
      icon: Droplets,
      color: 'text-white',
      bgColor: 'bg-blue-600'
    },
    {
      title: 'Weight',
      value: latestVitals?.weight ? `${latestVitals.weight} kg` : '--',
      icon: Scale,
      color: 'text-white',
      bgColor: 'bg-blue-600'
    },
    {
      title: 'BMI',
      value: bmi ? bmi : '--',
      icon: Activity,
      color: 'text-white',
      bgColor: 'bg-blue-600'
    }
  ]

  console.log(vitals,"vitals")

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-xl font-bold text-gray-900">See your vitals</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <input
                  type="date"
                  value={currentDate}
                  onChange={(e) => dispatch(setCurrentDate(e.target.value))}
                  className="input-field w-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div>
            {/* Vitals Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {vitalCards.map((card, index) => (
                <div key={index} className={`vital-card`}>
                  <div className=" items-center justify-between">
                    <div className='flex'><div className={`flex items-center justify-center w-10 h-10 rounded-full ${card.bgColor}`}><div><card.icon className={`w-4 h-4 mx-auto my-auto ${card.color}`} /></div></div> <p className='my-auto ml-2'>{card.title}</p></div>
                    <hr className='border border-gray-200 my-4'/>
                    <div className='flex'>
                      <card.icon className={`w-4 h-4 text-gray-500 mr-3 ${card.color}`} />
                      <div>
                      <p className="text-sm font-medium text-gray-600 mb-2">{card.value}</p>
                      <p className="text-sm font-medium text-gray-600 mb-2">Avg. daily {card.title}</p>
                      </div>
                    </div>
                    <div className='flex'>
                      <Calendar className="w-5 h-5 text-gray-400 mr-2" />
                      <div>
                      <p className="text-sm font-medium text-gray-600 mb-2 mt-1">Uploaded date and time</p>
                      <p className="text-sm font-medium text-gray-900">{latestVitals?.date ? (formatDate(latestVitals?.date)) : "--"}, {latestVitals?.timestamp ? formatDateTime(latestVitals.timestamp) : "--"}</p>
                      </div>
                    </div>
                    <button className='w-full px-3 py-2.5 text-md font-medium text-blue-600 border rounded-md mt-5'>Track progress</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
      </div>
    </div>
  )
}

export default VitalsRecord