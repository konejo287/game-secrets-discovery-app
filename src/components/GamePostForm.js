import React, { useContext, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { Context as GameContext } from '../context/GameContext';

const GamePostForm = ({ onSubmit, initValues }) => {
    const { addGamePost } = useContext(GameContext);
    
    const [title, setTitle] = useState(initValues.title);

    console.log('Game post form: ' , title)

    return (
        <View>
            <Text style={styles.label}>Enter Title: </Text>
            <TextInput style={styles.input} value={title} onChangeText={(title) => setTitle(title)} />
            
            <Button title='Save' onPress={() => {
                onSubmit(title);
            }}>
            </Button>
        </View>
    );
};

GamePostForm.defaultProps = {
    initValues: {
        title: ''
    }
}

const styles = StyleSheet.create({
    input: {
        fontSize: 18,
        borderWidth: 1,
        borderColor: 'black'
    },
    label: {
        fontSize: 20,
        marginBottom: 10
    }
});

/*GamePostForm.navigationOptions = ({ navigation }) => {
    return {
        headerRight: <TouchableOpacity onPress={() => navigation.navigate('Create')}>
                            <EvilIcons name='pencil' size={30} />
                    </TouchableOpacity>
    }
}*/

export default GamePostForm;