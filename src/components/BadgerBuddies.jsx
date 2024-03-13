import { NavigationContainer } from '@react-navigation/native';

import BadgerTabs from './navigation/BadgerTabs';
import InfoStack from "./navigation/InfoStack";
import { useState, useEffect } from 'react';
import SignUpScreen from './screens/SignUpScreen';
import LoginScreen from './screens/LoginScreen';
import BadgerBuddiesContext from '../../contexts/BadgerBuddiesContext';
import PersonalInfoScreen from './screens/PersonalInfoScreen';
import * as SecureStore from 'expo-secure-store';


function BadgerBuddies(props) {

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isRegistering, setIsRegistering] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);
    const [userId, setUserId] = useState(0);
    const [secureStoreEmail, setSecureStoreEmail] = useState("");
    const [userFirstName, setUserFirstName] = useState("");
    const [userGender, setUserGender] = useState("");





    const handleLogin = async (email, password) => {
        try {
            
            // const res = await fetch("http://10.140.172.174:3000/user/login", {
            const res = await fetch("http://192.168.1.168:3000/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "email": email,
                    "password": password
                })
            })
            

            if (res.status === 401) {
                alert("Incorrect login, please try again.");
            }
            else if (res.status === 403) {
                alert("Email not verified");
            }
            else if (res.status === 404) {
                alert("User not found");
            }
            else if (res.status == 200) {
                alert("Your login was successful");
                setIsLoggedIn(true);

                const json = await res.json();

                if (json && json.User) {
                    // set user info for screens
                    // setUserEmail(json.User.email);
                    setUserFirstName(json.User.firstName);
                    setUserGender(json.User.gender);
                    setUserId(json.User.id);
                    // alert(userId)
                    const updatedSecureStoreEmail = json.User.email.replace("@", "");
                    // alert("first:" + updatedSecureStoreEmail);
                    await SecureStore.setItemAsync(updatedSecureStoreEmail, json.Token);
                    
                    setSecureStoreEmail(updatedSecureStoreEmail);
                    // alert(secureStoreEmail);
                }
            }
        } catch (error) {
            console.error("Error during login: ", error);
        }
        
        

    }


    // signup function that is called in BadgerRegisterScreen
    const handleSignup = async (email, password, firstName, lastName, gender, major, grade, weight, height, picture) => {
        try {
            // const res = await fetch("http://10.140.172.174:3000/user", {
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
                    "weight": parseInt(weight, 10),
                    "height": parseInt(height, 10),
                    "picture": picture
                })
            })

            if (res.status === 400) {
                alert("A request must contain a 'username' and 'password'");
            }
            else if (res.status === 409) {
                alert("The email has already been used!");
            }
            else if (res.status === 413) {
                alert("'username' must be 64 characters or fewer and 'password' must be 128 characters or fewer")
            }
            else if (res.status == 200) {
                alert("Your registration was successful");
                // setIsLoggedIn(true);
                setIsRegistered(false);
                setIsRegistering(false);


                const json = await res.json();

                // alert(json.Info.insertId);

                if (json) {
                    return json.Info.insertId;
                    // setUserId(json.Info.insertId);
                    
                }
            }
        } catch (error) {
            console.error("Error during signup: ", error);
        }

    }


    if (isLoggedIn) {
        // alert("secureStoreEmail: " + secureStoreEmail)

        // it should return the screen after logging in
        return <>
            <BadgerBuddiesContext.Provider value={[setIsLoggedIn, userId, secureStoreEmail, userGender, setUserGender]}>
                <NavigationContainer>
                    <BadgerTabs/>
                </NavigationContainer>
                

            </BadgerBuddiesContext.Provider>
        </>
    }
    // 
    else if (isRegistered) {
        return <BadgerBuddiesContext.Provider value={[setIsRegistered, handleSignup, userId]}>
            <NavigationContainer>
                <InfoStack/>
            </NavigationContainer>
        </BadgerBuddiesContext.Provider>
        
        
        // <PersonalInfoScreen setIsRegistered={setIsRegistered} handleSignup={handleSignup} />
            
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