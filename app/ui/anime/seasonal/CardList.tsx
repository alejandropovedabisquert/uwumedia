import { AnimeData } from "@/app/lib/definitions";
import { Card } from "./Card";

export default function CardList({ media_type, data } : {media_type: string, data: AnimeData[]}) {
    const filteredData = data.filter(list => list.node.media_type === media_type);
   
    return (
        <div>
            <h1 className="uppercase text-2xl font-semibold md:text-3xl tracking-widest grid grid-cols-title grid-rows-title gap-6 before:content-[''] after:content-[''] before:block after:block before:border-b-2 after:border-b-2 before:border-secondary-color after:border-secondary-color w-full md:w-7/12 mx-auto mb-4">{media_type}</h1>
            <div className="flex flex-wrap justify-evenly">
                {filteredData.map(item => <Card key={item.node.id} data={item} />)}
            </div>
        </div>
    );
}