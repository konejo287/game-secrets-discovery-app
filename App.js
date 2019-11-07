import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import IndexScreen from './src/screens/indexScreen';
import { Provider } from './src/context/GameContext';
import GameScreen from './src/screens/gameScreen';
import CreateScreen from './src/screens/createScreen';
import EditScreen from './src/screens/editScreen';

const navigator = createStackNavigator({
  Index: IndexScreen,
  Game: GameScreen,
  Create: CreateScreen,
  Edit: EditScreen
}, {
  initialRouteName: 'Index',
  defaultNavigationOptions: {
    title: 'Games'
  }
})

const App = createAppContainer(navigator);

export default () => {
  return (
    <Provider>
      <App />
    </Provider>
  );
}