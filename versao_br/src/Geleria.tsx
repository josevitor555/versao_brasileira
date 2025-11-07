import { useState } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ImageWithFallback from './ImageWithFallback';

// Definir o tipo para as imagens
interface GalleryImage {
    url: string;
    alt: string;
}

const galleryCategories = [
    {
        id: 'ambiente',
        name: 'Ambiente',
        images: [
            {
                url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop',
                alt: 'Ambiente interno aconchegante'
            },
            {
                url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop',
                alt: 'Área externa com mesas'
            },
            {
                url: 'https://images.unsplash.com/photo-1559329007-40df8ec9a10d?w=800&h=600&fit=crop',
                alt: 'Vista geral do restaurante'
            },
            {
                url: 'https://images.unsplash.com/photo-1552566090-a8c5b65b45aa?w=800&h=600&fit=crop',
                alt: 'Decoração interna'
            },
            {
                url: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg',
                alt: 'Ambiente 1'
            },
            {
                url: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg',
                alt: 'Ambiente 2'
            },
            {
                url: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg',
                alt: 'Ambiente 3'
            }
        ]
    },
    {
        id: 'eventos',
        name: 'Eventos',
        images: [
            {
                url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop',
                alt: 'Show ao vivo no palco'
            },
            {
                url: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&h=600&fit=crop',
                alt: 'Banda se apresentando'
            },
            {
                url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop',
                alt: 'Público assistindo show'
            },
            {
                url: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=800&h=600&fit=crop',
                alt: 'Evento especial'
            },
            {
                url: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg',
                alt: 'Evento 1'
            },
            {
                url: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-4.jpg',
                alt: 'Evento 2'
            },
            {
                url: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-5.jpg',
                alt: 'Evento 3'
            }
        ]
    },
    {
        id: 'comida',
        name: 'Comidas & Bebidas',
        images: [
            {
                url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop',
                alt: 'Prato principal especial'
            },
            {
                url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0996d?w=800&h=600&fit=crop',
                alt: 'Pizza artesanal'
            },
            {
                url: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&h=600&fit=crop',
                alt: 'Drinks especiais'
            },
            {
                url: 'https://images.unsplash.com/photo-1546833999-b9f581a0996d?w=800&h=600&fit=crop',
                alt: 'Sobremesa da casa'
            },
            {
                url: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-6.jpg',
                alt: 'Comida 1'
            },
            {
                url: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-7.jpg',
                alt: 'Comida 2'
            },
            {
                url: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-8.jpg',
                alt: 'Comida 3'
            }
        ]
    },
    {
        id: 'infantil',
        name: 'Espaço Infantil',
        images: [
            {
                url: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800&h=600&fit=crop',
                alt: 'Área de brinquedos'
            },
            {
                url: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=800&h=600&fit=crop',
                alt: 'Crianças brincando'
            },
            {
                url: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop',
                alt: 'Atividades para crianças'
            },
            {
                url: 'https://images.unsplash.com/photo-1559278755-669ad8e7e7d1?w=800&h=600&fit=crop',
                alt: 'Espaço kids decorado'
            },
            {
                url: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-9.jpg',
                alt: 'Infantil 1'
            },
            {
                url: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-10.jpg',
                alt: 'Infantil 2'
            },
            {
                url: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-11.jpg',
                alt: 'Infantil 3'
            }
        ]
    }
];

export default function GallerySection() {
    const [activeCategory, setActiveCategory] = useState('ambiente');
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

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

    // Animações para a grid
    const gridContainer = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
                delayChildren: 0.1
            }
        },
        exit: { opacity: 0, transition: { duration: 0.2 } }
    };

    const gridItem = {
        hidden: { opacity: 0, y: 30 },
        show: { 
            opacity: 1, 
            y: 0, 
            transition: { 
                type: "spring" as const, 
                stiffness: 100,
                damping: 15
            } 
        },
        exit: { 
            opacity: 0, 
            y: -20, 
            transition: { duration: 0.2 } 
        }
    };

    const activeImages = galleryCategories.find(cat => cat.id === activeCategory)?.images || [];

    // Função para dividir as imagens em colunas para o layout masonry
    const renderMasonryGrid = () => {
        // Criar 4 colunas
        const columns: GalleryImage[][] = [[], [], [], []];
        
        // Distribuir as imagens nas colunas
        activeImages.forEach((image, index) => {
            columns[index % 4].push(image);
        });

        return (
            <div 
                key={activeCategory}
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
                {columns.map((column, colIndex) => (
                    <div 
                        key={colIndex} 
                        className="grid gap-4"
                    >
                        {column.map((image, imgIndex) => (
                            <div 
                                key={`${colIndex}-${imgIndex}`}
                                className="cursor-pointer"
                                onClick={() => setSelectedImage(image.url)}
                            >
                                <ImageWithFallback
                                    src={image.url}
                                    alt={image.alt}
                                    className="h-auto max-w-full rounded-lg"
                                    fallbackClassName="h-48 rounded-lg"
                                    placeholder="Foto não disponível"
                                />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <section id="gallery" className="py-20 bg-black relative z-10">
            <div className="container mx-auto px-4">
                <motion.div 
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6 }}
                >
                    <motion.h2 
                        className="text-4xl md:text-5xl font-heading font-semibold text-secondary mb-6"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        Imagens da Casa
                    </motion.h2>

                    <motion.div 
                        className='flex justify-center mb-6'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
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
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                    >
                        Conheça nossos espaços, pratos especiais, eventos e muito mais
                    </motion.p>
                </motion.div>

                {/* Category Filters */}
                <motion.div 
                    className="flex flex-wrap justify-center gap-4 mb-16"
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {galleryCategories.map((category) => (
                        <motion.button
                            key={category.id}
                            onClick={() => setActiveCategory(category.id)}
                            className={`px-6 py-3 font-medium cursor-pointer transition-all focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-opacity-50 ${activeCategory === category.id
                                ? 'bg-secondary text-black'
                                : 'bg-neutral-bg text-neutral-text-secondary hover:bg-neutral-button hover:text-white'
                                }`}
                            variants={item}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            layout
                        >
                            {category.name}
                        </motion.button>
                    ))}
                </motion.div>

                {/* Masonry Grid */}
                <div className="overflow-hidden">
                    <AnimatePresence mode="wait">
                        {renderMasonryGrid()}
                    </AnimatePresence>
                </div>

            </div>

            {/* Modal for enlarged image */}
            {selectedImage && (
                <motion.div 
                    className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) {
                            setSelectedImage(null);
                        }
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <motion.div 
                        className="relative max-w-4xl max-h-full"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                        <motion.button
                            onClick={() => setSelectedImage(null)}
                            className="absolute -top-10 right-0 text-white hover:text-neutral-text-secondary transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <X className="w-8 h-8" />
                        </motion.button>
                        <ImageWithFallback
                            src={selectedImage}
                            alt="Imagem ampliada"
                            className="max-w-full max-h-full rounded-lg"
                            fallbackClassName="w-96 h-64 rounded-lg"
                            placeholder="Imagem não pode ser exibida"
                        />
                    </motion.div>
                </motion.div>
            )}
        </section>
    );
}
