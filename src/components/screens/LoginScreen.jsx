import React, { useRef } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const LoginScreen = ({ onLogin, onNavigateToSignUp, navigation }) => {
  const emailRef = useRef('');
  const passwordRef = useRef('');

  function handleLogin() {
    // Access the current value of the refs with `emailRef.current` and `passwordRef.current`
    onLogin(emailRef.current, passwordRef.current);
  };

  function onNavigateToSignUp() {
    navigation.navigate('SignUp')
    
  }

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 24, textAlign: "center", marginBottom: 30}}>Welcome to Badger Buddies!</Text>
      <TextInput
        style={styles.input}
        ref={emailRef} // Use ref instead of value and onChangeText
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        // // Assign the input value directly to the ref
        // onChangeText={(text) => { emailRef.current = text; }}
      />
      <TextInput
        style={styles.input}
        ref={passwordRef} // Use ref instead of value and onChangeText
        placeholder="Password"
        secureTextEntry
        // // Assign the input value directly to the ref
        // onChangeText={(text) => { passwordRef.current = text; }}
      />
      <Button title="LOGIN" onPress={handleLogin} />
      <Text>Is it your first time?</Text>
      <Button title="Sign Up" onPress={onNavigateToSignUp} />
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
  input: {
    width: '100%',
    marginVertical: 8,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
});

export default LoginScreen;
