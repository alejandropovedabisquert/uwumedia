import { RelatedAnimeData } from "@/app/lib/definitions";
import RelatedAnime from "@/app/ui/anime/id/RelatedAnime/RelatedAnime";

export default function RelatedAnimeWrapper({data} : {data: RelatedAnimeData[]}) {
    return(
        <>
            <RelatedAnime anime={data} relation_type="sequel"/>
            <RelatedAnime anime={data} relation_type="prequel"/>
            <RelatedAnime anime={data} relation_type="side_story"/>
            <RelatedAnime anime={data} relation_type="summary"/>
            <RelatedAnime anime={data} relation_type="alternative_version"/>
            <RelatedAnime anime={data} relation_type="character"/>
            <RelatedAnime anime={data} relation_type="other"/>
        </>
    )
}