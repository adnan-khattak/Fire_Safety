// import React from 'react';
// import {StyleSheet, Text, View} from 'react-native';

// export default function AddScreen() {
//   return (
//     <View style={styles.container}>
//       <Text>Add Screen</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
// import React from 'react';
// import {View, Text, TouchableOpacity} from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';

// const AddScreen = ({navigation}) => {
//   const goBack = () => {
//     navigation.goBack();
//   };

//   return (
//     <View>
//       <TouchableOpacity
//         onPress={goBack}
//         style={{position: 'absolute', top: 20, left: 20}}>
//         <Icon name="arrow-left" size={30} />
//       </TouchableOpacity>
//       {/* <Text>Add Form Screen</Text> */}
//       {/* Add your form components here */}
//     </View>
//   );
// };

// export default AddScreen;
import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';

const AddScreen = ({navigation}) => {
  const [type, setType] = useState('');
  const [alias, setAlias] = useState('');
  const [address, setAddress] = useState('');
  const [port, setPort] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [cameraNo, setCameraNo] = useState('');

  const handleSubmit = () => {
    // Create an object with the form data
    const formData = {
      type,
      alias,
      address,
      port,
      userName,
      password,
      cameraNo,
    };

    // Navigate back to DashboardScreen and pass the form data as props
    navigation.navigate('Home', {formData});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Adding Type</Text>
      <TextInput style={styles.input} value={type} onChangeText={setType} />

      <Text style={styles.label}>Alias</Text>
      <TextInput style={styles.input} value={alias} onChangeText={setAlias} />

      <Text style={styles.label}>Address</Text>
      <TextInput
        style={styles.input}
        value={address}
        onChangeText={setAddress}
      />

      <Text style={styles.label}>Port</Text>
      <TextInput
        style={styles.input}
        value={port}
        onChangeText={setPort}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        value={userName}
        onChangeText={setUserName}
      />

      <Text style={styles.label}>Device Password</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      <Text style={styles.label}>Camera No.</Text>
      <TextInput
        style={styles.input}
        value={cameraNo}
        onChangeText={setCameraNo}
        keyboardType="numeric"
      />

      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

export default AddScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});
