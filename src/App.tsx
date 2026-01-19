"use client"
import React from 'react'
import Employe from './components/EmployeDashboard/Employe'
import EmployeDataProvider from './components/DataProvider/EmployeDataProvider'
const App:React.FC = () => {
  return (
    <div>
      <EmployeDataProvider>
      <Employe/>
      </EmployeDataProvider>
    </div>
  )
}

export default App
