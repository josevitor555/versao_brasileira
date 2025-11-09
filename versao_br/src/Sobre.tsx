// React
import { useState } from 'react';

// React icons
import { Phone, MapPin } from 'lucide-react';

// Framer Motion
import { motion } from 'framer-motion';

// ImageWithFallback component
import ImageWithFallback from './ImageWithFallback';

// Images
// import bull_logo from '../images/bull_4.png';

export default function About() {
    const [, setIsHovered] = useState(false);

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
        <section id="sobre" className="bg-[#181818] py-16">
            <div className="max-w-7xl mx-auto">
                <motion.div 
                    className="flex flex-col lg:flex-row gap-14 p-8 items-start"
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <motion.div className="w-full lg:w-1/2" variants={item}>
                        <motion.h1 
                            className="text-4xl font-heading font-semibold mb-2 text-secondary"
                            variants={item}
                        >
                            Sobre Nós
                        </motion.h1>

                        <motion.div className="flex justify-start mb-4" variants={item}>
                            <svg
                                width="200"
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

                        </motion.div>

                        <motion.h2 
                            className="text-2xl font-heading font-medium mb-4 text-secondary"
                            variants={item}
                        >
                            Nossa História
                        </motion.h2>

                        <motion.p 
                            className="text-light text-lg mb-6 leading-relaxed" 
                            style={{ lineHeight: '1.6' }}
                            variants={item}
                        >
                            Desde 2020, a Versão Brasileira se estabeleceu como um espaço acolhedor e familiar,
                            oferecendo uma experiência única que combina boa comida, entretenimento e ambiente
                            descontraído para todas as idades.
                        </motion.p>

                        <motion.h3 
                            className="text-xl font-heading font-medium mb-4 text-secondary"
                            variants={item}
                        >
                            O que nos torna especiais
                        </motion.h3>

                        <motion.p 
                            className="text-light text-lg mb-6 leading-relaxed" 
                            style={{ lineHeight: '1.6' }}
                            variants={item}
                        >
                            Com um cardápio variado e shows ao vivo toda semana, criamos um ambiente onde
                            famílias podem desfrutar de momentos especiais. Nosso espaço infantil garante
                            diversão para as crianças enquanto os adultos relaxam e apreciam nossa culinária.
                        </motion.p>

                        <motion.p 
                            className="text-light text-lg mb-8 leading-relaxed" 
                            style={{ lineHeight: '1.6' }}
                            variants={item}
                        >
                            Localizados em São Gonçalo, somos mais do que um restaurante - somos um ponto de
                            encontro para amigos e famílias que buscam qualidade, conforto e entretenimento.
                        </motion.p>

                        <motion.div 
                            className="flex flex-col sm:flex-row gap-4 mt-6"
                            variants={item}
                        >
                            <motion.button
                                className="bg-transparent text-secondary cursor-pointer border border-secondary px-6 py-3 font-medium"
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <div className="flex items-center justify-center space-x-2">
                                    <Phone className="w-5 h-5" />
                                    <span>(86) 99548-3983</span>
                                </div>
                            </motion.button>

                            <motion.button
                                className="bg-secondary text-primary cursor-pointer border border-secondary px-6 py-3 font-medium"
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <div className="flex items-center justify-center space-x-2">
                                    <MapPin className="w-5 h-5" />
                                    <span>Localização</span>
                                </div>
                            </motion.button>
                        </motion.div>
                    </motion.div>

                    <motion.div 
                        className="w-full lg:w-1/2 flex items-center justify-center mt-8 lg:mt-0"
                        variants={item}
                    >
                        <div className="flex items-center justify-center w-full h-full px-6 sm:px-10 md:px-16 lg:px-24 xl:px-32 py-16">
                            <div className="flex items-center justify-center">
                                <motion.div 
                                    className="w-[220px] sm:w-60 md:w-[260px] lg:w-[280px] aspect-9/16 overflow-hidden shadow-lg rounded-xl"
                                    whileHover={{ y: -10 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <ImageWithFallback
                                        src=""
                                        alt="Versão Brasileira"
                                        className="w-full h-full object-cover"
                                        fallbackClassName="w-full h-full flex flex-col items-center justify-center bg-neutral-700 text-secondary p-4 text-center"
                                        placeholder="Versão Brasileira"
                                    />
                                </motion.div>
                            </div>

                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}