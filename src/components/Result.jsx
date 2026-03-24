function Resultado({ pokemon }) {
  return (
    <div className="result">
      <h2>{pokemon.name}</h2>

      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
      />

      <div className="types">
        {pokemon.types.map((t, i) => (
          <span key={i} className="type">
            {t.type.name}
          </span>
        ))}
      </div>
    </div>
  );
}

export default Resultado;