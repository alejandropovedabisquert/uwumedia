"use client";
import { useEffect, useState } from "react";
import Loading from "./loading";
import { useSearchParams } from "next/navigation";
import TopAnimeApiResponse from "@/interfaces/top/interfacesTopAnime";
import { getTopAnime } from "@/lib/top/getTopAnime";
import Image from "next/image";
import CategoryNavigation from "@/components/topAnime/categoryNavigation";
import TopAnimePagination from "@/components/topAnime/topAnimePagination";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { StarIcon } from "lucide-react";


export default function Page() {
    const [topAnimes, setTopAnimes] = useState<TopAnimeApiResponse | null>(null);
    const [error, setError] = useState<string | null>(null);
    //No esta usando currentPage solo se usa setCurrentPage
    const [, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const searchParams = useSearchParams();

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
                <CategoryNavigation setCurrentPage={setCurrentPage} />
            </div>
            <div>
                <Table>
                    {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Rank</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead className="text-right">Score</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {topAnimes.data.map((anime, index) => (
                            <TableRow key={index}>
                                <TableCell className="font-bold text-3xl">{anime.rank}</TableCell>
                                <TableCell className="flex flex-wrap gap-6">
                                    <div>
                                        <Image className="max-w-24" src={anime.images.jpg.image_url} alt={anime.title} width={300} height={300} unoptimized={false} />
                                    </div>
                                    <div>
                                        <h2 className="font-bold text-xl">
                                            {anime.title}
                                        </h2>
                                        {anime.type} {anime.episodes ?? 0} episodes
                                    </div>
                                    </TableCell>
                                <TableCell className="text-right">
                                    <p className="flex justify-end items-center">
                                        <StarIcon fill="yellow" />
                                        <span className="ml-4">
                                            {anime.score ?? "N/A"}
                                        </span>
                                    </p>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            {/* Botón para cargar más resultados */}
            <div>
                <TopAnimePagination
                    setCurrentPage={setCurrentPage}
                    topAnimesData={topAnimes}
                />
            </div>
        </div>
    );
}