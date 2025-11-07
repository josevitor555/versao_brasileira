import { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

interface Testimonial {
    id: number;
    name: string;
    location?: string;
    rating: number;
    comment: string;
    date: string;
    image_url?: string;
}

// Mock data for testimonials
const mockTestimonials: Testimonial[] = [
    {
        id: 1,
        name: 'Maria Silva',
        location: 'São Gonçalo do Piauí',
        rating: 5,
        comment: 'Ambiente incrível! A comida é deliciosa e os shows ao vivo são espetaculares. Minha família adora vir aqui aos fins de semana. O atendimento é sempre muito carinhoso.',
        date: '2024-10-15',
        image_url: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
    },
    {
        id: 2,
        name: 'João Santos',
        location: 'Teresina',
        rating: 5,
        comment: 'Venho desde a inauguração em 2020 e nunca me decepcionei. A picanha na chapa é incomparável e o ambiente familiar é perfeito para trazer as crianças.',
        date: '2024-10-20',
        image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    {
        id: 3,
        name: 'Ana Costa',
        location: 'Floriano',
        rating: 5,
        comment: 'Os shows de MPB são fantásticos! Já trouxe vários amigos e todos ficaram encantados. O cardápio tem opções para todos os gostos e o preço é justo.',
        date: '2024-10-25',
        image_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    },
    {
        id: 4,
        name: 'Carlos Oliveira',
        location: 'Picos',
        rating: 5,
        comment: 'Excelente para eventos familiares! Comemoramos o aniversário da minha mãe aqui e foi perfeito. A equipe é muito atenciosa e a comida estava impecável.',
        date: '2024-11-01',
        image_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
    },
    {
        id: 5,
        name: 'Lucia Ferreira',
        location: 'São Gonçalo do Piauí',
        rating: 5,
        comment: 'Adoro a atmosfera acolhedora e a diversidade musical. É o meu lugar favorito para relaxar depois do trabalho. As caipirinhas são as melhores da região!',
        date: '2024-11-05',
        image_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face'
    },
    {
        id: 6,
        name: 'Roberto Lima',
        location: 'Uruçuí',
        rating: 5,
        comment: 'Lugar excepcional! A combinação de boa música, comida saborosa e ambiente familiar é única. Recomendo para todos que visitam a região.',
        date: '2024-11-07',
        image_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    }
];

export default function TestimonialsSection() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                // In the future, this could fetch from an API
                // const response = await fetch('/api/testimonials');
                // if (response.ok) {
                //   const data = await response.json();
                //   setTestimonials(data);
                // }

                // For now, use mock data
                setTestimonials(mockTestimonials);
            } catch (error) {
                console.error('Erro ao carregar depoimentos:', error);
                setTestimonials(mockTestimonials);
            } finally {
                setLoading(false);
            }
        };

        fetchTestimonials();
    }, []);

    const nextTestimonial = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const goToTestimonial = (index: number) => {
        setCurrentIndex(index);
    };

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                className={`w-5 h-5 ${i < rating ? 'text-secondary fill-current' : 'text-gray-300'
                    }`}
            />
        ));
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    if (loading) {
        return (
            <section className="py-20 bg-neutral-bg">
                <div className="container mx-auto px-4 text-center">
                    <div className="text-neutral-text-secondary">Carregando depoimentos...</div>
                </div>
            </section>
        );
    }

    if (testimonials.length === 0) {
        return null;
    }

    return (
        <section id="testimonials" className="py-20 bg-black">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-heading font-semibold text-secondary mb-6">
                        O Que Nossos Clientes Dizem
                    </h2>

                    <div className="flex justify-center mb-6">
                        <svg
                            width="250"
                            height="12"
                            viewBox="0 0 250 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <line x1="0" y1="6" x2="250" y2="6" stroke="#D1BB9E" strokeWidth="1" opacity="0.5" />

                            <polygon points="117,2 121,6 117,10 113,6" fill="#D1BB9E" />
                            <polygon points="123,2 127,6 123,10 119,6" fill="#D1BB9E" />
                            <polygon points="129,2 133,6 129,10 125,6" fill="#D1BB9E" />

                            <circle cx="4" cy="6" r="2" fill="#D1BB9E" />
                            <circle cx="246" cy="6" r="2" fill="#D1BB9E" />
                        </svg>
                    </div>

                    <p className="text-lg text-neutral-text-secondary max-w-2xl mx-auto">
                        Confira os depoimentos de quem já viveu momentos especiais conosco
                    </p>
                </div>

                <div className="max-w-6xl mx-auto">
                    <div className="relative p-6 border border-accent">
                        <div className="bg-neutral-section rounded-2xl p-8 md:p-12 shadow-lg">
                            <div className="flex items-start space-x-4 mb-6">
                                <Quote className="w-8 h-8 text-neutral-button-primary shrink-0 mt-1" />
                                <div className="flex-1">
                                    <div className="flex items-center space-x-4 mb-4">
                                        {testimonials[currentIndex].image_url && (
                                            <img
                                                src={testimonials[currentIndex].image_url}
                                                alt={testimonials[currentIndex].name}
                                                className="w-16 h-16 rounded-full object-cover"
                                            />
                                        )}
                                        <div>
                                            <h3 className="text-xl font-heading font-bold text-neutral-text">
                                                {testimonials[currentIndex].name}
                                            </h3>
                                            {testimonials[currentIndex].location && (
                                                <p className="text-neutral-text-secondary">
                                                    {testimonials[currentIndex].location}
                                                </p>
                                            )}
                                            <div className="flex items-center space-x-1 mt-1">
                                                {renderStars(testimonials[currentIndex].rating)}
                                            </div>
                                        </div>
                                    </div>

                                    <blockquote className="text-lg text-accent leading-relaxed mb-4 italic">
                                        "{testimonials[currentIndex].comment}"
                                    </blockquote>

                                    <p className="text-sm text-neutral-text-secondary">
                                        {formatDate(testimonials[currentIndex].date)}
                                    </p>
                                </div>
                            </div>

                            {/* Navigation Arrows */}
                            {testimonials.length > 1 && (
                                <>
                                    <button
                                        onClick={prevTestimonial}
                                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-secondary cursor-pointer shadow-lg rounded-full p-3 hover:bg-neutral-section transition-colors border border-neutral-border"
                                    >
                                        <ChevronLeft className="w-5 h-5 text-neutral-text" />
                                    </button>
                                    <button
                                        onClick={nextTestimonial}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-secondary cursor-pointer shadow-lg rounded-full p-3 hover:bg-neutral-section transition-colors border border-neutral-border"
                                    >
                                        <ChevronRight className="w-5 h-5 text-neutral-text" />
                                    </button>
                                </>
                            )}
                        </div> {/* <-- FECHA A .bg-neutral-section AQUI */}

                        {/* Pagination Dots */}
                        {testimonials.length > 1 && (
                            <div className="flex justify-center mt-8 space-x-2">
                                {testimonials.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => goToTestimonial(index)}
                                        className={`w-3 h-3 rounded-full transition-all ${index === currentIndex ? 'bg-neutral-button-primary w-8' : 'bg-neutral-border hover:bg-neutral-button'
                                            }`}
                                    />
                                ))}
                            </div>
                        )}

                        {/* Statistics */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
                            <div className="text-center p-6 bg-neutral-section rounded-lg border border-neutral-border">
                                <div className="text-3xl font-heading font-bold text-neutral-text mb-2">500+</div>
                                <p className="text-neutral-text-secondary"> Clientes Satisfeitos </p>
                            </div>
                            <div className="text-center p-6 bg-neutral-section rounded-lg border border-neutral-border">
                                <div className="text-3xl font-heading font-bold text-neutral-text mb-2">4.9</div>
                                <div className="flex justify-center space-x-1 mb-2">{renderStars(5)}</div>
                                <p className="text-neutral-text-secondary"> Avaliação Média </p>
                            </div>
                            <div className="text-center p-6 bg-neutral-section rounded-lg border border-neutral-border">
                                <div className="text-3xl font-heading font-bold text-neutral-text mb-2">4</div>
                                <p className="text-neutral-text-secondary"> Anos de Tradição </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
