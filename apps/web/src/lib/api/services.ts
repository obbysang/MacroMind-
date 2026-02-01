
import { fetchClient } from './client';

export interface User {
  id: number;
  email: string;
  is_active: boolean;
  is_superuser: boolean;
  full_name?: string;
  avatar?: string;
  grid_api_key?: string;
}

export interface Notification {
  id: number;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  is_read: boolean;
  created_at: string;
}

export interface Match {
  id: number;
  filename: string;
  upload_date: string;
  uploaded_by_id: number;
  processed: boolean;
  team1?: string;
  team2?: string;
  duration?: string;
  outcome?: string;
  game_version?: string;
}

export interface Scrim {
  id: number;
  team_name: string;
  date: string;
  notes?: string;
  is_confirmed: boolean;
  created_by_id: number;
}

export interface PlayerStat {
  label: string;
  value: number;
}

export interface Player {
  id: number;
  name: string;
  role: string;
  team: string;
  rating: string;
  kda: number;
  csm: number;
  kp: string;
  stats: PlayerStat[];
}

export interface InsightItem {
  id: string;
  time: string;
  game: string;
  role: string;
  title: string;
  description: string;
  impactValue: string;
  impactLabel: string;
  type: "positive" | "negative" | "neutral";
}

export const UserService = {
    getMe: () => fetchClient<User>('/users/me'),
    updateMe: (data: Partial<User>) => fetchClient<User>('/users/me', {
        method: 'PUT',
        body: JSON.stringify(data),
    }),
};

export const NotificationService = {
    getAll: (skip = 0, limit = 100) => fetchClient<Notification[]>(`/notifications/?skip=${skip}&limit=${limit}`),
    markAsRead: (id: number) => fetchClient<Notification>(`/notifications/${id}/read`, {
        method: 'PUT',
    }),
    create: (data: any) => fetchClient<Notification>('/notifications/', {
        method: 'POST',
        body: JSON.stringify(data),
    }),
};

export const InsightService = {
  getAll: () => fetchClient<InsightItem[]>('/insights/'),
};

export const MatchService = {
  getAll: () => fetchClient<Match[]>('/matches/'),
  getById: (id: string) => fetchClient<Match>(`/matches/${id}`),
  getRecent: (limit: number = 5) => fetchClient<Match[]>(`/matches/?limit=${limit}`),
  upload: (formData: FormData) => fetchClient<Match>('/matches/upload', {
    method: 'POST',
    body: formData,
    // fetchClient typically handles JSON, for FormData we might need to handle headers carefully
    // Usually if body is FormData, browser sets Content-Type to multipart/form-data with boundary
    // We need to check if fetchClient overrides Content-Type
  }),
};

export const PlayerService = {
  getAll: () => fetchClient<Player[]>('/players/'),
  getById: (id: string) => fetchClient<Player>(`/players/${id}`),
  getStats: (playerId: string) => fetchClient<any>(`/players/${playerId}/stats`),
};

export const ScrimService = {
  getAll: (upcoming?: boolean) => {
      let url = '/scrims/';
      if (upcoming !== undefined) {
          url += `?upcoming=${upcoming}`;
      }
      return fetchClient<Scrim[]>(url);
  },
  schedule: (data: { team_name: string; date: string; notes?: string; is_confirmed?: boolean }) => fetchClient<Scrim>('/scrims/', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: number, data: Partial<Scrim>) => fetchClient<Scrim>(`/scrims/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id: number) => fetchClient<Scrim>(`/scrims/${id}`, {
    method: 'DELETE',
  }),
};
