import PostFrm from './components/postFrm'
import { Resources } from '../../types/resources'
import FetchCategories from '../../hooks/fetchCategories'
const PostCreate = () => {
  const { data: categories, loading, error } = FetchCategories("http://localhost:3000/categories");
  const PostCreateHandler = async (data: Resources) => {
    console.log(data);
  }

  return (
    <div className='max-w-screen-xl mx-auto p-4n mt-3 space-y-3'>
      <div className='w-2/5 mx-auto'>
        <PostFrm onSubmit={PostCreateHandler} pageName='create' categories={categories}/>
      </div>
    </div>
  )
}

export default PostCreate