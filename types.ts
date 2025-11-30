export enum AppCategory {
  MVP = 'MVP Startups',
  ECOMMERCE = 'E-Commerce',
  SOCIAL = 'Social Network',
  AI_TOOL = 'AI Native Tool',
  ENTERPRISE = 'Enterprise Solution'
}

export interface Feature {
  id: string;
  name: string;
  description: string;
  baseCost: number;
  icon?: string;
}

export interface ProjectRequest {
  appName: string;
  category: AppCategory;
  selectedFeatures: string[]; // List of Feature IDs
  estimatedPrice: number;
  clientName: string;
  clientEmail: string;
  description: string;
  contact?: string;
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
  tags: string[];
  createdAt?: any;
}