import React, {useState, useEffect} from 'react';
import Languages from '../../languages.json';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  BackHandler,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {useToast, Box, CheckCircleIcon, IconButton, Icon, Button} from 'native-base';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';

const PersonelSettingsScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const toast = useToast();
  const {MyStore} = useSelector(state => state);

  const langRedux = MyStore.languageRedux;

  let SettingsScreen =
    Languages.languages[langRedux].SettingsScreen.SettingsScreen;
  let txtChangeUsername =
    Languages.languages[langRedux].SettingsScreen.txtChangeUsername;
  let txtChangeEmail =
    Languages.languages[langRedux].SettingsScreen.txtChangeEmail;
  let txtChangePassword =
    Languages.languages[langRedux].SettingsScreen.txtChangePassword;
  let txtChangeLanguage =
    Languages.languages[langRedux].SettingsScreen.txtChangeLanguage;
  let txtChangeGender =
    Languages.languages[langRedux].SettingsScreen.txtChangeGender;
  let txtDeleteAccount =
    Languages.languages[langRedux].SettingsScreen.txtDeleteAccount;
  let txtTurnBack = Languages.languages[langRedux].SettingsScreen.txtTurnBack;

  function handleBackButtonClick() {
    navigation.goBack();
    return true;
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);

  const IconButtonsTurnBack = () => {
    return (
      <IconButton
        onPress={() => {
          navigation.goBack();
        }}
        icon={<Icon as={MaterialIcon} name="arrow-back" />}
        color={'black'}
        size={50}
        _icon={{
          color: 'black',
          size: '2xl',
        }}
        _hover={{
          bg: 'coolGray.800:alpha.20',
        }}
        _pressed={{
          bg: 'coolGray.800:alpha.20',
          _icon: {
            name: 'arrow-back',
          },
          _ios: {
            _icon: {
              size: '2xl',
            },
          },
        }}
        _ios={{
          _icon: {
            size: '2xl',
          },
        }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>{IconButtonsTurnBack()}</View>
        <View style={styles.headerMiddle}>
          <Text style={styles.text2}>{SettingsScreen}</Text>
        </View>
        <View style={styles.headerRight}></View>
      </View>
      <View style={styles.footer}>
        <View style={[styles.oneButtonSettings, {marginTop: 75}]}>
          <Button
          style={styles.button}
            onPress={() => navigation.navigate('ChangeUsernameScreen')}
          >{txtChangeUsername}</Button>
        </View>
        <View style={styles.oneButtonSettings}>
          <Button
                    style={styles.button}
            onPress={() => navigation.navigate('ChangeEmailScreen')}
          >{txtChangeEmail}</Button>
        </View>
        <View style={styles.oneButtonSettings}>
          <Button
                    style={styles.button}
            onPress={() => navigation.navigate('ChangePasswordScreen')}
          >{txtChangePassword}</Button>
        </View>
        <View style={styles.oneButtonSettings}>
          <Button
                              style={styles.button}
            onPress={() => navigation.navigate('ChangeLanguageScreen')}
          >{txtChangeLanguage}</Button>
        </View>
        <View style={styles.oneButtonSettings}>
          <Button
                    style={styles.button}
            onPress={() => navigation.navigate('ChangeGenderScreen')}
          >{txtChangeGender}</Button>
        </View>
        <View style={styles.oneButtonSettings}>
          <Button
                    style={styles.button}
            onPress={() => navigation.navigate('DeleteAccountScreen')}
          >{txtDeleteAccount}</Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'gray',
  },
  header: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  footer: {
    backgroundColor: 'white',
    flex: 9,
    paddingRight: 50,
    paddingLeft: 50,
    borderWidth: 1
  },
  headerLeft: {
    width: '20%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  headerMiddle: {
    width: '60%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  headerRight: {
    width: '20%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  buttons: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  oneButtonSettings: {
    marginTop: 30,
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
    fontSize: 15,
    fontStyle: 'bold',
    color: 'black',
    margin: 5,
  },
  text4: {
    fontSize: 13,
    fontStyle: 'bold',
    color: 'black',
    margin: 5,
  },
  text5: {
    fontSize: 11,
    fontStyle: 'bold',
    color: 'black',
    margin: 5,
  },
  button: {
    borderRadius: 20,
  },
});

export default PersonelSettingsScreen;
