import * as React from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import commonStyles from '../styles';
import MyButton from './MyButton';

function CreateScreen({ navigation }) {
  const [name, setName] = React.useState('');
  const [city, setCity] = React.useState('');
  const [age, setAge] = React.useState('');
  const [focusedField, setFocusedField] = React.useState('');

  const validateName = () => {
    if (name.length < 5) {
      return 'Name must be at least 5 characters long';
    }
    return ''; // No validation error
  };

  const validateAge = () => {
    const ageValue = parseInt(age, 10);
    if (isNaN(ageValue) || ageValue < 18) {
      return 'Age must be a valid number greater than or equal to 18';
    }
    return ''; // No validation error
  };

  const validateInputs = () => {
    const nameError = validateName();
    const ageError = validateAge();

    if (nameError || ageError) {
      Alert.alert('Error', nameError || ageError);
      return false;
    }

    // Additional validation logic for other fields can be added here

    return true; // All validations passed
  };

  const submitData = () => {
    if (!validateInputs()) {
      // Validation failed, do not proceed with submission
      return;
    }

    // Combine data into an array
    const data = { name, city, age };

    // Send data to the backend API using fetch
    fetch('https://backend.webpub.pk/create.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // You may need to include additional headers (e.g., authentication headers)
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(result => {
        // Handle the API response as needed
        console.log(result);
        // Show an alert or navigate to another screen on success
        Alert.alert('Success', 'Data submitted successfully', [
          {
            text: 'OK',
            onPress: () => {
              // Navigate to the ReadScreen after successful submission
              navigation.navigate('Read');
            },
          },
        ]);
      })
      .catch(error => {
        console.error('Error submitting data:', error);
        // Handle errors, show an alert, etc.
        Alert.alert('Error', 'Error submitting data');
      });
  };

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.title}>Create Data Here.</Text>

      {/* TextInput fields for name, city, and age */}
      <TextInput
        style={commonStyles.input}
        placeholder="Enter Name"
        value={name}
        onChangeText={text => setName(text)}
        onBlur={validateInputs} // Validate when user moves away from the input
      />
      <TextInput
        style={commonStyles.input}
        placeholder="Enter Age"
        value={age}
        onChangeText={text => setAge(text)}
        keyboardType="numeric"
        onBlur={validateInputs} // Validate when user moves away from the input
      />
      <TextInput
        style={commonStyles.input}
        placeholder="Enter City"
        value={city}
        onChangeText={text => setCity(text)}
      />
      

      <View style={commonStyles.rowContainer}>
        <MyButton
          onPress={submitData}
          label="Submit data"
          color={{ normal: '#4787FF', pressed: '#2E5BFF' }}
        />

        <MyButton
          onPress={() => navigation.navigate('Home')}
          label="Back home"
          color={{ normal: '#5adbb5', pressed: '#33b249' }}
        />
      </View>
    </View>
  );
}

export default CreateScreen;