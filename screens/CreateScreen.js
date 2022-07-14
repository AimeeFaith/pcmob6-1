import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,

} from "react-native";
import axios from "axios";
import { API, API_CREATE } from "../constants/API";
import { commonStyles, darkStyles, lightStyles } from "../styles/commonStyles";
import { useSelector } from "react-redux";

export default function CreateScreen({ navigation }) {
  const token = useSelector((state) => state.auth.token);
  const isDark = useSelector((state) => state.accountPrefs.isDark);
  const styles = { ...commonStyles, ...(isDark ? darkStyles : lightStyles) };
  const [service, setService] = useState("");
  const [appt_datetime, setAppt_datetime] = useState("");
  const [customer, setCustomer] = useState("");
  const [stylist, setStylist] = useState("");
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <Image style={{ width: 60, height: 60, borderRadius: 100, marginRight: 10 }} source={require('../assets/image/logo.jpg')} />,

    });
  });

  async function savePost() {
    const post = {
      service: service,
      appt_datetime: appt_datetime,
      customer: customer,
      stylist: stylist,
    };
    try {
      console.log(token);
      const response = await axios.post(API + API_CREATE, post, {
        headers: { Authorization: `JWT ${token}` },
      });
      console.log(response.data);
      navigation.navigate("Index", { post: post });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <View style={{ margin: 20 }}>
        <Text style={[additionalStyles.label, styles.text]}>Service:</Text>
        <TextInput
          style={additionalStyles.input}
          value={service}
          onChangeText={(text) => setService(text)}
        />
        <Text style={[additionalStyles.label, styles.text]}>
          Date and Time:
        </Text>
        <TextInput
          style={additionalStyles.input}
          value={appt_datetime}
          onChangeText={(text) => setAppt_datetime(text)}
        />
        <Text style={[additionalStyles.label, styles.text]}>Client:</Text>
        <TextInput
          style={additionalStyles.input}
          value={customer}
          onChangeText={(text) => setCustomer(text)}
        />
        <Text style={[additionalStyles.label, styles.text]}>Stylist:</Text>
        <TextInput
          style={additionalStyles.input}
          value={stylist}
          onChangeText={(text) => setStylist(text)}
        />
        <TouchableOpacity
          style={[styles.button, { marginTop: 20 }]}
          onPress={savePost}
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const additionalStyles = StyleSheet.create({
  input: {
    fontSize: 24,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 15,
  },
  label: {
    fontSize: 23,
    marginBottom: 10,
    marginLeft: 5,
  },
});