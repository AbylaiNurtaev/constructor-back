import React from 'react'
import Contacts from '../components/ui/Contacts'
import Location from '../components/ui/Location'
import Goback2 from '../components/ui/GoBack2'

function DocumentPage() {
  return (
    <div className='flex flex-col justify-between items-center 340px mt-[14px]'>
      <img className='w-[340px]' src="/images/documents/2.png" alt="" />
      <img className='w-[340px]' src="/images/documents/1.png" alt="" />
      <Goback2 className='mt-5'/>
      <Contacts className="mt-[10px]"></Contacts>
      <Location className="mt-[10px] mb-5"></Location>
    </div>
  )
}

export default DocumentPage
