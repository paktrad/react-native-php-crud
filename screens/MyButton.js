import * as React from 'react';
import { Pressable, Text } from 'react-native';
import commonStyles from '../styles';

const MyButton = ({ onPress, label, color }) => (
    <Pressable
      style={({ pressed }) => [
        commonStyles.button,
        {
          backgroundColor: pressed ? color.pressed : color.normal,
        },
      ]}
      onPress={onPress}
    >
      {({ pressed }) => (
        <Text style={{ color: pressed ? 'white' : 'black' }}>{label}</Text>
      )}
    </Pressable>
  );
  
export default MyButton;  