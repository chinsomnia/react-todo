import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import homeIcon from '../public/img/homeIcon.png'

const NavBar = () => {
    return (
      <nav>
        <ul className={styles.flex}>
          <li>
            <Link to="/"><img src={homeIcon} alt="Home" /></Link> 
          </li>
          <li>
            <Link to="/about">About</Link> 
          </li>
          <li>
            <Link to="/contact">Contact</Link> 
          </li>
        </ul>
      </nav>
    );
  };

  export default NavBar;