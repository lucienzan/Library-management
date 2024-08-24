import { useParams } from 'react-router-dom';
import book from "../../assets/images/img_atomic_habits.jpg";
import { BookRepository } from "../../hooks/useFetchBook";

const Detail = () => {
  const { id } = useParams();
  //const { data: post, loading, error } = FetchData(`http://localhost:3000/resources/${id}`);
  const { data: post, loading, error } = BookRepository.useGetBook(id as string);
  return (
    <>
      {error && <p>Someing went wrong</p>}
      {loading && <p>Loading...</p>}
      {post && (
       <div className='max-w-screen-xl mx-auto p-4'>
        <div className='grid grid-cols-2'>
            <div>
              <img src={book} alt="book photo" width={250} height={250} className=' m-auto object-cover text-center' />
            </div>
            <div className='space-y-3'>
              <h3 className='font-bold text-3xl'>{post.title}</h3>
              <div className="flex flex-wrap space-x-2">
                {!!post.categories &&
                  post.categories.map((item, id) => {
                    return (
                      <span
                        className="bg-blue-300 text-sm p-1 px-3 rounded-full"
                        key={id}
                      >
                        {item}
                      </span>
                    );
                  })}
              </div>
              <p className='description'>{ post.description }</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Detail;