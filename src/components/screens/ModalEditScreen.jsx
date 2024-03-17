// import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, ScrollView, Modal, Button, TouchableWithoutFeedback, Keyboard, Dimensions } from 'react-native';
// import { useState, useEffect, useContext, React } from 'react';
// import BadgerBuddiesContext from '../../../contexts/BadgerBuddiesContext';
// import * as SecureStore from 'expo-secure-store';
// import RNPickerSelect from 'react-native-picker-select';
// import * as ImagePicker from 'expo-image-picker';
// import CarouselScreen from './CarouselScreen';



// const ModalEditScreen = (props) => {

//     const [modalVisible, setModalVisible] = useState(false);


//     const selectPhotoAdd = async (index) => {
//         try {
//             // You may need to ask for permissions before opening the image picker
//             const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        
//             if (permissionResult.granted === false) {
//                 alert("You've refused to allow this app to access your photos!");
//                 return;
//             }
        
//             const result = await ImagePicker.launchImageLibraryAsync({
//                 mediaTypes: ImagePicker.MediaTypeOptions.All,
//                 allowsEditing: true,
//                 aspect: [4, 3],
//                 quality: 1,
//             });
        
//             if (!result.canceled) {
//                 // alert(result.assets[0].uri)
//                 props.setEditPictures(oldArray => {
//                     const newArray = [...oldArray];
//                     newArray[index] = { uri: result.assets[0].uri };
//                     return newArray;
//                 });
//             }
//         } catch(error) {
//             alert(error);
//         }
        
//     };

//     const selectPhotoDelete = async (index) => {
//         props.setEditPictures(oldArray => {
//             const newArray = [...oldArray];
//             newArray[index] = null;
//             return newArray;
//         });
//     }


    




//     return <Modal transparent={true} visible={modalVisible} animationType="slide" >

//         <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
//             <ScrollView>
//                 {/* modalOverlay creates the gray area beneath */}
//                 <View style={styles.modalOverlay}>
//                     {/* modalContent is the white area above */}
//                     <View style={styles.modalContent}>
//                         <Text style={styles.modalTitle}>Edit Profile</Text>

//                         <Text style={{fontWeight: 'bold', marginBottom: 10}}>Pictures</Text>
//                         {/* flexWrap is used to prevent placeholders overflow */}
//                         <View style={{ justifyContent: 'center', flexDirection: "row", flexWrap: 'wrap' }}>
                            
//                         {props.editPictures.map((picture, index) => (
//                                 // this is the View for each placeholder
//                                 <View key={index} style={{ margin: 12, width: 120, height: 120, justifyContent: 'center', alignItems: 'center' }}>
                                
//                                 {picture === null ? <>
//                                 {/* display empty placeholders if element is null */}
//                                     <View style={{ width: '100%', height: '100%', backgroundColor: '#eaeaea', justifyContent: 'center', alignItems: 'center' }}>
//                                         <Text style={{ color: 'black' }}>Empty</Text>
//                                     </View>
//                                     <View style={{ justifyContent: 'center', flexDirection: "row", flexWrap: 'wrap' }}>
//                                         <TouchableOpacity onPress={() => selectPhotoAdd(index)}>
//                                             <Text style={{ color: 'blue' }}>Add Photo</Text>
//                                         </TouchableOpacity>
//                                         <TouchableOpacity onPress={() => selectPhotoDelete(index)}>
//                                             <Text style={{ color: 'blue', marginLeft: 10 }}>Delete</Text>
//                                         </TouchableOpacity>
//                                     </View>

//                                 </>
                                
//                                 :
//                                 // if any elemeent in the array isn't null, render the photo
//                                 <>
//                                     <View key={index} style={{ margin: 0 }}>
//                                         <Image source={picture} style={{ width: 110, height: 110 }} />
//                                     </View>
//                                     {/* pass index to selectPhotoTapped, so the function knows which placeholder it will replace
//                                     by using the index to assign a new value in the images array */}
//                                     <View style={{ justifyContent: 'center', flexDirection: "row", flexWrap: 'wrap' }}>
//                                         <TouchableOpacity onPress={() => selectPhotoAdd(index)}>
//                                             <Text style={{ color: 'blue' }}>Add Photo</Text>
//                                         </TouchableOpacity>
//                                         <TouchableOpacity onPress={() => selectPhotoDelete(index)}>
//                                             <Text style={{ color: 'blue', marginLeft: 10 }}>Delete</Text>
//                                         </TouchableOpacity>
//                                     </View>
//                                 </>
//                                 }
//                                 </View>
                                
//                             ))}
                            
//                         </View>

