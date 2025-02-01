import RecentAnimeReviewApiResponse from "@/interfaces/reviews/interfacesRecentAnimeReviews";

export async function getRecentAnimeReviews(page: number = 1, preliminary: boolean = true, spoilers: boolean = false): Promise<RecentAnimeReviewApiResponse> {
    let url = `https://api.jikan.moe/v4/reviews/anime?page=${page}`;

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