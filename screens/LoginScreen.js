import React, {Component} from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  Dimensions
} from "react-native";
import {TouchableOpacity} from "react-native-gesture-handler";
import {RFValue} from "react-native-responsive-fontsize"
import * as Google from "expo-google-app-auth";
import firebase from "firebase";

import AppLoading from "expo-app-loading";
import * as Font from "expo-font";

let customFonts = {
  "Bubblegum-sans":require("../assets/fonts/BubblegumSans-Regular.ttf")
};

export default class LoginScreen extends Component{
  constructor(props){
    super(props);
    this.state = {
      fontsLoaded:false
    };
  }
  async_loadFontsAsync(){
    await Font.loadAsync(customFonts);
    this.setState({fontsLoaded:true});
    }
  
    componentDidMount(){
      this_loadFontsAsync();
    }

    isUserEqual = (GoogleUser,FirebaseUser) =>{
     if(FirebaseUser){
      var providerData = FirebaseUser.providerData;
      for(var i = 0; i < providerData.length;i++){
        if(
          providerData[i].providerID === 
          firebase.auth.GoogleAuthProvider.provider_ID &&
          providerData[i].UID === GoogleUser.getBasicProfile().getID
          
          
        ){
         return true; 
        }
      }
     }
    return false;
     
    };
    onSignIn = GoogleUser => {
      var unsubscribe = firebase.auth().onAuthStateChanged(FirebaseUser => {
        unsubscribe();
        if(! this.isUserEqual(GoogleUser,FirebaseUser)){
          var credential = firebase.auth.GoogleAuthProvider.credential(
            GoogleUser.IDToken,
            GoogleUser.AccessToken
          );
            firebase
            .auth()
            .signInWithCredential(credential)
            .then(function(result){
              if(result.AdditionalUser.info.isNewUser){
              firebase
              .auth()
                .signInWithCredential(credential)
                .then(function(result){
                  if(result.AdditionalUser.info.isNewUser){
                    firebase 
                    .database()
                  }
                })
              
              }
            })
        }
      })
    } 
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  cardContainer: {
    margin: RFValue(13),
    backgroundColor: "#2f345d",
    borderRadius: RFValue(20)
  },
  storyImage: {
    resizeMode: "contain",
    width: "95%",
    alignSelf: "center",
    height: RFValue(250)
  },
  titleContainer: {
    paddingLeft: RFValue(20),
    justifyContent: "center"
  },
  storyTitleText: {
    fontSize: RFValue(25),
    fontFamily: "Bubblegum-Sans",
    color: "white"
  },
  storyAuthorText: {
    fontSize: RFValue(18),
    fontFamily: "Bubblegum-Sans",
    color: "white"
  },
  descriptionText: {
    fontFamily: "Bubblegum-Sans",
    fontSize: 13,
    color: "white",
    paddingTop: RFValue(10)
  },
  actionContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: RFValue(10)
  },
  likeButton: {
    width: RFValue(160),
    height: RFValue(40),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#eb3948",
    borderRadius: RFValue(30)
  },
  likeText: {
    color: "white",
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(25),
    marginLeft: RFValue(5)
  }
});

