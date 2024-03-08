import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, ScrollView, Modal, Button, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useState, useEffect, useContext, React } from 'react';
import BadgerBuddiesContext from '../../../contexts/BadgerBuddiesContext';
import * as SecureStore from 'expo-secure-store';





const ProfileScreen = (props) => {
    
    const UserInfoRow = ({ label, value }) => (
        <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>{label}: {value}</Text>
        </View>
    );

    const userPhoto = require('../../../assets/swan.webp');
    const [editFirstName, setEditFirstName] = useState("");
    const [editLastName, setEditLastName] = useState("");
    const [editGender, setEditGender] = useState("");
    const [editMajor, setEditMajor] = useState("");
    const [editGrade, setEditGrade] = useState("");
    const [editWeight, setEditWeight] = useState(null);
    const [editHeight, setEditHeight] = useState(null);

    const [userInfo, setUserInfo] = useState({});
    const [modalVisible, setModalVisible] = useState(false);

    const [setIsLoggedIn, userId, secureStoreEmail] = useContext(BadgerBuddiesContext);

    const editVals = [editFirstName, editLastName, editGender, editMajor, editGrade, editWeight, editHeight];
    const editSetVals = [setEditFirstName, setEditLastName, setEditGender, setEditMajor, setEditGrade, setEditWeight, setEditHeight];
    const editTitles = ["First name", "Last name", "Gender", "Major", "Grade", "Weight", "Height"];

    const userInfoArray = [userInfo.firstName, userInfo.lastName, userInfo.gender, userInfo.major, userInfo.grade, userInfo.weight, userInfo.height];
    const bodyTitles = ["firstName", "lastName", "gender", "major", "grade", "weight", "height"];

    const [isUpdated, setIsUpdated] = useState(false);

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
            // user info is an object
            setUserInfo(json.User);

            // set these variables to see the differences after users edit profiles
            setEditFirstName(json.User.firstName);
            setEditLastName(json.User.lastName);
            setEditGender(json.User.gender);
            setEditMajor(json.User.major);
            setEditGrade(json.User.grade);
            setEditWeight(json.User.weight);
            setEditHeight(json.User.height);
            // alert(typeof json.User.height === 'number');

            // when updated data is fetched, set the bool back to false
            // so it can be set to true again when next update
            setIsUpdated(false);

        } else {

        }
            
        }).catch(error => {
            alert("An error occurred: " + error.message);
            console.error("An error occurred:", error);
        });
    }, [userId, isUpdated])


    // when users edit their profiles
    const onEditPress = async () => {
        try {
            let body = {};

            // loop through every values in the screen
            editVals.forEach((val, i) => {
                // if the data is different from last time it was fetched
                if (val !== userInfoArray[i]) {
                    // create a new json body containing all changes
                    body[bodyTitles[i]] = val;
                }
            })
            
            alert(userId);
            const token = await SecureStore.getItemAsync(secureStoreEmail);
            const res = await fetch(`http://192.168.1.168:3000/user/id/${userId}`, {
                method: "PATCH",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            })

            
            if (res.status === 404) {
                alert("User not found");
            }
            else if (res.status == 200) {
                alert("Your update was successful");

                // after updating the database, set the bool value
                // so it will triger useEffect to fetch new data
                setIsUpdated(true);
                setModalVisible(false);
            }
        } catch (error) {
            console.error("Error during login: ", error);
        }

        
    }

    function onCancelPress() {
        setModalVisible(false);
    }
    

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
                <TouchableOpacity style={styles.editButton} onPress={() => setModalVisible(true)}>
                    <Text style={styles.editButtonText}>Edit</Text>
                </TouchableOpacity>
            </View>

            <View style={{ marginLeft: 15 }}>
                <TouchableOpacity style={styles.editButton} onPress={handleLoggedOut}>
                    <Text style={styles.editButtonText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>

        
        <View>
        
            <Modal
                transparent={true}
                visible={modalVisible}
                animationType="slide"
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Edit Profile</Text>
                        {editVals.map((val, i) => {
                            if (typeof val === 'number') {
                                val = String(val);
                            }
                            return <View key={i}>
                                <Text style={{fontWeight: 'bold', marginBottom: 10}}>{editTitles[i]}</Text>
                                <TextInput
                                    style={styles.modalInput}
                                    onChangeText={editSetVals[i]}
                                    value={val}
                                />
                            </View>
                        })}
                        

                        
                        <View style={{ justifyContent: 'center', flexDirection: "row" }}>

                            <Button title="Save" onPress={() => onEditPress()} disabled={editFirstName === ""
                                || editGender === "" || editMajor === "" || editGrade === "" } color="crimson" />
                            <Button title="Cancel" onPress={onCancelPress} color="gray" />
                        </View>
                    </View>
                </View>
                </TouchableWithoutFeedback>
            </Modal>
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
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        width: '80%',
        elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalInput: {
        borderWidth: 1,
        height: 40,
        marginBottom: 10,
        padding: 10
    },
  });


export default ProfileScreen;
