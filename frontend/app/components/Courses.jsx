import { Book, Users, Clock, Award, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';

const Courses = () => {
  const [instructorName, setInstructorName] = useState('');

  useEffect(() => {
    const email = localStorage.getItem('userEmail') || '';
    // Extract name from email (taking everything before @)
    const name = email.split('@')[0]
      // Split by numbers or special chars
      .split(/[0-9_.]/)
      // Take first part and capitalize each word
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
    setInstructorName(name || 'Instructor');
  }, []);

  const courses = [
    { 
      id: 1, 
      name: 'Mathematics 101', 
      instructor: instructorName,
      students: 45, 
      progress: 75,
      duration: '12 weeks',
      level: 'Intermediate',
      image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    { 
      id: 2, 
      name: 'Physics Advanced', 
      instructor: instructorName,
      students: 32, 
      progress: 60,
      duration: '16 weeks',
      level: 'Advanced',
      image: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    { 
      id: 3, 
      name: 'Chemistry Basics', 
      instructor: instructorName,
      students: 28, 
      progress: 90,
      duration: '10 weeks',
      level: 'Beginner',
      image: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
  ];

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold mb-6">My Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <div key={course.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
            <div className="relative h-48">
              <img 
                src={course.image} 
                alt={course.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  course.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                  course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {course.level}
                </span>
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-2">{course.name}</h3>
              <p className="text-sm text-gray-600 mb-4">Dr.{course.instructor}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-purple-600" />
                  <span className="text-sm text-gray-600">{course.students} Students</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-purple-600" />
                  <span className="text-sm text-gray-600">{course.duration}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Progress</span>
                  <span className="font-medium">{course.progress}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className={`rounded-full h-2 ${
                      course.progress >= 75 ? 'bg-green-500' :
                      course.progress >= 50 ? 'bg-yellow-500' :
                      'bg-purple-500'
                    }`}
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>

              <button className="w-full mt-4 flex items-center justify-center gap-2 py-2 px-4 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors duration-300">
                Continue Teaching
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;