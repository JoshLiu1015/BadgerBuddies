import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, ScrollView, Modal, Button, TouchableWithoutFeedback, Keyboard, Dimensions } from 'react-native';
import { useState, useEffect, useContext, React } from 'react';
import BadgerBuddiesContext from '../../../contexts/BadgerBuddiesContext';
import * as SecureStore from 'expo-secure-store';
import RNPickerSelect from 'react-native-picker-select';
import * as ImagePicker from 'expo-image-picker';
import CarouselScreen from './CarouselScreen';
import io from 'socket.io-client';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconWeight from 'react-native-vector-icons/FontAwesome5';



const ProfileScreen = (props) => {
    
    // const UserInfoRow = ({ label, value }) => (
    //     <View style={styles.infoRow}>
    //         <Text style={styles.infoLabel}>{label}: {value}</Text>
    //     </View>
    // );

    // const UserInfoRow = ({ label, value }) => (
    //     <View style={styles.infoRowContainer}>
    //         <Text style={styles.infoLabel}>{label}</Text>
    //         <Text style={styles.infoValue}>{value}</Text>
    //     </View>
    // );

    const GenderIcon = () => <Icon name="person" size={20} color="#333" />;
    const MajorIcon = () => <Icon name="science" size={20} color="#333" />;
    const AgeIcon = () => <Icon name="school" size={20} color="#333" />;
    const WeightIcon = () => <IconWeight name="weight" size={20} color="#333" />;
    const HeightIcon = () => <Icon name="straighten" size={20} color="#333" />;


    

    const [editPictures, setEditPictures] = useState(Array(6).fill(null));


      
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
    const [editWeight, setEditWeight] = useState(0);
    const [editHeight, setEditHeight] = useState(0);
    const [editAboutMe, setEditAboutMe] = useState("");

    // userInfoArray is used to compare to edited values in editVals
    const [userInfo, setUserInfo] = useState({});
    const userInfoArray = [userInfo.aboutMe, userInfo.firstName, userInfo.lastName, userInfo.gender, userInfo.major, userInfo.year, userInfo.weight, userInfo.height];

    const [modalVisible, setModalVisible] = useState(false);

    const [setIsLoggedIn, userId, secureStoreEmail, preferenceId, setPreferenceId,
        weightMetric, setWeightMetric, heightMetric, setHeightMetric] = useContext(BadgerBuddiesContext);

    const editVals = [editAboutMe, editFirstName, editLastName, editGender, editMajor, editYear, editWeight, editHeight];
    const editSetVals = [setEditAboutMe, setEditFirstName, setEditLastName, setEditGender, setEditMajor, setEditYear, setEditWeight, setEditHeight];
    const editTitles = ["About Me", "First name", "Last name", "Gender", "Major", "Year", "Weight", "Height"];

   
    const bodyTitles = ["aboutMe", "firstName", "lastName", "gender", "major", "year", "weight", "height"];


    const [isUpdated, setIsUpdated] = useState(false);


    // const socket = io('http://192.168.2.91:3000', {
    const socket = io('http://192.168.1.168:3000', {
        query: {
            // senderId as a key to store the socket id in the backend
            userId: userId
        }
    });


    const heightOptionsFeetInches = [];
    for (let feet = 4; feet <= 7; feet++) {
        for (let inch = 0; inch < 12; inch++) {
            const label = `${feet}'${inch}"`;
            const value = `${feet * 12 + inch}`; // Convert feet and inches to total inches 
            heightOptionsFeetInches.push({ label, value });
        }
    }

    const options = [null, null, null, [{label: "Male", value: "male"}, {label: "Female", value: "female"},
        {label: "Other", value: "other"}], null, [{label: "Freshman", value: "freshman"},
        {label: "Sophomore", value: "sophomore"}, {label: "Junior", value: "junior"},
        {label: "Senior", value: "senior"}, {label: "Graduate", value: "graduate"}, 
        {label: "PHD", value: "phd"}, {label: "Other", value: "other"}], 
        [Array.from({ length: 600 }, (_, i) => ({ label: `${i + 60} lb`, value: `${i + 60}` })), Array.from({ length: 270 }, (_, i) => ({ label: `${i + 30} kg`, value: `${i + 30 }`}))],
        [heightOptionsFeetInches, Array.from({ length: 200 }, (_, i) => ({ label: `${i + 100} cm`, value: `${i + 100 }`}))]];


    

    // const [weightMetric, setWeightMetric] = useState("lb"); // default value
    // const [heightMetric, setHeightMetric] = useState("ft/in"); // default value

    // create a state variable to store the value of weight in kg and height in cm
    const [editWeightKg, setEditWeightKg] = useState(0);
    const [editHeightCm, setEditHeightCm] = useState(0);




    const ProfileSection = ({ title, children }) => (
        <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>{title}</Text>
            {children}
        </View>
    );
      
    const UserInfoGraphRow = ({value, icon }) => (
        <View style={styles.infoGraphRowContainer}>
            <View style={styles.graphIconContainer}>
            {icon}
            </View>
            <View>
            <Text style={{marginLeft: 10}}>{value}</Text>
            </View>
        </View>
    );


    // const weightOptions = [
    //     { label: "lb", value: "lb" },
    //     { label: "kg", value: "kg" }
    // ];

    // const heightOptions = [
    //     { label: "ft/in", value: "ft/in" },
    //     { label: "cm", value: "cm" }
    // ];

    // function to convert inches to feet and inches
    const inchesToFeetInches = (inches) => {
        const feet = Math.floor(inches / 12);
        const inch = inches % 12;
        return `${feet}'${inch}"`;
    }


    


    // fetch user data from the database
    useEffect(() => {
        const fetchUser = async () => {
            try {
                // const res = await fetch(`http://192.168.2.91:3000/user/id/${userId}`);
                const res = await fetch(`http://192.168.1.168:3000/user/id/${userId}`);

                if (res.status == 200) {
                    // alert("Successfully fetched the user");

                    const json = await res.json();
                    // convert null values to empty strings or 0
                    // because null values can't be displayed in RNPickSelect
                    if (json && json.User) {
                        // if (json.User.aboutMe === null)
                        //     json.User.aboutMe = "";
                        // if (json.User.major === "NULL")
                        //     json.User.major = "";
                        if (json.User.weight === null)
                            json.User.weight = 0;

                        if (json.User.height === null)
                            json.User.height = 0;
                        // if (json.User.pictures === null)
                        //     json.User.pictures = Array(6).fill(null);
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
                        // convert the weight value to kg
                        setEditWeightKg(Math.round(json.User.weight * 0.453592));

                        setEditHeight(json.User.height);
                        // convert the height value to cm
                        setEditHeightCm(Math.round(json.User.height * 2.54));

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



    // if users change their gender, the Preferences table should be updated as well
    const handleGenderInPreference = async () => {
        try {
            alert("preferenceid: " + preferenceId);
            const token = await SecureStore.getItemAsync(secureStoreEmail);
            
            // const res = await fetch(`http://192.168.2.91:3000/preference/preferenceId/${preferenceId}`, {
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
            let body = {};

            // handle pictures separately, because pictures not in editVals
            if (editPictures !== userInfo.pictures) {
                body["pictures"] = editPictures;
            }

            // loop through every values in the screen
            editVals.forEach((val, index) => {

                // if the title is weight and the weight is in kg
                if (weightMetric === "kg" && bodyTitles[index] === "weight") {
                    // convert editWeightKg to lb for comparison
                    // since the values in userInfoArray are in lb
                    val = editWeightKg * 2.20462;

                    
                }
                // if the title is height and the height is in cm
                if (heightMetric === "cm" && bodyTitles[index] === "height") {
                    // convert editHeightCm to inches for comparison
                    val = editHeightCm / 2.54;
                }

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
            
            // const res = await fetch(`http://192.168.2.91:3000/user/id/${userId}`, {
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


    // whhen users press cancel button on the edit menu, set the values back to the original values
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
        socket.disconnect()
    }



    // handle weight button
    const handleWeightMetric = () => {
        if (weightMetric === "lb") {
            // if the weight is in lb, change it to kg
            setWeightMetric("kg");
            // // convert the weight value to kg
            // setEditWeight(Math.round(editWeight * 0.453592));

        }
        else {
            // if the weight is in kg, change it to lb
            setWeightMetric("lb");
            // // convert the weight value to lb first
            // setEditWeight(Math.round(editWeight * 2.20462));

        }
    }

    // handle height button
    const handleHeightMetric = () => {
        if (heightMetric === "ft/in") {
            // if the height is in ft/in, change it to cm
            setHeightMetric("cm");
            // // convert the height value to cm first
            // setEditHeight(Math.round(editHeight * 2.54));
        }
        else {
            // if the height is in cm, change it to ft/in
            setHeightMetric("ft/in");
            // // convert the height value to ft/in first
            // setEditHeight(Math.round(editHeight) / 2.54);

        }
    }
        

    // render the screen
    return editFirstName !== "" ? <View style={styles.container}>
        <View style={[styles.overlay, {paddingTop: 50}]}>
            {/* <TouchableOpacity onPress={selectPhotoTapped}>
                <Image source={{uri: userPhoto}} style={styles.photo} />
            </TouchableOpacity> */}
            <View style={{ height: 200, marginBottom: 30 }}>
                <CarouselScreen data={editPictures} />
            </View>
            
            
            <View style={{ flexDirection: "row" }}>
                <Text style={styles.greeting}>Hi! {userInfo.firstName} {userInfo.lastName}</Text>
                <View style={{marginLeft: 10}}>
                    <TouchableOpacity style={{backgroundColor: 'gray',padding: 5, borderRadius: 5,}} onPress={handleWeightMetric}>
                        <Text style={styles.editButtonText}>{weightMetric}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{marginLeft: 10}}>
                    
                    <TouchableOpacity style={{backgroundColor: 'gray',padding: 5, borderRadius: 5,}} onPress={handleHeightMetric}>
                        <Text style={styles.editButtonText}>{heightMetric}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>

        <ScrollView>
            <View style={styles.overlay}>
                <ProfileSection title="About Me">
                    <Text style={styles.aboutMeText}>{userInfo.aboutMe}</Text>
                </ProfileSection>
                {/* <UserInfoRow label="About Me" value={userInfo.aboutMe} />
                <UserInfoRow label="Gender" value={userInfo.gender} />
                <UserInfoRow label="Major" value={userInfo.major} />
                <UserInfoRow label="Year" value={userInfo.year} />
                <UserInfoRow label="Weight" value={weightMetric === "lb" ? String(userInfo.weight) + " lb" : String(editWeightKg) + " kg"} />
                <UserInfoRow label="Height" value={heightMetric === "ft/in" ? inchesToFeetInches(userInfo.height) : String(editHeightCm) + " cm"} /> */}
                <ProfileSection title="Info">
                    <UserInfoGraphRow value={userInfo.gender} icon={<GenderIcon />} />
                    <UserInfoGraphRow value={userInfo.major} icon={<MajorIcon />} />
                    <UserInfoGraphRow value={userInfo.year} icon={<AgeIcon />} />
                    <UserInfoGraphRow value={weightMetric === "lb" ? String(userInfo.weight) + " lb" : String(editWeightKg) + " kg"} icon={<WeightIcon />} />
                    <UserInfoGraphRow value={heightMetric === "ft/in" ? inchesToFeetInches(userInfo.height) : String(editHeightCm) + " cm"} icon={<HeightIcon />} />
                </ProfileSection>
                

                <View style={{ flexDirection: "row", marginBottom: 15 }}>
                    <View style={{ justifyContent: "center" }}>
                        {/* <TouchableOpacity style={styles.editButton} onPress={() => setModalVisible(true)}>
                            <Text style={styles.editButtonText}>Edit</Text>
                        </TouchableOpacity> */}
                        <Button title="Edit" onPress={() => setModalVisible(true)} color="crimson" />
                    </View>

                    <View style={{ marginLeft: 15 }}>
                        {/* <TouchableOpacity style={styles.editButton} onPress={handleLoggedOut}>
                            <Text style={styles.editButtonText}>Logout</Text>
                        </TouchableOpacity> */}
                        <Button title="Logout" onPress={handleLoggedOut} color="gray" />
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
                                            <Text style={{fontWeight: 'bold', marginBottom: 5}}>{editTitles[index]}</Text>
                                            <RNPickerSelect
                                                onValueChange={(value) => editSetVals[index](value)}
                                                items={items}
                                                style={pickerSelectStyles}
                                                useNativeAndroidPickerStyle={false}
                                                value={val}
                                                placeholder={{ label: "Select", value: "" }}
                                            />
                                        </View>
                                    }

                                    else if (editTitles[index] === "Weight" || editTitles[index] === "Height") {
                                        // create items for drop down menus
                                        const items = options[index];

                                        return <View key={index} style={{ marginBottom: 20 }}>
                                            <Text style={{fontWeight: 'bold', marginBottom: 5}}>{editTitles[index]}</Text> 
                                            <RNPickerSelect
                                                // if it is for weight, check if weightMetric is "ib", if yes, call setEditWeigh, if not, call setEditWeightKg
                                                // if it is for height, check if heightMetric is "ft/in", if yes, call setEditHeight, if not, call setEditHeightCm
                                                onValueChange={editTitles[index] === "Weight" ? (weightMetric === "lb" ? editSetVals[index] : setEditWeightKg) : (heightMetric === "ft/in" ? editSetVals[index] : setEditHeightCm)}
                                                // if it is for weight, check if weightMetric is "ib", if yes, display values for lb
                                                // if it is for height, check if heightMetric is "ft/in", if yes, diesplay values for ft/in
                                                items={editTitles[index] === "Weight" ? (weightMetric === "lb" ? items[0] : items[1]) : heightMetric === "ft/in" ? items[0] : items[1]}
                                                style={pickerSelectStyles}
                                                useNativeAndroidPickerStyle={false}
                                                value={editTitles[index] === "Weight" ? (weightMetric === "lb" ? val : String(editWeightKg)) : (heightMetric === "ft/in" ? val : String(editHeightCm))}
                                                placeholder={{ label: "Select", value: "" }}
                                            />
                                                
                                            
                                        </View>
                                    }

                                    else if (editTitles[index] === "About Me") {
                                        return <View key={index} style={{ marginVertical: 20 }}>
                                            <Text style={{fontWeight: 'bold', marginBottom: 5}}>{editTitles[index]}</Text>
                                            <TextInput
                                                style={[styles.modalInput, {height: 100}]}
                                                onChangeText={editSetVals[index]}
                                                value={val}
                                                multiline
                                            />
                                        </View>
                                    }
                                    else {
                                        return <View key={index} style={{ marginBottom: 20 }}>
                                            <Text style={{fontWeight: 'bold', marginBottom: 5}}>{editTitles[index]}</Text>
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
        
    </View> : <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text>Loading...</Text>
    </View>


};

const styles = StyleSheet.create({
    // infoRowContainer: {
    //     flexDirection: 'row', // Align items in a row
    //     justifyContent: 'space-between', // Separate label and value
    //     backgroundColor: '#F7F7F7', // Light background for the row
    //     padding: 15, // Inner padding
    //     borderRadius: 8, // Rounded corners
    //     marginVertical: 5, // Margin between rows
    //     shadowColor: '#000', // Shadow color
    //     shadowOffset: { width: 0, height: 2 }, // Shadow position
    //     shadowOpacity: 0.1, // Shadow opacity
    //     shadowRadius: 4, // Shadow blur radius
    //     elevation: 2, // Elevation for Android
    // },
    // infoLabel: {
    //     fontSize: 16,
    //     color: '#333', // Dark color for text
    //     fontWeight: 'bold', // Bold font weight for the label
    //     flex: 1, // Take up 1/3 of the space
    // },
    // infoValue: {
    //     fontSize: 16,
    //     color: '#333', // Dark color for text
    //     flex: 2, // Take up 2/3 of the space
    //     textAlign: 'right', // Align value to the right
    // },
    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        // paddingTop: 50,
        backgroundColor: '#fff',
    },
    overlay: {
        // flexGrow: 1,
        justifyContent: 'center', // This centers content vertically in the screen
        alignItems: 'center', // This centers content horizontally in the screen
    },
    // content: {
    //     width: '90%', // May adjust based on how wide you want the form
    //     maxWidth: 600, // Ensures the form doesn't stretch too wide on large devices
    // },
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
    // infoRow: {
    //     marginTop: 20,
    //     paddingVertical: 8,
    // },
    // infoLabel: {
    //     fontSize: 20,
    //     color: 'gray',
    // },
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
        padding: 10,
        borderColor: 'gray',
        borderRadius: 4,
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    sectionContainer: {
        backgroundColor: '#F7F7F7',
        borderRadius: 8,
        padding: 15,
        marginHorizontal: 10, // This margin applies to both sides, making the content centered and consistent
        marginVertical: 10,
        alignSelf: 'stretch',
        flex: 1,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    aboutMeText: {
        fontSize: 16,
    },
    infoGraphRowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    graphIconContainer: {
        marginRight: 10,
        // Add styles for your icon container if needed
    },
  });

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        padding: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 16,
        padding: 10,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        paddingRight: 30, // to ensure the text is never behind the icon
    },
});


// const pickerSelectStylesMetrics = StyleSheet.create({
//     inputIOS: {
//         fontSize: 16,
//         paddingVertical: 5,
//         paddingHorizontal: 5,
//         borderWidth: 1,
//         borderColor: 'gray',
//         borderRadius: 4,
//         color: 'white',
//         backgroundColor: "red",
//         backgroundColor: "blue"
        
//     },
//     inputAndroid: {
//         fontSize: 16,
//         paddingHorizontal: 5,
//         paddingVertical: 5,
//         borderWidth: 0.5,
//         borderColor: 'purple',
//         borderRadius: 8,
//         color: 'white',
//         backgroundColor: "blue"
//     },
// });


export default ProfileScreen;
