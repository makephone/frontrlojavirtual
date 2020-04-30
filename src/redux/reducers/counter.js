import { INCREMENT, DECREMENT,RESET } from '../actions/counter'; //IMPORTAMOS A ACTION

export const initialState = {                        //INICIALIZAMOS A VARIAVEL DE ESTADO INICIAL COUNT COMO 1
  count: 1
}

export function counterReducer(state = initialState, action) {             //FUNÇÃO QUE RETORNARA O VALOR DE ESTADO DE COUNTER ATRAVES DO REDUX 

console.log(action.type)

  switch(action.type) {
    case INCREMENT:
    console.log(state.count+1);  
    return {
        
        count: state.count + 1
      };
    case DECREMENT:
      console.log(state.count-1);
      return {
        count: state.count - 1
      };
      case RESET:
      console.log(state.count-1);
      return {
        count: (state.count - state.count)+1
      };
    default:
      return state;
  }
}