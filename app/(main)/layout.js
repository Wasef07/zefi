import React from 'react'

const MainLayout = ({ children }) => {
  return (
    <div className='contained mx-auto my-32'>
      {children}
    </div>
  )
}

export default MainLayout
