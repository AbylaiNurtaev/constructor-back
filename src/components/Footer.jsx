import React from 'react'
import Goback from './ui/Goback'
import Contacts from './ui/Contacts'
import Location from './ui/Location'

function Footer() {
  return (
    <div className='flex flex-col justify-center align-center'>
        <Goback className='mt-4'></Goback>
        <Contacts className='mt-2.5'></Contacts>
        <Location className='mt-2.5'></Location>
    </div>
  )
}

export default Footer
