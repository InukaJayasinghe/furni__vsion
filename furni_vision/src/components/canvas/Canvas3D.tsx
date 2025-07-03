import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useProject } from '../../contexts/ProjectContext';
import { FurnitureItem } from '../../types';
import Chair3D from './furniture/Chair3D';
import Table3D from './furniture/Table3D';
import Sofa3D from './furniture/Sofa3D';

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
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[length/2, 0, width/2]} receiveShadow>
        <planeGeometry args={[length, width]} />
        <meshStandardMaterial color={floorColor} />
      </mesh>
      
      {/* Walls */}
      <group position={[0, height/2, 0]}>
        {/* Back wall */}
        <mesh position={[length/2, 0, 0]} receiveShadow>
          <planeGeometry args={[length, height]} />
          <meshStandardMaterial color={wallColor} />
        </mesh>
        
        {/* Left wall */}
        <mesh position={[0, 0, width/2]} rotation={[0, Math.PI/2, 0]} receiveShadow>
          <planeGeometry args={[width, height]} />
          <meshStandardMaterial color={wallColor} />
        </mesh>
        
        {/* Right wall */}
        <mesh position={[length, 0, width/2]} rotation={[0, -Math.PI/2, 0]} receiveShadow>
          <planeGeometry args={[width, height]} />
          <meshStandardMaterial color={wallColor} />
        </mesh>
      </group>
    </group>
  );
}

function Furniture({ item }: { item: FurnitureItem }) {
  // Render different 3D models based on furniture type
  switch (item.type) {
    case 'chair':
      return <Chair3D item={item} />;
    case 'table':
      return <Table3D item={item} />;
    case 'sofa':
      return <Sofa3D item={item} />;
    default:
      // Fallback to simple box for unknown types
      const { width, depth, height, position, color } = item;
      return (
        <mesh
          position={[position.x + width/2, height/2, position.y + depth/2]}
          rotation={[0, (position.rotation * Math.PI) / 180, 0]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[width, height, depth]} />
          <meshStandardMaterial color={color} />
        </mesh>
      );
  }
}

export default function Canvas3D() {
  const { currentProject } = useProject();

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
          position={[room.dimensions.length * 1.2, room.dimensions.height * 1.8, room.dimensions.width * 1.2]}
          fov={60}
        />
        <OrbitControls 
          enableDamping 
          dampingFactor={0.05}
          minDistance={2}
          maxDistance={room.dimensions.length * 3}
          maxPolarAngle={Math.PI / 2.1}
        />
        
        {/* Ambient light for overall illumination */}
        <ambientLight intensity={0.3} />
        
        {/* Main directional light with shadows */}
        <directionalLight
          position={[room.dimensions.length * 0.8, room.dimensions.height * 2, room.dimensions.width * 0.8]}
          intensity={1.2}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        
        {/* Fill light from the opposite side */}
        <directionalLight
          position={[-room.dimensions.length * 0.3, room.dimensions.height * 1.5, -room.dimensions.width * 0.3]}
          intensity={0.4}
        />
        
        {/* Spot light for accent lighting */}
        <spotLight
          position={[room.dimensions.length * 0.5, room.dimensions.height * 1.5, room.dimensions.width * 0.5]}
          intensity={0.5}
          angle={Math.PI / 6}
          penumbra={0.3}
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
      
      {/* 3D View Controls Info */}
      <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white p-3 rounded-lg text-sm">
        <div className="font-medium mb-1">3D View Controls:</div>
        <div>• Left click + drag: Rotate view</div>
        <div>• Right click + drag: Pan view</div>
        <div>• Scroll: Zoom in/out</div>
      </div>
    </div>
  );
}