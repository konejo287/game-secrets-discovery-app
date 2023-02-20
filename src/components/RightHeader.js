import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity } from 'react-native';
import { Context as GameContext } from '../context/GameContext';
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const RightHeader = ({ navigation, action, icon }) => {
  return (
      <TouchableOpacity onPress={() =>
        navigation.navigate(
            action?.route,
            action?.value || null,
      )}
      >
          <View paddingRight={16}>
              <FontAwesome name={icon} size={25} />
          </View>
      </TouchableOpacity>
  )
}

export default RightHeader