import { memo } from "react";
import classes from "./card.module.scss";
import { createPortal } from "react-dom";

interface Props {
  id: number;
  image: string;
  description: string;
  name: string;
  
  
}

 const modalElement = document.getElementById('modal');

const CartModal = memo(({ id, name, description, image}: Props) => {

  return modalElement
    ? createPortal(
        
          <div className={classes.card}>
            <div
              className={classes.card__container}
              key={id}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={classes.card__content}>
                <div className={classes.card__image}>
                  <img src={image} alt="img" />
                </div>
                <div className={classes.card__info}>
                  <h2 className={classes.card__info__title}>{name}</h2>
                  <p className={classes.card__info__description}>
                    {description}
                  </p>
                </div>
              </div>
            </div>
         
        </div>,

        modalElement
      )
    : null;
});

export default CartModal;
