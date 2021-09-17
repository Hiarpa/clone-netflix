import React from "react";
import { useEffect, useState } from "react";
import './styles/App.css';
import Tmdb from "./utils/Tmdb";
import MovieRow from './components/MovieRow';
import FeaturedMovie from "./components/FeaturedMovie";
import Header from "./components/Header";

function App() {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(() => {
    const loadAll = async () => {
      let list = await Tmdb.getHomeList();
      setMovieList(list)

      let originals = list.filter(i => i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1))
      let chosen = originals[0].items.results[randomChosen]
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv')
      setFeaturedData(chosenInfo)
    }

    loadAll();
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if(window.scrollY > 50){
        setBlackHeader(true);
      }else{
        setBlackHeader(false)
      }

    }

    window.addEventListener('scroll', scrollListener)

    return () => {
      window.removeEventListener('scroll', scrollListener)
    }
  }, [])


  return (
    <>
      <Header black={blackHeader} />
      <div className="page">
        {featuredData &&
          <FeaturedMovie item={featuredData} />
        }
        <section className="lists">
          {movieList.map((item, key) => (
            <MovieRow key={key} title={item.title} items={item.items} />
          ))}
        </section>
        <footer>
          Feito com <span role="img" aria-label="heart">❤️</span> por Hiarpa Neto<br/>
          Data from <a href="https://www.themoviedb.org/">The Movie Database</a>
        </footer>
      </div>

      {movieList.length <=0 && 
      <div className="loading">
        <img src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif" alt="Carregando"/>
      </div>}
    </>
  );
}

export default App;
