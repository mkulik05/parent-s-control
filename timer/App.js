import React,{Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as firebase from 'firebase'
import Slave from './src/Slave'
import Master from './src/Master'
class App extends React.Component {
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
    competition:null,
    team:null,
    player:null,
    team_is_register:false
  }
    componentWillMount(){
  try{
    firebase.database().ref('users/' + this.state.competition).once('value', (snapshot) => {
      if(snapshot && snapshot.val()){
        this.setState({
          team_is_register:true
        });

      } else {
        this.setState({
          team_is_register:false
        });
      }
    })
  } catch(e){
    //  alert("123s")
  }
}

  render() {
    if (this.state.team_is_register){
      return (
        <Slave/>
      )
    } else {
      return(
        <Master/>
      )
    }
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
