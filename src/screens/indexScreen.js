import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity } from 'react-native';
import { Context as GameContext } from '../context/GameContext';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const IndexScreen = ({ navigation }) => {
    const { state, getGameList, deleteGamePost, localState, setLocalState } = useContext(GameContext);

    

    useEffect(() => {
        const promise = getGameList()
        promise.then(function(success) {
            console.log('promise log: ' , success);
            setLocalState(success)
        },
        function(failure) {

        })
    }, []);

    const testState = () => {
        console.log('LOCAL STATE INIT: ' , localState);
        setLocalState('');
        console.log('CHANGED LOCAL STATE' , localState);
    }

    return (
        <View>
            <FlatList
                data={state}
                keyExtractor={(state) => state.title}
                renderItem={({item}) => {
                    return (
                        <View style={styles.row}>
                            <TouchableOpacity onPress={() => navigation.navigate('Game', { id: item._id, paramLocalState: localState })}>

                                {
                                   /*item.changed == true ?
                                    <View>
                                        <MaterialCommunityIcons name='checkbox-blank-circle' />
                                    </View>
                                    :
                                    null*/
                                }
                                
                                <Text style={styles.title}>{item.title}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => deleteGamePost(item._id)}>
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
                         <View paddingRight={16}>
                             <Feather name='plus' size={30} />
                         </View>
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