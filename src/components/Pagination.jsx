import React, { useEffect, useState } from 'react'

const Pagination = ({ page, setPage }) => {
  const [pages, setPages] = useState([])
  
  useEffect(() => {
    let temp = [page];
    
    for (let i = 0; i < 4; i++) {
      if (temp[temp.length - 1] + 1 <= 500) {
        temp.push(temp[temp.length - 1] + 1);
      } else {
        temp.unshift(temp[0] - 1)
      }

      if (temp[0] - 1 <= 0) {
        temp.push(temp[temp.length - 1] + 1);
      } else {
        temp.unshift(temp[0] - 1)
      }
    }

    setPages(temp)
  }, [page])

  console.log(pages)

  return (
    <section className="flex justify-between items-center w-full text-white">
      <button 
        className="cursor-pointer" 
        onClick={() => setPage(prev => prev === 1 ? prev : prev - 1)}
        disabled={page - 1 === 0}
      >
        <i className="fas fa-arrow-left"></i>
      </button>
      <div className="flex w-1/2 justify-between">
        {pages.length === 0 ? (
          <span className="loader size-4"></span>
        ) : pages
          .map(num => (
            <button 
              className={`cursor-pointer p-1 px-2 rounded-sm hover:bg-indigo-900 active:hover:bg-indigo-950 ${num === page? 'bg-indigo-900' : ''}`}
              onClick={() => setPage(num)}
            >
              {num}
            </button>
          ))}
      </div>
      <button className="cursor-pointer" onClick={() => setPage(prev => prev === pages ? prev : prev + 1)}>
        <i className="fas fa-arrow-right"></i>
      </button>
    </section>
  )
}

export default Pagination