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
                <View style={{flex: 1}}>

            {/* <Text style={styles.header}>Create Account</Text> */}
                        {/* <TouchableOpacity style={styles.imageUpload}>
                            <Image 
                            // source={{ uri: 'path_to_default_image' }} 
                            style={styles.image} 
                            />
                            <Text>Upload Image</Text>

                        </TouchableOpacity>


                        <View style={styles.container}>      
                        {titles.map((title, index) => {
                            if (title === "Gender" || title === "Grade") {

                                const [items, setItems] = useState(options[index]);

                                return <View key={index}>
                                    <Text style={{fontWeight: 'bold', marginBottom: 10}}>{title}</Text>
                                    <RNPickerSelect
                                        onValueChange={(value) => setVals[index](value)}
                                        items={items}
                                        style={styles.input}
                                        useNativeAndroidPickerStyle={false}
                                        placeholder={{ label: "Select", value: null }}
                                    />
                                </View>
                            }
                            else {
                                return <View key={index}>
                                    <Text style={{fontWeight: 'bold', marginBottom: 10}}>{title}</Text>
                                    <TextInput
                                        placeholder={title}
                                        style={styles.input}
                                        onChangeText={setVals[index]}
                                        value={vals[index]}
                                    />
                                </View>
                            }
                        })}
                        </View> */}
                        
                    <TouchableOpacity style={styles.imageUpload}>
                        <Image 
                        // source={{ uri: 'path_to_default_image' }} 
                        style={styles.image} 
                        />
                        <Text>Upload Image</Text>

                    </TouchableOpacity>
                        <View style={styles.container}>
                            <TextInput
                                placeholder='Email'
                                style={styles.input}
                                onChangeText={setEmail}
                                value={email}
                            />
                            <TextInput
                                placeholder='Password'
                                style={styles.input}
                                onChangeText={setPassword}
                                value={password}
                                secureTextEntry={true}
                            />
                            <TextInput
                                placeholder='Confirm Password'
                                style={styles.input}
                                onChangeText={setConfirmPassword}
                                value={confirmPassword}
                                secureTextEntry={true}
                            />
                            <TextInput
                                placeholder="First Name"
                                style={styles.input}
                                onChangeText={setFirstName}
                                value={firstName}
                            />
                            <TextInput
                                placeholder="Last Name"
                                style={styles.input}
                                onChangeText={setLastName}
                                value={lastName}
                            />
                            <TextInput
                                placeholder="Gender"
                                style={styles.input}
                                onChangeText={setGender}
                                value={gender}
                            />
                            <TextInput
                                placeholder="Major"
                                style={styles.input}
                                onChangeText={setMajor}
                                value={major}
                            />
                            <TextInput
                                placeholder="Grade"
                                style={styles.input}
                                onChangeText={setGrade}
                                value={grade}
                            />
                            <TextInput
                                placeholder="Weight"
                                style={styles.input}
                                onChangeText={setWeight}
                                value={weight}
                            />
                            <TextInput
                                placeholder="Height"
                                style={styles.input}
                                onChangeText={setHeight}
                                value={height}
                            />
                            
                        </View>
                        
                        {/* <View style={{borderWidth: 1, margin: 15, marginHorizontal: 115}}>
                            <Button title="Create Account" onPress={goToBadgerTabs} />
                        </View> */}
                        

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
                                else if (gender === "")
                                    alert("Please enter your gender")
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

                            {/* <Button color="crimson" title="Next" onPress={() => {
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
                                else if (gender === "")
                                    alert("Please enter your gender")
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

                            }} />
                        </View> */}

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
        alignItems: 'center',
        justifyContent: 'center',
    },
    overlay: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    content: {
        paddingTop: 50,
        backgroundColor: 'white',
        padding: 20,
        width: '80%',
        elevation: 5,
    },
    // header: {
    //     fontSize: 24,
    //     fontWeight: 'bold',
    //     marginBottom: 20,
    //     marginTop: 20,
    // },
    imageUpload: {
        alignItems: 'center',
        marginBottom: 20,
    },
    image: {
        flex: 1,
        width: 100,
        height: 100,
        marginBottom: 10,
    },
    input: {
        height: 40,
        width: 200,
        margin: 15,
        borderWidth: 1,
        padding: 10,
    },
    editButton: {
        // marginTop: 20,
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
    },
    editButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default PersonalInfoScreen;



