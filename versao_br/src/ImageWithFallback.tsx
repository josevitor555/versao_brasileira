import { useState } from 'react';
import { ImageIcon } from 'lucide-react';

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

    if (imageError) {
        return (
            <div className={`flex items-center justify-center bg-neutral-border text-neutral-text-secondary ${fallbackClassName || className}`}>
                <div className="text-center">
                    <ImageIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm opacity-75">
                        {placeholder || 'Imagem não disponível'}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="relative">
            {isLoading && (
                <div className={`absolute inset-0 flex items-center justify-center bg-neutral-border animate-pulse ${className}`}>
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
