import { useParams } from 'react-router-dom'
import PostFrm from './components/postFrm';
import FetchCategories from '../../hooks/useFetchCategories';
import { BookRepository } from '../../hooks/useFetchBook';
import { Resources } from '../../types/resources';

function PostEdit() {
  const { data: categoryList } = FetchCategories("http://localhost:3000/categories");
  const { id } = useParams();
  const { data } = BookRepository.useGetBook(id as string);
  const { updateBook  } = BookRepository.useUpdateBook();

  const PostCreateHandler = async (data: Resources) => {
    await updateBook(id as string, data);
  }

  return (
   <div className='max-w-screen-xl mx-auto p-4n mt-3 space-y-3'>
      <div className='w-full p-[3.906vw] md:w-2/5 md:mx-auto md:p-0'>
        {data && (
          <PostFrm onSubmit={PostCreateHandler} pageName='edit' categories={categoryList} defaultValue={data}/>
        )}
      </div>
    </div>
  )
}

export default PostEdit