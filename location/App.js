import React,{Component} from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button ,
  Marker
} from 'react-native';
import { WebBrowser,Constants, Location, Permissions,MapView} from 'expo';

import * as firebase from 'firebase'
import {Parent} from './parent'
import {Child} from './child'

const colors = [
  "#C0392B",
  "#9B59B6",
  "#2980B9",
  "#1ABC9C",
  "#F1C40F",
  "#E67E22",
  "#F0F3F4",
  "#2C3E50"
]

export default class HomeScreen extends React.Component {
  state = {
    type:null,
    child:null,
    first:null,
    Loading:null
  };
  constructor(props) {

    //alert(id.replaceAll('-', ''))
    //alert(id_spl)
    super(props);
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
  componentWillMount(){
    var id = Constants.deviceId
    id = id.split("")
    var r_id = ""
    for (var i = 0; i < id.length; i++) {
      if (id[i] == "-"){
        id[i]= ""
      }
      r_id = r_id+id[i]
    }
    r_id_c = "c"+r_id
    r_id_p = "p"+r_id
    this.setState({
      id: r_id,
    });

    try{
      firebase.database().ref('users/' + r_id_c).once('value', (snapshot) => {
        if(snapshot && snapshot.val()){
          const latitude = snapshot.val().loc.coords.latitude;
          this.child()
        //  alert("123")
          this.setState({
            first: 122,
            type: 123,
            Loading:123
          });

        } else {
        //  alert("321")
          this.setState({
            Loading:123
          });
    }
    })
    } catch(e){
  //  alert("123s")
    }
    try{
      firebase.database().ref('users/' + r_id_p).once('value', (snapshot) => {
        if(snapshot && snapshot.val()){
          const latitude = snapshot.val().id;
          this.paren()
      //    alert("2*123")
          this.setState({
            first: 122,
            Loading:123
          });

        } else {
        //  alert("2*321")
          this.setState({
            Loading:123
          });
    }
  })
  } catch (error){
      alert("Error")
  }
}

	paren(){
		this.setState({
          child:"False",
          type:123
           });
	}
	child(){
    alert("child")
		this.setState({
          child:"True",
          type:123
           });
           alert(this.state.Loading )
           alert(this.state.type)

	}
	render() {
    if (this.state.Loading){
		if (!this.state.type){
		return(
		<View style={styles.container}>
          <Button
      onPress={() => {this.child()}}
      title="I am a child "
      color="#841584"
      accessibilityLabel="Learn more about this purple button"
    />
	 <Button
      onPress={() => {this.paren()}}
      title="I am a parent "
      color="#841584"
      accessibilityLabel="Learn more about this purple button"
    />
        </View>
		)
	} else {
		if (this.state.child ==="True"){
			return(
				<Child first = {this.state.first}/>
			)
		} else {
			return(
				<Parent first = {this.state.first}/>
			)
		}
	}
    }
  else {
     return(<View style={styles.container}><Text>Loading ..</Text></View>)
  }

}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  marker: {
    marginLeft: 46,
    marginTop: 33,
    fontWeight: 'bold',
  },
});
