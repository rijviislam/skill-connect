import Image from "next/image";
import Link from "next/link";
import error from "../Image/404 error with people holding the numbers-rafiki.png";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center bg-gray-100">
      <div className="mb-6">
        <Image src={error} alt="404 Error" width={400} height={400} className="mx-auto" />
      </div>
      <h2 className="text-3xl font-bold text-gray-800 mb-2">Oops! Page Not Found</h2>
      <p className="text-lg text-gray-600 mb-6">
        Sorry, we couldn’t find the page you’re looking for.
      </p>
      <Link href="/">
        <a className="px-6 py-3 text-white bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 transition ease-in-out duration-300">
          Return Home
        </a>
      </Link>
    </div>
  );
}
