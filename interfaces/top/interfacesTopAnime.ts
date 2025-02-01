interface Anime {
    mal_id: number;
    title: string;
    url: string;
    rank: number;
    type: string;
    images: {
        jpg: {
        image_url: string;
        };
    };
    score: number;
    episodes: number;
    synopsis: string;
}

interface Pagination {
    last_visible_page: number;
    has_next_page: boolean;
    current_page: number;
}

interface TopAnimeApiResponse {
    pagination: Pagination;
    data: Anime[];
}

export default TopAnimeApiResponse;