import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import verified from '../assets/verified.svg';

interface APIContentsProps {
    chats: {
        id: string,
        message: string,
        sender: {
            image: string,
            is_kyc_verified: boolean,
            self: boolean,
            user_id: string,
        }
        time: string,
    }[],
    from: string,
    message: string,
    name: string,
    status: string,
    to: string
}

const ChatContents = ({ loading }: { loading: boolean }) => {

    const [page, setPage] = useState(0);
    const [totalChats, setTotalChats] = useState<APIContentsProps['chats']>();
    const [loadmore, setLoadMore] = useState(false);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    };

    useEffect(() => {
        const fetchChats = async () => {
            try {
                setLoadMore(true)
                const response = await axios.get(`https://qa.corider.in/assignment/chat?page=${page}`);
                totalChats ? setTotalChats([...response.data.chats, ...totalChats]) : setTotalChats(response.data.chats);
                setLoadMore(false);
            } catch (error) {
                console.error('Error fetching chats:', error);
                setLoadMore(true)
            }
        };

        fetchChats();
    }, [page]);

    useEffect(() => {
        let scrollBefore = 0;
        let timeoutId: number = 0;

        const handleScroll = () => {
            const scrolled = window.scrollY;
            if (scrollBefore > scrolled) {
                scrollBefore = scrolled;
            }
            if (scrolled === 0) {
                if (timeoutId) {
                    clearTimeout(timeoutId);
                }
                timeoutId = setTimeout(() => {
                    setPage((page) => page + 1);
                }, 300);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, []);


    //Effect to initally scroll to the bottom of the chat
    useEffect(() => {
        scrollToBottom();
    }, [loading])

    const Loader = () => {
        return (

            <div role="status">
                <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <span className="sr-only">Loading...</span>
            </div>

        );
    };

    const Message = (imgPath: string, message: string, is_kyc_verified: boolean, self: boolean) => {
        return (
            <>
                {!self ? (
                    <div className='flex gap-2 justify-start ps-5'>
                        <span>
                            <div className="relative">
                                <img className="h-10 w-10 rounded-full" src={imgPath} alt="" />
                                {is_kyc_verified && <img src={verified} className="bottom-0 left-7 absolute w-3.5 h-3.5 rounded-full" />}
                            </div>
                        </span>
                        <span className='bg-white px-2 py-3 w-60 shadow-lg rounded-e-lg rounded-b-lg text-gray-800'>{message}</span>
                    </div>
                ) : (
                    <div className='flex gap-2 justify-end pe-5'>
                        <span className='bg-[#1C63D5] px-2 py-3 w-60 shadow-lg rounded-s-lg rounded-t-lg text-white'>{message}</span>
                    </div>
                )}
            </>
        );
    };

    return (
        loading ? (
            <div className='min-h-screen flex justify-center items-center'>
                <Loader />
            </div>
        ) : (
            <div className='flex flex-col gap-6 my-7'>
                {loadmore && <span className='flex justify-center items-center py-2'><Loader /></span>}
                <div className="flex items-center px-5">
                    <span className="flex-grow border-b border-gray-300"></span>
                    <span className="mx-4 text-gray-600">24th Jul, 2024</span>
                    <span className="flex-grow border-b border-gray-300"></span>
                </div>
                {totalChats?.map(chat => (
                    <span key={chat.id}>
                        {Message(chat.sender.image, chat.message, chat.sender.is_kyc_verified, chat.sender.self)}
                    </span>
                ))}
                <div ref={chatContainerRef} />
            </div>
        )
    );
};

export default ChatContents;
