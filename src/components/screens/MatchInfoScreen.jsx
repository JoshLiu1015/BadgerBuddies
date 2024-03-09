import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import RNPickerSelect from 'react-native-picker-select';



function MatchInfoScreen(props) {


    const [exercise, setExercise] = useState("");
    const [time, setTime] = useState("");
    const [location, setLocation] = useState("");
    const [partnerLevel, setPartnerLevel] = useState("");
    const [partnerGender, setPartnerGender] = useState("");
    const [exerciseDetails, setExerciseDetails] = useState("");

    const preferenceTitles = ["Exercies", "Time", "Location", "Partner Level", "Partner Gender", "Exercise Details"];
    const preferenceVals = [exercise, time, location, partnerLevel, partnerGender, exerciseDetails];
    const preferenceSetVals = [setExercise, setTime, setLocation, setPartnerLevel, setPartnerGender, setExerciseDetails];

    // const [openDropdown, setOpenDropdown] = useState(null);

    const options = [[{label: "Basketball", value: "Basketball"}, {label: "Badminton", value: "Badminton"}, 
        {label: "Boxing", value: "Boxing"}, {label: "Cycling", value: "Cycling"},
        {label: "Dancing", value: "Dancing"}, {label: "Running", value: "Running"},
        {label: "Soccer", value: "Soccer"}, {label: "Workout", value: "Workout"},
        {label: "Other", value: "Other"}], 
        [""], [{label: "Nic", value: "Nic"}, {label: "Bakke", value: "Bakke"}, {label: "Other", value: "Other"}],
        [{label: "Beginner", value: "Beginner"}, {label: "Intermediate", value: "Intermediate"},
        {label: "Advanced", value: "Advancced"}, {label: "Other", value: "Other"}], 
        [{label: "Male", value: "Male"}, {label: "Female", value: "Female"},
        {label: "Other", value: "Other"}], [{label: "Chest", value: "Chest"},
        {label: "Legs", value: "Legs"}, {label: "Back", value: "Back"},
        {label: "Arms", value: "Arms"}, {label: "Abs", value: "Abs"}]];
    
    // const toggleDropdown = (dropdownIndex) => {
    //     setOpenDropdown(openDropdown === dropdownIndex ? null : dropdownIndex);
    //     };
    


    return <View style={styles.container}>
        <ScrollView>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.overlay}>
                    <View style={styles.content}>
                        <Text style={styles.title}>Partner Preference</Text>
                        {/* {preferenceVals.map((val, i) => {
                            return <View key={i}>
                            <Text style={{fontWeight: 'bold', marginBottom: 10}}>{preferenceTitles[i]}</Text>
                            <View style={styles.input}>
                                {val !== "" && <Text>Selected: {val}</Text>}
                            </View>
                            <Picker
                                selectedValue={val}
                                onValueChange={preferenceSetVals[i]}
                                style={styles.input}>
                                {options[i].map((option, index) => (
                                    <Picker.Item key={index} label={option} value={option} />
                                ))}
                            </Picker>

                        </View>
                        })} */}
                        {preferenceTitles.map((title, index) => {
                            // Assuming each preference has its own state and setter function
                            // const [open, setOpen] = useState(false);
                            // const [value, setValue] = useState(null);
                            const [items, setItems] = useState(options[index]);

                            return (
                            <View key={index} style={{ marginBottom: 20 }}>
                                <Text style={{fontWeight: 'bold', marginBottom: 10}}>{title}</Text>
                                {/* <DropDownPicker
                                open={openDropdown === index}
                                value={value}
                                items={items}
                                setOpen={() => toggleDropdown(index)}
                                setValue={setValue}
                                setItems={setItems}
                                style={{ borderWidth: 1, backgroundColor: 'white' }} // Ensure background color is set
                                dropDownContainerStyle={{ borderWidth: 1, backgroundColor: 'white', zIndex: 10000 }} // Ensure background color is set
                                modal={true}

                                /> */}
                                <RNPickerSelect
                                    onValueChange={(value) => preferenceSetVals[index](value)}
                                    items={items}
                                    style={pickerSelectStyles}
                                    useNativeAndroidPickerStyle={false}
                                    placeholder={{ label: "Select", value: null }}
                                />
                            </View>
                            );
                        })}
                    </View>
                    
                    
                    

                    {/* TODO: Handle the cases when email, names, majors, weight, height too long */}
                    {/* <View style={{ borderWidth: 1, marginBottom: 15,  marginHorizontal: 115 }}>
                        <Button color="crimson" title="Submit" onPress={() => {
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
                            preferenceVals.forEach(element => {
                                alert(element);
                            });
                        }} />

                        
                    </View> */}
                        

                        
                    <TouchableOpacity style={styles.editButton} onPress={() => {
                        preferenceVals.forEach(element => {
                            alert(element);
                        });
                    }}>
                        <Text style={styles.editButtonText}>Submit</Text>
                    </TouchableOpacity>

                    {/* <View style={{ borderWidth: 1, margin: 15,  marginHorizontal: 115 }}>
                        <Button color="grey" title="Go back" onPress={() => {
                            props.setIsRegistered(false);
                        }} />
                    </View> */}
                </View>
            </TouchableWithoutFeedback>
        </ScrollView>
    </View>

        
};
    
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        justifyContent: 'flex-start',
        // paddingTop: 50,
        backgroundColor: '#fff',
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
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    input: {
        borderWidth: 1,
        height: 40,
        marginBottom: 10,
        padding: 10
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

export default MatchInfoScreen;