import React,{Component} from 'react';

import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  Alert,
  Linking,
  Dimensions,
  LayoutAnimation,
  StatusBar,
  } from 'react-native';
import { BarCodeScanner, WebBrowser,Constants, Location, Permissions,MapView} from 'expo';
import { Marker, ProviderPropType } from 'react-native-maps';
import * as firebase from 'firebase'

class Parent extends Component{
    static navigationOptions = {
    header: null,
  };
  state = {
      latitude: null,
      longitude: null,
      region:null,
      getLocation:12345,
	  hasCameraPermission: null,
      lastScannedUrl: null,
      type:null
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
	componentDidMount() {
    var id = Constants.deviceId
id = id.split("")
var r_id = ""
for (var i = 0; i < id.length; i++) {
if (id[i] == "-"){
id[i]= ""
}
r_id = r_id+id[i]
}
r_id = "p"+r_id
  try{
firebase.database().ref('users/'+r_id).once('value',(snapshot) => {
  if(snapshot && snapshot.val()){
    const id = snapshot.val().id;
    this.setState({
      lastScannedUrl: id,
      });
    } else {
      this._requestCameraPermission()
    }
     });
} catch (error){
alert("error")
}

  }

  _requestCameraPermission = async () => {


    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
     });
      alert("You should scan QR code from child's telephone")
  };

  _handleBarCodeRead = result => {
    if (result.data !== this.state.lastScannedUrl) {
      LayoutAnimation.spring();
      this.setState({ lastScannedUrl: result.data });
    }
  };

    getLocation() {
      var id = Constants.deviceId
  id = id.split("")
  var r_id = ""
  for (var i = 0; i < id.length; i++) {
if (id[i] == "-"){
  id[i]= ""
}
r_id = r_id+id[i]
}
r_id = "p"+r_id

      firebase.database().ref('users/'+r_id).set({
    id: this.state.lastScannedUrl
  });
      this.setState({
          getLocation:null
           });
  firebase.database().ref('users/'+this.state.lastScannedUrl).on('value', (snapshot) => {
    try{
     const longitude = snapshot.val().loc.coords.longitude;
     const latitude = snapshot.val().loc.coords.latitude;
     this.setState({
           longitude:longitude,
           latitude:latitude,
          });
        } catch (error){

        }
   });
}

  render() {
    if (this.state.lastScannedUrl){
      if (this.state.getLocation){
      this.getLocation()
    }
    }
	  if(this.state.lastScannedUrl){
    if(this.state.latitude){
      return (
        <MapView
        style={{ flex: 1 }}
        
		 region={{
          latitude: this.state.latitude,
          longitude: this.state.longitude,
          latitudeDelta: 0.005,//this.state.latitudeDelta,
          longitudeDelta: 0.005//this.state.longitudeDelta,
        }}
      >

      <Marker
                 coordinate={{
                   latitude: this.state.latitude,
                   longitude: this.state.longitude
               }}
               centerOffset={{ x: 45, y: 45 }}
               anchor={{ x: 1, y: 1 }}
               opacity={0.6}
             >
               <Text style={styles.marker}>X</Text>
             </Marker>
             </MapView>
            )

    } else {
      if (this.state.getLocation){
        return(
 <View style={styles.container}><Text>Loading ..</Text></View>
      )
    } else {
      return(  <View style={styles.container}><Text>Loading ..</Text></View>)
    }

    }
  } else {
	  return(
	   <View style={styles.container}>

        {this.state.hasCameraPermission === null
          ? <Text>Loading ..</Text>
          : this.state.hasCameraPermission === false
              ? <Text style={{ color: '#fff' }}>
                  Camera permission is not granted
                </Text>
              : <BarCodeScanner
                  onBarCodeRead={this._handleBarCodeRead}
                  style={{
                    height: Dimensions.get('window').height,
                    width: Dimensions.get('window').width,
                  }}
                />}



      </View>
	  )
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

export {Parent}
