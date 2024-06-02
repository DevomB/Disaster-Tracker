import styles from "@/styles/Header.module.css";
import HamburgerIcon from "./HamburgerIcon";

const Header = ({ menu }) => {
  const [menuOpen, setMenuOpen] = menu;
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.titleWrapper}>
        <h1 className={styles.title}>Disaster Tracker</h1>
        <h1>(Powered By NASA)</h1>
        <h2>Devom Brahmbhatt and Aditya Donkada</h2>
      </div>
      <div className={styles.menu} onClick={toggleMenu}>
        <HamburgerIcon />
      </div>
    </header>
  );
};

export default Header;
