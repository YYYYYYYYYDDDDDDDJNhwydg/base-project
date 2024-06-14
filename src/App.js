import React from 'react';
import { Collection } from './Collections';
import './index.scss';


const cats = [
    { "name": "Все" },
    { "name": "Море" },
    { "name": "Горы" },
    { "name": "Архитектура" },
    { "name": "Города" }
  ]


function App() {
  
  const [categoryId, setCategoryId] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);
  const [page, setPage] = React.useState(1);
  const [seacrhValue, setSeacrhValue] = React.useState('');
  const [collections, setCollections] = React.useState([]);



  React.useEffect(() => {
    setIsLoading(true);

    const category = categoryId ? `category=${categoryId}` : '';

    fetch(`https://666c021849dbc5d7145c2d9a.mockapi.io/foto-colections?page=${page}&limit=3&${category}`)
    .then((res) => res.json())
    .then((json) => {
      setCollections(json);
    })
    .catch((err) => {
      console.warn(err);
      alert('Ошибка при получении данных')
    }).finally(() => setIsLoading(false))
  }, [categoryId, page]);

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {
            cats.map((obj, i) => (
            <li 
              key={obj.name}
              onClick={() => setCategoryId(i)}
              className={categoryId === i ? 'active' : ''}
            >
              {obj.name}
            </li>
          ))}
        </ul>
        <input 
          value={seacrhValue} 
          onChange={e => setSeacrhValue(e.target.value)} 
          className="search-input" 
          placeholder="Поиск по названию"
        />
      </div>
      <div className="content">
        {isLoading ? (<h2>Идет загрузка ....</h2>
      ) : (
        collections
        .filter(obj => obj.name.toLowerCase().includes(seacrhValue.toLowerCase()))
        .map((obj, index) => (
          <Collection
          key={index}
          name={obj.name}
          images={obj.photos}
        />
        ))
      )}
      </div>
      <ul className="pagination">
        {
          [...Array(5)].map((_, i) => (
            <li
              onClick={() => setPage(i + 1)} 
              className={page === (i + 1) ? "active" : ""}
            >
              {i + 1}
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export default App;
