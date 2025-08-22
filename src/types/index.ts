export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  created_by: string;
  creator_name: string;
  max_attendees?: number;
  current_attendees: number;
}

export interface Booking {
  id: string;
  event_id: string;
  user_id: string;
  booking_date: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  event_title: string;
  event_date: string;
}