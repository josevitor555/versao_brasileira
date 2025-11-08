import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface Testimonial {
    id: number;
    name: string;
    profession: string;
    location?: string;
    rating: number;
    text: string;
    photo: string;
}

const testimonials: Testimonial[] = [
    {
        id: 1,
        name: "Sarah Chen",
        profession: "Designer de Produto",
        location: "São Francisco",
        rating: 5,
        text: "A atenção aos detalhes e a abordagem de design cuidadosa superaram todas as minhas expectativas. Isso é exatamente o que eu estava procurando.",
        photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
        id: 2,
        name: "Marcus Rodriguez",
        profession: "Diretor Criativo",
        location: "Nova York",
        rating: 5,
        text: "Trabalho absolutamente impressionante. O profissionalismo e a criatividade da equipe deram vida à nossa visão de formas que nunca imaginamos.",
        photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
        id: 3,
        name: "Emma Thompson",
        profession: "Estrategista de Marca",
        location: "Londres",
        rating: 5,
        text: "Trabalhar com esta equipe foi transformador para a nossa marca. As percepções e a execução deles são verdadeiramente de nível mundial.",
        photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    {
        id: 4,
        name: "David Kim",
        profession: "Empreendedor de Tecnologia",
        location: "Seul",
        rating: 5,
        text: "A combinação perfeita de criatividade e funcionalidade. Eles entenderam as nossas necessidades e entregaram além dos nossos sonhos mais ousados.",
        photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
        id: 5,
        name: "Sofia Andersson",
        profession: "Diretora de Marketing",
        location: "Estocolmo",
        rating: 5,
        text: "Qualidade e serviço excepcionais. Os resultados falam por si só - nosso engajamento aumentou drasticamente.",
        photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
    }
];

export default function TestimonialsSection() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoScrolling, setIsAutoScrolling] = useState(true);

    useEffect(() => {
        if (!isAutoScrolling) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [isAutoScrolling]);

    const nextTestimonial = () => {
        setIsAutoScrolling(false);
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setIsAutoScrolling(false);
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

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
        <section id='depoimentos' className="bg-black py-20 px-6">
            <div className="max-w-6xl mx-auto">

                <div className="text-center mb-16 animate-fade-in">
                    <h2 className="text-4xl md:text-4xl font-light text-secondary mb-4 tracking-wide">
                        O que as Pessoas Falam da Gente
                    </h2>
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

                </div>

                <div className="relative">
                    {/* Navigation Arrows */}
                    <button
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
                    </button>

                    {/* Testimonial Cards Container */}
                    <div className="overflow-hidden mx-12">
                        <div
                            className="flex transition-transform duration-700 ease-in-out"
                            style={{
                                transform: `translateX(-${currentIndex * 100}%)`
                            }}
                        >
                            {testimonials.map((testimonial) => (
                                <div
                                    key={testimonial.id}
                                    className="w-full shrink-0 px-4"
                                >
                                    <div className="bg-transparent rounded-3xl shadow-lg hover:shadow-xl transition-all duration-500 p-8 md:p-12 max-w-4xl mx-auto transform hover:-translate-y-1">
                                        {/* Content */}
                                        <div className="text-center">
                                            {/* Profile Photo */}
                                            <div className="mb-8">
                                                <img
                                                    src={testimonial.photo}
                                                    alt={testimonial.name}
                                                    className="w-20 h-20 md:w-24 md:h-24 rounded-full mx-auto object-cover shadow-lg ring-4 ring-light transition-transform duration-300 hover:scale-105"
                                                />
                                            </div>

                                            {/* Star Rating */}
                                            <div className="flex justify-center gap-12 mb-6">
                                                {renderStars(testimonial.rating)}
                                            </div>

                                            {/* Testimonial Text */}
                                            <blockquote className="text-secondary text-lg md:text-xl leading-relaxed mb-8 font-light italic max-w-3xl mx-auto">
                                                "{testimonial.text}"
                                            </blockquote>

                                            {/* Name and Profession */}
                                            <div className="space-y-1">
                                                <h3 className="text-white text-xl md:text-2xl font-medium">
                                                    {testimonial.name}
                                                </h3>
                                                <p className="text-secondary text-sm md:text-base">
                                                    {testimonial.profession}
                                                    {testimonial.location && (
                                                        <span className="text-accent"> • {testimonial.location}</span>
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Dots Indicator */}
                <div className="flex justify-center gap-2 mt-12">
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
                </div>

                {/* View More Button */}
                <div className="text-center mt-16">
                    <button className="group bg-primary hover:bg-[#7A654A] text-white px-8 py-4 rounded-full font-medium cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 hover:-translate-y-0.5">
                        <span className="flex items-center gap-2">
                            Ver Todas as Avaliações
                            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </span>
                    </button>
                </div>
            </div>
        </section>
    );
}