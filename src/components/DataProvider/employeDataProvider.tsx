import React, { createContext,ReactNode,useContext, useEffect, useState } from 'react'
export interface EmployeData{
   key:React.Key;
    employe_name:string,
    department:string,
    role:string,
    joining_date:string,
    progress:number,
    status:string
}
interface EmployeContextType{
    employes:EmployeData[],
    createEmployeData:(formData:EmployeData)=>void
    editEmployeData: (formData: EmployeData) => void;
    changeStatus:(FormData:EmployeData)=>void
}
export const EmployeDataContext=createContext<EmployeContextType|undefined>(undefined)
const EmployeDataProvider:React.FC<{children:ReactNode}> = ({children}) => {
    const [employes,setEmployes]=useState<EmployeData[]>([])
  const createEmployeData=(formData:EmployeData)=>{
    const updatedData=[...employes,{...formData,key: Date.now()}]
    setEmployes(updatedData)
    localStorage.setItem("data",JSON.stringify(updatedData))
  }
  const editEmployeData = (formData: EmployeData) => {
    const updatedData = employes.map((item) =>
      item.key === formData.key ? formData : item
    );
    setEmployes(updatedData);
    localStorage.setItem("data", JSON.stringify(updatedData));
  };
  useEffect(()=>{
    const savedData=localStorage.getItem("data")
    if(!savedData){
      return;
    }
    setEmployes(JSON.parse(savedData))
  },[])
  //changeStatusLogic for softDelete
  const changeStatus=(record:EmployeData)=>{
    const changedStatus=employes.map((item)=>{
    if(item.key===record.key) {
      return{...item,status:'archive'}
    } 
    return item;
    }
    )
    setEmployes(changedStatus)
    localStorage.setItem("data",JSON.stringify(changedStatus))
  }
  return (
    <EmployeDataContext.Provider value={{employes,createEmployeData,editEmployeData,changeStatus}}>
      {children}
    </EmployeDataContext.Provider>
  )
}

export default EmployeDataProvider

export const useEmploye=()=>{
  const context=useContext(EmployeDataContext)
  if(!context){
    throw new Error("employe context is not here")
  }
  return context
}