import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { currentUser, logout } from '@/lib/mockData';
import { Calendar, Users, BookOpen, Shield, LogOut, LogIn } from 'lucide-react';

export const Navigation = () => {
  const location = useLocation();
  
  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="border-b bg-card">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold text-primary">
            ConvenePlanner
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/events" 
              className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary ${
                isActive('/events') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <Calendar className="w-4 h-4" />
              Events
            </Link>
            
            {currentUser && (
              <>
                <Link 
                  to="/my-events" 
                  className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary ${
                    isActive('/my-events') ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  My Events
                </Link>
                <Link 
                  to="/bookings" 
                  className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary ${
                    isActive('/bookings') ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  Bookings
                </Link>
                
                {currentUser.role === 'admin' && (
                  <Link 
                    to="/admin" 
                    className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary ${
                      isActive('/admin') ? 'text-primary' : 'text-muted-foreground'
                    }`}
                  >
                    <Shield className="w-4 h-4" />
                    Admin Panel
                  </Link>
                )}
              </>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {currentUser ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-muted-foreground">
                  {currentUser.name} ({currentUser.role})
                </span>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button variant="default" size="sm">
                  <LogIn className="w-4 h-4 mr-2" />
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};