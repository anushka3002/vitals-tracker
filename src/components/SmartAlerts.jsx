import { useSelector, useDispatch } from 'react-redux'
import { clearAlerts } from '../redux/vitalSlice'
import { AlertTriangle, Heart, Droplets, Activity, Thermometer, X, CheckCircle } from 'lucide-react'

const SmartAlerts = ({ isOpen, onClose }) => {
  const dispatch = useDispatch()
  const { alerts } = useSelector(state => state.vitals)

  const handleClearAlerts = () => {
    dispatch(clearAlerts())
  }

  const getAlertIcon = (type) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />
      case 'danger':
        return <AlertTriangle className="w-5 h-5 text-red-600" />
      default:
        return <AlertTriangle className="w-5 h-5 text-gray-600" />
    }
  }

  const getAlertStyles = (type) => {
    switch (type) {
      case 'warning':
        return 'alert-warning'
      case 'danger':
        return 'alert-danger'
      default:
        return 'bg-gray-50 border border-gray-200 text-gray-800'
    }
  }

  const getRecommendationIcon = (message) => {
    if (message.includes('Heart')) return <Heart className="w-4 h-4" />
    if (message.includes('Oxygen')) return <Droplets className="w-4 h-4" />
    if (message.includes('Blood Pressure')) return <Activity className="w-4 h-4" />
    if (message.includes('Temperature')) return <Thermometer className="w-4 h-4" />
    return <CheckCircle className="w-4 h-4" />
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-blue-900 text-white p-6 rounded-t-lg flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-6 h-6" />
            <h2 className="text-xl font-semibold">Smart Health Alerts</h2>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {alerts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-green-500 mb-4">
                <CheckCircle className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">All Good!</h3>
              <p className="text-gray-500">No health alerts at this time. Keep monitoring your vitals regularly.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Alert Summary */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-blue-800">
                    {alerts.length} Alert{alerts.length > 1 ? 's' : ''} Detected
                  </span>
                </div>
                <p className="text-blue-700 text-sm mt-1">
                  Review the alerts below and follow the recommendations.
                </p>
              </div>

              {alerts.map((alert) => (
                <div key={alert.id} className={`rounded-lg border p-4 ${getAlertStyles(alert.type)}`}>
                  <div className="flex items-start space-x-3">
                    {getAlertIcon(alert.type)}
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg mb-2">{alert.message}</h4>
                      <p className="text-sm mb-3">{alert.description}</p>
                      
                      <div className="bg-white bg-opacity-50 rounded-lg p-3 border border-current border-opacity-20">
                        <div className="flex items-center space-x-2 mb-2">
                          {getRecommendationIcon(alert.message)}
                          <span className="font-medium text-sm">Recommended Action:</span>
                        </div>
                        <p className="text-sm">{alert.recommendation}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                <button
                  onClick={handleClearAlerts}
                  className="btn-secondary"
                >
                  Clear All Alerts
                </button>
                <div className="space-x-3">
                  <button
                    onClick={onClose}
                    className="btn-secondary"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      alert('This would open doctor consultation or emergency contact')
                    }}
                    className="btn-primary"
                  >
                    Contact Doctor
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SmartAlerts
