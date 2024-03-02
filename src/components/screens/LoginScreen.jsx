import React, { useRef, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';

function LoginScreen(props) {

  const [usernameVal, setUsernameVal] = useState("");
  const [passwordVal, setPasswordVal] = useState("");


  return <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <View style={styles.container}>
      <Text style={{ fontSize: 36 }}>BadgerBuddies Login</Text>
      <Text style={{ marginTop: 20 }}>Username</Text>
      <TextInput
          style={styles.input}
          onChangeText={setUsernameVal}
          value={usernameVal}
      />
      <Text>Password</Text>
      <TextInput
          style={styles.input}
          onChangeText={setPasswordVal}
          value={passwordVal}
          secureTextEntry={true}
      />
      
      <View style={{ borderWidth: 1, marginTop: 15 }}>
        <Button color="crimson" title="LOGIN" onPress={() => {
          if (usernameVal === "" || passwordVal === "")
              alert("You must provide both a username and password!");
          else{
            props.handleLogin(usernameVal, passwordVal)
            setUsernameVal("");
            setPasswordVal("");
        }

        }} />
      </View>
      
      <View style={{ flexDirection: "row", marginTop: 15 }}>
        <View style={{ justifyContent: "center" }}>
          <Text>Is it your first time?</Text>
        </View>
        <View style={{ borderWidth: 1, marginLeft: 15 }}> 
          <Button color="grey" title="SIGNUP" onPress={() => props.setIsRegistering(true)} />
        </View>
      </View>
      
            
    </View>
  </TouchableWithoutFeedback>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        height: 40,
        width: 200,
        margin: 15,
        borderWidth: 1,
        padding: 10,
    },
});

export default LoginScreen;
