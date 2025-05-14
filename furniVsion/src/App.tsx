import React, { useEffect } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ProjectProvider } from './contexts/ProjectContext';

function AppContent() {
  const { isAuthenticated, user, isLoading } = useAuth();

  useEffect(() => {
    // Update page title based on authentication state
    document.title = isAuthenticated 
      ? `FurniVision - ${user?.name}'s Dashboard` 
      : 'FurniVision - Designer Login';
  }, [isAuthenticated, user]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return isAuthenticated ? <Dashboard /> : <Login />;
}

function App() {
  return (
    <AuthProvider>
      <ProjectProvider>
        <AppContent />
      </ProjectProvider>
    </AuthProvider>
  );
}

export default App;