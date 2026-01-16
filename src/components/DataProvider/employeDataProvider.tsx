import React, { createContext,ReactNode,useContext, useState } from 'react'
interface EmployeData{
    employe_name:string,
    department:string,
    role:string,
    joining_date:string,
    progress:number
}
interface EmployeContextType{
    employes:EmployeData[]
}
export const EmployeDataContext=createContext<EmployeContextType|undefined>(undefined)
const EmployeDataProvider:React.FC<{children:ReactNode}> = ({children}) => {
    const [employes,setEmployes]=useState<EmployeData[]>([])
    
  return (
    <EmployeDataContext.Provider value={{employes}}>
      {children}
    </EmployeDataContext.Provider>
  )
}

export default EmployeDataProvider

export const useEmploye=()=>useContext(EmployeDataContext)