import React, { useState, useEffect } from "react";
import AshleyKoir from "../assets/AshleyKoir.png";
import WadeJames from "../assets/WadeJames.png";
import ThandiSithole from "../assets/ThandiSithole.png";
import MichealRod from "../assets/MichealRod.png";

const Testimonials = () => {
    const testimonialsData = [
        {
          id: 1,
          rating: 5,
          text: 'Found my dream home in just 2 weeks! The service was fantastic.',
          name: 'Ashley Koir',
          role: 'First-Time Buyer',  
          image: AshleyKoir
        },
        {
          id: 2,
          rating: 5,
          text: 'As an investor, StayEasy saved me hours of research. Highly recommend!',
          name: 'Wade James',
          role: 'Real Estate Investor',  
          image: WadeJames
        },
        {
          id: 3,
          rating: 5,
          text: 'Relocated seamlessly with PropertyWeb. Closed before I even moved!',
          name: 'Thandi Sithole',
          role: 'Relocating Professional',  
          image: ThandiSithole
        },
        {
          id: 4,
          rating: 5,
          text: 'Finally bought my first home thanks to StayEasy.',
          name: 'Michael Rod',
          role: 'New Homeowner',  
          image: MichealRod
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    // Auto slide effect - slides every 5 seconds
    useEffect(() => {
        if (isPaused) return;
        
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => 
                prevIndex === testimonialsData.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000);

        return () => clearInterval(interval);
    }, [testimonialsData.length, isPaused, currentIndex]);

    const goToPrev = () => {
        setCurrentIndex(prevIndex => 
            prevIndex === 0 ? testimonialsData.length - 1 : prevIndex - 1
        );
    };

    const goToNext = () => {
        setCurrentIndex(prevIndex => 
            prevIndex === testimonialsData.length - 1 ? 0 : prevIndex + 1
        );
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    return (
        <section 
            className="py-16 px-4 sm:px-6 lg:px-8 bg-white"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Customer Experiences</h2>
                    <p className="text-blue-300 text-lg">What our clients say about StayEasy</p>
                    <div className="mt-4 flex justify-center">
                        <div className="h-1 w-20 bg-blue-300 rounded-full"></div>
                    </div>
                </div>
                
                <div className="relative overflow-hidden">
                    <div 
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    >
                        {testimonialsData.map((testimonial) => (
                            <div 
                                key={testimonial.id} 
                                className="w-full flex-shrink-0 px-4"
                            >
                                {/* Baby blue card with soft white accents */}
                                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl shadow-lg border border-blue-200 hover:shadow-xl transition-all duration-300 max-w-2xl mx-auto relative overflow-hidden">
                                    {/* Decorative elements */}
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200 rounded-full opacity-20 transform translate-x-16 -translate-y-16"></div>
                                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-300 rounded-full opacity-20 transform -translate-x-12 translate-y-12"></div>
                                    
                                    <div className="relative z-10">
                                        <div className="flex mb-4 justify-center">
                                            {[...Array(testimonial.rating)].map((_, i) => (
                                                <svg 
                                                    key={i} 
                                                    className="w-6 h-6 text-yellow-400" 
                                                    fill="currentColor" 
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                        </div>
                                        
                                        <div className="relative mb-8">
                                            <svg 
                                                className="absolute -top-6 -left-6 w-16 h-16 text-blue-300 opacity-30" 
                                                fill="currentColor" 
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                                            </svg>
                                            <p className="text-gray-700 text-center text-lg px-4 italic">
                                                "{testimonial.text}"
                                            </p>
                                        </div>
                                        
                                        <div className="flex flex-col items-center">
                                            <div className="relative mb-4">
                                                <img 
                                                    src={testimonial.image} 
                                                    alt={testimonial.name}
                                                    className="w-20 h-20 rounded-full object-cover border-4 border-blue-200 shadow-md"
                                                />
                                                <div className="absolute -bottom-2 -right-2 bg-blue-300 rounded-full p-1 shadow-sm">
                                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <p className="font-bold text-gray-800 text-xl">{testimonial.name}</p>
                                            <p className="text-blue-400">{testimonial.role}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    {/* Navigation arrows */}
                    <button 
                        onClick={goToPrev}
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:bg-blue-50 transition-colors duration-200 z-10 ml-2 md:ml-4"
                    >
                        <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button 
                        onClick={goToNext}
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:bg-blue-50 transition-colors duration-200 z-10 mr-2 md:mr-4"
                    >
                        <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
                
                {/* Indicators */}
                <div className="flex justify-center mt-10">
                    {testimonialsData.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`mx-2 w-3 h-3 rounded-full transition-all duration-300 ${currentIndex === index ? 'bg-blue-400 scale-125' : 'bg-blue-200'}`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
                
                {/* Auto-slide indicator */}
                <div className="mt-6 text-center text-blue-400 text-sm">
                    <span className="flex items-center justify-center">
                        <svg className="w-4 h-4 mr-2 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        Auto-rotating every 5 seconds
                    </span>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;