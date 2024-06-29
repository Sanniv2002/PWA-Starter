import backButton from "../assets/back.svg"
import editButton from "../assets/edit.svg"

export default function Header() {
    return <div className="flex justify-between px-5 sticky top-0 z-10 bg-[#FAF9F4] pt-4">
        <section className="flex gap-4">
            <img src={backButton} alt="" />
            <h2 className="text-black text-2xl font-semibold">Trip 1</h2>
        </section>
        <img className="hover:cursor-pointer" src={editButton} alt="" />
    </div>
}