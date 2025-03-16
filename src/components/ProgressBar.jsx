// A module-level variable to persist the previous progress value between pages
let globalPreviousProgress = 0;

import React, { useState, useEffect } from "react";

const ProgressBar = ({ progress }) => {
  const [displayProgress, setDisplayProgress] = useState(globalPreviousProgress);

  useEffect(() => {
    // Animate from previous to new progress value
    setDisplayProgress(progress);
    globalPreviousProgress = progress;
  }, [progress]);

  return (
    <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
      <div
        className="bg-gradient-to-r from-pink-500 to-orange-500 h-4 rounded-full transition-all duration-500 ease-in-out"
        style={{ width: `${displayProgress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
