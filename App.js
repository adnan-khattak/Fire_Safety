import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DashboardScreen from './app/screens/DashboardScreen';
import AddScreen from './app/screens/AddScreen';
import SettingScreen from './app/screens/SettingScreen';
import NotificationsScreen from './app/screens/NotificationsScreen';
import SignupScreen from './app/screens/SignupScreen';
import LoginScreen from './app/screens/LoginScreen';

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

function Tab() {
  return (
    <BottomTab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Notifications') {
            iconName = 'bell';
          } else if (route.name === 'Settings') {
            iconName = 'cog'; // Changed 'gear' to 'cog'
          }

          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <BottomTab.Screen name="Home" component={DashboardScreen} />
      <BottomTab.Screen name="NotificationScreen" component={NotificationsScreen} />
      <BottomTab.Screen name="Settings" component={SettingScreen} />
    </BottomTab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Signup" component={SignupScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Tab" component={Tab} />
        <Stack.Screen name="Add" component={AddScreen} />
        <Stack.Screen name="Home" component={DashboardScreen} />
        <Stack.Screen name="NotificationScreen" component={NotificationsScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
