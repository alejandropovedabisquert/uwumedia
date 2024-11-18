import { fetchSeasonalAnime } from "@/app/lib/data";
import { CardsWrapper } from "@/app/ui/anime/seasonal/CardsWrapper";
export default async function Page() {
    const seasonalList = await fetchSeasonalAnime();
    return (
        <main className="max-w-screen-2xl m-auto">
                <CardsWrapper media_type="tv" data={seasonalList.data}/>
                <CardsWrapper media_type="ona" data={seasonalList.data}/>
                <CardsWrapper media_type="ova" data={seasonalList.data}/>
                <CardsWrapper media_type="movie" data={seasonalList.data}/>
                <CardsWrapper media_type="special" data={seasonalList.data}/>
                <CardsWrapper media_type="tv_special" data={seasonalList.data}/>
                <CardsWrapper media_type="pv" data={seasonalList.data}/>
                <CardsWrapper media_type="music" data={seasonalList.data}/>
        </main>
    );
}