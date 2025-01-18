export function CardSkeleton() {
  return (
    <div className="animate-pulse relative overflow-hidden w-full max-w-[45%] md:max-w-xs mb-4 md:mb-12 mx-0">
        <div className="bg-gray-200 w-full rounded-2xl h-60 md:h-96 px-4 md:px-8 pb-4 md:pb-8 pt-40"></div>
        <div className="z-10 top-0 right-0 h-8 w-full max-w-24 md:max-w-52 absolute bg-gray-300 flex flex-wrap py-2 px-4 rounded-bl-2xl rounded-tr-2xl"></div>
        <div className="rounded-3xl absolute bottom-[70px] left-[32px] w-full max-w-32 md:max-w-52 h-6 bg-gray-300"></div>
        <div className="rounded-3xl absolute bottom-[30px] left-[32px] w-full max-w-32 md:max-w-96 h-6 bg-gray-300"></div>
    </div>
  );
}

export function CardsSkeleton() {
  return (
    <div>
       <div className="animate-pulse rounded-3xl m-auto my-3 w-full max-w-4xl h-6 bg-gray-300"></div>
      <div className="flex flex-wrap justify-evenly">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
      <div className="animate-pulse rounded-3xl m-auto my-3 w-full max-w-4xl h-6 bg-gray-300"></div>
      <div className="flex flex-wrap justify-evenly">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    </div>
  );
}

