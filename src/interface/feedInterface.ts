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
  };
  isMarked: boolean;
  created_at: string;
}
