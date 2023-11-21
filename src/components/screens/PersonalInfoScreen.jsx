import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from "@react-navigation/native";




export default function PersonalInfoScreen(props) {

    const navigation = useNavigation();



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
                <TextInput placeholder="First Name" style={styles.input} />
                <TextInput placeholder="Last Name" style={styles.input} />
                <TextInput placeholder="Gender" style={styles.input} />
                <TextInput placeholder="Major" style={styles.input} />
                <TextInput placeholder="Grade" style={styles.input} />
                <TextInput placeholder="Weight" style={styles.input} />
                <TextInput placeholder="Height" style={styles.input} />
                <Button title="NEXT" onPress={() => navigation.push("Match Information", props)} />
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



