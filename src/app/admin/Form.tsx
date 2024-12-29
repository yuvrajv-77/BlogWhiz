import React, { useRef, useState } from 'react'

import 'react-quill/dist/quill.bubble.css';
import 'react-quill/dist/quill.snow.css';

import Publishing from '../../components/Publishing'
const ReactQuill = React.lazy(() => import('react-quill'));
import { useNavigate } from 'react-router';
import { addBlogToFirestore } from '../../services/blogServices';
import useAuth from '../../hooks/useAuth';
import { Blog } from '../../services/Blog.types';
import toast, { Toaster } from 'react-hot-toast';
import { uploadImage } from '../../services/storageServices';
import { PiTrash } from 'react-icons/pi';
import ButtonPrimary from '../../components/ButtonPrimary';

const Form = () => {

	const [title, setTitle] = useState('')
	const [summary, setSummary] = useState('')
	const [body, setBody] = useState('')
	const [publishing, setPublishing] = useState(false)
	const [success, setSuccess] = useState(false)
	const [textAreaHeight, setTextAreaHeight] = useState('auto');
	const textAreaRef = useRef<HTMLTextAreaElement>(null);
	
	const { user, userDetail } = useAuth()
	const navigate = useNavigate()

	const name = user?.displayName || userDetail?.displayName || "A Reader or Author";
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);
	const [imageUrl, setImageUrl] = useState<string>('')
	const modules = {
		toolbar: [
			// [{ 'header': [1, 2, false] }],
			[{ 'header': 1 }, { 'header': 2 }],
			// [{ 'size': ['small', false, 'large', 'huge'] }],
			["bold", "italic", "underline", "blockquote"],
			[
				{ list: "ordered" },
				{ list: "bullet" },
				{ indent: "-1" },
				{ indent: "+1" },
			],
			["link"],

		],

	}

	const formats = ["header", "bold", "italic", "underline", "strike", "blockquote",
		"list", "bullet", "indent", "link", "image", "color", "clean",
	];


	const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			setSelectedFile(file);
			// Create preview URL
			const reader = new FileReader();
			reader.onloadend = () => {
				setPreviewUrl(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	// Modify handleSubmit to handle both cases
	const handleSubmit = async (e: { preventDefault: () => void; }) => {
		e.preventDefault()

		// Variable to store final image URL
		let finalImageUrl: string;

		if (selectedFile) {
			// If file is selected, upload it
			finalImageUrl = await uploadImage(selectedFile, "blog-images");
		} else if (imageUrl) {
			// If URL is pasted, use it directly
			finalImageUrl = imageUrl;
		} else {
			toast.error('Please add an image or provide an image URL');
			return;
		}

		const blogData: Blog = {
			id: null,
			title: title,
			summary: summary,
			body: body,
			imageUrl: finalImageUrl,
			userId: user?.uid as string,
			createdAt: new Date().toISOString(),
			authorName: name,
			likes: [],
			comments: [],
		};

		setPublishing(true);
		try {
			await addBlogToFirestore(blogData);
			navigate('/admin/dashboard');
			toast.success('Blog Published Successfully!');
			setSuccess(true);
		} catch (error) {
			console.error('Error publishing blog:', error);
			toast.error('Failed to publish blog');
		}
		setPublishing(false);
	};

	return (
		<div className='relative'>
			<form className='px-5 lg:px-0 md:px-4 lg:max-w-[50rem] mx-auto' onSubmit={handleSubmit}>
				<div className='flex items-center py-4 justify-between'>
					<div className='flex items-center gap-4 '>
						<img src={"/avatar.jpg"} className='size-7 md:size-10  rounded-full object-cover' alt="" />
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
						ref={textAreaRef}
							maxLength={150}
							value={title}
							required
							rows={1}
							onChange={(e) => {
								setTitle(e.target.value);
								if (textAreaRef.current) {
                                    textAreaRef.current.style.height = 'auto';
                                    textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
                                }
							}}
							placeholder='Title of Blog'
							className='resize-none p-2 text-2xl md:text-3xl w-full font-blog font-semibold border-l-gray-200 border-l-2 outline-none  placeholder:text-gray-400 placeholder:font-light'
						/>
					</div>
					{/* summary */}
					<div className=''>
						<input
							type="text"
							value={summary}
							required
							maxLength={80}
							// onInput={adjustTextareaHeight} // Adjust height on input
							// ref={textareaRef}
							onChange={(e) => setSummary(e.target.value)}
							placeholder='What is it about'
							className='p-2 font-medium text-xl font-blog md:text-xl w-full resize-none focus:border-b-black border-b-white border-l-gray-200 border-l-2 outline-none overflow-hidden placeholder:text-gray-400 text-gray-600 placeholder:font-light'
						/>
					</div>

					<div className=' flex items-center justify-center h-44 rounded-xl bg-gray-100 relative'>
						{selectedFile ? (
							<div className='group'>
								<img src={previewUrl || undefined} className='h-44 w-screen rounded-xl object-cover group-hover:blur-sm transition-all ease-in-out duration-500' alt="" />
								<ButtonPrimary className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ' onClick={() => setSelectedFile(null)}><PiTrash /></ButtonPrimary>
							</div>
						) : (
							<div className='flex flex-col gap-3 '>
								<input
									type="file"
									accept="image/*"
									onChange={handleFileSelect}
									className="hidden"
									id="file-upload" />
								<label
									htmlFor="file-upload"
									className="bg-black py-2 text-center px-4 text-xs cursor-pointer text-white rounded-full hover:bg-white hover:text-black focus:ring focus:ring-gray-300 border-black border transition duration-100 ease-in-out"
								>Add Thumbnail</label>
								<input
									type="text"
									className="font-blog rounded-md w-44 p-3 text-xs "
									value={imageUrl}
									onChange={(e) => setImageUrl(e.target.value)}
									placeholder='Or Paste Thumbnail URL'
								/>
							</div>
						)}

					</div>

					{/* body */}
					<div className='selection:bg-yellow-200 '>

						<ReactQuill
							modules={modules}
							formats={formats} className='min-h-[30rem] text-lg'
							value={body}
							// required = {true}
							// ref={quillRef}
							theme='snow'
							placeholder='Tell Your Story. . . . .'
							onChange={(e) => setBody(e)} />


					</div>
				</div>
			</form>
			{publishing && <Publishing />}
			{/* <Publishing /> */}
			<Toaster
				toastOptions={
					{ duration: 3000 }
				} />
		</div>
	)
}
export default Form