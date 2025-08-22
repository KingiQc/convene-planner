import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-muted border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              ConvenePlanner
            </h3>
            <p className="text-muted-foreground mb-4">
              Your go-to platform for creating, managing, and discovering amazing events. 
              Connect with communities and build memorable experiences.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/events" className="text-muted-foreground hover:text-primary">
                  Browse Events
                </Link>
              </li>
              <li>
                <Link to="/my-events" className="text-muted-foreground hover:text-primary">
                  Create Event
                </Link>
              </li>
              <li>
                <Link to="/bookings" className="text-muted-foreground hover:text-primary">
                  My Bookings
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-foreground mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <a href="mailto:support@conveneplanner.com" className="text-muted-foreground hover:text-primary">
                  Contact Support
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; 2024 ConvenePlanner. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};