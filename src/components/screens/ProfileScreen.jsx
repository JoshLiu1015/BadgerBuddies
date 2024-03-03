import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useState, useEffect, useContext, React } from 'react';
import BadgerBuddiesContext from '../../../contexts/BadgerBuddiesContext';
import { tokens } from 'react-native-paper/lib/typescript/styles/themes/v3/tokens';
// import { ScrollView } from 'react-native-gesture-handler';




const ProfileScreen = (props) => {
    
    const UserInfoRow = ({ label, value }) => (
        <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>{label}: {value}</Text>
        </View>
    );

    const userPhoto = require('../../../assets/swan.webp');
    // const [userName, setUserName] = useState("Swan")
    // const [gender, setGender] = useState("Male");
    // const [major, setMajor] = useState("CS");
    // const [grade, setGrade] = useState("Freshman");
    const [userInfo, setUserInfo] = useState({});

    const [setIsLoggedIn, userId] = useContext(BadgerBuddiesContext);

    useEffect(() => {
        // alert(userId);
        fetch(`http://192.168.1.168:3000/user/id/${userId}`, {

        }).then(res => {
            // alert(res.status);
            if (res.status === 200) {
                return res.json()
            } else {

            }}).then(json => {
            // alert(json.User.id);
            if (json && json.User) {
                setUserInfo(json.User);
            } else {

            }
            
        }).catch(error => {
            alert("An error occurred: " + error.message);
            console.error("An error occurred:", error);
        });
    }, [])



    const onEditPress = async () => {
        const tokenr = await SecureStore.getItemAsync(props.username)
        const res = await fetch(`http://192.168.1.168:3000/user/id/${userId}`, {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "title": title,
                "content": body
            })
        })
    

    function handleLoggedOut() {
        // if (isRegistered) {
        //     setIsRegistered(false);
        //     handleScreenChange("PersonalInfo");
        //     setIsRegistering(false);
        // }
        // else if (isLoggedIn) {
        //     setIsLoggedIn(false);
        // }
        setIsLoggedIn(false);
    }

    return <View style={styles.container}>
        
        <Image source={userPhoto} style={styles.photo} />
        
        { userInfo.lastName === null ? <Text style={styles.greeting}>Hi! {userInfo.firstName}</Text> :
        <Text style={styles.greeting}>Hi! {userInfo.firstName} {userInfo.lastName}</Text> }
        <View style={{flex: 1}}>
        <ScrollView>
            <UserInfoRow label="Gender" value={userInfo.gender} />
            <UserInfoRow label="Major" value={userInfo.major} />
            <UserInfoRow label="Grade" value={userInfo.grade} />
            <UserInfoRow label="Weight" value={userInfo.weight} />
            <UserInfoRow label="Height" value={userInfo.height} />
            
        </ScrollView>
        </View>

        <View style={{ flexDirection: "row", marginTop: 15 }}>
            <View style={{ justifyContent: "center" }}>
                <TouchableOpacity style={styles.editButton} onPress={onEditPress}>
                    <Text style={styles.editButtonText}>Edit</Text>
                </TouchableOpacity>
            </View>

            <View style={{ marginLeft: 15 }}>
                <TouchableOpacity style={styles.editButton} onPress={handleLoggedOut}>
                    <Text style={styles.editButtonText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>

    </View>


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
