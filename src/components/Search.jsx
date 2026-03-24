function Search({ nombre, setNombre }) {
  return (
    <div>
      <input
        type="text"
        placeholder="Ej: pikachu"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
    </div>
  );
}

export default Search;