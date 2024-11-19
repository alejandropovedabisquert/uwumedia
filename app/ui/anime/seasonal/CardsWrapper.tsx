import CardList from "./CardList";
import { fetchSeasonalAnime } from "@/app/lib/data";

export async function CardsWrapper() {
    const seasonalList = await fetchSeasonalAnime();
    
    return (
        <>
            <CardList media_type="tv" data={seasonalList.data} />
            <CardList media_type="ona" data={seasonalList.data} />
            <CardList media_type="ova" data={seasonalList.data} />
            <CardList media_type="movie" data={seasonalList.data} />
            <CardList media_type="special" data={seasonalList.data} />
            <CardList media_type="tv_special" data={seasonalList.data} />
            <CardList media_type="music" data={seasonalList.data} />
        </>
    );
}

