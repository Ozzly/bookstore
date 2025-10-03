import React, { useEffect, useState } from 'react'
import Search from './components/Search'

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

  const fetchBooks = async () => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const endpoint = `${API_BASE_URL}/search.json?title=the will of the many`;
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
    fetchBooks();
  }, [])

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
          bookList.map((book) => (

            <div key={book.key} className='
              border border-gray-300 rounded-lg p-4 m-2
              hover:shadow-lg transition-shadow duration-300
              '>
              <h3>{book.title}</h3>
              <p>{book.author_name}</p>
              {book.cover_i ? (
                <img src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`} alt={book.title} />

              ) :
                (<p>No cover image available</p>)
              }
            </div>
          ))
        )}
      </div>
    </main>
  )
}

export default App