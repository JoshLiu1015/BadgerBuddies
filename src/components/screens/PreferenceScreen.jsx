import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useState, useContext, useEffect } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import BadgerBuddiesContext from '../../../contexts/BadgerBuddiesContext';
import * as SecureStore from 'expo-secure-store';


function PreferenceScreen(props) {


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

    const [preferenceInfo, setPreferenceInfo] = useState({});

    const preferenceInfoArray = [preferenceInfo.exercise, preferenceInfo.time, preferenceInfo.location, 
        preferenceInfo.userLevel, preferenceInfo.partnerLevel, preferenceInfo.partnerGender, preferenceInfo.exerciseDetails];

    const preferenceTitles = ["Exercies", "Time", "Location", "Your Level", "Partner Level", "Partner Gender", "Exercise Details"];
    const editVals = [exercise, date, location, userLevel, partnerLevel, partnerGender, exerciseDetails];
    const setEditVals = [setExercise, null, setLocation, setUserLevel, setPartnerLevel, setPartnerGender, setExerciseDetails];


    const [setIsLoggedIn, userId, secureStoreEmail, preferenceId, setPreferenceId] = useContext(BadgerBuddiesContext);

    const bodyTitles = ["exercise", "time", "location", "userLevel", "partnerLevel", "partnerGender", "exerciseDetails"];
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
        [{label: "Nic", value: "nicholas"}, {label: "Bakke", value: "bakke"}, {label: "Any", value: "any"}],
        [{label: "Beginner", value: "beginner"}, {label: "Intermediate", value: "intermediate"},
        {label: "Advanced", value: "advancced"}, {label: "Other", value: "other"}],
        [{label: "Beginner", value: "beginner"}, {label: "Intermediate", value: "intermediate"},
        {label: "Advanced", value: "advancced"}, {label: "Other", value: "other"}], 
        [{label: "Male", value: "male"}, {label: "Female", value: "female"},
        {label: "Other", value: "other"}], [{label: "Chest", value: "chest"},
        {label: "Legs", value: "legs"}, {label: "Back", value: "back"},
        {label: "Arms", value: "arms"}, {label: "Abs", value: "abs"}]];
    
    
    // fetch the user's preference
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = await SecureStore.getItemAsync(secureStoreEmail);

                const res = await fetch(`http://192.168.2.91:3000/preference/userId/${userId}`, {
                //const res = await fetch(`http://192.168.1.168:3000/preference/userId/${userId}`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    }
                });

                if (res.status == 200) {
                    // alert("Successfully fetched the preference");

                    const json = await res.json();
                    if (json && json.Preference) {
                        setPreferenceInfo(json.Preference);
                        // alert(JSON.stringify(json.Preference));
                        // setIsUpdated(false);


                        // set preference id so it will be updated in useContext
                        // then when gender is altered in ProfileScreen, 
                        // we can use preference id to patch the row
                        setPreferenceId(json.Preference.id);
                        
                        setExercise(json.Preference.exercise);
                        setDate(new Date(json.Preference.time));
                        setLocation(json.Preference.location);
                        setUserLevel(json.Preference.userLevel);
                        setPartnerLevel(json.Preference.partnerLevel);
                        setPartnerGender(json.Preference.partnerGender);
                        setExerciseDetails(json.Preference.exerciseDetails);

                    } else {
                        alert("Failed to fetch the preference");
                    }
                }
                

            } catch (error) {
                console.error("Error during matching: ", error);
            }
        }
        fetchUser();
    }, [userId])



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


    const handleSave = async () => {
        try {
            let body = {};

            // loop through every values in the screen
            editVals.forEach((val, i) => {
                // if it is time
                if (typeof val === 'object') {
                    val = handleTime(val);
                }
                // if the data is different from last time it was fetched
                if (val !== preferenceInfoArray[i]) {
                    // create a new json body containing all changes
                    body[bodyTitles[i]] = val;
                }
            })
            // alert(secureStoreEmail);
            const token = await SecureStore.getItemAsync(secureStoreEmail);
            
            const res = await fetch(`http://192.168.2.91:3000/preference/preferenceId/${preferenceInfo.id}`, {
            //const res = await fetch(`http://192.168.1.168:3000/preference/preferenceId/${preferenceInfo.id}`, {
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
                                        onValueChange={(value) => setEditVals[index](value)}
                                        items={items}
                                        style={pickerSelectStyles}
                                        useNativeAndroidPickerStyle={false}
                                        value={editVals[index]}
                                        placeholder={{ label: "Select", value: "" }}
                                    />
                                </View>;
                            }
                            
                        })}
                    </View>
                    

                    <View style={{ borderWidth: 1, margin: 15,  marginHorizontal: 80 }}>
                        <TouchableOpacity style={styles.editButton} onPress={() => {
                            let isEmpty = false;

                            for (const [index, element] of editVals.entries()) {
                                if (typeof element === 'object') {
                                    time = handleTime();
                                }
                                else {
                                    if (element === "") {

                                        alert("Please select a value for " + preferenceTitles[index]);
                                        isEmpty = true;
                                        break;
                                    }
                                }
                            }

                            
                            if (!isEmpty) {
                                try {
                                    handleSave();
                                } catch (error) {
                                    console.error("Error during saving info: ", error);
                                }

                                
                            }

                        }}>
                            <Text style={styles.editButtonText}>Save</Text>
                        </TouchableOpacity>
                    </View>

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
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 30,
        marginTop: 50
    },
    input: {
        borderWidth: 1,
        height: 40,
        marginBottom: 10,
        padding: 10
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

export default PreferenceScreen;