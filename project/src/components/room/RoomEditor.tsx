import React, { useState } from 'react';
import { Room, RoomShape, ColorPalette } from '../../types';
import { roomShapes } from '../../data/sampleData';
import { useProject } from '../../contexts/ProjectContext';

export default function RoomEditor() {
  const { currentProject, updateProject } = useProject();
  const [isEditing, setIsEditing] = useState(false);
  
  // Local state for editing
  const [roomName, setRoomName] = useState(currentProject?.room.name || '');
  const [length, setLength] = useState(currentProject?.room.dimensions.length || 5);
  const [width, setWidth] = useState(currentProject?.room.dimensions.width || 4);
  const [height, setHeight] = useState(currentProject?.room.dimensions.height || 2.7);
  const [shape, setShape] = useState<RoomShape>(currentProject?.room.shape || 'rectangle');
  const [secondaryLength, setSecondaryLength] = useState(currentProject?.room.dimensions.secondaryLength || 2);
  const [secondaryWidth, setSecondaryWidth] = useState(currentProject?.room.dimensions.secondaryWidth || 2);
  const [palette, setPalette] = useState<ColorPalette>(currentProject?.room.palette || {
    walls: '#F5F5F5',
    floor: '#D7CCA3',
    accent: '#4A6FA5'
  });

  if (!currentProject) {
    return (
      <div className="p-4 text-gray-600">
        No project selected.
      </div>
    );
  }

  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes
      if (currentProject) {
        const updatedRoom: Room = {
          ...currentProject.room,
          name: roomName,
          dimensions: {
            length,
            width,
            height,
            ...(shape === 'l-shape' ? { secondaryLength, secondaryWidth } : {})
          },
          shape,
          palette
        };
        
        updateProject({
          ...currentProject,
          room: updatedRoom
        });
      }
    } else {
      // Initialize form with current values
      setRoomName(currentProject.room.name);
      setLength(currentProject.room.dimensions.length);
      setWidth(currentProject.room.dimensions.width);
      setHeight(currentProject.room.dimensions.height);
      setShape(currentProject.room.shape);
      setSecondaryLength(currentProject.room.dimensions.secondaryLength || 2);
      setSecondaryWidth(currentProject.room.dimensions.secondaryWidth || 2);
      setPalette(currentProject.room.palette);
    }
    
    setIsEditing(!isEditing);
  };

  const handleColorChange = (property: keyof ColorPalette, color: string) => {
    setPalette({
      ...palette,
      [property]: color
    });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Room Configuration</h3>
        <button
          onClick={handleEditToggle}
          className={`px-3 py-1 text-sm font-medium rounded-md ${
            isEditing
              ? 'bg-green-600 hover:bg-green-700 text-white'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
          } transition-colors duration-200`}
        >
          {isEditing ? 'Save Changes' : 'Edit Room'}
        </button>
      </div>
      
      {isEditing ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Room Name
            </label>
            <input
              type="text"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Room Shape
            </label>
            <div className="grid grid-cols-3 gap-2">
              {roomShapes.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setShape(option.id)}
                  className={`border ${
                    shape === option.id
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-300 bg-white hover:bg-gray-50'
                  } rounded-md py-2 px-3 text-sm font-medium transition-colors duration-200`}
                >
                  {option.name}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Dimensions (meters)
            </label>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Length
                </label>
                <input
                  type="number"
                  min="1"
                  step="0.1"
                  value={length}
                  onChange={(e) => setLength(parseFloat(e.target.value))}
                  className="w-full border border-gray-300 rounded-md shadow-sm py-1 px-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Width
                </label>
                <input
                  type="number"
                  min="1"
                  step="0.1"
                  value={width}
                  onChange={(e) => setWidth(parseFloat(e.target.value))}
                  className="w-full border border-gray-300 rounded-md shadow-sm py-1 px-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Height
                </label>
                <input
                  type="number"
                  min="1"
                  step="0.1"
                  value={height}
                  onChange={(e) => setHeight(parseFloat(e.target.value))}
                  className="w-full border border-gray-300 rounded-md shadow-sm py-1 px-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
          
          {/* Additional dimensions for L-shaped rooms */}
          {shape === 'l-shape' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Secondary Section (meters)
              </label>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Length
                  </label>
                  <input
                    type="number"
                    min="1"
                    step="0.1"
                    value={secondaryLength}
                    onChange={(e) => setSecondaryLength(parseFloat(e.target.value))}
                    className="w-full border border-gray-300 rounded-md shadow-sm py-1 px-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Width
                  </label>
                  <input
                    type="number"
                    min="1"
                    step="0.1"
                    value={secondaryWidth}
                    onChange={(e) => setSecondaryWidth(parseFloat(e.target.value))}
                    className="w-full border border-gray-300 rounded-md shadow-sm py-1 px-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Color Palette
            </label>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Walls
                </label>
                <input
                  type="color"
                  value={palette.walls}
                  onChange={(e) => handleColorChange('walls', e.target.value)}
                  className="w-full h-8 rounded cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Floor
                </label>
                <input
                  type="color"
                  value={palette.floor}
                  onChange={(e) => handleColorChange('floor', e.target.value)}
                  className="w-full h-8 rounded cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Accent
                </label>
                <input
                  type="color"
                  value={palette.accent}
                  onChange={(e) => handleColorChange('accent', e.target.value)}
                  className="w-full h-8 rounded cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <div>
            <span className="text-sm font-medium text-gray-500">Name:</span>
            <span className="ml-2 text-gray-800">{currentProject.room.name}</span>
          </div>
          
          <div>
            <span className="text-sm font-medium text-gray-500">Shape:</span>
            <span className="ml-2 text-gray-800">
              {roomShapes.find(s => s.id === currentProject.room.shape)?.name}
            </span>
          </div>
          
          <div>
            <span className="text-sm font-medium text-gray-500">Dimensions:</span>
            <span className="ml-2 text-gray-800">
              {currentProject.room.dimensions.length}m × {currentProject.room.dimensions.width}m × {currentProject.room.dimensions.height}m
            </span>
          </div>
          
          {currentProject.room.shape === 'l-shape' && (
            <div>
              <span className="text-sm font-medium text-gray-500">Secondary Section:</span>
              <span className="ml-2 text-gray-800">
                {currentProject.room.dimensions.secondaryLength}m × {currentProject.room.dimensions.secondaryWidth}m
              </span>
            </div>
          )}
          
          <div className="mt-2">
            <span className="block text-sm font-medium text-gray-500 mb-1">Colors:</span>
            <div className="flex space-x-2">
              <div>
                <span className="block text-xs text-gray-500 mb-1">Walls</span>
                <div
                  className="h-6 w-10 rounded border border-gray-200"
                  style={{ backgroundColor: currentProject.room.palette.walls }}
                ></div>
              </div>
              <div>
                <span className="block text-xs text-gray-500 mb-1">Floor</span>
                <div
                  className="h-6 w-10 rounded border border-gray-200"
                  style={{ backgroundColor: currentProject.room.palette.floor }}
                ></div>
              </div>
              <div>
                <span className="block text-xs text-gray-500 mb-1">Accent</span>
                <div
                  className="h-6 w-10 rounded border border-gray-200"
                  style={{ backgroundColor: currentProject.room.palette.accent }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}