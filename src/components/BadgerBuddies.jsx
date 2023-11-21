import { NavigationContainer } from '@react-navigation/native';

import BadgerTabs from './navigation/BadgerTabs';
import { useState } from 'react';
import SignUpScreen from './screens/SignUpScreen';
import LoginScreen from './screens/LoginScreen';
import BadgerBuddiesContext from '../../contexts/BadgerBuddiesContext';


export default function BadgerBuddies(props) {

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isRegistering, setIsRegistering] = useState(false);

    function handleLogin(name, password) {
        setIsLoggedIn(true);
    }


    function handleSignup(name, password) {

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
    else if (isRegistering) {
        return <SignUpScreen handleSignup={handleSignup} setIsRegistering={setIsRegistering} />
    }
    else {
        return <LoginScreen handleLogin={handleLogin} setIsRegistering={setIsRegistering} setIsLoggedIn={setIsLoggedIn} />
    }

}