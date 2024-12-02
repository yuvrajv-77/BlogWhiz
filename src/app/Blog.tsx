
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { getBlogById } from '../services/blogServices';
import { parse } from 'node-html-parser';

const Blog = () => {

    const { id } = useParams<{ id: string }>();

    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

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

    console.log(blog);

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
        <div className='px-7 lg:px-0 md:px-10 lg:max-w-[50rem] mt-7 mx-auto '>
            <div className=''>
                <h1 className='text-2xl md:text-4xl lg:text-4xl font-extrabold font-brand tracking-tight md:tracking-normal'>{blog?.title}</h1>
                <p className='text-lg md:text-xl  text-gray-500 tracking-tight mt-4'>{blog?.summary}</p>
                <div className='flex items-center gap-4 mt-9 w-full'>
                    <img src='/avatar.jpg' className='size-10 md:size-14 rounded-full object-cover' alt="" />
                    <span className='flex justify-between flex-col gap-1'>
                        <p className='text-sm'>{blog?.authorName}</p>
                        <p className='text-sm text-gray-500'>{formatDate(blog?.createdAt)}</p>
                    </span>
                </div>
            </div>
            {/* <div className='mt-10 w-full hidden md:block'>
                <img src={data?.blogImg} className='h-[30rem] w-full object-cover' alt="" />
            </div> */}

            <div className='mt-12 md:mt-10 border-t-2 py-6 '>
                <p className=' [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mb-3 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:mb-2" [&_p]:md:text-xl [&_p]:text-normal tracking-wide leading-7 md:leading-9 [&_img]:mx-auto [&_img]:my-4  md:tracking-wider font-logo antialiased md:font-semibold md:text-justify text-slate-600 '>
                    {renderContent()}
                </p>
            </div>
        </div>
    )
}

export default Blog;