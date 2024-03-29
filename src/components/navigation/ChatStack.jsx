import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChatRoomScreen from "../screens/ChatRoomScreen"
import ChatListScreen from "../screens/ChatListScreen";
// import BadgerTabs from "./BadgerTabs";



export default function NewsFeedStack() {

  const chatStack = createNativeStackNavigator();

  return <>
    <chatStack.Navigator>
        <chatStack.Screen name="Chat" component={ChatListScreen} options={{headerShown: true}}/>
        <chatStack.Screen name="Chat Room" component={ChatRoomScreen} options={{headerShown: true, headerBackTitleVisible: true}}/>
      </chatStack.Navigator>
    </>;
}