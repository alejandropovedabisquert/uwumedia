import RecentRecommendationsApiResponse from "@/interfaces/recomendations/interfacesRecentRecommendations";

export async function getRecentMangaRecommendations(page: number = 1): Promise<RecentRecommendationsApiResponse> {
    const url = `https://api.jikan.moe/v4/recommendations/manga?page=${page}`;

    const res = await fetch(url);
    if (!res.ok) {
        throw new Error('Error al obtener los datos');
    }
    const data = await res.json();
    return data;
}