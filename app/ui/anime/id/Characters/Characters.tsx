import { CharacterNode } from "@/app/lib/definitions";


export default async function Characters({characters} : {characters: CharacterNode[]}) {;
        
        // const image_medium = main_picture?.medium || '/logos/logo-primary.svg';
    return (
        <div>
            {
                characters.map((character) => (
                    <div key={character.id}>
                        <h2>{character.first_name} {character.last_name}</h2>
                        <p>{character.biography}</p>
                    </div>
                ))
            }
        </div>
    );
}