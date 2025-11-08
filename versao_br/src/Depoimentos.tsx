// Interfaces e tipos
import { useState, useEffect } from 'react';
import { ChevronRight, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import ImageWithFallback from './ImageWithFallback';

// Definição da interface para os depoimentos
interface Testimonial {
    id: number;
    name: string;
    profession: string;
    location?: string;
    rating: number;
    text: string;
    photo: string;
}

// Dados dos depoimentos
const testimonials: Testimonial[] = [
    {
        id: 1,
        name: "Lais Sillva",
        profession: "Cliente",
        location: "Versão Brasileira",
        rating: 5,
        text: "Fui muito bem atendido desde a chegada. O garçom foi simpático e prestativo, os pratos vieram rápidos e estavam deliciosos. O ambiente também é bem decorado e confortável. Uma excelente escolha para qualquer ocasião especial.",
        photo: ""
    },
    {
        id: 2,
        name: "Pedro Oliveira dos Santos",
        profession: "Cliente",
        location: "Versão Brasileira",
        rating: 5,
        text: "Gostei do ambiente, mas não me agradei da demora para vir o pedido levou quase uma hora e quando veio a Picanha estava passada demais e o Cupim muito mal passado o que salvou foi a Macacheira que estava bem cozida. Sugiro melhorar o atendimento de parte dos colaboradores.",
        photo: ""
    },
    {
        id: 3,
        name: "Jaime De Sousa Aguiar",
        profession: "Cliente",
        location: "Versão Brasileira",
        rating: 5,
        text: "Um ambiente agradável, com boa comida e ótimo atendimento",
        photo: ""
    },
    {
        id: 4,
        name: "Rayane Uchôa",
        profession: "Cliente",
        location: "Versão Brasileira",
        rating: 5,
        text: "Lugar com horários bem longos, ótimo para encontrar amigos e se divertir. Cerveja gelada e música sempre",
        photo: ""
    },
    {
        id: 5,
        name: "Juanna Quitéria",
        profession: "Cliente",
        location: "Versão Brasileira",
        rating: 5,
        text: "É bem agradável o ambiente, a comida deliciosa, muito bom desde a recepção, a cordialidade dos funcionários até os detalhes da mesa, com certeza irei voltar.",
        photo: ""
    }
];

// Componente de seção de depoimentos
export default function TestimonialsSection() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoScrolling, setIsAutoScrolling] = useState(true);

    // Efeito para rolagem automática dos depoimentos
    useEffect(() => {
        if (!isAutoScrolling) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [isAutoScrolling]);

    // Função para avançar para o próximo depoimento
    // const nextTestimonial = () => {
    //     setIsAutoScrolling(false);
    //     setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    // };

    // // Função para voltar ao depoimento anterior
    // const prevTestimonial = () => {
    //     setIsAutoScrolling(false);
    //     setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    // };

    // Função para renderizar as estrelas de avaliação
    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                className={`w-4 h-4 ${i < rating ? 'text-primary fill-primary' : 'text-secondary'
                    }`}
            />
        ));
    };

    return (
        <section id='depoimentos' className="bg-black py-20 px-4 sm:px-6">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">

                <motion.div 
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl md:text-4xl font-light text-secondary mb-4 tracking-wide">
                        O que as Pessoas Falam da Gente
                    </h2>
                    <motion.div 
                        className="flex justify-center mb-6"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, amount: 0.1 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
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
                    </motion.div>
                </motion.div>

                <div className="relative">
                    {/* Botões de navegação */}
                    {/* <button
                        onClick={prevTestimonial}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm hover:bg-white/90 rounded-full p-3 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
                        aria-label="Previous testimonial"
                    >
                        <ChevronLeft className="w-6 h-6 text-primary cursor-pointer" />
                    </button>

                    <button
                        onClick={nextTestimonial}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm hover:bg-white/90 rounded-full p-3 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
                        aria-label="Next testimonial"
                    >
                        <ChevronRight className="w-6 h-6 text-primary cursor-pointer" />
                    </button> */}

                    {/* Container dos cartões de depoimento */}
                    <div className="overflow-hidden mx-12">
                        <div
                            className="flex transition-transform duration-700 ease-in-out"
                            style={{
                                transform: `translateX(-${currentIndex * 100}%)`
                            }}
                        >
                            {testimonials.map((testimonial, index) => (
                                <motion.div
                                    key={testimonial.id}
                                    className="w-full shrink-0 px-4"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.1 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <div className="bg-transparent rounded-3xl shadow-lg hover:shadow-xl transition-all duration-500 p-8 md:p-12 max-w-4xl mx-auto transform hover:-translate-y-1">
                                        <div className="text-center">
                                            <motion.div 
                                                className="mb-14"
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                viewport={{ once: true, amount: 0.1 }}
                                                transition={{ duration: 0.5, delay: index * 0.1 + 0.1 }}
                                            >
                                                <div className="relative inline-block w-20 h-20 md:w-24 md:h-24">
                                                    <ImageWithFallback
                                                        src={testimonial.photo}
                                                        alt={testimonial.name}
                                                        className="w-20 h-20 md:w-24 md:h-24 rounded-full mx-auto object-cover shadow-lg ring-4 ring-light transition-transform duration-300 hover:scale-105"
                                                        fallbackClassName="w-full h-full rounded-full mx-auto flex items-center justify-center bg-neutral-border text-secondary"
                                                        placeholder="Foto do cliente"
                                                    />
                                                </div>
                                            </motion.div>

                                            {/* Avaliação por estrelas */}
                                            <motion.div 
                                                className="flex justify-center gap-2 mb-6"
                                                initial={{ opacity: 0 }}
                                                whileInView={{ opacity: 1 }}
                                                viewport={{ once: true, amount: 0.1 }}
                                                transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                                            >
                                                {renderStars(testimonial.rating)}
                                            </motion.div>

                                            {/* Texto do depoimento */}
                                            <motion.blockquote 
                                                className="text-secondary text-lg md:text-xl leading-relaxed mb-8 font-light italic max-w-3xl mx-auto"
                                                initial={{ opacity: 0, y: 10 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true, amount: 0.1 }}
                                                transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                                            >
                                                "{testimonial.text}"
                                            </motion.blockquote>

                                            {/* Nome e profissão */}
                                            <motion.div 
                                                className="space-y-1"
                                                initial={{ opacity: 0, y: 10 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true, amount: 0.1 }}
                                                transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
                                            >
                                                <h3 className="text-white text-xl md:text-2xl font-medium">
                                                    {testimonial.name}
                                                </h3>
                                                <p className="text-secondary text-sm md:text-base">
                                                    {testimonial.profession}
                                                    {testimonial.location && (
                                                        <span className="text-accent"> • {testimonial.location}</span>
                                                    )}
                                                </p>
                                            </motion.div>
                                        </div>
                                    </div>
                                </motion.div>
                        ))}
                        </div>
                    </div>
                </div>

                {/* Indicador de pontos */}
                <motion.div 
                    className="flex justify-center gap-2 mt-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                setIsAutoScrolling(false);
                                setCurrentIndex(index);
                            }}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex
                                ? 'bg-primary scale-110'
                                : 'bg-secondary hover:bg-primary hover:scale-105'
                                }`}
                            aria-label={`Go to testimonial ${index + 1}`}
                        />
                    ))}
                </motion.div>

                {/* Botão para ver todas as avaliações */}
                <motion.div 
                    className="text-center mt-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <button className="group bg-primary hover:bg-[#7A654A] text-white px-8 py-4 rounded-full font-medium cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 hover:-translate-y-0.5">
                        <span className="flex items-center gap-2">
                            Ver Todas as Avaliações
                            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </span>
                    </button>
                </motion.div>
            </div>
        </section>
    );
}