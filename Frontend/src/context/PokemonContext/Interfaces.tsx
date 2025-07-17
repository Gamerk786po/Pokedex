// Interface for pokemon.
export interface ClickedPokemonInterface {
  // id 
  id: number
  // Name
  name: string;
  // IMG
  img: string;
  //   height
  height: number;
  // weight
  weight: number;
  // Types
  types: string[];
  // Stats
  stats: {
    base_stat: number;
    stat: string;
  }[];
  // Moves
  moves: {
    move: {
      name: string,
      url: string
    };
    level_learned_at: number,
    move_learn_method: string
  }[];
  //   abilities
  abilities: {
    ability: {
      name: string,
      url: string
    },
    is_hidden: boolean;
  }[];
}
