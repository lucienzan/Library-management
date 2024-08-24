import PostFrm from './components/postFrm'
import { Resources } from '../../types/resources'
import FetchCategories from '../../hooks/useFetchCategories'
import { BookRepository } from '../../hooks/useFetchBook';

const PostCreate = () => {
  const { data: categoryList } = FetchCategories("http://localhost:3000/categories");
  //const { setPostData } = FetchData("http://localhost:3000/resources", "POST");
  const { setPostData } = BookRepository.useCreateBook();

  const PostCreateHandler = (data: Resources) => {
    setPostData(data);
  }

  return (
    <div className='max-w-screen-xl mx-auto p-4n mt-3 space-y-3'>
      <div className='w-full p-[3.906vw] md:w-2/5 md:mx-auto md:p-0'>
        <PostFrm onSubmit={PostCreateHandler} pageName='create' categories={categoryList} />
      </div>
    </div>
  )
}


export default PostCreate