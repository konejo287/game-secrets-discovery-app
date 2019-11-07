import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity } from 'react-native';
import { Context as GameContext } from '../context/GameContext';
import { EvilIcons } from '@expo/vector-icons';

const GameScreen = ({ navigation }) => {
    const { state } = useContext(GameContext);

    const gamePost = state.find((gamePost) => gamePost.id === navigation.getParam('id'))

    return (
        <View>
            <Text>The notes for {gamePost.title} will be available to be posted here soon</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    
});

GameScreen.navigationOptions = ({ navigation }) => {
    return {
        headerRight: <TouchableOpacity onPress={() => navigation.navigate('Edit', {id: navigation.getParam('id')})}>
                            <EvilIcons name='pencil' size={30} />
                    </TouchableOpacity>
    }
}

export default GameScreen;