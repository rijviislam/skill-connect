import Image from "next/image";
import logo from "../../../Image/Skill-removebg-preview.png";
export default function Footer() {
  return (
    <footer className="px-4 bg-violet-100 divide-y drop-shadow-2xl border-t border-[#8a2be2]">
      <div className="container flex flex-col justify-between py-10 mx-auto space-y-8 lg:flex-row lg:space-y-0">
        <div className="lg:w-1/3">
          <a rel="noopener noreferrer" href="#" className="flex items-start">
            <span className="self-start text-2xl font-bold text-[#8a2be2] flex items-start justify-start">
              <Image
                src={logo}
                alt="Digital Web Design"
                className="w-96 h-96 "
              />
            </span>
          </a>
        </div>
        <div className="grid grid-cols-2 text-sm gap-x-3 gap-y-8 lg:w-2/3 sm:grid-cols-4">
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
                  <path d="M16 0.396484C7.16406 0.396484 0 7.55469 0 16.3965C0 23.3242 4.58203 29.124 10.9375 31.3203C11.75 31.4648 12.0391 30.9688 12.0391 30.542V27.6211C7.57812 28.5117 6.74219 25.4648 6.74219 25.4648C6.01562 23.5508 5.01172 23.0586 5.01172 23.0586C3.57422 22.0898 5.12891 22.1133 5.12891 22.1133C6.71484 22.2266 7.55859 23.7695 7.55859 23.7695C8.95703 26.2227 11.3086 25.4922 12.2734 25.0469C12.4023 24.0547 12.8203 23.3945 13.2812 23.0117C9.66406 22.6289 5.875 21.2734 5.875 15.6758C5.875 13.957 6.48828 12.5508 7.49609 11.4375C7.32422 11.0547 6.78516 9.39453 7.66406 7.19922C7.66406 7.19922 9.01172 6.79297 11.9922 8.69141C13.2812 8.33594 14.6641 8.15625 16.0469 8.14844C17.4297 8.15625 18.8125 8.33594 20.1055 8.69141C23.0781 6.78516 24.4219 7.19922 24.4219 7.19922C25.3008 9.39453 24.7617 11.0547 24.5938 11.4375C25.6055 12.5508 26.2188 13.957 26.2188 15.6758C26.2188 21.2852 22.4219 22.625 18.7969 23.0039C19.3555 23.4648 19.832 24.3242 19.832 25.5898V30.542C19.832 30.9727 20.1172 31.4688 20.9414 31.3203C27.292 29.1211 31.875 23.3242 31.875 16.3965C31.875 7.55469 24.707 0.396484 16 0.396484Z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="py-6 text-sm text-center text-[#8a2be2] font-semibold">
        © 2024 Skill Connect. All rights reserved.
      </div>
    </footer>
  );
}
