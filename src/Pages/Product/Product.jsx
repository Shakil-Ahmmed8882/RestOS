const Product = () => {
    return (
        <>
  {/*
// v0 by Vercel.
// https://v0.dev/t/AY94UPwXOPi
*/}
  <section className="w-full py-12 md:py-24 lg:py-32">
    <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div className="grid gap-4 relative group">
        <a className="absolute inset-0 z-10" href="#">
          <span className="sr-only">View</span>
        </a>
        <img
          src="https://i.ibb.co/3hNBP6b/bg-leaf.png"
          alt="Basketball"
          width={450}
          height={500}
          className="rounded-lg object-cover w-full aspect-[3/4] group-hover:opacity-80 transition-opacity"
        />
        <div className="grid gap-1">
          <h3 className="font-semibold">Basketball</h3>
          <p className="text-sm leading-none">Styles made for your game.</p>
        </div>
        <p className="font-semibold underline underline-offset-4">Shop</p>
      </div>
      <div className="grid gap-4 relative group">
        <a className="absolute inset-0 z-10" href="#">
          <span className="sr-only">View</span>
        </a>
        <img
          src="https://images.pexels.com/photos/707251/pexels-photo-707251.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Running"
          width={450}
          height={500}
          className="rounded-lg object-cover w-full aspect-[3/4] group-hover:opacity-80 transition-opacity"
        />
        <div className="grid gap-1">
          <h3 className="font-semibold">Running</h3>
          <p className="text-sm leading-none">
            Everything you need for every mile.
          </p>
        </div>
        <p className="font-semibold underline underline-offset-4">Shop</p>
      </div>
      <div className="grid gap-4 relative group">
        <a className="absolute inset-0 z-10" href="#">
          <span className="sr-only">View</span>
        </a>
        <img
          src="https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=400"
          alt="Football"
          width={450}
          height={500}
          className="rounded-lg object-cover w-full aspect-[3/4] group-hover:opacity-80 transition-opacity"
        />
        <div className="grid gap-1">
          <h3 className="font-semibold">Football</h3>
          <p className="text-sm leading-none">
            Command the field in game-ready gear.
          </p>
        </div>
        <p className="font-semibold underline underline-offset-4">Shop</p>
      </div>
    </div>
  </section>
</>

    )
}


export default Product