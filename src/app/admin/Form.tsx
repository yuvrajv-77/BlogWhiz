
import React, { useEffect, useRef, useState } from 'react'


import 'react-quill/dist/quill.bubble.css';

// import { addBlogToFirestore } from './services'
import Publishing from '../../components/Publishing'
import ReactQuill from 'react-quill';
import { useNavigate } from 'react-router';
import { addBlogToFirestore } from '../../services/blogServices';
import useAuth from '../../hooks/useAuth';
import { Blog } from '../../services/Blog.types';

const Form = () => {

	const [title, setTitle] = useState('')
	const [summary, setSummary] = useState('')
	const [body, setBody] = useState('')
	const [publishing, setPublishing] = useState(false)
	const [success, setSuccess] = useState(false)
	const {user} = useAuth()
	const navigate = useNavigate()
	const modules = {
		toolbar: [
			// [{ 'header': [1, 2, false] }],
			[{ 'header': 1 }, { 'header': 2 }],
			// [{ 'size': ['small', false, 'large', 'huge'] }],
			["bold", "italic", "underline", "blockquote", "code"],
			// [
			// 	// { list: "ordered" },
			// 	// { list: "bullet" },
			// 	{ indent: "-1" },
			// 	{ indent: "+1" },
			// ],
			["link", "image"],
		]
	}

	const formats = ["header", "bold", "italic", "underline", "strike", "blockquote",
		"list", "bullet", "indent", "link", "image", "color", "clean",
	];

	const { userDetail } = useAuth();
	// const { title, setTitle, summary, setSummary, body, setBody} = useBlogContext();

	const textareaRef = useRef(null);
	// Function to adjust textarea height based on content
	// const adjustTextareaHeight = () => {
	// 	const textarea = textareaRef.current;
	// 	textarea.style.height = 'auto'; // Reset height
	// 	textarea.style.height = `${textarea.scrollHeight}px`; // Set height to the scroll height
	// };

	// useEffect(() => {
	// 	adjustTextareaHeight(); // Adjust height on component mount/update
	// }, [title]);

	const name = user?.displayName || userDetail?.displayName || "A Reader or Author";

	const handleSubmit = async (e: { preventDefault: () => void; }) => {
		e.preventDefault()
		const blogData: Blog = {
			id: null,
			title: title,
			summary: summary,
			body: body,
			userId: user?.uid as string,
			createdAt: new Date().toISOString(),
			authorName: name,
			likes: [],

		};
		setPublishing(true);
		// await new Promise(resolve => setTimeout(resolve, 3000));
		try {
			await addBlogToFirestore(blogData);
			navigate('/admin/dashboard');
			setSuccess(true);
		} catch (error) {
			console.error('Error publishing blog:', error);
		}
		setPublishing(false);
	};


	return (
		<div className='relative'>
			<form className='px-5 lg:px-0 md:px-4 lg:max-w-[50rem] mx-auto' onSubmit={handleSubmit}>
				<div className='flex items-center py-4 justify-between'>
					<div className='flex items-center gap-4 '>
						<img src={ "/avatar.jpg"} className='size-7 md:size-10  rounded-full object-cover' alt="" />
						<div>
							<h1 className='text-sm md:text-xl font-semibold'>{name}</h1>
							<p className='text-xs'>20 Jun 2156</p>
						</div>
					</div>
					<button className='bg-black py-2 px-4 text-white rounded-full hover:bg-white hover:text-black focus:ring focus:ring-gray-300 border-black border transition duration-100 ease-in-out'
						type='submit'
					>Publish</button>
				</div>

				<div className='border-b border-black'></div>

				<div className=' flex flex-col gap-5 font-blog mt-10'>
					{/* title */}
					<div className=' '>
						<textarea
							// type="text" 
							// rows='1'
							// onInput={adjustTextareaHeight} // Adjust height on input
							ref={textareaRef}
							value={title}
							required
							onChange={(e) => setTitle(e.target.value)}
							placeholder='Title of Blog'
							className='p-2  text-2xl md:text-3xl lg:text-4xl w-full resize-none  font-brand font-semibold border-l-gray-200 border-l-2 outline-none overflow-hidden placeholder:text-gray-400 placeholder:font-light'
						/>
					</div>
					{/* summary */}
					<div className=''>
						<input
							type="text" 
							value={summary}
							required
							// onInput={adjustTextareaHeight} // Adjust height on input
							// ref={textareaRef}
							onChange={(e) => setSummary(e.target.value)}
							placeholder='What is it about'
							className='p-2 font-medium text-xl font-blog md:text-2xl w-full resize-none focus:border-b-black border-b-white border-l-gray-200 border-l-2 outline-none overflow-hidden placeholder:text-gray-400 placeholder:font-light'
						/>
					</div>
					{/* body */}
					<div className='selection:bg-yellow-200 '>
						<ReactQuill
							modules={modules}
							formats={formats} className='min-h-[30rem] text-lg'
							value={body}
							// required = {true}
							theme='bubble'
							placeholder='Tell Your Story. . . . .'
							onChange={(e) => setBody(e)} />

						{/* <textarea 
					type="text" rows='1'
					placeholder='Tell  your story ....' 
					className='py-2 font-medium text-xl w-full resize-none focus:border-b-black border-b-white  outline-none overflow-hidden placeholder:text-gray-300 placeholder:font-light' 
					 /> */}

					</div>
				</div>
			</form>
			{publishing && <Publishing/>}
			
		</div>
	)
}
export default Form