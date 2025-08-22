import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { EventCard } from '@/components/events/EventCard';
import { mockEvents, currentUser } from '@/lib/mockData';
import { Plus } from 'lucide-react';
import { Event } from '@/types';
import { useToast } from '@/hooks/use-toast';

export const MyEvents = () => {
  const [events, setEvents] = useState(mockEvents);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const { toast } = useToast();

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    max_attendees: ''
  });

  const userEvents = events.filter(event => 
    currentUser && (event.created_by === currentUser.id || currentUser.role === 'admin')
  );

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      date: '',
      location: '',
      max_attendees: ''
    });
  };

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    const newEvent: Event = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      date: new Date(formData.date).toISOString(),
      location: formData.location,
      created_by: currentUser.id,
      creator_name: currentUser.name,
      max_attendees: formData.max_attendees ? parseInt(formData.max_attendees) : undefined,
      current_attendees: 0
    };

    setEvents([...events, newEvent]);
    setIsCreateDialogOpen(false);
    resetForm();
    
    toast({
      title: "Event Created",
      description: `"${newEvent.title}" has been created successfully!`,
    });
  };

  const handleEditEvent = (eventId: string) => {
    const event = events.find(e => e.id === eventId);
    if (event) {
      setEditingEvent(event);
      setFormData({
        title: event.title,
        description: event.description,
        date: new Date(event.date).toISOString().slice(0, 16),
        location: event.location,
        max_attendees: event.max_attendees?.toString() || ''
      });
      setIsEditDialogOpen(true);
    }
  };

  const handleUpdateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEvent) return;

    const updatedEvent: Event = {
      ...editingEvent,
      title: formData.title,
      description: formData.description,
      date: new Date(formData.date).toISOString(),
      location: formData.location,
      max_attendees: formData.max_attendees ? parseInt(formData.max_attendees) : undefined,
    };

    setEvents(events.map(e => e.id === editingEvent.id ? updatedEvent : e));
    setIsEditDialogOpen(false);
    setEditingEvent(null);
    resetForm();
    
    toast({
      title: "Event Updated",
      description: `"${updatedEvent.title}" has been updated successfully!`,
    });
  };

  const handleDeleteEvent = (eventId: string) => {
    setEvents(events.filter(e => e.id !== eventId));
  };

  if (!currentUser) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Please Login</h1>
          <p className="text-muted-foreground">You need to login to manage your events.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">My Events</h1>
          <p className="text-muted-foreground">
            Create and manage your events
          </p>
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Event
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Event</DialogTitle>
              <DialogDescription>
                Fill in the details for your new event
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateEvent} className="space-y-4">
              <div>
                <Label htmlFor="title">Event Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="date">Date & Time</Label>
                <Input
                  id="date"
                  type="datetime-local"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="max_attendees">Max Attendees (optional)</Label>
                <Input
                  id="max_attendees"
                  type="number"
                  value={formData.max_attendees}
                  onChange={(e) => setFormData({...formData, max_attendees: e.target.value})}
                />
              </div>
              
              <div className="flex gap-2">
                <Button type="submit" className="flex-1">Create Event</Button>
                <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Event</DialogTitle>
            <DialogDescription>
              Update your event details
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUpdateEvent} className="space-y-4">
            <div>
              <Label htmlFor="edit-title">Event Title</Label>
              <Input
                id="edit-title"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="edit-date">Date & Time</Label>
              <Input
                id="edit-date"
                type="datetime-local"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="edit-location">Location</Label>
              <Input
                id="edit-location"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="edit-max_attendees">Max Attendees (optional)</Label>
              <Input
                id="edit-max_attendees"
                type="number"
                value={formData.max_attendees}
                onChange={(e) => setFormData({...formData, max_attendees: e.target.value})}
              />
            </div>
            
            <div className="flex gap-2">
              <Button type="submit" className="flex-1">Update Event</Button>
              <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Events Grid */}
      {userEvents.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>No Events Yet</CardTitle>
            <CardDescription>
              You haven't created any events yet. Click "Create Event" to get started!
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onEdit={handleEditEvent}
              onDelete={handleDeleteEvent}
              showActions={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};