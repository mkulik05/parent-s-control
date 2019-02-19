import React,{Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as firebase from 'firebase'

class Master extends Component{
  constructor(props){
    super(props)
    var config = {
      apiKey: "AIzaSyDxqDaTcAUR3R6fZwI7PSz5H1yGhVnHHH4",
      authDomain: "location-72fca.firebaseapp.com",
      databaseURL: "https://location-72fca.firebaseio.com",
      projectId: "location-72fca",
      storageBucket: "location-72fca.appspot.com",
      messagingSenderId: "440309375391"
    };
    firebase.initializeApp(config);

  }
  state={
    competition:"belarus 228",
    team:null,
    player:null,
    key:1234
  }
  press(){
  firebase.database().ref('users/' + this.state.competition).set({
    is_connected: true
  });
}
  
  render() {
      return (
        <View style={styles.container}>
        <QRCode
        value={this.state.key}
        size={400}
        bgColor='black'
        fgColor='white'/>
        <Button
        onPress={() => {this.press()}}
        title="I have already scan QR code"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
        />
        </View>

      )

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export{Master}
