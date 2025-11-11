import { MessageCircle, Calendar, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import logo_bull5 from '/bull_5.png';

interface MenuItem {
    id: number;
    name: string;
    price: number;
}

interface Event {
    id: number;
    title: string;
    event_date: string;
    event_time: string | null;
}

export default function Footer() {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    const cardItem = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    const menuItems: MenuItem[] = [
        { id: 1, name: 'Caipirinha da Casa', price: 18.00 },
        { id: 2, name: 'Picanha na Chapa', price: 65.00 },
        { id: 3, name: 'Salada Caesar', price: 28.00 },
        { id: 4, name: 'Brownie com Sorvete', price: 20.00 }
    ];

    const events: Event[] = [
        { id: 1, title: 'Show de MPB - João Silva', event_date: '2024-12-15', event_time: '20:00' },
        { id: 2, title: 'Noite de Samba', event_date: '2024-12-22', event_time: '19:30' },
        { id: 3, title: 'Festa de Fim de Ano', event_date: '2024-12-31', event_time: '21:00' }
    ];

    const formatDate = (dateString: string) => {
        const date = new Date(dateString + 'T00:00:00');
        return date.toLocaleDateString('pt-BR', {
            day: 'numeric',
            month: 'short'
        });
    };

    const formatTime = (timeString: string | null) => {
        if (!timeString) return '';
        return timeString.slice(0, 5);
    };

    const orderWhatsApp = (itemName: string) => {
        const phoneNumber = '9999999999999';
        const message = `Olá! Gostaria de pedir: ${itemName}`;
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    const reserveWhatsApp = (eventTitle: string) => {
        const phoneNumber = '9999999999999';
        const message = `Olá! Gostaria de reservar para o evento: ${eventTitle}`;
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    return (
        <footer className="bg-[#181818] text-white py-12 border-t border-secondary/20">
            <div className="container mx-auto px-4">
                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={container}
                >
                    <motion.div 
                        className="flex flex-col items-start"
                        variants={item}
                    >
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="w-12 h-12 rounded-full flex items-center justify-center">
                                <img 
                                    src={logo_bull5} 
                                    alt="Logo Versão Brasileira" 
                                    className="w-full h-full object-contain"
                                    loading="eager"
                                    decoding="async"
                                />
                            </div>
                            <h2 className="text-2xl font-heading font-semibold text-secondary">Versão Brasileira</h2>
                        </div>
                        <p className="text-neutral-text-secondary mb-4 max-w-xs">
                            O melhor da gastronomia e entretenimento brasileiro em um só lugar.
                        </p>
                        <motion.div 
                            className="flex space-x-4"
                            variants={item}
                        >
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="bg-secondary text-black p-3 rounded-full"
                                onClick={() => {
                                    const phoneNumber = '9999999999999';
                                    const message = 'Olá! Gostaria de mais informações sobre o Versão Brasileira.';
                                    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
                                    window.open(url, '_blank');
                                }}
                                variants={cardItem}
                            >
                                <MessageCircle className="w-5 h-5" />
                            </motion.button>
                        </motion.div>
                    </motion.div>

                    <motion.div variants={item}>
                        <motion.h3 
                            className="text-xl font-heading font-semibold text-secondary mb-4 flex items-center"
                            variants={item}
                        >
                            <Calendar className="w-5 h-5 mr-2" />
                            Próximos Eventos
                        </motion.h3>
                        <div className="space-y-3">
                            {events.map((event) => (
                                <motion.div
                                    key={event.id}
                                    className="bg-neutral-section p-3 rounded-lg cursor-pointer hover:bg-neutral-border transition-colors"
                                    whileHover={{ x: 5 }}
                                    onClick={() => reserveWhatsApp(event.title)}
                                    variants={cardItem}
                                    initial="hidden"
                                    whileInView="show"
                                    viewport={{ once: true, amount: 0.1 }}
                                >
                                    <h4 className="font-medium text-white">{event.title}</h4>
                                    <div className="flex items-center text-sm text-neutral-text-secondary mt-1">
                                        <Calendar className="w-4 h-4 mr-1" />
                                        <span>{formatDate(event.event_date)}</span>
                                        {event.event_time && (
                                            <>
                                                <span className="mx-2">•</span>
                                                <MapPin className="w-4 h-4 mr-1" />
                                                <span>{formatTime(event.event_time)}</span>
                                            </>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div variants={item}>
                        <motion.h3 
                            className="text-xl font-heading font-semibold text-secondary mb-4"
                            variants={item}
                        >
                            Destaques do Cardápio
                        </motion.h3>
                        <div className="space-y-3">
                            {menuItems.map((item) => (
                                <motion.div
                                    key={item.id}
                                    className="bg-neutral-section p-3 rounded-lg cursor-pointer hover:bg-neutral-border transition-colors flex justify-between items-center"
                                    whileHover={{ x: 5 }}
                                    onClick={() => orderWhatsApp(item.name)}
                                    variants={cardItem}
                                    initial="hidden"
                                    whileInView="show"
                                    viewport={{ once: true, amount: 0.1 }}
                                >
                                    <div>
                                        <h4 className="font-medium text-white">{item.name}</h4>
                                        <p className="text-sm text-secondary">R$ {item.price.toFixed(2)}</p>
                                    </div>
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="bg-secondary text-black p-2 rounded-full"
                                    >
                                        <MessageCircle className="w-4 h-4" />
                                    </motion.button>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>

                <motion.div 
                    className="border-t border-secondary/20 mt-10 pt-6 text-center text-neutral-text-secondary"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={item}
                >
                    <p>© {new Date().getFullYear()} Versão Brasileira. Todos os direitos reservados.</p>
                </motion.div>
            </div>
        </footer>
    );
}