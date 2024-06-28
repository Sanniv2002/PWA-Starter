import { useState } from 'react';
import ava1 from '../assets/ava1.jpeg';
import ava2 from '../assets/ava2.jpeg';
import ava3 from '../assets/ava3.jpeg';
import ava4 from '../assets/ava4.jpeg';
import settings from '../assets/settings.svg';
import members from '../assets/members.svg';
import phone from '../assets/phone.svg';
import report from '../assets/report.svg';

export default function Details({from, to}: {from: string, to: string}) {

    const [active, setActive] = useState(false)

    const collectiveAvatar = () => {
        return <section className='rounded-full overflow-hidden'>
            <div className="grid grid-cols-2 size-12">
                <img src={ava4} alt="avatar4" />
                <img src={ava2} alt="avatar2" />
                <img src={ava3} alt="avatar3" />
                <img src={ava1} alt="avatar1" />
            </div>
        </section>
    }

    const settingsMenu = () => {
        return <div className='flex flex-col gap-3 bg-white rounded-lg py-3 shadow-lg min-w-44'>
            <span className="flex gap-3 px-3 hover:cursor-pointer">
                <img src={members} alt="" />
                <h2 className='text-black font-semibold'>Members</h2>
            </span>
            <span className='border-b-2'></span>
            <span className="flex gap-3 px-3 hover:cursor-pointer">
                <img src={phone} alt="" />
                <h2 className='text-black font-semibold'>Share Number</h2>
            </span>
            <span className='border-b-2'></span>
            <span className="flex gap-3 px-3 hover:cursor-pointer">
                <img src={report} alt="" />
                <h2 className='text-black font-semibold'>Report</h2>
            </span>
        </div>
    }

    return <div className="flex justify-between min-w-full pe-3 ps-5 py-3 border-b-2">
        <section className='flex gap-2'>
            {collectiveAvatar()}
            <span className='flex flex-col pl-2'>
                <h2 className='text-[#606060] font-semibold'>From <span className='text-black'>{from}</span></h2>
                <h2 className='text-[#606060] font-semibold'>To <span className='text-black'>{to}</span></h2>
            </span>
        </section>
        <div className="relative">
            <div
                className={`group mt-2 size-10 rounded-full flex justify-center items-center transition-colors duration-150 ${active? "bg-slate-200 ": ""} cursor-pointer`}
                onClick={() => setActive(active => !active)}
            >
                <img src={settings} alt="Settings" />
            </div>

            {active && (
                <div className="absolute top-full mt-2 right-0 z-50 bg-white border border-gray-200 rounded-lg shadow-lg">
                    {settingsMenu()}
                </div>
            )}
        </div>
    </div>
}