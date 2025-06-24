import React, { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const Toast = () => (
  <ToastContainer
    position="top-right"
    autoClose={5000}
    hideProgressBar
    newestOnTop
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    toastClassName={() => 
      "relative flex p-4 min-h-10 rounded-lg shadow-lg justify-between overflow-hidden cursor-pointer my-2"
    }
    bodyClassName={() => "text-sm font-white font-med block p-3"}
    closeButton={({ closeToast }) => (
      <button 
        onClick={closeToast} 
        className="ml-4 text-white hover:text-gray-200"
      >
        ×
      </button>
    )}
  />
);


