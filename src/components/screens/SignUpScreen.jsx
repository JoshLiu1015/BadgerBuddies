import React, { useRef, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';

const SignUpScreen = (props) => {
  const [usernameVal, setUsernameVal] = useState("");
  const [passwordVal, setPasswordVal] = useState("");
  const [confirmPasswordVal, setConfirmPasswordVal] = useState("");

  return <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
      <Text style={{ fontSize: 36 }}>Join BadgerBuddies!</Text>

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
      <Text>Confirm Password</Text>
      <TextInput
          style={styles.input}
          onChangeText={setConfirmPasswordVal}
          value={confirmPasswordVal}
          secureTextEntry={true}
      />

      
      <View style={{ borderWidth: 1, marginTop: 15 }}>
          <Button color="crimson" title="SIGNUP" onPress={() => {
              if (usernameVal === "")
                  alert("Please enter a username");
              else if (passwordVal === "")
                  alert("Please enter a password");
              else if (confirmPasswordVal === "")
                  alert("Please enter a confirm password")
              else if (passwordVal !== confirmPasswordVal)
                  alert("Passwords do not match")
              else{
                  // props.setIsRegistering(false);
                  props.handleSignup(usernameVal, passwordVal);
                  setUsernameVal("");
                  setPasswordVal("");
                  setConfirmPasswordVal("");

              }

          }} />
      </View>

      <View style={{ flexDirection: "row", marginTop: 15 }}>
        <View style={{ justifyContent: "center" }}>
          <Text>already have an account?</Text>
        </View>
        <View style={{ borderWidth: 1, marginLeft: 15}}>
            <Button color="grey" title="LOGIN" onPress={() => props.setIsRegistering(false)} />
        </View>
      </View>
        
    </View>
  </TouchableWithoutFeedback>;;
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

export default SignUpScreen;

