
import { useParams } from 'react-router';
import { useContext, useEffect, useState } from 'react';
import { getBlogById, getBlogsByTagsFromFirestore, getBlogsFromFirestore, toggleLike } from '../services/blogServices';
import { parse } from 'node-html-parser';
import useAuth from '../hooks/useAuth';
import { GoHeart, GoHeartFill, GoShare } from 'react-icons/go';
import { BiMessageSquareDetail } from 'react-icons/bi';
import toast, { Toaster } from 'react-hot-toast';
import CommentBox from '../components/CommentBox';
import { GetStartedContext } from '../contexts/GetStarted';
import { PiShareFat, PiShareFatLight } from 'react-icons/pi';
import { useQuery } from '@tanstack/react-query';
import Gridblog from '../components/Gridblog';


const contentInnerHtml: string = '[&_h1]:text-3xl ' +
    ' [&_h1]:font-bold ' +
    '[&_h1]:mb-3 ' +
    ' [&_h2]:text-2xl ' +
    '[&_h2]:font-semibold ' +
    '[&_h2]:mb-2 ' +
    '[&_p]:md:text-xl ' +
    '[&_p]:text-normal ' +
    ' [&_img]:mx-auto ' +
    '[&_img]:my-4 '
const Blog = () => {

    const { id } = useParams<{ id: string }>();
    const { user, userDetail } = useAuth();
    const [blog, setBlog] = useState<any>(null);
    const [recommendedBlogs, setRecommendedBlogs] = useState<any>([]);
    const [moreBlogs, setMoreBlogs] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    const [isLiked, setIsLiked] = useState(false);
    const [commentBoxOpen, setCommentBoxOpen] = useState(false)
    const { setOpenGetStarted } = useContext(GetStartedContext);
    const [isAnimating, setIsAnimating] = useState(false);


    // this method returns the whole promise
    // useEffect(() => {
    //     const data = getBlogById(id as string);
    //     setBlog(data);
    //  },[id])

    const content = blog?.body ? parse(blog.body) : null;
    // Render the parsed HTML content
    const renderContent = () => {
        if (!content) return null;
        return <div dangerouslySetInnerHTML={{ __html: content.toString() }} />;
    };

    useEffect(() => {
        const fetchBlog = async () => {
            setLoading(true);
            const data = await getBlogById(id as string);
            setBlog(data);
            setLoading(false);
        };
       
        fetchBlog();
        
    }, [id]);

    useEffect(() => {
        const fetchRecommendedBlogs = async () => {
            if (blog?.tags && blog.tags.length > 0) {
                const tag = blog.tags[0]; // Get first tag
                const recommendedData = await getBlogsByTagsFromFirestore(tag);
                // Filter out the current blog from recommendations
                const filteredBlogs = recommendedData?.filter((recBlog: any) => recBlog.id !== id);
                setRecommendedBlogs(filteredBlogs);
            }
        };
        const fetchmoreBlogs = async () => {
            const data = await getBlogsFromFirestore();
            setMoreBlogs(data);
        };

    
        if (blog) {
            fetchRecommendedBlogs();
            fetchmoreBlogs();
        }
    }, [blog, id]);
    

    console.log("tagblogs: ",recommendedBlogs);

    // When blog loads, we check if current user has liked it:
    useEffect(() => {
        if (blog && user) {
            setIsLiked(blog.likes.includes(user.uid)); // if blog's likes array includes current user's uid set isLiked to true
        }
    }, [blog, user]);

    const handleLike = async () => {
        if (!user) {setOpenGetStarted(true); return}

        if (!isLiked) {
            setIsAnimating(true);
            // Reset animation after a short delay
            setTimeout(() => setIsAnimating(false), 700);
        }
        // Call Firestore update
        await toggleLike(id as string, user?.uid ?? '');

        // Update local UI state
        setIsLiked(!isLiked);
        

        // Update blog state immediately
        setBlog((prev: any) => {
            if (!prev) return prev; // Ensure prev is not null or undefined

            const isAlreadyLiked = prev.likes.includes(user?.uid);
            const updatedLikes = isAlreadyLiked
                ? prev.likes.filter((id: string) => id !== user?.uid) // Remove like
                : [...prev.likes, user?.uid]; // Add like
            return {
                ...prev,
                likes: updatedLikes
            };
        });
    };

    const handleShare = async () => {
        const blogUrl = window.location.href;
        try {
            await navigator.clipboard.writeText(blogUrl);
            toast('Blog URL Copied!',{
                icon: '📋',
            });
        } catch (err) {
            toast.error('Failed to copy URL');
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = date.toLocaleString('en-US', { month: 'short' });
        const year = date.getFullYear().toString();
        return `${month} ${day}, ${year}`;
    };

 
   

    if (loading) {
        return (
            <div className='px-7 lg:px-0 md:px-10 lg:max-w-[50rem] mt-7 mx-auto animate-pulse'>
                <div className='bg-gray-100  w-full h-10 rounded-xl'></div>
                <div className='bg-gray-100  w-full h-3 mt-6 rounded-md'></div>
                <div className='bg-gray-100  w-2/3 h-3 mt-6 rounded-md'></div>
                <div className='flex items-center gap-2 mt-10 '>
                    <span className='bg-gray-100 size-14 rounded-full '></span>
                    <span className='bg-gray-100 h-2 rounded-full w-1/4  '></span>
                </div>
                <div className='bg-gray-50 p-10 w-full space-y-6 h-[550px] mt-6 rounded-md'>
                    <div className='bg-gray-100  w-full h-3 rounded-lg'></div>
                    <div className='bg-gray-100  w-full h-3 rounded-lg'></div>
                    <div className='bg-gray-100  w-full h-3 rounded-lg'></div>
                    <div className='bg-gray-100  w-full h-3 rounded-lg'></div>
                    <div className='bg-gray-100  w-full h-3 rounded-lg'></div>
                    <div className='bg-gray-100  w-full h-40 rounded-lg'></div>
                </div>
            </div>
        )
    }



    return (
        <div className='px-7 lg:px-0 md:px-10 lg:max-w-[53rem] mt-7 mx-auto '>
            <div className=''>
                <p className='text-md mb-2 text-gray-500 font-blog antialiased'>{blog?.tags?.map((tag: string) => `#${tag}  `)}</p>
                <h1 className='text-2xl md:text-4xl lg:text-4xl font-extrabold font-brand tracking-tight md:tracking-normal'>{blog?.title}</h1>
                <p className='text-md md:text-xl text-gray-500 tracking-tight mt-4'>{blog?.summary}</p>

                <div className='flex justify-between py-7 items-center border-b'>
                    <div className='flex items-center gap-4  w-full'>
                        <img src={blog?.authorImg || "/default-avatar.png"} className='size-10 rounded-full object-cover ' alt="" />
                        <span className='flex justify-between flex-col gap-1'>
                            <p className='text-sm md:text-base '>{blog?.authorName}</p>
                            <p className='text-xs text-gray-500'>{formatDate(blog?.createdAt)}</p>
                        </span>
                    </div>
                    <div className='flex items-center gap-4'>
                        <span className='flex items-center gap-2 cursor-pointer  ' onClick={handleLike} >
                            {
                                isLiked ? <GoHeartFill size={21} color='red' className={isAnimating ? 'animate-ping ' : ''} /> :
                                    <GoHeart size={20} color='gray' className='hover:fill-red-500' />
                            }
                            <p className='text-sm text-gray-600 font-blog'>{blog?.likes.length}</p>
                        </span>
                        <span className='flex items-center gap-2 cursor-pointer' onClick={() => {
                            setCommentBoxOpen(!commentBoxOpen);
                            if (!user) {
                                setOpenGetStarted(true);
                                return;
                            }
                        }} >
                            <BiMessageSquareDetail size={20} color='gray' className='hover:fill-gray-800'/>
                            <p className='text-sm text-gray-600 font-blog'>{blog?.comments.length}</p>
                        </span>
                        <span className='flex items-center gap-2 cursor-pointer' onClick={handleShare } >
                            <PiShareFat size={20} color='gray' className='hover:fill-gray-900' />
                        </span>
                    </div>
                </div>
            </div>

            <div className='mt-10 w-full block'>
                <img src={blog?.imageUrl} className='h-[12rem] md:h-[30rem] w-full object-cover rounded-2xl' alt="" />
            </div>

            <div className='my-12  md:my-9 '>
                <p className={`${contentInnerHtml}
                tracking-wide leading-7 md:leading-9   md:tracking-wider font-blog antialiased  md:text-justify text-slate-800 `}>
                    {renderContent()}
                </p>
            </div>

             {/* Grid blogs 4 */}
            <div className='my-10 py-10 border-t'>
                <h2 className='text-xl md:text-2xl font-bold font-brand mb-4'>You might also like</h2>
                <div className='grid grid-cols- md:grid-cols-2 gap-y-4 gap-x-6'>
                    {recommendedBlogs.slice(0, 4).map((blog : any) => (
                            <Gridblog blog={blog} />
                    ))}

                </div>
            </div>

            {/* Recommended Blogs 8  */}
            <div className='my-10 py-10 border-t'>
                <h2 className='text-xl md:text-2xl font-bold font-brand mb-4'>Recommended From BlogWhiz</h2>
                <div className='grid grid-cols- md:grid-cols-2 gap-y-4 gap-x-6'>
                    {moreBlogs?.slice(3, 9).map((blog : any) => (
                            <Gridblog blog={blog} />
                    ))}

                </div>
            </div>
            <Toaster />

            {user && commentBoxOpen && <CommentBox setCommentBoxOpen={setCommentBoxOpen} commentBoxOpen={commentBoxOpen} blogId={id as string} />}

        </div>
    )
}
export default Blog;
