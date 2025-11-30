
export enum AppCategory {
  STARTUP = 'Startup',
  HOMEPAGE = 'Homepage',
  AI_SERVICE = 'AI Service',
  ECOMMERCE = 'E-Commerce',
  SOCIAL = 'Social Community',
  GAME = 'Game',
  ETC = 'Etc'
}

export interface CategoryDetails {
  id: AppCategory;
  label: string;
  basePrice: number;
  description: string;
  iconName: string;
}

export interface PortfolioItem {
  id?: string;
  title: string;
  description: string;
  imageUrl: string;
  projectUrl?: string; // New: Link to sample site
  category: AppCategory; // New: Category classification
  tags: string[];
  isFeatured?: boolean; // New: Featured flag
  createdAt?: any;
}

export interface Feature {
  id: string;
  name: string;
  description: string;
  baseCost: number;
  icon: string;
}