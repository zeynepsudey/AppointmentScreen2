export interface time {
    id: number; // Primary key with auto-increment
    time: string; // Time text representation (e.g., "10:00 AM")
    available: number; // Availability flag (true: available, false: unavailable)
  }
  export interface seat {
    id: number;
    seat: string;
    available: number;
  }
  export interface calendar {
    id: number;
    calendar: string;
  }
  export interface DailyStep {
    id?: number;
    date : string | undefined;
    step_count : number;
}
  export interface Students {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    available: number;
  }
  export interface Teachers {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    available: number;
  }
  export interface Appointments {
    id: number;
    date: string;
    time: string;
    teacherId: number;
    studentId: number;
    available: number;
  }
