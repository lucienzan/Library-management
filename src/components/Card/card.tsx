import React from "react";
import Book from "../../assets/images/img_atomic_habits.jpg";
import { Resources } from "../../types/resources";
import trash from "../../assets/icon/trash_ico.svg";
import pen from "../../assets/icon/pen_ico.svg";

interface CardProps {
  data: Resources;
  linkTo: (id: string) => void;
  removeCard: (e: React.MouseEvent<HTMLImageElement>, id: string) => void;
  editCard: (e: React.MouseEvent<HTMLImageElement>, id: string) => void;
}

const Card: React.FC<CardProps> = ({ data, linkTo, removeCard, editCard }) => {
  return (
    <>
      <div
        className="block max-w-sm bg-white border overflow-hidden border-gray-200 rounded-2xl shadow"
        onClick={() => linkTo(data.id)}
      >
        <div className="h-[200px] relative overflow-hidden">
          <img
            src={Book}
            alt="Atomic habits book"
            className="bg-cover w-full bg-no-repeat bg-center"
          />
          <div className="absolute right-3 top-3 bg-white hover:bg-gray-100 transition-all cursor-pointer ease-linear bg-opacity-4 rounded-full p-2 shadow-sm">
            <img src={pen} alt="edit pen" onClick={(e) => editCard(e,data.id)}/>
          </div>
        </div>
        <div className="p-5">
          <div className="flex justify-between items-center">
            <h5 className="mb-2 text-1xl font-bold tracking-tight text-gray-900 dark:text-white">
              {data.title}
            </h5>
            <img src={trash} alt="trash icon" onClick={(e) => removeCard(e,data.id)} />
          </div>
          <div className="flex flex-wrap">
            {!!data.categories &&
              data.categories.map((item, id) => {
                return (
                  <span
                    className="bg-blue-300 text-sm p-1 px-3 rounded-full mx-1 my-1"
                    key={id}
                  >
                    {item}
                  </span>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
