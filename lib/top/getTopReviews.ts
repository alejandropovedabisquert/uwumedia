import RecentAnimeReviewApiResponse from "@/interfaces/reviews/interfacesRecentAnimeReviews";

export async function getTopReviews(page: number = 1, type?: string, preliminary?: string, spoilers?: string): Promise<RecentAnimeReviewApiResponse> {
    let url = `https://api.jikan.moe/v4/top/reviews?page=${page}`;

    if (type) {
        url += `&type=${type}`;
    }

    if (preliminary) {
        url += `&preliminary=${preliminary}`;
    }

    if (spoilers) {
        url += `&spoilers=${spoilers}`;
    }

    const res = await fetch(url);
    if (!res.ok) {
        throw new Error('Error al obtener los datos');
    }
    const data = await res.json();
    return data;
}