import React, {useState, useEffect} from 'react';
import Card from '../UI/Card';
import './Search.css';
import useHttp from '../hooks/useHttp';

const Search = React.memo(props => {
  const {onFilterComments} = props;
  const [enteredFilter, setEnteredFilter] = useState('');
  const {  data, error, sendRequest, clear } = useHttp();

  useEffect(() => {
    
    sendRequest(
      'https://jsonplaceholder.typicode.com/comments',
      'GET'
    );
  }, [enteredFilter, sendRequest])

  useEffect(() => { 
    if ( !error && data) {
      const loadedComments = [];
      for (const key in data){
        loadedComments.push({
          id : data[key].id,
          postId: data[key].postId,
          name: data[key].name,
          email: data[key].email,
          body: data[key].body
        })
      }
      onFilterComments(loadedComments.filter(name => name.body.match(new RegExp(`${enteredFilter}`,'gi'))));
      props.onEnteredFilter(enteredFilter);
    }
  }, [data, onFilterComments, error])
  
  
  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter Messages</label>
          <input type="text" value={enteredFilter} onChange={event => setEnteredFilter(event.target.value)}/>
        </div>
      </Card>
    </section>
  );
});

export default Search;
