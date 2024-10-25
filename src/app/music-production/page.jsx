import Image from 'next/image';
import { FaMusic, FaHeadphones, FaMicrophone, FaCompactDisc, FaMix } from 'react-icons/fa';
import music1 from "../../Image/caught-in-joy-ptVBlniJi50-unsplash.jpg"
import music2 from "../../Image/wes-hicks-VZNYO4suM5o-unsplash.jpg"
import music3 from "../../Image/daniel-chekalov-rRVGpLI5ceo-unsplash.jpg"

const MusicProductionPage = () => {
  return (
    <div className="container mx-auto p-6 ">
      {/* Header Section */}
      <header className="mb-8 text-center">
        <h1 className="text-5xl font-extrabold text-violet-500">Music Production</h1>
        <p className="mt-2 text-lg text-gray-700 max-w-2xl mx-auto">
          Dive into the world of sound and rhythm with top-notch music production tips and techniques.
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
              src={music1}
              alt="Top Music Production Tools"
              width={500}
              height={300}
              className="rounded-md mb-4"
            />
            <h3 className="text-2xl font-bold text-violet-500">Top Music Production Tools</h3>
            <p className="mt-2 text-gray-600">
              Discover the best music production software and equipment in the industry.
            </p>
          </article>

          <article className="relative p-4 bg-white rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <Image
              src={music2}
              alt="Mixing and Mastering"
              width={500}
              height={300}
              className="rounded-md mb-4"
            />
            <h3 className="text-2xl font-bold text-violet-500">Mixing and Mastering Tips</h3>
            <p className="mt-2 text-gray-600">
              Learn the art of mixing and mastering to create professional-quality tracks.
            </p>
          </article>

          {/* Additional articles can be added here */}
        </div>
      </section>

      {/* Tips Section */}
      <section className="mb-10">
        <h2 className="text-4xl font-semibold text-violet-500 mb-6 border-b-4 border-violet-700 inline-block">
          Quick Tips for Music Producers
        </h2>
        <ul className="list-disc list-inside space-y-3 text-lg text-gray-700 bg-white p-4 rounded-lg shadow-md">
          <li className="flex items-center">
            <FaMusic className="text-violet-500 mr-2" /> Invest in high-quality headphones for accurate sound monitoring.
          </li>
          <li className="flex items-center">
            <FaHeadphones className="text-violet-500 mr-2" /> Experiment with different audio samples and loops.
          </li>
          <li className="flex items-center">
            <FaMicrophone className="text-violet-500 mr-2" /> Record your own sounds to add a personal touch.
          </li>
          <li className="flex items-center">
            <FaCompactDisc className="text-violet-500 mr-2" /> Always back up your projects regularly.
          </li>
          <li className="flex items-center">
            <FaMix className="text-violet-500 mr-2" /> Focus on clarity and balance in your mix.
          </li>
        </ul>
      </section>

      {/* Gallery Section */}
      <section>
        <h2 className="text-4xl font-semibold text-violet-500 mb-6 border-b-4 border-violet-700 inline-block">
          Music Production Gallery
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <Image
            src={music3}
            alt="Music Prod 1"
            width={500}
            height={300}
            className="rounded-md shadow-lg hover:scale-105 transition-transform duration-300"
          />
          <Image
            src={music3}
            alt="Music Prod 2"
            width={500}
            height={300}
            className="rounded-md shadow-lg hover:scale-105 transition-transform duration-300"
          />
          <Image
            src={music3}
            alt="Music Prod 3"
            width={500}
            height={300}
            className="rounded-md shadow-lg hover:scale-105 transition-transform duration-300"
          />
          <Image
            src={music3}
            alt="Music Prod 4"
            width={500}
            height={300}
            className="rounded-md shadow-lg hover:scale-105 transition-transform duration-300"
          />
        </div>
      </section>
    </div>
  );
};

export default MusicProductionPage;
