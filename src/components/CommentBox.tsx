
import { addCommentToFirestore, getBlogComments } from '../services/blogServices';
import useAuth from '../hooks/useAuth';
import { useRef, useState } from 'react';
import { BlogComment } from '../services/Blog.types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AiOutlineClose } from 'react-icons/ai';

const CommentBox = ({ setCommentBoxOpen, blogId }: { blogId: string, setCommentBoxOpen: React.Dispatch<React.SetStateAction<boolean>>, commentBoxOpen: boolean }) => {

    const [commentInput, setCommentInput] = useState('');
    const { user, userDetail } = useAuth();


    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = date.toLocaleString('en-US', { month: 'short' });
        const year = date.getFullYear().toString();
        return `${month} ${day}, ${year}`;
    };
    
    const name = user?.displayName || userDetail?.displayName || "A Reader or Author";
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const queryClient = useQueryClient();

    // Query for fetching comments
    const { data, isPending } = useQuery({
        queryKey: ['comments', blogId],
        queryFn: () => getBlogComments(blogId),
    });

    const sortedComments: BlogComment[] = data?.sort((a: BlogComment, b: BlogComment) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());


    // Mutation for adding new comments
    const addCommentMutation = useMutation({
        mutationFn: ({ blogId, newComment }: { blogId: string, newComment: BlogComment }) =>
            addCommentToFirestore(blogId, newComment),
        onSuccess: () => {
            // Invalidate and refetch comments
            queryClient.invalidateQueries({ queryKey: ['comments', blogId] });
            setCommentInput('');
        },
    });

    const handleAddComment = async (blogId: string, content: string) => {
        if (!user || !commentInput.trim()) return;
        const newComment: BlogComment = {
            id: crypto.randomUUID(), // Generate unique ID
            userId: user.uid, // Get from auth context
            userName: name,
            userImg: user.photoURL as string,
            content: content,
            createdAt: new Date().toISOString()
        } ;

        addCommentMutation.mutate({ blogId, newComment });

        // await addCommentToFirestore(blogId, newComment);
        setCommentInput('');
        
    };

    // const fetchComments = async (blogId: string) => {
    //     const blogComments = await getBlogComments(blogId);
    //     setComments(blogComments);
    // }

    // useEffect(() => {
    //     fetchComments(blogId);
    // }, [blogId]);

    // First add this state for managing textarea height

    return (
        <div className='fixed inset-0 z-20 backdrop-blur-sm bg-black/30' onClick={(e) => {
            if (e.target === e.currentTarget) {
                setCommentBoxOpen(false);
            }
        }}>
            <div className='absolute right-0 top-0 h-full md:w-[400px] overflow-auto w-full bg-white shadow-lg z-30 animate-slide-in ' onClick={(e) => e.stopPropagation()}>
                <div className='p-6'>

                    <div className='flex items-center justify-between'>
                        <h2 className='text-xl font-bold'>{`Responses (${sortedComments?.length})`}</h2>
                        <span className=" hover:bg-gray-200 rounded-full top-8 cursor-pointer p-1" onClick={() => setCommentBoxOpen(false)}>
                            <AiOutlineClose
                                size={21}
                            />
                        </span>
                    </div>

                    <div className='flex flex-col gap-4 justify-center items-end my-5'>
                        {/* <textarea
                            className='bg-gray-100 font-blog rounded-md w-full p-3 text-md resize-none overflow-hidden'
                            placeholder='What are your thoughts ?'
                            value={commentInput}
                            onChange={(e) => {
                                setCommentInput(e.target.value);
                                // Reset height to auto to correctly calculate scroll height
                                setTextAreaHeight('auto');
                                // Set new height based on scroll height
                                setTextAreaHeight(`${e.target.scrollHeight}px`);
                            }}
                            style={{ height: textAreaHeight }}
                        /> */}
                        <textarea
                            ref={textAreaRef}
                            className='bg-gray-100 font-blog rounded-md w-full p-3 text-md resize-none overflow-hidden'
                            placeholder='What are your thoughts ?'
                            value={commentInput}
                            onChange={(e) => {
                                setCommentInput(e.target.value);
                                // Reset height
                                if (textAreaRef.current) {
                                    textAreaRef.current.style.height = 'auto';
                                    textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
                                }
                            }}
                            rows={1}
                        />
                        <button
                            className='text-xs bg-black rounded-full text-white px-3 py-2 w-20 '
                            onClick={() => handleAddComment(blogId, commentInput)} disabled={addCommentMutation.isPending}>Respond
                        </button>
                    </div>

                    {isPending && (
                        <div className='space-y-10'>
                            {[...Array(5)].map((_, index) => (
                                <div key={index} className='space-y-3'>
                                    <div className='flex items-center gap-4 w-full'>
                                        <div className={`size-10 bg-gray-300 rounded-full animate-pulse`}></div>
                                        <span className='bg-gray-300 rounded-xl h-4 w-[60%] animate-pulse'></span>
                                    </div>
                                    <div className='bg-gray-300 rounded-xl h-6 w-full animate-pulse'></div>
                                </div>
                            ))}
                        </div>
                    )}


                    {sortedComments?.length > 0 ? (
                        sortedComments.map((comment: BlogComment, index) => (
                            <div className='border-b border-gray-300 mb-5' key={index}>
                                <div className='flex items-center gap-4 w-full'>
                                    <img src={comment.userImg || "/default-avatar.png"} className={`size-6 md:size-10 object-cover rounded-full cursor-pointer`} alt="" />
                                    <span className='flex justify-between flex-col gap-1'>
                                        <p className='text-xs '>{comment.userName}</p>
                                        <p className='text-xs text-gray-500'>{formatDate(comment.createdAt)}</p>
                                    </span>
                                </div>
                                <div className=''>
                                    <p className='text-sm my-5  font-blog font-medium'>{comment.content}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className='text-center font-blog mt-10'>No comments yet</p>
                    )}


                </div>
            </div>
        </div>
    )
}

export default CommentBox