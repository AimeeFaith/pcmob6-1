import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Switch,
  Text,
  TouchableOpacity,
  View,
  Image,
  Animated,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { API, API_WHOAMI } from "../constants/API";
import { changeModeAction } from "../redux/ducks/accountPref";
import { commonStyles, darkStyles, lightStyles } from "../styles/commonStyles";
import { logOutAction } from "../redux/ducks/blogAuth";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";


export default function AccountScreen({ navigation }) {
  const profilePicture = useSelector((state) => state.accountPrefs.profilePicture);
  const [username, setUsername] = useState(null);
  const token = useSelector((state) => state.auth.token);
  const isDark = useSelector((state) => state.accountPrefs.isDark);
  const dispatch = useDispatch();
  const styles = { ...commonStyles, ...(isDark ? darkStyles : lightStyles) };
  const picSize = new Animated.Value(130);
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <Image style={{ width: 60, height: 60, borderRadius: 100, marginRight: 10 }} source={require('../assets/image/logo.jpg')} />,

    });
  });

  function changePicSize() {
    Animated.loop(
      Animated.timing
        (picSize, {
          toValue: 1,
          duration: 500,
        })).start()
    Animated.spring(picSize, {
      toValue: 300,
      duration: 3500,
      friction: 2,
      tension: 140,
      useNativeDriver: false
    }).start()
  }

  async function getUsername() {
    console.log("---- Getting user name ----");
    console.log(`Token is ${token}`);
    try {
      const response = await axios.get(API + API_WHOAMI, {
        headers: { Authorization: `JWT ${token}` },
      });
      console.log("Got user name!");
      setUsername(response.data.username);
    } catch (error) {
      console.log("Error getting user name");
      if (error.response) {
        console.log(error.response.data);
        if (error.response.data.status_code === 401) {
          signOut();
          navigation.navigate("SignInSignUp");
        }
      } else {
        console.log(error);
      }
      // We should probably go back to the login screen???
    }
  }

  function signOut() {
    dispatch(logOutAction());
    navigation.navigate("SignInSignUp");
  }

  function switchMode() {

    dispatch(changeModeAction());
  }

  useEffect(() => {
    console.log("Setting up nav listener");
    // Check for when we come back to this screen
    const removeListener = navigation.addListener("focus", () => {
      console.log("Running nav listener");
      setUsername(<ActivityIndicator />);
      getUsername();
    });
    getUsername();
    return removeListener;
  }, []);

  return (
    <View style={[styles.container, { alignItems: "center" }]}>

      <TouchableWithoutFeedback onPress={changePicSize}>
        <Animated.Image
          source={{ uri: profilePicture ?? 'https://raw.githubusercontent.com/AimeeFaith/pcmob6-1/2e140dadda49af8fe7b47aa4c20f2dd1ded60326/assets/image/logo.jpg' }}
          style={{ width: picSize, height: picSize, borderRadius: 200 }}
        />
      </TouchableWithoutFeedback>
      <TouchableOpacity onPress={() => navigation.navigate("Camera")}>
        <FontAwesome name="camera" size={50} style={{ color: "black", margin: 10 }} />
      </TouchableOpacity>
      <Text style={[styles.title, styles.text, { marginTop: 30 }]}>
        {" "}
        Welcome {username} !
      </Text>
      <Text style={[styles.title, styles.text, { marginTop: 30 }]}>
        {" "}
        Whatsup for Today?
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          margin: 20,
        }}
      >
        <Text style={[styles.content, styles.text]}> Dark Mode? </Text>
        <Switch
          value={isDark}
          onChange={switchMode}
        />
      </View>
      <TouchableOpacity style={[styles.button]} onPress={signOut}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}