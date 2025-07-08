// Props for the Card
interface CardProps{
    name: string;
    imgUrl: string;
}

// The component for card
const Card: React.FC<CardProps> = ({name, imgUrl}) => {
    return(
        // The container for the pokemon card
        <div className="flex flex-col gap-1 shadow-md items-center justify-center border border-blue-300 rounded-xl">
            <img className="h-30 drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)]" src={`${imgUrl}`} alt={`${name}`}></img>
            <p className="capitalize md:uppercase text-[15px] font-bold text-white ">{name}</p>
        </div>
    )
}
// Exporting
export default Card;