//                         {props.editVals.map((val, index) => {
//                             // convert the values of weight and height to String
//                             // since we should put String in TextInput instead of numbers
//                             if (typeof val === 'number') {

//                                 val = String(val);
//                             }

//                             if (props.editTitles[index] === "Gender" || props.editTitles[index] === "Year") {
//                                 // create items for drop down menus
//                                 const items = props.options[index];

//                                 return <View key={index} style={{ marginBottom: 20 }}>
//                                     <Text style={{fontWeight: 'bold', marginBottom: 10}}>{props.editTitles[index]}</Text>
//                                     <RNPickerSelect
//                                         onValueChange={(value) => props.editSetVals[index](value)}
//                                         items={items}
//                                         style={pickerSelectStyles}
//                                         useNativeAndroidPickerStyle={false}
//                                         // if val is null, change it to ""
//                                         value={val}
//                                         placeholder={{ label: "Select", value: "" }}
//                                     />
//                                 </View>
//                             }

//                             else if (props.editTitles[index] === "About Me") {
//                                 return <View key={index}>
//                                     <Text style={{fontWeight: 'bold', marginBottom: 10}}>{props.editTitles[index]}</Text>
//                                     <TextInput
//                                         style={[styles.modalInput, {height: 100}]}
//                                         onChangeText={props.editSetVals[index]}
//                                         value={val}
//                                         multiline
//                                     />
//                                 </View>
//                             }
//                             else {
//                                 return <View key={index}>
//                                     <Text style={{fontWeight: 'bold', marginBottom: 10}}>{props.editTitles[index]}</Text>
//                                     <TextInput
//                                         style={styles.modalInput}
//                                         onChangeText={props.editSetVals[index]}
//                                         value={val}
//                                     />
//                                 </View>
//                             }
                            
//                         })}
                        

                        
//                         <View style={{ justifyContent: 'center', flexDirection: "row" }}>

//                             <Button title="Save" onPress={props.onEditPress} disabled={editFirstName === ""
//                                 || editLastName === "" || editGender === "" || editYear === "" } color="crimson" />
//                             <Button title="Cancel" onPress={props.onCancelPress} color="gray" />
//                         </View>
//                     </View>
//                 </View>
//             </ScrollView>
//         </TouchableWithoutFeedback>
//     </Modal>

// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         // alignItems: 'center',
//         // justifyContent: 'center',
//         // paddingTop: 50,
//         backgroundColor: '#fff',
//     },
//     overlay: {
//         flexGrow: 1,
//         justifyContent: 'center', // This centers content vertically in the screen
//         alignItems: 'center', // This centers content horizontally in the screen
//     },
//     content: {
//         width: '90%', // May adjust based on how wide you want the form
//         maxWidth: 600, // Ensures the form doesn't stretch too wide on large devices
//     },
//     photo: {
//         width: 120,
//         height: 120,
//         borderRadius: 60,
//         marginBottom: 20,
//     },
//     greeting: {
//         fontSize: 26,
//         fontWeight: 'bold',
//     },
//     infoRow: {
//         marginTop: 20,
//         paddingVertical: 8,
//     },
//     infoLabel: {
//         fontSize: 20,
//         color: 'gray',
//     },
//     editButton: {
//         marginTop: 20,
//         backgroundColor: 'blue',
//         padding: 10,
//         borderRadius: 5,
//     },
//     editButtonText: {
//         color: 'white',
//         fontWeight: 'bold',
//     },
//     modalOverlay: {
//         flex: 1,
//         backgroundColor: 'rgba(0, 0, 0, 0.5)',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     modalContent: {
//         paddingTop: 50,
//         backgroundColor: 'white',
//         padding: 20,
//         width: '90%',
//         elevation: 5,
//     },
//     modalTitle: {
//         fontSize: 20,
//         fontWeight: 'bold',
//         marginBottom: 50,
//     },
//     modalInput: {
//         borderWidth: 1,
//         height: 40,
//         marginBottom: 10,
//         padding: 10
//     },
//   });

// const pickerSelectStyles = StyleSheet.create({
//     inputIOS: {
//         fontSize: 16,
//         paddingVertical: 12,
//         paddingHorizontal: 10,
//         borderWidth: 1,
//         borderColor: 'gray',
//         borderRadius: 4,
//         color: 'black',
//         paddingRight: 30, // to ensure the text is never behind the icon
//     },
//     inputAndroid: {
//         fontSize: 16,
//         paddingHorizontal: 10,
//         paddingVertical: 8,
//         borderWidth: 0.5,
//         borderColor: 'purple',
//         borderRadius: 8,
//         color: 'black',
//         paddingRight: 30, // to ensure the text is never behind the icon
//     },
// });


// export default ModalEditScreen;