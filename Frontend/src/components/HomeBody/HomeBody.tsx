import NavigationButton from "./HomeComponents/NavigationButton";

const navigationLinks = [
  {
    label: "Pokedex",
    href: "/pokedex",
  },
  {
    label: "Home",
    href: "/home",
  },
  {
    label: "Items-Search",
    href: "/item",
  },
];

const HomeBody = () => {
  return (
    <>
      {/* Div containing Home content */}
      <div className="mt-30 flex flex-col gap-4 justify-center items-center">
        <h1 className="text-4xl font-bold"> Welcome to the Pokedex! </h1>
        <p className="text-2xl font-light">
          Explore detail information about Pokemons and manage your competitive
          teams
        </p>
        {/* Div containing buttons */}
        <div className="flex flex-row flex-wrap gap-3">
          {navigationLinks.map((navLink) => (
            <NavigationButton label={navLink.label} href={navLink.href} />
          ))}
        </div>
      </div>
    </>
  );
};
export default HomeBody;
