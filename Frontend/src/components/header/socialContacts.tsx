// Props for social-contact
interface SocialProps {
    name: string;
    url: string;
  }
  // component
  const SocialContact: React.FC<SocialProps> = ({ name, url }) => {
      // statemanagment for contacts
    return (
      <a href={url} target="blank">
        <img
          src={`https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/${name}.svg`}
          alt={name}
          className="md:hover:w-6 w-5 2xl:w-8 2xl:hover:w-9 transition-all ease-in-out duration-400"
        ></img>
      </a>
    );
  };
  export default SocialContact;
  