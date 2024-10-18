// import ServicesContext from "@/ServicesContext/ServicesContext";
// import localFont from "next/font/local";
// import QueryProvider from "../../utils/QueryProvider";
// import Footer from "./components/(share)/Footer";
// import "./globals.css";
// import NavbarWrapper from "./NavbarWrapper.jsx";
// import { Providers } from "./providers";
// import AuthProvider from "./services/AuthProvider";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <AuthProvider>
//         <body
//           className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//         >
//           <Providers>
//             <NavbarWrapper /> {/*   NavbarWrapper  */}
//             <ServicesContext>
//               <QueryProvider>
//                 <div>{children}</div>
//               </QueryProvider>
//             </ServicesContext>
//             <Footer />
//           </Providers>
//         </body>
//       </AuthProvider>
//     </html>
//   );
// }


import ServicesContext from "@/ServicesContext/ServicesContext";
import localFont from "next/font/local";
import QueryProvider from "../../utils/QueryProvider";
import Footer from "./components/(share)/Footer";
import "./globals.css";
import NavbarWrapper from "./NavbarWrapper.jsx";
import { Providers } from "./providers";
import AuthProvider from "./services/AuthProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Providers>
            <NavbarWrapper /> {/* NavbarWrapper */}
            <QueryProvider>
            <ServicesContext>
            
                <div>{children}</div>
        
            </ServicesContext>
            </QueryProvider>
           
            <Footer />
           
          </Providers>
        </body>
      </AuthProvider>
    </html>
  );
}