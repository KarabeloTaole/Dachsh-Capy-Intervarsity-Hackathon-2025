import { useState } from 'react';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const fillDemo = (username, password) => {
    setFormData(prev => ({
      ...prev,
      username,
      password
    }));
  };

  const handleSubmit = () => {
    if (!formData.username || !formData.password) {
      alert("Please fill in all fields");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      localStorage.setItem('currentUser', JSON.stringify({
        username: formData.username,
        loginStatus: true,
        loginTime: Date.now()
      }));

      alert(`Welcome back, ${formData.username}! You have successfully logged in.`);
      setIsLoading(false);
      
      // Navigate to profile page
      onLogin();
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white font-libre relative overflow-hidden">
      {/* Animated floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-16 h-16 bg-light-purple rounded-full animate-bounce opacity-20" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-32 right-16 w-12 h-12 bg-yellow rounded-full animate-pulse opacity-30" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-40 left-20 w-20 h-20 bg-purple rounded-full animate-ping opacity-10" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 right-32 w-8 h-8 bg-light-purple rounded-full animate-bounce opacity-25" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-6 h-6 bg-yellow rounded-full animate-pulse opacity-20" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="relative min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          {/* Logo/Brand Section */}
          <div className="text-center mb-8 transform hover:scale-105 transition-transform duration-300">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-light-purple mb-4 shadow-lg animate-pulse">
              <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <h1 className="text-5xl font-bold text-dark-purple mb-2 animate-fadeIn">DC SAVINGS</h1>
            <p className="text-purple text-lg animate-slideUp">Save smart. Challenge Friends. Live better.</p>
          </div>

          {/* Login Form */}
          <div className="bg-gray-50 rounded-3xl p-8 border-2 border-gray-100 shadow-xl transform hover:shadow-2xl transition-all duration-300">
            <div className="space-y-6">
              {/* Username Field */}
              <div className="transform transition-all duration-300 hover:translate-x-1">
                <label className="block text-sm font-semibold text-dark-purple mb-2">Username</label>
                <input 
                  type="text" 
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full px-4 py-4 bg-white border-2 border-gray-200 rounded-xl text-dark-purple placeholder-gray-400 focus:outline-none focus:border-light-purple focus:ring-4 focus:ring-light-purple/20 transition-all duration-300 transform hover:scale-[1.02]"
                  placeholder="Enter your username"
                  required
                />
              </div>

              {/* Password Field */}
              <div className="transform transition-all duration-300 hover:translate-x-1">
                <label className="block text-sm font-semibold text-dark-purple mb-2">Password</label>
                <input 
                  type="password" 
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-4 bg-white border-2 border-gray-200 rounded-xl text-dark-purple placeholder-gray-400 focus:outline-none focus:border-light-purple focus:ring-4 focus:ring-light-purple/20 transition-all duration-300 transform hover:scale-[1.02]"
                  placeholder="Enter your password"
                  required
                />
              </div>

              {/* Remember Me */}
              <div className="flex items-center justify-between">
                <label className="flex items-center group cursor-pointer">
                  <input 
                    type="checkbox" 
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-light-purple bg-white border-2 border-gray-300 rounded focus:ring-light-purple focus:ring-2 transition-all duration-300"
                  />
                  <span className="ml-2 text-sm text-purple group-hover:text-light-purple transition-colors duration-300">Remember me</span>
                </label>
                <button type="button" className="text-sm text-yellow hover:text-purple transition-colors duration-300 font-medium hover:underline">
                  Forgot password?
                </button>
              </div>

              {/* Login Button */}
              <button 
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full bg-light-purple hover:bg-purple text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95 disabled:opacity-50 disabled:transform-none disabled:cursor-not-allowed"
              >
                <span className={isLoading ? 'animate-pulse' : ''}>
                  {isLoading ? 'Logging in...' : 'Start Saving'}
                </span>
              </button>

              {/* Demo Accounts */}
              <div className="text-center">
                <p className="text-gray-500 text-sm mb-3">Quick Demo Accounts:</p>
                <div className="flex gap-2 justify-center flex-wrap">
                  <button 
                    type="button" 
                    onClick={() => fillDemo('Karabelo', 'demo123')} 
                    className="px-4 py-2 bg-purple text-white rounded-full text-xs hover:bg-dark-purple transition-all duration-300 transform hover:scale-110 hover:shadow-md"
                  >
                    Demo
                  </button>
                </div>
              </div>
            </div>

            {/* Sign Up Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-500">
                New to DC Savings? 
                <button className="text-light-purple hover:text-purple font-semibold transition-colors duration-300 ml-1 hover:underline">
                  Create Account
                </button>
              </p>
            </div>
          </div>

          {/* Features Preview */}
          <div className="mt-8 grid grid-cols-3 gap-6 text-center">
            <div className="text-center transform hover:scale-110 transition-all duration-300 cursor-pointer group">
              <div className="w-14 h-14 bg-light-purple rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-purple transition-colors duration-300 animate-pulse">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                </svg>
              </div>
              <p className="text-sm text-purple font-semibold group-hover:text-light-purple transition-colors duration-300">Smart Tracking</p>
            </div>
            <div className="text-center transform hover:scale-110 transition-all duration-300 cursor-pointer group">
              <div className="w-14 h-14 bg-yellow rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-light-purple transition-colors duration-300 animate-pulse" style={{ animationDelay: '0.5s' }}>
                <svg className="w-7 h-7 text-dark-purple group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <p className="text-sm text-purple font-semibold group-hover:text-light-purple transition-colors duration-300">Goal Achievement</p>
            </div>
            <div className="text-center transform hover:scale-110 transition-all duration-300 cursor-pointer group">
              <div className="w-14 h-14 bg-purple rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-light-purple transition-colors duration-300 animate-pulse" style={{ animationDelay: '1s' }}>
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
                </svg>
              </div>
              <p className="text-sm text-purple font-semibold group-hover:text-light-purple transition-colors duration-300">Wealth Growth</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 1s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 1s ease-out 0.3s both;
        }
      `}</style>
    </div>
  );
};

export default Login;