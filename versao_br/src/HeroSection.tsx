import { useState, useEffect } from 'react';

// React icons
import { ChevronLeft, ChevronRight, MessageCircle, Calendar } from 'lucide-react';

// Framer motion
import { motion } from 'framer-motion';

// Images
import bull_logo from '/bull_5.png';

const heroImages = [
  {
    url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170',
    title: 'Ambiente Aconchegante',
    subtitle: 'Um espaço para toda a família'
  },
  {
    url: 'https://images.unsplash.com/photo-1662472460736-e26f7a49e90a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170',
    title: 'Shows ao Vivo',
    subtitle: 'Música e entretenimento toda semana'
  },
  {
    url: 'https://images.unsplash.com/photo-1687945512099-400cbe94460c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170',
    title: 'Cardápio Variado',
    subtitle: 'Sabores para todos os gostos'
  },
  {
    url: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170',
    title: 'Espaço Infantil',
    subtitle: 'Diversão garantida para as crianças'
  }
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  const openWhatsApp = () => {
    const phoneNumber = '558695483983';
    const message = 'Olá! Gostaria de fazer uma reserva na Versão Brasileira.';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  // Variações de animação para fade-in
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="home" className="relative h-screen overflow-hidden">

      {/* Background Slider */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1200 ease-out
      ${index === currentSlide ? 'opacity-100' : 'opacity-0'}
    `}
          >
            <img
              src={image.url}
              alt={image.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/50 to-black/80"></div>
          </div>
        ))}

      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-primary/20 backdrop-blur-sm text-primary p-3 rounded-full hover:bg-primary/30 transition-all z-10"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-primary/20 backdrop-blur-sm text-primary p-3 rounded-full hover:bg-primary/30 transition-all z-10"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full text-center text-primary px-4">
        <motion.div
          className="max-w-4xl"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* Logo Image */}
          <motion.div className="flex justify-center mb-6" variants={item}>
            <img
              src={bull_logo}
              alt="Versão Brasileira"
              className="w-40 h-40 object-contain relative z-20"
            />
          </motion.div>

          <motion.h1
            className="text-2xl md:text-6xl font-heading font-semibold mb-2 drop-shadow-2xl text-secondary"
            variants={item}
          >
            Versão Brasileira
          </motion.h1>

          {/* SVG Decorativo */}
          <div className="flex justify-center mb-6">
            <svg
              width="250"
              height="12"
              viewBox="0 0 250 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1="0" y1="6" x2="250" y2="6" stroke="#D1BB9E" stroke-width="1" opacity="0.5" />

              <polygon points="117,2 121,6 117,10 113,6" fill="#D1BB9E" />
              <polygon points="123,2 127,6 123,10 119,6" fill="#D1BB9E" />
              <polygon points="129,2 133,6 129,10 125,6" fill="#D1BB9E" />

              <circle cx="4" cy="6" r="2" fill="#D1BB9E" />
              <circle cx="246" cy="6" r="2" fill="#D1BB9E" />
            </svg>
          </div>

          <motion.p
            className="text-xl text-white md:text-2xl mb-4 font-light drop-shadow-lg"
            variants={item}
          >
            Desde 2020, espaço para todas as idades
          </motion.p>
          <motion.p
            className="text-lg text-white md:text-xl mb-8 max-w-2xl mx-auto drop-shadow-md"
            variants={item}
          >
            Shows ao vivo, cardápio variado e ambiente familiar.
            Venha viver momentos especiais conosco!
          </motion.p>

          {/* Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-8 mt-4 justify-center items-center"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <motion.button
              onClick={openWhatsApp}
              className="bg-transparent text-background cursor-pointer px-8 py-4 font-bold flex items-center space-x-2 border border-secondary"
              variants={item}
            >
              <MessageCircle className="w-5 h-5" />
              <span> Peça pelo WhatsApp </span>
            </motion.button>
            <motion.button
              onClick={() => document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-[#e2dbb2] hover:bg-secondary text-primary cursor-pointer px-8 py-4 font-bold flex items-center space-x-2 border border-primary"
              variants={item}
            >
              <Calendar className="w-5 h-5" />
              <span> Reserve Agora </span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
              }`}
          />
        ))}
      </div>
    </section>
  );
}