import React, { useRef, useEffect, useState } from 'react'
import './App.css'

let bestScore = 0;

function App() {
  
  const [pokemon, setPokemon] = useState([]);
  const [totalPokemon, setTotalPokemon] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    
    
    const load = async () => {

      const total = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=151`).then(data => data.json());
      const curr = [];

      for (let i = 0; i < 12; i++) {
        let idx = Math.floor(Math.random() * total.results.length);
        while (curr.includes(total.results[idx])) {
          idx = Math.floor(Math.random() * total.results.length);
        }
        curr.push(total.results[idx]);
      }

      const data = await Promise.all(curr.map(async (pokemon) => {

          const raw = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
          const pokeData = await raw.json();
  
          return {name: pokemon.name, img: pokeData.sprites.front_default, clicked: false, rotate: false};
      }));

      randomize(data);
      setPokemon(data);
      setTotalPokemon(total.results);
    }
    
    load();

  }, []);



  const randomize = (data) => {

    let n = data.length;
    
    while (n > 0) {

      const rand = Math.floor(Math.random() * n);
      n--;

      const t = data[rand];
      data[rand] = data[n];
      data[n] = t;
      
    }
  };

  bestScore = Math.max(score, bestScore);

  
  const onClick = async (index) => {

    
    const temp = [...pokemon];
    
    if (temp[index].clicked === false) {
      setScore(score + 1);
      temp[index].clicked = true;
      if (score >= 11) {
        await addNewPokemon(temp);
      }
    } else {
      setScore(0);
      temp.forEach(poke => poke.clicked = false);
    }
      
    randomize(temp);
    setPokemon(temp);

    temp.forEach(p => p.rotate = !p.rotate);

    
  };

  const addNewPokemon = async (arr) => {
      
    const lastEl = {...arr[arr.length-1]};
      
    const prevTotal = [...totalPokemon];
    
    while (prevTotal.length > 0) {
      
      let rand = Math.floor(Math.random() * prevTotal.length);
      let hasPokemon = false;

      for (let i = 0; i < pokemon.length; i++) {
        if (pokemon[i].name === prevTotal[rand].name) {
          hasPokemon = true;
        }
      }
      if (hasPokemon) {
        rand = Math.floor(Math.random() * prevTotal.length)
      } else {
        const p = prevTotal[rand];
        prevTotal.splice(rand, 1);
        const pokeData = await fetch(`https://pokeapi.co/api/v2/pokemon/${p.name}`).then(data => data.json());
        lastEl.name = p.name;
        lastEl.img = pokeData.sprites.front_default;
        lastEl.clicked = false;
        lastEl.rotate = lastEl.rotate;
        arr[arr.length-1] = lastEl;
        randomize(arr);
        setTotalPokemon(prevTotal);
        return;
      }
      
    }


  };
  
  return (
    <div className='container' style={{width: "100vw", height: "100vh", display:"flex", alignItems:"center",justifyContent:"center", flexDirection: "column", fontFamily: "cursive",}}>
      <div style={{padding: "3rem"}}>
        <h3>Best Score: {bestScore}</h3>
        <h3>Score: {score}</h3>
      </div>
      <div className='card-container' style={{
        display: "grid",
        gridTemplateColumns: "repeat(6, auto)",
        width: "80%",
        height: "80%"
      }}>
        {
          pokemon.map((p, index) => {
            return <Card rotate={p.rotate ? "rotateY(360deg)" : "rotateY(0deg)"} onClick={() => onClick(index)} key={index} name={p.name} img={p.img} />
          })
        }
      </div>
    </div>
  )
}

function Card({name, img, onClick, rotate}) {

  return (
    <>
      <div className="card" onClick={onClick} style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        margin: "1rem",
        fontFamily: "cursive",
        transform: rotate,
      }}>
        <h2>{name.toUpperCase()}</h2>
        <img style={{width: "50%", height: "50%"}}src={img} alt="" />
      </div>
    </>
  );

}

export default App
