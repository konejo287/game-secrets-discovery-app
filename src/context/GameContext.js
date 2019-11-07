import createDataContext from './createDataContext';

const gameReducer = (state, action) => {
    switch(action.type) {
        case  'add_gamepost':
            return [...state, { id: Math.floor(Math.random() * 999), title: action.payload }];
        case  'edit_gamepost':
            
                return state.map((gamePost) => {
                    return gamePost.id === action.payload.id ? action.payload : gamePost;
                });
        case  'delete_gamepost':
                return state.filter((gamePost) => gamePost.id !== action.payload);
        default:
            return state;
    }
};

const addGamePost = (dispatch) => {
    return (title) => {
        dispatch({ type: 'add_gamepost', payload: title });
    }
    
};

const deleteGamePost = (dispatch) => {
    return (id) => {
        dispatch({ type: 'delete_gamepost', payload: id });
    }
    
};

const editGamePost = (dispatch) => {
    return (id, title) => {
        dispatch({ type: 'edit_gamepost', payload: { id, title } });
    }
    
};

export const { Context, Provider } = createDataContext(gameReducer, { addGamePost, deleteGamePost, editGamePost }, []);