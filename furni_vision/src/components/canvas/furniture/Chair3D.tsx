import { FurnitureItem } from '../../../types';
// Ensure react-three-fiber types are available

interface Chair3DProps {
  item: FurnitureItem;
}

export default function Chair3D({ item }: Chair3DProps) {
  const { width, depth, height, position, color } = item;
  
  // Chair dimensions
  const seatHeight = height * 0.45;
  const backHeight = height * 0.55;
  const seatThickness = height * 0.05;
  const backThickness = width * 0.05;
  const legThickness = Math.min(width, depth) * 0.05;
  const legHeight = seatHeight - seatThickness;
  
  return (
    <group
      position={[position.x + width/2, 0, position.y + depth/2]}
      rotation={[0, (position.rotation * Math.PI) / 180, 0]}
    >
      {/* Seat */}
      <mesh position={[0, seatHeight - seatThickness/2, 0]} castShadow receiveShadow>
        <boxGeometry args={[width * 0.9, seatThickness, depth * 0.9]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Backrest */}
      <mesh 
        position={[0, seatHeight + backHeight/2, -depth/2 + backThickness/2]} 
        castShadow 
        receiveShadow
      >
        <boxGeometry args={[width * 0.8, backHeight, backThickness]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Front left leg */}
      <mesh 
        position={[-width/2 + legThickness, legHeight/2, depth/2 - legThickness]} 
        castShadow 
        receiveShadow
      >
        <boxGeometry args={[legThickness, legHeight, legThickness]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Front right leg */}
      <mesh 
        position={[width/2 - legThickness, legHeight/2, depth/2 - legThickness]} 
        castShadow 
        receiveShadow
      >
        <boxGeometry args={[legThickness, legHeight, legThickness]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Back left leg */}
      <mesh 
        position={[-width/2 + legThickness, legHeight/2, -depth/2 + legThickness]} 
        castShadow 
        receiveShadow
      >
        <boxGeometry args={[legThickness, legHeight, legThickness]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Back right leg */}
      <mesh 
        position={[width/2 - legThickness, legHeight/2, -depth/2 + legThickness]} 
        castShadow 
        receiveShadow
      >
        <boxGeometry args={[legThickness, legHeight, legThickness]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
}