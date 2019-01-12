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
import { Marker, ProviderPropType } from 'react-native-maps';
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
		child:null
    };
	paren(){
		this.setState({
          child:"False"
           });
	}
	child(){
		this.setState({
          child:"True"
           });
	}
	render() {
		if (!this.state.child){
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
				<Child/>
			)
		} else {
			return(
				<Parent/>
			)
		}
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