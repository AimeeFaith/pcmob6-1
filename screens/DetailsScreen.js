import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { commonStyles, lightStyles, darkStyles } from "../styles/commonStyles";
import axios from "axios";
import { API, API_POSTS } from "../constants/API";
import { useSelector } from "react-redux";

export default function ShowScreen({ navigation, route }) {
  const token = useSelector((state) => state.auth.token);
  const [post, setPost] = useState({ title: "", content: "" });
  const isDark = useSelector((state) => state.accountPrefs.isDark);
  const styles = { ...commonStyles, ...(isDark ? darkStyles : lightStyles) };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={editPost} style={{ marginRight: 10 }}>
          <FontAwesome name="pencil-square-o" size={30} color={styles.headerTint} />
        </TouchableOpacity>
      ),
    });
  });

  useEffect(() => {
    getPost();
  }, [])

  async function getPost() {
    const id = route.params.id
    console.log(id)
    try {
      const response = await axios.get(API + API_POSTS + "/" + id, {
        headers: { Authorization: `JWT ${token}` },
      })
      console.log(response.data);
      setPost(response.data);
    } catch (error) {
      console.log(error.response.data);
      if (error.response.data.error = "Invalid token") {
        navigation.navigate("SignInSignUp");
      }
    }
  }

  function editPost() {
    navigation.navigate("Edit", { post: post })
    getPost();
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.title, styles.text, { margin: 5 }]}>Service(s): {post.service}</Text>
      <Text style={[styles.content, styles.text, { margin: 5 }]}>Appointment: {post.appt_datetime}</Text>
      <Text style={[styles.title, styles.text, { margin: 5 }]}>Client: {post.customer}</Text>
      <Text style={[styles.content, styles.text, { margin: 5 }]}>Stylist: {post.stylist}</Text>
    </View>
  );
}