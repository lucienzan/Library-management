import React, { useEffect, useState } from "react";
import Search from "../../components/Search/search";
import Card from "../../components/Card/card";
import FetchData from "../../hooks/fetchData";
import { Resources } from "../../types/resources";
import Alert from "../../components/Alert/alert";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const { data, loading, error } = FetchData("http://localhost:3000/resources");

  const navigate = useNavigate();
  const [originalData, setOriginalData] = useState<Resources[]>([]);

  useEffect(() => {
    if (data != null) {
      setOriginalData(data);
    }
  }, [data]);

  if (error) {
    return (
      <>
        <Alert message="Fetching data error" />
      </>
    );
  }
  const showDetailPageHandler = (id: number) => {
    navigate(`/post/detail/${id}`);
  };
  return (
    <>
      <div className="max-w-screen-xl mx-auto p-4">
        <Search />
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={() => navigate("post/create")}
          >
          Create
        </button>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {!!originalData &&
            originalData.map((item) => {
              return (
                <Card
                  key={item.id}
                  data={item}
                  linkTo={showDetailPageHandler}
                />
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Home;
