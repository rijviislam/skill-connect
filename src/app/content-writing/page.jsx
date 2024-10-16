import Image from 'next/image';
import { FaPenNib, FaBookOpen, FaLightbulb, FaEdit, FaGlobe } from 'react-icons/fa';

const ContentWritingPage = () => {
  return (
    <div className="container mx-auto p-6 ">
      {/* Header Section */}
      <header className="mb-8 text-center">
        <h1 className="text-5xl font-extrabold text-green-500">Content Writing</h1>
        <p className="mt-2 text-lg text-gray-700 max-w-2xl mx-auto">
          Unleash the power of words and storytelling in the world of content writing.
        </p>
      </header>

      {/* Featured Articles Section */}
      <section className="mb-10">
        <h2 className="text-4xl font-semibold text-green-500 mb-6 border-b-4 border-green-700
         inline-block">
          Featured Articles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <article className="relative p-4 bg-white rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <Image
              src="https://i.postimg.cc/Qx2YXJh3/content-writing-1.jpg"
              alt="Content Writing Trends 2024"
              width={500}
              height={300}
              className="rounded-md mb-4"
            />
            <h3 className="text-2xl font-bold text-green-500">Content Writing Trends for 2024</h3>
            <p className="mt-2 text-gray-600">
              Discover new techniques and tools shaping content writing in 2024.
            </p>
          </article>

          <article className="relative p-4 bg-white rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <Image
              src="https://i.postimg.cc/7LyrmJTd/content-writing-2.jpg"
              alt="Mastering SEO"
              width={500}
              height={300}
              className="rounded-md mb-4"
            />
            <h3 className="text-2xl font-bold text-green-500">Mastering SEO for Content Writing</h3>
            <p className="mt-2 text-gray-600">
              Learn how to optimize your content for search engines and audience engagement.
            </p>
          </article>

          {/* Additional articles can be added here */}
        </div>
      </section>

      {/* Tips Section */}
      <section className="mb-10">
        <h2 className="text-4xl font-semibold text-green-500 mb-6 border-b-4 border-green-700
         inline-block">
          Quick Tips for Content Writers
        </h2>
        <ul className="list-disc list-inside space-y-3 text-lg text-gray-700 bg-white p-4 rounded-lg shadow-md">
          <li className="flex items-center">
            <FaPenNib className="text-green-500 mr-2" /> Keep your writing concise and engaging.
          </li>
          <li className="flex items-center">
            <FaBookOpen className="text-green-500 mr-2" /> Read widely to improve your writing.
          </li>
          <li className="flex items-center">
            <FaLightbulb className="text-green-500 mr-2" /> Brainstorm ideas to create fresh content.
          </li>
          <li className="flex items-center">
            <FaEdit className="text-green-500 mr-2" /> Always proofread and edit thoroughly.
          </li>
          <li className="flex items-center">
            <FaGlobe className="text-green-500 mr-2" /> Understand your audience and write for them.
          </li>
        </ul>
      </section>

      {/* Gallery Section */}
      <section>
        <h2 className="text-4xl font-semibold text-green-500 mb-6 border-b-4 border-green-700
         inline-block">
          Writing Samples Gallery
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <Image
            src="https://i.postimg.cc/ZRqFV8vb/writing-sample-1.jpg"
            alt="Sample 1"
            width={500}
            height={300}
            className="rounded-md shadow-lg hover:scale-105 transition-transform duration-300"
          />
          <Image
            src="https://i.postimg.cc/tRYPnx4C/writing-sample-2.jpg"
            alt="Sample 2"
            width={500}
            height={300}
            className="rounded-md shadow-lg hover:scale-105 transition-transform duration-300"
          />
          <Image
            src="https://i.postimg.cc/vTsygpdz/writing-sample-3.jpg"
            alt="Sample 3"
            width={500}
            height={300}
            className="rounded-md shadow-lg hover:scale-105 transition-transform duration-300"
          />
          <Image
            src="https://i.postimg.cc/y6Fyz4RB/writing-sample-4.jpg"
            alt="Sample 4"
            width={500}
            height={300}
            className="rounded-md shadow-lg hover:scale-105 transition-transform duration-300"
          />
        </div>
      </section>
    </div>
  );
};

export default ContentWritingPage;
