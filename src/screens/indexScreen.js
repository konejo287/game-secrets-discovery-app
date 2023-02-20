import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity, Alert } from 'react-native';
import { Context as GameContext } from '../context/GameContext';
import { Feather } from '@expo/vector-icons';

const IndexScreen = ({ navigation }) => {
    const { state, getGameList, deleteGamePost, localState, setLocalState } = useContext(GameContext);

    useEffect(() => {
        const promise = getGameList()

        promise.then(
          function(success) {
            setLocalState(success)
          },
          function(failure) {

          }
        );
    }, []);

    return (
        <View>
          {
            state?.length > 0 && (
              <FlatList
                data={state}
                keyExtractor={(state) => state._id}
                renderItem={({item}) => {
                    return (
                        <View style={styles.row}>
                            <TouchableOpacity style={styles.touchableOpacity} onPress={() => navigation.navigate('Game', { id: item._id, paramLocalState: localState })}>
                                <Text style={styles.title}>{item.title}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.touchableOpacity} onPress={() => {
                                Alert.alert('WARNING!', `You're about to erase a complete game and all of it's topics and notes.
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
                                          text: 'OK', onPress: () => deleteGamePost(item._id)
                                        },
                                    ])
                                  },
                                ]);
                              }}>
                                <Feather style={styles.icon} name="trash" />
                            </TouchableOpacity>
                        </View>
                    )
                }}
            />
            )
          }
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

export default IndexScreen;