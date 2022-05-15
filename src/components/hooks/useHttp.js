import { useReducer, useCallback } from 'react';

const initialState = {
    error: null,
    data: null,
    extra: null,
    identifier: null
}
const httpReducer = (httpState, action) => {
    switch(action.type){
        case 'SEND':
            return {
                error: null,
                data: null,
                extra: null,
                identifier: action.identifier
            };
        case 'RESPONSE':
            return {
                ...httpState,
                data: action.responseData,
                extra: action.extra
            };
        case 'ERROR':
            return { error: action.errorMessage };
        case 'CLEAR':
            return initialState;
        default:
            throw new Error('Should not be reached!');
    }
}
const useHttp = () => {
    const [httpState, dispatchHttp] = useReducer(httpReducer, initialState);

    const sendRequest = useCallback( 
        (url, method, body, reqExtra, reqIdentifer) => { 
          dispatchHttp({ type: 'SEND', identifier: reqIdentifer });
          fetch(url, {
            method: method,
            body: body,
            headers: {
              'Content-Type': 'application/json; charset=UTF-8'
            }
          })
            .then(response => { 
              return response.json();
            })
            .then(responseData => {
              dispatchHttp({
                type: 'RESPONSE',
                responseData: responseData,
                extra: reqExtra
              });
            })
            .catch(error => {
              dispatchHttp({
                type: 'ERROR',
                errorMessage: 'Something went wrong!'
              });
            });
        },
        []
      );

      return {
        data: httpState.data,
        error: httpState.error,
        sendRequest: sendRequest,
        reqExtra: httpState.extra,
        reqIdentifer: httpState.identifier,
      }
}
export default useHttp;