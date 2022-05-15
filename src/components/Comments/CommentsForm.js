import React, {useState} from 'react';

import Card from '../UI/Card';
import './CommentsForm.css';

const CommentsForm = React.memo(props => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const submitHandler = event => { 
    event.preventDefault();
    props.onAddComment({name: name, email: email, body: comment, postId : Math.random().toString()});
    resetField();
  };
  const resetField = () => {
    setName(''); setEmail(''); setComment('');
  }

  return (
    <section className="comment-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" value={name} onChange= {event => setName(event.target.value)}/>
          </div>
          <div className="form-control">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={email} onChange= {event => setEmail(event.target.value)}/>
          </div>
          <div className="form-control">
            <label htmlFor="comment">Comment</label>
            <textarea type="text" id="comment" value={comment} onChange= {event => setComment(event.target.value)}/>
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Comment</button>
          </div>
        </form>
      </Card>
    </section>
  );
});

export default CommentsForm;
