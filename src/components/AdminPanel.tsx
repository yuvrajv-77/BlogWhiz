import React, { useRef, useState } from "react";
import useAuth from "../hooks/useAuth";
import ButtonPrimary, { ButtonSecondary } from "./ButtonPrimary";
import { uploadImage } from "../services/storageServices";
import { PiPen, PiPencil, PiPencilBold } from "react-icons/pi";
import { FaPen } from "react-icons/fa";

const AdminPanel = () => {
	const { user, userDetail } = useAuth();
	const profileImage = user?.photoURL || "/avatar.jpg";
	const name = user?.displayName || userDetail?.displayName || "A Reader or Author";
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [previewUrl, setPreviewUrl] = useState<string | undefined>(
		profileImage || undefined
	);
	const [isUploading, setIsUploading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [showPopup, setShowPopup] = useState(false);


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

	const handleUpload = async () => {
		if (!selectedFile) return;

		try {
			setIsUploading(true);
			setError(null);
			const downloadUrl = await uploadImage(selectedFile, "user-profile-images");
			console.log("Upload successful:", downloadUrl);
		} catch (err) {
			setError("Failed to upload image. Please try again.");
			console.error("Upload error:", err);
		} finally {
			setIsUploading(false);
		}
	};

	return (
		<div>
			{user ? (
				<div className="flex my-10 md:my-20 justify-between items-center">
					<div className="flex items-center gap-4 ">
						<img
							src={profileImage}
							className="size-14 md:size-20  rounded-full object-cover"
							alt=""
						/>
						<h1 className="text-2xl md:text-5xl font-logo font-semibold">
							{name}
						</h1>
					</div>
					<ButtonPrimary onClick={() => setShowPopup(true)}>
						Edit Profile
					</ButtonPrimary>

					{showPopup && (
						<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
							<div className=" p-14 bg-white space-y-4">
								<h1 className="text-center text-2xl font-semibold font-blog">
									Profile Information
								</h1>
								{/* // Profile  */}
								<div className="">
									<p className="text-sm text-gray-600 pb-3">Photo</p>
									<div className="flex w-full items-center justify-center ">
										{}
										<span className="relative size-24 cursor-pointer ">
											<img
												src={previewUrl}
												className="size-24 rounded-full object-cover brightness-75"
												alt="Profile img"
											/>
											<label htmlFor="file-upload" className="absolute transition-all hover:backdrop-blur-[2px] cursor-pointer rounded-full size-full flex items-center justify-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
												<FaPen size={20} color="white" />
											</label>
											<input
												type="file"
												accept="image/*"
												onChange={handleFileSelect}
												className="hidden size"
												id="file-upload"
											/>
										</span>

									</div>
								</div>

								{/* // name  */}
								<div className="">
									<p className="text-sm text-gray-600 pb-3">Name</p>
									<input
										type="text"
										className="bg-gray-100 font-blog rounded-md w-[25rem] p-3 text-md "
										value={name}
										disabled
									/>
								</div>

								{/* // Email  */}
								<div className="">
									<p className="text-sm text-gray-600 pb-3">Email</p>
									<input
										type="text"
										className="bg-gray-100 font-blog rounded-md w-[25rem] p-3 text-md "
										value={user.email || ''}
										disabled
									/>
								</div>

								{/* // Bio  */}
								<div className="">
									<p className="text-sm text-gray-600 pb-3">Bio</p>
									<textarea
										maxLength={150}
										className="bg-gray-100 font-blog rounded-md h-auto w-[25rem] p-3 text-md "
										placeholder="Enter your bio"
										rows={3}
									/>
								</div>
								<div className="flex justify-end gap-4">
									<ButtonSecondary
										className="text-xs"
										onClick={() => {
											setShowPopup(false);
											setPreviewUrl(profileImage);
											setSelectedFile(null);
										}}
									>
										Cancel
									</ButtonSecondary>
									<ButtonPrimary className="text-xs" onClick={handleUpload}>Save</ButtonPrimary>
								</div>
							</div>
						</div>
					)}

					{/* <div className='flex flex-col items-center'>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg transition duration-200"
            >
              Select Image
            </label>
            
            {selectedFile && (
              <ButtonPrimary
                onClick={handleUpload}
                disabled={isUploading}
                className='mt-4'
              >
                {isUploading ? 'Uploading...' : 'Upload Image'}
              </ButtonPrimary>
            )}
            
            {error && (
              <p className='text-red-500 mt-2'>{error}</p>
            )}
          </div> */}
				</div>
			) : (
				<div className="flex my-10 md:my-20 items-center gap-4">
					<div className="size-20 bg-gray-300 animate-pulse rounded-full object-cover" />
					<h1 className="w-2/3 rounded-lg font-semibold animate-pulse bg-gray-300 h-20"></h1>
				</div>
			)}
		</div>
	);
};
export default AdminPanel;
