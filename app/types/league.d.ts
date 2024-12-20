import type { Image } from './image';

export type League = {
  id: number;
  uuid: string;
  name: string;
  slug: string;
  country: string | null;
  city: string | null;
  logo: string | null;
  foundationYear: number | null;
  website: string | null;
  twitterHandle: string | null;
  instagramHandle: string | null;
  numberOfTeams: number;
  description: string | null;
  rules: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  isVisible: boolean;
  images: Image[];
};
