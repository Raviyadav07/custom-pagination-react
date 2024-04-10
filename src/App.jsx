import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const data = await response.json();
      setAllPosts(data);
    };

    fetchData();
  }, []);

  // Logic to calculate current posts based on currentPage and postsPerPage
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = allPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Logic to generate array of page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allPosts.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className='app'>
      <h1 className='heading-text'>Posts</h1>
      <div className='posts-container'>
        {currentPosts.map((post) => (
          <div key={post.id} className='card'>
            <strong>{`${post.id}. ${post.title}`}</strong>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
      <div className='pagination'>
        <select
          className='page-number'
          value={postsPerPage}
          onChange={(e) => setPostsPerPage(parseInt(e.target.value))}
        >
          <option value={5}>5 per page</option>
          <option value={10}>10 per page</option>
          <option value={20}>20 per page</option>
        </select>
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous Page
        </button>
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={`page-number ${currentPage === number ? 'active' : ''}`}
          >
            {number}
          </button>
        ))}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={indexOfLastPost >= allPosts.length}
        >
          Next Page
        </button>
      </div>
    </div>
  );
};

export default App;
