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
  trendCount: string;
  created_at: string;
}
