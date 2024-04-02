import { React, useContext} from 'react';
import { View, Text, StyleSheet, Image, Button, ScrollView } from 'react-native';
import CarouselScreen from './CarouselScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconWeight from 'react-native-vector-icons/FontAwesome5';
import BadgerBuddiesContext from '../../../contexts/BadgerBuddiesContext';


const UserScreen = ({ user, onAccept, onReject }) => {

  const GenderIcon = () => <Icon name="person" size={20} color="#333" />;
  const MajorIcon = () => <Icon name="science" size={20} color="#333" />;
  const AgeIcon = () => <Icon name="school" size={20} color="#333" />;
  const WeightIcon = () => <IconWeight name="weight" size={20} color="#333" />;
  const HeightIcon = () => <Icon name="straighten" size={20} color="#333" />;

  const [setIsLoggedIn, userId, secureStoreEmail, preferenceId, setPreferenceId,
    weightMetric, setWeightMetric, heightMetric, setHeightMetric] = useContext(BadgerBuddiesContext);


  const ProfileSection = ({ title, children }) => (
    <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {children}
    </View>
);
  
const UserInfoGraphRow = ({value, icon }) => {
  // only display the row if the value is not empty
  
  if (value !== `0'0"` || value !== `null lb`) {
    return<View style={styles.infoGraphRowContainer}>
        <View style={styles.graphIconContainer}>
          {icon}
        </View>
        <View>
          <Text style={{marginLeft: 10}}>{value}</Text>
        </View>
    </View>
  }
};

// function to convert inches to feet and inches
const inchesToFeetInches = (inches) => {
  const feet = Math.floor(inches / 12);
  const inch = inches % 12;
  return `${feet}'${inch}"`;
}


  return (
    <View style={{marginTop: 50}}>
      {/* <View style={[styles.overlay, {paddingTop: 50}]}></ScrollView> */}
      <ScrollView>
        <View style={styles.card}>
          <View style={{ marginVertical: 20, alignItems: 'center' }}>
            <CarouselScreen data={user.pictures}  />
            <Text style={styles.name}>{user.firstName} {user.lastName}</Text>
          </View>
        

      


          {user.aboutMe === "" ? <></> : <ProfileSection title="About Me">
            <Text style={styles.aboutMeText}>{user.aboutMe}</Text>
          </ProfileSection>}


          <ProfileSection title="Info">
            <UserInfoGraphRow value={user.gender} icon={<GenderIcon />} />
            {user.major === "" ? <></> : <UserInfoGraphRow value={user.major} icon={<MajorIcon />} />}
            <UserInfoGraphRow value={user.year} icon={<AgeIcon />} />
            {user.weight === null ? <></> : <UserInfoGraphRow value={weightMetric === "lb" ? String(user.weight) + " lb" : String(editWeightKg) + " kg"} icon={<WeightIcon />} />}
            {user.height === null ? <></> : <UserInfoGraphRow value={heightMetric === "ft/in" ? inchesToFeetInches(user.height) : String(editHeightCm) + " cm"} icon={<HeightIcon />} />}
          </ProfileSection>
          
          
          


      
        </View>
      </ScrollView>

      <View style={{ justifyContent: 'space-evenly', flexDirection: "row", marginVertical: 10 }}>
          <Button title="Accept" onPress={onAccept} color="crimson" />
          <Button title="Reject" onPress={onReject} color="gray" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   paddingTop: 50,
  //   backgroundColor: '#fff',
  // },
  // overlay: {
  //   flexGrow: 1,
  //   justifyContent: 'center', // This centers content vertically in the screen
  //   alignItems: 'center', // This centers content horizontally in the screen
  // },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginHorizontal: 20,
    marginVertical: 20,
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowColor: '#000',
    shadowOffset: { height: 5, width: 5 },
    elevation: 3,
    padding: 20,
    // If your cards need to be of a specific width or centered, you may add
    alignSelf: 'stretch', // if you want the card to stretch to the screen's width
    // maxWidth: 340, // or any specific value
    
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
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

export default UserScreen;
