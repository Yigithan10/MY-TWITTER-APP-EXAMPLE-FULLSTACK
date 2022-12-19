import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import Languages from '../../languages.json';
import Lottie from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import {
  SetId,
  SetUsername,
  SetEmail,
  SetLanguage,
  SetGender,
  SetDate,
  SetTime,
  SetImagePath,
  SetToken,
} from '../redux/action';
import { useToast, Box, WarningIcon } from 'native-base';
import { StyleSheet, NativeModules } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = () => {
  const navigation = useNavigation();
  const toast = useToast();
  const dispatch = useDispatch();

  const { MyStore } = useSelector(state => state);

  let txtSessionExpired;
  let localeLanguage;
  const localeLanguageLearn =
    Platform.OS === 'ios'
      ? NativeModules.SettingsManager.settings.AppleLocale ||
      NativeModules.SettingsManager.settings.AppleLanguages[3] //iOS 13
      : NativeModules.I18nManager.localeIdentifier;


  const SetLocaleLanguage = () => {
    if (localeLanguageLearn == 'en_US') {
      localeLanguage = 'eng';
    } else if (localeLanguageLearn == 'de_DE') {
      localeLanguage = 'deu';
    } else if (localeLanguageLearn == 'fr_FR') {
      localeLanguage = 'fra';
    } else if (localeLanguageLearn == 'es_ES') {
      localeLanguage = 'esp';
    } else if (localeLanguageLearn == 'it_IT') {
      localeLanguage = 'ita';
    } else if (localeLanguageLearn == 'pt_PT') {
      localeLanguage = 'por';
    } else if (localeLanguageLearn == 'tr_TR') {
      localeLanguage = 'tur';
    } else if (localeLanguageLearn == 'ru_RU') {
      localeLanguage = 'rus';
    } else if (localeLanguageLearn == 'ja_JP') {
      localeLanguage = 'jap';
    } else if (localeLanguageLearn == 'zh_CN') {
      localeLanguage = 'chi';
    } else {
      localeLanguage = 'eng';
    }

    txtSessionExpired = Languages.languages[localeLanguage].HomeScreen.txtSessionExpired;
  }

  const SendParserToken = (token) => {
    fetch(MyStore.proxyRedux + '/auth/parser/' + token, {
      method: 'POST',
    },
    )
      .then(response => {
        response.json().then(dataJson => {
          console.log("response", response);
          if (response.status == 200) {
            dispatch(SetToken(token))
            dispatch(SetId(dataJson.id));
            dispatch(SetUsername(dataJson.username));
            dispatch(SetEmail(dataJson.email));
            dispatch(SetLanguage(dataJson.language));
            dispatch(SetGender(dataJson.gender));
            dispatch(SetDate(dataJson.localDate));
            dispatch(SetTime(dataJson.localTime));
            dispatch(SetImagePath(dataJson.imagePath));
            console.log("dataJson.id", dataJson.id);
            console.log("dataJson.username", dataJson.username);
            console.log("dataJson.email", dataJson.email);
            console.log("dataJson.language", dataJson.language);
            console.log("dataJson.gender", dataJson.gender);
            console.log("dataJson.localDate", dataJson.localDate);
            console.log("dataJson.localTime", dataJson.localTime);
            console.log("dataJson.imagePath", dataJson.imagePath);
            navigation.navigate('TabsNavigator');
          } else if (response.status == 502) {
            toast.show({
              render: () => {
                return (
                  <Box
                    style={styles.alertBoxFlex}
                    bg="error.300"
                    px="2"
                    py="1"
                    rounded="sm"
                    mb={5}>
                    <WarningIcon
                      style={styles.toastAlertMargin}
                      CircleIcon
                      name="warning-1"
                      color="error.500"
                    />
                    {txtSessionExpired}
                  </Box>
                );
              },
            });
            navigation.navigate("Login");
          } else {
            navigation.navigate("Login");
          }
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  const getData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token != null || token != undefined || token != "") {
        SendParserToken(token);
      } else {
        navigation.navigate('Login');
      }
    } catch (e) {
      console.log(e);
    }
  }

  const myAnimation = () => {
    return (
      <Lottie
        source={require('../../Tweet.json')}
        autoPlay
        loop={false}
        speed={0.5}
        onAnimationFinish={() => {
          getData();
        }}
      />
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      {SetLocaleLanguage()}
      {myAnimation()}
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'white',
  },
  alertBoxFlex: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  toastAlertMargin: {
    margin: 7,
  },
  text1: {
    fontSize: 28,
    fontStyle: 'italic',
    margin: 5,
  },
  text2: {
    fontSize: 21,
    fontStyle: 'bold',
    color: 'black',
    margin: 5,
  },
  text3: {
    fontSize: 17,
    fontStyle: 'bold',
    color: 'black',
    margin: 5,
  },
  text4: {
    fontSize: 15,
    fontStyle: 'bold',
    color: 'black',
  },
  text5: {
    fontSize: 13,
    fontStyle: 'bold',
    color: 'black',
    margin: 5,
  },
  text6: {
    fontSize: 12,
    fontStyle: 'bold',
    color: 'black',
    margin: 5,
  },
  text7: {
    fontSize: 11,
    fontStyle: 'bold',
    color: 'black',
    margin: 5,
  },
})

export default Splash;
