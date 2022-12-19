import React, { useState, useEffect, createRef } from 'react';
import Languages from '../../languages.json';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  NativeModules,
  Platform,
  BackHandler,
  Alert,
  ActivityIndicator,
  Keyboard,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  useToast,
  Box,
  CheckCircleIcon,
  WarningIcon,
  Button,
  ScrollView,
  Checkbox
} from 'native-base';
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
  SetContainerScreen,
  SetToken,
} from '../redux/action';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  let localeLanguage;
  const localeLanguageLearn =
    Platform.OS === 'ios'
      ? NativeModules.SettingsManager.settings.AppleLocale ||
      NativeModules.SettingsManager.settings.AppleLanguages[3] //iOS 13
      : NativeModules.I18nManager.localeIdentifier;

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { MyStore } = useSelector(state => state);

  const [rememberMe, setRememberMe] = useState(false);

  const passwordInputRef = createRef();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [securityText, setSecurityText] = useState(true);

  const toast = useToast();

  const [showSpinner, setShowSpinner] = useState(false);

  let txtTitle;
  let txtUsername;
  let txtYourUsername;
  let txtPassword;
  let txtYourPassword;
  let txtLogin;
  let txtCreateAnAccount;
  let txtRegister;
  let txtLoginAlert1;
  let txtLoginAlert2;
  let txtLoginAlert3;
  let txtLoginAlert4;
  let txtEnterUsername;
  let txtEnterPassword;
  let txtLoginAlertQuestion;
  let txtAlertText1;
  let txtAlertNo;
  let txtAlertYes;
  let txtRememberMe;

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

    txtTitle = Languages.languages[localeLanguage].Login.txtTitle;
    txtUsername = Languages.languages[localeLanguage].Login.txtUsername;
    txtYourUsername = Languages.languages[localeLanguage].Login.txtYourUsername;
    txtPassword = Languages.languages[localeLanguage].Login.txtPassword;
    txtYourPassword = Languages.languages[localeLanguage].Login.txtYourPassword;
    txtLogin = Languages.languages[localeLanguage].Login.txtLogin;
    txtCreateAnAccount =
      Languages.languages[localeLanguage].Login.txtCreateAnAccount;
    txtRegister = Languages.languages[localeLanguage].Login.txtRegister;
    txtLoginAlert1 = Languages.languages[localeLanguage].Login.txtLoginAlert1;
    txtLoginAlert2 = Languages.languages[localeLanguage].Login.txtLoginAlert2;
    txtLoginAlert3 = Languages.languages[localeLanguage].Login.txtLoginAlert3;
    txtLoginAlert4 = Languages.languages[localeLanguage].Login.txtLoginAlert4;
    txtEnterUsername =
      Languages.languages[localeLanguage].Login.txtEnterUsername;
    txtEnterPassword =
      Languages.languages[localeLanguage].Login.txtEnterPassword;
    txtLoginAlertQuestion =
      Languages.languages[localeLanguage].Login.txtLoginAlertQuestion;
    txtAlertText1 = Languages.languages[localeLanguage].Login.txtAlertText1;
    txtAlertNo = Languages.languages[localeLanguage].Login.txtAlertNo;
    txtAlertYes = Languages.languages[localeLanguage].Login.txtAlertYes;
    txtRememberMe = Languages.languages[localeLanguage].Login.txtRememberMe;
  };

  const ExitApp = () => {
    BackHandler.exitApp();
  };

  function handleBackButtonClick() {
    ExitApp();
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

  const DefaultLogin = () => {
    setUsername('');
    setPassword('');
  };

  const GoToRegisterHandle = () => {
    DefaultLogin();
    navigation.navigate('Register');
  };

  const Spinner = () => {
    if (showSpinner == true) {
      return (
        <ActivityIndicator style={styles.spinner} size="large" color="green" />
      );
    } else {
      return <Text style={styles.spinner}></Text>;
    }
  };

  const WaitForRequest = () => {
    setShowSpinner(true);
    setTimeout(() => {
      SendRequest();
    }, 500);
  };

  const storeData = async (token) => {
    try {
      await AsyncStorage.setItem('token', token);
    } catch (e) {
      console.log(e);
    }
  }

  const removeData = async () => {
    try {
      await AsyncStorage.removeItem('token');
    } catch (e) {
      console.log(e);
    }
  }

  const SendRequest = async () => {
    if (username.length > 5) {
      if (password.length > 5) {
        fetch(MyStore.proxyRedux + '/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        })
          .then(response => {
            response.json().then(dataJson => {
              if (response.status == 200) {
                console.log('DATA: ', dataJson);
                dispatch(SetToken(dataJson.token))
                dispatch(SetId(dataJson.user.id));
                dispatch(SetUsername(dataJson.user.username));
                dispatch(SetEmail(dataJson.user.email));
                dispatch(SetLanguage(dataJson.user.language));
                dispatch(SetGender(dataJson.user.gender));
                dispatch(SetDate(dataJson.user.localDate));
                dispatch(SetTime(dataJson.user.localTime));
                dispatch(SetImagePath(dataJson.user.imagePath));
                if (rememberMe == true) {
                  storeData(dataJson.token);
                  setShowSpinner(false);
                  toast.show({
                    render: () => {
                      return (
                        <Box
                          style={styles.alertBoxFlex}
                          bg="success.300"
                          px="2"
                          py="1"
                          rounded="sm"
                          mb={5}>
                          <CheckCircleIcon
                            style={styles.toastAlertMargin}
                            name="check-circle"
                            color="emerald.500"
                          />
                          {txtLoginAlert1}
                        </Box>
                      );
                    },
                  });
                  DefaultLogin();
                  dispatch(SetContainerScreen("Home"));
                  console.log("MyStore.imagePathReduxLogin ", MyStore.imagePathRedux);
                  navigation.navigate("TabsNavigator");
                } else {
                  removeData();
                  setShowSpinner(false);
                  toast.show({
                    render: () => {
                      return (
                        <Box
                          style={styles.alertBoxFlex}
                          bg="success.300"
                          px="2"
                          py="1"
                          rounded="sm"
                          mb={5}>
                          <CheckCircleIcon
                            style={styles.toastAlertMargin}
                            name="check-circle"
                            color="emerald.500"
                          />
                          {txtLoginAlert1}
                        </Box>
                      );
                    },
                  });
                  DefaultLogin();
                  dispatch(SetContainerScreen("Home"));
                  navigation.navigate("TabsNavigator");
                }
              } else if (response.status == 401) {
                setShowSpinner(false);
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
                        {txtLoginAlert2}
                      </Box>
                    );
                  },
                });
                DefaultLogin();
              } else if (response.status == 404) {
                setShowSpinner(false);
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
                        {txtLoginAlert3}
                      </Box>
                    );
                  },
                });
                DefaultLogin();
              } else {
                setShowSpinner(false);
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
                        {txtLoginAlert4}
                      </Box>
                    );
                  },
                });
                DefaultLogin();
              }
            });
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        setShowSpinner(false);
        toast.show({
          render: () => {
            return (
              <Box
                style={styles.alertBoxFlex}
                bg="warning.300"
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
                {txtEnterPassword}
              </Box>
            );
          },
        });
      }
    } else {
      setShowSpinner(false);
      toast.show({
        render: () => {
          return (
            <Box
              style={styles.alertBoxFlex}
              bg="warning.300"
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
              {txtEnterUsername}
            </Box>
          );
        },
      });
    }
  };

  return (
    <SafeAreaView style={styles.background}>
      {SetLocaleLanguage()}
      <View style={styles.header}>
        <Text style={styles.text2}>{txtTitle}</Text>
      </View>
      <View style={styles.footer}>
        <ScrollView style={styles.scroll}>
          <Text style={[styles.text3]}>{txtUsername}</Text>
          <TextInput
            style={styles.textInput}
            placeholder={txtYourUsername}
            value={username}
            autoCorrect={false}
            autoCapitalize={'none'}
            returnKeyType={'next'}
            blurOnSubmit={false}
            onSubmitEditing={() =>
              passwordInputRef.current && passwordInputRef.current.focus()
            }
            onChangeText={text => setUsername(text)}
          />

          <Text style={[styles.text3, { marginTop: 20 }]}>{txtPassword}</Text>
          <TextInput
            style={styles.textInput}
            placeholder={txtYourPassword}
            value={password}
            returnKeyType={'done'}
            ref={passwordInputRef}
            onSubmitEditing={() => {
              Keyboard.dismiss;
              if (showSpinner == false) {
                WaitForRequest();
              }
            }}
            onChangeText={text => setPassword(text)}
            secureTextEntry={securityText}
          />

          {Spinner()}

          <View style={{
            margin: 10,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Checkbox value={rememberMe} colorScheme="info" onPress={() => {
              setRememberMe(!rememberMe);
            }} >{txtRememberMe}</Checkbox>
          </View>

          <Button style={styles.button} onPress={() => {
            if (showSpinner == false) {
              WaitForRequest();
            }
          }}>
            {txtLogin}
          </Button>
          <View style={[styles.info, { marginTop: 15 }]}>
            <Text style={styles.text3}>{txtCreateAnAccount}</Text>
          </View>
          <Button style={{ marginBottom: 35, marginTop: 15, borderRadius: 20 }} onPress={GoToRegisterHandle}>
            {txtRegister}
          </Button>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#AED6F1',
    flex: 1,
  },
  header: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 4,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '40%',
    height: '55%',
    margin: 10,
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
  textInput: {
    borderWidth: 0.5,
    borderRadius: 20,
    padding: 7,
    color: 'black',
  },
  button: {
    marginTop: 20,
    borderRadius: 20,
  },
  info: {
    justifyContent: 'center',
    alignItems: 'center',
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
  spinner: {
    marginTop: 20,
    height: 35,
    flex: 1,
  },
  scroll: {
    width: '100%',
    paddingTop: 10,
    paddingRight: 30,
    paddingLeft: 30,
  },
});

export default Login;
