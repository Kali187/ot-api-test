import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const Books = () => {
    const fetchUrl = 'http://nyx.vima.ekt.gr:3000';
    const booksUrl = '/api/books';

    const [books, setBooks] = useState([]);
    const [itemsPerPage, setItemsPerPage] = useState(12);
    const [allBooks, setAllBooks] = useState();
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState();
    let { page } = useParams();
    
    useEffect(() => {
        axios
        .post(
            `${fetchUrl}${booksUrl}`,
            {
                page: page,
                itemsPerPage : itemsPerPage,
                filters: []
            }
        )
        .then(({ data }) => {
            console.log('Loaded data');
            setLoaded(true);
            setBooks(data.books);
            setAllBooks(data.count);
        })
        .catch(err => {
            setLoaded(true);
            setError(err);
            console.log( err );
        });
    }, [page, itemsPerPage]);
    
    return loaded ? (
        <div>
            {books &&
                <div>
                    <span>page {page} of { Math.ceil( allBooks / itemsPerPage ) }</span>
                    { page > 1 &&
                        <Link to={`/books/${ +page - 1 }`}> &lt; Previous page</Link>
                    }
                    { page < Math.ceil( allBooks / itemsPerPage) &&
                        <Link to={`/books/${ +page + 1 }`}> Next page &gt;</Link>
                    }
                </div>
            }
            <ul className="Books">
                { books ?
                    books.map( (book) => {
                        return (
                            <li className="Book" key={book.id}>
                                <h2 className="Book__title">{book.book_title}</h2>
                            
                            </li>
                        );
                    })
                    : <p>No books</p>
                }
            </ul>
        </div>
    ) : ( <p>loading...</p>);
}

export default Books;