import * as React from 'react';
import { View, Text } from 'react-native';

// App related imports
import commonStyles from '../styles';
import MyButton from './MyButton';

function HomeScreen({navigation}) {
    return(
      <View style={commonStyles.container}>
        <Text style={commonStyles.title}>Learning CRUD using PHP APIs</Text>
        <View style={commonStyles.rowContainer}>
        <MyButton 
        onPress={() => navigation.navigate('Create')}
        label="Create data"
        color={{ normal: '#4787FF', pressed: '#2E5BFF' }}
  
        />
        <MyButton 
        onPress={() => navigation.navigate('Read')}
        label="View data"
        color={{ normal: '#5adbb5', pressed: '#33b249' }}
  
        />              
  
        </View>
      </View>
    )
  }

  
  export default HomeScreen;