import { useState } from 'react';
import { Menu, X, Phone, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

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
            className="bg-background/90 text-primary shadow-none fixed top-0 left-0 w-full z-[9999] border-b border-primary/20 backdrop-blur-sm"
            initial="hidden"
            animate="visible"
            variants={staggerChildren}
        >
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between py-4">
                    <motion.div className="flex items-center space-x-3" variants={fadeIn}>
                        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-sm">
                            <span className="text-background font-bold text-sm"> VB </span>
                        </div>
                        <h1 className="text-2xl font-heading font-semibo text-primary"> Versão Brasileira </h1>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <motion.nav className="hidden md:flex items-center space-x-8" variants={staggerChildren}>
                        <motion.button 
                            onClick={() => scrollToSection('home')} 
                            className="text-white cursor-pointer hover:text-light font-medium transition-colors hover:underline underline-offset-4"
                            variants={fadeIn}
                        >
                            Início
                        </motion.button>
                        <motion.button 
                            onClick={() => scrollToSection('about')} 
                            className="text-white cursor-pointer hover:text-light font-medium transition-colors hover:underline underline-offset-4"
                            variants={fadeIn}
                        >
                            Sobre
                        </motion.button>
                        <motion.button 
                            onClick={() => scrollToSection('gallery')} 
                            className="text-white cursor-pointer hover:text-light font-medium transition-colors hover:underline underline-offset-4"
                            variants={fadeIn}
                        >
                            Galeria
                        </motion.button>
                        <motion.button 
                            onClick={() => scrollToSection('menu')} 
                            className="text-white cursor-pointer hover:text-light font-medium transition-colors hover:underline underline-offset-4"
                            variants={fadeIn}
                        >
                            Cardápio
                        </motion.button>
                        <motion.button 
                            onClick={() => scrollToSection('events')} 
                            className="text-white cursor-pointer hover:text-light font-medium transition-colors hover:underline underline-offset-4"
                            variants={fadeIn}
                        >
                            Shows
                        </motion.button>
                        <motion.button 
                            onClick={() => scrollToSection('contact')} 
                            className="text-white cursor-pointer hover:text-light font-medium transition-colors hover:underline underline-offset-4"
                            variants={fadeIn}
                        >
                            Contato
                        </motion.button>
                    </motion.nav>

                    {/* Quick Contact Info */}
                    <motion.div className="hidden lg:flex items-center space-x-4 text-lg text-primary" variants={staggerChildren}>
                        <motion.div className="flex items-center space-x-1" variants={fadeIn}>
                            <Phone className="w-4 h-4 text-secondary" />
                            <span>(86) 99548-3983</span>
                        </motion.div>
                        <motion.div className="flex items-center space-x-1" variants={fadeIn}>
                            <Clock className="w-4 h-4 text-secondary" />
                            <span>Seg-Sáb 17h-2h</span>
                        </motion.div>
                    </motion.div>

                    {/* Mobile Menu Button */}
                    <motion.button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-primary/20 transition-colors"
                        variants={fadeIn}
                    >
                        {isMenuOpen ? <X className="w-6 h-6 text-primary" /> : <Menu className="w-6 h-6 text-primary" />}
                    </motion.button>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <motion.nav 
                        className="md:hidden py-4 border-t border-primary/20 backdrop-blur-lg bg-background/90"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="flex flex-col space-y-3">
                            <button onClick={() => scrollToSection('home')} className="text-left text-white hover:text-light transition-colors py-2 font-medium hover:underline underline-offset-4">
                                Início
                            </button>
                            <button onClick={() => scrollToSection('about')} className="text-left text-white hover:text-light transition-colors py-2 font-medium hover:underline underline-offset-4">
                                Sobre
                            </button>
                            <button onClick={() => scrollToSection('gallery')} className="text-left text-white hover:text-light transition-colors py-2 font-medium hover:underline underline-offset-4">
                                Galeria
                            </button>
                            <button onClick={() => scrollToSection('menu')} className="text-left text-white hover:text-light transition-colors py-2 font-medium hover:underline underline-offset-4">
                                Cardápio
                            </button>
                            <button onClick={() => scrollToSection('events')} className="text-left text-white hover:text-light transition-colors py-2 font-medium hover:underline underline-offset-4">
                                Shows
                            </button>
                            <button onClick={() => scrollToSection('contact')} className="text-left text-white hover:text-light transition-colors py-2 font-medium hover:underline underline-offset-4">
                                Contato
                            </button>

                            {/*  */}
                            <div className="pt-3 border-t border-primary/20">
                                <div className="flex items-center space-x-2 text-sm text-primary">
                                    <Phone className="w-4 h-4 text-secondary" />
                                    <span>(86) 99548-3983</span>
                                </div>
                                <div className="flex items-center space-x-2 text-sm mt-2 text-primary">
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