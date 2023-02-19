import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity } from 'react-native';
import { Context as GameContext } from '../context/GameContext';
import { EvilIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

const GameScreen = ({ route, navigation }) => {
    const { id, paramLocalState } = route.params;
    const { state, getGameTopics, deleteGameTopic, addGameTopic, editTopicNotes } = useContext(GameContext);

    useEffect(() => {
        getGameTopics(gamePost._id);
    }, []);

    const gamePost = state.find((gamePost) => gamePost._id === id);
    const localState = paramLocalState;
    navigation.setOptions({
        headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Edit', { id: id }) }>
                <View paddingRight={16}>
                    <EvilIcons name='pencil' size={30} />
                </View>
            </TouchableOpacity>),
        title: gamePost.title
    });
    console.log('gamescreen state: ' , gamePost);
    console.log('GAME SCREEN localState: ' , localState);
    return (
        <View>
            <FlatList
                data={gamePost.topics}
                keyExtractor={(gamePost) => gamePost.title}
                renderItem={({item}) => {
                    return (
                        <View style={styles.row}>
                            <TouchableOpacity
                                onPress={() =>
                                navigation.navigate('Edit',
                                    {
                                        id: gamePost._id,
                                        topicTitle: item.title,
                                        previusScreen: 'gameScreen',
                                        editTopicNotes: editTopicNotes,
                                        addGameTopic: addGameTopic,
                                        content: item.content
                                    })
                                }>
                                <Text style={styles.title}>{item.title}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { deleteGameTopic(gamePost._id, item.title) }}>
                                <Feather style={styles.icon} name="trash" />
                            </TouchableOpacity>
                        </View>
                    )
                }}
            />
        </View>
    ); 
};



const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderTopWidth: 1,
        borderColor: 'gray'
    },
    title: {
        fontSize: 18
    },
    icon: {
        fontSize: 24
    }
});

GameScreen.navigationOptions = ({ navigation }) => {
    return {
        title: 'Topics',
        headerRight: <TouchableOpacity onPress={() => navigation.navigate('Edit', { id: navigation.getParam('id') }) }>
                        <View paddingRight={16}>
                            <EvilIcons name='pencil' size={30} />
                        </View>
                    </TouchableOpacity>
    }
}

export default GameScreen;