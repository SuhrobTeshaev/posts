import { memo, useCallback, useRef, useState } from "react";
import classes from "./postCard.module.scss";

import EditForm from "../postForm/updateForm";
import CartModal from "./card/card";
import toast from "react-hot-toast";
import { useDeleteUserMutation } from "../../futuries/api/apiSlice";
interface Props {
  id: number;
  name: string;
  description: string;
  image: string;
  onCardClick: (id: number) => void;
  isSelected: boolean;
  onClose: () => void;
  isActive:boolean;
}

const Card = memo(
  ({
    id,
    name,
    description,
    image,
    onClose,
    onCardClick,
    isSelected,
    isActive,
  }: Props) => {
    const [isOpenEdit, setIsOpenEdit] = useState(false);

    const cardRef = useRef<HTMLDivElement>(null);

    const openModalEdit = useCallback(() => {
      setIsOpenEdit(true);
    }, [setIsOpenEdit]);

    const closeModalEdit = useCallback(() => {
      setIsOpenEdit(false);
    },[setIsOpenEdit]);

    // const handleOutsideClick = useCallback(
    //   (e: React.MouseEvent) => {
    //     if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
    //       onClose();
          
    //     }
    //   },
    //   [cardRef, onClose]
    // );

    


    const [deleteUser] = useDeleteUserMutation();

    const handleDelete = useCallback(async () => {
      try {
        await deleteUser(id);
        toast.success("Пользователь успешно удален!", {
          position: "bottom-right",
          style: {
            backgroundColor: "#ECFDF5",
            padding: "1rem",
            color: "#065F46",
            fontFamily: "Roboto Medium",
          },
        });
      } catch (error) {
        toast.error("Ошибка удаления пользователя!");
      }
    }, [id, deleteUser]);


    return (
      <section>
        <div className={classes.card} key={id} ref={cardRef}>
          <div className={classes.card__content}>
            <div className={classes.card__image}>
              <img src={image} alt={name} />
            </div>
            <div className={classes.card__info} onClick={() => onCardClick(id)}>
              <h2 className={classes.card__info__title}>{name}</h2>
              <p className={classes.card__info__description}>{description}</p>
            </div>
            <div className={classes.card__actions}>
              <button className="pi pi-pencil" onClick={openModalEdit}></button>
              <button className="pi pi-times" onClick={handleDelete}></button>
            </div>
          </div>

          {isSelected && isActive && (
            <div className={classes.overlay} onClick={onClose}>
              <CartModal
                id={id}
                name={name}
                description={description}
                image={image}
              />
            </div>
          )}

          {isOpenEdit && (
            <div className={classes.overlay} onClick={closeModalEdit}>
              <EditForm
                id={id}
                description={description}
                name={name}
                image={image}
                onClose={closeModalEdit}
              />
            </div>
          )}
        </div>
      </section>
    );
  }
);

export default Card;
