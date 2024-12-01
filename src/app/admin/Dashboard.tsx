
import Singleblog from '../../components/Singleblog';
import AdminPanel from '../../components/AdminPanel';
import { blogData } from '../../components/blogdata'
import { PiNotePencilLight } from 'react-icons/pi';
import { Link } from 'react-router';
import { useEffect, useState } from 'react';
import { getUserBlogsFromFirestore } from '../../services/blogServices';
import useAuth from '../../hooks/useAuth';

const Dashboard = () => {


  const { user } = useAuth()

  const [blogs, setBlogs] = useState([]);
    
  const handleBlogDelete = (blogId: string) => {
    setBlogs(prevBlogs => prevBlogs.filter(blog => blog.id !== blogId));
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      const data = await getUserBlogsFromFirestore(user?.uid as string);     
      if (data !== undefined) {
        setBlogs(data);
      }
    };
    fetchBlogs();
  }, []);

console.log(blogs);

  
  
  return (
    <div className='px-5 lg:px-0 md:px-4 lg:max-w-[55rem] mx-auto '>

      <AdminPanel />

      <div>
        <div className='flex items-center justify-between mb-6'>
          <p className='text-xl font-bold font-brand'>Posts ({blogs.length})</p>
          <Link to={'/admin/form'}>
            <button className='text-gray-600 hover:text-black inline-flex items-center gap-1 p-1'>
              <PiNotePencilLight size={28} />
              <p>Write New Blog</p>
            </button>
          </Link>
        </div>

        <div className='border-b-2'></div>

        <div>
          {blogs.map((blog, index) => (
            <Singleblog blog={blog} key={index} onDelete={handleBlogDelete} />
          ))}
       
        </div>
      </div>

      <div>

      </div>
    </div>
  )
}

export default Dashboard