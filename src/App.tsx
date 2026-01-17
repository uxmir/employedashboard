import React from 'react'
import Container from './components/Container'
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
