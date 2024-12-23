import AdminPanel from '../../components/AdminPanel';
import { PiNotePencilLight } from 'react-icons/pi';
import { Link } from 'react-router';
import { useEffect, useState } from 'react';
import { deleteBlogFromFirestore, getUserBlogsFromFirestore } from '../../services/blogServices';
import useAuth from '../../hooks/useAuth';
import Skeleton from '../../components/Skeleton';
import { Blog } from '../../services/Blog.types';
import { BiMessageSquareDetail } from 'react-icons/bi';
import { GoHeart } from 'react-icons/go';
import { LuTrash2 } from 'react-icons/lu';
import { useQuery } from '@tanstack/react-query';

const Dashboard = () => {
	const { user } = useAuth()

	// const [blogs, setBlogs] = useState<Blog[]>([]);
	// const [loading, setLoading] = useState(true);
	// const [error, setError] = useState<string | null>(null);
	// const [isAuthor, setIsAuthor] = useState(false);

	// const handleBlogDelete = (blogId: string) => {
	// 	setBlogs(currentBlogs => currentBlogs.filter(blog => blog.id !== blogId));
	// };

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		const day = date.getDate().toString().padStart(2, '0');
		const month = date.toLocaleString('en-US', { month: 'short' });
		const year = date.getFullYear().toString();
		return `${month} ${day}, ${year}`;
	};


	const handleDeleteClick = async (event: React.MouseEvent<HTMLSpanElement>, blogId: string) => {
		// event.preventDefault();
		// event.stopPropagation();

		if (window.confirm('Delete this blog post?')) {
			try {
				await deleteBlogFromFirestore(blogId);
				// setBlogs(currentBlogs => currentBlogs.filter(blog => blog.id !== blogId));
			} catch (error) {
				console.error('Delete failed:', error);
			}
		}
	};

	// trying React Query
	const {data, isPending, isSuccess, isError, error} = useQuery({
		queryKey:['blogs'],
		queryFn:  () => getUserBlogsFromFirestore(user?.uid as string),
	})



	// useEffect(() => {
	// 	const fetchBlogs = async () => {
	// 		try {
	// 			setLoading(true);
	// 			setError(null);
	// 			const data = await getUserBlogsFromFirestore(user?.uid as string);
	// 			if (data !== undefined) {
	// 				setBlogs(data);
	// 			}
	// 		} catch (err) {
	// 			console.error('Error fetching blogs:', err);
	// 			setError('Failed to load blogs. Please try again.');
	// 		} finally {
	// 			setLoading(false);
	// 		}
	// 	};
	// 	if (user?.uid) {
	// 		fetchBlogs();
	// 	}
	// }, [user?.uid]);

	// console.log(blogs);
	

	const randomImageNumber = Math.floor(Math.random() * 5) + 1;
	const blogImage = `/blog${randomImageNumber}.jpg`;

	return (
		<div className='px-5 lg:px-0 md:px-4 lg:max-w-[55rem] mx-auto '>

			<AdminPanel />

			<div>
				<div className='flex items-center justify-between mb-6'>
					<p className='text-xl font-bold font-brand'>Posts ({data?.length})</p>
					<Link to={'/admin/form'}>
						<button className='text-gray-600 hover:text-black inline-flex items-center gap-1 p-1'>
							<PiNotePencilLight size={28} />
							<p>Write New Blog</p>
						</button>
					</Link>
				</div>

				<div className='border-b-2'></div>
				{error && (
					<div className="text-red-500 p-4 text-center">
						{error}
					</div>
				)}
				{isPending ? (
					<Skeleton />
				) : data?.length === 0 ? (
					<div className="text-center py-8 text-gray-600">
						No blogs found. Start writing your first blog!
					</div>
				) : (
					<div>
						{data?.map((blog, index) => (

							<Link to={`/blog/${blog?.id}`} key={index} >
								<div className='flex group py-5 gap-8 justify-between flex-row-reverse md:w-full transition-colors duration-200 cursor-pointer ease-in-out'>
									<img src={blogImage} className=' w-[100px] h-[60px] md:w-[160px] md:h-[100px] md:ml- border object-cover' alt="" />
									<div className='flex  flex-col  gap-3 w-full '>
										<h1 className='text-lg md:text-2xl lg:text-2xl leading-5 font-bold font-brand group-hover:underline'>{blog?.title}</h1>
										<h3 className='text-sm md:text-lg text-gray-500 line-clamp-2 font-blog font-normal leading-tight md:leading-none'>{blog?.summary}</h3>

										<div className='flex items-center justify-between mt-2 w-full '>


											<div className='flex items-center gap-4'>
												<img src='/avatar.jpg' className={`size-6 md:size-10 object-cover rounded-full cursor-pointer`} alt="" />
												<span className='flex justify-between flex-col gap-1'>
													<p className='text-xs'>{blog?.authorName}</p>
													<p className='text-xs text-gray-500'>{formatDate(blog?.createdAt)}</p>
												</span>
											</div>
											<div className='flex items-center gap-4'>
												<span className='flex items-center gap-2 cursor-pointer'  >
													<GoHeart size={24} color='gray' />
													<p className='text-sm font-blog'>{blog?.likes.length}</p>
												</span>
												<span className='flex items-center gap-2'>
													{
														<BiMessageSquareDetail size={24} color='gray' />
													}
													<p className='text-sm font-blog'>35</p>
												</span>
												<span className='text-xs p-2 rounded-full hover:bg-gray-200 text-gray-500'
													onClick={(e) => handleDeleteClick(e, blog.id as string)}>
														<LuTrash2 size={20} />
												</span>
											</div>

										</div>
									</div>
								</div>
								<div className='border-b border-gray-200'> </div>

							</Link>
						))}
					</div>
				)}
			</div>

			<div>

			</div>
		</div>
	)
}

export default Dashboard