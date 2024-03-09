import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useState, useContext } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import BadgerBuddiesContext from '../../../contexts/BadgerBuddiesContext';
import * as SecureStore from 'expo-secure-store';


function MatchInfoScreen(props) {


    const [exercise, setExercise] = useState("");
    // time is only assigned value when calling handleTime upon clikcin submit button
    let time = "";
    // date is used to handle the drop down menu
    const [date, setDate] = useState(new Date());
    const [location, setLocation] = useState("");
    const [userLevel, setUserLevel] = useState("");
    const [partnerLevel, setPartnerLevel] = useState("");
    const [partnerGender, setPartnerGender] = useState("");
    const [exerciseDetails, setExerciseDetails] = useState("");

    const preferenceTitles = ["Exercies", "Time", "Location", "Your Level", "Partner Level", "Partner Gender", "Exercise Details"];
    const preferenceVals = [exercise, date, location, userLevel, partnerLevel, partnerGender, exerciseDetails];
    const preferenceSetVals = [setExercise, null, setLocation, setUserLevel, setPartnerLevel, setPartnerGender, setExerciseDetails];


    const [_, userId, secureStoreEmail, userGender] = useContext(BadgerBuddiesContext);
    /*
    Label: This is what the user sees in the UI. It's the human-readable text that makes sense to the users selecting an option.
    The label is typically a string that describes the choice.

    Value: This is the actual data value that the system uses. When a user selects an option, 
    this is the value that you'll typically use in your code or send to a server or database. While often a string, 
    the value doesn't have to be; it can be any type that your application logic is designed to work with, such as numbers, objects, etc.
    */
    
    const options = [[{label: "Basketball", value: "basketball"}, {label: "Badminton", value: "badminton"}, 
        {label: "Boxing", value: "boxing"}, {label: "Cycling", value: "cycling"},
        {label: "Dancing", value: "dancing"}, {label: "Running", value: "running"},
        {label: "Soccer", value: "soccer"}, {label: "Workout", value: "workout"},
        {label: "Other", value: "other"}], null,
        [{label: "Nic", value: "nicholas"}, {label: "Bakke", value: "bakke"}, {label: "Other", value: "other"}],
        [{label: "Beginner", value: "beginner"}, {label: "Intermediate", value: "intermediate"},
        {label: "Advanced", value: "advancced"}, {label: "Other", value: "other"}],
        [{label: "Beginner", value: "beginner"}, {label: "Intermediate", value: "intermediate"},
        {label: "Advanced", value: "advancced"}, {label: "Other", value: "other"}], 
        [{label: "Male", value: "male"}, {label: "Female", value: "female"},
        {label: "Other", value: "other"}], [{label: "Chest", value: "chest"},
        {label: "Legs", value: "legs"}, {label: "Back", value: "back"},
        {label: "Arms", value: "arms"}, {label: "Abs", value: "abs"}]];
    
    
    
    // called when users select a date from the drop down menu 
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
    };

    // When submitting the form, you can format the `date` state to a string
    // that's compatible with MySQL DATETIME type like so:
    const handleTime = () => {

        const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
        
        // Use formattedDate to send to your backend or store in the state
        return formattedDate;
    };


    const handleSubmit = async () => {
        try {
            // alert(secureStoreEmail);
            const token = await SecureStore.getItemAsync(secureStoreEmail);
            
            const res = await fetch(`http://192.168.1.168:3000/preference`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "userId": userId,
                    "exercise": exercise,
                    "time": time,
                    "location": location,
                    "userLevel": userLevel,
                    "partnerLevel": partnerLevel,
                    "userGender": userGender,
                    "partnerGender": partnerGender,
                    "exerciseDetails": exerciseDetails
                })
            })
            
            

            if (res.status == 200) {
                alert("Your preferences were saved");
            }
        } catch (error) {
            console.error("Error during saving preferences: ", error);
        }
    }


    return <View style={styles.container}>
        <ScrollView>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.overlay}>
                    <View style={styles.content}>
                        <Text style={styles.title}>Preferences</Text>
                        {preferenceTitles.map((title, index) => {
                            if (title === "Time") {

                                return <View key={index} style={{ marginBottom: 20 }}>
                                    <Text style={{fontWeight: 'bold', marginBottom: 10}}>{title}</Text>
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        value={date}
                                        mode="datetime"
                                        is24Hour={true}
                                        display="default"
                                        onChange={onChange}
                                    />
                                </View>

                            }
                            else {
                                // Assuming each preference has its own state and setter function
                                // const [open, setOpen] = useState(false);
                                // const [value, setValue] = useState(null);
                                const [items, setItems] = useState(options[index]);

                                return <View key={index} style={{ marginBottom: 20 }}>
                                    <Text style={{fontWeight: 'bold', marginBottom: 10}}>{title}</Text>
                                    <RNPickerSelect
                                        onValueChange={(value) => preferenceSetVals[index](value)}
                                        items={items}
                                        style={pickerSelectStyles}
                                        useNativeAndroidPickerStyle={false}
                                        placeholder={{ label: "Select", value: null }}
                                    />
                                </View>;
                            }
                            
                        })}
                    </View>
                    


                    <TouchableOpacity style={styles.editButton} onPress={() => {
                        let isEmpty = false;

                        preferenceVals.forEach((element, index) => {
                            if (typeof element === 'object') {
                                time = handleTime();
                            }
                            else {
                                if (element === "") {

                                    alert("Please select a value for " + preferenceTitles[index]);
                                    isEmpty = true;
                                }
                            }
                        });
                        
                        // onlyl submitt user preferences when everything is selected
                        if (!isEmpty) {
                            handleSubmit();
                        }

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