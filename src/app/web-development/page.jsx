import Image from 'next/image';
import { FaBolt, FaBook, FaCode, FaMobileAlt, FaWrench } from 'react-icons/fa';
import img1 from "../../Image/luke-peters-B6JINerWMz0-unsplash.jpg"
import img2 from "../../Image/caspar-camille-rubin-7SDoly3FV_0-unsplash.jpg"
import img3 from "../../Image/tran-mau-tri-tam-g-pKprPg5yw-unsplash.jpg"

const WebDevelopmentPage = () => {
  return (
    <div className="container mx-auto p-6 ">
      {/* Header Section */}
      <header className="mb-8 text-center">
        <h1 className="text-5xl font-extrabold text-violet-500">Web Development</h1>
        <p className="mt-2 text-lg text-gray-700 max-w-2xl mx-auto">
          Explore the ever-evolving world of web development, where technology shapes the future.
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
              src={img1} // Example image URL
              alt="Web Development Trends 2024"
              width={500}
              height={300}
              className="rounded-md mb-4"
            />
            <h3 className="text-2xl font-bold text-violet-500">Top Web Development Trends for 2024</h3>
            <p className="mt-2 text-gray-600">
              Discover the cutting-edge technologies and practices shaping the web development landscape in 2024.
            </p>
          </article>

          <article className="relative p-4 bg-white rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <Image
              src={img2} // Example image URL
              alt="JavaScript Frameworks"
              width={500}
              height={300}
              className="rounded-md mb-4"
            />
            <h3 className="text-2xl font-bold text-violet-500">Mastering JavaScript Frameworks</h3>
            <p className="mt-2 text-gray-600">
              Learn the pros and cons of the most popular JavaScript frameworks and how they can elevate your projects.
            </p>
          </article>

          {/* Additional articles can be added here */}
        </div>
      </section>

           {/* Tips Section */}
           <section className="mb-10">
        <h2 className="text-4xl font-semibold text-violet-500 mb-6 border-b-4 border-violet-500 inline-block">
          Quick Tips for Web Developers
        </h2>
        <ul className="list-disc list-inside space-y-3 text-lg text-gray-700 bg-white p-4 rounded-lg shadow-md">
          <li className="flex items-center">
            <FaCode className="text-violet-500 mr-2" /> Write clean and maintainable code.
          </li>
          <li className="flex items-center">
            <FaBook className="text-violet-500 mr-2" /> Stay updated with the latest frameworks and libraries.
          </li>
          <li className="flex items-center">
            <FaBolt className="text-violet-500 mr-2" /> Optimize your website for performance and speed.
          </li>
          <li className="flex items-center">
            <FaWrench className="text-violet-500 mr-2" /> Utilize browser developer tools for debugging.
          </li>
          <li className="flex items-center">
            <FaMobileAlt className="text-violet-500 mr-2" /> Focus on creating responsive and mobile-friendly designs.
          </li>
        </ul>
      </section>

      {/* Gallery Section */}
      <section>
        <h2 className="text-4xl font-semibold text-violet-500 mb-6 border-b-4 border-violet-500 inline-block">
          Project Gallery
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <Image
            src={img3} // Example image URL
            alt="Project 1"
            width={500}
            height={300}
            className="rounded-md shadow-lg hover:scale-105 transition-transform duration-300"
          />
          <Image
            src={img3} // Example image URL
            alt="Project 2"
            width={500}
            height={300}
            className="rounded-md shadow-lg hover:scale-105 transition-transform duration-300"
          />
          <Image
            src={img3} // Example image URL
            alt="Project 3"
            width={500}
            height={300}
            className="rounded-md shadow-lg hover:scale-105 transition-transform duration-300"
          />
          <Image
            src={img3} // Example image URL
            alt="Project 4"
            width={500}
            height={300}
            className="rounded-md shadow-lg hover:scale-105 transition-transform duration-300"
          />
          {/* Add more images as needed */}
        </div>
      </section>
    </div>
  );
};

export default WebDevelopmentPage;
