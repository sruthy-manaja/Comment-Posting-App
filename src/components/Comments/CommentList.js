import React, {useState, useEffect} from 'react';
import DeleteIcon from "../../images/deleteicon.png"
import './CommentList.css';

const CommentList = props => {  
  const contentPerPage= 10; 
  const [totalPageCount] = useState(Math.ceil(props.comments.length/contentPerPage));
  const [currentPage, setCurrentPage] = useState(1);
  
  
  useEffect(() => { 
    if(props.filterActive === true){setCurrentPage(1)}
  }, [props.filterActive, props.comments])
  
  
  function goToNextPage() {
    setCurrentPage((page) => page + 1);
  }
  function gotToPreviousPage() {
    setCurrentPage((page) => page - 1);
  }
  // function changePage(event) {
  //   const pageNumber = Number(event.target.textContent);
  //   setCurrentPage(pageNumber);
  // }
  const getPaginatedData = () => {
    const startIndex = currentPage * contentPerPage - contentPerPage;
    const endIndex = startIndex + contentPerPage;
    return props.comments.slice(startIndex, endIndex);
  };

  return (
    <section className="comment-list">
      
      <ul>
        {getPaginatedData().map(item => (
          <li key={item.id} >
           
            <p>{item.body}</p>
            <div>
            <span><em>by</em> {item.name}</span>
            <span>{item.email}</span>
            </div>    
            <a onClick={props.onRemoveItem.bind(this, item.id)}><img src={DeleteIcon} alt="delete icon"></img> Delete Item</a>        
          </li>
        ))}
      </ul>

      {/* show the pagiantion
                it consists of next and previous buttons
                along with page numbers, in our case, 5 page
                numbers at a time */}
      <div className="pagination">
        {/* previous button */}
        <button
          onClick={gotToPreviousPage}
          className={` prev ${currentPage === 1 ? "disabled" : ""}`}
        >
          previous
        </button>
        {/* show paginated button group */} 
        <p>Page {currentPage} / {Math.ceil(props.comments.length/ contentPerPage)}</p>
        {/* next button */}
        <button
          onClick={goToNextPage}
          className={`next ${currentPage === totalPageCount ? "disabled" : ""}`}
        >
          next
        </button>
      </div>
    </section>
  );
};

export default CommentList;

