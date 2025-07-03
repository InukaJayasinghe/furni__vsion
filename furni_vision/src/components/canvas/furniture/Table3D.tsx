import { FurnitureItem } from '../../../types';

interface Table3DProps {
  item: FurnitureItem;
}

export default function Table3D({ item }: Table3DProps) {
  const { width, depth, height, position, color } = item;
  
  // Table dimensions
  const topThickness = height * 0.08;
  const legThickness = Math.min(width, depth) * 0.06;
  const legHeight = height - topThickness;
  const apronHeight = height * 0.1;
  const apronThickness = topThickness * 0.6;
  
  return (
    <group
      position={[position.x + width/2, 0, position.y + depth/2]}
      rotation={[0, (position.rotation * Math.PI) / 180, 0]}
    >
      {/* Table top */}
      <mesh position={[0, height - topThickness/2, 0]} castShadow receiveShadow>
        <boxGeometry args={[width, topThickness, depth]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Front apron */}
      <mesh 
        position={[0, height - topThickness - apronHeight/2, depth/2 - apronThickness/2]} 
        castShadow 
        receiveShadow
      >
        <boxGeometry args={[width * 0.8, apronHeight, apronThickness]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Back apron */}
      <mesh 
        position={[0, height - topThickness - apronHeight/2, -depth/2 + apronThickness/2]} 
        castShadow 
        receiveShadow
      >
        <boxGeometry args={[width * 0.8, apronHeight, apronThickness]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Left apron */}
      <mesh 
        position={[-width/2 + apronThickness/2, height - topThickness - apronHeight/2, 0]} 
        castShadow 
        receiveShadow
      >
        <boxGeometry args={[apronThickness, apronHeight, depth * 0.6]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Right apron */}
      <mesh 
        position={[width/2 - apronThickness/2, height - topThickness - apronHeight/2, 0]} 
        castShadow 
        receiveShadow
      >
        <boxGeometry args={[apronThickness, apronHeight, depth * 0.6]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Front left leg */}
      <mesh 
        position={[-width/2 + legThickness/2, legHeight/2, depth/2 - legThickness/2]} 
        castShadow 
        receiveShadow
      >
        <boxGeometry args={[legThickness, legHeight, legThickness]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Front right leg */}
      <mesh 
        position={[width/2 - legThickness/2, legHeight/2, depth/2 - legThickness/2]} 
        castShadow 
        receiveShadow
      >
        <boxGeometry args={[legThickness, legHeight, legThickness]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Back left leg */}
      <mesh 
        position={[-width/2 + legThickness/2, legHeight/2, -depth/2 + legThickness/2]} 
        castShadow 
        receiveShadow
      >
        <boxGeometry args={[legThickness, legHeight, legThickness]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Back right leg */}
      <mesh 
        position={[width/2 - legThickness/2, legHeight/2, -depth/2 + legThickness/2]} 
        castShadow 
        receiveShadow
      >
        <boxGeometry args={[legThickness, legHeight, legThickness]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
}