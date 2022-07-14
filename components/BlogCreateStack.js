import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import IndexScreen from '../screens/IndexScreen';
import CreateScreen from '../screens/CreateScreen';
import EditScreen from '../screens/EditScreen';
import ShowScreen from '../screens/DetailsScreen';
import { darkStyles, lightStyles } from "../styles/commonStyles";
import { useSelector } from "react-redux";

const InnerStack = createStackNavigator();

export default function BlogCreateStack() {

    const isDark = useSelector((state) => state.accountPrefs.isDark);
    const styles = isDark ? darkStyles : lightStyles;
    const headerOptions = {
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle,
        headerTintColor: styles.headerTint
    }

    return (
        <InnerStack.Navigator>
            <InnerStack.Screen name="Add" component={CreateScreen} options={{ title: "Add Booking", ...headerOptions }} />
        </InnerStack.Navigator>
    )
}