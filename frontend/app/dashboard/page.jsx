import React from 'react'
import AddNewInterview from './_components/AddNewInterview'
import InterviewList from './_components/InterviewList'
import ChatBot from '../components/ChatBot'

function Dashboard() {
  return (
    <div>
      <div className='p-10'>
        <h2 className='font-bold text-2xl'>Dashboard</h2>
        <h2 className='text-gray-500'>Create and Start your AI Mockup Interview</h2>
        <div className='grid grid-cols-1 md:grid-cols-3 my-5 '>
          <AddNewInterview/>
        </div>
        {/* Previous Interview List */}
        <InterviewList/>
      </div>
      <ChatBot />
    </div>
  )
}

export default Dashboard
