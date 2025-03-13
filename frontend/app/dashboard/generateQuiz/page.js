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
      setError("Failed to generate quiz. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  const handleAnswerSubmit = (selectedOption) => {
    if (answerSubmitted) return

    setSelectedAnswer(selectedOption)
    setAnswerSubmitted(true)

    if (selectedOption === questions[currentQuestion].correctAnswer) {
      setScore(score + 1)
    }
  }

  const nextQuestion = () => {
    setSelectedAnswer(null)
    setAnswerSubmitted(false)

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowScore(true)
    }
  }

  const restartQuiz = () => {
    setQuestions([])
    setCurrentQuestion(0)
    setScore(0)
    setShowScore(false)
    setTopic("")
    setSelectedAnswer(null)
    setAnswerSubmitted(false)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-8 px-4">
      <div className="max-w-6xl mx-auto">
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
          <div className="flex flex-col items-center justify-center backdrop-blur-lg bg-black/60 rounded-2xl p-8 shadow-2xl border border-gray-800">
            <Loader2 className="w-16 h-16 text-purple-400 animate-spin" />
            <p className="mt-4 text-gray-400 text-lg font-medium animate-pulse">
              Crafting your quiz masterpiece...
            </p>
          </div>
        )}

        {error && (
          <div className="backdrop-blur-lg bg-red-900/30 text-red-400 px-6 py-4 rounded-xl shadow-lg border border-red-800/50">
            {error}
          </div>
        )}

        {questions.length > 0 && !showScore && (
          <div className="backdrop-blur-lg bg-black/60 rounded-2xl shadow-2xl p-8 border border-gray-800">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-semibold text-purple-400">
                    Question {currentQuestion + 1} of {questions.length}
                  </span>
                </div>
                <div className="bg-gradient-to-br from-purple-800/30 to-blue-800/30 px-4 py-2 rounded-full border border-purple-800/30">
                  <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-300">
                    Score: {score}
                  </span>
                </div>
              </div>
              <div className="h-1 w-full bg-gray-800 rounded-full">
              <div
                  className="h-full bg-gradient-to-r from-purple-500 to-blue-400 transition-all duration-500 ease-out"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8 min-h-[400px]">
              <div className="md:w-1/2 p-6 border-r border-gray-800">
                <div className="flex items-start space-x-3">
                  <div className="bg-purple-600/30 p-2 rounded-lg border border-purple-800/30">
                    <Brain className="w-6 h-6 text-purple-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-100 leading-relaxed">
                    {questions[currentQuestion].question}
                  </h2>
                </div>
              </div>

              <div className="md:w-1/2 p-6">
                <div className="grid gap-4">
                  {questions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSubmit(option)}
                      disabled={answerSubmitted}
                      className={`p-4 text-left rounded-xl border transition-all duration-200
                        ${
                          answerSubmitted
                            ? option === questions[currentQuestion].correctAnswer
                              ? "border-emerald-400 bg-emerald-600/20 scale-100 shadow-lg"
                              : option === selectedAnswer
                                ? "border-rose-500 bg-rose-600/20 scale-100 shadow-lg"
                                : "border-gray-800 opacity-60"
                            : selectedAnswer === option
                              ? "border-purple-500 bg-purple-600/30 scale-[1.02] shadow-md"
                              : "border-gray-800 hover:border-purple-500 hover:bg-purple-600/10 hover:scale-[1.02] hover:shadow-md"
                        }
                        ${!answerSubmitted && "active:scale-95"}`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="w-6 h-6 flex items-center justify-center bg-gray-900/50 rounded-md font-medium text-gray-300 border border-gray-800">
                          {String.fromCharCode(65 + index)}
                        </span>
                        {answerSubmitted && (
                          <>
                            {option === questions[currentQuestion].correctAnswer ? (
                              <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 animate-pop-in" />
                            ) : option === selectedAnswer ? (
                              <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0 animate-pop-in" />
                            ) : null}
                          </>
                        )}
                        <span className="text-gray-100 text-lg">{option}</span>
                      </div>
                    </button>
                  ))}
                </div>

                {answerSubmitted && (
                  <button
                    onClick={nextQuestion}
                    className="mt-8 w-full bg-gradient-to-br from-purple-600 to-blue-500 hover:from-purple-500 hover:to-blue-400 text-white py-4 px-6 rounded-xl 
                      font-semibold transition-all duration-300 transform hover:scale-[1.02] 
                      active:scale-95 shadow-lg hover:shadow-xl border border-purple-500/30"
                  >
                    {currentQuestion + 1 === questions.length 
                      ? "Finish Quiz 🚀" 
                      : "Next Question →"}
                  </button>
                )}
              </div>
            </div>

          </div>
        )}

        {showScore && (
          <div className="backdrop-blur-lg bg-black/60 rounded-2xl shadow-2xl p-8 text-center border border-gray-800">
            <div className="animate-bounce mb-8">
              <div className="p-6 bg-yellow-900/20 rounded-full w-fit mx-auto">
                <Trophy className="w-20 h-20 text-yellow-400 mx-auto drop-shadow-glow" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-100 mb-4">
              Quiz Complete! 🎉
            </h2>
            <div className="bg-gradient-to-br from-purple-800/30 to-blue-800/30 rounded-xl p-6 mb-8 backdrop-blur-sm border border-purple-800/30">
              <p className="text-4xl font-bold text-gray-100 mb-2">
                {score}<span className="text-gray-400">/{questions.length}</span>
              </p>
              <div className="text-xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-300 font-semibold">
                {Math.round((score / questions.length) * 100)}% Mastery
              </div>
            </div>
            <button
              onClick={restartQuiz}
              className="w-full bg-gradient-to-br from-purple-600 to-blue-500 hover:from-purple-500 hover:to-blue-400 text-white py-4 px-6 rounded-xl 
                font-semibold transition-all duration-300 transform hover:scale-[1.02] 
                active:scale-95 shadow-lg hover:shadow-xl border border-purple-500/30"
            >
              Start New Challenge 🌟
            </button>
          </div>
        )}
      </div>
    </main>
  )
}