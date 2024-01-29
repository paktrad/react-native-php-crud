import * as React from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import commonStyles from '../styles';
import MyButton from './MyButton';

const EditScreen = ({ navigation, route }) => {
  const { id } = route.params;
  const [name, setName] = React.useState('');
  const [city, setCity] = React.useState('');
  const [age, setAge] = React.useState('');

  React.useEffect(() => {
    fetchData();
  }, []); // Fetch data when the component mounts

  const fetchData = async () => {
    try {
      const response = await fetch('https://backend.webpub.pk/fetch.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id }),
      });

      const result = await response.json();

      if (result.success) {
        // Set the state with the fetched data
        setName(result.result.name);
        setCity(result.result.city);
        // The age, a number being set to string for proper display in TextInput Fields
        setAge(result.result.age.toString());

        // console.log(result.result);
      } else {
        console.error('API request failed:', result);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  const validateData = () => {
    // Add your validation logic here
    if (name.length < 5) {
      Alert.alert('Validation Error', 'Name must be at least 5 characters long');
      return false;
    }

    const ageValue = parseInt(age, 10);
    if (isNaN(ageValue) || ageValue < 18) {
      Alert.alert('Validation Error', 'Age must be a valid number greater than or equal to 18');
      return false;
    }

    return true;
  };

  const saveChanges = async () => {
    if (!validateData()) {
      // Validation failed, do not proceed with submission
      return;
    }

    try {
      const response = await fetch('https://backend.webpub.pk/update.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: id,
          name: name,
          city: city,
          age: age,
        }),
      });

      const result = await response.json();

      if (result.success) {
        Alert.alert('Success', 'Changes saved successfully', [
          {
            text: 'OK',
            onPress: () => {
              // Navigate to the ReadScreen after successful submission
              navigation.navigate('Read');
            },
          },
        ]);
        // You can navigate back or perform other actions after successful update
      } else {
        Alert.alert('Error', 'Failed to save changes');
      }
    } catch (error) {
      console.error('Error updating data:', error);
      Alert.alert('Error', 'Failed to save changes');
    }
  };

  const deleteRecord = async (id) => {      
    Alert.alert('WARNING', `Confirm to delete record ID: ${id}?`, [
      {
        text: 'Cancel',
        onPress: () => navigation.navigate('Read'),
        style: 'cancel',
      },
      {
        text: 'Confirm', 
        onPress: async () => {
          try {
            const response = await fetch('https://backend.webpub.pk/delete.php', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ id: id }),
            });
      
            const result = await response.json();
      
            if (result.success) {             
      
              Alert.alert('Success', `Record ID ${id} successfully deleted.`, [
                {
                  text: 'OK',
                  onPress: () => {
                    // Navigate to the ReadScreen after successful submission
                    navigation.navigate('Read');
                  },
                },
              ]);
            } else {
              console.error('API request failed:', result);
            }
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        },
      
      
      },
    ]);  

  }

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.title}>Edit Data ID: {id}</Text>

      {/* TextInput fields for name, city, and age */}
      <TextInput
        style={commonStyles.input}
        placeholder={`Enter Name (${name})`}
        value={name}
        onChangeText={text => setName(text)}
      />
      <TextInput
        style={commonStyles.input}
        placeholder={`Enter City (${city})`}
        value={city}
        onChangeText={text => setCity(text)}
      />
      <TextInput
        style={commonStyles.input}
        placeholder={`Enter Age (${age})`}
        value={age}
        onChangeText={text => setAge(text)}
        keyboardType="numeric"
      />


      <View style={commonStyles.rowContainer}>

        <MyButton
            onPress={saveChanges}
            label="Save Changes"
            color={{ normal: '#4787FF', pressed: '#2E5BFF' }}
          />
          <MyButton
            onPress={() => deleteRecord(id)}
            label="Delete Record"
            color={{ normal: '#FF2400', pressed: '#8D021F' }}
          />
      </View>
      




      </View>
      
  );
};

export default EditScreen;

