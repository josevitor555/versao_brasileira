// Hooks states
import { useState, useEffect } from 'react';

// Icons
import { MessageCircle } from 'lucide-react';

// Images
import bull_logo from '../images/bull_5.png';

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
      <div className="text-center flex flex-col items-center justify-center w-full h-full">
        <img width="100" height="100" src={bull_logo} alt="Imagem não disponível" className="mx-auto" />
        <p className="text-base text-neutral-400 mt-2"> Imagem indisponível </p>
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

    useEffect(() => {
        const fetchMenuData = async () => {
            try {
                const [itemsResponse, categoriesResponse] = await Promise.all([
                    fetch('/api/menu/items'),
                    fetch('/api/menu/categories')
                ]);

                if (itemsResponse.ok) {
                    const itemsData = await itemsResponse.json();
                    setMenuItems(itemsData);
                }

                if (categoriesResponse.ok) {
                    const categoriesData = await categoriesResponse.json();
                    setCategories(categoriesData);
                }
            } catch (error) {
                console.error('Erro ao carregar cardápio:', error);

                // Mock data for development        
                const mockCategories = [
                    { id: 1, name: 'Bebidas', display_order: 1 },
                    { id: 2, name: 'Saladas', display_order: 2 },
                    { id: 3, name: 'Pratos Principais', display_order: 3 },
                    { id: 4, name: 'Lanches', display_order: 4 },
                    { id: 5, name: 'Sobremesas', display_order: 5 }
                ];

                // Mock items for development
                const mockItems = [
                    { id: 1, category_id: 1, name: 'Caipirinha da Casa', description: 'Tradicional com cachaça artesanal e frutas frescas', price: 18.00, is_available: true, image_url: null },
                    { id: 2, category_id: 1, name: 'Cerveja Artesanal', description: 'Seleção de cervejas locais', price: 12.00, is_available: true, image_url: null },
                    { id: 3, category_id: 2, name: 'Salada Caesar', description: 'Alface romana, croutons, parmesão e molho caesar', price: 28.00, is_available: true, image_url: null },
                    { id: 4, category_id: 3, name: 'Picanha na Chapa', description: 'Picanha grelhada com acompanhamentos', price: 65.00, is_available: true, image_url: null },
                    { id: 5, category_id: 4, name: 'Sanduíche da Casa', description: 'Pão artesanal, carne desfiada e queijo coalho', price: 32.00, is_available: true, image_url: null },
                    { id: 6, category_id: 5, name: 'Pudim de Leite', description: 'Receita tradicional da casa', price: 15.00, is_available: true, image_url: null }
                ];

                setCategories(mockCategories);
                setMenuItems(mockItems);
            } finally {
                setLoading(false);
            }
        };

        fetchMenuData();
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
        <section id="cardapio" className="py-20 bg-black">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-heading font-bold text-secondary mb-2">
                        Cardápio Da Casa
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

                    <p className="text-lg text-neutral-text-secondary max-w-2xl mx-auto mb-8">
                        Confira nossas especialidades e faça seu pedido
                    </p>

                    {/* Category Filter Buttons */}
                    {categories.length > 0 && (
                        <div className="flex flex-wrap justify-center gap-3 mb-4">
                            <button
                                onClick={() => setSelectedCategory(null)}
                                className={`px-4 py-2 cursor-pointer font-medium transition-colors ${selectedCategory === null
                                    ? 'bg-secondary text-black'
                                    : 'bg-neutral-section text-neutral-text-secondary hover:bg-neutral-border'
                                    }`}
                            >
                                Todos
                            </button>
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => setSelectedCategory(category.id)}
                                    className={`px-4 py-2 cursor-pointer font-medium transition-colors ${selectedCategory === category.id
                                        ? 'bg-secondary text-black'
                                        : 'bg-neutral-section text-neutral-text-secondary hover:bg-neutral-border'
                                        }`}
                                >
                                    {category.name}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* WhatsApp Quick Order Buttons */}
                <div className="flex flex-wrap justify-center gap-4 mb-14">
                    <button
                        onClick={() => {
                            const phoneNumber = '5586995483983';
                            const message = 'Olá! Gostaria de ver o cardápio completo e fazer um pedido.';
                            const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
                            window.open(url, '_blank');
                        }}
                        className="inline-flex items-center space-x-2 bg-secondary text-black px-4 py-2 cursor-pointer font-medium transition-colors"
                    >
                        <MessageCircle className="w-4 h-4" />
                        <span> Cardápio Completo </span>
                    </button>
                    <button
                        onClick={() => {
                            const phoneNumber = '5586995483983';
                            const message = 'Olá! Gostaria de fazer uma reserva para hoje.';
                            const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
                            window.open(url, '_blank');
                        }}
                        className="inline-flex items-center space-x-2 bg-secondary text-black px-4 py-2 cursor-pointer font-medium transition-colors"
                    >
                        <MessageCircle className="w-4 h-4" />
                        <span> Fazer Reserva </span>
                    </button>
                    <button
                        onClick={() => {
                            const phoneNumber = '5586995483983';
                            const message = 'Olá! Gostaria de saber sobre os pratos do dia.';
                            const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
                            window.open(url, '_blank');
                        }}
                        className="inline-flex items-center space-x-2 bg-secondary text-black px-4 py-2 cursor-pointer font-medium transition-colors"
                    >
                        <MessageCircle className="w-4 h-4" />
                        <span> Pratos do Dia </span>
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto justify-items-start">
                    {menuItems
                        .filter(
                            (item) =>
                                item.is_available &&
                                (selectedCategory === null || item.category_id === selectedCategory)
                        )
                        .map((item, _index, filteredItems) => {
                            // Calcular o índice correto dentro da categoria específica
                            const sameCategoryItems = filteredItems.filter(i => i.category_id === item.category_id);
                            const categoryIndex = sameCategoryItems.findIndex(i => i.id === item.id);
                            
                            const categoryImages: Record<number, string[]> = {
                                1: [ // Bebidas
                                    'https://images.unsplash.com/photo-1606755962773-0c9b4a4d1b9d?auto=format&fit=crop&q=80&w=600&h=800',
                                    'https://images.unsplash.com/photo-1592277705477-692b095b98ea?auto=format&fit=crop&q=80&w=600&h=800',
                                    'https://images.unsplash.com/photo-1581254227460-3ff6b38c5a5a?auto=format&fit=crop&q=80&w=600&h=800',
                                    'https://images.unsplash.com/photo-1592277705477-692b095b98ea?auto=format&fit=crop&q=80&w=600&h=800',
                                    'https://images.unsplash.com/photo-1581254227460-3ff6b38c5a5a?auto=format&fit=crop&q=80&w=600&h=800',
                                    'https://images.unsplash.com/photo-1592277705477-692b095b98ea?auto=format&fit=crop&q=80&w=600&h=800',
                                ],
                                2: [ // Saladas
                                    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=600&h=800',
                                    'https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&q=80&w=600&h=800',
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
                                    'https://images.unsplash.com/photo-1605475128023-439a15189b5b?auto=format&fit=crop&q=80&w=600&h=800',
                                    'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=600&h=800',
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
                                    'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=600&h=800',
                                    'https://images.unsplash.com/photo-1606755962773-0c9b4a4d1b9d?auto=format&fit=crop&q=80&w=600&h=800',
                                    'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=600&h=800',
                                    'https://images.unsplash.com/photo-1606755962773-0c9b4a4d1b9d?auto=format&fit=crop&q=80&w=600&h=800',
                                ]
                            };

                            // Selecionar imagem com base no índice da categoria
                            const imgUrl = item.image_url || categoryImages[item.category_id][categoryIndex % categoryImages[item.category_id].length];

                            return (
                                <div
                                    key={item.id}
                                    className="flex flex-col items-start justify-start bg-transparent overflow-hidden transition-all duration-300 w-full max-w-sm hover:opacity-90"
                                >
                                    {/* Imagem vertical */}
                                    <div className="relative w-full aspect-6/8 bg-neutral-800 overflow-hidden">
                                        <ImageWithFallback
                                            src={imgUrl}
                                            alt={item.name}
                                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                        />

                                        <div className="absolute top-2 right-2 bg-white/80 text-neutral-700 font-semibold px-2 py-0.5 rounded-full text-xs shadow-sm">
                                            R$ {item.price.toFixed(2)}
                                        </div>
                                    </div>

                                    {/* Conteúdo */}
                                    <div className="flex flex-col items-start text-left p-3 w-full">
                                        <h3 className="text-lg font-medium text-secondary mt-2">{item.name}</h3>
                                        {item.description && (
                                            <p className="text-lg text-white/80 mt-2 line-clamp-2">
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
                                </div>
                            );
                        })}
                </div>
            </div>
        </section>
    );
}
