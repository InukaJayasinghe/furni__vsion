import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useProject } from '../../contexts/ProjectContext';
import { Sofa, Save, LogOut } from 'lucide-react';

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const { currentProject, saveProject } = useProject();

  const handleSave = () => {
    if (currentProject) {
      saveProject();
    }
  };

  return (
    <header className="bg-white shadow-md py-3 px-6 sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Sofa className="h-8 w-8 text-blue-600 mr-2" />
          <h1 className="text-xl font-bold text-gray-800">FurniVision</h1>
        </div>
        
        {isAuthenticated && (
          <div className="flex items-center">
            {currentProject && (
              <button
                onClick={handleSave}
                className="flex items-center mr-4 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition-colors duration-200"
              >
                <Save className="h-4 w-4 mr-1" />
                Save
              </button>
            )}
            
            <div className="mr-4 text-gray-600">
              <span className="font-medium">{user?.name}</span>
            </div>
            
            <button
              onClick={logout}
              className="flex items-center text-gray-600 hover:text-red-600 transition-colors duration-200"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
}