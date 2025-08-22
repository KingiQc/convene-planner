import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Trash2 } from 'lucide-react';
import { mockBookings, currentUser } from '@/lib/mockData';
import { Booking } from '@/types';
import { useToast } from '@/hooks/use-toast';

export const Bookings = () => {
  const [bookings, setBookings] = useState(mockBookings);
  const { toast } = useToast();

  const userBookings = bookings.filter(booking => 
    currentUser && booking.user_id === currentUser.id
  );

  const handleCancelBooking = (bookingId: string) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      setBookings(prevBookings => 
        prevBookings.filter(booking => booking.id !== bookingId)
      );
      
      toast({
        title: "Booking Cancelled",
        description: "Your booking has been cancelled successfully",
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'default';
      case 'pending':
        return 'secondary';
      case 'cancelled':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  if (!currentUser) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Please Login</h1>
          <p className="text-muted-foreground">You need to login to view your bookings.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">My Bookings</h1>
        <p className="text-muted-foreground">
          Manage your event registrations and bookings
        </p>
      </div>

      {userBookings.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>No Bookings Yet</CardTitle>
            <CardDescription>
              You haven't booked any events yet. Browse events to find something interesting!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <a href="/events">Browse Events</a>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {userBookings.map((booking) => (
            <Card key={booking.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">{booking.event_title}</CardTitle>
                    <CardDescription className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(booking.event_date)}
                      </span>
                    </CardDescription>
                  </div>
                  <Badge variant={getStatusColor(booking.status)}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    Booked on {formatDate(booking.booking_date)}
                  </div>
                  
                  {booking.status === 'confirmed' && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleCancelBooking(booking.id)}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Cancel Booking
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};