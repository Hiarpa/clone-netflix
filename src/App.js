import { useEffect, useState } from "react";
import Tmdb from "./Tmdb";
import MoviwRow from './components/MovieRow';


function App() {

  const [movieList, setMovieList] = useState([]);

  useEffect(()=>{
    const loadAll = async() =>{
      let list = await Tmdb.getHomeList();
      setMovieList(list)
    }

    loadAll();
  }, [])

  return (
    <>
      <div className="page">
        <section className="lists">
          {movieList.map((item, key) => (
            <MoviwRow/>
          ))}
        </section>
      </div>
    </>
  );
}

export default App;
