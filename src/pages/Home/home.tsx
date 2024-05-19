import React from 'react'
import Search from '../../components/Search/search';
import Card from '../../components/Card/card';
import FetchData from '../../hooks/fetchData';
import { Resources } from '../../types/resources';
import Alert from '../../components/Alert/alert';

const Home : React.FC = () => {
  const { data, loading, error } = FetchData("http://localhost:3000/resources");
  if (error) {
    return (
      <>
        <Alert message="Fetching data error"/>
      </>
    )
  }
  return (
    <>
      <div className='max-w-screen-xl mx-auto p-4'>
        <Search />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {!!data && data.map((item:Resources) => {
            return <Card key={item.id} data={item} />
          })}
        </div>
      </div>
    </>
  )
}

export default Home;