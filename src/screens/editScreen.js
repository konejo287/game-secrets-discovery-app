import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Context as GameContext } from '../context/GameContext';
import { EvilIcons } from '@expo/vector-icons';
import GamePostForm from '../components/GamePostForm';

const EditScreen = ({ navigation }) => {
    const { state, editGamePost } = useContext(GameContext);

    const gamePost = state.find(
        gamePost => gamePost.id === navigation.getParam('id')
    );

    

    return <GamePostForm 
        initValues={{title: gamePost.title}}
        onSubmit={
            () => {
                editGamePost(gamePost.id, gamePost.title);
                navigation.pop();
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