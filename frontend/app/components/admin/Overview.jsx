import { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Users, BookOpen, GraduationCap, Award } from 'lucide-react';

const Overview = () => {
  const enrollmentData = [
    { month: 'Jan', students: 65 },
    { month: 'Feb', students: 85 },
    { month: 'Mar', students: 120 },
    { month: 'Apr', students: 90 },
    { month: 'May', students: 150 },
    { month: 'Jun', students: 180 },
  ];

  const courseCompletionData = [
    { course: 'Web Dev', completed: 85, total: 100 },
    { course: 'Python', completed: 75, total: 90 },
    { course: 'Data Science', completed: 60, total: 80 },
    { course: 'AI/ML', completed: 45, total: 70 },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Users</p>
              <h3 className="text-2xl font-bold text-purple-600">1,458</h3>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-500">↑ 12%</span>
            <span className="text-gray-500 ml-2">vs last month</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Active Courses</p>
              <h3 className="text-2xl font-bold text-blue-600">42</h3>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-500">↑ 8%</span>
            <span className="text-gray-500 ml-2">vs last month</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <GraduationCap className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Students</p>
              <h3 className="text-2xl font-bold text-green-600">892</h3>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-500">↑ 15%</span>
            <span className="text-gray-500 ml-2">vs last month</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Award className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Completion Rate</p>
              <h3 className="text-2xl font-bold text-yellow-600">78%</h3>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-500">↑ 5%</span>
            <span className="text-gray-500 ml-2">vs last month</span>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Student Enrollment Trend</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={enrollmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="students" stroke="#8b5cf6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Course Completion Stats</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={courseCompletionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="course" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="completed" fill="#8b5cf6" />
                <Bar dataKey="total" fill="#e5e7eb" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[
            { time: '2 hours ago', text: 'New course "Advanced Machine Learning" added' },
            { time: '5 hours ago', text: '15 new students enrolled in "Web Development"' },
            { time: '1 day ago', text: 'Course "Python Basics" completed by 12 students' },
            { time: '2 days ago', text: 'New instructor joined - Sarah Johnson' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
              <div>
                <p className="text-gray-600">{activity.text}</p>
                <p className="text-sm text-gray-400">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Overview;