
import { fetchClient } from './client';

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

export interface Player {
  id: string;
  name: string;
  role: string;
  team: string;
  rating: string;
  kda: number;
  csm: number;
  kp: string;
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

export const InsightService = {
  getAll: () => fetchClient<InsightItem[]>('/insights'),
};

export const MatchService = {
  getAll: () => fetchClient<Match[]>('/matches'),
  getById: (id: string) => fetchClient<Match>(`/matches/${id}`),
  getRecent: (limit: number = 5) => fetchClient<Match[]>(`/matches?limit=${limit}`),
  upload: (formData: FormData) => fetchClient<Match>('/matches/upload', {
    method: 'POST',
    body: formData,
    // fetchClient typically handles JSON, for FormData we might need to handle headers carefully
    // Usually if body is FormData, browser sets Content-Type to multipart/form-data with boundary
    // We need to check if fetchClient overrides Content-Type
  }),
};

export const PlayerService = {
  getAll: () => fetchClient<Player[]>('/players'),
  getById: (id: string) => fetchClient<Player>(`/players/${id}`),
  getStats: (playerId: string) => fetchClient<any>(`/players/${playerId}/stats`),
};

export const ScrimService = {
  getAll: () => fetchClient<Scrim[]>('/scrims'),
  schedule: (data: { team_name: string; date: string; notes?: string }) => fetchClient<Scrim>('/scrims', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
};
