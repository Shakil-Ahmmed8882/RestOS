// @ts-nocheck
import { useState } from "react";
import { Button, Input, Modal } from "antd";
import AddBlog from "./AddBlog";
import networkWithPeople from "../../../../assets/img/shared/Subscribe2.png";

const Header = () => {
  const [email, setEmail] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [emailError, setEmailError] = useState(false);

  // Validate email format
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle input change
  const handleInputChange = (e) => {
    setEmail(e.target.value);
    setEmailError(false); // Reset error on typing
  };

  // Handle subscribe click
  const handleSubscribe = () => {
    if (validateEmail(email)) {
      console.log("Email:", email);
      setIsModalVisible(true);
      
    } else {
      setEmailError(true);
    }
  };

  // Handle modal close
  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <article className="md:flex justify-between space-y-8 pt-11 pb-2">
      <div>
        <div className="flex items-start justify-between">
          <h1>Blog</h1>
          <AddBlog />
        </div>
        <article className="sm:w-[80%] lg:w-[60%]">
          <p className="description pt-8 md:pt-4">
            This is your creativity vault. Let's let the world know what's on
            your mind. The world needs your innovation.
          </p>

          <div className="flex justify-center h-10 sm:h-11 md:h-12 mt-11">
            <Input
              type="text"
              value={email}
              onChange={handleInputChange}
              className={`mt-auto rounded-l-lg border-r-0 rounded-r-none bg-[white] h-full focus-within:border-primaryColor hover:border-primaryColor ${
                emailError ? "border-red-500" : ""
              }`}
              placeholder="Enter your email"
            />
            <Button
              onClick={handleSubscribe}
              className="primaryGradient hover:!bg-primaryColor/80 hover:!text-[white] text-[white] border-none w-[30%] rounded-l-none rounded-r-lg h-full"
            >
              Subscribe
            </Button>
          </div>

          {/* Display error message if email is invalid */}
          {emailError && (
            <p className="text-red-500 text-sm mt-1">
              Please enter a valid email address.
            </p>
          )}
        </article>
      </div>

      {/* Modal for Thank You message */}
      <Modal
        visible={isModalVisible}
        onOk={handleModalClose}
        onCancel={handleModalClose}
        footer={null}
        className="relative"
      >
        <div className="relative">
          <img src={networkWithPeople} alt="" className="w-full " />

          {/* White gradient overlay with blur effect */}
          <div className="absolute bottom-0 w-full h-56 bg-[#fff] bg-opacity-70 backdrop-blur-lg"></div>

          {/* Text content overlay */}
          <div className="absolute inset-0 top-44 flex flex-col items-center justify-center text-center">
            <h1 className="text-3xl font-bold text-gray-800">
              Thanks for Subscribing!
            </h1>
            <p className="text-lg mt-3 text-gray-700">
              We're excited to have you on board! Stay tuned for our latest
              updates and insights directly to your inbox.
            </p>
          </div>
        </div>
      </Modal>
    </article>
  );
};

export default Header;
