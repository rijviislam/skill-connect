import Image from 'next/image';

const GraphicDesignPage = () => {
  return (
    <div className="container mx-auto p-6 ">
      {/* Header Section */}
      <header className="mb-8 text-center">
        <h1 className="text-5xl font-extrabold text-green-500">Graphic Design</h1>
        <p className="mt-2 text-lg text-gray-700 max-w-2xl mx-auto">
          Dive into the vibrant world of graphic design, where creativity meets innovation.
        </p>
      </header>

      {/* Featured Articles Section */}
      <section className="mb-10">
        <h2 className="text-4xl font-semibold text-green-500 mb-6 border-b-4 border-green-700 inline-block">
          Featured Articles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <article className="relative p-4 bg-white rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <Image
              src="https://i.postimg.cc/jqZXwq1m/nordwood-themes-ub-IWo074-Ql-U-unsplash.jpg" // Example image URL
              alt="Design Trends 2024"
              width={500}
              height={300}
              className="rounded-md mb-4"
            />
            <h3 className="text-2xl font-bold text-green-500">Top Graphic Design Trends for 2024</h3>
            <p className="mt-2 text-gray-600">
              Discover the latest trends that will shape graphic design in 2024 and learn how to stay ahead in the industry.
            </p>
            
          </article>

          <article className="relative p-4 bg-white rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <Image
              src="https://i.postimg.cc/hPvkZt7R/theme-photos-CGpif-H3-Fj-OA-unsplash.jpg" // Example image URL
              alt="Color Theory Basics"
              width={500}
              height={300}
              className="rounded-md mb-4"
            />
            <h3 className="text-2xl font-bold text-green-500">Understanding Color Theory in Design</h3>
            <p className="mt-2 text-gray-600">
              Learn the basics of color theory and how it can enhance your graphic design projects.
            </p>
            
          </article>

          {/* Additional articles can be added here */}
        </div>
      </section>

      {/* Tips Section */}
      <section className="mb-10">
        <h2 className="text-4xl font-semibold text-green-500 mb-6 border-b-4 border-green-700 inline-block">
          Quick Tips for Graphic Designers
        </h2>
        <ul className="list-disc list-inside space-y-3 text-lg text-gray-700 bg-white p-4 rounded-lg shadow-md">
          <li>✨ Keep your designs simple and focused.</li>
          <li>🎨 Experiment with different fonts to find the perfect match.</li>
          <li>📏 Utilize white space to create a balanced layout.</li>
          <li>💬 Always seek feedback from peers to improve.</li>
          <li>🛠️ Stay updated with the latest design software and tools.</li>
        </ul>
      </section>

      {/* Gallery Section */}
      <section>
        <h2 className="text-4xl font-semibold text-green-500 mb-6 border-b-4 border-green-700 inline-block">
          Inspiration Gallery
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <Image
            src="https://i.postimg.cc/PqGZ3C9t/gallery-image-1.jpg" // Example image URL
            alt="Inspiration 1"
            width={500}
            height={300}
            className="rounded-md shadow-lg hover:scale-105 transition-transform duration-300"
          />
          <Image
            src="https://i.postimg.cc/KvTN3b47/gallery-image-2.jpg" // Example image URL
            alt="Inspiration 2"
            width={500}
            height={300}
            className="rounded-md shadow-lg hover:scale-105 transition-transform duration-300"
          />
          <Image
            src="https://i.postimg.cc/N0B8LBsV/gallery-image-3.jpg" // Example image URL
            alt="Inspiration 3"
            width={500}
            height={300}
            className="rounded-md shadow-lg hover:scale-105 transition-transform duration-300"
          />
          <Image
            src="https://i.postimg.cc/3RcbC1sF/gallery-image-2.jpg" // Example image URL
            alt="Inspiration 4"
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

export default GraphicDesignPage;
