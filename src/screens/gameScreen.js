import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity, Alert } from 'react-native';
import { Context as GameContext } from '../context/GameContext';
import { Feather } from '@expo/vector-icons';
import RightHeader from '../components/RightHeader';

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
          <RightHeader navigation={navigation} action={{route: 'Edit', value: { id, previusScreen: 'gameTopicsScreen' }}} icon={'plus'} />
        ),
        title: gamePost.title
    });

    return (
        <View>
            <FlatList
                data={gamePost.topics}
                keyExtractor={(gamePost) => gamePost.title}
                renderItem={({item}) => {
                    return (
                        <View style={styles.row}>
                            <TouchableOpacity
                                style={styles.touchableOpacity}
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
                            <TouchableOpacity style={styles.touchableOpacity} onPress={() => {
                              Alert.alert('WARNING!', `You're about to erase a topic and all of it's notes.
                              \r\nIs this OK?`, [
                                {
                                  text: 'Cancel',
                                  onPress: () => console.log('Cancel Pressed'),
                                  style: 'cancel',
                                },
                                {
                                  text: 'OK', onPress: () =>
                                    Alert.alert('WARNING!', `Are you really sure?`, [
                                      {
                                        text: 'Cancel',
                                        onPress: () => console.log('Cancel Pressed'),
                                        style: 'cancel',
                                      },
                                      {
                                        text: 'OK', onPress: () => deleteGameTopic(gamePost._id, item.title)
                                      },
                                  ])
                                },
                              ]);
                            }}
                              >
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
        height: 70,
        paddingHorizontal: 20,
        borderTopWidth: 1,
        borderColor: 'gray'
    },
    touchableOpacity: {
      height: "100%",
      width: "90%",
      justifyContent: "center",
    },
    title: {
        width: "100%",
        fontSize: 18
    },
    icon: {
        marginHorizontal: 15,
        fontSize: 24
    }
});

export default GameScreen;