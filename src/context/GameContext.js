import createDataContext from './createDataContext';
import gameAPI from '../api/gameAPI';

const gameReducer = (state, action) => {
    switch(action.type) {
        case  'add_gamepost':
            console.log('add_gamepost reducer: ' , action.payload, state);
            return [...state, { _id: action.payload._id, title: action.payload.title, topics: action.payload.topics }];

        case  'edit_gamepost':
                return state.map((gamePost) => {
                    return gamePost._id === action.payload_.id ? action.payload : gamePost;
                });

        case  'delete_gamepost':
                console.log('delete_gamepost reducer: ' , state, action.payload);
                return state.filter((gamePost) => gamePost._id !== action.payload);

        case  'delete_gametopic':
            console.log('delete_gametopic reducer: ' , action.payload);
            var result = state.map((gamePost) => {
                var index = gamePost.topics.findIndex(topic => topic.title === action.payload);
                if(index > 0) {
                    gamePost.topics.splice(index);
                }
                return gamePost;
            });
            console.log('new result: ' , result);
            return result;

        case  'game_list':
            console.log('payload: ' , action.payload.data);
            return action.payload.data;

        case  'game_topic_list':
            console.log('game_topic_list payload: ' , action.payload);
            return state.map((gamePost) => {
                return gamePost._id === action.payload._id ? action.payload : gamePost;
            });
        
        case  'add_gametopic':
            console.log('addtopic reducer: ' , action.payload, state);
            return foundGame = state.map((gamePost) => {
                return gamePost._id === action.payload._id ? action.payload : gamePost;
            });
        
        case  'edit_gametopic_notes':
            console.log('edit_gametopic_notes: ' , action.payload, state);
            return foundGame = state.map((gamePost) => {
                return gamePost._id === action.payload._id ? action.payload : gamePost;
            });

        default:
            return state;
    }
};

const editTopicNotes = (dispatch) => {
    return async (gameId, title, content, callback) => {
        console.log("editTopicNotes context: " , gameId , content);
        const gameTopicNotes = await gameAPI.put('editTopicNotes', {gameId: gameId, title: title, content: content});
        console.log('editTopicNotes response: ' , gameTopicNotes.data);
        dispatch({ type: 'edit_gametopic_notes', payload: gameTopicNotes.data });
        callback();
    }
}

const addGameTopic = (dispatch) => {
    return async (gameId, topicTitle, callback) => {
        console.log("add game topic context: " , gameId , topicTitle);
        const gameTopicList = await gameAPI.put('addgameTopic', {gameId: gameId, topicTitle: topicTitle});
        console.log('add game topic response: ' , gameTopicList.data);
        dispatch({ type: 'add_gametopic', payload: gameTopicList.data });
        callback();
    }
}

const getGameList = (dispatch) => {
    return async () => {
       const gameList = await gameAPI.get('games');
       dispatch({ type: 'game_list', payload: gameList });
       return gameList.data;
    }
    
};

const getGameTopics = (dispatch) => {
    return async (id, title) => {
        console.log('the game id is: ' , id);
        const gameTopicList = await gameAPI.get('gameTopicList', {
            params: {
              gameId: id
            }}
        );
        dispatch({ type: 'game_topic_list', payload: gameTopicList.data });
        //return gameTopicList.data;
    }
}

const addGamePost = (dispatch) => {
    return async (title, callback) => {
        console.log('add game post: ' , title);
        const gamePost = await gameAPI.post('game', { title })
        console.log('addGamepost : ' , gamePost.data);
        dispatch({ type: 'add_gamepost', payload: gamePost.data });
        callback();
    }
    
};

const deleteGamePost = (dispatch) => {
    return async (id) => {
        console.log('front id to delete is: ' , id);
        const games = await gameAPI.delete('deleteGame', { data: {gameId: id }});
        dispatch({ type: 'delete_gamepost', payload: id });
    }
    
};

const deleteGameTopic = (dispatch) => {
    return async (id, title) => {
        console.log('id topic to delete is: ' , id, title);
        const game = await gameAPI.delete('deleteGameTopic', { data: {gameId: id, title: title }});
        dispatch({ type: 'delete_gametopic', payload: title});
    }
}

const editGamePost = (dispatch) => {
    return (id, title) => {
        dispatch({ type: 'edit_gamepost', payload: { id, title } });
    }
    
};

export const { Context, Provider } = createDataContext(
                gameReducer, { 
                    addGamePost, 
                    getGameList, 
                    getGameTopics, 
                    deleteGamePost,
                    deleteGameTopic,
                    editGamePost, 
                    addGameTopic, 
                    editTopicNotes 
                }, []);