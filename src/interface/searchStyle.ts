export interface ISearchStyle {
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
  trendCount: number;
  created_at: string;
}
