import Image from 'next/image';
import React from 'react';

function Page() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4 text-green-600">Welcome Your Dashboard</h1>
      <div className="flex items-center justify-center">
        <Image 
          src="https://i.ibb.co/bsqGHzS/Welcome-amico.png" 
          alt="Welcome illustration" 
          width={500}
          height={300} 
        />
      </div>
    </div>
  );
}

export default Page;
