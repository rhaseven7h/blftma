import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type Pokemon = any;

// Define a service using a base URL and expected endpoints
const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query<Pokemon, string>({
      query: (name) => `pokemon/${name}`
    })
  })
});

export default pokemonApi;
