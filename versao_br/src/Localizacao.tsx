import { useEffect } from 'react';
import { MapPin, Phone, Clock, MessageCircle, Instagram, Facebook } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContactSection() {
    useEffect(() => {
        // Any additional initialization can go here if needed
    }, []);

    const openWhatsApp = () => {
        const phoneNumber = '5586995483983';
        const message = 'Olá! Gostaria de mais informações sobre a Versão Brasileira.';
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    const contactInfo = [
        {
            icon: <Phone className="w-5 h-5 text-neutral-button" />,
            title: 'Telefone',
            content: '(86) 99548-3983',
            action: () => window.open('tel:+5586995483983')
        },
        {
            icon: <Instagram className="w-5 h-5 text-neutral-button" />,
            title: 'Instagram',
            content: '@versaobrasileira2020',
            action: () => window.open('https://www.instagram.com/versaobrasileira2020/?igshid=3tfzcid0x091')
        },
        {
            icon: <MapPin className="w-5 h-5 text-neutral-button" />,
            title: 'Endereço',
            content: 'São Gonçalo do Piauí - PI',
            action: () => window.open('https://www.google.com/maps/place/Vers%C3%A3o+Brasileira/@-6.0039484,-42.7057247,17z')
        },
        {
            icon: <Clock className="w-5 h-5 text-neutral-button" />,
            title: 'Horário de Funcionamento',
            content: 'Segunda a Sábado: 17h às 2h',
            action: null
        }
    ];

    const socialLinks = [
        {
            icon: <Instagram className="w-5 h-5" />,
            name: 'Instagram',
            url: 'https://www.instagram.com/versaobrasileira2020/?igshid=3tfzcid0x091',
            // color: 'hover:text-pink-600'
        },
        {
            icon: <Facebook className="w-5 h-5" />,
            name: 'Facebook',
            url: 'https://facebook.com/versaobrasileira',
            // color: 'hover:text-blue-600'
        }
    ];

    // Google Maps embed URL
    const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.019547329454!2d-42.70810662522749!3d-6.003618693974443!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7c168184ff92959%3A0x7e3523c7f3d0d8d5!2sVers%C3%A3o%20Brasileira!5e0!3m2!1spt-BR!2sbr!4v1708472897892!5m2!1spt-BR!2sbr";

    return (
        <section id="localizacao" className="py-20 bg-black">
            <div className="container mx-auto px-4">
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl md:text-4xl font-heading font-semibold text-secondary mb-4">
                        Contato e Localização
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

                    <motion.p
                        className="text-lg text-neutral-text-secondary max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Entre em contato conosco ou venha nos visitar. Estamos sempre prontos para recebê-lo!
                    </motion.p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-24 max-w-6xl mx-auto">
                    {/* Contact Information */}
                    <motion.div
                        className="space-y-8"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.1 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <div className="grid gap-6">
                            {contactInfo.map((info, index) => (
                                <motion.div
                                    key={index}
                                    className={`flex items-start space-x-4 p-4 bg-neutral-section rounded-lg ${info.action ? 'cursor-pointer hover:bg-neutral-border transition-colors' : ''
                                        }`}
                                    onClick={info.action || undefined}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.1 }}
                                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                                >
                                    <div className="shrink-0">
                                        {info.icon}
                                    </div>
                                    <div>
                                        <h3 className="font-heading font-semibold text-neutral-text mb-1">
                                            {info.title}
                                        </h3>
                                        <p className="text-neutral-text-secondary">
                                            {info.content}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Quick Contact Button */}
                        <motion.div
                            className="bg-neutral-section p-6 rounded-lg text-start"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.1 }}
                            transition={{ duration: 0.5, delay: 0.7 }}
                        >
                            <h3 className="text-xl font-heading font-semibold text-neutral-text mb-4">
                                Contato Rápido
                            </h3>
                            <button
                                onClick={openWhatsApp}
                                className="inline-flex items-center space-x-2 bg-secondary text-black cursor-pointer px-6 py-3 rounded-lg font-bold transition-colors w-full justify-center"
                            >
                                <MessageCircle className="w-5 h-5" />
                                <span> Fale Conosco pelo WhatsApp </span>
                            </button>
                        </motion.div>

                        {/* Social Media */}
                        <motion.div
                            className="bg-neutral-section p-6 rounded-lg"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.1 }}
                            transition={{ duration: 0.5, delay: 0.8 }}
                        >
                            <h3 className="text-xl font-heading font-semibold text-neutral-text mb-4 text-center">
                                Redes Sociais
                            </h3>
                            <div className="flex justify-center space-x-6">
                                {socialLinks.map((social, index) => (
                                    <motion.a
                                        key={index}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`flex items-center space-x-2 text-neutral-text-light transition-colors`}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true, amount: 0.1 }}
                                        transition={{ duration: 0.3, delay: 0.9 + index * 0.1 }}
                                    >
                                        {social.icon}
                                        <span className="font-medium">{social.name}</span>
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Map */}
                    <motion.iframe
                        src={mapEmbedUrl}
                        width="600"
                        height="450"
                        style={{ border: 0, width: "100%", height: "100%" }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Localização da Versão Brasileira"
                        className="rounded-lg h-[300px] sm:h-[400px] md:h-[500px]"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                    </motion.iframe>

                </div>
            </div>
        </section>
    );
}