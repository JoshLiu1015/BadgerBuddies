import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, ScrollView, Modal, Button } from 'react-native';
import { useState, useEffect, useContext, React } from 'react';
import BadgerBuddiesContext from '../../../contexts/BadgerBuddiesContext';
// import { ScrollView } from 'react-native-gesture-handler';




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

    const [setIsLoggedIn, userId] = useContext(BadgerBuddiesContext);

    const editVals = [editFirstName, editLastName, editGender, editMajor, editGrade, editWeight, editHeight];
    const editSetVals = [setEditFirstName, setEditLastName, setEditGender, setEditMajor, setEditGrade, setEditWeight, setEditHeight];
    const editTitles = ["First name", "Last name", "Gender", "Major", "Grade", "Weight", "Height"];

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
                setEditFirstName(json.User.firstName);
                setEditLastName(json.User.lastName);
                setEditGender(json.User.gender);
                setEditMajor(json.User.major);
                setEditGrade(json.User.grade);
                setEditWeight(json.User.weight);
                setEditHeight(json.User.height);
                
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
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Edit Profile</Text>
                        {for (let i = 0; i < editVals.length; i++) {
                            <Text style={{fontWeight: 'bold', marginBottom: 10}}>{editTitles[i]}</Text>
                            <TextInput
                                style={styles.modalInput}
                                onChangeText={editSetVals[i]}
                                value={editVals[i]}
                            />
                        }}
                        <Text style={{fontWeight: 'bold', marginBottom: 10}}>First Name</Text>
                        <TextInput
                            style={styles.modalInput}
                            onChangeText={setEditFirstName}
                            value={editFirstName}
                        />
                        
                        <View style={{ justifyContent: 'center', flexDirection: "row" }}>

                            <Button title="Create Post" onPress={() => onEditPress(editFirstName)} disabled={editFirstName === ""
                                || editGender === "" || editMajor === "" || editGrade === "" } color="crimson" />
                            <Button title="Cancel" onPress={onCancelPress} color="gray" />
                        </View>
                    </View>
                </View>
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
