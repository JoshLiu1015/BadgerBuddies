import React from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';

const UserScreen = ({ user, onAccept, onReject }) => {
  return (
    <View style={styles.card}>
      {/* <Image source={{ uri: user.picture }} style={styles.image} /> */}
      <Text style={styles.name}>{user.firstName} {user.lastName}</Text>
      <View style={styles.actions}>
        <Button title="Accept" onPress={onAccept} />
        <Button title="Reject" onPress={onReject} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    // position: 'absolute': it positions the component relative to its first positioned (not static) ancestor component. 
    // In this case, the ancestor is the MatchScreen container.
    position: 'absolute',
    width: '100%',
    padding: 16,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowColor: 'black',
    shadowOffset: { height: 0, width: 0 },
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
});

export default UserScreen;
