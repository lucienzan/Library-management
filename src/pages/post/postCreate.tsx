import PostFrm from './components/postFrm'
import { Resources } from '../../types/resources'
import FetchCategories from '../../hooks/fetchCategories'
import FetchData from '../../hooks/fetchData';
const PostCreate = () => {
  const { data: categoryList } = FetchCategories("http://localhost:3000/categories");
  const { setPostData } = FetchData("http://localhost:3000/resources", "POST");

  const PostCreateHandler = async (data: Resources) => {
    const { categories } = data;
    categories.forEach(id => {
      const matchingItem = categoryList.find(item => id == item.id);
      if (matchingItem) {
        data.categories.splice(data.categories.indexOf(id),1,matchingItem.name);
      }
    });
    setPostData(data);
  }

  return (
    <div className='max-w-screen-xl mx-auto p-4n mt-3 space-y-3'>
      <div className='w-full p-[3.906vw] md:w-2/5 md:mx-auto md:p-0'>
        <PostFrm onSubmit={PostCreateHandler} pageName='create' categories={categoryList}/>
      </div>
    </div>
  )
}


export default PostCreate