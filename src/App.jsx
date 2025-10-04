import React, { useEffect, useState } from 'react'
import Search from './components/Search'
import BookCard from './components/BookCard';
import { useDebounce } from "use-debounce";


const API_BASE_URL = "https://openlibrary.org";
const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json'
  }
}

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [bookList, setBookList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearchTerm] = useDebounce(searchTerm, 1000);

  const fetchBooks = async (query = '') => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const endpoint = query ? `${API_BASE_URL}/search.json?title=${encodeURIComponent(query)}` : `${API_BASE_URL}/search.json?q=the`;
      const response = await fetch(endpoint, API_OPTIONS);
      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }

      const data = await response.json();
      console.log(data);

      if (data.Response === 'False') {
        setErrorMessage(data.Error || "Failed to fetch movies");
        setBookList([]);
        return;
      }

      setBookList(data.docs || [])

    } catch (error) {
      console.log(`Error fetching book: ${error}`);
      setErrorMessage('Error fetching books.');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    debouncedSearchTerm !== '' && fetchBooks(debouncedSearchTerm);
  }, [debouncedSearchTerm])

  return (
    <main>
      <header>Store book info</header>

      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div>
        <h2>All Books</h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : errorMessage ? (
          <p className='text-red-500'>{errorMessage}</p>
        ) : (
          <ul className='grid gap-4'> 
          {bookList.map((book) => (
            <BookCard key={book.key} book={book} />
            
          ))}
          </ul>
        )}
      </div>
    </main>
  )
}

export default App