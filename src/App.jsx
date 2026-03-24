import { useState, useEffect } from "react";
import Resultado from "./components/Result";
import Search from "./components/Search";
import "./App.css";

function App() {
  const [nombre, setNombre] = useState("");
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!nombre.trim()) return;

    const controller = new AbortController();

    const timeout = setTimeout(async () => {
      setLoading(true);
      setError("");

      try {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${nombre.toLowerCase()}`,
          { signal: controller.signal }
        );

        if (!res.ok) {
          throw new Error("Pokemon no encontrado");
        }

        const data = await res.json();
        setPokemon(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [nombre]);

  return (
    <div className="container">
      <div className="card">
        <h1>Pokédex</h1>

        <Search nombre={nombre} setNombre={setNombre} />

        {loading && <p className="loading">Cargando...</p>}

        {error && <p className="error">{error}</p>}

        {pokemon && <Resultado pokemon={pokemon} />}
      </div>
    </div>
  );
}

export default App;