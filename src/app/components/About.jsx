import Image from "next/image";
import about from "../../Image/Connecting teams-bro.png"; 


import { FaBullhorn, FaGlobe, FaHandshake } from 'react-icons/fa';

const About = () => {
  return (
    <section className="flex flex-col items-center py-16  px-4 md:px-8 lg:px-16">
      {/* Headline Section */}
<div className="text-center mb-12">
  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 hover:text-violet-bg-violet-400 transition-colors duration-300">
    Who We Are
  </h2>
  <div className="w-16 sm:w-20 h-1 bg-violet-400 mx-auto mt-2 rounded-full"></div>
</div>

{/* Main Content Section */}
<div className="container mx-auto flex flex-col items-center md:flex-row">
  {/* Left Section */}
  <div className="w-full md:w-1/2 md:pr-10 mb-8 md:mb-0 text-center md:text-left">
    <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed mb-4 transition-transform duration-300 hover:scale-105">
      SkillConnect is more than just a platform; it&apos;s a community where freelancers and clients come together to realize their potential. Our mission is to create an environment that fosters collaboration and success for both parties.
    </p>
    <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed mb-4 transition-transform duration-300 hover:scale-105">
      We believe in empowering professionals by providing them with the tools they need to succeed. At SkillConnect, we facilitate connections that transcend geographical boundaries, enabling individuals to thrive in a flexible and supportive environment.
    </p>
    <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed transition-transform duration-300 hover:scale-105">
      Since our inception, we have been committed to adapting to the needs of our users. Our team works tirelessly to ensure that SkillConnect evolves alongside the ever-changing landscape of freelance work. Join us in building a brighter future together, where opportunities are endless!
    </p>
  </div>

  {/* Right Section with Static Image */}
  <div className="w-full md:w-1/2 flex justify-center md:justify-end mb-8">
    <Image
      src={about}
      alt="Remote meeting illustration"
      className="rounded-lg shadow-lg w-4/5 md:w-2/3 transition-transform duration-300 hover:scale-105" // Adjust width as needed
    />
  </div>
</div>



<div className="container mx-auto px-4 py-8">
  <div className="flex flex-col gap-6">
    {/* Mission Card */}
    <div className="bg-blue-200 p-4 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 max-w-2xl mx-auto">
      <div className="flex items-center mb-2">
        <FaBullhorn className="text-blue-800 text-3xl mr-2" />
        <h2 className="text-xl font-bold text-blue-800">Our Mission</h2>
      </div>
      <p className="text-gray-800 text-base">To bring Employers and Freelancers together from around the globe to get work done.</p>
    </div>
    {/* Vision Card */}
    <div className="bg-green-200 p-4 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 max-w-2xl mx-auto">
      <div className="flex items-center mb-2">
        <FaGlobe className="text-green-800 text-3xl mr-2" />
        <h2 className="text-xl font-bold text-green-800">Our Vision</h2>
      </div>
      <p className="text-gray-800 text-base">To help build a better world that&apos;s interconnected for prosperity and wired for peace.</p>
    </div>
    {/* Proposition Card */}
    <div className="bg-yellow-200 p-4 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 max-w-2xl mx-auto">
      <div className="flex items-center mb-2">
        <FaHandshake className="text-yellow-800 text-3xl mr-2" />
        <h2 className="text-xl font-bold text-yellow-800">Our Proposition</h2>
      </div>
      <p className="text-gray-800 text-base">Connect, collaborate, and get work done in a safe and flexible online environment.</p>
    </div>
  </div>
</div>


    

    </section>
  );
};

export default About;
