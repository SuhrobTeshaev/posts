import { useCallback,  useRef, useState } from "react";
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
  onCardClick:(id:number)=>void;
  isActive:boolean;
}

const Card = ({ id, name, description, image, onCardClick,isActive }: Props) => {
  const [showEditForm, setShowEditForm] = useState(false);

  const editFormRef = useRef<HTMLDivElement>(null);

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

  // const handleEditClick = useCallback((event: any) => {
  //   event.stopPropagation();
  //   setShowEditForm(true);
  // }, []);

  // const handleCloseForm = useCallback(() => {
  //   setShowEditForm(false);
  // }, []);

  // // const handleInfoClick = useCallback(() => {
  // //   setShowCartModal(true);
  // // }, []);

  // const handleInfoClick = useCallback(() => {
  //   onCardClick(id);
  // }, [id, onCardClick]);

  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (
  //       cartModalRef.current &&
  //       !cartModalRef.current.contains(event.target as Node) &&
  //       !editFormRef.current?.contains(event.target as Node)
  //     ) {
  //       setShowCartModal(false);
  //     }
      
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);
  
  const handleEditClick = useCallback((event:any) => {
    event.stopPropagation();
    setShowEditForm(true);
  }, []);

  const handleCloseForm = useCallback(() => {
    setShowEditForm(false);
  }, []);

  const handleInfoClick = useCallback(() => {
    onCardClick(id);
  }, [id, onCardClick]);

  return (
    <div className={classes.card} key={id}>
      <div className={classes.card__content}>
        <div className={classes.card__image}>
          <img src={image} alt={name} />
        </div>
        <div className={classes.card__info} onClick={handleInfoClick}>
          <h2 className={classes.card__info__title}>{name}</h2>
          <p className={classes.card__info__description}>{description}</p>
        </div>
        <div className={classes.card__actions}>
          <button className="pi pi-pencil" onClick={handleEditClick}></button>
          <button className="pi pi-times" onClick={handleDelete}></button>
        </div>
      </div>

      {isActive && (
        <div ref={editFormRef}>
          <CartModal
            id={id}
            name={name}
            description={description}
            image={image}
          />
        </div>
      )}

      {showEditForm && (
        <div ref={editFormRef}>
          <EditForm
            id={id}
            description={description}
            name={name}
            image={image}
            onClose={handleCloseForm}
          />
        </div>
      )}
    </div>
  );
};

export default Card;
