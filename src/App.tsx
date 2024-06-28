import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import Details from './components/Details';
import Header from './components/Header';
import SendMessage from './components/SendMessage';
import ChatContents from './components/ChatContents';

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

function App() {
  const [chats, setChats] = useState<APIContentsProps>({
    chats: [
      {
        id: '',
        message: '',
        sender: {
          image: '',
          is_kyc_verified: false,
          self: false,
          user_id: ''
        },
        time: ''
      }
    ], from: '', message: '', name: '', status: '', to: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChats = async () => {
      try {
          const response = await axios.get(`https://qa.corider.in/assignment/chat?page=0`);
          setChats(response.data);
          setLoading(false);
      } catch (error) {
          console.error('Error fetching chats:', error);
      }
    };

    fetchChats();
  }, []);

  return (
    <div className='bg-[#FAF9F4] min-h-screen flex flex-col'>
      <div className='sticky top-0 z-10 bg-[#FAF9F4] pt-4'>
        <Header />
        <Details from={chats?.from} to={chats?.to} />
      </div>
      <div className='flex-grow overflow-y-auto'>
        <ChatContents loading={loading} />
      </div>
      <div className='sticky bottom-0 z-10 bg-[#FAF9F4] px-5 pb-3'>
        <SendMessage />
      </div>
    </div>
  );
}

export default App;