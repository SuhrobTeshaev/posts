import classes from "./header.module.scss";
import logo from './../../../public/img/icons8-xmpp.svg'
import BtnDarkMode from "./../../shared/BtnDarkMode/btnDark";

const Header = () => {
 
 

  return (
    <header className={classes.header}>
      <div className={classes.header__content}>
        <div className={classes.header__logo}>
          <img src={logo} alt="logo" />
        </div>
        <nav className={classes.header__nav}>
          <ul className={classes.nav__list}>
            <li className={classes.nav__item}>
              <a href="/" className={classes.nav__link}>
                <span className="pi pi-home ">Главная</span>
              </a>
            </li>
            <li className={classes.nav__item}>
              <a href="#" className={classes.nav__link}>
                <span className="pi pi-users">О нас</span>
              </a>
            </li>
            <li className={classes.nav__item}>
              <a href="#" className={classes.nav__link}>
                <span className="pi pi-phone">Контакты</span>
              </a>
            </li>
          </ul>
        </nav>
        {/* <div className={classes.header__login}>
          <span className="pi pi-user"></span>
        </div> */}
        <BtnDarkMode />
      </div>
    </header>
  );
};

export default Header;
