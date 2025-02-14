"use client";

import RecentAnimeReviewApiResponse from "@/interfaces/reviews/interfacesRecentAnimeReviews";
import { getRecentAnimeReviews } from "@/lib/reviews/getRecentAnimeReviews";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "./loading";
import { Separator } from "@/components/ui/separator"
import { formatDate, truncateTextV2 } from "@/app/common/utils";
import clsx from "clsx";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


export default function Page() {
    const [reviews, setReviews] = useState<RecentAnimeReviewApiResponse | null>(null);
    const [error, setError] = useState<string | null>(null);
    //No esta usando currentPage solo se usa setCurrentPage
    // const [, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const searchParams = useSearchParams();

    // Obtener los parámetros de la URL
    const page = searchParams.get("page") || "1";

    const preliminary = searchParams.get("preliminary") || "true";
    const spoilers = searchParams.get("spoilers") || "false";
    useEffect(() => {
        async function fetchPosts() {
            setIsLoading(true);
            try {
                const res = await getRecentAnimeReviews(Number(page), preliminary, spoilers);
                setReviews(res);
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
    }, [page, preliminary, spoilers]);
    console.log(reviews);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!reviews || isLoading) {
        return <Loading />;
    }

    console.log(reviews);

    return (
        <div>
            <div>
                <h1 className="font-bold text-2xl">Anime Reviews</h1>
            </div>
            <div>
                {reviews.data.map((review, index) => (
                    <div key={index}>
                        <div className="mt-4 mb-2">
                            <h1 className="text-xl font-bold text-corporative">{review.entry.title}</h1>
                        </div>
                        <div className="flex flex-wrap justify-between mb-2">
                            <div className="flex gap-2">
                                {
                                    review.tags.map((item, index) => (
                                        <p key={index} className={clsx("font-bold text-xs p-1 px-2 rounded-lg", {
                                            "text-destructive bg-destructive/30": item == "Not Recommended",
                                            "text-corporative bg-corporative/30": item == "Recommended",
                                            "text-purple-500 bg-purple-500/30": item == "Mixed Feelings",
                                            "text-green-600": item == "Preliminary",
                                        })}>{item}</p>
                                    ))
                                }
                            </div>
                            <div>
                                <p>{formatDate(review.date)}</p>
                            </div>
                        </div>
                        <div className="min-h-36">
                            <div className="break-all">
                                <Image className="float-right ml-8 mb-4 rounded-lg" src={review.entry.images.webp.image_url} alt={review.entry.title} width={150} height={150} unoptimized={true} />
                                <p dangerouslySetInnerHTML={ {__html: truncateTextV2(review.review, 1000)}}/>
                            </div>
                        </div>
                        <div className="my-4 flex flex-wrap justify-between">
                            <div>
                                <p className="font-semibold">Reviewer&apos;s rating: {review.score}</p>
                            </div>
                            <div>
                                {
                                    review.review.length >= 1000 ? (
                                        <p>Read more...</p>
                                    ) : (null)
                                }
                                
                            </div>
                        </div>
                        <div className="flex items-center my-4">
                            <Avatar className="w-20 h-20 mr-8 border-corporative border-2">
                                <AvatarImage src={review.user.images.webp.image_url} alt={review.user.username} />
                                <AvatarFallback>{review.user.username}</AvatarFallback>
                            </Avatar>
                            <p className="font-bold text-lg">{review.user.username}</p>
                        </div>
                        <Separator />
                    </div>
                ))}
            </div>
        </div>
    );
}