import React, { useEffect, useState } from 'react';

const HomePage: React.FC = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const seconds = date.getSeconds();
  const minutes = date.getMinutes();
  const hours = date.getHours();

  const secondsRotation = seconds * 6;
  const minutesRotation = minutes * 6;
  const hoursRotation = (hours % 12 + minutes / 60) * 30;

  return (
    <div className="flex flex-col items-center justify-center h-screen text-4xl text-black">
      Hello World
      <div className="relative w-24 h-24 mt-5 border-2 border-black rounded-full">
        <div
          className="absolute w-0.5 h-1/2 bg-black transform -translate-y-full rotate"
          style={{ top: '50%', left: '50%', transformOrigin: 'center bottom', transform: `translate(-50%, -100%) rotate(${hoursRotation}deg)` }}
        ></div>
        <div
          className="absolute w-0.5 h-1/2 bg-black transform -translate-y-full rotate"
          style={{ top: '50%', left: '50%', transformOrigin: 'center bottom', transform: `translate(-50%, -100%) rotate(${minutesRotation}deg)` }}
        ></div>
        <div
          className="absolute w-0.5 h-1/2 bg-black transform -translate-y-full rotate"
          style={{ top: '50%', left: '50%', transformOrigin: 'center bottom', transform: `translate(-50%, -100%) rotate(${secondsRotation}deg)` }}
        ></div>
      </div>
    </div>
  );
}

export default HomePage;