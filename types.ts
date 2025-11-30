export enum AppCategory {
  MVP = 'MVP Startups',
  ECOMMERCE = 'E-Commerce',
  SOCIAL = 'Social Network',
  AI_TOOL = 'AI Native Tool',
  ENTERPRISE = 'Enterprise Solution'
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
  createdAt?: any;
}

export interface Feature {
  id: string;
  name: string;
  description: string;
  baseCost: number;
  icon: string;
}