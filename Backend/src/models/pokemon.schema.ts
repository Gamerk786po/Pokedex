import { Schema } from "mongoose";

// Iv Schema
const IvSchema = new Schema(
  {
    hp: { type: Number, default: 0, min: 0, max: 31 },
    attack: { type: Number, default: 0, min: 0, max: 31 },
    defense: { type: Number, default: 0, min: 0, max: 31 },
    spAttack: { type: Number, default: 0, min: 0, max: 31 },
    spDefense: { type: Number, default: 0, min: 0, max: 31 },
    speed: { type: Number, default: 0, min: 0, max: 31 },
  },
  { _id: false }
);
// Ev Schema
const EvSchema = new Schema(
  {
    hp: { type: Number, default: 0, min: 0, max: 252 },
    attack: { type: Number, default: 0, min: 0, max: 252 },
    defense: { type: Number, default: 0, min: 0, max: 252 },
    spAttack: { type: Number, default: 0, min: 0, max: 252 },
    spDefense: { type: Number, default: 0, min: 0, max: 252 },
    speed: { type: Number, default: 0, min: 0, max: 252 },
  },
  { _id: false }
);

// Pokemon Schema
const PokemonSchema = new Schema({
  pokedex_id: {
    type: Number,
    required: true,
  },
  name: String,
  level: {
    type: Number,
    required: true,
    min: 1,
    max: 100,
  },
  nature: String,
  ability: String,
  item: String,
  moves: [String],
  ivs: {
    type: IvSchema,
  },
  evs: {
    type: EvSchema,
  },
});

// Adding validator for Evs
PokemonSchema.path("evs").validate({
  validator: function (evObj: any) {
    if (!evObj) return true;
    const total =
      (evObj.hp || 0) +
      (evObj.attack || 0) +
      (evObj.defense || 0) +
      (evObj.spAttack || 0) +
      (evObj.spDefense || 0) +
      (evObj.speed || 0);
    return total <= 510;
  },
  message: "Evs total must not exceed 510",
});

export default PokemonSchema;
