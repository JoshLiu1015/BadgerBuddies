import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text } from 'react-native';
import io from 'socket.io-client';

// Initialize socket connection
// const socket = io('http://your_server_address');

const ChatRoomScreen = ({ route }) => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const { chatRoomId } = route.params; // Assume you pass chatRoomId when navigating to this screen

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
        const newMessage = {
            chatRoomId,
            message,
            // Include other data as needed, like senderId
        };
        socket.emit('sendMessage', newMessage);
        setMessage('');
    };

    return (
        <View>
            <FlatList
                data={messages}
                keyExtractor={(item, index) => String(index)}
                renderItem={({ item }) => <Text>{item.message}</Text>}
            />
            <TextInput
                value={message}
                onChangeText={setMessage}
                placeholder="Type a message"
            />
            <Button title="Send" onPress={sendMessage} />
        </View>
    );
};

export default ChatRoomScreen;
