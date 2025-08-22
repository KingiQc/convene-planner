import { User, Event, Booking } from '@/types';

export const mockUsers: User[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'admin' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'user' },
  { id: '3', name: 'Bob Wilson', email: 'bob@example.com', role: 'user' },
];

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Tech Conference 2024',
    description: 'Annual technology conference featuring the latest in AI and web development.',
    date: '2024-03-15T09:00:00Z',
    location: 'San Francisco Convention Center',
    created_by: '2',
    creator_name: 'Jane Smith',
    max_attendees: 500,
    current_attendees: 234
  },
  {
    id: '2',
    title: 'Workshop: React Best Practices',
    description: 'Hands-on workshop covering React development best practices and modern patterns.',
    date: '2024-03-20T14:00:00Z',
    location: 'Online',
    created_by: '3',
    creator_name: 'Bob Wilson',
    max_attendees: 50,
    current_attendees: 32
  },
  {
    id: '3',
    title: 'Startup Networking Event',
    description: 'Connect with fellow entrepreneurs and investors in the startup ecosystem.',
    date: '2024-03-25T18:00:00Z',
    location: 'Downtown Business Center',
    created_by: '2',
    creator_name: 'Jane Smith',
    max_attendees: 100,
    current_attendees: 67
  }
];

export const mockBookings: Booking[] = [
  {
    id: '1',
    event_id: '1',
    user_id: '3',
    booking_date: '2024-03-01T10:00:00Z',
    status: 'confirmed',
    event_title: 'Tech Conference 2024',
    event_date: '2024-03-15T09:00:00Z'
  },
  {
    id: '2',
    event_id: '3',
    user_id: '3',
    booking_date: '2024-03-02T15:30:00Z',
    status: 'confirmed',
    event_title: 'Startup Networking Event',
    event_date: '2024-03-25T18:00:00Z'
  }
];

// Simulated current user state
export let currentUser: User | null = mockUsers[1]; // Start as Jane Smith (user)

export const loginAsUser = (email: string, password: string): User | null => {
  const user = mockUsers.find(u => u.email === email);
  if (user && password === 'password') {
    currentUser = user;
    return user;
  }
  return null;
};

export const logout = () => {
  currentUser = null;
};