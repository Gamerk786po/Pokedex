// Props for the Card
interface CardProps{
    name: string;
    imgUrl: string;
}

// The component for card
const Card: React.FC<CardProps> = ({name, imgUrl}) => {
    return(
        // The container for the pokemon card
        <div className="h-[148.5px] w-[122px] group flex flex-col gap-1 shadow-2xl items-center justify-center border border-blue-300 rounded-xl transition-all duration-300 hover:cursor-pointer hover:border-blue-500">
            <img className="h-30 drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)] transition-transform duration-300 group-hover:-translate-y-1" src={`${imgUrl}`} loading="lazy" alt={`${name}`}></img>
            <p className="capitalize md:uppercase text-[15px] font-bold text-white transition-transform duration-300 group-hover:-translate-y-1">{name}</p>
        </div>
    )
}
// Exporting
export default Card;