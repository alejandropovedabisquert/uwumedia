import { fetchSeasonalAnime } from "@/app/lib/data";
import { CardsWrapper } from "@/app/ui/anime/seasonal/CardsWrapper";
import { SeasonSelector } from "@/app/ui/anime/seasonal/SeasonSelector";
import { redirect } from "next/navigation";

type PageProps = {
    params: { year: number; season: string };
};

export default async function Page({ params }: PageProps ) {
    const { year, season } = params;
        let seasonalList = [];

    try {
        seasonalList = await fetchSeasonalAnime(year, season);
    } catch (error) {
        throw new Error('Failed to fetch seasonal anime data.' + error);
    }


    if (seasonalList.error == "not_found") {
        redirect(`/anime/seasonal/`);
        return null
    }
    
    return (
        <>  
            <h1>{season} {year} Seasonal Animes</h1>
            <SeasonSelector/>
            <CardsWrapper seasonalList={seasonalList.data}/>
        </>
    );
}