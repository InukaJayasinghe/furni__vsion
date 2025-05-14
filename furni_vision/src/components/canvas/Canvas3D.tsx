import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useProject } from '../../contexts/ProjectContext';
import { FurnitureItem } from '../../types';

function Room({ width, length, height, wallColor, floorColor }: {
  width: number;
  length: number;
  height: number;
  wallColor: string;
  floorColor: string;
}) {
  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[length/2, 0, width/2]}>
        <planeGeometry args={[length, width]} />
        <meshStandardMaterial color={floorColor} />
      </mesh>
      
      {/* Walls */}
      <group position={[0, height/2, 0]}>
        {/* Back wall */}
        <mesh position={[length/2, 0, 0]}>
          <planeGeometry args={[length, height]} />
          <meshStandardMaterial color={wallColor} />
        </mesh>
        
        {/* Left wall */}
        <mesh position={[0, 0, width/2]} rotation={[0, Math.PI/2, 0]}>
          <planeGeometry args={[width, height]} />
          <meshStandardMaterial color={wallColor} />
        </mesh>
      </group>
    </group>
  );
}

function Furniture({ item }: { item: FurnitureItem }) {
  const { width, depth, height, position, color } = item;
  
  return (
    <mesh
      position={[position.x + width/2, height/2, position.y + depth/2]}
      rotation={[0, (position.rotation * Math.PI) / 180, 0]}
    >
      <boxGeometry args={[width, height, depth]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

export default function Canvas3D() {
  const { currentProject } = useProject();
  const canvasRef = useRef<HTMLDivElement>(null);

  if (!currentProject) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-100">
        <p className="text-gray-500">No project selected</p>
      </div>
    );
  }

  const { room, furniture } = currentProject;

  return (
    <div className="relative flex-1 bg-gray-800">
      <Canvas shadows>
        <PerspectiveCamera
          makeDefault
          position={[room.dimensions.length * 1.5, room.dimensions.height * 1.5, room.dimensions.width * 1.5]}
        />
        <OrbitControls enableDamping />
        
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1}
          castShadow
        />
        
        <Room
          width={room.dimensions.width}
          length={room.dimensions.length}
          height={room.dimensions.height}
          wallColor={room.palette.walls}
          floorColor={room.palette.floor}
        />
        
        {furniture.map((item) => (
          <Furniture key={item.id} item={item} />
        ))}
      </Canvas>
    </div>
  );
}