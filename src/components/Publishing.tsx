

function Publishing() {
    return (
        <div className='fixed inset-0 z-40 backdrop-blur-sm flex items-center justify-center'>
            <div className='size-72 flex-col flex items-center justify-center space-y-9 bg-white shadow-md border rounded-lg p-6'>
                <div className='flex space-x-2 justify-center items-center'>
                    <span className='sr-only'>Loading...</span>
                    <div className='size-6 bg-black rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                    <div className='size-6 bg-black rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                    <div className='size-6 bg-black rounded-full animate-bounce'></div>
                </div>
                <p className='text-xl animate-pulse font-blog'>Publishing Blog</p>
            </div>
        </div>
    )
}

export default Publishing