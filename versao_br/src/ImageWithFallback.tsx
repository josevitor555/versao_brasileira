import { useState } from 'react';
import { ImageIcon } from 'lucide-react';
import bull_logo from '/bull_5.png';

interface ImageWithFallbackProps {
    src: string;
    alt: string;
    className?: string;
    fallbackClassName?: string;
    placeholder?: string;
    // Otimizações para performance
    loading?: "lazy" | "eager";
    decoding?: "async" | "sync" | "auto";
    fetchPriority?: "high" | "low" | "auto";
}

export default function ImageWithFallback({
    src,
    alt,
    className = '',
    fallbackClassName = '',
    placeholder,
    loading = "lazy",
    decoding = "async",
    fetchPriority = "auto"
}: ImageWithFallbackProps) {
    const [imageError, setImageError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const handleImageError = () => {
        setImageError(true);
        setIsLoading(false);
    };

    const handleImageLoad = () => {
        setIsLoading(false);
    };

    // Fallback padrão otimizado para performance
    if (!src || imageError) {
        return (
            <div className={`flex items-center justify-center bg-neutral-700 w-full h-full ${fallbackClassName || className}`}>
                <div className="text-center flex flex-col items-center justify-center w-full h-full p-2">
                    <img 
                        width="80" 
                        height="80" 
                        src={bull_logo} 
                        alt="Logo Versão Brasileira" 
                        className="mx-auto"
                        loading="lazy"
                        decoding="async"
                    />
                    <p className="text-sm md:text-base text-neutral-400 mt-2">
                        {placeholder || (imageError ? 'Imagem indisponível' : 'Versão Brasileira')}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="relative z-0 w-full h-full">
            {isLoading && (
                <div className={`absolute inset-0 flex items-center justify-center bg-neutral-700 animate-pulse w-full h-full ${className}`}>
                    <div className="text-neutral-text-secondary flex items-center justify-center w-full h-full">
                        <ImageIcon className="w-6 h-6 opacity-50" />
                    </div>
                </div>
            )}
            <img
                src={src}
                alt={alt}
                className={className}
                onError={handleImageError}
                onLoad={handleImageLoad}
                style={{ display: isLoading ? 'none' : 'block' }}
                loading={loading}
                decoding={decoding}
                fetchPriority={fetchPriority}
                // Otimizações adicionais para performance
                crossOrigin="anonymous"
            />
        </div>
    );
}
