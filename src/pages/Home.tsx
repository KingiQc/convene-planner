import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Users, MapPin, Plus } from 'lucide-react';
import { currentUser, mockEvents } from '@/lib/mockData';

export const Home = () => {
  const upcomingEvents = mockEvents.slice(0, 3);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center py-12 mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Welcome to ConvenePlanner
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Discover amazing events, connect with communities, and create memorable experiences. 
          Your ultimate event management platform.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/events">
            <Button size="lg" className="w-full sm:w-auto">
              <Calendar className="w-5 h-5 mr-2" />
              Browse Events
            </Button>
          </Link>
          {currentUser && (
            <Link to="/my-events">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                <Plus className="w-5 h-5 mr-2" />
                Create Event
              </Button>
            </Link>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Event Discovery
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Browse and discover events that match your interests. From tech conferences to networking meetups.
            </CardDescription>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Easy Booking
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Simple one-click booking system. Manage your registrations and get event updates.
            </CardDescription>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              Event Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Create and manage your own events. Track attendees and engagement effortlessly.
            </CardDescription>
          </CardContent>
        </Card>
      </section>

      {/* Upcoming Events */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-foreground">Upcoming Events</h2>
          <Link to="/events">
            <Button variant="ghost">View All Events →</Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingEvents.map((event) => (
            <Card key={event.id}>
              <CardHeader>
                <CardTitle className="text-lg">{event.title}</CardTitle>
                <CardDescription className="text-sm">
                  {new Date(event.date).toLocaleDateString()} • {event.location}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-4">
                  {event.description.slice(0, 100)}...
                </p>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>By {event.creator_name}</span>
                  <span>{event.current_attendees} attendees</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};