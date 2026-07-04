import { create } from 'zustand';
import api from '../api/client';

interface MilestoneInput {
  title: string;
  description: string;
  amountKobo: number;
  order: number;
}

interface CreateJobInput {
  title: string;
  description: string;
  providerEmail: string;
  milestones: MilestoneInput[];
}

export interface Job {
  _id: string;
  title: string;
  description: string;
  status: string;
  totalAmountKobo: number;
  heldAmountKobo: number;
  releasedAmountKobo: number;
  virtualAccountNumber?: string;
  virtualAccountBank?: string;
  clientId: { _id: string; name: string; email: string };
  providerId: { _id: string; name: string; email: string };
  createdAt: string;
}

export interface Milestone {
  _id: string;
  title: string;
  description: string;
  amountKobo: number;
  order: number;
  status: string;
  evidenceUrls: string[];
}

interface JobState {
  jobs: Job[];
  loading: boolean;
  fetchJobs: () => Promise<void>;
  createJob: (data: CreateJobInput) => Promise<Job>;
  fetchJob: (id: string) => Promise<{ job: Job; milestones: Milestone[] }>;
}

export const useJobStore = create<JobState>((set) => ({
  jobs: [],
  loading: false,

  fetchJobs: async () => {
    set({ loading: true });
    try {
      const { data } = await api.get('/jobs');
      set({ jobs: data.data.jobs, loading: false });
    } catch {
      set({ loading: false });
    }
  },

  createJob: async (jobData) => {
    const { data } = await api.post('/jobs', jobData);
    return data.data.job;
  },

  fetchJob: async (id) => {
    const { data } = await api.get(`/jobs/${id}`);
    return data.data;
  },
}));
