import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Books = () => {
    const fetchUrl = 'http://nyx.vima.ekt.gr:3000';
    const booksUrl = '/api/books';

    const [books, setBooks] = useState();
    let { page } = useParams();
    
    useEffect(() => {
        axios
        .post(
            `${fetchUrl}${booksUrl}`,
            {
                page: page,
                itemsPerPage : 10,
                filters: []
            }
        )
        .then(({ data }) => {
            setBooks(data.books);
        });
        }, []);
    
    
    
    return ( 
        <div className="Books">
            Books. page: [{ page }]
            { books ?
                <ul>
                    {
                        books.map( (book) => {
                            return (
                                <li key={book.id}>{book.book_title}</li>
                            );
                        })
                    }
                </ul>
                : <p>No books</p>
            }
        </div>
    );
}

export default Books;