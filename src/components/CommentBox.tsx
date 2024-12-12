
import { addCommentToFirestore, getBlogComments } from '../services/blogServices';
import useAuth from '../hooks/useAuth';
import { useEffect, useState } from 'react';
import { Comment } from '../services/Blog.types';
import { DiVim } from 'react-icons/di';

const CommentBox = ({ setCommentBoxOpen, commentBoxOpen, blogId }) => {

    const [commentInput, setCommentInput] = useState('');
    const { user, userDetail } = useAuth();
    const [comments, setComments] = useState([]);
    const name = user?.displayName || userDetail?.displayName || "A Reader or Author";

    const handleAddComment = async (blogId: string, content: string) => {
        if (!user) return;
        if (!commentInput.trim()) return;

        const newComment: Comment = {
            id: crypto.randomUUID(), // Generate unique ID
            userId: user.uid, // Get from auth context
            userName: name,
            content: content,
            createdAt: new Date().toISOString()
        };

        await addCommentToFirestore(blogId, newComment);
        setCommentInput('');
    };

    const fetchComments = async (blogId: string) => {
        const blogComments = await getBlogComments(blogId);
        setComments(blogComments);
    }

    useEffect(() => {
        fetchComments(blogId);
      }, [blogId]);
    return (
        <div className='fixed inset-0 z-20 backdrop-blur-sm bg-black/30' onClick={(e) => {
            if (e.target === e.currentTarget) {
                setCommentBoxOpen(false);
            }
        }}>
            <div className='absolute right-0 top-0 h-full md:w-[400px] w-full bg-white shadow-lg z-30 animate-slide-in ' onClick={(e) => e.stopPropagation()}>
                <div className='p-6'>

                    <h2 className='text-xl font-bold'>{`Responses (${comments.length})`}</h2>

                    <div className='flex flex-col gap-4 justify-center items-end my-5'>
                        <input className='bg-gray-100 font-blog rounded-md w-full p-3 text-md '
                            placeholder='What are your thoughts ?'
                            value={commentInput}
                            onChange={(e) => setCommentInput(e.target.value)}
                            type="text" />
                        <button className='text-xs bg-black rounded-full text-white px-3 py-2 w-20 ' onClick={() => handleAddComment(blogId, commentInput)}>Respond</button>
                    </div>



                {comments ? (
                    comments.map((comment: Comment) => (
                        <div className='border-b border-gray-300 mb-5'>
                        <div className='flex items-center gap-4 w-full'>
                            <img src='/avatar.jpg' className={`size-6 md:size-10 object-cover rounded-full cursor-pointer`} alt="" />
                            <span className='flex justify-between flex-col gap-1'>
                                <p className='text-xs font-semibold'>{comment.userName}</p>
                            </span>
                        </div>
                        <div className=''>
                            <p className='text-sm my-5 font-blog'>{comment.content}</p>
                        </div>
                    </div>
                    ))
                ): (
                    <p>No comments yet</p>
                )}
                    

                </div>
            </div>
        </div>
    )
}

export default CommentBox