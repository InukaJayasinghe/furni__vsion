import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Project, Room, FurnitureItem, ViewMode } from '../types';
import { sampleProject } from '../data/sampleData';

interface ProjectContextType {
  currentProject: Project | null;
  savedProjects: Project[];
  viewMode: ViewMode;
  createProject: (name: string, room: Room) => void;
  updateProject: (project: Project) => void;
  saveProject: () => void;
  loadProject: (projectId: string) => void;
  deleteProject: (projectId: string) => void;
  addFurniture: (item: FurnitureItem) => void;
  updateFurniture: (item: FurnitureItem) => void;
  removeFurniture: (itemId: string) => void;
  setViewMode: (mode: ViewMode) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [savedProjects, setSavedProjects] = useState<Project[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>('2d');

  // Load saved projects from localStorage on initial render
  useEffect(() => {
    const projectsFromStorage = localStorage.getItem('savedProjects');
    if (projectsFromStorage) {
      setSavedProjects(JSON.parse(projectsFromStorage));
    } else {
      // Add sample project for demo purposes
      setSavedProjects([sampleProject]);
      localStorage.setItem('savedProjects', JSON.stringify([sampleProject]));
    }

    // Load the last active project if any
    const lastProject = localStorage.getItem('currentProject');
    if (lastProject) {
      setCurrentProject(JSON.parse(lastProject));
    } else {
      setCurrentProject(sampleProject);
    }
  }, []);

  // Create a new project
  const createProject = (name: string, room: Room) => {
    const newProject: Project = {
      id: `project-${Date.now()}`,
      name,
      room,
      furniture: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    setCurrentProject(newProject);
    localStorage.setItem('currentProject', JSON.stringify(newProject));
  };

  // Update project details
  const updateProject = (project: Project) => {
    const updatedProject = {
      ...project,
      updatedAt: new Date().toISOString()
    };
    
    setCurrentProject(updatedProject);
    localStorage.setItem('currentProject', JSON.stringify(updatedProject));
  };

  // Save the current project to the saved projects list
  const saveProject = () => {
    if (!currentProject) return;
    
    const updatedProject = {
      ...currentProject,
      updatedAt: new Date().toISOString()
    };
    
    const existingIndex = savedProjects.findIndex(p => p.id === updatedProject.id);
    
    let updatedProjects;
    if (existingIndex >= 0) {
      // Update existing project
      updatedProjects = [
        ...savedProjects.slice(0, existingIndex),
        updatedProject,
        ...savedProjects.slice(existingIndex + 1)
      ];
    } else {
      // Add new project
      updatedProjects = [...savedProjects, updatedProject];
    }
    
    setSavedProjects(updatedProjects);
    setCurrentProject(updatedProject);
    
    localStorage.setItem('savedProjects', JSON.stringify(updatedProjects));
    localStorage.setItem('currentProject', JSON.stringify(updatedProject));
  };

  // Load a saved project
  const loadProject = (projectId: string) => {
    const project = savedProjects.find(p => p.id === projectId);
    if (project) {
      setCurrentProject(project);
      localStorage.setItem('currentProject', JSON.stringify(project));
    }
  };

  // Delete a saved project
  const deleteProject = (projectId: string) => {
    const updatedProjects = savedProjects.filter(p => p.id !== projectId);
    setSavedProjects(updatedProjects);
    localStorage.setItem('savedProjects', JSON.stringify(updatedProjects));
    
    // If the current project is deleted, set to null
    if (currentProject?.id === projectId) {
      setCurrentProject(null);
      localStorage.removeItem('currentProject');
    }
  };

  // Add furniture to the current project
  const addFurniture = (item: FurnitureItem) => {
    if (!currentProject) return;
    
    const updatedProject = {
      ...currentProject,
      furniture: [...currentProject.furniture, item],
      updatedAt: new Date().toISOString()
    };
    
    setCurrentProject(updatedProject);
    localStorage.setItem('currentProject', JSON.stringify(updatedProject));
  };

  // Update furniture in the current project
  const updateFurniture = (item: FurnitureItem) => {
    if (!currentProject) return;
    
    const updatedFurniture = currentProject.furniture.map(f => 
      f.id === item.id ? item : f
    );
    
    const updatedProject = {
      ...currentProject,
      furniture: updatedFurniture,
      updatedAt: new Date().toISOString()
    };
    
    setCurrentProject(updatedProject);
    localStorage.setItem('currentProject', JSON.stringify(updatedProject));
  };

  // Remove furniture from the current project
  const removeFurniture = (itemId: string) => {
    if (!currentProject) return;
    
    const updatedFurniture = currentProject.furniture.filter(f => f.id !== itemId);
    
    const updatedProject = {
      ...currentProject,
      furniture: updatedFurniture,
      updatedAt: new Date().toISOString()
    };
    
    setCurrentProject(updatedProject);
    localStorage.setItem('currentProject', JSON.stringify(updatedProject));
  };

  return (
    <ProjectContext.Provider value={{
      currentProject,
      savedProjects,
      viewMode,
      createProject,
      updateProject,
      saveProject,
      loadProject,
      deleteProject,
      addFurniture,
      updateFurniture,
      removeFurniture,
      setViewMode
    }}>
      {children}
    </ProjectContext.Provider>
  );
}

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
};