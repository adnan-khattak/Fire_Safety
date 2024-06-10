import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, ImageBackground } from 'react-native';
import * as Notifications from 'expo-notifications';
import { Audio } from 'expo-av';

export default function NotificationsScreen({ route }) {
  const [notification, setNotification] = useState(null);
  const [objectDetected, setObjectDetected] = useState(null);
  const notificationListener = useRef();
  const [sound, setSound] = useState();

  useEffect(() => {
    if (route.params && typeof route.params.objectDetected !== 'undefined') {
      setObjectDetected(route.params.objectDetected);
    }
  }, [route.params]);

  useEffect(() => {
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
    };
  }, []);

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  useEffect(() => {
    if (objectDetected === 1) {
      schedulePushNotification();
      playAlarmSound();
    }
  }, [objectDetected]);

  async function playAlarmSound() {
    const { sound } = await Audio.Sound.createAsync(require('../../assets/fire-alarm-33770.mp3'));
    setSound(sound);
    await sound.playAsync();
  }

  async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Object Detected!',
        body: 'A fire has been detected.',
      },
      trigger: null, // Trigger immediately
    });
  }

  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={require('../../assets/fire_detector.jpg')}
        style={styles.backgroundImage}
      >
        {/* <View style={styles.overlay}>
          <Text style={styles.overlayText}>Fire Detection System</Text>
        </View> */}
      </ImageBackground>
      <View style={styles.container}>
        {/* <Text style={styles.header}>Notification Screen</Text> */}
        <View style={styles.notificationContainer}>
          {/* <Text style={styles.title}>Title: {notification && notification.request.content.title}</Text> */}
          <Text style={styles.title}>Bell of Life, Call Fire Extingushier</Text>
          {objectDetected !== null && (
             <View style={[
              styles.resultContainer, 
              { backgroundColor: objectDetected === 1 ? 'rgba(255, 0, 0, 0.3)' : 'rgba(0, 255, 0, 0.3)' }
            ]}>
              <Text style={[styles.result, { color: objectDetected === 1 ? 'red' : 'green' }]}>
                {objectDetected === 1 ? 'Fire has been Detected' : 'No Fire has been Detected'}
              </Text>
            </View>
          )}
        </View>
        {/* <Text style={styles.titlebelow}>Bell of Life, Call Fire Extingushier</Text> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  notificationContainer: {
    width: '100%',
    height:'50%',
    padding: 20,
    marginTop:-90,
    backgroundColor: 'green',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'#fff',
  },
  titlebelow:{
    fontSize: 18,
    fontWeight: 'bold',
    color:'#000',
    marginTop:20,
  },
  body: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  // result: {
  //   fontSize: 16,
  //   fontWeight: 'bold',
  //   textAlign: 'center',
  // },
  resultContainer: {
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ccc',
  },
  result: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
