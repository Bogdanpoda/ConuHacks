import React from "react";


import { View, StyleSheet, Pressable, Alert, Text } from "react-native";


<Text>Success!</Text>

import { Pressable } from "react-native";
import { View, Text, StyleSheet } from 'react-native';



export default function SummaryScreen({ navigation, route }) {
  const { summary } = route.params;
  return (
    <View style={styles.container}>
      <Text style={{ color: "#000" }}>{summary.timeLeft}</Text>
        <View style={styles.card}>            
            <Text style={styles.title}>This is a reserved parking spot</Text>
            <View style={styles.divider} />
            
            <Text style={{paddingBottom:10}}>If you have permit number 34, you may park here</Text>
            
            <View style={styles.btnRow}>
                <Pressable style={styles.confirmBtn} onPress={() => navigation.navigate("Camera",{ triggerState: true })}><Text>I have permit 34</Text></Pressable>
            </View>
            <View style={styles.btnRow}>
                <Pressable style={styles.denyBtn} onPress={() => navigation.navigate("Camera",{ triggerState: false })}><Text>I won't park here</Text></Pressable>
            </View>
        </View>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
    card: {
        
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 16,
        margin: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    divider: {
        height: 1,
        backgroundColor: 'gray',
        marginVertical: 8,
    },
    confirmBtn: {
        flex:1,
        width: 70,
        height: 55,
        backgroundColor: "#8d58a1",
        borderRadius: 50,
        alignSelf: "flex-end",
        justifyContent: "center",
        alignItems: "center",
    },
    denyBtn: { 
        flex: 1,       
        width: 70,
        height: 55,
        backgroundColor: "#c0c0c0",
        borderColor: "#8d58a1",
        borderWidth: 3,
        borderRadius: 50,
        alignSelf: "flex-end",
        justifyContent: "center",
        alignItems: "center",
    },
    btnRow: {
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 60,
    },
    textRow: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        gap: 60,
    },

});



