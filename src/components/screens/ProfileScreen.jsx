import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useState, useContext, React } from 'react';
import BadgerBuddiesContext from '../../../contexts/BadgerBuddiesContext';



const ProfileScreen = (props) => {
    
    const UserInfoRow = ({ label, value }) => (
        <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>{label}: {value}</Text>
        </View>
    );

    const userPhoto = require('../../../assets/swan.webp');
    const [userName, setUserName] = useState("Swan")
    const [gender, setGender] = useState("Male");
    const [major, setMajor] = useState("CS");
    const [grade, setGrade] = useState("Freshman");

    const [isRegistered, setIsRegistered, isLoggedIn, setIsLoggedIn, handleScreenChange, setIsRegistering] = useContext(BadgerBuddiesContext);

    function onEditPress() {
        setUserName("swan");
    }

    function handleLoggedOut() {
        if (isRegistered) {
            setIsRegistered(false);
            handleScreenChange("PersonalInfo");
            setIsRegistering(false);
        }
        else if (isLoggedIn) {
            setIsLoggedIn(false);
        }
    }

    return (
        <View style={styles.container}>
            <Image source={userPhoto} style={styles.photo} />
            <Text style={styles.greeting}>Hi! {userName}</Text>
            <UserInfoRow label="Gender" value={gender} />
            <UserInfoRow label="Major" value={major} />
            <UserInfoRow label="Grade" value={grade} />

            <TouchableOpacity style={styles.editButton} onPress={onEditPress}>
                <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.editButton} onPress={handleLoggedOut}>
                <Text style={styles.editButtonText}>Logout</Text>
            </TouchableOpacity>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 50,
        backgroundColor: '#fff',
    },
    photo: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 20,
    },
    greeting: {
        fontSize: 26,
        fontWeight: 'bold',
    },
    infoRow: {
        marginTop: 20,
        paddingVertical: 8,
    },
    infoLabel: {
        fontSize: 20,
        color: 'gray',
    },
    editButton: {
        marginTop: 20,
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
    },
    editButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
  });


export default ProfileScreen;
