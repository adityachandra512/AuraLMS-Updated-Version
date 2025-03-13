import React from 'react';

const HowItWorks = () => {
  return (
    <div className='mt-10'>
      <div className="bg-white p-10 rounded-lg ">
        <h1 className="text-4xl font-extrabold text-center text-blue-600 mb-8">How It Works</h1>
        <div className="space-y-8">
          <div className="p-6 bg-gray-50 rounded-lg shadow">
            <h2 className="text-2xl font-semibold text-gray-800">1. Sign Up & Log In</h2>
            <p className="text-gray-600">Create an account using your email or connect with a social media platform. Log in to access your personalized dashboard.</p>
          </div>
          <div className="p-6 bg-gray-50 rounded-lg shadow">
            <h2 className="text-2xl font-semibold text-gray-800">2. Upload Your Files</h2>
            <p className="text-gray-600">Use our secure upload feature to add videos and images. Our system supports various file formats and ensures fast processing.</p>
          </div>
          <div className="p-6 bg-gray-50 rounded-lg shadow">
            <h2 className="text-2xl font-semibold text-gray-800">3. Manage & Organize</h2>
            <p className="text-gray-600">Once uploaded, your files are stored securely in your account. Organize them into folders, rename them, or delete unwanted files effortlessly.</p>
          </div>
          <div className="p-6 bg-gray-50 rounded-lg shadow">
            <h2 className="text-2xl font-semibold text-gray-800">4. Share with Ease</h2>
            <p className="text-gray-600">Generate secure links to share your files with others. Customize access permissions to keep your data safe.</p>
          </div>
          <div className="p-6 bg-gray-50 rounded-lg shadow">
            <h2 className="text-2xl font-semibold text-gray-800">5. Track & Analyze</h2>
            <p className="text-gray-600">Monitor file views, downloads, and interactions in real-time. Gain insights into how your content is being used.</p>
          </div>
          <div className="p-6 bg-gray-50 rounded-lg shadow">
            <h2 className="text-2xl font-semibold text-gray-800">6. Secure & Reliable</h2>
            <p className="text-gray-600">We prioritize security with encrypted storage and transfers, ensuring your data remains protected at all times.</p>
          </div>
          <div className="p-6 bg-gray-50 rounded-lg shadow">
            <h2 className="text-2xl font-semibold text-gray-800">7. 24/7 Support</h2>
            <p className="text-gray-600">Need help? Our dedicated support team is available around the clock to assist you.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
