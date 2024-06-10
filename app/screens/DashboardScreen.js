import React, { useState } from 'react';
import axios from 'axios';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const DashboardScreen = () => {
  const [isConnected, setIsConnected] = useState(false);
  const navigation = useNavigation();

  const handleAddPress = async () => {
    try {
      const serverUrl = 'http://192.168.43.73:8000'; // Update with your server IP and port
      if (!isConnected) {
        // console.log('start');
        // Connect to the server
        const connectResponse = await axios.post(`${serverUrl}/connect`, { message: 'Client connecting' });
        if (connectResponse.status === 200) {
          setIsConnected(true);
          Alert.alert('Success', 'Connected to the server!', [{ text: 'OK' }], { cancelable: false });

          // Start detection after successful connection
          const detectionResponse = await axios.post(`${serverUrl}/start_detection`, { trigger: 0 });
          if (detectionResponse.status === 200) {
            console.log('Detection started');
            const { object_detected } = detectionResponse.data;
            // Navigate to NotificationScreen with the detection result
            navigation.navigate('NotificationScreen', { objectDetected: object_detected });
          } else {
            throw new Error('Failed to start detection');
          }
        } else {
          throw new Error('Failed to connect');
        }
      } else {
        // Disconnect from the server
        const disconnectResponse = await axios.post(`${serverUrl}/disconnect`, { message: 'Client disconnecting' });
        if (disconnectResponse.status === 200) {
          setIsConnected(false);
          Alert.alert('Success', 'Disconnected from the server!', [{ text: 'OK' }], { cancelable: false });
        } else {
          throw new Error('Failed to disconnect');
        }
      }
    } catch (error) {
      console.error('Connection error:', error); // Log the error for debugging
      Alert.alert('Error', 'We cannot connect you to the server. Please reload the server and try again!', [{ text: 'OK' }], { cancelable: false });
    }
  };
  // const handleAddPress = async () => {
  //   try {
  //     const serverUrl = 'http://192.168.43.73:8000'; // Update with your server IP and port
  //     if (!isConnected) {
  //       // Connect to the server
  //       const connectResponse = await axios.post(`${serverUrl}/connect`, { message: 'Client connecting' });
  //       if (connectResponse.status === 200) {
  //         setIsConnected(true);
  //         Alert.alert('Success', 'Connected to the server!', [{ text: 'OK' }], { cancelable: false });

  //         // Start detection after successful connection
  //         const detectionResponse = await axios.post(`${serverUrl}/start_detection`, { trigger: 0 });
  //         if (detectionResponse.status === 200) {
  //           console.log('Detection started');
  //           const { object_detected } = detectionResponse.data;
  //           if (object_detected === 1) {
  //             console.log('Object detected: Yes');
  //             Alert.alert('Detection Result', 'Object detected!', [{ text: 'OK' }], { cancelable: false });
  //           } else {
  //             console.log('Object detected: No');
  //             Alert.alert('Detection Result', 'No object detected.', [{ text: 'OK' }], { cancelable: false });
  //           }
  //         } else {
  //           throw new Error('Failed to start detection');
  //         }
  //       } else {
  //         throw new Error('Failed to connect');
  //       }
  //     } else {
  //       // Disconnect from the server
  //       const disconnectResponse = await axios.post(`${serverUrl}/disconnect`, { message: 'Client disconnecting' });
  //       if (disconnectResponse.status === 200) {
  //         setIsConnected(false);
  //         Alert.alert('Success', 'Disconnected from the server!', [{ text: 'OK' }], { cancelable: false });
  //       } else {
  //         throw new Error('Failed to disconnect');
  //       }
  //     }
  //   } catch (error) {
  //     console.error('Connection error:', error); // Log the error for debugging
  //     Alert.alert('Error', 'We cannot connect you to the server. Please reload the server and try again!', [{ text: 'OK' }], { cancelable: false });
  //   }
  // };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/fire_detector.jpeg')}
        style={styles.backgroundImage}
      >
        <Text style={styles.text}>Welcome, OnBoard</Text>
        <TouchableOpacity onPress={handleAddPress} style={styles.addButton}>
          <Icon name="plus" size={30} color="#fff" />
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 18,
  },
  text: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '500',
    marginTop: 10,
  },
});

export default DashboardScreen;
