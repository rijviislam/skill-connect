import { FaArrowRight, FaBriefcase, FaHandshake, FaMoneyBillWave, FaSearch } from 'react-icons/fa';

const WorkflowSteps = () => {
  return (
    <div className="py-12 ">
      <div className="container mx-auto px-6">
        <h2 className="text-left text-4xl font-medium text-[#2e8b57] mb-7 mt-8 flex items-center ">
          How It Works
          <FaArrowRight className="ml-2" />
        </h2>
        
        <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-8">
          
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center p-4 border-2 hover:border-green-700 bg-green-50 rounded-full shadow-md transform transition-transform hover:scale-105 hover:bg-teal-50 hover:shadow-xl">
            <div className="w-16 h-16 flex items-center justify-center bg-[#2e8b57] text-white rounded-full mb-3 transition-colors hover:bg-teal-600">
              <FaBriefcase className="text-3xl" />
            </div>
            <h3 className="text-lg font-semibold mb-1">Post a Job</h3>
            <p className="text-gray-600 p-2">Clients post job listings with details of the project they need help with.</p>
          </div>
          
          {/* Step 2 */}
          <div className="flex flex-col items-center text-center p-4 border-2 hover:border-green-700 bg-green-50 rounded-full shadow-md transform transition-transform hover:scale-105 hover:bg-teal-50 hover:shadow-xl">
            <div className="w-16 h-16 flex items-center justify-center bg-[#2e8b57] text-white rounded-full mb-3 transition-colors hover:bg-teal-600">
              <FaSearch className="text-3xl" />
            </div>
            <h3 className="text-lg font-semibold mb-1">Get Proposals</h3>
            <p className="text-gray-600 p-2">Freelancers submit proposals for the job, detailing their approach and pricing.</p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center text-center p-4 border-2 hover:border-green-700 bg-green-50 rounded-full shadow-md transform transition-transform hover:scale-105 hover:bg-teal-50 hover:shadow-xl">
            <div className="w-16 h-16 flex items-center justify-center bg-[#2e8b57] text-white rounded-full mb-3 transition-colors hover:bg-teal-600">
              <FaHandshake className="text-3xl" />
            </div>
            <h3 className="text-lg font-semibold mb-1">Hire</h3>
            <p className="text-gray-600 p-2">Clients review proposals and hire the freelancer who best matches their needs.</p>
          </div>
          
          {/* Step 4 */}
          <div className="flex flex-col items-center text-center p-4 border-2 hover:border-green-700 bg-green-50 rounded-full shadow-md transform transition-transform hover:scale-105 hover:bg-teal-50 hover:shadow-xl">
            <div className="w-16 h-16 flex items-center justify-center bg-[#2e8b57] text-white rounded-full mb-3 transition-colors hover:bg-teal-600">
              <FaMoneyBillWave className="text-3xl" />
            </div>
            <h3 className="text-lg font-semibold mb-1">Pay Securely</h3>
            <p className="text-gray-600 p-2">Payment is made through the platform, ensuring secure and reliable transactions.</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default WorkflowSteps;
