'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const navItems = [
    { label: 'ホーム', href: '/' },
    { label: 'スポット', href: '/spots' },
    { label: 'お知らせ', href: '/news' },
    { label: 'アクセス', href: '/#access' },
];

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // prefers-reduced-motion対応
    const prefersReducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    return (
        <header
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-[64px] md:h-[72px]',
                isScrolled
                    ? 'bg-white/95 backdrop-blur-md shadow-lg'
                    : 'bg-transparent'
            )}
        >
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
                <div className="relative flex items-center justify-end h-full">
                    {/* Logo (Absolute & Overlay) */}
                    <a href="/" className="absolute left-0 top-1/2 -translate-y-1/2 z-50 group">
                        <Image
                            src="/logo.png"
                            alt="Okukuji Kaido Cycling"
                            width={300}
                            height={75}
                            className="w-[120px] md:w-[150px] h-auto object-contain max-w-none"
                            priority
                        />
                    </a>

                    {/* Desktop Navigation */}
                    <ul className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => (
                            <li key={item.href}>
                                <a
                                    href={item.href}
                                    className={cn(
                                        'text-sm font-medium transition-colors hover:text-emerald-500',
                                        isScrolled ? 'text-gray-700' : 'text-white/90'
                                    )}
                                >
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className={cn(
                            'md:hidden p-2 rounded-lg min-w-[44px] min-h-[44px] flex items-center justify-center ml-auto',
                            isScrolled ? 'text-gray-900' : 'text-white'
                        )}
                        aria-label="メニューを開く"
                    >
                        {isMobileMenuOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={prefersReducedMotion ? {} : { opacity: 0, height: 0 }}
                        animate={prefersReducedMotion ? {} : { opacity: 1, height: 'auto' }}
                        exit={prefersReducedMotion ? {} : { opacity: 0, height: 0 }}
                        className="md:hidden bg-white/95 backdrop-blur-md border-t"
                    >
                        <ul className="px-4 py-4 space-y-2">
                            {navItems.map((item) => (
                                <li key={item.href}>
                                    <a
                                        href={item.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="block py-3 px-4 text-gray-700 font-medium hover:bg-emerald-50 hover:text-emerald-600 rounded-lg transition-colors min-h-[44px] flex items-center"
                                    >
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
