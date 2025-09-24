import { Route, Routes } from 'react-router'
import VitalsRecord from './components/VitalsRecord'
import Dashboard from './components/Dashboards'

export const Router = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Dashboard/>}></Route>
            <Route path='/vitalsRecord' element={<VitalsRecord/>}></Route>
        </Routes>
    </div>
  )
}
