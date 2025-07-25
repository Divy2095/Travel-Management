// import { useState } from "react";
// import { Dialog, DialogPanel } from "@headlessui/react";
// import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
// import photo from "./assets/HeroBg.jpg";

// const navigation = [
//   { name: "Destinations", href: "#" },
//   { name: "Hotels", href: "#" },
//   { name: "Booking", href: "#" },
//   { name: "Company", href: "#" },
// ];

// export default function App() {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   return (
//     <div
//       className="bg-white min-h-screen bg-cover bg-center bg-no-repeat relative"
//       style={{ backgroundImage: `url(${photo})` }}
//     >
//       {/* Add overlay for better text readability */}
//       <div className="absolute inset-0 "></div>

//       <header className=" inset-x-0 top-0 z-50 sticky">
//         <nav
//           aria-label="Global"
//           className="flex items-center justify-between p-6 lg:px-8 relative z-10"
//         >
//           <div className="flex lg:flex-1">
//             <a href="#" className="-m-1.5 p-1.5">
//               <span className="sr-only">Your Company</span>
//               <img
//                 alt=""
//                 src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
//                 className="h-8 w-auto"
//               />
//             </a>
//           </div>
//           <div className="flex lg:hidden">
//             <button
//               type="button"
//               onClick={() => setMobileMenuOpen(true)}
//               className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
//             >
//               <span className="sr-only">Open main menu</span>
//               <Bars3Icon aria-hidden="true" className="size-6" />
//             </button>
//           </div>
//           <div className="hidden lg:flex lg:gap-x-12">
//             {navigation.map((item) => (
//               <a
//                 key={item.name}
//                 href={item.href}
//                 className="text-sm/6 font-semibold text-white hover:text-gray-300"
//               >
//                 {item.name}
//               </a>
//             ))}
//           </div>
//           <div className="hidden lg:flex lg:flex-1 lg:justify-end">
//             <a
//               href="#"
//               className="text-sm/6 font-semibold text-white hover:text-gray-300"
//             >
//               Log in <span aria-hidden="true">&rarr;</span>
//             </a>
//           </div>
//         </nav>
//       </header>

//       <div className="relative isolate px-6  lg:px-8 z-10">
//         <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
//           <div className="hidden sm:mb-8 sm:flex sm:justify-center">
//             <div className="relative text-lg text-white">
//               BEST DESTINATIONS AROUND THE WORLD
//             </div>
//           </div>
//           <div className="text-center">
//             <h1 className="text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl">
//               Travel, Enjoy and live a new and Full life
//             </h1>
//             <p className="mt-8 text-lg font-medium text-pretty text-gray-200 sm:text-xl/8">
//               Discover breathtaking places, meet amazing people, and make
//               memories that last a lifetime.
//             </p>
//             <div className="mt-10 flex items-center justify-center gap-x-6">
//               <a
//                 href="#"
//                 className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//               >
//                 Start Traveling
//               </a>
//             </div>
            
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
