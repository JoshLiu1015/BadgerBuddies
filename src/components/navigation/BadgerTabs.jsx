import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';



function BadgerTabs() {
    const Stack = createStackNavigator();

    return <>
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="SignUp"
                component={SignUpScreen}
                options={{headerShown: false}}
            />
        </Stack.Navigator>
    </>
}

export default BadgerTabs;