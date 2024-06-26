import { useTheme } from "next-themes";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../../Utils/useAuthHelper";
import { useAxios } from "../../../../🔗Hook/useAxios";
import Swal from "sweetalert2";
import getCurrentDate from "../../../../Utils/Date/currentDate";
import { useGetData } from "../../../../🔗Hook/httpRequests";
import InfiniteSpinner from "../../../../Components/Shared/Spinner/InfiniteSpinner";


const UpdateFood = () => {
  const { theme } = useTheme();
  const { user } = useAuth();

  const goTo = useNavigate();
  const { id } = useParams();

  const xios = useAxios();
  const { data, isLoading } = useGetData({
    endpoint: `added-food?id=${id}`,
    key: ["get-single-food"],
  });

  if (isLoading) return <InfiniteSpinner></InfiniteSpinner>;

  const {
    _id,
    name,
    img,
    category,
    price,
    quantity,
    origin,
    description,
  } = data[0]


  const handleUpdate = (e) => {


    e.preventDefault();
    const form = new FormData(e.target);
    const data = Object.fromEntries(form);


    const updatedFoodWithDate = getCurrentDate("", data, user, "added_date");

    xios.put(`update-food/${_id}`, updatedFoodWithDate)
      .then((res)=> {
        if (res.data.modifiedCount > 0) {
          console.log(res.data)
          Swal.fire({
            title: "Updated!",
            text: "Press ok to go home!",
            icon: "success",
          });
          e.target.reset();
          goTo('/added-food')
        }
      })
      .catch((err) => console.log(err));
  };

  return (
<div
  className={`  md:flex ${
    theme == "dark" ? "bg-[black]" : "bg-[white]"
  }`}
>
  <div className="card flex-shrink-0  w-full flex-1 min-h-screen  justify-center ">
    <div className="flex flex-col justify-center">
      <form onSubmit={handleUpdate} className={``}>
        <div className="md:flex md:w-[800px] mx-3 md:mx-auto gap-8 justify-center " >
        <div className="flex-1">
        <div className="form-control w-full">
          <label className="label">
            <span
              className={`label-text ${
                theme == "dark" ? "text-[white]" : ""
              } py-2`}
            >
              Food Name
            </span>
          </label>
          <input
            type="text"
            placeholder="Name"
            defaultValue={name}
            name="name"
            // required // Marked as required
            className={`input input-bordered ${
              theme === "dark" ? "bg-[#3c3c3c20] text-[white]" : ""
            }`}
          />
        </div>
        {/* photo url */}
        <div className="form-control">
          <label className="label">
            <span
              className={`label-text ${
                theme == "dark" ? "text-[white]" : ""
              } py-2`}
            >
              Image URL
            </span>
          </label>
          <input
            type="text"
            placeholder="Food image URL"
            defaultValue={img}
            name="img"
            // // required // Marked as required
            className={`input input-bordered ${
              theme === "dark" ? "bg-[#3c3c3c20] text-[white]" : ""
            }`}
          />
        </div>
        {/* Category */}
        <div className="form-control">
          <label className="label">
            <span
              className={`label-text ${
                theme == "dark" ? "text-[white]" : ""
              } py-2`}
            >
              Category
            </span>
          </label>
          <input
            type="text"
            placeholder="Food Category"
            name="category"
            defaultValue={category}
            // // required // Marked as required
            className={`input input-bordered ${
              theme === "dark" ? "bg-[#3c3c3c20] text-[white]" : ""
            }`}
          />
        </div>

        {/* price*/}
        <div className="form-control">
          <label className="label">
            <span
              className={`label-text ${
                theme == "dark" ? "text-[white]" : ""
              } py-2`}
            >
              Price
            </span>
          </label>
          <input
            type="number"
            placeholder="price"
            name="price"
            defaultValue={price}
            // // required // Marked as required
            className={`input input-bordered ${
              theme === "dark" ? "bg-[#3c3c3c20] text-[white]" : ""
            }`}
          />
        </div>

        </div>
      <div className="flex-1">
          {/* Email */}
          <div className="form-control">
          <label className="label">
            <span
              className={`label-text ${
                theme == "dark" ? "text-[white]" : ""
              } py-2`}
            >
              Add by
            </span>
          </label>
          <input
            type="email"
            name="add_by"
            defaultValue={user?.email}
            readOnly
            // // required // Marked as required
            className={`input input-bordered ${
              theme === "dark" ? "bg-[#3c3c3c20] text-[white]" : ""
            }`}
          />
        </div>

        {/* Food origin */}
        <div className="form-control">
          <label className="label">
            <span
              className={`label-text ${
                theme == "dark" ? "text-[white]" : ""
              } py-2`}
            >
              Food origin
            </span>
          </label>
          <input
            type="text"
            placeholder="origin"
            defaultValue={origin}
            name="origin"
            // // required // Marked as required
            className={`input input-bordered ${
              theme === "dark" ? "bg-[#3c3c3c20] text-[white]" : ""
            }`}
          />
        </div>
        {/* Short description */}
        <div className="form-control">
          <label className="label">
            <span
              className={`label-text ${
                theme == "dark" ? "text-[white]" : ""
              } py-2`}
            >
              Short description
            </span>
          </label>
          <textarea
            className={`textarea textarea-secondary focus-within:outline-none ${
              theme === "dark" ? "bg-[#3c3c3c20] text-[white]" : ""
            }`}
            placeholder="Description"
            type="text"
            defaultValue={description}
            name="description"
            // // required // Marked as required
          ></textarea>
        </div>
                {/* quantity*/}
                <div className="form-control">
          <label className="label">
            <span
              className={`label-text ${
                theme == "dark" ? "text-[white]" : ""
              } py-2`}
            >
              Quantity
            </span>
          </label>
          <input
            type="number"
            placeholder="Quantity"
            name="quantity"
            defaultValue={quantity}
            // // required // Marked as required
            className={`input input-bordered ${
              theme === "dark" ? "bg-[#3c3c3c20] text-[white]" : ""
            }`}
          />
        </div>
      </div>

        </div>
        <div className={`md:w-[800px] mx-auto form-control mt-6`}>
          <button
            className={`btn ${
              theme == "dark"
                ? "bg-[white]"
                : "bg-primaryColor hover:bg-[#cb3890] text-[white]"
            }`}
            type="submit"
          >
            Add item
          </button>
        </div>
      </form>
    </div>
  </div>
</div>
  );
};

export default UpdateFood;
