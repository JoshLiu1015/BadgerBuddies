import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { useState } from 'react';





function PersonalInfoScreen(props) {

    const navigation = useNavigation();

    const [email, setEmail] = useState("");
    const [passwordVal, setPasswordVal] = useState("");
    const [confirmPasswordVal, setConfirmPasswordVal] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gender, setGender] = useState("");
    const [major, setMajor] = useState("");
    const [grade, setGrade] = useState("");
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [picture, setPicture] = useState("this is a picture url");
    
    

    // function goToBadgerTabs() {
    //     props.onScreenChange('BadgerTabs');
    // };

    return <View style={{flex: 1}}>
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
                    onChangeText={setPasswordVal}
                    value={passwordVal}
                    secureTextEntry={true}
                />
                <TextInput
                    placeholder='Confirm Password'
                    style={styles.input}
                    onChangeText={setConfirmPasswordVal}
                    value={confirmPasswordVal}
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
            
            <View style={{ borderWidth: 1, margin: 15,  marginHorizontal: 115 }}>
                <Button color="crimson" title="Create account" onPress={() => {
                    if (email === "")
                        alert("Please enter an email");
                    else if (passwordVal === "")
                        alert("Please enter a password");
                    else if (confirmPasswordVal === "")
                        alert("Please enter a confirm password")
                    else if (passwordVal !== confirmPasswordVal)
                        alert("Passwords do not match")
                    else{
                        props.onScreenChange('BadgerTabs');

                    }

                }} />
            </View>

            <View style={{ borderWidth: 1, margin: 15,  marginHorizontal: 115 }}>
                <Button color="grey" title="Go back" onPress={() => {
                    props.setIsRegistered(false);
                }} />
            </View>
            
        </ScrollView>

        
    </View>;
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



