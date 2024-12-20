import Image from 'next/image';
import { FaCamera, FaPalette, FaLightbulb, FaEye, FaFilm } from 'react-icons/fa';
import img7 from "../../Image/jakob-owens-EXf5DjXytZE-unsplash.jpg"
import img8 from "../../Image/alexander-dummer-aS4Duj2j7r4-unsplash.jpg"
import img9 from "../../Image/samsung-memory-xiX2PkgsPn4-unsplash.jpg"

const PhotographyPage = () => {
  return (
    <div className="container mx-auto p-6 ">
      {/* Header Section */}
      <header className="mb-8 text-center">
        <h1 className="text-5xl font-extrabold text-violet-500">Photography</h1>
        <p className="mt-2 text-lg text-gray-700 max-w-2xl mx-auto">
          Capture moments that last a lifetime with the art of photography.
        </p>
      </header>

      {/* Featured Articles Section */}
      <section className="mb-10">
        <h2 className="text-4xl font-semibold text-violet-500 mb-6 border-b-4 border-violet-700 inline-block">
          Featured Articles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <article className="relative p-4 bg-white rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <Image
              src={img7}
              alt="Photography Techniques"
              width={500}
              height={300}
              className="rounded-md mb-4"
            />
            <h3 className="text-2xl font-bold text-violet-500">Mastering Photography Techniques</h3>
            <p className="mt-2 text-gray-600">
              Learn the key techniques to take stunning photos and enhance your skills.
            </p>
          </article>

          <article className="relative p-4 bg-white rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <Image
              src={img8}
              alt="Light and Shadow"
              width={500}
              height={300}
              className="rounded-md mb-4"
            />
            <h3 className="text-2xl font-bold text-violet-500">Playing with Light and Shadow</h3>
            <p className="mt-2 text-gray-600">
              Discover how to use light and shadow effectively in your photography.
            </p>
          </article>

          {/* Additional articles can be added here */}
        </div>
      </section>

      {/* Tips Section */}
      <section className="mb-10">
        <h2 className="text-4xl font-semibold text-violet-500 mb-6 border-b-4 border-violet-700 inline-block">
          Quick Tips for Photographers
        </h2>
        <ul className="list-disc list-inside space-y-3 text-lg text-gray-700 bg-white p-4 rounded-lg shadow-md">
          <li className="flex items-center">
            <FaCamera className="text-violet-500 mr-2" /> Invest in high-quality equipment.
          </li>
          <li className="flex items-center">
            <FaPalette className="text-violet-500 mr-2" /> Master post-processing tools.
          </li>
          <li className="flex items-center">
            <FaLightbulb className="text-violet-500 mr-2" /> Experiment with different lighting setups.
          </li>
          <li className="flex items-center">
            <FaEye className="text-violet-500 mr-2" /> Develop a strong visual storytelling approach.
          </li>
          <li className="flex items-center">
            <FaFilm className="text-violet-500 mr-2" /> Capture moments with creativity and precision.
          </li>
        </ul>
      </section>

      {/* Gallery Section */}
      <section>
        <h2 className="text-4xl font-semibold text-violet-500 mb-6 border-b-4 border-violet-700 inline-block">
          Photography Gallery
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <Image
            src={img9}
            alt="Photo 1"
            width={500}
            height={300}
            className="rounded-md shadow-lg hover:scale-105 transition-transform duration-300"
          />
          <Image
            src={img9}
            alt="Photo 2"
            width={500}
            height={300}
            className="rounded-md shadow-lg hover:scale-105 transition-transform duration-300"
          />
          <Image
            src={img9}
            alt="Photo 3"
            width={500}
            height={300}
            className="rounded-md shadow-lg hover:scale-105 transition-transform duration-300"
          />
          <Image
            src={img9}
            alt="Photo 4"
            width={500}
            height={300}
            className="rounded-md shadow-lg hover:scale-105 transition-transform duration-300"
          />
        </div>
      </section>
    </div>
  );
};

export default PhotographyPage;
