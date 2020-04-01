import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Context as GameContext } from '../context/GameContext';
import { EvilIcons } from '@expo/vector-icons';
import GamePostForm from '../components/GamePostForm';

const EditScreen = ({ navigation }) => {
    const { state, addGameTopic, editTopicNotes } = useContext(GameContext);

    const gamePost = state.find((gamePost) => gamePost._id === navigation.getParam('id'));
    /*const gamePostTitle = '' 
    const gamePostContent = ''*/

    const topicDetail = gamePost.topics.find((gamePostDetial) => gamePostDetial.title === navigation.getParam('topicTitle'));

    /*Object.keys(gamePost).forEach(function (item) {
        if(item == gamePost[])
    });*/


    const previusScreen = navigation.getParam('previusScreen') || 'editScreen';
    console.log('editScreen state: ' , navigation.getParam('id'), gamePost, state);
    console.log('gamepostDetail: ' , topicDetail);
    return <GamePostForm
        previusScreen={previusScreen}
        gameId={gamePost._id}
        topicDetail={topicDetail}
        onSubmit={
            (gameId, title, content) => {
                console.log('checking edit screen id: ' , gameId, content);

                content !== ''?

                editTopicNotes(gamePost._id, title, content, () => {navigation.pop()})
                : 
                addGameTopic(gamePost._id, title, () => {navigation.pop()});
                
            }
    }/>
};

const styles = StyleSheet.create({
    
});

/*EditScreen.navigationOptions = ({ navigation }) => {
    return {
        headerRight: <TouchableOpacity onPress={() => navigation.navigate('Create')}>
                            <EvilIcons name='pencil' size={30} />
                    </TouchableOpacity>
    }
}*/

export default EditScreen;