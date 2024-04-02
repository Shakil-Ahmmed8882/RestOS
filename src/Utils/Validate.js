import toast from "react-hot-toast";

export const validate = (name, email, photo, password) => {
      // Input validation
      if (name === "") {
        toast.error("Please input your name");
        return true; // Return true to indicate an error
      }
    
      if (email === "") {
        toast.error("Please input your email");
        return true;
      }
    
      if (photo === "") {
        toast.error("Please input your photo url");
        return true;
      }
    
      if (password === "") {
        toast.error("Please input your password");
        return true;
      }
      if (password.length < 6) {
        toast.error("Password must be at least 6 characters long.");
        return true;
      }
    
      if (!/^(?=.*[A-Z]).*$/.test(password)) {
        toast.error("Password must contain at least one capital letter.");
        return true;
      }
      if (!/^[a-zA-Z0-9]*$/.test(password)) {
        toast.error("Password must contain at least one special character.");
        return true;
      }
    
      return false; 
    }
    