import { useState } from 'react';
import paperclip from '../assets/paperclip.svg';
import send from '../assets/send.svg';
import fatCam from '../assets/fatCam.svg';
import fatVideo from '../assets/fatVideo.svg';
import fatDocument from '../assets/fatDocument.svg';

export default function SendMessage() {
  const [active, setActive] = useState(false);

  const Fat = () => {
    return (
      <div className='relative'>
        <div className='bg-[#008000] w-36 py-4 px-5 rounded-full'>
          <div className='flex gap-4'>
            <img className='size-6 hover:cursor-pointer' src={fatCam} alt="" />
            <img className='size-6 hover:cursor-pointer' src={fatVideo} alt="" />
            <img className='size-6 hover:cursor-pointer' src={fatDocument} alt="" />
          </div>
        </div>
        <div className="absolute h-3 w-3 rotate-45 bg-[#008000] left-20 transform -translate-x-1/2 bottom-[-6px]"></div>
      </div>
    );
  };

  return (
    <div className='bg-white min-w-full rounded-lg relative'>
      <div className="flex justify-between py-3">
        <span className='w-3'></span>
        <input className="col-span-4 min-w w-full outline-white" type="text" placeholder="Reply to @Rohit Yadav" />
        <span className='w-3'></span>
        <div className='flex gap-3 pe-7 relative'>
          <img
            className={`hover:cursor-pointer size-6 rounded-full transition-colors duration-300 ${active ? "bg-slate-200 " : ""} cursor-pointer`}
            src={paperclip}
            onClick={() => setActive(prev => !prev)}
            alt=""
          />
          {active && (
            <div className="absolute bottom-11 z-50" style={{ right: '-5px' }}>
              <Fat />
            </div>
          )}
          <img className='size-6 hover:cursor-pointer' src={send} alt="send" />
        </div>
      </div>
    </div>
  );
}
