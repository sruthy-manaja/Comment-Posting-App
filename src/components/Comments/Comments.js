import React, { useState, useEffect, useCallback } from 'react';
import CommentsForm from './CommentsForm';
import './Comments.css'
import Search from './Search';
import useHttp from '../hooks/useHttp';
import CommentList from './CommentList';
import ErrorModal from '../UI/ErrorModal';

function Comments() {
  const [userComments, setUserComments] = useState([]);
  const {  data, error, sendRequest, reqExtra, reqIdentifer } = useHttp();
  const [isPaginate, setIsPaginate] = useState(false)
  console.log(isPaginate)
  useEffect(() => { 
    if(!error && data && reqIdentifer === 'ADD_COMMENT'){ 
      setUserComments(prevComments => [
        { id: Math.random().toString(), ...reqExtra },
        ...prevComments
      ])
      setIsPaginate(true);
    }
    else if(!error && reqIdentifer === 'REMOVE_COMMENT'){ 
      setUserComments(userComments.filter(item => item.id !== reqExtra))
    }
    setTimeout(() => {
      setIsPaginate(false);
    }, 2000);
  }, [data, error, reqExtra])
  
  const addCommentHandler = useCallback((newComment) => { 
    sendRequest(
      'https://jsonplaceholder.typicode.com/comments',
      'POST',
      JSON.stringify(newComment),
      newComment,
      'ADD_COMMENT'
    );
    
  }, [sendRequest])
  const filterCommentsHandler = useCallback((filtercomments) => { 
    setUserComments(filtercomments);
  }, []);
  const filterInputHandler = useCallback((enteredInput) => { 
    if(enteredInput === ''){
      setIsPaginate(false);
    }
    else{
      setIsPaginate(true);
    }
  }, [])
   const removeCommentHandler = useCallback((commentId) => {
    sendRequest(
      'https://jsonplaceholder.typicode.com/comments',
      'DELETE',
      null,
      commentId,
      'REMOVE_COMMENT'
    );
   
     
   }, [sendRequest])
  const clearErrorHandler = () => {
    
  }
  return (
    <div className="App">
      {error && <ErrorModal onClose={clearErrorHandler}>{error}</ErrorModal>}
      <CommentsForm onAddComment={addCommentHandler}/>

      <section className='comment-wrap'>
        <div className='list-header'>
          <h2>Loaded Comments</h2>
          <Search onFilterComments={filterCommentsHandler} onEnteredFilter={filterInputHandler}/>
        </div>
        <CommentList comments={userComments} onRemoveItem={removeCommentHandler} filterActive={isPaginate}/>
      </section>
    </div>
  );
}

export default Comments;
