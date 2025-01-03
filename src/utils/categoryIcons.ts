import { 
  Coffee, Home, Lightbulb, Music, Car, Package,
  type LucideIcon 
} from 'lucide-react';
import { Category } from '../types';

export const getCategoryIcon = (category: Category): LucideIcon => {
  const icons: Record<Category, LucideIcon> = {
    food: Coffee,
    rent: Home,
    utilities: Lightbulb,
    entertainment: Music,
    transportation: Car,
    other: Package,
  };
  return icons[category];
};