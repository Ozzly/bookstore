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
  // const [readBooksDetails, setReadBooksDetails] = useState([]);

  useEffect(() => {
    debouncedSearchTerm !== '' && fetchBooksQuery(debouncedSearchTerm);
  }, [debouncedSearchTerm])

  useEffect(() => {
    localStorage.setItem('readBooks', JSON.stringify(readBooks));
  }, [readBooks]);

  // useEffect(() => {
  //   readBooks.length === 0 ? setReadBooksDetails([]) : fetchWorksByKeys(readBooks);
  // }, [readBooks, debouncedSearchTerm]);

  // const fetchWorksByKeys = async (keys) => {
  //   const details = await Promise.all(
  //     keys.map (async (key) => {
  //       const response = await fetch(`${API_BASE_URL}${key}.json`, API_OPTIONS);
  //       if (!response.ok) return null;
  //       return await response.json();
  //     })
  //   );
  //   setReadBooksDetails(details);
  //   console.log(details);
  // }

  const fetchBooksQuery = async (query = '') => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const endpoint = `${API_BASE_URL}/search.json?title=${encodeURIComponent(query)}`;
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

  const toggleReadStatus = (book) => {
    setReadBooks((prevReadBooks) => {
      const exists = prevReadBooks.some(b => b.key === book.key);

      if (exists) {
        return prevReadBooks.filter((b) => b.key !== book.key);
      } else {
        return [...prevReadBooks, {
          key: book.key, 
          title: book.title, 
          author_name: book.author_name, 
          cover_i: book.cover_i,
          edition_count: book.edition_count,
          first_publish_year: book.first_publish_year,
        }];
      }
    });
  }

  

  return (
    <main>
      <header>Store book info</header>

      {/* <div className='books-summary-section'>
        <h2>Read Books</h2>
        <div>
          <BookList books={readBooks} readBooks={readBooks} toggleReadStatus={toggleReadStatus} />
        </div>
      </div> */}
      
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div>
        <h2>All Books</h2>
        {debouncedSearchTerm == '' ? (
          <>
            <p>Showing Read Books</p>
            <BookList books={readBooks} readBooks={readBooks} toggleReadStatus={toggleReadStatus} />

          </>
          
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