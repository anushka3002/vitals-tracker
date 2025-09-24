import { createSlice } from '@reduxjs/toolkit'

const storedVitals = JSON.parse(localStorage.getItem('vitalsData')) || []
const storedAlerts = JSON.parse(localStorage.getItem('alertsData')) || []

const initialState = {
  vitals: storedVitals,
  alerts: storedAlerts,
  currentDate: new Date().toISOString().split('T')[0]
}

const vitalsSlice = createSlice({
  name: 'vitals',
  initialState,
  reducers: {
    addVitals: (state, action) => {
      const newVitals = {
        ...action.payload,
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        date: new Date().toISOString().split('T')[0]
      }

      state.vitals.push(newVitals)

      const alerts = generateAlerts(newVitals)
      state.alerts = [...state.alerts, ...alerts]

      localStorage.setItem('vitalsData', JSON.stringify(state.vitals))
      localStorage.setItem('alertsData', JSON.stringify(state.alerts))
    },

    clearAlerts: (state) => {
      state.alerts = []
      localStorage.setItem('alertsData', JSON.stringify([]))
    },

    setCurrentDate: (state, action) => {
      state.currentDate = action.payload
    }
  }
})

const generateAlerts = (vitals) => {
  const alerts = []

  if (vitals.heartRate > 120) {
    alerts.push({
      id: Date.now().toString() + '_hr',
      type: 'warning',
      message: '⚠️ High Heart Rate',
      description: `Heart rate is ${vitals.heartRate} BPM. Consider taking rest.`,
      recommendation: 'Take rest and monitor your heart rate.'
    })
  }

  if (vitals.pulseOx < 95) {
    alerts.push({
      id: Date.now().toString() + '_spo2',
      type: 'danger',
      message: '🫁 Low Oxygen Level',
      description: `Oxygen saturation is ${vitals.pulseOx}%. Seek medical attention.`,
      recommendation: 'Consult a doctor immediately.'
    })
  }

  if (vitals.bloodPressureSys > 140 || vitals.bloodPressureDia > 90) {
    alerts.push({
      id: Date.now().toString() + '_bp',
      type: 'warning',
      message: '⚠️ High Blood Pressure',
      description: `Blood pressure is ${vitals.bloodPressureSys}/${vitals.bloodPressureDia} mmHg.`,
      recommendation: 'Monitor your blood pressure and consult a doctor.'
    })
  }

  if (vitals.temperature > 100.4) {
    alerts.push({
      id: Date.now().toString() + '_temp',
      type: 'warning',
      message: '🌡️ High Temperature',
      description: `Temperature is ${vitals.temperature}°F.`,
      recommendation: 'Rest and monitor your temperature. Consider consulting a doctor.'
    })
  }

  if (vitals.bloodGlucose > 140) {
    alerts.push({
      id: Date.now().toString() + '_glucose',
      type: 'warning',
      message: '🩸 High Blood Glucose',
      description: `Blood glucose is ${vitals.bloodGlucose} mg/dL.`,
      recommendation: 'Monitor your blood sugar and follow your diabetes management plan.'
    })
  }

  return alerts
}

export const { addVitals, clearAlerts, setCurrentDate } = vitalsSlice.actions
export default vitalsSlice.reducer
