'use client';

import { useEffect, useState } from 'react';

const AnimatedLogo = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className="relative mt-2">
            <svg
                width="150"
                height="60"
                viewBox="0 0 150 60"
                fill="none"
            >
                <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="logo fill-current text-gray-900"
                >
                    Filmovi
                </text>

                {/* Daire 1 - Violet */}
                <circle
                    cx="21"
                    cy="6"
                    r="6"
                    fill="#8B5CF6" // violet-500
                    className={`transition-all duration-700 ${mounted ? 'opacity-100' : 'opacity-0 translate-y-4'}`}
                    style={{ transitionDelay: '0.1s' }}
                />
                {/* Daire 2 - Orta renk */}
                <circle
                    cx="40"
                    cy="6"
                    r="6"
                    fill="#9938CA"
                    className={`transition-all duration-700 ${mounted ? 'opacity-100' : 'opacity-0 translate-y-4'}`}
                    style={{ transitionDelay: '0.3s' }}
                />
                {/* Daire 3 - Turuncu */}
                <circle
                    cx="59"
                    cy="6"
                    r="6"
                    fill="#E0724A"
                    className={`transition-all duration-700 ${mounted ? 'opacity-100' : 'opacity-0 translate-y-4'}`}
                    style={{ transitionDelay: '0.5s' }}
                />
            </svg>
        </div>
    );
};

export default AnimatedLogo;