import { Link } from "react-router-dom";

const MobileBreadCrump = () => {
  return (
    <div className="flex gap-3 flex-wrap justify-center">
      <Link className="btn" to="/profile">Profile</Link>
      <Link className="btn" to="/">Home</Link>
      <Link className="btn" to="/food">Food</Link>
      <Link className="btn" to="/blog">Blog</Link>
      <Link className="btn" to="/added-food">Added Food</Link>
      <Link className="btn" to="/add-food">Add Food</Link>
    </div>
  );
};

export default MobileBreadCrump;
