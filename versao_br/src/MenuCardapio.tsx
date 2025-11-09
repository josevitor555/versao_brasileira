// Hooks states
import { useState, useEffect } from 'react';

// Icons
import { MessageCircle } from 'lucide-react';

// Framer Motion
import { motion, AnimatePresence } from 'framer-motion';

// Images
import bull_logo from '/bull_5.png';

// Componente ImageWithFallback
const ImageWithFallback = ({
    src,
    alt,
    className = ''
}: {
    src: string;
    alt: string;
    className?: string;
}) => {
    const [imageError, setImageError] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    return imageError ? (
        <div className={`flex items-center justify-center bg-neutral-700 ${className}`}>
            <div className="text-center flex flex-col items-center justify-center w-full h-full p-2">
                <img width="80" height="80" src={bull_logo} alt="Imagem não disponível" className="mx-auto" />
                <p className="text-sm md:text-base text-neutral-400 mt-2"> Imagem indisponível </p>
            </div>
        </div>
    ) : (
        <img
            src={src}
            alt={alt}
            className={className}
            onError={() => setImageError(true)}
            onLoad={() => setImageLoaded(true)}
            style={{ display: imageLoaded ? 'block' : 'none' }}
        />
    );
};

interface MenuItem {
    id: number;
    category_id: number;
    name: string;
    description: string | null;
    price: number;
    is_available: boolean;
    image_url: string | null;
}

interface MenuCategory {
    id: number;
    name: string;
    display_order: number;
}

