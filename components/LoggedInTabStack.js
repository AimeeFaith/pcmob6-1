import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BlogStack from '../components/BlogStack';
import AccountStack from '../components/AccountStack';
import { FontAwesome } from '@expo/vector-icons';
import { useSelector } from "react-redux";
import InfoScreen from '../screens/InfoScreen';

const Tab = createBottomTabNavigator();

export default function LoggedInStack() {
    const isDark = useSelector((state) => state.accountPrefs.isDark);
    return (
        <Tab.Navigator
            initialRouteName="Profile"
            screenOptions={({ route }) => ({
                tabBarActiveTintColor: "tomato",
                tabBarInactiveTintColor: "gray",
                tabBarStyle: {
                    backgroundColor: isDark ? "#181818" : "white",
                },
                tabBarIcon: ({ color, size }) => {
                    let iconName;

                    if (route.name === "Booking") {
                        iconName = "calendar";
                    } else if (route.name === "Profile") {
                        iconName = "user";
                    }
                    else {
                        iconName = "info";
                    }

                    // You can return any component that you like here!
                    return <FontAwesome name={iconName} size={size} color={color} />;
                },
            })}
        >
            <Tab.Screen name="Profile" component={AccountStack} />
            <Tab.Screen name="Booking" component={BlogStack} />
            <Tab.Screen name="Info" component={InfoScreen} />
        </Tab.Navigator>
    );
}