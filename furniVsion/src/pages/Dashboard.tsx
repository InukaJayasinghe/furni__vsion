import React from 'react';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import Canvas2D from '../components/canvas/Canvas2D';
import Canvas3D from '../components/canvas/Canvas3D';
import RoomEditor from '../components/room/RoomEditor';
import ProjectManager from '../components/projects/ProjectManager';
import { useProject } from '../contexts/ProjectContext';

export default function Dashboard() {
  const { viewMode } = useProject();

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 flex overflow-hidden">
            {viewMode === '2d' ? <Canvas2D /> : <Canvas3D />}
          </div>
          <div className="h-64 p-4 border-t border-gray-200 bg-gray-50 overflow-y-auto">
            <div className="grid grid-cols-2 gap-4 h-full">
              <RoomEditor />
              <ProjectManager />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}