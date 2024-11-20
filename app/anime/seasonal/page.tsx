import { CardsWrapper } from "@/app/ui/anime/seasonal/CardsWrapper";
import { CardsSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";
export default async function Page() {
    
    return (
        <Suspense fallback={<CardsSkeleton/>}>
            <CardsWrapper/>
        </Suspense>
    );
}