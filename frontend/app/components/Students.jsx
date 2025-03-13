import { Search, Plus } from 'lucide-react';
import { useState } from 'react';

const Students = ({ students, searchQuery, setSearchQuery, onAddStudent }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: '',
    rollNumber: '',
    classroom: '',
    grade: ''
  });

  // Add the filtering logic
  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.rollNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddStudent = (e) => {
    e.preventDefault();
    // Add new student with a unique ID
    const studentToAdd = {
      ...newStudent,
      id: Date.now() // Generate a unique ID
    };
    onAddStudent(studentToAdd);
    setShowAddForm(false);
    setNewStudent({ name: '', rollNumber: '', classroom: '', grade: '' });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-4 border-b flex justify-between items-center">
        <div className="relative flex-1 mr-4">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search students by name or roll number..."
            className="w-full pl-10 p-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          <Plus size={18} />
          Add Student
        </button>
      </div>

      {showAddForm && (
        <div className="p-4 border-b bg-gray-50">
          <form onSubmit={handleAddStudent} className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                required
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={newStudent.name}
                onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Roll Number</label>
              <input
                type="text"
                required
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={newStudent.rollNumber}
                onChange={(e) => setNewStudent({...newStudent, rollNumber: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Classroom</label>
              <select
                required
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={newStudent.classroom}
                onChange={(e) => setNewStudent({...newStudent, classroom: e.target.value})}
              >
                <option value="">Select Classroom</option>
                <option value="Science A">Science A</option>
                <option value="Commerce B">Commerce B</option>
                <option value="Arts C">Arts C</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Grade</label>
              <select
                required
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={newStudent.grade}
                onChange={(e) => setNewStudent({...newStudent, grade: e.target.value})}
              >
                <option value="">Select Grade</option>
                <option value="A">A</option>
                <option value="B+">B+</option>
                <option value="B">B</option>
                <option value="C+">C+</option>
                <option value="C">C</option>
              </select>
            </div>
            <div className="col-span-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Save Student
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Existing table code remains the same */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-4">Name</th>
              <th className="text-left p-4">Roll Number</th>
              <th className="text-left p-4">Classroom</th>
              <th className="text-left p-4">Grade</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map(student => (
              <tr key={student.id} className="hover:bg-gray-50">
                <td className="p-4 font-medium">{student.name}</td>
                <td className="p-4 font-mono text-purple-600">{student.rollNumber}</td>
                <td className="p-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
                    {student.classroom}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    student.grade === 'A' ? 'bg-green-100 text-green-600' :
                    student.grade.startsWith('B') ? 'bg-yellow-100 text-yellow-600' :
                    'bg-red-100 text-red-600'
                  }`}>
                    {student.grade}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredStudents.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No students found matching your search
          </div>
        )}
      </div>
    </div>
  );
};

export default Students;