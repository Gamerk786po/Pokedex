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
            <button className={`p-3 capitalize md:uppercase text-[15px] font-bold text-white ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"} bg-red-500 hover:bg-red-600 transition-all duration-200 ease-in-out rounded-xl `} onClick={onClick}>
            <span className="">{label}</span>
            </button>
        </div>
    )
}
// Exporting
export default PaginationButton;
