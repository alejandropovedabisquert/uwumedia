import { AnimeData } from "@/app/lib/definitions";
import CardList from "@/app/ui/anime/Seasonal/Cards/CardList/CardList";

export function CardsWrapper({seasonalList} : {seasonalList: AnimeData[]}) {
    
    
    return (
        <>
            <CardList media_type="tv" data={seasonalList} />
            <CardList media_type="ona" data={seasonalList} />
            <CardList media_type="ova" data={seasonalList} />
            <CardList media_type="movie" data={seasonalList} />
            <CardList media_type="special" data={seasonalList} />
            <CardList media_type="tv_special" data={seasonalList} />
            <CardList media_type="music" data={seasonalList} />
        </>
    );
}

