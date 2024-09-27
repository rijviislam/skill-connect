

import { FaBriefcase, FaHandshake, FaMoneyBillWave, FaSearch } from 'react-icons/fa';

const WorkflowSteps = () => {
  return (
    <div className="py-12 ">
      <div className="container mx-auto px-6">
        <h2 className="col-span-full text-center text-5xl font-semibold  text-[#2e8b57] mb-4 mt-8">How It Works</h2>
        <hr className="border-t-2 border-[#2e8b57] mb-8 mx-auto w-2/12 md:w-1/3" />
        <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-12">
          
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center p-6 bg-green-50 rounded-full shadow-lg transform transition-transform hover:scale-105 hover:bg-teal-50 hover:shadow-2xl">
            <div className="w-20 h-20 flex items-center justify-center bg-[#2e8b57] text-white rounded-full mb-4 transition-colors hover:bg-teal-600">
              <FaBriefcase className="text-4xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Post a Job</h3>
            <p className="text-gray-600">Clients post job listings with details of the project they need help with.</p>
          </div>
          
          {/* Step 2 */}
          <div className="flex flex-col items-center text-center p-6 bg-green-50 rounded-full shadow-lg transform transition-transform hover:scale-105 hover:bg-teal-50 hover:shadow-2xl">
            <div className="w-20 h-20 flex items-center justify-center bg-[#2e8b57] text-white rounded-full mb-4 transition-colors hover:bg-teal-600">
              <FaSearch className="text-4xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Get Proposals</h3>
            <p className="text-gray-600">Freelancers submit proposals for the job, detailing their approach and pricing.</p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center text-center p-6 bg-green-50 rounded-full shadow-lg transform transition-transform hover:scale-105 hover:bg-teal-50 hover:shadow-2xl">
            <div className="w-20 h-20 flex items-center justify-center bg-[#2e8b57] text-white rounded-full mb-4 transition-colors hover:bg-teal-600">
              <FaHandshake className="text-4xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Hire</h3>
            <p className="text-gray-600">Clients review proposals and hire the freelancer who best matches their needs.</p>
          </div>
          
          {/* Step 4 */}
          <div className="flex flex-col items-center text-center p-6 bg-green-50 rounded-full shadow-lg transform transition-transform hover:scale-105 hover:bg-teal-50 hover:shadow-2xl">
            <div className="w-20 h-20 flex items-center justify-center bg-[#2e8b57] text-white rounded-full mb-4 transition-colors hover:bg-teal-600">
              <FaMoneyBillWave className="text-4xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Pay Securely</h3>
            <p className="text-gray-600">Payment is made through the platform, ensuring secure and reliable transactions.</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default WorkflowSteps;
