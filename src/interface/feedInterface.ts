export interface IFeed {
  id: string;
  image: string;
  links: {
    id: string;
    image: string;
    url: string;
  }[];
  user: {
    userName: string;
    profilePic: string;
    isFollowing: boolean;
  };
  isMarked: boolean;
  trendCount: number;
  created_at: string;
}
