"use client";
import { useEffect, useState } from "react";
import Loading from "./loading";
import { useSearchParams, useRouter } from "next/navigation";
import TopAnimeApiResponse from "@/interfaces/top/interfacesTopAnime";
import { getTopAnime } from "@/lib/top/getTopAnime";
import Image from "next/image";


const categories = [
    { name: "", label: "All Anime" },
    { name: "?filter=airing", label: "Top Airing" },
    { name: "?filter=upcoming", label: "Top Upcoming" },
    { name: "?type=tv", label: "Top TV Series" },
    { name: "?type=movie", label: "Top Movies" },
    { name: "?type=ova", label: "Top OVAs" },
    { name: "?type=ona", label: "Top ONAs" },
    { name: "?type=special", label: "Top Specials" },
    { name: "?type=music", label: "Top Music" },
    { name: "?type=cm", label: "Top CM" },
    { name: "?type=pv", label: "Top PV" },
    { name: "?type=tv_special", label: "Top TV Special" },
    { name: "?filter=bypopularity", label: "Most Popular" },
    { name: "?filter=favorite", label: "Most Favorted" },
];

export default function Page() {
    const [topAnimes, setTopAnimes] = useState<TopAnimeApiResponse | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const searchParams = useSearchParams();
    const router = useRouter();

    // Obtener los parámetros de la URL
    const page = searchParams.get("page") || "1";
    const type = searchParams.get("type") || undefined;
    const filter = searchParams.get("filter") || undefined;
    const rating = searchParams.get("rating") || undefined;
    const sfw = searchParams.get("sfw") === "true" ? true : undefined;

    useEffect(() => {
        async function fetchPosts() {
            setIsLoading(true);
            try {
                const res = await getTopAnime(Number(page), type, filter, rating, sfw);
                setTopAnimes(res);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An unexpected error ocurred');
                }
            } finally {
                setIsLoading(false);
            }
        }
        fetchPosts();
    }, [page, type, filter, rating, sfw]);

    // Función para cargar la siguiente página
    const loadNextPage = (page: number) => {
        setCurrentPage(page);
        let url = `/anime/top?page=${page}`;

        if (type) {
            url += `&type=${type}`;
        }

        // router.push(`/anime/top?page=${nextPage}&type=${type}&filter=${filter}&rating=${rating}&sfw=${sfw}`);
        router.push(url);
    };

    const loadTypeFilter = (type: string) => {
        const url = `/anime/top${type}`;
        setCurrentPage(1);
        router.push(url);
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!topAnimes || isLoading) {
        return <Loading />;
    }

    return (
        <div>
            <h1>Top Anime</h1>

            {/* Botones para filtrar por categoría */}
            <div>
                {categories.map((category, index) => (
                    <button key={index} className="mr-4 bg-slate-100" onClick={() => loadTypeFilter(category.name)}>
                        {category.label}
                    </button>
                ))}
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Title</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {topAnimes.data.map((anime, index) => (
                        <tr key={index}>
                            <td>{anime.rank}</td>
                            <td>
                                {anime.title}
                                <Image className="max-w-32" src={anime.images.jpg.image_url} alt={anime.title} width={300} height={300} unoptimized={false}/>
                                {anime.type} {anime.episodes ?? 0} episodes
                            </td>
                            <td>{anime.score ?? "N/A"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Botón para cargar más resultados */}
            {currentPage > 1 && (
                <button onClick={() => loadNextPage(currentPage - 1)} >
                    Previus page
                </button>
            )}
            {topAnimes.pagination.has_next_page && (
                <button onClick={() => loadNextPage(topAnimes.pagination.current_page + 1)} >
                    Next page
                </button>
            )}
        </div>
    );
}