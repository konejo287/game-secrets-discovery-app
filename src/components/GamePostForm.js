import React, { useContext, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { Context as GameContext } from '../context/GameContext';

const GamePostForm = ({ onSubmit, previusScreen, gameId, topicDetail, navigation }) => {
    const { state, addGamePost } = useContext(GameContext);
    
    const [title, setTitle] = useState('');
    const [content, setContent] = useState(topicDetail !== undefined ? topicDetail.content : '');

    const checkSwitch = () => {
      console.log("LOG previous screen: " , previusScreen);
      switch(previusScreen) {
        case "gameScreen":
            return 'Add more notes to this topic';
          break;

        case "gameTopicsScreen":
            return 'Add a New Topic to this game';
          break;

        case "indexScreen":
            return 'Create a New Game';
          break;

         default: return null;
      }
    }

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
        <View style={styles.postFormView}>
            <Text style={styles.label}>
                {
                  checkSwitch(previusScreen)
                }
            </Text>
            {
                previusScreen == "gameScreen" ?
                <View style={styles.backgroundStyleMulti}>
                    <TextInput
                        multiline
                        numberOfLines={300}
                        onChangeText={(content) => {
                            navigation.setParams({content: content });
                            setContent(content)
                        }}
                        value={content}
                        style={styles.multiText}
                        editable
                        maxLength={4000}
                    />
                </View>
                : 
                <View style={styles.backgroundStyle}>
                    <TextInput 
                        placeholder="Tap here"
                        style={styles.input}
                        value={title}
                        onChangeText={ (title) => setTitle(title) } 
                    />
                </View>
            }
            <TouchableOpacity 
                style={styles.touchableSaveBtn} 
                onPress={() => {
                    if(previusScreen !== 'gameScreen' && !title) return;
                    onSubmit(gameId, title || topicDetail.title, content);
                }}>
                <Text style={styles.touchableSaveBtnText}>SAVE</Text>
            </TouchableOpacity>
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
    backgroundStyleMulti: {
        backgroundColor: '#F0EEEE',
        height: '80%',
        borderRadius: 5,
        flexDirection: 'row',
        marginBottom: 15
    },
    backgroundStyle: {
        backgroundColor: '#F0EEEE',
        height: 50,
        borderRadius: 5,
        flexDirection: 'row',
        marginBottom: 15
    },
    postFormView: {
        width: '95%',
        alignItems: 'stretch',
        marginHorizontal: 10
    },
    input: {
        fontSize: 18,
        paddingLeft: 10,
        width: '100%'
    },
    multiText: {
        width: '100%', 
        height: '85%',
        fontSize: 18,
        textAlignVertical: "top",
        padding: 10,
        marginBottom: 10
    },
    label: {
        fontSize: 20,
        marginVertical: 15
    },
    touchableSaveBtn: {
        alignItems: "center",
        backgroundColor: "#0099ff",
        padding: 10,
        borderRadius: 5
    },
    touchableSaveBtnText: {
        color: "#ffffff",
        fontWeight: '600',
        fontSize: 17
    },
    icon: {
        fontSize: 24
    }
});

GamePostForm.navigationOptions = (props) => {
    return {
        title: "Game Notes",
        headerRight: <TouchableOpacity 
                        onPress={() =>  {
                                testFunc()
                            }
                        }>
                         <View paddingRight={16}>
                             <Ionicons name='md-checkmark' style={styles.icon} size={30} />
                         </View>
                     </TouchableOpacity>
    }
}

export default GamePostForm;