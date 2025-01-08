import type { Image } from './image';
import type { Nullable } from '@/types/utils';

export type Team = {
  id: number;
  uuid: string;
  name: string;
  slug: string;
  shortName: Nullable<string>;
  abbreviation: Nullable<string>;
  logo: Nullable<string>;
  foundationYear: Nullable<number>;
  budget: Nullable<number>;
  leagueId: Nullable<number>;
  isActive: boolean;
  isVisible: boolean;
  images: Image[];
  createdAt: Date;
  updatedAt: Date;
};
