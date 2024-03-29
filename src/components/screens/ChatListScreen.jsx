import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from "@react-navigation/native";

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
    
                const res = await fetch(`http://192.168.1.168:3000/match/requesterId/${userId}`, {
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
    }, []);


    const renderChatItem = ({ matchedUser }) => (
        <TouchableOpacity style={styles.chatItem} onPress={() => navigation.push("Chat Room", {requesterId: matchedUser.requesterId, targetId: matchedUser.targetId})}>
            <Image source={require('../../../assets/swan.webp')} style={styles.chatPhoto} />
            {/* <Image source={{ uri: item.photo }} style={styles.chatPhoto} />  */}
            <View style={styles.chatInfo}>
                <Text style={styles.chatName}>{matchedUser.firstName} {matchedUser.lastName}</Text>
                <Text style={styles.chatLastMessage}>{item.message}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <FlatList
            data={matchedUsers}
            keyExtractor={matchedUser => matchedUser.matchId.toString()}
            renderItem={renderChatItem}
            style={styles.chatList}
        />
    );
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
