import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { useState } from 'react';





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
    
    
//     // signup function that is called in BadgerRegisterScreen
//   const handleSignup = async (email, password, firstName, lastName, gender, major, grade, weight, height, picture) => {
//     try {
//         const res = await fetch("localhost:3000/user", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({
//                 "email": email + "@wisc.edu",
//                 "password": password,
//                 "firstName": firstName,
//                 "lastName": lastName,
//                 "gender": gender,
//                 "major": major,
//                 "grade": grade,
//                 "weight": parseFloat(weight, 2),
//                 "height": parseFloat(height, 2),
//                 "picture": picture
//             })
//         })

//         if (res.status === 400) {
//             alert("A request must contain a 'username' and 'password'");
//         }
//         else if (res.status === 409) {
//             alert("That username has already been taken!");
//         }
//         else if (res.status === 413) {
//             alert("'username' must be 64 characters or fewer and 'password' must be 128 characters or fewer")
//         }
//         else if (res.status == 200) {
//             alert("Your registration was successful");
//             props.onScreenChange('BadgerTabs');
//             const json = await res.json();

//             if (json) {
//                 await SecureStore.setItemAsync(json.user.username, json.token).then(() => {
//                 setUsername(json.user.username);
//                 })
//             }
//         }
//     } catch (error) {
//         console.error("Error during signup: ", error);
//     }
    
//   }

    // function goToBadgerTabs() {
    //     props.onScreenChange('BadgerTabs');
    // };

    return <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={{flex: 1}}>
            {/* <Text style={styles.header}>Create Account</Text> */}
            <ScrollView>
                
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
                <View style={{ borderWidth: 1, margin: 15,  marginHorizontal: 115 }}>
                    <Button color="crimson" title="Create account" onPress={() => {
                        if (email === "")
                            alert("Please enter your email");
                        else if (password === "")
                            alert("Please enter your password");
                        else if (confirmPassword === "")
                            alert("Please enter your confirm password")
                        else if (password !== confirmPassword)
                            alert("Passwords do not match")
                        else if (firstName === "")
                            alert("Please enter your first name")
                        else if (lastName === "")
                            alert("Please enter your last name")
                        else if (gender === "")
                            alert("Please enter your gender")
                        else if (major === "")
                            alert("Please enter your major")
                        else if (grade === "")
                            alert("Please enter your grade")
                        else if (weight === "")
                            alert("Please enter your weight")
                        else if (parseFloat(weight, 2) === NaN)
                            alert("Please enter a valid number for your weight")
                        else if (height === "")
                            alert("Please enter your height")
                        else if (parseFloat(height, 2) === NaN)
                            alert("Please enter a valid number for your height")
                        else{
                            // props.onScreenChange('BadgerTabs');
                            props.handleSignup(email, password, firstName, lastName, gender, major, grade, weight, height, picture);

                        }

                    }} />
                </View>

                <View style={{ borderWidth: 1, margin: 15,  marginHorizontal: 115 }}>
                    <Button color="grey" title="Go back" onPress={() => {
                        props.setIsRegistered(false);
                    }} />
                </View>
                
            </ScrollView>

        
        </View>
    </TouchableWithoutFeedback>;
};
    
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
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
});

export default PersonalInfoScreen;



