import React, { useContext, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { Context as GameContext } from '../context/GameContext';

const GamePostForm = ({ onSubmit, previusScreen, gameId, topicDetail }) => {
    const { addGamePost } = useContext(GameContext);
    
    const [title, setTitle] = useState('');
    const [content, setContent] = useState(topicDetail !== undefined ? topicDetail.content : '');

    console.log('Game post forms: ' , content, title);

    function UselessTextInput(props) {
        return (
          <TextInput
            {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
            editable
            maxLength={4000}
          />
        );
      }

    return (
        <View>
            <Text style={styles.label}>
                { previusScreen == "editScreen" ? 'Add a New topic' : 'Enter the title'}
            </Text>
            {
                previusScreen == "gameScreen" ?
                
                <TextInput
                    multiline
                    numberOfLines={300}
                    onChangeText={(content) => setContent(content)}
                    value={content}
                    style={styles.multiText}
                    editable
                    maxLength={4000}
                />
                
                : 
                
                <TextInput style={styles.input} value={title} onChangeText={(title) => setTitle(title)} />
            }
            { console.log('repeat') }
            <Button title='Save' onPress={() => {
                onSubmit(gameId, title || topicDetail.title, content);
            }}>
            </Button>
        </View>
    );
};

GamePostForm.defaultProps = {
    initValues: {
        title: '',
        content: '',
        topicDetail: {
            title: '',
            content: ''
        }
    }
}

const styles = StyleSheet.create({
    input: {
        fontSize: 18,
        borderWidth: 1,
        borderColor: 'black'
    },
    multiText: {
        backgroundColor: 'white',
        width: 600, 
        height: 600,
        borderColor: 'black',
        fontSize: 18,
        textAlignVertical: "top",
        borderColor: 'black',
        borderWidth: 2,
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