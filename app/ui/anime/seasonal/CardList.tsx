import { AnimeData } from "@/app/lib/definitions";
import { Card } from "./Card";
import { Titulo } from "../../Titulo";

export default function CardList({ media_type, data }: { media_type: string, data: AnimeData[] }) {
    const filteredData = data.filter(list => list.node.media_type === media_type);
   
    return (
        <>
            {
                filteredData.length != 0 ?
                    <div>
                        <Titulo as="h1" position="center" className="text-2xl md:text-3xl font-bold w-7/12 mx-auto mb-4">{media_type}</Titulo>
                        <div className="flex flex-wrap justify-evenly">
                            {filteredData.map(item => <Card key={item.node.id} data={item} />)}
                        </div>
                    </div>
                    : null
            }
        </>

    );
}