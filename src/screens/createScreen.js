import React, { useContext } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, Button, TouchableOpacity } from 'react-native';
import { Context as GameContext } from '../context/GameContext';
import GamePostForm from '../components/GamePostForm';

const CreateScreen = ({ navigation }) => {
    const { state, addGamePost } = useContext(GameContext);

    return <GamePostForm onSubmit={(gameId, title) => {
                addGamePost(title, () => { navigation.navigate('Index') });
            }}
           />
};

export default CreateScreen;