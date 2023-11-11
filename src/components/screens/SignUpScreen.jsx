import React, { useRef } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const SignUpScreen = ({ onSignUp }) => {
  const emailRef = useRef('');
  const passwordRef = useRef('');

  const handleSignUp = () => {
    // Access the current value of the refs with `emailRef.current` and `passwordRef.current`
    onSignUp(emailRef.current, passwordRef.current);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sign Up</Text>
      <TextInput
        style={styles.input}
        ref={emailRef} // Assign ref for email
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={(text) => { emailRef.current = text; }} // Update ref value on change
      />
      <TextInput
        style={styles.input}
        ref={passwordRef} // Assign ref for password
        placeholder="Password"
        secureTextEntry
        onChangeText={(text) => { passwordRef.current = text; }} // Update ref value on change
      />
      <Button title="CREATE ACCOUNT" onPress={handleSignUp} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  header: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 30
  },
  input: {
    width: '100%',
    marginVertical: 8,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
});

export default SignUpScreen;

