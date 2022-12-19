import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeBaseProvider } from 'native-base';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import reducers from './src/redux';
import Splash from './src/screens/Splash';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import TabsNavigator from './src/screens/TabsNavigator';
import SettingsScreen from './src/screens/SettingsScreen';
import PersonelSettingsScreen from './src/screens/PersonelSettingsScreen';
import ComplaintsTweetScreen from './src/screens/ComplaintsTweetScreen';
import ChangeUsername from './src/screens/ChangeUsername';
import ChangeEmail from './src/screens/ChangeEmail';
import ChangePassword from './src/screens/ChangePassword';
import ChangeLanguage from './src/screens/ChangeLanguage';
import ChangeGender from './src/screens/ChangeGender';
import DeleteAccount from './src/screens/DeleteAccount';
import ShowUserProfileScreen1 from './src/screens/ShowUserProfileScreen1';
import ShowUserProfileScreen2 from './src/screens/ShowUserProfileScreen2';
import SendMessageScreen from './src/screens/SendMessageScreen';
import TweetComments from './src/screens/TweetComments';

const App = () => {
  const Stack = createNativeStackNavigator();
  const Store = configureStore({ reducer: reducers });

  return (
    <Provider store={Store}>
      <NativeBaseProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName="Splash">
            <Stack.Screen
              name="TabsNavigator"
              component={TabsNavigator}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
            <Stack.Screen
              name="PersonelSettingsScreen"
              component={PersonelSettingsScreen}
            />
            <Stack.Screen
              name="ComplaintsTweetScreen"
              component={ComplaintsTweetScreen}
            />
            <Stack.Screen
              name="ChangeUsernameScreen"
              component={ChangeUsername}
            />
            <Stack.Screen name="ChangeEmailScreen" component={ChangeEmail} />
            <Stack.Screen
              name="ChangePasswordScreen"
              component={ChangePassword}
            />
            <Stack.Screen
              name="ChangeLanguageScreen"
              component={ChangeLanguage}
            />
            <Stack.Screen name="ChangeGenderScreen" component={ChangeGender} />
            <Stack.Screen
              name="DeleteAccountScreen"
              component={DeleteAccount}
            />
            <Stack.Screen
              name="ShowUserProfileScreen1"
              component={ShowUserProfileScreen1}
            />
            <Stack.Screen
              name="ShowUserProfileScreen2"
              component={ShowUserProfileScreen2}
            />
            <Stack.Screen
              name="SendMessageScreen"
              component={SendMessageScreen}
            />
            <Stack.Screen
              name="TweetComments"
              component={TweetComments}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
};

export default App;
