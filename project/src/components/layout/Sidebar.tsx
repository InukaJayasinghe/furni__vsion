import React, { useState } from 'react';
import { furnitureItems } from '../../data/sampleData';
import { useProject } from '../../contexts/ProjectContext';
import { FurnitureItem } from '../../types';
import { Plus, Monitor, Cuboid as Cube } from 'lucide-react';

export default function Sidebar() {
  const { addFurniture, setViewMode, viewMode } = useProject();
  const [activeTab, setActiveTab] = useState('catalog');
  const [furnitureType, setFurnitureType] = useState('all');

  const handleAddFurniture = (item: FurnitureItem) => {
    // Create a new instance of the furniture with a unique ID
    const newItem = {
      ...item,
      id: `${item.id}-${Date.now()}`,
      position: { x: 2, y: 2, rotation: 0 } // Default position
    };
    
    addFurniture(newItem);
  };

  const filteredFurniture = furnitureItems.filter(
    item => furnitureType === 'all' || item.type === furnitureType
  );

  return (
    <div className="w-64 h-full bg-white border-r border-gray-200 flex flex-col">
      {/* View mode toggle */}
      <div className="px-4 py-3 border-b border-gray-200">
        <div className="flex bg-gray-100 p-1 rounded-md">
          <button
            className={`flex-1 flex justify-center items-center py-1 px-2 rounded ${
              viewMode === '2d' ? 'bg-white shadow-sm' : 'text-gray-600'
            }`}
            onClick={() => setViewMode('2d')}
          >
            <Monitor className="h-4 w-4 mr-1" />
            <span className="text-sm font-medium">2D</span>
          </button>
          <button
            className={`flex-1 flex justify-center items-center py-1 px-2 rounded ${
              viewMode === '3d' ? 'bg-white shadow-sm' : 'text-gray-600'
            }`}
            onClick={() => setViewMode('3d')}
          >
            <Cube className="h-4 w-4 mr-1" />
            <span className="text-sm font-medium">3D</span>
          </button>
        </div>
      </div>
      
      {/* Sidebar tabs */}
      <div className="flex border-b border-gray-200">
        <button
          className={`flex-1 py-3 font-medium text-sm ${
            activeTab === 'catalog'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
          onClick={() => setActiveTab('catalog')}
        >
          Catalog
        </button>
        <button
          className={`flex-1 py-3 font-medium text-sm ${
            activeTab === 'projects'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
          onClick={() => setActiveTab('projects')}
        >
          Projects
        </button>
      </div>
      
      {/* Catalog tab content */}
      {activeTab === 'catalog' && (
        <>
          {/* Furniture type filter */}
          <div className="p-4 border-b border-gray-200">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Type
            </label>
            <select
              className="block w-full bg-gray-50 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={furnitureType}
              onChange={(e) => setFurnitureType(e.target.value)}
            >
              <option value="all">All Items</option>
              <option value="chair">Chairs</option>
              <option value="sofa">Sofas</option>
              <option value="table">Tables</option>
            </select>
          </div>
          
          {/* Furniture items */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="grid grid-cols-1 gap-3">
              {filteredFurniture.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-gray-200 rounded-md overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <div className="h-32 bg-gray-100 relative">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                    <button
                      onClick={() => handleAddFurniture(item)}
                      className="absolute bottom-2 right-2 bg-blue-600 hover:bg-blue-700 text-white p-1 rounded-full shadow-sm transition-colors duration-200"
                    >
                      <Plus className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="p-2">
                    <h3 className="font-medium text-gray-800 text-sm">{item.name}</h3>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-gray-500">
                        {item.width}m × {item.depth}m
                      </span>
                      <div
                        className="h-4 w-4 rounded-full border border-gray-300"
                        style={{ backgroundColor: item.color }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
      
      {/* Projects tab content */}
      {activeTab === 'projects' && (
        <div className="flex-1 overflow-y-auto p-4">
          <div className="text-sm text-gray-600">
            Projects tab content will go here
          </div>
        </div>
      )}
    </div>
  );
}