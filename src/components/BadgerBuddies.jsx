import { NavigationContainer } from '@react-navigation/native';

import BadgerTabs from './navigation/BadgerTabs';
import InfoStack from "./navigation/InfoStack";
import { useState } from 'react';
import SignUpScreen from './screens/SignUpScreen';
import LoginScreen from './screens/LoginScreen';
import BadgerBuddiesContext from '../../contexts/BadgerBuddiesContext';
import PersonalInfoScreen from './screens/PersonalInfoScreen';



export default function BadgerBuddies(props) {

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isRegistering, setIsRegistering] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);
    const [currentScreen, setCurrentScreen] = useState('PersonalInfo');

    function handleScreenChange (screenName) {
        setCurrentScreen(screenName);
    };

    function handleLogin(name, password) {
        setIsLoggedIn(true);
    }


    function handleSignup(name, password) {
        setIsRegistered(true);
    }


    if (isLoggedIn) {
        // it should return the screen after logging in
        return <>
            <BadgerBuddiesContext.Provider value={[]}>
                <NavigationContainer>
                    <BadgerTabs/>
                </NavigationContainer>
                

            </BadgerBuddiesContext.Provider>
        </>
    }
    else if (isRegistered) {
        return <>
            <BadgerBuddiesContext.Provider value={[]}>
                <NavigationContainer>
                    {currentScreen === 'PersonalInfo' ? (
                        <PersonalInfoScreen onScreenChange={handleScreenChange} />
                    ) : (
                        <BadgerTabs />
                    )}
                </NavigationContainer>
                

            </BadgerBuddiesContext.Provider>
        </>
    }
    else if (isRegistering) {
        return <SignUpScreen handleSignup={handleSignup} setIsRegistering={setIsRegistering} />
    }
    else {
        return <LoginScreen handleLogin={handleLogin} setIsRegistering={setIsRegistering} />
    }

}