interface Reactions {
    overall: number;
    nice: number;
    love_it: number;
    funny: number;
    confusing: number;
    informative: number;
    well_written: number;
    creative: number;
}

interface Images {
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

interface Entry {
    mal_id: number;
    url: string;
    images: Images;
    title: string;
}

interface UserImages {
    jpg: {
        image_url: string;
    };
    webp: {
        image_url: string;
    };
}

interface User {
    url: string;
    username: string;
    images: UserImages;
}

interface Review {
    mal_id: number;
    url: string;
    type: string;
    reactions: Reactions;
    date: string;
    review: string;
    score: number;
    tags: string[];
    is_spoiler: boolean;
    is_preliminary: boolean;
    episodes_watched: number | null;
    entry: Entry;
    user: User;
}

interface Pagination {
    last_visible_page: number;
    has_next_page: boolean;
    current_page: number;
}

interface RecentAnimeReviewApiResponse {
    pagination: Pagination;
    data: Review[];
}

export default RecentAnimeReviewApiResponse;
