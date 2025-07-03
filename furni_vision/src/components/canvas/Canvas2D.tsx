import React, { useState, useRef, useEffect } from 'react';
import { useProject } from '../../contexts/ProjectContext';
import { FurnitureItem } from '../../types';
import { Move, RotateCcw, Trash2 } from 'lucide-react';

export default function Canvas2D() {
  const { currentProject, updateFurniture, removeFurniture } = useProject();
  const [selectedItem, setSelectedItem] = useState<FurnitureItem | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [showControls, setShowControls] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);
  
  // Scale factor (pixels per meter)
  const scale = 100;
  
  // Handle clicking on a furniture item
  const handleItemClick = (item: FurnitureItem, e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Calculate click offset relative to the item's position
    if (canvasRef.current) {
      const rect = (e.target as HTMLElement).getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const offsetY = e.clientY - rect.top;
      setDragOffset({ x: offsetX, y: offsetY });
    }
    
    setSelectedItem(item);
    setShowControls(true);
  };
  
  // Handle clicking on the canvas (deselect item)
  const handleCanvasClick = () => {
    setSelectedItem(null);
    setShowControls(false);
  };
  
  // Handle start dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    if (selectedItem) {
      e.preventDefault();
      setIsDragging(true);
    }
  };
  
  // Handle drag
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && selectedItem && canvasRef.current) {
      e.preventDefault();
      
      const canvasRect = canvasRef.current.getBoundingClientRect();
      
      // Calculate new position (in meters)
      const newX = (e.clientX - canvasRect.left - dragOffset.x) / scale;
      const newY = (e.clientY - canvasRect.top - dragOffset.y) / scale;
      
      // Check boundaries
      const maxX = currentProject?.room.dimensions.length || 5;
      const maxY = currentProject?.room.dimensions.width || 4;
      
      const boundedX = Math.max(0, Math.min(maxX - selectedItem.width, newX));
      const boundedY = Math.max(0, Math.min(maxY - selectedItem.depth, newY));
      
      // Update selected item position
      const updatedItem = {
        ...selectedItem,
        position: {
          ...selectedItem.position,
          x: boundedX,
          y: boundedY
        }
      };
      
      setSelectedItem(updatedItem);
      
      // Also update it in the context
      updateFurniture(updatedItem);
    }
  };
  
  // Handle end dragging
  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
    }
  };
  
  // Rotate selected item
  const handleRotate = () => {
    if (selectedItem) {
      const currentRotation = selectedItem.position.rotation;
      const newRotation = (currentRotation + 90) % 360;
      
      const updatedItem = {
        ...selectedItem,
        position: {
          ...selectedItem.position,
          rotation: newRotation
        }
      };
      
      setSelectedItem(updatedItem);
      updateFurniture(updatedItem);
    }
  };
  
  // Delete selected item
  const handleDelete = () => {
    if (selectedItem) {
      removeFurniture(selectedItem.id);
      setSelectedItem(null);
      setShowControls(false);
    }
  };
  
  // Add mouse up and mouse leave listeners to the document
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
      }
    };
    
    document.addEventListener('mouseup', handleGlobalMouseUp);
    document.addEventListener('mouseleave', handleGlobalMouseUp);
    
    return () => {
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      document.removeEventListener('mouseleave', handleGlobalMouseUp);
    };
  }, [isDragging]);
  
  if (!currentProject) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-100">
        <p className="text-gray-500">No project selected</p>
      </div>
    );
  }
  
  const { room, furniture } = currentProject;
  
  // Calculate canvas dimensions
  const canvasWidth = room.dimensions.length * scale;
  const canvasHeight = room.dimensions.width * scale;
  
  return (
    <div className="relative flex-1 overflow-auto bg-gray-100">
      <div
        ref={canvasRef}
        className="relative bg-white"
        style={{
          width: `${canvasWidth}px`,
          height: `${canvasHeight}px`,
          backgroundColor: room.palette.floor
        }}
        onClick={handleCanvasClick}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {/* Room walls */}
        <div
          className="absolute inset-0 border-8"
          style={{ borderColor: room.palette.walls }}
        ></div>
        
        {/* Furniture items */}
        {furniture.map((item) => {
          const isSelected = selectedItem?.id === item.id;
          
          // Calculate position and dimensions in pixels
          const posX = item.position.x * scale;
          const posY = item.position.y * scale;
          const width = item.width * scale;
          const depth = item.depth * scale;
          
          // Apply rotation transform
          const rotation = `rotate(${item.position.rotation}deg)`;
          
          return (
            <div
              key={item.id}
              className={`absolute cursor-move transition-shadow duration-200 ${
                isSelected ? 'shadow-lg z-10' : 'shadow'
              }`}
              style={{
                left: `${posX}px`,
                top: `${posY}px`,
                width: `${width}px`,
                height: `${depth}px`,
                backgroundColor: item.color,
                transform: rotation,
                transformOrigin: 'center center'
              }}
              onClick={(e) => handleItemClick(item, e)}
              onMouseDown={isSelected ? handleMouseDown : undefined}
            >
              <div className="h-full w-full flex items-center justify-center text-white text-xs overflow-hidden">
                {item.name}
              </div>
            </div>
          );
        })}
        
        {/* Item controls */}
        {showControls && selectedItem && (
          <div
            className="absolute bg-white rounded-md shadow-lg p-2 z-20 flex space-x-1"
            style={{
              left: `${selectedItem.position.x * scale}px`,
              top: `${(selectedItem.position.y * scale) - 40}px`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="p-1 rounded hover:bg-gray-100 text-gray-700"
              title="Move"
            >
              <Move className="h-5 w-5" />
            </button>
            <button
              className="p-1 rounded hover:bg-gray-100 text-gray-700"
              title="Rotate"
              onClick={handleRotate}
            >
              <RotateCcw className="h-5 w-5" />
            </button>
            <button
              className="p-1 rounded hover:bg-red-100 text-red-600"
              title="Delete"
              onClick={handleDelete}
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        )}
        
        {/* Grid lines (optional) */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: Math.floor(room.dimensions.length) }).map((_, i) => (
            <div
              key={`grid-v-${i}`}
              className="absolute h-full w-px bg-gray-200"
              style={{ left: `${(i + 1) * scale}px` }}
            ></div>
          ))}
          {Array.from({ length: Math.floor(room.dimensions.width) }).map((_, i) => (
            <div
              key={`grid-h-${i}`}
              className="absolute w-full h-px bg-gray-200"
              style={{ top: `${(i + 1) * scale}px` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}