export default function MenuSection() {
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [categories, setCategories] = useState<MenuCategory[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);

    // Variações de animação para fade-in
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

    // const cardItem = {
    //     hidden: { opacity: 0, y: 30 },
    //     show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    // };

    useEffect(() => {
        // Mock data for development        
        const mockCategories = [
            { id: 1, name: 'Bebidas', display_order: 1 },
            { id: 2, name: 'Saladas', display_order: 2 },
            { id: 3, name: 'Pratos Principais', display_order: 3 },
            { id: 4, name: 'Lanches', display_order: 4 },
            { id: 5, name: 'Sobremesas', display_order: 5 }
        ];

        const mockItems = [
            // Bebidas (category_id: 1)
            { id: 1, category_id: 1, name: 'Caipirinha da Casa', description: 'Tradicional com cachaça artesanal e frutas frescas', price: 18.00, is_available: true, image_url: null },
            { id: 2, category_id: 1, name: 'Cerveja Artesanal', description: 'Seleção de cervejas locais', price: 12.00, is_available: true, image_url: null },
            { id: 7, category_id: 1, name: 'Suco Natural', description: 'Sabores variados de frutas frescas', price: 10.00, is_available: true, image_url: null },
            { id: 8, category_id: 1, name: 'Refrigerante', description: 'Coca-Cola, Guaraná, Fanta', price: 6.00, is_available: true, image_url: null },

            // Saladas (category_id: 2)
            { id: 3, category_id: 2, name: 'Salada Caesar', description: 'Alface romana, croutons, parmesão e molho caesar', price: 28.00, is_available: true, image_url: null },
            { id: 15, category_id: 2, name: 'Salada Tropical', description: 'Mix de folhas, manga, abacaxi e molho especial', price: 25.00, is_available: true, image_url: null },
            { id: 16, category_id: 2, name: 'Salada Mediterrânea', description: 'Rúcula, tomate seco, azeitonas e queijo feta', price: 30.00, is_available: true, image_url: null },
            { id: 17, category_id: 2, name: 'Salada Fitness', description: 'Alface, pepino, cenoura ralada e molho low carb', price: 22.00, is_available: true, image_url: null },

            // Pratos Principais (category_id: 3)
            { id: 4, category_id: 3, name: 'Picanha na Chapa', description: 'Picanha grelhada com acompanhamentos', price: 65.00, is_available: true, image_url: null },
            { id: 20, category_id: 3, name: 'Filé Mignon', description: 'Filé mignon grelhado com purê de batata', price: 75.00, is_available: true, image_url: null },
            { id: 21, category_id: 3, name: 'Frango à Parmegiana', description: 'Filé de frango empanado com molho e queijo', price: 42.00, is_available: true, image_url: null },
            { id: 22, category_id: 3, name: 'Peixe ao Molho', description: 'Filé de peixe grelhado com molho especial', price: 55.00, is_available: true, image_url: null },

            // Lanches (category_id: 4)
            { id: 5, category_id: 4, name: 'Sanduíche da Casa', description: 'Pão artesanal, carne desfiada e queijo coalho', price: 32.00, is_available: true, image_url: null },
            { id: 27, category_id: 4, name: 'Hambúrguer Artesanal', description: 'Hambúrguer bovino com queijo e acompanhamentos', price: 28.00, is_available: true, image_url: null },
            { id: 28, category_id: 4, name: 'X-Burger Especial', description: 'Pão, hambúrguer, queijo, bacon e ovo', price: 35.00, is_available: true, image_url: null },
            { id: 29, category_id: 4, name: 'Misto Quente', description: 'Pão, presunto, queijo e maionese', price: 15.00, is_available: true, image_url: null },

            // Sobremesas (category_id: 5)
            { id: 6, category_id: 5, name: 'Pudim de Leite', description: 'Receita tradicional da casa', price: 15.00, is_available: true, image_url: null },
            { id: 36, category_id: 5, name: 'Torta de Limão', description: 'Torta gelada de limão siciliano', price: 18.00, is_available: true, image_url: null },
            { id: 37, category_id: 5, name: 'Brownie', description: 'Brownie quente com sorvete', price: 20.00, is_available: true, image_url: null },
            { id: 38, category_id: 5, name: 'Mousse de Maracujá', description: 'Mousse leve e refrescante', price: 16.00, is_available: true, image_url: null },
        ];

        setCategories(mockCategories);
        setMenuItems(mockItems);
        setLoading(false);
    }, []);

    const orderWhatsApp = (itemName: string, price: number) => {
        const phoneNumber = '5586995483983';
        const message = `Olá! Gostaria de fazer um pedido:

${itemName} - R$ ${price.toFixed(2)}

Por favor, confirmem a disponibilidade.`;
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    if (loading) {
        return (
            <section id="menu" className="py-20 bg-neutral-bg">
                <div className="container mx-auto px-4 text-center">
                    <div className="text-neutral-text-secondary">Carregando cardápio...</div>
                </div>
            </section>
        );
    }

    return (
        <section id="cardapio" className="py-16 md:py-20 bg-[#181818]">
            <div className="container mx-auto px-4">
                <motion.div 
                    className="text-center mb-12"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={container}
                >
                    <motion.h2 
                        className="text-4xl md:text-5xl font-heading font-bold text-secondary mb-2"
                        variants={item}
                    >
                        Cardápio Da Casa
                    </motion.h2>
                    <motion.div className="flex justify-center mb-6" variants={item}>
                        <svg
                            width="100%"
                            height="12"
                            viewBox="0 0 200 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="max-w-[200px] mx-auto"
                        >
                            <line x1="0" y1="6" x2="200" y2="6" stroke="#D1BB9E" stroke-width="1" opacity="0.5" />

                            <polygon points="92,2 96,6 92,10 88,6" fill="#D1BB9E" />
                            <polygon points="100,2 104,6 100,10 96,6" fill="#D1BB9E" />
                            <polygon points="108,2 112,6 108,10 104,6" fill="#D1BB9E" />

                            <circle cx="4" cy="6" r="2" fill="#D1BB9E" />
                            <circle cx="196" cy="6" r="2" fill="#D1BB9E" />
                        </svg>
                    </motion.div>

                    <motion.p 
                        className="text-lg md:text-xl text-neutral-text-secondary max-w-2xl mx-auto mb-8 px-4"
                        variants={item}
                    >
                        Confira nossas especialidades e faça seu pedido
                    </motion.p>

                    {categories.length > 0 && (
                        <motion.div 
                            className="flex flex-wrap justify-center gap-2 mb-4"
                            variants={item}
                        >
                            <motion.button
                                onClick={() => setSelectedCategory(null)}
                                className={`px-4 py-2.5 text-base cursor-pointer font-medium transition-colors ${selectedCategory === null
                                    ? 'bg-secondary text-black'
                                    : 'bg-neutral-section text-neutral-text-secondary hover:bg-neutral-border'
                                    }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Todos
                            </motion.button>
                            {categories.map((category) => (
                                <motion.button
                                    key={category.id}
                                    onClick={() => setSelectedCategory(category.id)}
                                    className={`px-4 py-2.5 text-base cursor-pointer font-medium transition-colors ${selectedCategory === category.id
                                        ? 'bg-secondary text-black'
                                        : 'bg-neutral-section text-neutral-text-secondary hover:bg-neutral-border'
                                        }`}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {category.name}
                                </motion.button>
                            ))}
                        </motion.div>
                    )}
                </motion.div>

                <motion.div 
                    className="flex flex-wrap justify-center gap-3 mb-12 md:mb-14"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={container}
                >
                    <motion.button
                        onClick={() => {
                            const phoneNumber = '5586995483983';
                            const message = 'Olá! Gostaria de ver o cardápio completo e fazer um pedido.';
                            const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
                            window.open(url, '_blank');
                        }}
                        className="inline-flex items-center space-x-2 bg-secondary text-black px-5 py-2.5 cursor-pointer rounded-full font-medium transition-colors text-base"
                        variants={item}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <MessageCircle className="w-4 h-4" />
                        <span className="text-sm md:text-base"> Cardápio Completo </span>
                    </motion.button>
                    <motion.button
                        onClick={() => {
                            const phoneNumber = '5586995483983';
                            const message = 'Olá! Gostaria de fazer uma reserva para hoje.';
                            const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
                            window.open(url, '_blank');
                        }}
                        className="inline-flex items-center space-x-2 bg-secondary text-black px-5 py-2.5 cursor-pointer rounded-full font-medium transition-colors text-base"
                        variants={item}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <MessageCircle className="w-4 h-4" />
                        <span className="text-sm md:text-base"> Fazer Reserva </span>
                    </motion.button>
                    <motion.button
                        onClick={() => {
                            const phoneNumber = '5586995483983';
                            const message = 'Olá! Gostaria de saber sobre os pratos do dia.';
                            const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
                            window.open(url, '_blank');
                        }}
                        className="inline-flex items-center space-x-2 bg-secondary text-black px-5 py-2.5 cursor-pointer rounded-full font-medium transition-colors text-base"
                        variants={item}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <MessageCircle className="w-4 h-4" />
                        <span className="text-sm md:text-base"> Pratos do Dia </span>
                    </motion.button>
                </motion.div>

                <AnimatePresence mode="wait">
                    <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6 max-w-7xl mx-auto justify-items-start">
                        {menuItems
                            .filter(
                                (item) =>
                                    item.is_available &&
                                    (selectedCategory === null || item.category_id === selectedCategory)
                            )
                            .map((item, _index, filteredItems) => {
                                const sameCategoryItems = filteredItems.filter(i => i.category_id === item.category_id);
                                const categoryIndex = sameCategoryItems.findIndex(i => i.id === item.id);

                                const categoryImages: Record<number, string[]> = {
                                    1: [ // Bebidas
                                        'https://images.unsplash.com/photo-1606755962773-0c9b4a4d1b9d?auto=format&fit=crop&q=80&w=600&h=800',
                                        'https://images.unsplash.com/photo-1592277705477-692b095b98ea?auto=format&fit=crop&q=80&w=600&h=800',
                                        'https://images.unsplash.com/photo-1581254227460-3ff6b38c5a5a?auto=format&fit=crop&q=80&w=600&h=800',
                                        'https://images.unsplash.com/photo-1592277705477-692b095b98ea?auto=format&fit=crop&q=80&w=600&h=800',
                                    ],
                                    2: [ // Saladas
                                        'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=600&h=800',
                                        'https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&q=80&w=600&h=800',
                                        'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=600&h=800',
                                        'https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&q=80&w=600&h=800',
                                    ],
                                    3: [ // Pratos Principais
                                        'https://images.unsplash.com/photo-1601050690597-6c43d9b8c38c?auto=format&fit=crop&q=80&w=600&h=800',
                                        'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=600&h=800',
                                        'https://images.unsplash.com/photo-1601050690597-6c43d9b8c38c?auto=format&fit=crop&q=80&w=600&h=800',
                                        'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=600&h=800',
                                    ],
                                    4: [ // Lanches
                                        'https://images.unsplash.com/photo-1605475128023-439a15189b5b?auto=format&fit=crop&q=80&w=600&h=800',
                                        'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=600&h=800',
                                        'https://images.unsplash.com/photo-1605475128023-439a15189b5b?auto=format&fit=crop&q=80&w=600&h=800',
                                        'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=600&h=800',
                                    ],
                                    5: [ // Sobremesas
                                        'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=600&h=800',
                                        'https://images.unsplash.com/photo-1606755962773-0c9b4a4d1b9d?auto=format&fit=crop&q=80&w=600&h=800',
                                        'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=600&h=800',
                                        'https://images.unsplash.com/photo-1606755962773-0c9b4a4d1b9d?auto=format&fit=crop&q=80&w=600&h=800',
                                    ]
                                };

                                const imgUrl = item.image_url || categoryImages[item.category_id][categoryIndex % categoryImages[item.category_id].length];

                                return (
                                    <motion.div
                                        key={`${item.id}-${selectedCategory}`}
                                        className="flex flex-col items-start justify-start bg-transparent overflow-hidden transition-all duration-300 w-full hover:opacity-90"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.3 }}
                                        layout
                                    >
                                        {/* Imagem vertical */}
                                        <div className="relative w-full aspect-3/4 bg-neutral-800 overflow-hidden">
                                            <ImageWithFallback
                                                src={imgUrl}
                                                alt={item.name}
                                                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                            />

                                            <div className="absolute top-2 right-2 bg-secondary text-neutral-700 font-semibold px-2.5 py-1 rounded-full text-sm shadow-sm">
                                                R$ {item.price.toFixed(2)}
                                            </div>
                                        </div>

                                        <div className="flex flex-col items-start text-left p-3 w-full">
                                            <h3 className="text-lg font-medium text-secondary mt-2">
                                                {item.name}
                                            </h3>
                                            {item.description && (
                                                <p className="text-sm md:text-base text-white/80 mt-2 line-clamp-2">
                                                    {item.description}
                                                </p>
                                            )}

                                            <button
                                                onClick={() => orderWhatsApp(item.name, item.price)}
                                                className="mt-3 inline-flex items-center justify-center space-x-2 bg-transparent w-full border border-secondary text-secondary hover:bg-secondary hover:text-black cursor-pointer px-3 py-2 rounded-full text-lg font-medium transition-colors"
                                            >
                                                <MessageCircle className="w-3 h-3" />
                                                <span> Pedir </span>
                                            </button>
                                        </div>
                                    </motion.div>
                                );
                            })}
                    </div>
                </AnimatePresence>
            </div>
        </section>
    );
}