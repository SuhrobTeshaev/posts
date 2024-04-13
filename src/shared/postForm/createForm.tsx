import { memo, useCallback, useEffect, useState } from "react";
import classes from "./postForm.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormProps } from "../inretfaces";
import { useCreateUserMutation } from "../../futuries/api/apiSlice";
import toast from "react-hot-toast";
import { createPortal } from "react-dom";
interface Props {
  onClose: () => void;
}

const modalElement = document.getElementById("modal");
const CreatForm = memo(({ onClose }: Props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [createUser,{isError:isCreateError,isLoading:isCreateLoading,isSuccess:isCreateSuccess}] = useCreateUserMutation();
  const { register, handleSubmit } = useForm<FormProps>();

  const onSubmit: SubmitHandler<FormProps> = () => {
    sendDataToServer();
    onClose();
    toast.success("Пользователь успешно добавен!!", {
      position: "bottom-right",
      style: {
        backgroundColor: "#ECFDF5",
        padding: "1rem",
        color: "#065F46",
        fontFamily: "Roboto Medium",
      },
    });
  };

  const sendDataToServer = useCallback(() => {
    const userData = { name, description, image };
    createUser(userData);
  }, [name, description, image]);
  
  useEffect(() => {
    if (isCreateError) {
      toast.error("Ошибка при добавлении!");
    } else if(isCreateSuccess) {
      toast.success("Успешно добаылено!");
    }
  }, [isCreateError,isCreateSuccess]);

  const handleImageChange = useCallback((e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  },[]);

  if(isCreateLoading) {
    <div>Loading...</div>
  }

  return modalElement
    ? createPortal (
  
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        <div className={classes.form__content}>
          <div className={classes.form__header}>
            <h2 className={classes.form__title}>Добавить</h2>
            <button className="pi pi-times" onClick={onClose}></button>
          </div>
          <div className={classes.form__input}>
            <label htmlFor="title" className={classes.form__label}>
              Title:
            </label>
            <input
              id="title"
              type="text"
              value={name}
              {...(register("name"),
              {
                required: true,
              })}
              placeholder="name..."
              onChange={(e) => setName(e.target.value)}
            />
            {/* {errors?.name && (
            <div style={{ color: "yellow" }}>{errors.name.message}</div>
          )} */}
          </div>
          <div className={classes.form__textarea}>
            <label className={classes.form__label} htmlFor="text">
              Text:
            </label>
            <textarea
              className={classes.form__textarea}
              id="text"
              value={description}
              {...(register("description"),
              {
                required: true,
              })}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="text..."
            />
          </div>
          <div className={classes.form__file}>
            <label className={classes.form__label} htmlFor="image">
              Image:
            </label>
            <input
              id="image"
              type="file"
              {...(register("image"),
              {
                required: true,
              })}
              onChange={handleImageChange}
            />
            {image && (
              <img
                src={image}
                alt="Preview"
                style={{ width: 100, height: 100 }}
              />
            )}
          </div>
          <button className={classes.form__btn} type="submit">
            Save Changes
          </button>
        </div>
      </form>,

        modalElement
      )
    : null;
 
  
});

export default CreatForm;
