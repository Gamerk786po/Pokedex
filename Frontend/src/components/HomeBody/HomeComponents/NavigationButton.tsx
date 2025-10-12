// Props for NavigationButton
interface PropsNavigationButton {
  label: string;
  href: string;
}

const NavigationButton: React.FC<PropsNavigationButton> = ({ label, href }) => {
  return (
    <a href={href}>
      <button
        className={
          "p-3 2xl:p-6 capitalize md:uppercase text-[15px] 2xl:text-[22px] font-bold text-white  bg-red-500 hover:bg-red-600 transition-all duration-200 ease-in-out rounded-2xl"
        }
      >
        <span className="">{label}</span>
      </button>
    </a>
  );
};
export default NavigationButton;
