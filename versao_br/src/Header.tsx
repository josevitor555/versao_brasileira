// States hooks
import { useState } from 'react';

// Reract icons
import { Menu, X, Phone, Clock } from 'lucide-react';

// Framer motion animations
import { motion } from 'framer-motion';

// Images
import logo_bull5 from '/bull_5.png';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsMenuOpen(false);
        }
    };

    // Variações de animação para fade-in
    const fadeIn = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.6 } }
    };

    const staggerChildren = {
        visible: { 
            transition: { 
                staggerChildren: 0.1,
                delayChildren: 0.2
            } 
        }
    };

    return (
        <motion.header 
            className="bg-transparent text-primary shadow-none p-1 fixed top-0 left-0 right-0 z-9999 border border-primary backdrop-blur-sm mx-4 mt-4 rounded-lg"
            initial="hidden"
            animate="visible"
            variants={staggerChildren}
        >
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between py-3 flex-nowrap">
                    <motion.div className="flex items-center space-x-3 shrink-0" variants={fadeIn}>
                        <div className="w-10 h-10 rounded-full flex items-center justify-center shadow-sm">
                            <img src={logo_bull5} alt="Logo Versão Brasileira" className="w-full h-full object-contain" />
                        </div>
                        <h1 className="text-xl font-heading font-semibold text-secondary whitespace-nowrap"> Versão Brasileira </h1>
                    </motion.div>

                    <motion.nav className="hidden md:flex items-center space-x-3 lg:space-x-4 xl:space-x-5" variants={staggerChildren}>
                        <motion.button 
                            onClick={() => scrollToSection('home')} 
                            className="text-white cursor-pointer hover:text-light font-medium transition-colors hover:underline underline-offset-4 text-lg sm:text-base"
                            variants={fadeIn}
                        >
                            Início
                        </motion.button>
                        <motion.button 
                            onClick={() => scrollToSection('sobre')} 
                            className="text-white cursor-pointer hover:text-light font-medium transition-colors hover:underline underline-offset-4 text-lg sm:text-base"
                            variants={fadeIn}
                        >
                            Sobre
                        </motion.button>
                        <motion.button 
                            onClick={() => scrollToSection('cardapio')} 
                            className="text-white cursor-pointer hover:text-light font-medium transition-colors hover:underline underline-offset-4 text-lg sm:text-base"
                            variants={fadeIn}
                        >
                            Cardápio
                        </motion.button>
                        <motion.button 
                            onClick={() => scrollToSection('eventos')} 
                            className="text-white cursor-pointer hover:text-light font-medium transition-colors hover:underline underline-offset-4 text-lg sm:text-base"
                            variants={fadeIn}
                        >
                            Eventos e Shows
                        </motion.button>
                        <motion.button 
                            onClick={() => scrollToSection('galeria')} 
                            className="text-white cursor-pointer hover:text-light font-medium transition-colors hover:underline underline-offset-4 text-lg sm:text-base"
                            variants={fadeIn}
                        >
                            Galeria
                        </motion.button>
                        <motion.button 
                            onClick={() => scrollToSection('depoimentos')} 
                            className="text-white cursor-pointer hover:text-light font-medium transition-colors hover:underline underline-offset-4 text-lg sm:text-base"
                            variants={fadeIn}
                        >
                            Depoimentos
                        </motion.button>
                        <motion.button 
                            onClick={() => scrollToSection('localizacao')} 
                            className="text-white cursor-pointer hover:text-light font-medium transition-colors hover:underline underline-offset-4 text-lg sm:text-base"
                            variants={fadeIn}
                        >
                            Localização
                        </motion.button>
                        
                    </motion.nav>

                    <motion.div className="hidden lg:flex items-center font-semibold space-x-3 text-secondary" variants={staggerChildren}>
                        <motion.div className="flex items-center space-x-1" variants={fadeIn}>
                            <Phone className="w-4 h-4 text-secondary" />
                            <span className="text-sm">(86) 99548-3983</span>
                        </motion.div>
                        <motion.div className="flex items-center space-x-1" variants={fadeIn}>
                            <Clock className="w-4 h-4 text-secondary" />
                            <span className="text-sm">Seg-Sáb 17h-2h</span>
                        </motion.div>
                    </motion.div>

                    <motion.button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-primary/20 transition-colors"
                        variants={fadeIn}
                    >
                        {isMenuOpen ? <X className="w-6 h-6 text-primary" /> : <Menu className="w-6 h-6 text-primary" />}
                    </motion.button>
                </div>

                {isMenuOpen && (
                    <motion.nav 
                        className="md:hidden py-4 border-t border-primary/20 backdrop-blur-lg bg-transparent"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="flex flex-col space-y-3">
                            <button onClick={() => scrollToSection('home')} className="text-left text-white hover:text-light transition-colors py-2 font-medium hover:underline underline-offset-4 text-lg">
                                Início
                            </button>
                            <button onClick={() => scrollToSection('sobre')} className="text-left text-white hover:text-light transition-colors py-2 font-medium hover:underline underline-offset-4 text-lg">
                                Sobre
                            </button>
                            <button onClick={() => scrollToSection('cardapio')} className="text-left text-white hover:text-light transition-colors py-2 font-medium hover:underline underline-offset-4 text-lg">
                                Cardápio
                            </button>
                            <button onClick={() => scrollToSection('eventos')} className="text-left text-white hover:text-light transition-colors py-2 font-medium hover:underline underline-offset-4 text-lg">
                                Eventos e Shows
                            </button>
                            <button onClick={() => scrollToSection('galeria')} className="text-left text-white hover:text-light transition-colors py-2 font-medium hover:underline underline-offset-4 text-lg">
                                Galeria
                            </button>
                            <button onClick={() => scrollToSection('depoimentos')} className="text-left text-white hover:text-light transition-colors py-2 font-medium hover:underline underline-offset-4 text-lg">
                                Depoimentos
                            </button>
                            <button onClick={() => scrollToSection('localizacao')} className="text-left text-white hover:text-light transition-colors py-2 font-medium hover:underline underline-offset-4 text-lg">
                                Localização
                            </button>

                            <div className="pt-3 border-t border-primary/20">
                                <div className="flex items-center space-x-2 text-base text-secondary">
                                    <Phone className="w-4 h-4 text-secondary" />
                                    <span>(86) 99548-3983</span>
                                </div>
                                <div className="flex items-center space-x-2 text-base mt-2 text-secondary">
                                    <Clock className="w-4 h-4 text-secondary" />
                                    <span>Segunda a Sábado: 17h às 2h</span>
                                </div>
                            </div>
                        </div>
                    </motion.nav>
                )}
            </div>
        </motion.header>
    );
}