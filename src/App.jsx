import React from 'react'
import FeedbackForm from './FeedbackForm'
import FeedbackForm2 from './FeedbackForm'
import { ToastContainer } from 'react-toastify'

const App = () => {
  return (
    <div className=''>
      <ToastContainer />
      <FeedbackForm/>
    </div>
  )
}

export default App