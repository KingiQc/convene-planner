import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Users, Edit, Trash2 } from 'lucide-react';
import { Event } from '@/types';
import { currentUser } from '@/lib/mockData';
import { useToast } from '@/hooks/use-toast';

interface EventCardProps {
  event: Event;
  onBook?: (eventId: string) => void;
  onEdit?: (eventId: string) => void;
  onDelete?: (eventId: string) => void;
  showActions?: boolean;
}

export const EventCard = ({ event, onBook, onEdit, onDelete, showActions = true }: EventCardProps) => {
  const { toast } = useToast();
  
  const canEdit = currentUser && (currentUser.id === event.created_by || currentUser.role === 'admin');
  const canBook = currentUser && currentUser.id !== event.created_by;
  const isFullyBooked = event.max_attendees && event.current_attendees >= event.max_attendees;

  const handleBook = () => {
    if (onBook) {
      onBook(event.id);
      toast({
        title: "Booking Confirmed",
        description: `You've successfully booked "${event.title}"`,
      });
    }
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit(event.id);
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(event.id);
      toast({
        title: "Event Deleted",
        description: `"${event.title}" has been deleted`,
        variant: "destructive"
      });
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg mb-2">{event.title}</CardTitle>
            <CardDescription className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {formatDate(event.date)}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {event.location}
              </span>
            </CardDescription>
          </div>
          {isFullyBooked && (
            <Badge variant="destructive">Full</Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col">
        <p className="text-muted-foreground text-sm mb-4 flex-1">
          {event.description}
        </p>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
          <span>By {event.creator_name}</span>
          <span className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            {event.current_attendees}
            {event.max_attendees && ` / ${event.max_attendees}`}
          </span>
        </div>

        {showActions && (
          <div className="flex gap-2">
            {canBook && (
              <Button 
                className="flex-1" 
                onClick={handleBook}
                disabled={isFullyBooked}
              >
                {isFullyBooked ? 'Full' : 'Book Now'}
              </Button>
            )}
            
            {canEdit && (
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleEdit}>
                  <Edit className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={handleDelete}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};