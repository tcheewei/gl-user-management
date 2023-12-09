export interface JsonData {
  events: Event[];
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export interface Membership {
  source_id: number;
  source_type: string;
  membership_level: number;
  status: string;
}

export interface Event {
  created: string;
  event_id: string;
  payload: {
    user_id: number;
    memberships: Membership[];
    oe_before: string;
    oe_after: string;
  };
}