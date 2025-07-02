import React, { useState, useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PostAgenticLayout from "./components/PostAgenticLayout";

const queryClient = new QueryClient();

const App = () => {
  const [user, setUser] = useState<{ email: string } | null>(null);

  // Check for existing session
  useEffect(() => {
    const savedUser = localStorage.getItem('ogma-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleAuthentication = (email: string) => {
    const userData = { email };
    setUser(userData);
    localStorage.setItem('ogma-user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('ogma-user');
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          {!user ? (
            <Landing onAuthenticated={handleAuthentication} />
          ) : (
            <PostAgenticLayout userEmail={user.email}>
              <Routes>
                <Route path="/" element={<Index onLogout={handleLogout} />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </PostAgenticLayout>
          )}
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
