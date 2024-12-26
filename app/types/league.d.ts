import type { Image } from './image';
import type { Nullable } from '@/types/utils';

export type League = {
  id: number;
  uuid: string;
  name: string;
  slug: string;
  abbr: Nullable<string>;
  country: Nullable<string>;
  city: Nullable<string>;
  logo: Nullable<string>;
  foundationYear: Nullable<number>;
  website: Nullable<string>;
  twitterHandle: Nullable<string>;
  instagramHandle: Nullable<string>;
  numberOfTeams: number;
  description: Nullable<string>;
  rules: Nullable<string>;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  isVisible: boolean;
  images: Image[];
};
