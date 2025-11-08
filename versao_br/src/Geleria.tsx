// Hooks states
import { useState } from 'react';

// Icons
import { X } from 'lucide-react';

// Framer motion
import { motion } from 'framer-motion';

// Image with fallback
import ImageWithFallback from './ImageWithFallback';

// Images
// import bull_logo from '/bull_5.png';

// Definir o tipo para as imagens e vídeos
interface GalleryItem {
    url: string;
    alt: string;
    type: 'image' | 'video';
}

const galleryCategories = [
    {
        id: 'ambiente',
        name: 'Ambiente',
        images: [
            {
                url: '/image_8.jpg',
                alt: 'Ambiente interno aconchegante',
                type: 'image' as 'image' | 'video'
            },
            {
                url: '/image_9.jpg',
                alt: 'Área externa com mesas',
                type: 'image' as 'image' | 'video'
            },
            {
                url: '/image_10.jpg',
                alt: 'Vista geral do restaurante',
                type: 'image' as 'image' | 'video'
            },
            {
                url: '/video_1.mp4',
                alt: 'Vídeo do ambiente',
                type: 'video' as 'image' | 'video'
            }
        ]
    },
    {
        id: 'eventos',
        name: 'Eventos',
        images: [
            {
                url: '/image_11.jpg',
                alt: 'Show ao vivo no palco',
                type: 'image' as 'image' | 'video'
            },
            {
                url: '/image_12.jpg',
                alt: 'Banda se apresentando',
                type: 'image' as 'image' | 'video'
            }
        ]
    },
    {
        id: 'comida',
        name: 'Comidas & Bebidas',
        images: [
            {
                url: '/image_13.jpg',
                alt: 'Comida 1',
                type: 'image' as 'image' | 'video'
            },
            {
                url: '/video_2.mp4',
                alt: 'Vídeo do ambiente',
                type: 'video' as 'image' | 'video'
            }
        ]
    },
    // {
    //     id: 'infantil',
    //     name: 'Espaço Infantil',
    //     images: [
    //         {
    //             url: '/image_14.jpg',
    //             alt: 'Comida 1',
    //             type: 'image' as 'image' | 'video'
    //         }
    //     ]
    // }
];

// Criar uma lista flat com todas as imagens
const allItems = galleryCategories.flatMap(category => category.images);

export default function GallerySection() {
    const [selectedItem, setSelectedItem] = useState<{ url: string, type: 'image' | 'video' } | null>(null);

    // Variações de animação para fade-in
    // const container = {
    //     hidden: { opacity: 0 },
    //     show: {
    //         opacity: 1,
    //         transition: {
    //             staggerChildren: 0.1
    //         }
    //     }
    // };

    // const item = {
    //     hidden: { opacity: 0, y: 20 },
    //     show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    // };

    // Função para dividir os itens em colunas para o layout masonry
    const renderMasonryGrid = () => {
        // Criar 4 colunas
        const columns: GalleryItem[][] = [[], [], [], []];

        // Distribuir os itens nas colunas
        allItems.forEach((item, index) => {
            columns[index % 4].push(item);
        });

        return (
            <div
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
                {columns.map((column, colIndex) => (
                    <div
                        key={colIndex}
                        className="grid gap-4"
                    >
                        {column.map((item, imgIndex) => (
                            <div
                                key={`${colIndex}-${imgIndex}`}
                                className="cursor-pointer relative"
                                onClick={() => setSelectedItem({ url: item.url, type: item.type })}
                            >
                                {item.type === 'video' ? (
                                    // Exibir thumbnail para vídeos
                                    <div className="h-auto max-w-full rounded-lg bg-black flex items-center justify-center relative">
                                        <img
                                            src="/image_8.jpg"
                                            alt={item.alt}
                                            className="w-full h-full object-cover rounded-lg"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-lg">
                                            <div className="w-12 h-12 bg-white/80 rounded-full flex items-center justify-center">
                                                <svg className="w-6 h-6 text-black ml-1" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M8 5v10l8-5-8-5z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <ImageWithFallback
                                        src={item.url}
                                        alt={item.alt}
                                        className="h-auto max-w-full rounded-lg"
                                        fallbackClassName="h-48 rounded-lg"
                                        placeholder="Foto não disponível"
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <section id="galeria" className="py-20 bg-black relative z-10">
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

                {/* Masonry Grid - sem sistema de filtragem */}
                <div className="overflow-hidden">
                    {renderMasonryGrid()}
                </div>

            </div>

            {/* Modal for enlarged item */}
            {selectedItem && (
                <motion.div
                    className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) {
                            setSelectedItem(null);
                        }
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <motion.div
                        className="relative"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                        {/* Botão de fechar posicionado fora do conteúdo */}
                        <motion.button
                            onClick={() => setSelectedItem(null)}
                            className="absolute -top-46 -right-4 text-white bg-black/60 hover:bg-black/80 rounded-full p-2 transition-colors z-20"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <X className="w-6 h-6" />
                        </motion.button>

                        {/* Container com tamanho limitado para o conteúdo */}
                        <div className="max-w-2xl max-h-[20vh] flex items-center justify-center">
                            {selectedItem.type === 'video' ? (
                                // Exibir vídeo no modal
                                <div className="max-w-full max-h-full rounded-lg">
                                    <video
                                        src={selectedItem.url}
                                        controls
                                        autoPlay
                                        className="max-w-full max-h-full rounded-lg"
                                    />
                                </div>
                            ) : (
                                // Exibir imagem no modal
                                <ImageWithFallback
                                    src={selectedItem.url}
                                    alt="Item ampliado"
                                    className="max-w-full max-h-full rounded-lg object-contain"
                                    fallbackClassName="w-64 h-48 rounded-lg"
                                    placeholder="Item não pode ser exibido"
                                />
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </section>
    );
}
