// import { Heart } from 'lucide-react';

// const HeartLoadingSpinner = ({ size = 'md', className = '' }) => {
//   const sizeClasses = {
//     sm: 'h-6 w-6',
//     md: 'h-10 w-10',
//     lg: 'h-16 w-16',
//     xl: 'h-20 w-20'
//   };

//   return (
//     <div className={`flex items-center justify-center ${className}`}>
//       <Heart className={`${sizeClasses[size]} text-pink-500 animate-pulse`} />
//     </div>
//   );
// };

// export default HeartLoadingSpinner;

export const HeartSpinner = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
    <div className="animate-heartbeat">
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#EC4899" strokeWidth="2">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    </div>
    <p className="mt-4 text-pink-600 font-medium">Loading BabySteps...</p>
  </div>
);