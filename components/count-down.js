"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
// main countdown function
function Countdown() {
    const [duration, setDuration] = (0, react_1.useState)("");
    const [timeLeft, setTimeLeft] = (0, react_1.useState)(0);
    const [isActive, setIsActive] = (0, react_1.useState)(false);
    const [isPaused, setIsPaused] = (0, react_1.useState)(false);
    const timerRef = (0, react_1.useRef)(null);
    const handleSetDuration = () => {
        if (typeof duration === "number" && duration > 0)
            setTimeLeft(duration);
        setIsActive(false);
        setIsPaused(false);
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
    };
    // timer start function
    const handleStart = () => {
        if (timeLeft > 0) {
            setIsActive(true);
            setIsPaused(false);
        }
    };
    //   timer paused function
    const handlePause = () => {
        if (isActive) {
            setIsPaused(true);
            setIsActive(false);
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        }
    };
    // timer reset function
    const handleReset = () => {
        setIsPaused(false);
        setIsActive(false);
        setTimeLeft(typeof duration === "number" ? duration : 0);
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
    };
    (0, react_1.useEffect)(() => {
        if (isActive && !isPaused) {
            timerRef.current = setInterval(() => {
                setTimeLeft((prevTime) => {
                    if (prevTime <= 1) {
                        clearInterval(timerRef.current);
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        }
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [isActive, isPaused]);
    // formating of time
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    };
    //  input valve handling
    const handleDurationChange = (e) => {
        const value = Number(e.target.value);
        if (!isNaN(value)) {
            setDuration(value);
        }
        else {
            setDuration(0); // reset if invalid input
        }
    };
    return (
    // container div
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 dark:from-gray-900 dark:to-black">
      {/* timer box */}
      <div className="border rounded-lg p-8 w-full max-w-md bg-gray-300 backdrop-blur-md shadow-lg dark:bg-black/30">
        {/* title of timer */}
        <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200 text-center">
          Countdown Timer
        </h1>
        {/* input and set button */}
        <div className="flex items-center mb-6">
          <input type="number" id="duration" placeholder="Enter duration in seconds" value={duration === 0 ? "" : duration} onChange={handleDurationChange} className="flex-1 mr-4 border rounded-md bg-teal-100 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"/>
          <button onClick={handleSetDuration} className="text-gray-800 dark:text-gray-200 border rounded-md px-4 py-2 bg-orange-100 hover:bg-blue-500 dark:hover:bg-blue-700 hover:text-white hover:shadow-lg hover:scale-105 transition duration-300" disabled={duration === 0} // disable if duration is not valid
    >
            Set
          </button>
        </div>
        {/* display formatted time left */}
        <div className="text-6xl font-bold text-white glow dark:text-gray-200 glow mb-4 text-center drop-shadow-lg">
          {formatTime(timeLeft)}
        </div>
        {/* buttons to start ,pause and reset */}
        <div className="flex justify-center gap-4">
          <button onClick={handleStart} 
    // variant ="outline"
    className="text-gray-800 dark:text-gray-200 border rounded-md px-4 py-2 bg-orange-100 hover:bg-blue-500 dark:hover:bg-blue-700 transform hover:scale-105 transition duration-300" disabled={isActive || timeLeft === 0}>
            {isPaused ? "Resume" : "Start"}
          </button>
          <button onClick={handlePause} 
    // variant ="outline"
    className="text-gray-800 dark:text-gray-200 border rounded-md px-4 py-2 bg-orange-100 hover:bg-blue-500 dark:hover:bg-blue-700 transform hover:scale-105 transition duration-300" disabled={!isActive}>
            Pause
          </button>
          <button onClick={handleReset} 
    // variant ="outline"
    className="text-gray-800 dark:text-gray-200 border rounded-md px-4 py-2 bg-orange-100 hover:bg-blue-500 dark:hover:bg-blue-700 transform hover:scale-105 transition duration-300 ease-in-out" disabled={!isActive || timeLeft === 0}>
            Reset
          </button>
        </div>
      </div>
    </div>);
}
exports.default = Countdown;
