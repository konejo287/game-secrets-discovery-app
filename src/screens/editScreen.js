import React, { useContext } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Context as GameContext } from '../context/GameContext';
import { Ionicons } from '@expo/vector-icons';
import GamePostForm from '../components/GamePostForm';

const EditScreen = ({ navigation }) => {

    /*navigationOptions = {
    
        //const testFunc = () => {
            //console.log('EDIT SCREEN NAVIGATOR: ' , props.navigation);
        //}
    
        //return {
            title: "Game Notes",
            headerRight: (<TouchableOpacity 
                            onPress={() =>  {
                                    testFunc()
                                    //onSubmit(gameId, title || topicDetail.title, content)
                                }
                            }>
                             <View paddingRight={16}>
                                 <Ionicons name='md-checkmark' style={styles.icon} size={30} />
                             </View>
                         </TouchableOpacity>)
        //}
    };*/

    const { state, addGameTopic, editTopicNotes } = useContext(GameContext);

    const gamePost = state.find((gamePost) => gamePost._id === navigation.getParam('id'));
   

    const topicDetail = gamePost.topics.find((gamePostDetial) => gamePostDetial.title === navigation.getParam('topicTitle'));

    //console.log('CHECKING ID');
    /*Object.keys(gamePost).forEach(function (item) {
        if(item == gamePost[])
    });*/

    

    const previusScreen = navigation.getParam('previusScreen') || 'editScreen';
    /*console.log('editScreen state: ' , navigation.getParam('id'), gamePost, state);
    console.log('gamepostDetail: ' , topicDetail, previusScreen);*/
    return <GamePostForm
        previusScreen={previusScreen}
        gameId={gamePost._id}
        topicDetail={topicDetail}
        navigation={navigation}
        onSubmit={
            (gameId, title, content) => {
                console.log('EDIT SCREEN CHECKING ID: ' , gameId, content);

                /*content !== ''?

                editTopicNotes(gamePost._id, title, content, () => {navigation.pop()})
                : 
                addGameTopic(gamePost._id, title, () => {navigation.pop()});*/
                
            }
    }/>
};

const styles = StyleSheet.create({
    
});

EditScreen.navigationOptions = (props) => {
    
    const testFunc = () => {
        console.log('EDIT SCREEN NAVIGATOR: ' , props.navigation.state.params);
    }

    let editTopicNotes = props.navigation.state.params.editTopicNotes;
    let addGameTopic = props.navigation.state.params.addGameTopic;
    let _id = props.navigation.state.params.id;
    let title = props.navigation.state.params.topicTitle;
    let content = props.navigation.state.params.content || '';
    return {
        title: "Game Notes",
        headerRight: <TouchableOpacity 
                        onPress={() =>  {

                                testFunc();

                                content !== ''?

                                editTopicNotes(_id, title, content, () => {props.navigation.pop()})
                                //console.log('EDIT')
                                : 
                                //console.log('ADD');
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