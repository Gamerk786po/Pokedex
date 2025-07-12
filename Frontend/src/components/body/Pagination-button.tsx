// The props for the Pagination-button
interface PaginationButtonProps{
    label: string;
    onClick: () => void;
    disabled: boolean;
}
// The component for the Pagination-button
const PaginationButton: React.FC<PaginationButtonProps> = ({label, onClick, disabled}) => {
    return(
        <div>
            <button className={`relative overflow-hidden group p-3 capitalize md:uppercase text-[15px] font-bold text-white ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"} bg-red-500 rounded-xl `} onClick={onClick}>
            <span className="relative z-10">{label}</span>
            <span className="absolute left-0 top-0 w-full h-full bg-red-700 transform translate-y-full group-hover:translate-y-5 transition-transform duration-300 ease-in-out z-0 rounded-t-[20%]"></span>
            </button>
        </div>
    )
}
// Exporting
export default PaginationButton;
