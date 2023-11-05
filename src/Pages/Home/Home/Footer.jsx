import { useTheme } from "next-themes";


const Footer = () => {
  const {theme} = useTheme()
  return (
    <div className={`h-[50vh] py-11 ${theme == "light" ? "bg-[#ffffff] " : "bg-[black] text-[white]"}`}>
    <footer className="footer flex justify-between max-w-5xl mx-auto">
      <div className="">
        <header className="footer-title">Services</header>
        <a className="link link-hover">Branding</a>
        <a className="link link-hover">Design</a>
        <a className="link link-hover">Marketing</a>
        <a className="link link-hover">Advertisement</a>
      </div>

      <div className="footer-column">
        <header className="footer-title">Company</header>
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact</a>
        <a className="link link-hover">Jobs</a>
        <a className="link link-hover">Press kit</a>
      </div>

      <div className="footer-column">
        <header className="footer-title">Legal</header>
        <a className="link link-hover">Terms of use</a>
        <a className="link link-hover">Privacy policy</a>
        <a className="link link-hover">Cookie policy</a>
      </div>
    </footer>
    </div>
  );
};

export default Footer;