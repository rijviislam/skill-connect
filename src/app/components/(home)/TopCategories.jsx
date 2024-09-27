import { FaDesktop, FaCode, FaPen, FaCamera, FaMusic, FaVideo, FaMobileAlt, FaShoppingCart, FaBook } from 'react-icons/fa';

const cardColors = {
  'Graphic Design': 'bg-green-50',
  'Web Development': 'bg-blue-50',
  'Content Writing': 'bg-yellow-50',
  'Photography': 'bg-red-50',
  'Music Production': 'bg-purple-50',
  'Video Editing': 'bg-teal-50',
  'App Development': 'bg-indigo-50',
  'E-commerce': 'bg-orange-50',
  'Writing & Translation': 'bg-pink-50',
};

const TopCategories = () => (
  <div className="p-6">
    <h2 className="col-span-full text-center text-5xl font-semibold  text-[#2e8b57] mb-4 mt-8">
    Top Categories
    </h2>
    <hr className="border-t-2 border-[#2e8b57] mb-8 mx-auto w-2/12 md:w-1/3" />
    
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {/* Card 1: Graphic Design */}
      <a href="#graphic-design" className={`block p-4 shadow-lg rounded-lg hover:bg-green-100 hover:scale-105 transition-transform duration-300 ease-in-out w-full h-40 flex flex-col items-center justify-center max-w-xs mx-auto ${cardColors['Graphic Design']}`}>
        <div className="flex items-center space-x-4">
          <div className="text-3xl text-green-500">
            <FaDesktop size={24} />
          </div>
          <div className="text-md font-semibold text-gray-700 text-center">
            Graphic Design
          </div>
        </div>
      </a>

      {/* Card 2: Web Development */}
      <a href="#web-development" className={`block p-4 shadow-lg rounded-lg hover:bg-green-100 hover:scale-105 transition-transform duration-300 ease-in-out w-full h-40 flex flex-col items-center justify-center max-w-xs mx-auto ${cardColors['Web Development']}`}>
        <div className="flex items-center space-x-4">
          <div className="text-3xl text-green-500">
            <FaCode size={24} />
          </div>
          <div className="text-md font-semibold text-gray-700 text-center">
            Web Development
          </div>
        </div>
      </a>

      {/* Card 3: Content Writing */}
      <a href="#content-writing" className={`block p-4 shadow-lg rounded-lg hover:bg-green-100 hover:scale-105 transition-transform duration-300 ease-in-out w-full h-40 flex flex-col items-center justify-center max-w-xs mx-auto ${cardColors['Content Writing']}`}>
        <div className="flex items-center space-x-4">
          <div className="text-3xl text-green-500">
            <FaPen size={24} />
          </div>
          <div className="text-md font-semibold text-gray-700 text-center">
            Content Writing
          </div>
        </div>
      </a>

      {/* Card 4: Photography */}
      <a href="#photography" className={`block p-4 shadow-lg rounded-lg hover:bg-green-100 hover:scale-105 transition-transform duration-300 ease-in-out w-full h-40 flex flex-col items-center justify-center max-w-xs mx-auto ${cardColors['Photography']}`}>
        <div className="flex items-center space-x-4">
          <div className="text-3xl text-green-500">
            <FaCamera size={24} />
          </div>
          <div className="text-md font-semibold text-gray-700 text-center">
            Photography
          </div>
        </div>
      </a>

      {/* Card 5: Music Production */}
      <a href="#music-production" className={`block p-4 shadow-lg rounded-lg hover:bg-green-100 hover:scale-105 transition-transform duration-300 ease-in-out w-full h-40 flex flex-col items-center justify-center max-w-xs mx-auto ${cardColors['Music Production']}`}>
        <div className="flex items-center space-x-4">
          <div className="text-3xl text-green-500">
            <FaMusic size={24} />
          </div>
          <div className="text-md font-semibold text-gray-700 text-center">
            Music Production
          </div>
        </div>
      </a>

      {/* Card 6: Video Editing */}
      <a href="#video-editing" className={`block p-4 shadow-lg rounded-lg hover:bg-green-100 hover:scale-105 transition-transform duration-300 ease-in-out w-full h-40 flex flex-col items-center justify-center max-w-xs mx-auto ${cardColors['Video Editing']}`}>
        <div className="flex items-center space-x-4">
          <div className="text-3xl text-green-500">
            <FaVideo size={24} />
          </div>
          <div className="text-md font-semibold text-gray-700 text-center">
            Video Editing
          </div>
        </div>
      </a>

      {/* Card 7: App Development */}
      <a href="#app-development" className={`block p-4 shadow-lg rounded-lg hover:bg-green-100 hover:scale-105 transition-transform duration-300 ease-in-out w-full h-40 flex flex-col items-center justify-center max-w-xs mx-auto ${cardColors['App Development']}`}>
        <div className="flex items-center space-x-4">
          <div className="text-3xl text-green-500">
            <FaMobileAlt size={24} />
          </div>
          <div className="text-md font-semibold text-gray-700 text-center">
            App Development
          </div>
        </div>
      </a>

      {/* Card 8: E-commerce */}
      <a href="#e-commerce" className={`block p-4 shadow-lg rounded-lg hover:bg-green-100 hover:scale-105 transition-transform duration-300 ease-in-out w-full h-40 flex flex-col items-center justify-center max-w-xs mx-auto ${cardColors['E-commerce']}`}>
        <div className="flex items-center space-x-4">
          <div className="text-3xl text-green-500">
            <FaShoppingCart size={24} />
          </div>
          <div className="text-md font-semibold text-gray-700 text-center">
            E-commerce
          </div>
        </div>
      </a>

      {/* Card 9: Writing & Translation */}
      <a href="#writing-translation" className={`block p-4 shadow-lg rounded-lg hover:bg-green-100 hover:scale-105 transition-transform duration-300 ease-in-out w-full h-40 flex flex-col items-center justify-center max-w-xs mx-auto ${cardColors['Writing & Translation']}`}>
        <div className="flex items-center space-x-4">
          <div className="text-3xl text-green-500">
            <FaBook size={24} />
          </div>
          <div className="text-md font-semibold text-gray-700 text-center">
            Writing & Translation
          </div>
        </div>
      </a>
    </div>
  </div>
);

export default TopCategories;
