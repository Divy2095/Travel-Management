import React from "react";

const Dashboard = () => {
  return (
    <div className="bg-gray-100">
      <header>
        <ul className="flex gap-8 justify-center p-3">
          <li></li>
          <li>
            <a href="">Destinations</a>
          </li>
          <li>
            <a href="">Hotels</a>
          </li>
          <li>
            <a href="">Booking</a>
          </li>
          <li>
            <button>Log in</button>
          </li>
        </ul>
      </header>

      <main className="container mx-auto px-6 py-2">
        {/* Hero Section with Grid Layout */}
        <section className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            <div className="bg-blue-200 p-8 rounded-2xl shadow-lg">
              <p className="font-semibold text-sm text-gray-600 mb-4">
                BEST DESTINATIONS AROUND THE WORLD
              </p>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                Travel, Enjoy and live a new and Full life
              </h1>
              <h2 className="text-xl text-gray-700 leading-relaxed">
                Discover breathtaking places, meet amazing people, and make
                memories that last a lifetime.
              </h2>
              <button className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                Start Exploring
              </button>
            </div>
          </div>

          {/* Images Grid */}
          {/* Collage Grid - only visible from md and up */}
          <div className="hidden md:grid grid-cols-3 gap-6 relative h-auto">
            <div className="flex flex-col gap-6">
              <img
                src="https://via.placeholder.com/300x400/FFB84D/FFFFFF?text=Image+1"
                alt="Destination 1"
                className="rounded-2xl shadow-lg w-full h-64 object-cover transform hover:rotate-3 transition-transform duration-300"
              />
              <img
                src="https://via.placeholder.com/300x400/4ECDC4/FFFFFF?text=Image+3"
                alt="Destination 3"
                className="rounded-2xl shadow-lg w-full h-64 object-cover transform hover:-rotate-3 transition-transform duration-300"
              />
            </div>

            <div className="flex flex-col gap-6 mt-12">
              <img
                src="https://via.placeholder.com/300x400/FF6B6B/FFFFFF?text=Image+2"
                alt="Destination 2"
                className="rounded-2xl shadow-lg w-full h-64 object-cover transform hover:-rotate-6 transition-transform duration-300"
              />
              <img
                src="https://via.placeholder.com/300x400/95E1D3/FFFFFF?text=Image+4"
                alt="Destination 4"
                className="rounded-2xl shadow-lg w-full h-64 object-cover transform hover:rotate-6 transition-transform duration-300"
              />
            </div>

            <div className="flex flex-col gap-6">
              <img
                src="https://via.placeholder.com/300x400/FFB84D/FFFFFF?text=Image+5"
                alt="Destination 5"
                className="rounded-2xl shadow-lg w-full h-64 object-cover transform hover:rotate-3 transition-transform duration-300"
              />
              <img
                src="https://via.placeholder.com/300x400/4ECDC4/FFFFFF?text=Image+6"
                alt="Destination 6"
                className="rounded-2xl shadow-lg w-full h-64 object-cover transform hover:-rotate-3 transition-transform duration-300"
              />
            </div>
          </div>
        </section>

        <div className="my-16">
          <h1 className="text-center font-semibold text-2xl mb-8">
            We Offer Best Services
          </h1>
          <div className="flex flex-wrap gap-12 justify-center">
            {[
              "Calculated Weather",
              "Best Flights",
              "Local Events",
              "Best Services",
            ].map((text, idx) => (
              <div
                key={idx}
                className="h-40 w-60 bg-amber-300 rounded-lg flex items-center justify-center text-lg font-medium shadow-md hover:scale-105 transition-transform"
              >
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 grid md:grid-cols-2 gap-12 items-center">
          <div className="px-4">
            <p className="text-blue-500 text-xl font-medium mb-2">
              Easy and Fast
            </p>
            <h1 className="text-3xl sm:text-4xl font-semibold mb-6">
              Book Your Next Trip In 3 Easy Steps
            </h1>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Choose Destination</li>
              <li>Make Payment</li>
              <li>Reach Location on Selected Date</li>
            </ul>
          </div>

          <div className="w-full flex justify-center">
            {/* Replace with an actual image */}
            <img
              src="https://via.placeholder.com/400x300"
              alt="Trip Steps"
              className="rounded-xl shadow-lg"
            />
          </div>
        </div>

        <div className="mt-24 text-center">
          <h1 className="text-3xl sm:text-4xl font-semibold mb-4">
            What People Say About Us.
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Hear from our happy travelers and their amazing experiences.
          </p>
        </div>
      </main>

      <footer className="bg-blue-100 py-12 px-6 mt-24">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
            Want to Become a Trip Planner?
          </h2>
          <p className="text-gray-600 mb-6">
            Join our team of travel enthusiasts and help others plan their dream
            vacations. Enter your email to get started!
          </p>

          <form className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-1.5 rounded-lg hover:bg-blue-700 transition-all w-full sm:w-auto"
            >
              Apply Now
            </button>
          </form>

          <p className="text-sm text-gray-500 mt-6">
            We'll get in touch with more details after you apply.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
