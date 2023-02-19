import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import IndexScreen from './src/screens/indexScreen';
import { Provider } from './src/context/GameContext';
import GameScreen from './src/screens/gameScreen';
import CreateScreen from './src/screens/createScreen';
import EditScreen from './src/screens/editScreen';

import { View, Text, TouchableOpacity } from 'react-native';

import { Feather } from '@expo/vector-icons';

const Stack = createStackNavigator();

export default () => {
  return (
    <Provider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Index" component={IndexScreen}
          options={({ navigation, route }) => ({
            headerTitle: () => <Text>Game Notes</Text>,
            headerRight: (props) => (
              <TouchableOpacity onPress={() => navigation.navigate('Create')}>
                  <View paddingRight={16}>
                      <Feather name='plus' size={30} />
                  </View>
              </TouchableOpacity>
            ),
          })}
          />
          <Stack.Screen name="Game" component={GameScreen} />
          <Stack.Screen name="Create" component={CreateScreen} />
          <Stack.Screen name="Edit" component={EditScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}