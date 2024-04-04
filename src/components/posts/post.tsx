import { useCallback, useEffect, useState } from "react";
import "primeicons/primeicons.css";
import classes from "./post.module.scss";
import  { Toaster } from "react-hot-toast";

import Card from "../../shared/postCard/postCard";
import CreatForm from "../../shared/postForm/createForm";
import { useGetUsersQuery } from "../../futuries/api/apiSlice";

const List = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

 const [activeCardId, setActiveCardId] = useState<number|null>(null);

const { data: usersData, isLoading, isError } = useGetUsersQuery(); 

const handleCardClick = (id:number) => {
  setActiveCardId(id);
};


useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    // Здесь должна быть логика для определения, был ли клик вне карточки
    if (!event.target) return;

    const target = event.target as HTMLElement;
    const clickedInsideCard = target.closest(".card"); // Используйте селектор класса вашей карточки

    if (!clickedInsideCard) {
      setActiveCardId(null); // Закрывает CartModal, если клик вне карточки
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);

  const handleAddClick = useCallback(() => {
    setShowCreateForm(true);
  }, []);

const handleCloseForm = useCallback(() => {
  setShowCreateForm(false);
}, []);




if (isLoading) return <div>Loading...</div>;
if (isError) return <div>Error occurred</div>;

  const filteredUsers = searchTerm
    ? usersData.filter((u) =>
        u.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : usersData;
  return (
    <main className={classes.main}>
      <Toaster />
      <div className={classes.main__header}>
        <div className={classes.main__search}>
          <input
            placeholder="search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="pi pi-search "></span>
        </div>
        <button
          className="pi pi-plus-circle bg-orange-500 w-40 h-10 mr-12 mt-4 rounded-xl"
          onClick={handleAddClick}
        ></button>
      </div>
      {showCreateForm && <CreatForm onClose={handleCloseForm} />}
      {filteredUsers.map((p) => (
        <Card
          key={p.id}
          id={p.id}
          name={p.name}
          description={p.description}
          image={p.image}
          onCardClick={handleCardClick}
          isActive={activeCardId === p.id}
        />
      ))}
    </main>
  );
};

export default List;
