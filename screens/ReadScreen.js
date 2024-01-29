import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import commonStyles from '../styles';

function ReadScreen({ navigation }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []); // Fetch data when the component mounts

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Refetch data when the screen is focused
      fetchData();
    });

    return unsubscribe;
  }, [navigation]);

  const fetchData = async () => {
    try {
      // Assuming 'id' is the parameter your API expects
      // const id = 1; // Replace with the actual ID you want to send

      const response = await fetch('https://backend.webpub.pk/read.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // You may need to include additional headers (e.g., authentication headers)
        },
        body: JSON.stringify({ id: 1 }), // Send the ID in the request body
      });

      const result = await response.json();

      if (result.success) {
        // Update the data state with the fetched result
        setData(result.result);
      } else {
        console.error('API request failed:', result);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const navigateToEditScreen = (id) => {
    // Navigate to EditScreen with the selected ID
    navigation.navigate('Edit', { id });
  };

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.title}>Read Data Here.</Text>
      <View style={commonStyles.rowContainer}>
              <Text style={[commonStyles.tableHead, commonStyles.tableHeadID]}>Id</Text>
              <Text style={[commonStyles.tableHead, commonStyles.tableHeadName]}>Name</Text>
              <Text style={[commonStyles.tableHead, commonStyles.tableHeadCity]}>City</Text>
              <Text style={[commonStyles.tableHead, commonStyles.tableHeadAge]}>Age</Text>
      </View>

      {/* Display the fetched data in a FlatList */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()} // Use a unique identifier for each item
        renderItem={({ item }) => (      
          <Pressable onPress={() => navigateToEditScreen(item.id)}>
            <View style={commonStyles.rowContainer}>
            <Text style={[commonStyles.tableCell, commonStyles.tableCellID]}>{item.id}</Text>
            <Text style={[commonStyles.tableCell, commonStyles.tableCellName]}>{item.name}</Text>
            <Text style={[commonStyles.tableCell, commonStyles.tableCellCity]}>{item.city}</Text>
            <Text style={[commonStyles.tableCell, commonStyles.tableCellAge]}>{item.age}</Text>
                       
            </View>       
            </Pressable>    
        )}
      />
    </View>
  );
}

export default ReadScreen;
