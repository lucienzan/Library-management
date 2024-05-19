import React from "react";
import Book from "../../assets/images/img_atomic_habits.jpg"
import { Resources } from "../../types/resources";

interface CardProps {
  data: Resources;
}

const Card: React.FC<CardProps> = ({ data }) => {
  return (
    <>
      <div
        className="block max-w-sm bg-white border overflow-hidden border-gray-200 rounded-2xl shadow"
      >
        <div className="h-[200px] relative overflow-hidden">
        <img src={Book} alt="Atomic habits book" className="bg-cover w-full bg-no-repeat bg-center" />
          <div className="absolute right-3 top-3 bg-white hover:bg-gray-100 transition-all cursor-pointer ease-linear bg-opacity-4 rounded-full p-2 shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
            className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
        </svg>
          </div>
        </div>
        <div className="p-5">
        <h5 className="mb-2 text-1xl font-bold tracking-tight text-gray-900 dark:text-white">
          {data.title}
        </h5>
          <div className="flex flex-wrap">
            {!!data.categories && data.categories.map((item,id) => {
              return <span className="bg-blue-300 text-sm p-1 px-3 rounded-full mx-1 my-1" key={id}>{ item }</span>
            })}
        </div>
        </div>
      </div>
    </>
  );
};

export default Card;
