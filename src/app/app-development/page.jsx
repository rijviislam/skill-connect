import Image from 'next/image';
import { FaMobileAlt, FaCode, FaLaptopCode, FaRocket, FaDatabase } from 'react-icons/fa';
import app from "../../Image/timothy-hales-bennett-OwvRB-M3GwE-unsplash.jpg"
import app2 from "../../Image/olaf-val-UTk9cXzYWAg-unsplash.jpg"
import app3 from "../../Image/tran-mau-tri-tam-g-pKprPg5yw-unsplash.jpg"

const AppDevelopmentPage = () => {
  return (
    <div className="container mx-auto p-6 ">
      {/* Header Section */}
      <header className="mb-8 text-center">
        <h1 className="text-5xl font-extrabold text-violet-500">App Development</h1>
        <p className="mt-2 text-lg text-gray-700 max-w-2xl mx-auto">
          Stay ahead in the fast-growing world of mobile and web app development with the latest insights.
        </p>
      </header>

      {/* Featured Articles Section */}
      <section className="mb-10">
        <h2 className="text-4xl font-semibold text-violet-500 mb-6 border-b-4 border-violet-500 inline-block">
          Featured Articles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <article className="relative p-4 bg-white rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <Image
              src={app}
              alt="Modern App Development Tools"
              width={500}
              height={300}
              className="rounded-md mb-4"
            />
            <h3 className="text-2xl font-bold text-violet-500">Modern App Development Tools</h3>
            <p className="mt-2 text-gray-600">
              Explore the latest tools and frameworks for building powerful mobile and web apps.
            </p>
          </article>

          <article className="relative p-4 bg-white rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <Image
              src={app2}
              alt="Scalable Backend Solutions"
              width={500}
              height={300}
              className="rounded-md mb-4"
            />
            <h3 className="text-2xl font-bold text-violet-500">Scalable Backend Solutions</h3>
            <p className="mt-2 text-gray-600">
              Learn about backend technologies that ensure your apps can scale efficiently.
            </p>
          </article>

          {/* Additional articles can be added here */}
        </div>
      </section>

      {/* Tips Section */}
      <section className="mb-10">
        <h2 className="text-4xl font-semibold text-violet-500 mb-6 border-b-4 border-violet-500 inline-block">
          Quick Tips for App Developers
        </h2>
        <ul className="list-disc list-inside space-y-3 text-lg text-gray-700 bg-white p-4 rounded-lg shadow-md">
          <li className="flex items-center">
            <FaMobileAlt className="text-violet-500 mr-2" /> Focus on creating a user-friendly interface.
          </li>
          <li className="flex items-center">
            <FaCode className="text-violet-500 mr-2" /> Optimize your code for performance and efficiency.
          </li>
          <li className="flex items-center">
            <FaLaptopCode className="text-violet-500 mr-2" /> Test your app on various devices and platforms.
          </li>
          <li className="flex items-center">
            <FaRocket className="text-violet-500 mr-2" /> Ensure your app is fast and responsive.
          </li>
          <li className="flex items-center">
            <FaDatabase className="text-violet-500 mr-2" /> Choose a reliable and scalable database solution.
          </li>
        </ul>
      </section>

      {/* Gallery Section */}
      <section>
        <h2 className="text-4xl font-semibold text-violet-500 mb-6 border-b-4 border-violet-500 inline-block">
          App Development Gallery
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <Image
            src={app3}
            alt="App Dev Gallery 1"
            width={500}
            height={300}
            className="rounded-md shadow-lg hover:scale-105 transition-transform duration-300"
          />
          <Image
            src={app3}
            alt="App Dev Gallery 2"
            width={500}
            height={300}
            className="rounded-md shadow-lg hover:scale-105 transition-transform duration-300"
          />
          <Image
            src={app3}
            alt="App Dev Gallery 3"
            width={500}
            height={300}
            className="rounded-md shadow-lg hover:scale-105 transition-transform duration-300"
          />
          <Image
            src={app3}
            alt="App Dev Gallery 4"
            width={500}
            height={300}
            className="rounded-md shadow-lg hover:scale-105 transition-transform duration-300"
          />
        </div>
      </section>
    </div>
  );
};

export default AppDevelopmentPage;
