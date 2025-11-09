import { useState } from 'react';
import { ImageIcon } from 'lucide-react';
import bull_logo from '/bull_5.png';

interface ImageWithFallbackProps {
    src: string;
    alt: string;
    className?: string;
    fallbackClassName?: string;
    placeholder?: string;
}

export default function ImageWithFallback({
    src,
    alt,
    className = '',
    fallbackClassName = '',
    placeholder
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

    if (!src) {
        return (
            <div className={`flex items-center justify-center bg-neutral-700 ${fallbackClassName || className}`}>
                <div className="text-center flex flex-col items-center justify-center w-full h-full p-2">
                    <img width="80" height="80" src={bull_logo} alt="Logo Versão Brasileira" className="mx-auto" />
                    <p className="text-sm md:text-base text-neutral-400 mt-2">
                        {placeholder || 'Versão Brasileira'}
                    </p>
                </div>
            </div>
        );
    }

    if (imageError) {
        return (
            <div className={`flex items-center justify-center bg-neutral-700 ${fallbackClassName || className}`}>
                <div className="text-center flex flex-col items-center justify-center w-full h-full p-2">
                    <img width="80" height="80" src={bull_logo} alt="Logo Versão Brasileira" className="mx-auto" />
                    <p className="text-sm md:text-base text-neutral-400 mt-2">
                        {placeholder || 'Imagem indisponível'}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="relative">
            {isLoading && (
                <div className={`absolute inset-0 flex items-center justify-center bg-neutral-700 animate-pulse ${className}`}>
                    <div className="text-neutral-text-secondary">
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
            />
        </div>
    );
}