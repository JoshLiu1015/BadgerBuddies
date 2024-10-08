import { NavigationContainer } from '@react-navigation/native';

import BadgerTabs from './navigation/BadgerTabs';
import InfoStack from "./navigation/InfoStack";
import { useState } from 'react';
import SignUpScreen from './screens/SignUpScreen';
import LoginScreen from './screens/LoginScreen';
import BadgerBuddiesContext from '../../contexts/BadgerBuddiesContext';
import PersonalInfoScreen from './screens/PersonalInfoScreen';



function BadgerBuddies(props) {

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isRegistering, setIsRegistering] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);
    const [userId, setUserId] = useState(0);

    function handleScreenChange (screenName) {
        setCurrentScreen(screenName);
    };

    function handleLogin(name, password) {
        setIsLoggedIn(true);
    }


    // signup function that is called in BadgerRegisterScreen
const handleSignup = async (email, password, firstName, lastName, gender, major, grade, weight, height, picture) => {
    try {
        const res = await fetch("http://192.168.1.168:3000/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "email": email + "@wisc.edu",
                "password": password,
                "firstName": firstName,
                "lastName": lastName,
                "gender": gender,
                "major": major,
                "grade": grade,
                "weight": parseFloat(weight, 2),
                "height": parseFloat(height, 2),
                "picture": picture
            })
        })

        if (res.status === 400) {
            alert("A request must contain a 'username' and 'password'");
        }
        else if (res.status === 409) {
            alert("That username has already been taken!");
        }
        else if (res.status === 413) {
            alert("'username' must be 64 characters or fewer and 'password' must be 128 characters or fewer")
        }
        else if (res.status == 200) {
            alert("Your registration was successful");
            setIsLoggedIn(true);
            setIsRegistered(false);
            setIsRegistering(false);
            const json = await res.json();

            // alert(json.Info.insertId);

            if (json) {
                await SecureStore.setItemAsync(json.Info.insertId, json.token)
                setUserId(json.Info.insertId);
                
            }
        }
    } catch (error) {
        console.error("Error during signup: ", error);
    }

}


    if (isLoggedIn) {
        // it should return the screen after logging in
        return <>
            <BadgerBuddiesContext.Provider value={[isRegistered, setIsRegistered, isLoggedIn, setIsLoggedIn]}>
                <NavigationContainer>
                    <BadgerTabs/>
                </NavigationContainer>
                

            </BadgerBuddiesContext.Provider>
        </>
    }
    // 
    else if (isRegistered) {
        return <PersonalInfoScreen setIsRegistered={setIsRegistered} handleSignup={handleSignup} />
            
            {/* <BadgerBuddiesContext.Provider value={[isRegistered, setIsRegistered, isLoggedIn, setIsLoggedIn, handleScreenChange, setIsRegistering]}>
                <NavigationContainer>
                    {currentScreen === 'PersonalInfo' ? (
                        <PersonalInfoScreen setIsRegistered={setIsRegistered} handleSignup={handleSignup} />
                    ) : (
                        <BadgerTabs />
                    )}
                </NavigationContainer>
                

            </BadgerBuddiesContext.Provider> */}
    }
    else if (isRegistering) {
        return <SignUpScreen setIsRegistered={setIsRegistered} setIsRegistering={setIsRegistering}/>
    }
    else {
        return <LoginScreen handleLogin={handleLogin} setIsRegistering={setIsRegistering} />
    }

}

export default BadgerBuddies;