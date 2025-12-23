import { motion } from 'framer-motion';
import { CheckCircle, Circle } from 'lucide-react';

function GestureCard({ gesture, isActive, isCompleted, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`gesture-card text-left w-full ${
        isActive ? 'active' : ''
      } ${isCompleted ? 'success' : ''}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-3xl ${
            isCompleted
              ? 'bg-emerald-100'
              : isActive
              ? 'bg-teal-100'
              : 'bg-stone-100'
          }`}>
            {gesture.emoji}
          </div>
          <div>
            <h3 className="font-semibold text-stone-900">{gesture.name}</h3>
            <p className="text-sm text-stone-500">{gesture.nameEn}</p>
          </div>
        </div>

        <div className="flex items-center">
          {isCompleted ? (
            <CheckCircle className="w-6 h-6 text-emerald-500" />
          ) : isActive ? (
            <div className="w-6 h-6 rounded-full border-2 border-teal-500 flex items-center justify-center">
              <div className="w-3 h-3 bg-teal-500 rounded-full animate-pulse"></div>
            </div>
          ) : (
            <Circle className="w-6 h-6 text-stone-300" />
          )}
        </div>
      </div>

      <p className="mt-3 text-sm text-stone-600">{gesture.description}</p>

      {/* 难度指示 */}
      <div className="mt-3 flex items-center space-x-2">
        <span className="text-xs text-stone-400">难度:</span>
        <div className="flex space-x-1">
          {[1, 2, 3].map((level) => (
            <div
              key={level}
              className={`w-2 h-2 rounded-full ${
                level <= gesture.difficulty
                  ? 'bg-amber-400'
                  : 'bg-stone-200'
              }`}
            />
          ))}
        </div>
      </div>
    </motion.button>
  );
}

export default GestureCard;
