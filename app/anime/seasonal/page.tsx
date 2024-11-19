import { CardsWrapper } from "@/app/ui/anime/seasonal/CardsWrapper";
import { CardsSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";
export default async function Page() {
    
    return (
        <main className="max-w-screen-2xl m-auto">
            <Suspense fallback={<CardsSkeleton/>}>
                <CardsWrapper/>
            </Suspense>
        </main>
    );
}