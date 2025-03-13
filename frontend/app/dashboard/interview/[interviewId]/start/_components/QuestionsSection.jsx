import { Lightbulb, Volume2 } from 'lucide-react';
import React from 'react';

function QuestionsSection({ mockInterviewQuestion, activeQuestionIndex }) {
  const textToSpeech = (text) => {
    if ('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert('Sorry, Your Browser does not support text to speech');
    }
  };

  return (
    mockInterviewQuestion && (
      <div className='p-6 border rounded-lg my-10 bg-white shadow-lg'>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
          {mockInterviewQuestion.map((question, index) => (
            <h2
              key={index}
              className={`p-3 border rounded-full text-xs md:text-sm text-center cursor-pointer transition-all duration-300
              ${activeQuestionIndex === index ? 'text-white bg-gradient-to-r from-blue-500 to-purple-600 shadow-md' : 'bg-gray-100 hover:bg-gray-200'}`}
            >
              Question #{index + 1}
            </h2>
          ))}
        </div>

        <div className='flex items-center gap-3 my-5'>
          <h2 className='text-md md:text-lg font-semibold text-gray-900'>
            {mockInterviewQuestion[activeQuestionIndex]?.question}
          </h2>
          <Volume2
            className='cursor-pointer text-blue-600 hover:text-blue-800 transition-all duration-200'
            onClick={() => textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.question)}
          />
        </div>

        <div className='border rounded-lg p-5 bg-blue-50 mt-10 shadow-md'>
          <h2 className='flex gap-2 items-center text-blue-700 font-semibold'>
            <Lightbulb />
            <strong>Note:</strong>
          </h2>
          <h2 className='text-sm text-blue-600 mt-2'>{process.env.NEXT_PUBLIC_QUESTION_NOTE}</h2>
        </div>
      </div>
    )
  );
}

export default QuestionsSection;
