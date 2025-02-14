interface ImageFormats {
  jpg: {
    image_url: string;
    small_image_url: string;
    large_image_url: string;
  };
  webp: {
    image_url: string;
    small_image_url: string;
    large_image_url: string;
  };
}

interface RecommendationEntry {
  mal_id: number;
  url: string;
  images: ImageFormats;
  title: string;
}

interface User {
  url: string;
  username: string;
}

interface RecentRecommendation {
  mal_id: string;
  entry: RecommendationEntry[];
  content: string;
  user: User;
}

interface Pagination {
  last_visible_page: number;
  has_next_page: boolean;
}

interface RecentRecommendationsApiResponse {
  data: RecentRecommendation[];
  pagination: Pagination;
}

export default RecentRecommendationsApiResponse;
