// types/navigation.ts
export interface NavItem {
    name: string;
    href: string;
}

export interface HeaderProps {
    showBanner?: boolean;
    bannerText?: string;
    customLogo?: React.ReactNode;
}
