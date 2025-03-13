"use client";
import { useState, useEffect } from 'react';
import { Book, Users, LayoutList, Settings, Bell, Search, Trophy } from 'lucide-react';
import Courses from '../components/Courses';
import Students from '../components/Students';
import Grades from '../components/Grades';
import QuizResults from '../components/QuizResults';
import PDFTextExtractorComponent from '../components/uploader'; // Update this line

const TeacherDashboard = () => {
  const [activeTab, setActiveTab] = useState('courses');
  const [searchQuery, setSearchQuery] = useState('');
  const [quizResults, setQuizResults] = useState([]);
  const [userEmail, setUserEmail] = useState('');
  const [students, setStudents] = useState([
    { id: 1, name: 'Alice Johnson', rollNumber: 'AP2211001', classroom: 'Science A', grade: 'A' },
    { id: 2, name: 'Bob Smith', rollNumber: 'AP2211002', classroom: 'Commerce B', grade: 'B+' },
    { id: 3, name: 'Charlie Brown', rollNumber: 'AP2211003', classroom: 'Arts C', grade: 'A-' },
    { id: 4, name: 'David Wilson', rollNumber: 'AP2211004', classroom: 'Science A', grade: 'B' },
    { id: 5, name: 'Eva Green', rollNumber: 'AP2211005', classroom: 'Commerce B', grade: 'A' },
    { id: 6, name: 'Frank Ocean', rollNumber: 'AP2211006', classroom: 'Science A', grade: 'C+' },
    { id: 7, name: 'Grace Hopper', rollNumber: 'AP2211007', classroom: 'Arts C', grade: 'A' },
    { id: 8, name: 'Henry Ford', rollNumber: 'AP2211008', classroom: 'Commerce B', grade: 'B-' },
  ]);
  // Add grades data
  const grades = [
    { student: 'Alice Johnson', assignment: 'Mathematics Quiz 1', score: 95 },
    { student: 'Bob Smith', assignment: 'Physics Lab Report', score: 88 },
    { student: 'Charlie Brown', assignment: 'Chemistry Test', score: 92 },
    { student: 'David Wilson', assignment: 'Mathematics Quiz 2', score: 85 },
    { student: 'Eva Green', assignment: 'Physics Final', score: 90 },
    { student: 'Frank Ocean', assignment: 'Chemistry Lab', score: 78 },
    { student: 'Grace Hopper', assignment: 'Mathematics Final', score: 98 },
    { student: 'Henry Ford', assignment: 'Physics Quiz', score: 82 }
  ];
  // Rest of your component remains the same
  useEffect(() => {
    const results = JSON.parse(localStorage.getItem('quizResults')) || [];
    const email = localStorage.getItem('userEmail') || 'Teacher';
    setQuizResults(results);
    setUserEmail(email);
  }, []);
  const renderActiveTab = () => {
    switch (activeTab) {
      case 'courses':
        return <Courses />;
        case 'students':
            return <Students 
              students={students}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onAddStudent={handleAddStudent}
            />;
      case 'grades':
        return <Grades grades={grades} />;
      case 'quizResults':
        return <QuizResults 
          quizResults={quizResults} 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
        />;
      case 'uploader':
        return <PDFTextExtractorComponent />; // Update this line
    default:
      return null;
  }
};
  const handleAddStudent = (newStudent) => {
    setStudents(prevStudents => [...prevStudents, newStudent]);
  };
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg p-4 fixed h-full">
        <div className="flex items-center gap-2 mb-8">
          <Book className="text-purple-600" />
          <h1 className="text-xl font-bold">AuraLMS Teacher Dashboard</h1>
        </div>

        <nav className="space-y-2">
          <button
            onClick={() => setActiveTab('courses')}
            className={`w-full flex items-center gap-3 p-3 rounded-lg ${
              activeTab === 'courses' ? 'bg-purple-100 text-purple-600' : 'hover:bg-gray-100'
            }`}
          >
            <Book size={18} />
            Courses
          </button>

          <button
            onClick={() => setActiveTab('students')}
            className={`w-full flex items-center gap-3 p-3 rounded-lg ${
              activeTab === 'students' ? 'bg-purple-100 text-purple-600' : 'hover:bg-gray-100'
            }`}
          >
            <Users size={18} />
            Students
          </button>

          <button
            onClick={() => setActiveTab('grades')}
            className={`w-full flex items-center gap-3 p-3 rounded-lg ${
              activeTab === 'grades' ? 'bg-purple-100 text-purple-600' : 'hover:bg-gray-100'
            }`}
          >
            <LayoutList size={18} />
            Grades
          </button>

          <button
            onClick={() => setActiveTab('quizResults')}
            className={`w-full flex items-center gap-3 p-3 rounded-lg ${
              activeTab === 'quizResults' ? 'bg-purple-100 text-purple-600' : 'hover:bg-gray-100'
            }`}
          >
            <Trophy size={18} />
            Quiz Results
          </button>

          <button
            onClick={() => setActiveTab('uploader')}
            className={`w-full flex items-center gap-3 p-3 rounded-lg ${
              activeTab === 'uploader' ? 'bg-purple-100 text-purple-600' : 'hover:bg-gray-100'
            }`}
          >
            <Settings size={18} />
            Uploader
          </button>
        </nav>
      </div>
      {/* Main Content */}
      <div className="ml-64 flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold capitalize">{activeTab}</h2>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Bell size={20} />
            </button>
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-purple-600 rounded-full"></div>
                <span className="font-medium">{userEmail}</span>
            </div>
          </div>
        </div>

        {renderActiveTab()}
      </div>
    </div>
  );
};

export default TeacherDashboard;