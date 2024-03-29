import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import InfoStack from "./InfoStack";
import { useState } from 'react';
import MatchScreen from '../screens/MatchScreen';
import ProfileScreen from '../screens/ProfileScreen';
import PreferenceScreen from '../screens/PreferenceScreen';
import ChatStack from './ChatStack';



function BadgerTabs() {

    const infoStack = createNativeStackNavigator();
    const BottomTab = createBottomTabNavigator();
    const [isFirstTime, setIsFirstTime] = useState(true);

    return <>
        <BottomTab.Navigator>
            <BottomTab.Screen name="Profile" component={ProfileScreen} options={{headerShown: false}}/>
            <BottomTab.Screen name="Preference" component={PreferenceScreen} options={{headerShown: false}}/>
            <BottomTab.Screen name="Match" component={MatchScreen} options={{headerShown: false}}/>
            <BottomTab.Screen name="Chats" component={ChatStack} options={{headerShown: false}}/>
            {/* <BottomTab.Screen name="Preferences" component={BadgerPreferencesScreen}/> */}
        </BottomTab.Navigator>
    </>



    // const Stack = createStackNavigator();

    // return <>
    //     <Stack.Navigator initialRouteName="Login">
    //         <Stack.Screen
    //             name="Login"
    //             component={LoginScreen}
    //             options={{headerShown: false}}
    //         />
    //         <Stack.Screen
    //             name="SignUp"
    //             component={SignUpScreen}
    //             options={{headerShown: false}}
    //         />
    //     </Stack.Navigator>
    // </>
}

export default BadgerTabs;