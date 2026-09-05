import type { LucideIcon } from 'lucide-react';
import { LayoutDashboard, ClipboardList, Search, Users, Calendar, DollarSign, UserRound, Settings } from 'lucide-react';

export interface NavItem {
  label: string;
  path: string;
  icon: LucideIcon;
}

export const ATHLETE_NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', path: '/athlete', icon: LayoutDashboard },
  { label: 'Actividades', path: '/athlete/activities', icon: ClipboardList },
  { label: 'Buscar Coach', path: '/athlete/find-coach', icon: Search },
];

export const COACH_NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', path: '/coach', icon: LayoutDashboard },
  { label: 'Mis Atletas', path: '/coach/athletes', icon: Users },
  { label: 'Planes', path: '/coach/plans', icon: Calendar },
  { label: 'Ganancias', path: '/coach/earnings', icon: DollarSign },
];

export const COMMON_NAV_ITEMS: NavItem[] = [
  { label: 'Perfil', path: '/settings/profile', icon: UserRound },
  { label: 'Configuración', path: '/settings', icon: Settings },
];

export const ALL_NAV_ITEMS: NavItem[] = [
  ...ATHLETE_NAV_ITEMS,
  ...COACH_NAV_ITEMS,
  ...COMMON_NAV_ITEMS,
];
