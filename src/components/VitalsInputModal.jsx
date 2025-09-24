import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addVitals } from '../redux/vitalSlice.js'
import { X, Heart, Activity, Thermometer, Droplets, Scale, User, Wind } from 'lucide-react'
import { useNavigate } from 'react-router'

const VitalsInputModal = ({ onClose }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    height: '',
    weight: '',
    respirationRate: '',
    temperature: '',
    bloodPressureSys: '',
    bloodPressureDia: '',
    pulseOx: '',
    bloodGlucose: '',
    heartRate: ''
  })

  const [errors, setErrors] = useState({})

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    const requiredFields = ['height', 'weight', 'respirationRate', 'temperature', 'bloodPressureSys', 'bloodPressureDia', 'pulseOx', 'bloodGlucose', 'heartRate']
    
    requiredFields.forEach(field => {
      if (!formData[field] || formData[field].trim() === '') {
        newErrors[field] = 'This field is required'
      }
    })

    const numericFields = ['height', 'weight', 'respirationRate', 'temperature', 'bloodPressureSys', 'bloodPressureDia', 'pulseOx', 'bloodGlucose', 'heartRate']
    
    numericFields.forEach(field => {
      if (formData[field] && isNaN(formData[field])) {
        newErrors[field] = 'Please enter a valid number'
      }
    })

    if (formData.pulseOx && (formData.pulseOx < 70 || formData.pulseOx > 100)) {
      newErrors.pulseOx = 'Oxygen level should be between 70-100%'
    }
    
    if (formData.heartRate && (formData.heartRate < 40 || formData.heartRate > 200)) {
      newErrors.heartRate = 'Heart rate should be between 40-200 BPM'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    const numericData = Object.keys(formData).reduce((acc, key) => {
      acc[key] = parseFloat(formData[key])
      return acc
    }, {})

    dispatch(addVitals(numericData))
    navigate('/vitalsRecord');
    onClose()
  }

  const vitalFields = [
    {
      id: 'height',
      label: 'Height',
      placeholder: 'Enter Height',
      unit: 'cm',
      icon: User,
      required: true
    },
    {
      id: 'weight',
      label: 'Weight',
      placeholder: 'Enter Weight',
      unit: 'kg',
      icon: Scale,
      required: true
    },
    {
      id: 'temperature',
      label: 'Temperature',
      placeholder: 'Enter Temperature',
      unit: '°F',
      icon: Thermometer,
      required: true
    },
    {
      id: 'respirationRate',
      label: 'Respiration Rate',
      placeholder: 'Enter Respiration rate',
      unit: 'breaths/min',
      icon: Wind,
      required: true
    },
    {
      id: 'bloodPressureSys',
      label: 'Blood Pressure (SYS)',
      placeholder: 'Enter systolic',
      unit: 'mmHg',
      icon: Activity,
      required: true
    },
    {
      id: 'bloodPressureDia',
      label: 'Blood Pressure (DIA)',
      placeholder: 'Enter diastolic',
      unit: 'mmHg',
      icon: Activity,
      required: true
    },
    {
      id: 'pulseOx',
      label: 'Pulse Ox',
      placeholder: 'Enter Pulse',
      unit: '%',
      icon: Droplets,
      required: true
    },
     {
      id: 'heartRate',
      label: 'Heart Rate',
      placeholder: 'Enter heart rate',
      unit: 'Beats/min',
      icon: Heart,
      required: true
    },
    {
      id: 'bloodGlucose',
      label: 'Blood Glucose',
      placeholder: 'Please enter your Glucose',
      unit: 'mg/dL',
      icon: Droplets,
      required: true
    },
  ]

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-blue-950 text-white px-6 py-4 rounded-t-lg flex justify-between items-center">
          <h2 className="text-md font-medium">Add New Vitals</h2>
          <button
            onClick={onClose}
            className="text-white cursor-pointer hover:text-gray-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vitalFields.map((field) => (
              <div key={field.id} className="space-y-2">
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                  <div className='flex items-center justify-center w-10 h-10 rounded-full bg-gray-100'><field.icon className="w-4 h-4 text-primary-500" /></div>
                  <span>{field.label}</span>
                  {field.required && <span className="text-red-500">*</span>}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData[field.id]}
                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                    placeholder={field.placeholder}
                    className={`input-field pr-12 ${errors[field.id] ? 'border-red-500' : ''}`}
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">
                    {field.unit}
                  </span>
                </div>
                {errors[field.id] && (
                  <p className="text-red-500 text-xs">{errors[field.id]}</p>
                )}
              </div>
            ))}
          </div>

          {/* BMI Display */}
          {formData.height && formData.weight && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <Activity className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-blue-800">Calculated BMI:</span>
                <span className="text-lg font-bold text-blue-900">
                  {((formData.weight / ((formData.height / 100) ** 2)).toFixed(1))}
                </span>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end mt-8">
            <button
              type="submit"
              className="w-[30%] bg-blue-950 cursor-pointer py-1.5 px-10 rounded-md text-white"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default VitalsInputModal
