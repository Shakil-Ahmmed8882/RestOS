

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
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-3xl py-8 md:text-5xl font-bold">Menu Items Taken Before Ordering</h1>
      <ul className="md:flex justify-center  items-center  md:gap-20">
        {AllMenu.map((item) => (
          <li key={item._id} className="space-y-2 ">
            <h2>{item.foodName}</h2>
            <p>
              <strong>Category:</strong> {item.foodCategory}
            </p>
            <p>
              <strong>Price:</strong> ${item.price}
            </p>
            <p>
              <strong>Made by:</strong> {item.made_by}
            </p>
            {item.orders !== null && (
              <p>
                <strong>Orders:</strong> {item.orders}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MenuList;