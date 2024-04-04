import { useCallback, useEffect } from "react";
import classes from "./postForm.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormProps } from "../inretfaces";
import { useUpdateUserMutation } from "../../futuries/api/apiSlice";
import { User } from "../../futuries/userSlice/userSlice";
import toast from "react-hot-toast";
interface Props {
  id: number;
  name: string;
  image: string;
  description: string;
  onClose: () => void;
}

const EditForm = ({ description, id, image, name, onClose }: Props) => {
  const [updateUser] = useUpdateUserMutation();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    getValues,

    formState: { errors },
  } = useForm<FormProps>();

 const fileValue = watch("image");

  useEffect(() => {
    setValue("name", name);
    setValue("description", description);
    setValue("image", image);
  }, [setValue]);



  const handleImageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedImage = e.target.files && e.target.files[0];
      if (selectedImage) {
        const reader = new FileReader();
        reader.onload = () => {
          setValue("image", reader.result as string);
        };
        reader.readAsDataURL(selectedImage);
      }
    },
    [setValue, fileValue]
  );

  // const updateUsersData = useCallback(
  //   async (userData: User) => {
  //     await updateUser(userData );
  //     toast.success("Успешно редактировано!");
  //     onClose();
  //   },
  //   [onClose, toast]
  // );

//  useEffect(() => {
//    register("image");
//  }, [register]);

  const SubmitHandler: SubmitHandler<User> = (body: Partial<User>) => {
    handleImageChange
    const updatedData = {
      ...body,
      image: fileValue || getValues("image"), 
    };
    updateUser({ id, body:updatedData });
    onClose();
    toast.success("Пользователь успешно изменен", {
      position: "bottom-right",
      style: {
        backgroundColor: "#ECFDF5",
        padding: "1rem",
        color: "#065F46",
        fontFamily: "Roboto Medium",
      },
    });
  };

  //   const onSubmit:SubmitHandler<FormProps> = (data) => {
  // updateUsersData(d)
  //   }

  return (
    <form onSubmit={handleSubmit(SubmitHandler)} className={classes.form}>
      <div className={classes.form__content}>
        <div className={classes.form__header}>
          <h2 className={classes.form__title}>Редактировать</h2>
          <button className="pi pi-times" onClick={onClose}></button>
        </div>

        <div className={classes.form__input}>
          <label htmlFor="title" className={classes.form__label}>
            Title:
          </label>
          <input
            {...register("name", {
              required: true,
            })}
          />
          {errors?.name && <p>{errors?.name?.message}</p>}
        </div>
        <div className={classes.form__textarea}>
          <label className={classes.form__label} htmlFor="text">
            Text:
          </label>
          <textarea
            className={classes.form__textarea}
            {...register("description", {
              required: "Заполните это поле",
            })}
          />
        </div>
        <div className={classes.form__file}>
          <label className={classes.form__label} htmlFor="image">
            Image:
          </label>
          <input
            id="image"
            type="file"
            onChange={handleImageChange}
          />
          {watch("image") && (
            <img
              src={watch("image")}
              alt="Preview"
              style={{ width: 100, height: 100 }}
            />
          )}
        </div>
        <button className={classes.form__btn} type="submit">
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default EditForm;
