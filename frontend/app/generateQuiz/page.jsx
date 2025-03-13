"use client"

import { useState } from "react"
import { Brain, CheckCircle2, XCircle, Trophy, Loader2 } from "lucide-react"
import axios from "axios"
import { useRouter } from 'next/navigation'

export default function Practice() {
  const router = useRouter()
  const [topic, setTopic] = useState("")
  const [questions, setQuestions] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showScore, setShowScore] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [answerSubmitted, setAnswerSubmitted] = useState(false)
  const [roleNumber, setRoleNumber] = useState("");
  const [isRoleVerified, setIsRoleVerified] = useState(false);

  const verifyRoleNumber = (e) => {
    e.preventDefault();
    if (roleNumber.trim()) {
      setIsRoleVerified(true);
    } else {
      alert("Please enter your role number");
    }
  };
  
  const generateQuiz = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(
        "http://localhost:3001/generateQuiz",
        { topic },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
      setQuestions(response.data);
    } catch (err) {
      console.error("Error generating quiz:", err);
      setError("Failed to generate quiz. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  const submitAnswer = (selectedOption) => {
    setSelectedAnswer(selectedOption);
    setAnswerSubmitted(true);
    
    if (selectedOption === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };
  
  const nextQuestion = () => {
    setSelectedAnswer(null);
    setAnswerSubmitted(false);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowScore(true);
      storeQuizResult();
    }
  };
  
  const storeQuizResult = () => {
    const quizResult = {
      roleNumber,
      topic,
      score,
      totalQuestions: questions.length,
      percentage: Math.round((score / questions.length) * 100),
      timestamp: new Date().toISOString()
    };
  
    const existingResults = JSON.parse(localStorage.getItem('quizResults') || '[]');
    existingResults.push(quizResult);
    localStorage.setItem('quizResults', JSON.stringify(existingResults));
  };
  
  const restartQuiz = () => {
    setQuestions([]);
    setTopic("");
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswer(null);
    setAnswerSubmitted(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {!isRoleVerified ? (
          <div className="backdrop-blur-lg bg-black/60 rounded-2xl shadow-2xl p-8 transform transition-all hover:scale-[1.01] duration-300 border border-gray-800/50 relative overflow-hidden">
            <div className="relative z-10 flex flex-col items-center justify-center mb-8 space-y-6">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-300 bg-clip-text text-transparent">
                Enter Your Role Number
              </h1>
            </div>
            <form onSubmit={verifyRoleNumber} className="relative z-10 space-y-6">
              <div className="relative group">
                <input
                  type="text"
                  value={roleNumber}
                  onChange={(e) => setRoleNumber(e.target.value)}
                  className="w-full px-6 py-4 rounded-xl border-2 border-gray-800 bg-black/50 text-gray-100 
                    focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all"
                  placeholder="Enter your role number"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-br from-purple-600 to-blue-500 hover:from-purple-500 hover:to-blue-400 
                  text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300"
              >
                Continue to Quiz
              </button>
            </form>
          </div>
        ) : (
          <>
            {!questions.length && !loading && (
              <div className="backdrop-blur-lg bg-black/60 rounded-2xl shadow-2xl p-8 transform transition-all hover:scale-[1.01] duration-300 border border-gray-800/50 relative overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute -top-20 -left-20 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
                  <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
                </div>
                <div className="relative z-10 flex flex-col items-center justify-center mb-8 space-y-6">
                  <div className="p-4 bg-gradient-to-br from-purple-600 to-blue-500 rounded-full animate-float">
                    <Brain className="w-16 h-16 text-white" />
                  </div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-300 bg-clip-text text-transparent animate-fade-in-up">
                    Practice Quiz
                  </h1>
                  <p className="text-gray-400 text-center mt-2 animate-fade-in-up delay-100">
                    Transform any topic into an engaging quiz experience
                  </p>
                </div>
                <form onSubmit={generateQuiz} className="relative z-10 space-y-6">
                  <div className="animate-fade-in-up delay-200">
                    <div className="relative group">
                      <label 
                        htmlFor="topic" 
                        className={`absolute left-4 transition-all duration-300 ${
                          topic ? 'top-0 text-xs text-purple-400' : 'top-4 text-gray-400'
                        }`}
                      >
                        Enter your topic
                      </label>
                      <input
                        type="text"
                        id="topic"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className="w-full px-6 pt-6 pb-2 rounded-xl border-2 border-gray-800 bg-black/50 text-gray-100 placeholder-transparent 
                          focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all
                          shadow-lg hover:shadow-purple-500/10"
                        placeholder="e.g., 'Artificial Intelligence', 'Renaissance Art'"
                        required
                      />
                      <div className="absolute inset-x-0 bottom-0 h-1 bg-purple-500/20 scale-x-0 group-focus-within:scale-x-100 transition-transform origin-left duration-500"></div>
                    </div>
                  </div>
                  <div className="animate-fade-in-up delay-300">
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-br from-purple-600 to-blue-500 hover:from-purple-500 hover:to-blue-400 text-white py-4 px-6 rounded-xl 
                        font-semibold transition-all duration-300 transform hover:scale-[1.02] active:scale-95 
                        shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 group
                        relative overflow-hidden border border-purple-500/30"
                    >
                      <span className="relative z-10">Generate Quiz</span>
                      <Brain className="w-5 h-5 transition-transform group-hover:rotate-12 relative z-10" />
                      <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                  </div>
                </form>
                <div className="mt-8 text-center animate-fade-in-up delay-500">
                  <p className="text-gray-500 text-sm">Try one of these:</p>
                  <div className="flex justify-center space-x-3 mt-2">
                    {['Quantum Physics', 'Ancient Rome', 'Machine Learning', 'Modern Art'].map((example) => (
                      <button
                        key={example}
                        onClick={() => setTopic(example)}
                        className="px-3 py-1 text-sm bg-gray-900/50 hover:bg-gray-800/70 text-gray-300 rounded-lg transition-all duration-200 border border-gray-800"
                      >
                        {example}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {loading && (
              <div className="backdrop-blur-lg bg-black/60 rounded-2xl shadow-2xl p-12 flex flex-col items-center justify-center">
                <Loader2 className="w-16 h-16 text-purple-500 animate-spin mb-4" />
                <h2 className="text-2xl font-bold text-white">Creating your quiz...</h2>
                <p className="text-gray-400 mt-2">Generating questions about {topic}</p>
              </div>
            )}

            {questions.length > 0 && !showScore && (
              <div className="backdrop-blur-lg bg-black/60 rounded-2xl shadow-2xl p-8 border border-gray-800/50">
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-purple-400 font-medium">Question {currentQuestion + 1}/{questions.length}</span>
                    <span className="text-gray-400">Score: {score}</span>
                  </div>
                  <div className="w-full bg-gray-800 h-2 rounded-full">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-blue-500 h-full rounded-full transition-all duration-300"
                      style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row md:space-x-6">
                  <div className="md:w-1/2 mb-6 md:mb-0">
                    <div className="bg-black/30 p-6 rounded-xl border border-gray-800/50 h-full">
                      <h3 className="text-2xl font-semibold text-white mb-4">
                        {questions[currentQuestion].question}
                      </h3>
                    </div>
                  </div>
                  
                  <div className="md:w-1/2">
                    <div className="space-y-4">
                      {questions[currentQuestion].options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => !answerSubmitted && submitAnswer(option)}
                          disabled={answerSubmitted}
                          className={`w-full text-left p-4 rounded-xl transition-all duration-200 flex items-center
                            ${answerSubmitted ? 
                              option === questions[currentQuestion].correctAnswer ? 
                                'bg-green-500/20 border-green-500/50 text-green-300' :
                                option === selectedAnswer ? 
                                  'bg-red-500/20 border-red-500/50 text-red-300' :
                                  'bg-gray-800/40 border-gray-700 text-gray-400' :
                              selectedAnswer === option ?
                                'bg-purple-500/20 border-purple-500 text-white' :
                                'bg-gray-800/40 border-gray-700 text-white hover:bg-gray-700/50'
                            }
                            border ${answerSubmitted ? 'cursor-default' : 'cursor-pointer hover:transform hover:scale-[1.01]'}`}
                        >
                          <span className="mr-3">{String.fromCharCode(65 + index)}.</span>
                          {option}
                          {answerSubmitted && option === questions[currentQuestion].correctAnswer && (
                            <CheckCircle2 className="w-5 h-5 text-green-400 ml-auto" />
                          )}
                          {answerSubmitted && option === selectedAnswer && option !== questions[currentQuestion].correctAnswer && (
                            <XCircle className="w-5 h-5 text-red-400 ml-auto" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                
                {answerSubmitted && (
                  <div className="mt-8">
                    <button
                      onClick={nextQuestion}
                      className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold
                        hover:from-purple-500 hover:to-blue-400 transition-all duration-300"
                    >
                      {currentQuestion < questions.length - 1 ? 'Next Question' : 'See Results'}
                    </button>
                  </div>
                )}
              </div>
            )}

            {showScore && (
              <div className="backdrop-blur-lg bg-black/60 rounded-2xl shadow-2xl p-8 border border-gray-800/50 flex flex-col items-center">
                <div className="p-4 bg-gradient-to-br from-purple-600 to-blue-500 rounded-full mb-6">
                  <Trophy className="w-16 h-16 text-white" />
                </div>
                
                <h2 className="text-3xl font-bold text-white mb-2">Quiz Complete!</h2>
                <p className="text-xl text-gray-300 mb-4">Topic: {topic}</p>
                
                <div className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-300 bg-clip-text text-transparent mb-6">
                  {score}/{questions.length} ({Math.round((score / questions.length) * 100)}%)
                </div>
                
                <div className="flex space-x-4 mt-8">
                  <button
                    onClick={restartQuiz}
                    className="py-3 px-6 rounded-xl bg-gray-800 text-white font-medium hover:bg-gray-700 transition-all duration-300"
                  >
                    New Quiz
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}