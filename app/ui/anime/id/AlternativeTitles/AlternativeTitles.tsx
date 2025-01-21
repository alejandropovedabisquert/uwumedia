import { AnimeNode } from "@/app/lib/definitions";
import { Titulo } from "@/app/ui/common/Titulo";

export default function AlternativeTitles({anime} : {anime: AnimeNode}) {
    const {
        alternative_titles,
    } = anime;
    return (
        <div className="mt-4">
            <Titulo as="h2" position="left" className="text-xl font-bold">Alternative Titles</Titulo>
            <div><span className="font-bold">Japanese:</span> {alternative_titles.ja}</div>
            <div><span className="font-bold">English:</span> {alternative_titles.en}</div>
            {/* <div>{anime.alternative_titles.synonyms}</div> Esto hay que hacerle un bucle */}
        </div>
    );
}