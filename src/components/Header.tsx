'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { events } from '@/data/events';

type NavItem = {
    label: string;
    href: string;
    children?: { label: string; href: string }[];
};

const eventChildren = events
    .filter((e) => e.slug !== 'veloce-kinetic-2026-autumn')
    .map((e) => ({
        label: e.title.replace('\n', ''),
        href: `/events/${e.slug}`,
    }));

const navItems: NavItem[] = [
    { label: 'ホーム', href: '/' },
    { label: 'コース情報', href: '/course' },
    { label: 'スポット', href: '/spots' },
    {
        label: 'イベント',
        href: '/events',
        children: [
            { label: 'イベント一覧', href: '/events' },
            ...eventChildren,
        ],
    },
    { label: 'お知らせ', href: '/news' },
    { label: 'アクセス', href: '/#access' },
];

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const dropdownRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // ドロップダウン外クリックで閉じる
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setOpenDropdown(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const prefersReducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    return (
        <header
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-[64px] md:h-[72px]',
                isScrolled
                    ? 'bg-white/90 backdrop-blur-md shadow-sm'
                    : 'bg-transparent'
            )}
        >
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
                <div className="relative flex items-center justify-end h-full">
                    {/* Logo */}
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
                    <ul className="hidden md:flex items-center gap-8" ref={dropdownRef}>
                        {navItems.map((item) => (
                            <li key={item.href} className="relative">
                                {item.children ? (
                                    <>
                                        <button
                                            onClick={() =>
                                                setOpenDropdown(openDropdown === item.label ? null : item.label)
                                            }
                                            onMouseEnter={() => setOpenDropdown(item.label)}
                                            className={cn(
                                                'text-sm font-medium transition-colors hover:text-emerald-500 flex items-center gap-1',
                                                isScrolled ? 'text-slate-900' : 'text-white'
                                            )}
                                        >
                                            {item.label}
                                            <ChevronDown className={cn(
                                                'w-3.5 h-3.5 transition-transform',
                                                openDropdown === item.label && 'rotate-180'
                                            )} />
                                        </button>
                                        <AnimatePresence>
                                            {openDropdown === item.label && (
                                                <motion.div
                                                    initial={prefersReducedMotion ? {} : { opacity: 0, y: -4 }}
                                                    animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                                                    exit={prefersReducedMotion ? {} : { opacity: 0, y: -4 }}
                                                    transition={{ duration: 0.15 }}
                                                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50"
                                                    onMouseLeave={() => setOpenDropdown(null)}
                                                >
                                                    {item.children.map((child, i) => (
                                                        <a
                                                            key={child.href}
                                                            href={child.href}
                                                            className={cn(
                                                                'block px-4 py-2.5 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors',
                                                                i === 0 && 'font-medium border-b border-gray-100 mb-1'
                                                            )}
                                                        >
                                                            {child.label}
                                                        </a>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </>
                                ) : (
                                    <a
                                        href={item.href}
                                        className={cn(
                                            'text-sm font-medium transition-colors hover:text-emerald-500',
                                            isScrolled ? 'text-slate-900' : 'text-white'
                                        )}
                                    >
                                        {item.label}
                                    </a>
                                )}
                            </li>
                        ))}
                    </ul>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className={cn(
                            'md:hidden p-2 rounded-lg min-w-[44px] min-h-[44px] flex items-center justify-center ml-auto',
                            isScrolled ? 'text-slate-900' : 'text-white'
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
                        <ul className="px-4 py-4 space-y-1">
                            {navItems.map((item) => (
                                <li key={item.href}>
                                    {item.children ? (
                                        <MobileDropdown
                                            item={item}
                                            onNavigate={() => setIsMobileMenuOpen(false)}
                                        />
                                    ) : (
                                        <a
                                            href={item.href}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="block py-3 px-4 text-gray-700 font-medium hover:bg-emerald-50 hover:text-emerald-600 rounded-lg transition-colors min-h-[44px] flex items-center"
                                        >
                                            {item.label}
                                        </a>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}

function MobileDropdown({ item, onNavigate }: { item: NavItem; onNavigate: () => void }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between py-3 px-4 text-gray-700 font-medium hover:bg-emerald-50 hover:text-emerald-600 rounded-lg transition-colors min-h-[44px]"
            >
                {item.label}
                <ChevronDown className={cn('w-4 h-4 transition-transform', isOpen && 'rotate-180')} />
            </button>
            <AnimatePresence>
                {isOpen && item.children && (
                    <motion.ul
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                    >
                        {item.children.map((child) => (
                            <li key={child.href}>
                                <a
                                    href={child.href}
                                    onClick={onNavigate}
                                    className="block py-2.5 pl-8 pr-4 text-sm text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg transition-colors min-h-[40px] flex items-center"
                                >
                                    {child.label}
                                </a>
                            </li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
}
