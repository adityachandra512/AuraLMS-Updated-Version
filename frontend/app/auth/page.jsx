"use client";
import { useState } from 'react';
import { Eye, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

const AuthForm = () => {
  const [selectedRole, setSelectedRole] = useState('student');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!email || !password) {
      alert('Please fill in all fields');
      return;
    }
    
    try {
      // Here you would typically make an API call to verify credentials
      // For now, we'll just simulate a successful login
      
      // Store user information in localStorage
      localStorage.setItem('userRole', selectedRole);
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', email); // Add this line to store email
      
      // Redirect based on role
      switch(selectedRole) {
        case 'teacher':
          router.push('/teacher');
          break;
        case 'student':
          router.push('/dashboard');
          break;
        case 'admin':
          router.push('/admin');
          break;
        default:
          router.push('/dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again.');
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-gray-900 to-purple-900">
      {/* Left side with image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 flex flex-col justify-center p-12 text-white z-10">
          <h2 className="text-5xl font-extrabold mb-4 leading-tight">
            Capturing Moments,<br />Creating <span className="text-purple-400">Memories</span>
          </h2>
          <p className="text-lg text-purple-100 opacity-90 mb-8">
            Join thousands of students and educators in our vibrant learning community
          </p>
          <div className="flex gap-2">
            {[1, 2, 3].map((i) => (
              <div 
                key={i}
                className={`w-8 h-1 rounded-full transition-all duration-500 ${
                  selectedRole === 'student' && i === 3 
                    ? 'bg-white w-12' 
                    : 'bg-purple-300 opacity-50'
                }`}
              />
            ))}
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/80 to-gray-900/90" />
        <img 
          src="/api/placeholder/800/600"
          alt="Education landscape"
          className="object-cover w-full h-full transform scale-105 hover:scale-100 transition-transform duration-1000 ease-in-out"
        />
      </div>

      {/* Right side with form */}
      <div className="flex-1 flex flex-col justify-center p-8 lg:p-12 backdrop-blur-lg">
        <div className="max-w-md w-full mx-auto space-y-8 bg-gray-900/80 rounded-2xl p-8 shadow-2xl border border-purple-900/50">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Welcome Back
              </h2>
              <p className="text-gray-400 mt-2">Please sign in to continue</p>
            </div>
            <a href="/" className="text-purple-400 hover:text-purple-300 transition-colors group">
              <ArrowLeft className="h-6 w-6 group-hover:-translate-x-1 transition-transform" />
            </a>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Select Role
              </label>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {['student', 'teacher', 'admin'].map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setSelectedRole(role)}
                    className={`p-3 rounded-lg text-center transition-all duration-300 ${
                      selectedRole === role
                        ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:scale-95'
                    } uppercase text-sm font-semibold tracking-wide`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 rounded-xl bg-gray-800 border-2 border-gray-700 text-white placeholder-gray-400 
                  focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all"
                required
              />
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-4 rounded-xl bg-gray-800 border-2 border-gray-700 text-white placeholder-gray-400 
                  focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all pr-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-400 transition-colors"
              >
                <Eye size={22} className="stroke-current" />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  id="remember"
                  className="form-checkbox h-4 w-4 text-purple-500 rounded border-gray-600 bg-gray-700 focus:ring-purple-500"
                />
                <span className="text-gray-400 text-sm">Remember me</span>
              </label>
              <a href="#" className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-xl font-semibold 
                hover:shadow-lg hover:shadow-purple-500/30 transition-all hover:-translate-y-0.5"
            >
              Log in
            </button>
            
            <div className="text-center text-sm text-gray-400 animate-pulse">
              <p>
                Redirecting to {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)} Dashboard
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;