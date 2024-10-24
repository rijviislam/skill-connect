import Image from "next/image";
import logo from "../../../Image/Skill-removebg-preview.png";

export default function Footer() {
  return (
    <footer className="px-4 bg-violet-100 divide-y drop-shadow-2xl border-t border-[#8a2be2]">
      <div className="container flex flex-col justify-between py-10 mx-auto space-y-8 lg:flex-row lg:space-y-0">
        {/* Left side with logo */}
        <div className="lg:w-1/3 flex items-start">
          <a rel="noopener noreferrer" href="#">
            <Image
              src={logo}
              alt="Skill Connect Logo"
              width={150} // Adjust the width as needed
              height={50} // Adjust the height as needed
              className="object-contain"
            />
          </a>
        </div>

        {/* Right side with links */}
        <div className="grid grid-cols-2 text-sm gap-x-3 gap-y-8 lg:w-2/3 sm:grid-cols-4">
          {/* Product Links */}
          <div className="space-y-3">
            <h3 className="uppercase text-[#8a2be2] font-semibold">Product</h3>
            <ul className="space-y-1 text-[#8a2be2] font-medium">
              <li>
                <a
                  className="hover:text-[#dda0dd] transition ease-in-out delay-150"
                  rel="noopener noreferrer"
                  href="#"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  className="hover:text-[#dda0dd] transition ease-in-out delay-150"
                  rel="noopener noreferrer"
                  href="#"
                >
                  Integrations
                </a>
              </li>
              <li>
                <a
                  className="hover:text-[#dda0dd] transition ease-in-out delay-150"
                  rel="noopener noreferrer"
                  href="#"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  className="hover:text-[#dda0dd] transition ease-in-out delay-150"
                  rel="noopener noreferrer"
                  href="#"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-3">
            <h3 className="uppercase text-[#8a2be2] font-semibold">Company</h3>
            <ul className="space-y-1 text-[#8a2be2] font-medium">
              <li>
                <a
                  className="hover:text-[#dda0dd] transition ease-in-out delay-150"
                  rel="noopener noreferrer"
                  href="#"
                >
                  Privacy
                </a>
              </li>
              <li>
                <a
                  className="hover:text-[#dda0dd] transition ease-in-out delay-150"
                  rel="noopener noreferrer"
                  href="#"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Developer Links */}
          <div className="space-y-3">
            <h3 className="uppercase text-[#8a2be2] font-semibold">
              Developers
            </h3>
            <ul className="space-y-1 text-[#8a2be2] font-medium">
              <li>
                <a
                  className="hover:text-[#dda0dd] transition ease-in-out delay-150"
                  rel="noopener noreferrer"
                  href="#"
                >
                  Public API
                </a>
              </li>
              <li>
                <a
                  className="hover:text-[#dda0dd] transition ease-in-out delay-150"
                  rel="noopener noreferrer"
                  href="#"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  className="hover:text-[#dda0dd] transition ease-in-out delay-150"
                  rel="noopener noreferrer"
                  href="#"
                >
                  Guides
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="space-y-3">
            <div className="uppercase text-[#8a2be2] font-semibold">
              Social media
            </div>
            <div className="flex justify-start space-x-3">
              <a
                rel="noopener noreferrer"
                href="#"
                title="Email"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-[#8a2be2] dark:text-gray-50 hover:bg-[#dda0dd] transition ease-in-out delay-150"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                </svg>
              </a>
              <a
                rel="noopener noreferrer"
                href="#"
                title="Twitter"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-[#8a2be2] dark:text-gray-50 hover:bg-[#dda0dd] transition ease-in-out delay-150"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 50 50"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M 50.0625 10.4375 C 48.214844 11.257813 46.234375 11.808594 44.152344 12.058594 C 46.277344 10.785156 47.910156 8.769531 48.675781 6.371094 C 46.691406 7.546875 44.484375 8.402344 42.144531 8.863281 C 40.269531 6.863281 37.597656 5.617188 34.640625 5.617188 C 28.960938 5.617188 24.355469 10.21875 24.355469 15.898438 C 24.355469 16.703125 24.449219 17.488281 24.625 18.242188 C 16.078125 17.8125 8.503906 13.71875 3.429688 7.496094 C 2.542969 9.019531 2.039063 10.785156 2.039063 12.667969 C 2.039063 16.234375 3.851563 19.382813 6.613281 21.230469 C 4.925781 21.175781 3.339844 20.710938 1.953125 19.941406 C 1.953125 19.984375 1.953125 20.027344 1.953125 20.070313 C 1.953125 25.054688 5.5 29.207031 10.199219 30.15625 C 9.339844 30.390625 8.429688 30.515625 7.492188 30.515625 C 6.828125 30.515625 6.183594 30.453125 5.554688 30.328125 C 6.867188 34.410156 10.664063 37.390625 15.160156 37.472656 C 11.644531 40.230469 7.210938 41.871094 2.390625 41.871094 C 1.558594 41.871094 0.742188 41.824219 -0.0585938 41.726563 C 4.488281 44.648438 9.894531 46.347656 15.703125 46.347656 C 34.617188 46.347656 44.960938 30.679688 44.960938 17.09375 C 44.960938 16.648438 44.949219 16.199219 44.933594 15.761719 C 46.941406 14.3125 48.683594 12.5 50.0625 10.4375 Z"></path>
                </svg>
              </a>
              <a
                rel="noopener noreferrer"
                href="#"
                title="GitHub"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-[#8a2be2] dark:text-gray-50 hover:bg-[#dda0dd] transition ease-in-out delay-150"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M16 0.396484c-8.839844 0-16 7.160156-16 16 0 7.074219 4.582031 13.066406 10.9375 15.183594 0.800781 0.148438 1.09375-0.347656 1.09375-0.773438 0-0.382812-0.015625-1.644531-0.023438-2.980469-4.453125 0.96875-5.390625-1.910156-5.390625-1.910156-0.726562-1.847656-1.773437-2.34375-1.773437-2.34375-1.449219-0.992188 0.109375-0.972656 0.109375-0.972656 1.601563 0.113281 2.445312 1.644531 2.445312 1.644531 1.425781 2.441406 3.738281 1.734375 4.648437 1.324219 0.144532-1.03125 0.558594-1.734375 1.015625-2.132812-3.554687-0.40625-7.289063-1.777344-7.289063-7.90625 0-1.746094 0.621094-3.171875 1.640625-4.289063-0.164062-0.40625-0.710937-2.039062 0.15625-4.253906 0 0 1.335937-0.429688 4.375 1.640625 1.269531-0.355469 2.632812-0.53125 3.984375-0.539063 1.351563 0.007812 2.714844 0.183594 3.984375 0.539063 3.035156-2.070313 4.371094-1.640625 4.371094-1.640625 0.867187 2.214844 0.320313 3.847656 0.15625 4.253906 1.019531 1.117188 1.640625 2.542969 1.640625 4.289063 0 6.148437-3.742188 7.496094-7.304688 7.894531 0.574219 0.496094 1.085938 1.480469 1.085938 2.988281 0 2.15625-0.019531 3.894531-0.019531 4.421875 0 0.433594 0.285156 0.929688 1.105469 0.769531 6.359375-2.121094 10.9375-8.109375 10.9375-15.183594 0-8.839844-7.160156-16-16-16zm0 0"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
