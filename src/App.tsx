import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button, Card, Logo } from './components/UI';
import { fadeInUp, staggerContainer } from './utils/motion';

function App() {
  const [gateCount, setGateCount] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <motion.div
        className="max-w-4xl mx-auto"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {/* Header */}
        <motion.header 
          className="text-center mb-12"
          variants={fadeInUp}
        >
          <Logo size="lg" className="mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Interactive Logic Gates Learning Platform
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Learn digital logic through beautiful animations and hands-on experimentation.
            Built with React, TypeScript, Framer Motion, and Tailwind CSS.
          </p>
        </motion.header>

        {/* Demo Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
          variants={staggerContainer}
        >
          <Card variant="elevated" animate>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              🚀 Technology Stack
            </h3>
            <ul className="text-gray-600 space-y-1">
              <li>✅ React 19 + TypeScript</li>
              <li>✅ Vite Build System</li>
              <li>✅ Framer Motion Animations</li>
              <li>✅ Tailwind CSS Styling</li>
              <li>✅ Vitest Testing</li>
            </ul>
          </Card>

          <Card variant="elevated" animate>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              🎓 Learning Features
            </h3>
            <ul className="text-gray-600 space-y-1">
              <li>📚 Progressive Lessons</li>
              <li>🔗 Interactive Circuits</li>
              <li>📊 Truth Tables</li>
              <li>🎯 Practice Quizzes</li>
              <li>📈 Progress Tracking</li>
            </ul>
          </Card>

          <Card variant="elevated" animate>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              ⚡ Performance
            </h3>
            <ul className="text-gray-600 space-y-1">
              <li>🎬 60fps Animations</li>
              <li>📱 Responsive Design</li>
              <li>⚡ Fast Loading</li>
              <li>🔧 Optimized Builds</li>
              <li>♿ Accessible</li>
            </ul>
          </Card>
        </motion.div>

        {/* Interactive Demo */}
        <motion.div variants={fadeInUp}>
          <Card variant="elevated" padding="lg" className="text-center">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Interactive Demo
            </h3>
            <p className="text-gray-600 mb-6">
              Test the animation and interaction system with logic gates
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <Button 
                variant="primary" 
                onClick={() => setGateCount(prev => prev + 1)}
              >
                Add Logic Gate ({gateCount})
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setGateCount(0)}
              >
                Reset Circuit
              </Button>
            </div>

            {/* Visual representation of gates */}
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4 justify-items-center">
              {Array.from({ length: gateCount }, (_, i) => (
                <motion.div
                  key={i}
                  className="gate-container w-16 h-12 flex items-center justify-center text-blue-600 font-mono text-sm"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    delay: i * 0.1,
                    type: "spring",
                    stiffness: 260,
                    damping: 20
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {['AND', 'OR', 'NOT', 'XOR'][i % 4]}
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Footer */}
        <motion.footer 
          className="text-center mt-12 text-gray-500"
          variants={fadeInUp}
        >
          <p>Built with ❤️ for education and learning</p>
          <p className="text-sm mt-2">
            Ready for development • Optimized for production • Educational focused
          </p>
        </motion.footer>
      </motion.div>
    </div>
  );
}

export default App;
