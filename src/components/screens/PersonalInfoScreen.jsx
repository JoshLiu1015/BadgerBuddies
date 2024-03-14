import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { useState, useContext } from 'react';
import BadgerBuddiesContext from '../../../contexts/BadgerBuddiesContext';
import RNPickerSelect from 'react-native-picker-select';





function PersonalInfoScreen(props) {

    // const navigation = useNavigation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gender, setGender] = useState("");
    const [major, setMajor] = useState("");
    const [grade, setGrade] = useState("");
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [picture, setPicture] = useState("this is a picture url");

    const titles = ["Email", "Password", "Confirm Password", "First Name", "Last Name", "Gender", "Major", "Grade", "Weight", "Height"];
    const vals = [email, password, confirmPassword, firstName, lastName, gender, major, grade, weight, height];
    const setVals = [setEmail, setPassword, setConfirmPassword, setFirstName, setLastName, setGender, setMajor, setGrade, setWeight, setHeight];

    const options = [null, null, null, null, null, 
    [{label: "Male", value: "male"}, {label: "Female", value: "female"},
    {label: "Other", value: "other"}], null, [{label: "Freshman", value: "freshman"},
    {label: "Sophomore", value: "sophomore"}, {label: "Junior", value: "junior"},
    {label: "Senior", value: "senior"}, {label: "Graduate", value: "graduate"}, 
    {label: "PHD", value: "phd"}, {label: "Other", value: "other"}], null, null];
    
    const navigation = useNavigation();

    const [setIsRegistered] = useContext(BadgerBuddiesContext);


    return <View style={styles.container}>
        <ScrollView>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.overlay}>
                    <View style={styles.content}>
                        <TouchableOpacity style={styles.imageUpload}>
                            <Image 
                            // source={{ uri: 'path_to_default_image' }} 
                            style={styles.image} 
                            />
                            <Text>Upload Image</Text>

                        </TouchableOpacity>


                        <View style={styles.container}>      
                        {titles.map((title, index) => {
                            if (title === "Gender" || title === "Grade") {

                                // create items for drop down menus
                                const items = options[index];

                                return <View key={index} style={{ marginBottom: 20 }}>
                                    <Text style={{fontWeight: 'bold', marginBottom: 10}}>{title}</Text>
                                    <RNPickerSelect
                                        onValueChange={(value) => setVals[index](value)}
                                        items={items}
                                        style={pickerSelectStyles}
                                        useNativeAndroidPickerStyle={false}
                                        value={vals[index]}
                                        placeholder={{ label: "Select", value: "" }}
                                    />
                                </View>
                            }
                            else if (title === "Password" || title === "Confirm Password") {
                                return <View key={index} style={{ marginBottom: 20 }}>
                                    <Text style={{fontWeight: 'bold', marginBottom: 10}}>{title}</Text>
                                    <TextInput
                                        style={styles.input}
                                        onChangeText={setVals[index]}
                                        value={vals[index]}
                                        secureTextEntry={true}
                                    />
                                </View>
                            }
                            else {
                                return <View key={index} style={{ marginBottom: 20 }}>
                                    <Text style={{fontWeight: 'bold', marginBottom: 10}}>{title}</Text>
                                    <TextInput
                                        // placeholder={title}
                                        style={styles.input}
                                        onChangeText={setVals[index]}
                                        value={vals[index]}
                                    />
                                </View>
                            }
                        })}
                        </View>
                    </View>    
                        
                       

                    {/* TODO: Handle the cases when email, names, majors, weight, height too long */}
                    <View style={{ borderWidth: 1, margin: 15,  marginHorizontal: 80 }}>
                        <TouchableOpacity style={styles.editButton} onPress={() => {

                            if (email === "" || email.length > 240)
                            alert("Please enter a valid email address.");
                            else if (password === "" || password.length < 8 || password.length > 128)
                                alert("The password must be between 8 and 128 characters.");
                            else if (confirmPassword === "")
                                alert("Please enter your confirm password")
                            else if (password !== confirmPassword)
                                alert("Passwords do not match")
                            else if (firstName === "" || firstName.length > 100)
                                alert("Please enter a valid first name")
                            // last name can be null
                            else if (lastName.length > 100)
                                alert("Please enter a valid last name")
                            else if (gender === "") {
                                alert("Please enter your gender")
                            }
                            else if (major === "")
                                alert("Please enter your major")
                            else if (grade === "")
                                alert("Please enter your grade")
                            // else if (weight === "")
                            //     alert("Please enter your weight")
                            else if (weight !== "" && (isNaN(parseInt(weight, 10)) || parseInt(weight, 10) > 1000))
                                alert("Please enter a valid number for your weight")
                            // else if (height === "")
                            //     alert("Please enter your height")
                            else if (height !== "" && (isNaN(parseInt(height, 10)) || parseInt(height, 10) > 1000))
                                alert("Please enter a valid number for your height")
                            else{
                                navigation.push("Preferences", {email: email, password: password, firstName: firstName, lastName: lastName, 
                                gender: gender, major: major, grade: grade, weight: weight, height: height, picture: picture});
                                // props.onScreenChange('BadgerTabs');

                                // props.handleSignup(email, password, firstName, lastName, gender, major, grade, weight, height, picture);

                            }
                        }}>
                            <Text style={styles.editButtonText}>Next</Text>
                        </TouchableOpacity>
                    </View>



                    <View style={{ borderWidth: 1, margin: 15,  marginHorizontal: 80 }}>

                        <Button color="grey" title="Go back" onPress={() => {
                            setIsRegistered(false);
                        }} />
                    </View>
                        
                </View>
            </TouchableWithoutFeedback>
        </ScrollView>
    </View>
};
    
const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    imageUpload: {
        alignItems: 'center',
        marginBottom: 20,
    },
    image: {
        width: 100, // Adjust as needed
        height: 100, // Adjust as needed
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        // borderColor: '#ddd',
        borderRadius: 5,
        padding: 15,
        // marginBottom: 20,
        width: '100%', // Inputs take full width
    },
    editButton: {
        backgroundColor: 'blue',
        padding: 15,
        borderRadius: 0,
        alignItems: 'center', // Text inside button is centered
        marginBottom: 0,
    },
    editButtonText: {
        color: 'white',
        fontWeight: 'bold',
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


export default PersonalInfoScreen;



