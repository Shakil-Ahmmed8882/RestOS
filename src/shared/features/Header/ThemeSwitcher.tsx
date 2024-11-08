// @ts-nocheck
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import sun from '../../../assets/img/icons8-sun-50 (1).png';
import moon from '../../../assets/img/icons8-moon-50.png';

function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div>
      {theme === "dark" ? (
        <button onClick={() => setTheme("light")}>
          <img className="w-7" src={sun} alt="Sun Icon" />
        </button>
      ) : (
        <button onClick={() => setTheme("dark")}>
          <img className="w-5" src={moon} alt="Moon Icon" />
        </button>
      )}
    </div>
  );
}

export default ThemeSwitcher;