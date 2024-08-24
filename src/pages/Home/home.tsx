import React, { useEffect, useState } from "react";
import Search from "../../components/Search/search";
import Card from "../../components/Card/card";
import { Resources } from "../../types/resources";
import Alert from "../../components/Alert/alert";
import { useNavigate } from "react-router-dom";
import { BookRepository } from "../../hooks/useFetchBook";
import { Response } from "../../constant/errorMessages";

const Home: React.FC = () => {
  //const { data, error } = FetchData("http://localhost:3000/resources");
  const { data, error } = BookRepository.useFetchBooks();

  const navigate = useNavigate();
  const [originalData, setOriginalData] = useState<Resources[]>([]);
  const [filteredData, setFilteredData] = useState<Resources[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (data != null) {
      setOriginalData(data as unknown as Resources[]);
    }
  }, [data]);

  useEffect(() => {
    const filtered = originalData.filter((item) => {
      return searchQuery === ""
        ? true
        : item.title.toLowerCase().includes(searchQuery.toLowerCase());
    });
    setFilteredData(filtered);
  }, [originalData, searchQuery]);

  if (error.length > 0) {
    return (
      <>
        <Alert message={error} />
      </>
    );
  }

  const showDetailPageHandler = (id: string) => {
    navigate(`/post/detail/${id}`);
  };

  const RemoveHandler = async (e: React.MouseEvent<HTMLImageElement>, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    const removeStatus = await BookRepository.useDeleteBook(id);
    if (removeStatus) {
      setOriginalData(prev => prev.filter(b => b.id != id));
    }
  }

  const findItem = (text: string) => {
    setSearchQuery(text.toLowerCase());
  };

  return (
    <>
      <div className="max-w-screen-xl mx-auto p-4">
        <Search SearchItem={findItem} />
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={() => navigate("post/create")}
        >
          Create
        </button>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {!!filteredData && filteredData.length > 0 ? (
            filteredData.map((item) => (
              <Card key={item.id} data={item} linkTo={showDetailPageHandler} removeCard={RemoveHandler} />
            ))
          ) : (
            <h1 className="col-span-2 md:col-span-4 text-center">
              {Response.message.emptyData}
            </h1>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
