import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

const About = () => {
  const sliderImages = [
    "../../src/assets/images/street-food1.jpg",
    "../../src/assets/images/street-food2.jpeg",
    "../../src/assets/images/street-food3.jpeg",
    "../../src/assets/images/street-food4.jpeg",
    "../../src/assets/images/street-food5.jpeg",
    "../../src/assets/images/street-food6.jpeg",
  ];

  return (
    <div className="bg-gray-100 font-sans">
      {/* Hero Section */}
      <section
        className="relative h-[600px] bg-cover bg-center flex items-center justify-center text-white text-center px-6"
        style={{ backgroundImage: "url('../../src/assets/images/about-bg.jpg')" }}
      >
        <div className="bg-black bg-opacity-60 p-8 rounded-lg shadow-lg">
          <h1 className="text-5xl font-extrabold tracking-wide">
            Welcome to <span className="text-yellow-400">Nukkad Thela</span>
          </h1>
          <p className="text-lg mt-4 max-w-2xl mx-auto">
            Savor the flavors of authentic street food, crafted with love and passion.
          </p>
          <button className="mt-6 px-6 py-3 bg-yellow-400 text-gray-900 font-semibold rounded-full shadow-md hover:bg-yellow-500 transition">
            Order Now
          </button>
        </div>
      </section>

      {/* About Us Section */}
      <section className="max-w-6xl mx-auto py-16 px-6 text-center">
        <h2 className="text-4xl font-bold text-gray-800">Who We Are</h2>
        <p className="text-gray-600 mt-4 text-lg max-w-3xl mx-auto">
          At Nukkad Thela, we bring you the best of street flavors, prepared with fresh ingredients, top hygiene standards, and a whole lot of love.
        </p>
        <div className="mt-6">
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={30}
            slidesPerView={3}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            navigation
            className="w-3/4 mx-auto rounded-lg shadow-xl"
          >
            {sliderImages.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="w-full h-[250px] overflow-hidden rounded-lg"> {/* ✅ Fixed image size */}
                  <img
                    src={image}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-full object-cover" /* ✅ Prevents image stretching */
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Our Vision Section */}
      <section className="py-20 bg-gray-900 text-white text-center relative">
        <h2 className="text-4xl font-extrabold">Our Vision</h2>
        <div className="relative max-w-4xl mx-auto mt-12">
          <div className="w-1 bg-yellow-400 absolute left-1/2 transform -translate-x-1/2 h-full"></div> {/* ✅ Fixed line width */}
          {["Quality Ingredients", "Hygienic Cooking", "Fast Service", "Customer Satisfaction"].map((text, index) => (
            <div
              key={index}
              className={`relative w-1/2 ${index % 2 === 0 ? "ml-auto" : "mr-auto"} text-left p-6`}
            >
              <div className="bg-yellow-400 text-gray-900 p-4 rounded-full text-xl font-bold inline-block">
                {index + 1}
              </div>
              <div className="bg-gray-800 p-6 rounded-lg shadow-md mt-2">{text}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold">Why Choose Us?</h2>
          <div className="grid md:grid-cols-3 gap-10 mt-10">
            {[
              { image: "fresh-ingredients.jpg", title: "Fresh Ingredients", desc: "Only the freshest ingredients for the best taste." },
              { image: "hygienic.jpg", title: "Hygienic Preparation", desc: "Strict hygiene standards for a safe experience." },
              { image: "fast-delivery.jpg", title: "Fast Service", desc: "Quick and fresh delivery, straight to you." },
            ].map((item, index) => (
              <div
                key={index}
                className="p-6 bg-white text-gray-900 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={`/images/${item.image}`}
                  alt={item.title}
                  className="w-20 h-20 mx-auto rounded-full border-4 border-yellow-500"
                />
                <h3 className="text-2xl font-semibold mt-4">{item.title}</h3>
                <p className="mt-2 text-gray-800">{item.desc}</p> {/* ✅ Changed to text-gray-800 for readability */}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="max-w-6xl mx-auto py-16 px-6 text-center">
        <h2 className="text-4xl font-bold text-gray-800">What Our Customers Say</h2>
        <div className="grid md:grid-cols-2 gap-8 mt-8">
          {[
            { review: "Absolutely love the flavors! Always fresh and delicious.", name: "Rahul Verma" },
            { review: "Best street food experience! Quick service and great taste.", name: "Sneha Kapoor" },
          ].map((item, index) => (
            <div
              key={index}
              className="p-6 bg-white text-gray-800 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
            >
              <p className="italic text-lg">"{item.review}"</p>
              <h4 className="font-bold mt-4 text-yellow-500">- {item.name}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 text-white text-center py-16">
        <h2 className="text-4xl font-extrabold">Ready to Taste the Best?</h2>
        <p className="text-lg mt-4 max-w-2xl mx-auto">
          Experience the magic of street food like never before.
        </p>
        <button className="mt-6 px-6 py-3 bg-yellow-400 text-gray-900 font-semibold rounded-full shadow-md hover:bg-yellow-500 transition">
          Order Now
        </button>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white text-center py-6 mt-16">
        <p className="text-lg">&copy; 2025 Nukkad Thela. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default About;