import { FurnitureItem, Project, Room, RoomShape } from '../types';

// Sample furniture data
export const furnitureItems: FurnitureItem[] = [
  {
    id: 'chair-1',
    type: 'chair',
    name: 'Modern Dining Chair',
    width: 0.5,
    depth: 0.5,
    height: 0.8,
    position: { x: 1, y: 1, rotation: 0 },
    color: '#A47551',
    imageUrl: 'https://images.pexels.com/photos/116910/pexels-photo-116910.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 'chair-2',
    type: 'chair',
    name: 'Lounge Chair',
    width: 0.7,
    depth: 0.8,
    height: 0.75,
    position: { x: 2, y: 2, rotation: 0 },
    color: '#D9CFC1',
    imageUrl: 'https://images.pexels.com/photos/11112735/pexels-photo-11112735.jpeg'
  },
  {
    id: 'sofa-1',
    type: 'sofa',
    name: 'Three-Seater Sofa',
    width: 2.0,
    depth: 0.9,
    height: 0.8,
    position: { x: 3, y: 1, rotation: 0 },
    color: '#687585',
    imageUrl: 'https://images.pexels.com/photos/11112731/pexels-photo-11112731.jpeg'
  },
  {
    id: 'table-1',
    type: 'table',
    name: 'Coffee Table',
    width: 1.2,
    depth: 0.6,
    height: 0.45,
    position: { x: 3, y: 2, rotation: 0 },
    color: '#5C4033',
    imageUrl: 'https://images.pexels.com/photos/2079455/pexels-photo-2079455.jpeg'
  },
  {
    id: 'table-2',
    type: 'table',
    name: 'Dining Table',
    width: 1.5,
    depth: 0.9,
    height: 0.75,
    position: { x: 4, y: 2, rotation: 0 },
    color: '#8B5A2B',
    imageUrl: 'https://images.pexels.com/photos/373548/pexels-photo-373548.jpeg'
  }
];

// Sample room shapes
export const roomShapes: { id: RoomShape; name: string }[] = [
  { id: 'square', name: 'Square' },
  { id: 'rectangle', name: 'Rectangle' },
  { id: 'l-shape', name: 'L-Shape' }
];

// Sample room data
export const sampleRoom: Room = {
  id: 'room-1',
  name: 'Living Room',
  dimensions: {
    length: 5,
    width: 4,
    height: 2.7
  },
  shape: 'rectangle',
  palette: {
    walls: '#F5F5F5',
    floor: '#D7CCA3',
    accent: '#4A6FA5'
  }
};

// Sample project
export const sampleProject: Project = {
  id: 'project-1',
  name: 'Modern Living Room',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  room: sampleRoom,
  furniture: [
    { ...furnitureItems[0], position: { x: 1, y: 1, rotation: 0 } },
    { ...furnitureItems[2], position: { x: 2, y: 2, rotation: 90 } },
    { ...furnitureItems[3], position: { x: 3, y: 3, rotation: 0 } }
  ]
};