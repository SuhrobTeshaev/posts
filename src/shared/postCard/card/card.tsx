import classes from "./card.module.scss";

interface Props {
  id: number;
  image: string;
  description: string;
  name: string;
}
const CartModal = ({ id, name, description, image }: Props) => {
  return (
    <div className={classes.card}>
      <div className={classes.card__container} key={id}>
        <div className={classes.card__content}>
          <div className={classes.card__image}>
            <img src={image} alt="img" />
          </div>
          <div className={classes.card__info}>
            <h2 className={classes.card__info__title}>{name}</h2>
            <p className={classes.card__info__description}>{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
