import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';
import io from 'socket.io-client';


const ChatRoomScreen = (props) => {
    // Initialize socket connection
    // It triggers io.on('connection', (socket) => { ... }) on the backend/server
    // which enables every user
    const socket = io('http://192.168.1.168:3000', {
        query: {
            // senderId as a key to store the socket id in the backend
            userId: props.route.params.requesterId
        }
    });


    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');

    // useEffect(() => {
    //     // Fetch the existing messages from the backend
    //     fetch(`http://your_server_url/messages/${chatRoomId}`)
    //         .then(response => response.json())
    //         .then(data => setMessages(data.messages))
    //         .catch(error => console.error(error));

    //     // Listen for new messages
    //     socket.on('newMessage', (newMessage) => {
    //         setMessages(currentMessages => [...currentMessages, newMessage]);
    //     });

    //     return () => {
    //         socket.off('newMessage');
    //     };
    // }, [chatRoomId]);

    const sendMessage = () => {
        // don't send empty messages
        if (message === '') {
            alert('Please type a message');
        }
        else{
            const newMessage = {
                senderId: props.route.params.requesterId,
                receiverId: props.route.params.targetId,
                message: message,
                // Include other data as needed, like senderId
            };
            socket.emit('sendMessage', newMessage);
            setMessage('');
        }
    };


    const renderMessageItem = ({ item }) => {
        const isSender = item.senderId === currentUser;

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
