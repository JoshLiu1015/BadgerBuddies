import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import UserScreen from './UserScreen'; // make sure the path is correct
import BadgerBuddiesContext from '../../../contexts/BadgerBuddiesContext';
import * as SecureStore from 'expo-secure-store';




const MatchScreen = () => {
  const [matchedUsers, setMatchedUsers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMatched, setIsMatched] = useState(false);

  const [setIsLoggedIn, userId, secureStoreEmail, _, setUserGender] = useContext(BadgerBuddiesContext);

  useEffect(() => {
    // Call the API to fetch users and set the state
    const fetchUsers = async () => {

        const token = await SecureStore.getItemAsync(secureStoreEmail);

        const res = await fetch(`http://192.168.1.168:3000/match/requesterId/${userId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
            }});

            const json = await res.json();
            if (json && json.Match) {
                // alert(JSON.stringify(json.Match[0]));
                setMatchedUsers(json.Match);
                setIsMatched(true);
            }
        };

    fetchUsers();
  }, []);




  const handleMatch = async () => {
    try {
        const token = await SecureStore.getItemAsync(secureStoreEmail);

        const res = await fetch(`http://192.168.1.168:3000/match/userId/${userId}`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        })

        const json = await res.json();
        // json.Info is an array containing info about all matches
        if (json && json.Info.length > 0) {
            if (res.status === 200) {
                alert("Matches are created");
                setIsMatched(true);
            }
        }
        else {
            alert("No more matches");
        }



    } catch (error) {
        console.error("Error during matching: ", error);
    }
  }

  const handleAccept = async (matchId) => {
    try {
        const token = await SecureStore.getItemAsync(secureStoreEmail);
        // const res = await fetch(`http://10.140.172.174:3000/match/matchId/${matchId}`, {
        const res = await fetch(`http://192.168.1.168:3000/match/matchId/${matchId}`, {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "isMatchAccepted": 1
            })
        })

        
        if (res.status === 404) {
            alert("Match not found");
        }
        else if (res.status == 200) {
            alert("Your have accepted the user");
        }

        // Handle the accept action
        setCurrentIndex(currentIndex + 1);

        if (currentIndex === matchedUsers.length-1) {        
            setIsMatched(false);
        }
    } catch (error) {
        console.error("Error during 'Accept': ", error);
    }
    
  };

  const handleReject = async (matchId) => {
    try {
        const token = await SecureStore.getItemAsync(secureStoreEmail);
        // const res = await fetch(`http://10.140.172.174:3000/match/matchId/${matchId}`, {
        const res = await fetch(`http://192.168.1.168:3000/match/matchId/100`, {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "isMatchDeclined": 1
            })
        })

        
        if (res.status === 404) {
            alert("Match not found");
        }
        else if (res.status == 200) {
            alert("Your have rejected the user");
        }
        // Handle the reject action
        setCurrentIndex(currentIndex + 1);

        if (currentIndex === matchedUsers.length-1) {        
            setIsMatched(false);
        }
    } catch (error) {
        console.error("Error during 'Reject': ", error);
    }
    

  };

  
    return isMatched ? <View style={styles.container}>
        {matchedUsers.length > 0 &&
        matchedUsers.map((matchedUser, index) => {
            
            
            // any user with an index less than the currentIndex is not rendered (return null). 
            // This means that as you increment currentIndex, 
            // fewer user profiles are returned by the map function.
            if (index < currentIndex) {
                return null; // This user has already been handled
            }
            return (
            <UserScreen
                key={matchedUser.matchId}
                user={matchedUser}
                onAccept={() => handleAccept(matchedUser.matchId)}
                onReject={() => handleReject(matchedUser.matchId)}
            />
            );
        }).reverse() // Reverse the array to ensure the next user is
        // at the bottom of the stack
    }
    </View>
    : <View style={styles.container}>
        <TouchableOpacity style={styles.editButton} onPress={handleMatch}>
            <Text style={styles.editButtonText}>Match</Text>
        </TouchableOpacity>
    </View>
    };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
    },
    editButton: {
        marginTop: 20,
        backgroundColor: 'blue',
        padding: 30,
        borderRadius: 20,
    },
    editButtonText: {
        fontSize: 30,
        color: 'white',
        fontWeight: 'bold',
    },
});

export default MatchScreen;
