import { useState } from 'react';
import { Trash2, Plus, Edit } from 'lucide-react';

const UsersManagement = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'student', classroom: 'Science A', status: 'active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'teacher', classroom: 'Commerce B', status: 'active' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'student', classroom: 'Arts C', status: 'inactive' },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', role: 'admin', classroom: 'N/A', status: 'active' },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: '',
    classroom: '',
    status: 'active'
  });
  const [editingUser, setEditingUser] = useState(null);

  const handleAddUser = (e) => {
    e.preventDefault();
    setUsers([...users, { ...newUser, id: Date.now() }]);
    setShowAddForm(false);
    setNewUser({ name: '', email: '', role: '', classroom: '', status: 'active' });
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const handleEditClick = (user) => {
    setEditingUser({ ...user });
    setShowEditForm(true);
    setShowAddForm(false);
  };

  const handleEditUser = (e) => {
    e.preventDefault();
    setUsers(users.map(user => user.id === editingUser.id ? editingUser : user));
    setShowEditForm(false);
    setEditingUser(null);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">User Management</h3>
          <button
            onClick={() => {
              setShowAddForm(true);
              setShowEditForm(false);
              setEditingUser(null);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            <Plus size={18} />
            Add User
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-purple-50 rounded-lg">
            <h4 className="font-medium">Students</h4>
            <p className="text-2xl font-bold text-purple-600">
              {users.filter(user => user.role === 'student').length}
            </p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium">Teachers</h4>
            <p className="text-2xl font-bold text-blue-600">
              {users.filter(user => user.role === 'teacher').length}
            </p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <h4 className="font-medium">Admins</h4>
            <p className="text-2xl font-bold text-green-600">
              {users.filter(user => user.role === 'admin').length}
            </p>
          </div>
        </div>
      </div>

      {showAddForm && (
        <div className="mb-6 p-4 border rounded-lg bg-gray-50">
          <h4 className="font-medium mb-3">Add New User</h4>
          <form onSubmit={handleAddUser} className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Name"
              className="p-2 border rounded"
              value={newUser.name}
              onChange={(e) => setNewUser({...newUser, name: e.target.value})}
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="p-2 border rounded"
              value={newUser.email}
              onChange={(e) => setNewUser({...newUser, email: e.target.value})}
              required
            />
            <select
              className="p-2 border rounded"
              value={newUser.role}
              onChange={(e) => setNewUser({...newUser, role: e.target.value})}
              required
            >
              <option value="">Select Role</option>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="admin">Admin</option>
            </select>
            <select
              className="p-2 border rounded"
              value={newUser.classroom}
              onChange={(e) => setNewUser({...newUser, classroom: e.target.value})}
              required
            >
              <option value="">Select Classroom</option>
              <option value="Science A">Science A</option>
              <option value="Commerce B">Commerce B</option>
              <option value="Arts C">Arts C</option>
              <option value="N/A">N/A</option>
            </select>
            <div className="col-span-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-purple-600 text-white rounded"
              >
                Add User
              </button>
            </div>
          </form>
        </div>
      )}

      {showEditForm && editingUser && (
        <div className="mb-6 p-4 border rounded-lg bg-gray-50">
          <h4 className="font-medium mb-3">Edit User</h4>
          <form onSubmit={handleEditUser} className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Name"
              className="p-2 border rounded"
              value={editingUser.name}
              onChange={(e) => setEditingUser({...editingUser, name: e.target.value})}
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="p-2 border rounded"
              value={editingUser.email}
              onChange={(e) => setEditingUser({...editingUser, email: e.target.value})}
              required
            />
            <select
              className="p-2 border rounded"
              value={editingUser.role}
              onChange={(e) => setEditingUser({...editingUser, role: e.target.value})}
              required
            >
              <option value="">Select Role</option>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="admin">Admin</option>
            </select>
            <select
              className="p-2 border rounded"
              value={editingUser.classroom}
              onChange={(e) => setEditingUser({...editingUser, classroom: e.target.value})}
              required
            >
              <option value="">Select Classroom</option>
              <option value="Science A">Science A</option>
              <option value="Commerce B">Commerce B</option>
              <option value="Arts C">Arts C</option>
              <option value="N/A">N/A</option>
            </select>
            <select
              className="p-2 border rounded"
              value={editingUser.status}
              onChange={(e) => setEditingUser({...editingUser, status: e.target.value})}
              required
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <div className="col-span-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setShowEditForm(false);
                  setEditingUser(null);
                }}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Update User
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-4">Name</th>
              <th className="text-left p-4">Email</th>
              <th className="text-left p-4">Role</th>
              <th className="text-left p-4">Classroom</th>
              <th className="text-left p-4">Status</th>
              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="border-t">
                <td className="p-4">{user.name}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    user.role === 'admin' ? 'bg-green-100 text-green-800' :
                    user.role === 'teacher' ? 'bg-blue-100 text-blue-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="p-4">{user.classroom}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="p-4 flex gap-2">
                  <button
                    onClick={() => handleEditClick(user)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersManagement;