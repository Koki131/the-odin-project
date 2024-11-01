import React, { useRef, useEffect, useState } from 'react'
import './App.css'

let bestScore = 0;

function App() {
  
  const [pokemon, setPokemon] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {

    const names = ["pikachu", "squirtle", "charizard", "ditto", "swampert", "suicune", "zoroark", "torterra", "bulbasaur", "donphan", "mew", "jirachi"];
    

    const load = async () => {
      const data = await Promise.all(names.map(async (name) => {

          const raw = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
          const pokeData = await raw.json();
  
          return {name: name, img: pokeData.sprites.front_default, clicked: false, rotate: false};
      }));

      randomize(data);
      setPokemon(data);
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

  const onClick = (index) => {

    
    const temp = [...pokemon];
    temp.forEach(p => p.rotate = !p.rotate);
    
    if (temp[index].clicked === false) {
      setScore(score + 1);
      temp[index].clicked = true;
    } else {
      setScore(0);
      temp.forEach(poke => poke.clicked = false);
    }

    randomize(temp);
    setPokemon(temp);

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
