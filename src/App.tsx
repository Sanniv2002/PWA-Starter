import './App.css';
import Details from './components/Details';
import Header from './components/Header';
import SendMessage from './components/SendMessage';
import ChatContents from './components/ChatContents';

function App() {
  return (
    <div className='bg-[#FAF9F4] h-screen flex flex-col'>
      <div className='sticky top-0 z-10 bg-[#FAF9F4] pt-2'>
        <Header />
        <Details />
      </div>
        <ChatContents />
      <div className='sticky bottom-0 z-10 bg-[#FAF9F4] px-5 pb-4'>
        <SendMessage />
      </div>
    </div>
  );
}

export default App;