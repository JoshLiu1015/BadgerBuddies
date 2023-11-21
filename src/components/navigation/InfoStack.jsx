import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PersonalInfoScreen from "../screens/PersonalInfoScreen";
import MatchInfoScreen from "../screens/MatchInfoScreen";



export default function NewsFeedStack() {

  const infoStack = createNativeStackNavigator();

  return <>
    <infoStack.Navigator>
        <infoStack.Screen name="Personal Information" component={PersonalInfoScreen} options={{headerShown: true}}/>
        <infoStack.Screen name="Match Information" component={MatchInfoScreen} options={{headerShown: true, headerBackTitleVisible: false}}/>
      </infoStack.Navigator>
    </>;
}
