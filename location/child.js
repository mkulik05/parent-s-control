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
} from 'react-native';
import { WebBrowser,Constants, Location, Permissions,MapView} from 'expo';
import * as firebase from 'firebase'
import QRCode from 'react-native-qrcode';

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

class Child extends Component{
  static navigationOptions = {
    header: null,
  };

  state = {
    location: null,
    sendLocation:1234,
    mixelColors : [],
    color : 0,
    id:null,
    type:null,
    first:null,
    flag:null
  };

  constructor(props) {

    //alert(id.replaceAll('-', ''))
    //alert(id_spl)
    super(props);
  }

  componentWillMount() {

    var id = Constants.deviceId
    id = id.split("")
    var r_id = ""
    for (var i = 0; i < id.length; i++) {
      if (id[i] == "-"){
        id[i]= ""
      }
      r_id = r_id+id[i]
    }
    r_id = "c"+r_id
    this.setState({
      id: r_id,
      first:this.props.first,
      flag:1233
    });

    if (Platform.OS === 'android' && !Constants.isDevice) {// если платформа android и приложение работает не в симуляторе
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync(); //вызов функции
    }
    this.sendLocation()

  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION); // Определяет, предоставлено ли вашему приложению доступ к предоставленному типу разрешения.
    if (status !== 'granted') { // если доступа не получено
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({}); // если getCurrentPositionAsync выполнилось до конца

    const oneDegreeOfLatitudeInMeters = 111.32 * 1000;
    const latDelta =location.coords.accuracy / oneDegreeOfLatitudeInMeters;
    const longDelta = location.coords.accuracy / (oneDegreeOfLatitudeInMeters * Math.cos(location.coords.latitude * (Math.PI / 180)));
    //  alert(location.coords.latitude)
    //alert(location.coords.longitude)
    //}, 3000);
    this.setState({
      location:location,
    });
    return location
  };
  sendLocation() {
    this.setState({
      sendLocation:null
    });
    firebase.database().ref('users/'+this.state.id).set({
      loc: this.state.location
    });
    //alert(228)
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      this.sendLocation()
      this.get_location()
    }, 1000)
  }
  get_location = async () => {
    let location = await Location.getCurrentPositionAsync({}); // если getCurrentPositionAsync выполнилось до конца
    //  alert(location.coords.latitude)
    //alert(location.coords.longitude)
    //}, 3000);
    this.setState({
      location:location,
    });
  }
  onMixelPress (mixelNumber) {

    //console.log(mixelNumber)
    let tempColors = this.state.mixelColors

    tempColors[mixelNumber] = this.state.color
    this.setState({mixelColors: tempColors})
  }
  onSuggestPress(colorNum){
    this.setState({
      color: colorNum
    })
  }
  game(){
    this.setState({
      first: 123,
    })
  }
  render() {
    let mixels = [], suggests = []


    for (let i =0 ; i <64 ; i++) {
      mixels.push(
        <TouchableOpacity key={i} onPress={() => { this.onMixelPress(i) }} style={[styles.mixel, {backgroundColor: colors[this.state.mixelColors[i]]}]}/>
      )
    }

    for (let colorNum in colors) {
      suggests.push(
        <TouchableOpacity key={'s' + colorNum} onPress={() => { this.onSuggestPress(colorNum) }}style={[styles.mixel, {backgroundColor: colors[colorNum]}]}/>
      )
    }
if (this.state.flag){
    if(this.state.first){
      return(
        <View style={styles.container_mixel}>

        {mixels}


        {suggests}
        </View>
      )

    } else {
      return(
        <View style={styles.container}>
        <QRCode
        value={this.state.id}
        size={300}
        bgColor='purple'
        fgColor='white'/>
        <Button
        onPress={() => {this.game()}}
        title="I have already scan QR code"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
        />
        </View>

      )

    }
  } else {
    return(
<View style={styles.container}><Text>Loading ..</Text></View>
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
  container_mixel: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width:'100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: '20%'
  },

  mixel: {
    width: '12%',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    aspectRatio: 1
  }
});
export {Child}
