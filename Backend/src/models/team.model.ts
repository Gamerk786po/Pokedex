import { Schema, model } from "mongoose";
import PokemonSchema from "./pokemon.schema"; // importing PokemonSchema


// Team Schema
const TeamSchema = new Schema({
  teamName: {
    type: String,
    required: [true, "teamName is required"],
  },
  owner: {
    type: Schema.Types.ObjectId, //relation with Player
    ref: "Player",
  },
  pokemons: {
    type: [PokemonSchema],
    required: [true, "Pokemons must be provided"],
    validate: {
      validator: function (val: any) {
        return val.length === 6;
      },
      message: "Team must contain 6 pokemons",
    },
  },
}, {timestamps: true});

export const Team = model("Team", TeamSchema);
