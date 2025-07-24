
import { useState } from 'react';
import { motion } from 'framer-motion';
import { link } from 'framer-motion/m';
import { Link } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      console.log('Login attempt:', { email, password, rememberMe });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, #8B5CF6 0%, transparent 50%)",
            "radial-gradient(circle at 80% 50%, #7C3AED 0%, transparent 50%)",
            "radial-gradient(circle at 50% 20%, #A855F7 0%, transparent 50%)",
            "radial-gradient(circle at 20% 50%, #8B5CF6 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Floating Cloud Elements */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white opacity-10"
          style={{
            width: Math.random() * 100 + 50,
            height: Math.random() * 50 + 30,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, Math.random() * 200 - 100, 0],
            y: [0, Math.random() * 100 - 50, 0],
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 10 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Floating Particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-purple-300 rounded-full opacity-30"
          animate={{
            y: [0, -120, 0],
            x: [0, Math.random() * 100 - 50, 0],
            rotate: [0, 360],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeInOut",
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}

      {/* Centered Login Form */}
      <motion.div
        className="flex items-center justify-center w-full   "
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="w-full max-w-md !mt-6 !p-4 md:!p-20 bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl  border border-white/20">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="text-5xl font-bold text-purple-800 mb-2 font-pacifico text">HARMONY</h1>
            <p className="text-purple-600 text !mt-4">Welcome back to luxury</p>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.div
              className="relative"
              whileHover={{ scale: 1.02 }}
              whileFocus={{ scale: 1.02 }}
            >
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="ri-mail-line text-purple-500 w-5 h-5 flex items-center justify-center"></i>
              </div> 
              <motion.input
                type="email"
                placeholder="  Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full !pl-3  h-12 py-3 !mt-8 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:outline-none transition-all duration-300 bg-white/90 backdrop-blur-sm"
                required
                whileFocus={{ 
                  boxShadow: "0 0 0 3px rgba(147, 51, 234, 0.1)",
                  borderColor: "#8b5cf6"
                }}
              />
            </motion.div>

            <motion.div
              className="relative"
              whileHover={{ scale: 1.02 }}
              whileFocus={{ scale: 1.02 }}
            >
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="ri-lock-line text-purple-500 w-5 h-5 flex items-center justify-center"></i>
              </div>
              <motion.input
                type="password"
                placeholder="  Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full !pl-3 py-3 h-12 !mt-2 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:outline-none transition-all duration-300 bg-white/90 backdrop-blur-sm"
                required
                whileFocus={{ 
                  boxShadow: "0 0 0 3px rgba(147, 51, 234, 0.1)",
                  borderColor: "#8b5cf6"
                }}
              />
            </motion.div>

            <motion.div
              className="flex items-center !mt-5 justify-between"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <motion.label
                className="flex items-center cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-purple-600 border-2 border-purple-300 rounded focus:ring-purple-500 focus:ring-2"
                />
                <span className="!ml-2 text-sm text-purple-700">Remember me</span>
              </motion.label>
              <motion.a
                href="#"
                className="text-sm text-purple-600 hover:text-purple-800 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Forgot password?
              </motion.a>
            </motion.div>

            <motion.button
              type="submit"
              disabled={isLoading}
              className="w-full !mt-4 py-3 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-300 disabled:opacity-50 whitespace-nowrap"
              whileHover={{ scale: 1.02, boxShadow: "0 8px 25px rgba(147, 51, 234, 0.3)" }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              {isLoading ? (
                <motion.div
                  className="flex items-center justify-center"   
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span className="!ml-2">Signing in...</span>
                </motion.div>
              ) : (
                <Link
                className=''
                to="/products">
                  Log In
                </Link>
              )}
            </motion.button>

            <motion.div
              className="text-center "
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <p className="text-sm text-purple-600 !mt-4">
                Don't have an account?{' '}
                <Link to="/register">
                  <motion.span
                    className="font-semibold text-purple-800 hover:text-purple-900 transition-colors duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Register
                  </motion.span>
                </Link>
              </p>
            </motion.div>
          </motion.form>
        </div>
      </motion.div>
    </div>
  );
}
