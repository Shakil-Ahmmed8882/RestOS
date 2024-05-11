import Card from "./Card";
import { cardData } from "./data";

const ActivityFeed= () => {
  return (
    <>
  {/*
// v0 by Vercel.
// https://v0.dev/t/B6565mebyGy
*/}
  <section className="py-12 md:py-16 lg:py-20">
    <div className="px-4 md:px-6">
      <div className="mb-8 md:mb-10 lg:mb-12">
        <h2 className="text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl">
          Your Recent Likes &amp; Cooks
        </h2>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Check out the recipes you've recently liked or cooked.
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 space-y-6 md:grid-cols-2 lg:grid-cols-1">

      {
        cardData?.map(card => <Card key={card?.id} card={card}/>)
      }
      </div>
    </div>
  </section>
</>

  );
};

export default ActivityFeed; 




// large screen activitye feec

/*


        <div className="group relative rounded-lg ">
          <a className="absolute inset-0 z-10" href="#">
            <span className="sr-only">View recipe</span>
          </a>
          <img
            src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg"
            alt="Recipe Thumbnail"
            width={300}
            height={200}
            className="w-full  object-cover group-hover:scale-105 transition-transform duration-300"
            style={{ aspectRatio: "300 / 200", objectFit: "cover" }}
          />
          <div className="p-4 bg-white dark:bg-gray-950">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold tracking-tight">
                Creamy Garlic Shrimp Pasta
              </h3>
              <div className="flex items-center gap-1 text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5"
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
                <span className="text-sm">2 days ago</span>
              </div>
            </div>
            <p className="mt-2 text-gray-500 dark:text-gray-400 text-sm">
              A delicious and easy-to-make pasta dish.
            </p>
          </div>
        </div>


*/ 