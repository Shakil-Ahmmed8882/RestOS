import { BiFork } from "react-icons/bi";
import { useTheme } from "next-themes";
import lightClock from '../../../assets/img/light-clock.gif'
import darkClock from '../../../assets/img/dark-clock.gif'

const Footer = () => {
  const {theme} = useTheme()
  return (
    <div className={`min-h-[50vh] relative py-11 my-11  ${theme == "light" ? "bg-[#e9e9e9]" : "bg-[#000000] text-[white]"}`}>
    <footer className="footer pl-4 flex-wrap flex md:justify-between max-w-5xl mx-auto">
      <div className="w-[190px]">
        <div className="flex gap-1 items-center">
          {
            theme == 'light'?
            <img className="w-[42px]" src={lightClock} alt="" />:
            <img className="w-[42px]" src={darkClock} alt="" />
          }
          <p className="flex font-bold items-center text-[19px]">
            <span className={` ${theme === "dark" ? "text-[white]" : ""}`}>
              Rest
            </span>
            <span className="text-primaryColor text-[18px]">OS</span>
          </p>
        </div>
        <header className="footer-title">Services</header>
        <a className="link link-hover">Menu</a>
        <a className="link link-hover">Reservations</a>
        <a className="link link-hover">Events</a>
        <a className="link link-hover">Catering</a>
      </div>

      <div className="footer-column w-[190px]">
        <header className="footer-title">About Us</header>
        <a className="link link-hover">Our Story</a>
        <a className="link link-hover">Contact</a>
        <a className="link link-hover">Careers</a>
        <a className="link link-hover">Press</a>
      </div>

      <div className="footer-column w-[190px] ">
        <header className="footer-title">Legal</header>
        <a className="link link-hover">Terms of Service</a>
        <a className="link link-hover">Privacy Policy</a>
        <a className="link link-hover">Cookies</a>
      </div>
      <div className="text-[#ff5cb047]">
                  <BiFork className="w-72 h-72 absolute top-11 right-11"></BiFork>
              </div>
    </footer>
    </div>
  );
};

export default Footer;