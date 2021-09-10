import React, { useState, useEffect } from 'react';
import 'materialize-css';
import { Card, CardTitle } from 'react-materialize';
import InfiniteScroll from "react-infinite-scroll-component";
import './App.css';

const POKEMON_API_URL = 'https://pokeapi.co/api/v2/pokemon';
const POKEMON_IMAGE_API = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/';
const DEFAULT_LIMIT = 20;
function App() {
  const [ list, setList ] = useState([]);
  const [ offSet, setOffSet ] = useState(0);

  const loadMorePages = () => {
    setOffSet(offSet+DEFAULT_LIMIT);
  }

  const getPokemonId = (url) => {
    return url.split('/').filter(x => x != '').pop();
  }

  useEffect(() => {
    fetch(`${POKEMON_API_URL}?limit=${DEFAULT_LIMIT}&offset=${offSet}`)
    .then( response => {
        response.json().then(data => {
          let _list = JSON.parse(JSON.stringify(list));
          _list.push(...data.results);
          setList(_list);
        });
    })
    .catch(e => console.error(e));
  }, [offSet]);

  return (
    <div className="main-container">
      <InfiniteScroll
        dataLength={ list.length }
        next={ loadMorePages }
        hasMore={ true }
      ></InfiniteScroll>
      <div className="card-box">
        {list && list.map((pokemon) => (
          <Card
            header={<CardTitle image={`${POKEMON_IMAGE_API}${getPokemonId(pokemon.url)}.png`}></CardTitle>}
          >
            <h3>{pokemon.name}</h3>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default App;
