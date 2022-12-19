import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useDispatch, useSelector } from 'react-redux';
import { SetContainerScreen } from '../redux/action';
import { Icon } from 'native-base';
import HomeScreen from './HomeScreen';
import SearchScreen from './SearchScreen';
import MessageScreen from './MessageScreen';
import ProfileScreen from './ProfileScreen';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import Languages from '../../languages.json';


const TabsNavigator = () => {
    const Tabs = createBottomTabNavigator();
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const { MyStore } = useSelector(state => state);

    let txtHome = Languages.languages[MyStore.languageRedux].TabsNavigator.txtHome;
    let txtSearch = Languages.languages[MyStore.languageRedux].TabsNavigator.txtSearch;
    let txtMessages = Languages.languages[MyStore.languageRedux].TabsNavigator.txtMessages;
    let txtProfile = Languages.languages[MyStore.languageRedux].TabsNavigator.txtProfile;

    useEffect(() => {
        dispatch(SetContainerScreen("Home"));
        navigation.navigate("Home");
    }, [])

    const containerScreenHome = () => {
        dispatch(SetContainerScreen("Home"));
        navigation.navigate("Home");
    };

    const containerScreenSearch = () => {
        dispatch(SetContainerScreen("Search"));
        navigation.navigate("Search");
    };

    const containerScreenMessage = () => {
        dispatch(SetContainerScreen("Message"));
        navigation.navigate("Message");
    };

    const containerScreenProfile = () => {
        dispatch(SetContainerScreen("Profile"));
        navigation.navigate("Profile");
    };

    useEffect(() => {
        containerScreenHome();
    }, [])

    return (
        <Tabs.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false,
            }}>
            <Tabs.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarLabel: txtHome,
                    tabBarIcon: ({ color, size }) => (
                        <Icon onPress={() => containerScreenHome()} as={MaterialIcon} name="home" color={color} size={size} />
                    ),
                }}
            />
            <Tabs.Screen
                name="Search"
                component={SearchScreen}
                options={{
                    tabBarLabel: txtSearch,
                    tabBarIcon: ({ color, size }) => (
                        <Icon onPress={() => containerScreenSearch()} as={MaterialIcon} name="search" color={color} size={size} />
                    ),
                }}
            />
            <Tabs.Screen
                name="Message"
                component={MessageScreen}
                options={{
                    tabBarLabel: txtMessages,
                    tabBarIcon: ({ color, size }) => (
                        <Icon onPress={() => containerScreenMessage()} as={Feather} name="message-circle" color={color} size={size}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarLabel: txtProfile,
                    tabBarIcon: ({ color, size }) => (
                        <Icon onPress={() => containerScreenProfile()} as={MaterialIcon} name="person" color={color} size={size} />
                    ),
                }}
            />
        </Tabs.Navigator>
    );
};

export default TabsNavigator;
