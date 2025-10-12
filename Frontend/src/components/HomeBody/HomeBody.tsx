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
      <div className="mt-16 md:mt-24 xl:mt-30 pb-10 px-4 flex flex-col gap-6 justify-center items-center w-full text-center">
        <h1 className="text-3xl sm:text-4xl xl:text-5xl font-bold">
          Welcome to the Pokedex!
        </h1>

        <p className="text-lg sm:text-2xl xl:text-3xl font-light max-w-[80rem]">
          Explore detailed information about Pokemons and manage your
          competitive teams
        </p>

        {/* Div containing buttons */}
        <div className="flex flex-row flex-wrap justify-center gap-3 w-full sm:w-auto">
          {navigationLinks.map((navLink) => (
            <NavigationButton
              key={navLink.href}
              label={navLink.label}
              href={navLink.href}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default HomeBody;