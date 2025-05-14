import React from 'react';
import { Sofa } from 'lucide-react';
import LoginForm from '../components/auth/LoginForm';

export default function Login() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center">
          <Sofa className="h-12 w-12 text-blue-600" />
        </div>
        <h1 className="mt-2 text-3xl font-bold text-gray-800">FurniVision</h1>
        <p className="mt-1 text-gray-600">The furniture designer's visualization tool</p>
      </div>
      
      <LoginForm />
      
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>For in-store use by design professionals.</p>
        <p className="mt-1">
          © 2025 FurniVision. All rights reserved.
        </p>
      </div>
    </div>
  );
}