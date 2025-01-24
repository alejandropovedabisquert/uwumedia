import { AnimeNode } from "@/app/lib/definitions";
import { Titulo } from "@/app/ui/common/Titulo";

export default function AlternativeTitles({anime} : {anime: AnimeNode}) {
    const {
        alternative_titles,
    } = anime;
    return (
        <div className="mt-4">
            <Titulo as="h2" position="left" className="text-xl font-bold">Alternative Titles</Titulo>
            {
                alternative_titles.ja ? (
                    <div>
                        <span className="font-bold">Japanese:</span> {alternative_titles.ja}
                    </div>
                ): null
            }
            {
                alternative_titles.en ? (
                    <div>
                        <span className="font-bold">English:</span> {alternative_titles.en}
                    </div>
                ): null
            }
            
            {/* <div>{anime.alternative_titles.synonyms}</div> Esto hay que hacerle un bucle */}
        </div>
    );
}