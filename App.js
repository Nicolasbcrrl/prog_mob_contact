import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import * as Contacts from'expo-contacts';
import React,{ useEffect, useState } from 'react';

export default function App() {
  const[contact, setContact] = React.useState({});
  const[listContact, setList] = React.useState([]);
  const getContacts = async () => {
    const {status} = await Contacts.requestPermissionsAsync();
    if(status === 'granted'){
      const {data} = await Contacts.getContactsAsync(
        { fields: [Contacts.Fields.PhoneNumbers]}
      );
      //if(data.length > 0){
        setContact(data);
        setList(contact);
        console.log(contact);
      //}
    }
  }
  return (
    <View style={styles.container}>
     
      <View style={{ flexDirection: "column", justifyContent: 'center', alignItems: 'center', width: '100%', margin: 20 }}>
        <FlatList 
          data={listContact}
          renderItem={({ item }) =>
            <Text>Name : {item.name}   Phone number : {item.phoneNumbers[0].number}</Text>
          }
        />
      </View> 
      <View style={{flexDirection: "row", justifyContent: 'center', alignItems: 'center', width: '75%'}}>
        <Button 
          title="Get Contact"
          onPress={getContacts} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height:'100%'
  },
  inputStyle:{
    width:200,
    borderColor:'gray',
    borderWidth:1, 
    fontSize: 20
  },
  buttonStyle: {
    width: 10,
    height: 10,
    margin: 20,
    alignContent: 'center',
  },
  textInputStyle: {
    width: 250,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    margin:10
  },
  listContainer: {
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  }
});
