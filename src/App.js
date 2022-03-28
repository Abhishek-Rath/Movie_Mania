import { useEffect, useState } from 'react';

import './App.css';
import MovieCard from './MovieCard';
import SearchIcon from "./search.svg";
// 9e6557b5
// http://www.omdbapi.com/?i=tt3896198&apikey=9e6557b5

const api_url = "http://www.omdbapi.com?apikey=9e6557b5";

const movie1 = {
    "Title": "Naruto: Shippûden",
    "Year": "2007–2017",
    "imdbID": "tt0988824",
    "Type": "series",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMTE5NzIwMGUtYTE1MS00MDUxLTgyZjctOWVkZDAxM2M4ZWQ4XkEyXkFqcGdeQXVyNjc2NjA5MTU@._V1_SX300.jpg"
}

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const searchMovies = async (title) => {
        const response = await fetch(`${api_url}&s=${title}`);
        const data = await response.json();
        console.log(data.Search);

        setMovies(data.Search);
    }
    useEffect(() => {
        searchMovies("Another");
    }, []);

    return (
        <div className="app">
            <h1>MovieMania</h1>
            <div className='search'>
                <input
                    placeholder="Search for movies/shows"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                />
                <img
                    src={SearchIcon}
                    alt="search"
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>

            <div className='container'>
                {movies?.length > 0 ? (
                    <div className="container">
                        {movies.map((movie) => (
                            <MovieCard movie={movie} />
                        ))}
                    </div>
                ) : (
                    <div className="empty">
                        <h2>No movies found</h2>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;