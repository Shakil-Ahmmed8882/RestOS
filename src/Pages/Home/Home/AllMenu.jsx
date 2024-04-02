import { useTheme } from "next-themes";



const AllMenu = [

  {
    "_id": "6547c7272be3bd30058a4f0a",
    "foodName": "Spaghetti",
    "foodCategory": "Italian",
    "price": 12.99,
    "orders": null,
    "made_by": "Chef Mario",
  },
  {
    "_id": "6547c7272be3bd30058a4f0b",
    "foodName": "Sushi",
    "foodCategory": "Japanese",
    "price": 16.99,
    "orders": 150,
    "made_by": "Sushi Master Yuki",
  },
  {
    "_id": "6547c7272be3bd30058a4f0c",
    "foodName": "Chicken",
    "foodCategory": "Indian",
    "price": 14.99,
    "orders": 200,
    "made_by": "Chef Patel",
  },
  {
    "_id": "6547c7272be3bd30058a4f0d",
    "foodName": "Hamburger",
    "foodCategory": "American",
    "price": 8.99,
    "orders": 1,
    "made_by": "Grill Master Jack",
  },
  {
    "_id": "6547c7272be3bd30058a4f0e",
    "foodName": "Pad Thai",
    "foodCategory": "Thai",
    "price": 11.99,
    "orders": null,
    "made_by": "Chef Nong",
  },
];


function MenuList() {
const {theme} = useTheme()
  return (
    <div className={`lg:flex flex-col md:justify-center items-center min-h-screen  ${theme == 'dark'?'bg-[#212121] text-[white]':''}`}>
      <h1 className="text-3xl py-8 md:text-4xl text-center font-bold p-2">Menu Items Taken Before Ordering</h1>
      <ul className="grid grid-cols-2 px-3 bg-blend-multiply lg:flex justify-center  items-center  md:gap-20">
        {AllMenu.map((item) => (
          <li key={item._id} className={`${theme == 'dark'?'md:bg-[#0000005e] p-6 rounded-lg text-[white]':''} p-2`}>
            <h2 className={`${theme == 'dark'?'text-primaryColor':''} font-bold text-[18px] pb-2`}>{item.foodName}</h2>
            <p>
              <span>Category:</span> {item.foodCategory}
            </p>
            <p>
              <span>Price:</span> ${item.price}
            </p>
            <p>
              <span>Made by:</span> {item.made_by}
            </p>
            {item.orders !== null && (
              <p>
                <span>Orders:</span> {item.orders}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MenuList;