// Hooks States
import { useState, useEffect } from 'react';

// Icons
import { Calendar, Clock, MessageCircle, MapPin } from 'lucide-react';

// Fallback components
import ImageWithFallback from './ImageWithFallback';

interface Event {
    id: number;
    title: string;
    description: string | null;
    event_date: string;
    event_time: string | null;
    price: number | null;
    image_url: string | null;
    whatsapp_message: string | null;
    is_active: boolean;
}

export default function EventsSection() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('/api/events');
                if (response.ok) {
                    const data = await response.json();
                    setEvents(data.filter((event: Event) => event.is_active));
                }
            } catch (error) {
                console.error('Erro ao carregar eventos:', error);
                // Mock data for development
                const mockEvents = [
                    {
                        id: 1,
                        title: 'Show de MPB - João Silva',
                        description: 'Uma noite especial com os grandes clássicos da MPB brasileira',
                        event_date: '2024-12-15',
                        event_time: '20:00',
                        price: 25.00,
                        image_url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=600&h=400',
                        whatsapp_message: 'Gostaria de reservar para o Show de MPB do João Silva no dia 15/12',
                        is_active: true
                    },
                    {
                        id: 2,
                        title: 'Noite de Samba',
                        description: 'Roda de samba com os melhores sambistas da região',
                        event_date: '2024-12-22',
                        event_time: '19:30',
                        price: null,
                        image_url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=600&h=400',
                        whatsapp_message: 'Gostaria de fazer uma reserva para a Noite de Samba no dia 22/12',
                        is_active: true
                    },
                    {
                        id: 3,
                        title: 'Festa de Fim de Ano',
                        description: 'Celebre a virada do ano conosco! Música, comida e muita alegria',
                        event_date: '2024-12-31',
                        event_time: '21:00',
                        price: 80.00,
                        image_url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=600&h=400',
                        whatsapp_message: 'Gostaria de reservar para a Festa de Fim de Ano',
                        is_active: true
                    }
                ];
                setEvents(mockEvents);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString + 'T00:00:00');
        return date.toLocaleDateString('pt-BR', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    const formatTime = (timeString: string | null) => {
        if (!timeString) return '';
        return timeString.slice(0, 5);
    };

    const reserveWhatsApp = (event: Event) => {
        const phoneNumber = '5586995483983';
        const message = event.whatsapp_message || `Gostaria de fazer uma reserva para o evento: ${event.title}`;
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    if (loading) {
        return (
            <section id="events" className="py-20 bg-neutral-section">
                <div className="container mx-auto px-4 text-center">
                    <div className="text-neutral-text-secondary">Carregando eventos...</div>
                </div>
            </section>
        );
    }

    return (
        <section id="events" className="py-20 bg-black">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-heading font-semibold text-secondary mb-3">
                        Shows e Eventos
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

                    <p className="text-lg text-neutral-text-secondary max-w-2xl mx-auto">
                        Confira nossa agenda de apresentações e eventos especiais
                    </p>
                </div>

                <div className="grid gap-8 max-w-4xl mx-auto">
                    {events.length > 0 ? (
                        events.map((event) => (
                            <div key={event.id} className="bg-neutral-bg rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                                <div className="md:flex">
                                    {event.image_url && (
                                        <div className="md:w-1/3">
                                            <ImageWithFallback
                                                src={event.image_url}
                                                alt={event.title}
                                                className="w-full h-40 md:h-56 object-cover"
                                                fallbackClassName="w-full h-40 md:h-56"
                                                placeholder="Foto do evento"
                                            />

                                        </div>
                                    )}
                                    <div className={`p-6 ${event.image_url ? 'md:w-2/3' : 'w-full'}`}>
                                        <h3 className="text-2xl font-heading font-semibold text-secondary mb-3">
                                            {event.title}
                                        </h3>

                                        <div className="flex flex-wrap gap-4 mb-4 text-neutral-text-secondary">
                                            <div className="flex items-center space-x-2">
                                                <Calendar className="w-4 h-4 text-neutral-button" />
                                                <span className="font-medium">{formatDate(event.event_date)}</span>
                                            </div>
                                            {event.event_time && (
                                                <div className="flex items-center space-x-2">
                                                    <Clock className="w-4 h-4 text-neutral-button" />
                                                    <span className="font-medium">{formatTime(event.event_time)}</span>
                                                </div>
                                            )}
                                            {event.price && (
                                                <div className="flex items-center space-x-2">
                                                    <MapPin className="w-4 h-4 text-neutral-button" />
                                                    <span className="font-medium">R$ {event.price.toFixed(2)}</span>
                                                </div>
                                            )}
                                        </div>

                                        {event.description && (
                                            <p className="text-neutral-text-secondary mb-6 leading-relaxed">
                                                {event.description}
                                            </p>
                                        )}

                                        <button
                                            onClick={() => reserveWhatsApp(event)}
                                            className="inline-flex items-center space-x-2 bg-secondary hover:bg-neutral-button-primary-hover text-black px-6 py-2 cursor-pointer rounded-full font-semibold transition-colors"
                                        >
                                            <MessageCircle className="w-5 h-5" />
                                            <span> Reserve pelo WhatsApp </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-neutral-text-secondary py-12 bg-neutral-bg rounded-lg border border-neutral-border">
                            <Calendar className="w-12 h-12 text-neutral-button mx-auto mb-4" />
                            <h3 className="text-xl font-heading font-semibold text-neutral-text mb-2">
                                Novos eventos em breve
                            </h3>
                            <p> Estamos preparando uma programação especial. Fique ligado! </p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}