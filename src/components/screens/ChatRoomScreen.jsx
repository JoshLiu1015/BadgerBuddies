import React, { useState, useEffect, useContext } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';
import io from 'socket.io-client';
import BadgerBuddiesContext from '../../../contexts/BadgerBuddiesContext';
import * as SecureStore from 'expo-secure-store';


const ChatRoomScreen = (props) => {
    // Initialize socket connection
    // It triggers io.on('connection', (socket) => { ... }) on the backend/server
    // which enables every user
    const socket = io('http://192.168.2.91:3000', {
    //const socket = io('http://192.168.1.168:3000', {
        query: {
            // senderId as a key to store the socket id in the backend
            userId: props.route.params.requesterId
        }
    });

    const [setIsLoggedIn, userId, secureStoreEmail] = useContext(BadgerBuddiesContext);


    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');

    const senderId = props.route.params.requesterId;
    const receiverId = props.route.params.targetId;

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const token = await SecureStore.getItemAsync(secureStoreEmail);

                // Fetch the existing messages from the backend
                const res = await fetch(`http://192.168.2.91:3000/message/id/${senderId}/${receiverId}`, {
                //const res = await fetch(`http://192.168.1.168:3000/message/id/${userId}/${receiverId}`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    }
                });
                
                if (res.status == 200) {
                    alert("Successfully fetched messages");
                
                    const json = await res.json();
                    
                    // if messages are found
                    if (json && json.Messages) {
                        alert(JSON.stringify(json.Messages))
                        setMessages(json.Messages);
                        

                    }

                    // Listen for new messages
                    socket.on('receiveMessage', (newMessage) => {
                        setMessages(currentMessages => [...currentMessages, newMessage]);
                    });

                    return () => {
                        socket.off('receiveMessage');
                    };

                } else {
                    alert("Failed to fetch messages");
                }

                
            } catch (error) {
                console.error("Error during fetching: ", error);
            }
        }

        fetchMessages();

    }, []);

    

    const sendMessage = () => {
        // don't send empty messages
        if (message === '') {
            alert('Please type a message');
        }
        else{
            const newMessage = {
                senderId: senderId,
                receiverId: receiverId,
                message: message,
                // Include other data as needed, like senderId
            };
            socket.emit('sendMessage', newMessage);
            setMessage('');
            setMessages(currentMessages => [...currentMessages, newMessage]);
        }
    };


    const renderMessageItem = ({ item }) => {
        const isSender = item.senderId === senderId;

        return (
            <View style={[styles.messageRow, isSender ? styles.sender : styles.receiver]}>
                <Text style={styles.messageText}>{item.message}</Text>
            </View>
        );
    };


    return (
        <View style={styles.container}>
            <FlatList
                data={messages}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderMessageItem}
                inverted
            />
            <TextInput
                value={message}
                onChangeText={setMessage}
                placeholder="Type a message"
                style={styles.input}
            />
            <Button title="Send" onPress={sendMessage} disabled={message === ''}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        margin: 10,
    },
    messageRow: {
        flexDirection: 'row',
        margin: 4,
        padding: 8,
        borderRadius: 12,
        maxWidth: '70%',
    },
    sender: {
        backgroundColor: '#DCF8C6',
        alignSelf: 'flex-end',
    },
    receiver: {
        backgroundColor: '#FFFFFF',
        alignSelf: 'flex-start',
    },
    messageText: {
        fontSize: 16,
    },
});


export default ChatRoomScreen;
