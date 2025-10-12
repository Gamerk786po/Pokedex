// Interface for Pokemon Types
export interface PokemonTypes {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }
  
  // Interface for Pokemon stats
  export interface PokemonStats {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }
  
  // Interface for Pokemon moves
  export interface PokemonMoves {
    move: {
      name: string;
      url: string;
    };
    version_group_details: {
      level_learned_at: number;
      move_learn_method: {
        name: string;
        url: string;
      };
    }[];
  }
  
  // Interface for Pokemon abilities
  export interface PokemonAbilities {
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  }
  
  // Interface for Pokemon egg_groups
  export interface PokemonEggGroups {
    name: string;
    url: string;
  }
  
  // Interface for Pokemon Varieties
  export interface PokemonVarieties {
    is_default: boolean;
    pokemon: {
      name: string;
      url: string;
    };
  }
  
  // Interface for Pokemon Flavour-Text-Entries
  export interface FlavourTextEnteries {
    flavor_text: string;
    language: {
      name: string;
      url: string;
    };
    version: {
      name: string;
      url: string;
    };
  }
  
  // Interface for RawEvolutionChain
  export interface RawEvolutionChain {
    species: {
      name: string;
      url: string;
    };
    evolution_details: {
      min_level: number | null;
      min_happiness: number | null;
      held_item: { name: string } | null;
      time_of_day: string;
      item: { name: string } | null;
      trigger: { name: string } | null;
    }[];
    evolves_to?: RawEvolutionChain[];
  }
  
  // Interface for Evo Details
  export interface EvolutionDetails {
    min_level: number | null;
    min_happiness: number | null;
    held_item: string | null;
    time_of_day: string;
    item: string | null;
    trigger: string | null;
  }
  
  // Interface for Pokemon Evolutions
  export interface PokemonEvolutionsInterface {
    name: string;
    url: string;
    evo_details: EvolutionDetails;
    evolves_to: PokemonEvolutionsInterface[]; // Recursive branching support
  }
  
  // Interface for Pokemon Damage Relations
  export interface PokemonDamageRelations {
    name: string;
    url: string;
  }