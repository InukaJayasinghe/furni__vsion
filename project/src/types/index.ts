// User types
export interface User {
  id: string;
  email: string;
  name: string;
}

// Authentication types
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Room types
export type RoomShape = 'square' | 'rectangle' | 'l-shape';

export interface RoomDimensions {
  length: number;
  width: number;
  height: number;
  // Only used for L-shaped rooms
  secondaryLength?: number;
  secondaryWidth?: number;
}

export interface ColorPalette {
  walls: string;
  floor: string;
  accent: string;
}

export interface Room {
  id: string;
  name: string;
  dimensions: RoomDimensions;
  shape: RoomShape;
  palette: ColorPalette;
}

// Furniture types
export interface FurniturePosition {
  x: number;
  y: number;
  rotation: number;
}

export interface FurnitureItem {
  id: string;
  type: string;
  name: string;
  width: number;
  depth: number;
  height: number;
  position: FurniturePosition;
  color: string;
  imageUrl: string;
}

// Project types
export interface Project {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  room: Room;
  furniture: FurnitureItem[];
}

// Canvas view mode
export type ViewMode = '2d' | '3d';