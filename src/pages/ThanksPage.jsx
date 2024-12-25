import React, { useEffect } from 'react'
import Popup from '../components/Popup/Popup'

function ThanksPage() {
  useEffect(() => {
    localStorage.clear()
  }, [])
  return (
    <div>
      <Popup></Popup>
    </div>
  )
}

export default ThanksPage
