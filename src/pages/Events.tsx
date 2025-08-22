import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { EventCard } from '@/components/events/EventCard';
import { mockEvents, mockBookings, currentUser } from '@/lib/mockData';
import { Search, Filter } from 'lucide-react';

export const Events = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [events, setEvents] = useState(mockEvents);

  const filteredEvents = events.filter(event => 
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedEvents = [...filteredEvents].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case 'title':
        return a.title.localeCompare(b.title);
      case 'attendees':
        return b.current_attendees - a.current_attendees;
      default:
        return 0;
    }
  });

  const handleBookEvent = (eventId: string) => {
    if (!currentUser) return;
    
    // Check if already booked
    const alreadyBooked = mockBookings.some(
      booking => booking.event_id === eventId && booking.user_id === currentUser.id
    );
    
    if (alreadyBooked) {
      alert('You have already booked this event!');
      return;
    }
    
    // Add to bookings (in a real app, this would be an API call)
    const event = events.find(e => e.id === eventId);
    if (event) {
      mockBookings.push({
        id: Date.now().toString(),
        event_id: eventId,
        user_id: currentUser.id,
        booking_date: new Date().toISOString(),
        status: 'confirmed',
        event_title: event.title,
        event_date: event.date
      });
      
      // Update attendee count
      setEvents(prevEvents => 
        prevEvents.map(e => 
          e.id === eventId 
            ? { ...e, current_attendees: e.current_attendees + 1 }
            : e
        )
      );
    }
  };

  const handleDeleteEvent = (eventId: string) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      setEvents(prevEvents => prevEvents.filter(e => e.id !== eventId));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">All Events</h1>
        <p className="text-muted-foreground">
          Discover and book amazing events happening in your area and online.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Sort by..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date">Date</SelectItem>
            <SelectItem value="title">Title</SelectItem>
            <SelectItem value="attendees">Attendees</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Events Grid */}
      {sortedEvents.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No events found matching your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onBook={handleBookEvent}
              onDelete={handleDeleteEvent}
            />
          ))}
        </div>
      )}
    </div>
  );
};