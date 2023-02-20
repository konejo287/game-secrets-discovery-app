import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity } from 'react-native';
import { Context as GameContext } from '../context/GameContext';
import { Feather } from '@expo/vector-icons';
import SweetAlert from 'react-native-sweet-alert';

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
                            <TouchableOpacity onPress={() => navigation.navigate('Game', { id: item._id, paramLocalState: localState })}>
                                <Text style={styles.title}>{item.title}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                SweetAlert.showAlertWithOptions({
                                  title: '',
                                  subTitle: '',
                                  confirmButtonTitle: 'OK',
                                  confirmButtonColor: '#000',
                                  otherButtonTitle: 'Cancel',
                                  otherButtonColor: '#dedede',
                                  style: 'success',
                                  cancellable: true
                                },
                                  callback => console.log('callback'));
                                //deleteGamePost(item._id)
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