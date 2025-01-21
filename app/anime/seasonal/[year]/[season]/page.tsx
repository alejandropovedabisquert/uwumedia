import { fetchSeasonalAnime } from "@/app/lib/data";
import { CardsWrapper } from "@/app/ui/anime/Seasonal/Cards/CardWrapper/CardsWrapper";
import { SeasonSelector } from "@/app/ui/anime/Seasonal/SeasonSelector/SeasonSelector";
import { redirect } from "next/navigation";

type Params =Promise<{ 
    year: number;
    season: string;
}>;

export default async function Page({ params }: { params: Params } ) {
    const { year, season } = await params;
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