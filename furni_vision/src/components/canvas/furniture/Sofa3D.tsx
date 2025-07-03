import { FurnitureItem } from '../../../types';

interface Sofa3DProps {
  item: FurnitureItem;
}

export default function Sofa3D({ item }: Sofa3DProps) {
  const { width, depth, height, position, color } = item;
  
  // Sofa dimensions
  const seatHeight = height * 0.4;
  const seatDepth = depth * 0.6;
  const backHeight = height * 0.6;
  const backThickness = depth * 0.15;
  const armWidth = width * 0.12;
  const armHeight = height * 0.7;
  const cushionHeight = height * 0.08;
  
  // Darker color for frame
  const frameColor = `#${(parseInt(color.slice(1), 16) * 0.8).toString(16).padStart(6, '0')}`;
  
  return (
    <group
      position={[position.x + width/2, 0, position.y + depth/2]}
      rotation={[0, (position.rotation * Math.PI) / 180, 0]}
    >
      {/* Base frame */}
      <mesh position={[0, seatHeight/2, 0]} castShadow receiveShadow>
        <boxGeometry args={[width, seatHeight, depth]} />
        <meshStandardMaterial color={frameColor} />
      </mesh>
      
      {/* Seat cushions */}
      <mesh 
        position={[0, seatHeight + cushionHeight/2, depth/2 - seatDepth/2]} 
        castShadow 
        receiveShadow
      >
        <boxGeometry args={[width * 0.9, cushionHeight, seatDepth]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Backrest */}
      <mesh 
        position={[0, seatHeight + backHeight/2, -depth/2 + backThickness/2]} 
        castShadow 
        receiveShadow
      >
        <boxGeometry args={[width * 0.9, backHeight, backThickness]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Left armrest */}
      <mesh 
        position={[-width/2 + armWidth/2, seatHeight + armHeight/2, 0]} 
        castShadow 
        receiveShadow
      >
        <boxGeometry args={[armWidth, armHeight, depth * 0.8]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Right armrest */}
      <mesh 
        position={[width/2 - armWidth/2, seatHeight + armHeight/2, 0]} 
        castShadow 
        receiveShadow
      >
        <boxGeometry args={[armWidth, armHeight, depth * 0.8]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Back cushions */}
      <mesh 
        position={[0, seatHeight + backHeight * 0.6, -depth/2 + backThickness * 1.2]} 
        castShadow 
        receiveShadow
      >
        <boxGeometry args={[width * 0.8, backHeight * 0.4, backThickness * 0.6]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
}