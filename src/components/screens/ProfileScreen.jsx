import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, ScrollView, Modal, Button, TouchableWithoutFeedback, Keyboard, Dimensions } from 'react-native';
import { useState, useEffect, useContext, React } from 'react';
import BadgerBuddiesContext from '../../../contexts/BadgerBuddiesContext';
import * as SecureStore from 'expo-secure-store';
import RNPickerSelect from 'react-native-picker-select';
import * as ImagePicker from 'expo-image-picker';
import CarouselScreen from './CarouselScreen';




const ProfileScreen = (props) => {
    
    const UserInfoRow = ({ label, value }) => (
        <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>{label}: {value}</Text>
        </View>
    );

    // const [userPhoto, setUserPhoto] = useState(require('../../../assets/swan.webp'));

    const [editPictures, setEditPictures] = useState(Array(6).fill(null));

    // const addNewPhoto = (newPhotoUri) => {
    //     setUserPhotos([...userPhotos, newPhotoUri]);
    //   };
      


    const selectPhotoAdd = async (index) => {
        try {
            // You may need to ask for permissions before opening the image picker
            const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        
            if (permissionResult.granted === false) {
                alert("You've refused to allow this app to access your photos!");
                return;
            }
        
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
        
            if (!result.canceled) {
                // alert(result.assets[0].uri)
                setEditPictures(oldArray => {
                    const newArray = [...oldArray];
                    newArray[index] = { uri: result.assets[0].uri };
                    return newArray;
                });
            }
        } catch(error) {
            alert(error);
        }
        
    };

    const selectPhotoDelete = async (index) => {
        setEditPictures(oldArray => {
            const newArray = [...oldArray];
            newArray[index] = null;
            return newArray;
        });
    }



    const [editFirstName, setEditFirstName] = useState("");
    const [editLastName, setEditLastName] = useState("");
    const [editGender, setEditGender] = useState("");
    const [editMajor, setEditMajor] = useState("");
    const [editYear, setEditYear] = useState("");
    const [editWeight, setEditWeight] = useState("");
    const [editHeight, setEditHeight] = useState("");
    const [editAboutMe, setEditAboutMe] = useState("");

    const [userInfo, setUserInfo] = useState({});
    const userInfoArray = [userInfo.aboutMe, userInfo.firstName, userInfo.lastName, userInfo.gender, userInfo.major, userInfo.year, userInfo.weight, userInfo.height];

    const [modalVisible, setModalVisible] = useState(false);

    const [setIsLoggedIn, userId, secureStoreEmail, preferenceId, setPreferenceId] = useContext(BadgerBuddiesContext);

    const editVals = [editAboutMe, editFirstName, editLastName, editGender, editMajor, editYear, editWeight, editHeight];
    const editSetVals = [setEditAboutMe, setEditFirstName, setEditLastName, setEditGender, setEditMajor, setEditYear, setEditWeight, setEditHeight];
    const editTitles = ["About Me", "First name", "Last name", "Gender", "Major", "Year", "Weight", "Height"];

   
    const bodyTitles = ["aboutMe", "firstName", "lastName", "gender", "major", "year", "weight", "height"];

    const [isUpdated, setIsUpdated] = useState(false);

    const options = [null, null, null, [{label: "Male", value: "male"}, {label: "Female", value: "female"},
        {label: "Other", value: "other"}], null, [{label: "Freshman", value: "freshman"},
        {label: "Sophomore", value: "sophomore"}, {label: "Junior", value: "junior"},
        {label: "Senior", value: "senior"}, {label: "Graduate", value: "graduate"}, 
        {label: "PHD", value: "phd"}, {label: "Other", value: "other"}], null, null];




    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch(`http://192.168.1.168:3000/user/id/${userId}`);

                if (res.status == 200) {
                    // alert("Successfully fetched the user");

                    const json = await res.json();
                    if (json && json.User) {
                        if (json.User.aboutMe === null)
                            json.User.aboutMe = "";
                        if (json.User.major === "NULL")
                            json.User.major = "";
                        if (json.User.weight === null)
                            json.User.weight = "";
                        if (json.User.height === null)
                            json.User.height = "";
                        if (json.User.pictures === null)
                            json.User.pictures = Array(6).fill(null);
                        // user info is an object
                        setUserInfo(json.User);

                        // alert(JSON.stringify(json.User));

                        // set these variables to see the differences after users edit profiles
                        setEditFirstName(json.User.firstName);
                        setEditLastName(json.User.lastName);
                        setEditGender(json.User.gender);
                        
                        

                        setEditMajor(json.User.major);

                        setEditYear(json.User.year);

                        
                        setEditWeight(json.User.weight);
                        setEditHeight(json.User.height);
                        setEditAboutMe(json.User.aboutMe);

                        // alert(json.User.pictures === null);
                        // alert(JSON.stringify(json.User.pictures));
                        setEditPictures(json.User.pictures);
                        
                        // alert(typeof json.User.height === 'number');

                        // when updated data is fetched, set the bool back to false
                        // so it can be set to true again when next update
                        setIsUpdated(false);
                    }

                } else {
                    alert("Failed to fetch the user");
                }
                
            } catch (error) {
                console.error("Error during matching: ", error);
            }
        }
        fetchUser();
    }, [userId, isUpdated])


    const handleGenderInPreference = async () => {
        try {
            alert("preferenceid: " + preferenceId);
            const token = await SecureStore.getItemAsync(secureStoreEmail);

            const res = await fetch(`http://192.168.1.168:3000/preference/preferenceId/${preferenceId}`, {
                method: "PATCH",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "userGender": editGender
                })
            })

            if (res.status === 404) {
                alert("User not found");
            }
            else if (res.status == 200) {
                alert("Your update was successful");
            }
        } catch (error) {
            console.error("Error during login: ", error);
        }
    }

    // when users edit their profiles
    const onEditPress = async () => {
        try {

            // if users don't enter numbers for weight or height
            if (editWeight !== "" && (isNaN(parseInt(editWeight, 10)) || parseInt(editWeight, 10) > 1000))
                alert("Please enter a valid number for your weight")
            

            else if (editHeight !== "" && (isNaN(parseInt(editHeight, 10)) || parseInt(editHeight, 10) > 1000))
                alert("Please enter a valid number for your height")



            else {
                let body = {};

                // handle pictures separately, because pictures not in editVals
                if (editPictures !== userInfo.pictures) {
                    body["pictures"] = editPictures;
                }

                // loop through every values in the screen
                editVals.forEach((val, index) => {
                    // if the data is different from last time it was fetched
                    if (val !== userInfoArray[index]) {
                        // if users changed their genders,
                        // the gender state variable in the BudgerBuddies screen should be updated
                        // so when MatchInfoScreen uses the gender from useContext, it will have up to date value 
                        if (bodyTitles[index] === "gender") {
                            // update the gender column in Preferences as well
                            handleGenderInPreference();



                        }
                        // create a new json body containing all changes
                        body[bodyTitles[index]] = val;
                    }
                })
                
                // alert(userId);
                const token = await SecureStore.getItemAsync(secureStoreEmail);
                // const res = await fetch(`http://10.140.172.174:3000/user/id/${userId}`, {
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
            }
            
        } catch (error) {
            console.error("Error during login: ", error);
        }

        
    }

    function onCancelPress() {
        // handle pictures separately, because pictures not in editVals
        if (editPictures !== userInfo.pictures) {
            setEditPictures(userInfo.pictures);
        }

        editVals.forEach((val, index) => {
            // if the data is different from last time it was fetched
            if (val !== userInfoArray[index]) {
                // change it back to its previous value
                editSetVals[index](userInfoArray[index]);
            }
        })
        setModalVisible(false);
    }
    

    function handleLoggedOut() {
        SecureStore.deleteItemAsync(secureStoreEmail);
        setIsLoggedIn(false);
    }

    return <View style={styles.container}>
        <View style={[styles.overlay, {paddingTop: 50}]}>
            {/* <TouchableOpacity onPress={selectPhotoTapped}>
                <Image source={{uri: userPhoto}} style={styles.photo} />
            </TouchableOpacity> */}
            <View style={{ height: 200, marginBottom: 30 }}>
                <CarouselScreen data={editPictures} />
            </View>
            
            <Text style={styles.greeting}>Hi! {userInfo.firstName} {userInfo.lastName}</Text>
        </View>

        <ScrollView>
            <View style={styles.overlay}>
                <UserInfoRow label="About Me" value={userInfo.aboutMe} />
                <UserInfoRow label="Gender" value={userInfo.gender} />
                <UserInfoRow label="Major" value={userInfo.major} />
                <UserInfoRow label="Year" value={userInfo.year} />
                <UserInfoRow label="Weight" value={userInfo.weight} />
                <UserInfoRow label="Height" value={userInfo.height} />
                

                <View style={{ flexDirection: "row", marginBottom: 15 }}>
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
            </View>
            
        </ScrollView>

        

        
        <View>
        
            <Modal
                transparent={true}
                visible={modalVisible}
                animationType="slide"
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <ScrollView>
                        {/* modalOverlay creates the gray area beneath */}
                        <View style={styles.modalOverlay}>
                            {/* modalContent is the white area above */}
                            <View style={styles.modalContent}>
                                <Text style={styles.modalTitle}>Edit Profile</Text>

                                <Text style={{fontWeight: 'bold', marginBottom: 10}}>Pictures</Text>
                                {/* flexWrap is used to prevent placeholders overflow */}
                                <View style={{ justifyContent: 'center', flexDirection: "row", flexWrap: 'wrap' }}>
                                    
                                {editPictures.map((picture, index) => (
                                        // this is the View for each placeholder
                                        <View key={index} style={{ margin: 12, width: 120, height: 120, justifyContent: 'center', alignItems: 'center' }}>
                                        
                                        {picture === null ? <>
                                        {/* display empty placeholders if element is null */}
                                            <View style={{ width: '100%', height: '100%', backgroundColor: '#eaeaea', justifyContent: 'center', alignItems: 'center' }}>
                                                <Text style={{ color: 'black' }}>Empty</Text>
                                            </View>
                                            <View style={{ justifyContent: 'center', flexDirection: "row", flexWrap: 'wrap' }}>
                                                <TouchableOpacity onPress={() => selectPhotoAdd(index)}>
                                                    <Text style={{ color: 'blue' }}>Add Photo</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => selectPhotoDelete(index)}>
                                                    <Text style={{ color: 'blue', marginLeft: 10 }}>Delete</Text>
                                                </TouchableOpacity>
                                            </View>
           
                                        </>
                                        
                                        :
                                        // if any elemeent in the array isn't null, render the photo
                                        <>
                                            <View key={index} style={{ margin: 0 }}>
                                                <Image source={picture} style={{ width: 110, height: 110 }} />
                                            </View>
                                            {/* pass index to selectPhotoTapped, so the function knows which placeholder it will replace
                                            by using the index to assign a new value in the images array */}
                                            <View style={{ justifyContent: 'center', flexDirection: "row", flexWrap: 'wrap' }}>
                                                <TouchableOpacity onPress={() => selectPhotoAdd(index)}>
                                                    <Text style={{ color: 'blue' }}>Add Photo</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => selectPhotoDelete(index)}>
                                                    <Text style={{ color: 'blue', marginLeft: 10 }}>Delete</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </>
                                        }
                                        </View>
                                        
                                    ))}
                                    
                                </View>

                                {editVals.map((val, index) => {
                                    // convert the values of weight and height to String
                                    // since we should put String in TextInput instead of numbers
                                    if (typeof val === 'number') {

                                        val = String(val);
                                    }

                                    if (editTitles[index] === "Gender" || editTitles[index] === "Year") {
                                        // create items for drop down menus
                                        const items = options[index];

                                        return <View key={index} style={{ marginBottom: 20 }}>
                                            <Text style={{fontWeight: 'bold', marginBottom: 10}}>{editTitles[index]}</Text>
                                            <RNPickerSelect
                                                onValueChange={(value) => editSetVals[index](value)}
                                                items={items}
                                                style={pickerSelectStyles}
                                                useNativeAndroidPickerStyle={false}
                                                // if val is null, change it to ""
                                                value={val}
                                                placeholder={{ label: "Select", value: "" }}
                                            />
                                        </View>
                                    }

                                    else if (editTitles[index] === "About Me") {
                                        return <View key={index}>
                                            <Text style={{fontWeight: 'bold', marginBottom: 10}}>{editTitles[index]}</Text>
                                            <TextInput
                                                style={[styles.modalInput, {height: 100}]}
                                                onChangeText={editSetVals[index]}
                                                value={val}
                                                multiline
                                            />
                                        </View>
                                    }
                                    else {
                                        return <View key={index}>
                                            <Text style={{fontWeight: 'bold', marginBottom: 10}}>{editTitles[index]}</Text>
                                            <TextInput
                                                style={styles.modalInput}
                                                onChangeText={editSetVals[index]}
                                                value={val}
                                            />
                                        </View>
                                    }
                                    
                                })}
                                

                                
                                <View style={{ justifyContent: 'center', flexDirection: "row" }}>

                                    <Button title="Save" onPress={() => onEditPress()} disabled={editFirstName === ""
                                        || editLastName === "" || editGender === "" || editYear === "" } color="crimson" />
                                    <Button title="Cancel" onPress={onCancelPress} color="gray" />
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
        
    </View>


};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        // paddingTop: 50,
        backgroundColor: '#fff',
    },
    overlay: {
        flexGrow: 1,
        justifyContent: 'center', // This centers content vertically in the screen
        alignItems: 'center', // This centers content horizontally in the screen
    },
    content: {
        width: '90%', // May adjust based on how wide you want the form
        maxWidth: 600, // Ensures the form doesn't stretch too wide on large devices
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
        paddingTop: 50,
        backgroundColor: 'white',
        padding: 20,
        width: '90%',
        elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 50,
    },
    modalInput: {
        borderWidth: 1,
        height: 40,
        marginBottom: 10,
        padding: 10
    },
  });

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
});


export default ProfileScreen;
