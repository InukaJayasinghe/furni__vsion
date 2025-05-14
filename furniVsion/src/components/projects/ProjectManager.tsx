import React, { useState } from 'react';
import { useProject } from '../../contexts/ProjectContext';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { Project, Room } from '../../types';

export default function ProjectManager() {
  const { savedProjects, loadProject, deleteProject, createProject } = useProject();
  const [showNewProject, setShowNewProject] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');

  const handleCreateProject = () => {
    if (newProjectName.trim()) {
      // Create a default room for the new project
      const newRoom: Room = {
        id: `room-${Date.now()}`,
        name: 'New Room',
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
      
      createProject(newProjectName, newRoom);
      setNewProjectName('');
      setShowNewProject(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Projects</h3>
        <button
          onClick={() => setShowNewProject(!showNewProject)}
          className="flex items-center px-3 py-1 text-sm font-medium rounded-md bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200"
        >
          <Plus className="h-4 w-4 mr-1" />
          New Project
        </button>
      </div>
      
      {showNewProject && (
        <div className="mb-4 p-3 bg-gray-50 border border-gray-200 rounded-md">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Project Name
          </label>
          <div className="flex">
            <input
              type="text"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              placeholder="Enter project name"
              className="flex-1 border border-gray-300 rounded-l-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            <button
              onClick={handleCreateProject}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-r-md transition-colors duration-200"
            >
              Create
            </button>
          </div>
        </div>
      )}
      
      {savedProjects.length === 0 ? (
        <p className="text-gray-500 text-sm p-2">No saved projects yet.</p>
      ) : (
        <div className="space-y-2">
          {savedProjects.map((project) => (
            <div
              key={project.id}
              className="flex justify-between items-center p-3 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="flex-1">
                <h4 className="text-gray-800 font-medium">{project.name}</h4>
                <p className="text-xs text-gray-500">
                  Last updated: {formatDate(project.updatedAt)}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => loadProject(project.id)}
                  className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors duration-200"
                  title="Load Project"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => deleteProject(project.id)}
                  className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors duration-200"
                  title="Delete Project"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}