"use client"
export default function Loading() {
    return (
      <div className="flex items-center justify-center h-screen bg-transparent">
      <span className="loader inline-block w-20 h-20 relative border-4 border-violet-800 animate-spin">
        <span className="loader-inner inline-block w-full bg-violet-border-violet-800 animate-pulse"></span>
      </span>
    </div>
    );
  }
  