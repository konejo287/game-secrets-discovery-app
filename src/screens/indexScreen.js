import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity } from 'react-native';
import { Context as GameContext } from '../context/GameContext';
import { Feather } from '@expo/vector-icons';

const IndexScreen = ({ navigation }) => {
    const { state, addGamePost, deleteGamePost } = useContext(GameContext);

    return (
        <View>
            <Text>Agrega un Video juego!</Text>
            <FlatList
                data={state}
                keyExtractor={(gamePosts) => gamePosts.title}
                renderItem={({item}) => {
                    return (
                        <View style={styles.row}>
                            <TouchableOpacity onPress={() => navigation.navigate('Game', { id: item.id })}>
                                <Text style={styles.title}>{item.title}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => deleteGamePost(item.id)}>
                                <Feather style={styles.icon} name="trash" />
                            </TouchableOpacity>
                        </View>
                    )
                }}
            />
        </View>
    );
};

IndexScreen.navigationOptions = ({ navigation }) => {
    return {
        headerRight: <TouchableOpacity onPress={() => navigation.navigate('Create')}>
                            <Feather name='plus' size={30} />
                    </TouchableOpacity>
    }
}

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

export default IndexScreen;