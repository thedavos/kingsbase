export type HomeCard = {
  id: string;
  heading: string;
  featureReady: boolean;
  to: string;
};

export type HomeCardList = HomeCard[];

export interface HomeCardProps {
  homeCard: HomeCard;
}

export interface HomeCardListProps {
  homeCards: HomeCardList;
}
