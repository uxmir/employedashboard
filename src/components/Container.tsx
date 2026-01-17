import React, { ReactNode } from 'react'

const Container:React.FC<{children:ReactNode}> = ({children}) => {
  return (
    <div className='max-w-[1320px] mx-auto px-5 2xl:px-0'>
      {children}
    </div>
  )
}

export default Container
