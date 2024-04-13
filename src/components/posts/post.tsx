import { memo, useCallback, useState } from "react";
import "primeicons/primeicons.css";
import classes from "./post.module.scss";

import Card from "../../shared/postCard/postCard";
import CreatForm from "../../shared/postForm/createForm";
import { useGetUsersQuery } from "../../futuries/api/apiSlice";
import { useDebounce } from "../../shared/useDebounce/useDebounce";

const List = memo(() => {




  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpenCard, setIsOpenCard] = useState(false);
const [selectedCardId, setSelectedCardId] = useState<number|null>(null);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

const { data: usersData,isLoading,error:userDataError,isError} = useGetUsersQuery();

  const handleAddClick = useCallback(() => {
    setShowCreateForm(true);
  }, []);




const handleCloseForm = useCallback(() => {
  setShowCreateForm(false);
}, []);

   const handleCardClick = useCallback((cardId:number) => {
     setSelectedCardId(cardId);
     setIsOpenCard(true);
   }, []);

   const handleModalClose = useCallback(() => {
     setIsOpenCard(false);
   }, []);


  const filteredUsers =
    (searchTerm
      ? usersData?.filter((u) =>
          u.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
        )
      : usersData) || [];

  return (
    <main className={classes.main  }>
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
      {showCreateForm && (
        <>
          <div className={classes.overlay} onClick={handleCloseForm}></div>
          <CreatForm onClose={handleCloseForm} />
        </>
      )}

      {isError && userDataError !== undefined && (
        <h1>{(userDataError as any).error}</h1>
      )}
      {isLoading && <div>Loading...</div>}
      {filteredUsers.map((p) => (
        <Card
          key={p.id}
          id={p.id}
          name={p.name}
          description={p.description}
          image={p.image}
          onClose={handleModalClose}
          onCardClick={handleCardClick}
          isSelected={selectedCardId === p.id}
          isActive={isOpenCard}
        />
      ))}
    </main>
  );
});

export default List;
