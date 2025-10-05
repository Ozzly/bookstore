import React, { useEffect, useState } from 'react'
import Search from './components/Search'
import BookList from './components/BookList';
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
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearchTerm] = useDebounce(searchTerm, 1000);
  const [readBooks, setReadBooks] = useState(() => {
    const stored = localStorage.getItem('readBooks');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    debouncedSearchTerm !== '' && fetchBooksQuery(debouncedSearchTerm);
  }, [debouncedSearchTerm])

  useEffect(() => {
    localStorage.setItem('readBooks', JSON.stringify(readBooks));
  }, [readBooks]);

  const fetchBooksQuery = async (query = '') => {
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
        setBooks([]);
        return;
      }

      setBooks(data.docs || [])

    } catch (error) {
      console.log(`Error fetching book: ${error}`);
      setErrorMessage('Error fetching books.');
    } finally {
      setIsLoading(false);
    }
  }

  const toggleReadStatus = (bookKey) => {
    setReadBooks((prevReadBooks) => {
      if (prevReadBooks.includes(bookKey)) {
        return prevReadBooks.filter((key) => key !== bookKey);
      } else {
        return [...prevReadBooks, bookKey];
      }
    });
  }

  

  return (
    <main>
      <header>Store book info</header>

      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div>
        <h2>All Books</h2>
        {debouncedSearchTerm == '' ? (
          <p>Start typing to search for books</p>
        ) : isLoading ? (
          <p>Loading...</p>
        ) : errorMessage ? (
          <p className='text-red-500'>{errorMessage}</p>
        ) : (
          <BookList books={books} readBooks={readBooks} toggleReadStatus={toggleReadStatus} />
          
        )}
      </div>
    </main>
  )
}

export default App