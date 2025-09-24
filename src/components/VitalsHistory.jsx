import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { format, parseISO, subDays } from 'date-fns'
import BloodChart from './BloodChart'

const VitalsHistory = () => {
  const { vitals, currentDate } = useSelector(state => state.vitals)

  const last7Days = useMemo(() => {
    const endDate = parseISO(currentDate)
    const startDate = subDays(endDate, 6)
    
    return vitals.filter(vital => {
      const vitalDate = parseISO(vital.date)
      return vitalDate >= startDate && vitalDate <= endDate
    }).sort((a, b) => new Date(a.date) - new Date(b.date))
  }, [vitals, currentDate])

  const chartData = useMemo(() => {
    const dataMap = new Map()
    
    for (let i = 6; i >= 0; i--) {
      const date = subDays(parseISO(currentDate), i)
      const dateStr = format(date, 'yyyy-MM-dd')
      dataMap.set(dateStr, {
        date: format(date, 'MMM dd'),
        fullDate: dateStr,
        heartRate: null,
        bloodPressureSys: null,
        bloodPressureDia: null,
        pulseOx: null,
        temperature: null,
        weight: null,
        bmi: null
      })
    }

    last7Days.forEach(vital => {
      const existing = dataMap.get(vital.date) || {}
      dataMap.set(vital.date, {
        ...existing,
        heartRate: vital.heartRate,
        bloodPressureSys: vital.bloodPressureSys,
        bloodPressureDia: vital.bloodPressureDia,
        pulseOx: vital.pulseOx,
        temperature: vital.temperature,
        weight: vital.weight,
        bmi: vital.height && vital.weight ? 
          (vital.weight / ((vital.height / 100) ** 2)).toFixed(1) : null
      })
    })

    return Array.from(dataMap.values())
  }, [last7Days, currentDate])

  const averages = useMemo(() => {
    const validVitals = last7Days.filter(v => v.heartRate)
    if (validVitals.length === 0) return {}

    const totals = validVitals.reduce((acc, vital) => ({
      heartRate: acc.heartRate + (vital.heartRate || 0),
      bloodPressureSys: acc.bloodPressureSys + (vital.bloodPressureSys || 0),
      bloodPressureDia: acc.bloodPressureDia + (vital.bloodPressureDia || 0),
      pulseOx: acc.pulseOx + (vital.pulseOx || 0),
      temperature: acc.temperature + (vital.temperature || 0),
      weight: acc.weight + (vital.weight || 0)
    }), {
      heartRate: 0,
      bloodPressureSys: 0,
      bloodPressureDia: 0,
      pulseOx: 0,
      temperature: 0,
      weight: 0
    })

    const count = validVitals.length
    return {
      heartRate: Math.round(totals.heartRate / count),
      bloodPressureSys: Math.round(totals.bloodPressureSys / count),
      bloodPressureDia: Math.round(totals.bloodPressureDia / count),
      pulseOx: Math.round(totals.pulseOx / count),
      temperature: (totals.temperature / count).toFixed(1),
      weight: (totals.weight / count).toFixed(1)
    }
  }, [last7Days])

  const chartConfigs = [
    {
      title: 'Heart Rate',
      dataKey: 'heartRate',
      color: '#ef4444',
      unit: 'BPM',
      average: averages.heartRate
    },
    {
      title: 'Blood Pressure',
      dataKey: ['bloodPressureSys', 'bloodPressureDia'],
      color: ['#8b5cf6', '#3b82f6'],
      unit: 'mmHg',
      average: `${averages.bloodPressureSys}/${averages.bloodPressureDia}`
    },
    {
      title: 'Oxygen Level',
      dataKey: 'pulseOx',
      color: '#10b981',
      unit: '%',
      average: averages.pulseOx
    },
    {
      title: 'Temperature',
      dataKey: 'temperature',
      color: '#f59e0b',
      unit: '°F',
      average: averages.temperature
    },
    {
      title: 'Weight',
      dataKey: 'weight',
      color: '#3b82f6',
      unit: 'kg',
      average: averages.weight
    }
  ]

  console.log(vitals,"vitals")

  return (
    <div className="space-y-8">

      {last7Days.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Data Available</h3>
          <p className="text-gray-500">Start tracking your vitals to see charts and trends here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <BloodChart/>
        </div>
      )}
    </div>
  )
}

export default VitalsHistory
