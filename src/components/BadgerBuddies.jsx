import { NavigationContainer } from '@react-navigation/native';

import BadgerTabs from './navigation/BadgerTabs';


export default function BadgerBuddies(props) {


return <>
        <NavigationContainer>
            <BadgerTabs/>            
        </NavigationContainer>
    </>
}