import React, { useContext } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Context as GameContext } from '../context/GameContext';
import { Ionicons } from '@expo/vector-icons';
import GamePostForm from '../components/GamePostForm';

const EditScreen = ({ route, navigation }) => {
    const { id, topicTitle, previusScreen, editScreen } = route.params;
    const { state, addGameTopic, editTopicNotes } = useContext(GameContext);
    const gamePost = state.find((gamePost) => gamePost._id === id);
    const topicDetail = gamePost.topics.find((gamePostDetial) => gamePostDetial.title === topicTitle);

    return <GamePostForm
        previusScreen={previusScreen}
        gameId={gamePost._id}
        topicDetail={topicDetail}
        navigation={navigation}
        onSubmit={
            (gameId, title, content) => {
                content !== ''?
                  editTopicNotes(gamePost._id, title, content, () => {navigation.pop()})
                  :
                  addGameTopic(gamePost._id, title, () => {navigation.pop()});
            }
    }/>
};

EditScreen.navigationOptions = (props) => {
    let editTopicNotes = props.navigation.state.params.editTopicNotes;
    let addGameTopic = props.navigation.state.params.addGameTopic;
    let _id = props.navigation.state.params.id;
    let title = props.navigation.state.params.topicTitle;
    let content = props.navigation.state.params.content || '';

    return {
        title: "Game Notes",
        headerRight: <TouchableOpacity 
                        onPress={() => {
                                content !== ''?
                                  editTopicNotes(_id, title, content, () => {props.navigation.pop()})
                                  :
                                  addGameTopic(_id, title, () => {props.navigation.pop()});
                            }
                        }>
                         <View paddingRight={16}>
                             <Ionicons name='md-checkmark' style={styles.icon} size={30} />
                         </View>
                     </TouchableOpacity>
    }
}

export default EditScreen;