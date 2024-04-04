import classes from "./footer.module.scss";
import logo from './../../../public/img/icons8-xmpp.svg'

const Footer = () => {
  return (
    <div className={classes.footer}>
      <div className={classes.footer__content}>
        <div className={classes.footer__logo}>
          <a href="/">
                      <img src={logo} alt="logo" />

          </a>
          
        </div>

        {/* <nav className={classes.footer__nav}>
          <ul className={classes.nav__list}>
            <li className={classes.nav__item}>
              <a href="">
                <span className="pi pi-map-marker ">address</span>
              </a>
            </li>
            <li className={classes.nav__item}>
              <a href="">any quesions</a>
            </li>
            <li className={classes.nav__item}>
              <a href="">feedback</a>
            </li>
          </ul>
        </nav> */}
        <div>
          <i>Developed by </i>
        </div>
        <div className={classes.social}>
          <a href="https://github.com/SuhrobTeshaev " target="_block">
            <span className="pi pi-github "></span>
          </a>
          <a href=" https://tlgg.ru/suhrobtesha" target="_block">
            <span className="pi pi-telegram "></span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
