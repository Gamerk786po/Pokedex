import { motion } from "framer-motion";
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
  {
    label: "Profile",
    href: "/profile",
  },
];

const HomeBody = () => {
  return (
    <>
      {/* Animated container */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mt-16 md:mt-24 xl:mt-30 pb-10 px-4 flex flex-col gap-6 2xl:gap-10 justify-center items-center w-full text-center"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-3xl sm:text-4xl xl:text-5xl 2xl:text-6xl font-bold"
        >
          Welcome to the Pokedex!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg sm:text-2xl xl:text-3xl 2xl:text-5xl 2xl:leading-relaxed font-light max-w-[80rem]"
        >
          Explore detailed information about Pokemons and manage your
          competitive teams
        </motion.p>

        {/* Buttons with stagger animation */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
          className="flex flex-row flex-wrap justify-center gap-3 w-full sm:w-auto"
        >
          {navigationLinks.map((navLink) => (
            <motion.div
              key={navLink.href}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
            >
              <NavigationButton label={navLink.label} href={navLink.href} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </>
  );
};

export default HomeBody;
