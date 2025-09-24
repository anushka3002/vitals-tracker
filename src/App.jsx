import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import VitalsInputModal from './components/VitalsInputModal'
import SmartAlerts from './components/SmartAlerts'
import { Plus } from 'lucide-react'
import { Router } from './Routers'

function App() {
  const [showVitalsModal, setShowVitalsModal] = useState(false)
  const [showAlerts, setShowAlerts] = useState(false)
  const alerts = useSelector(state => state.vitals.alerts)

  useEffect(() => {
    if (alerts.length > 0) {
      setShowAlerts(true)
    }
  }, [alerts])

  return (
      <div>
      <Router/>
       <button
          onClick={() => setShowVitalsModal(true)}
          className="fixed flex cursor-pointer bottom-6 right-6 bg-blue-600 hover:bg-blue-400 text-white p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 z-50"
        >
          <Plus className="w-6 h-6" />
          <span>Add Vitals</span>
        </button>
        {showVitalsModal && (
          <VitalsInputModal onClose={() => setShowVitalsModal(false)} />
        )}
         <SmartAlerts 
          isOpen={showAlerts} 
          onClose={() => setShowAlerts(false)} 
        />
      </div>
  )
}

export default App
