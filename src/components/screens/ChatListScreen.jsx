import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import BadgerBuddiesContext from '../../../contexts/BadgerBuddiesContext';
import * as SecureStore from 'expo-secure-store';

const ChatListScreen = ({ onChatSelected }) => {

    const navigation = useNavigation();
    const [matchedUsers, setMatchedUsers] = useState([]);


    const [setIsLoggedIn, userId, secureStoreEmail] = useContext(BadgerBuddiesContext);


    const [chatList, setChatList] = useState([{"id": 1, "name": "John Doe", "photo": '../../../assets/swan.webp'}, 
        {"id": 2, "name": "Jane Doe", "photo": '../../../assets/swan.webp'},
        {"id": 3, "name": "Alice", "photo": '../../../assets/swan.webp'}, 
        {"id": 4, "name": "Bob", "photo": '../../../assets/swan.webp'}, 
        {"id": 5, "name": "Charlie", "photo": '../../../assets/swan.webp'}, 
        {"id": 6, "name": "David", "photo": '../../../assets/swan.webp'}, 
        {"id": 7, "name": "Eve", "photo": '../../../assets/swan.webp'}, 
        {"id": 8, "name": "Frank", "photo": '../../../assets/swan.webp'}, 
        {"id": 9, "name": "Grace", "photo": '../../../assets/swan.webp'}, 
        {"id": 10, "name": "Hank", "photo": '../../../assets/swan.webp'}]);


    // it should get rows from Matches joined with target User as well as the latest Message

    useEffect(() => {
        // Call the API to fetch users and set the state
        const fetchUsers = async () => {
            try {
                const token = await SecureStore.getItemAsync(secureStoreEmail);
                
                const res = await fetch(`http://192.168.2.91:3000/match/messages/requesterId/${userId}`, {
                //const res = await fetch(`http://192.168.1.168:3000/match/messages/requesterId/${userId}`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    }
                });
                
                if (res.status == 200) {
                    // alert("Successfully fetched users");
                   
                    const json = await res.json();
                    
                    // if at least one matche is found
                    if (json && json.Match[0]) {
                        // alert(JSON.stringify(json.Match))
                        // alert(json.Match[0].pictures[0])
                        setMatchedUsers(json.Match);

                    }
                } else {
                    alert("Failed to fetch users");
                }
    
                
            } catch (error) {
                console.error("Error during matching: ", error);
            }
    
            
        };
    
        fetchUsers();

        const unsubscribe = navigation.addListener('focus', () => {
            fetchUsers(); // Fetch again when the screen is focused
        });

        // Return the function to unsubscribe from the event so it gets removed on unmount
        // it prevents memory leaks
        return unsubscribe;


    }, [navigation]);



    const onDeletePress = async (receiverId) => {
        // Call the API to delete the chat
        try {
            const token = await SecureStore.getItemAsync(secureStoreEmail);
            alert("senderId: " + userId + " receiverId: " + receiverId);

            const res = await fetch(`http://192.168.2.91:3000/message/id/${userId}/${receiverId}`, {
            //const res = await fetch(`http://192.168.1.168:3000/message/id/${userId}/${receiverId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            });
            
            if (res.status == 200) {
                alert("Successfully deleted messages");
               
                const json = await res.json();
                
                // if at least one matche is found
                if (json && json.Info) {
                    // alert(JSON.stringify(json.Info))
                    

                }
            } else {
                alert("Failed to delete messages");
            }

            
        } catch (error) {
            console.error("Error during matching: ", error);
        }
    };


    const renderChatItem = ({ item: matchedUser }) => (
        <View>
            <TouchableOpacity style={styles.chatItem} onPress={() => navigation.push("Chat Room", {requesterId: matchedUser.requesterId, targetId: matchedUser.targetId})}>
                {matchedUser.pictures[0] !== null ? <Image source={{uri: matchedUser.pictures}} style={styles.chatPhoto} /> : <Image source={require('../../../assets/swan.webp')} style={styles.chatPhoto} />}
                {/* <Image source={{ uri: item.photo }} style={styles.chatPhoto} />  */}
                <View style={styles.chatInfo}>
                    <Text style={styles.chatName}>{matchedUser.firstName} {matchedUser.lastName}</Text>
                    
                </View>

                <View style={{justifyContent: 'center', marginLeft: 50}}>
                    <Text style={styles.chatLastMessage}>{matchedUser.message}</Text>
                </View>
                
                <View style={{justifyContent: 'center', marginLeft: 50}}>
                    <Button title="Delete" onPress={() => onDeletePress(matchedUser.receiverId)} color="gray" />
                </View>
                
            </TouchableOpacity>
            
        </View>
    );
    
    return matchedUsers.length > 0 ? <FlatList
            data={matchedUsers}
            keyExtractor={matchedUser => matchedUser.matchId.toString()}
            renderItem={renderChatItem}
            style={styles.chatList}
        />
    
    : <Text>No chats yet</Text>
};

const styles = StyleSheet.create({
    chatList: {
        // Styles for the list
    },
    chatItem: {
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    chatPhoto: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    chatInfo: {
        justifyContent: 'center',
    },
    chatName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    chatLastMessage: {
        color: 'grey',
    },
});

export default ChatListScreen;
