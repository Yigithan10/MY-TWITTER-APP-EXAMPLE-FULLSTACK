import React, { useEffect, useState, createRef } from 'react';
import Languages from '../../languages.json';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  NativeModules,
  Platform,
  ActivityIndicator,
  BackHandler,
  Keyboard,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  FormControl,
  Select,
  Center,
  useToast,
  Box,
  CheckIcon,
  CheckCircleIcon,
  WarningIcon,
  Radio,
  ScrollView,
  Button,
  Checkbox,
  KeyboardAvoidingView,
} from 'native-base';
import { useSelector } from 'react-redux';

const Register = () => {
  let localeLanguage;
  const localeLanguageLearn =
    Platform.OS === 'ios'
      ? NativeModules.SettingsManager.settings.AppleLocale ||
      NativeModules.SettingsManager.settings.AppleLanguages[3] //iOS 13
      : NativeModules.I18nManager.localeIdentifier;

  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [language, setLanguage] = useState('eng');
  const [languageName, setLanguageName] = useState('English');
  const [gender, setGender] = useState('');
  const { MyStore } = useSelector(state => state);

  const [acceptConditions, setAcceptConditions] = useState(false);

  const [isEmailValid, setIsEmailValid] = useState(false);

  const [securityText, setSecurityText] = useState(true);

  const toast = useToast();

  const [showSpinner, setShowSpinner] = useState(false);

  const emailInputRef = createRef();
  const passwordInputRef = createRef();

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

  const standartLength = 6;
  const standartLengthEmail = 13;

  let txtTitle;
  let txtChooseLanguage;
  let txtUsername;
  let txtYourUsername;
  let txtEmail;
  let txtYourEmail;
  let txtPassword;
  let txtYourPassword;
  let txtYourGender;
  let txtYourGenderMale;
  let txtYourGenderFemale;
  let txtSave;
  let txtTurnBack;
  let txtRegisterAlert1;
  let txtRegisterAlert2;
  let txtRegisterAlert3;
  let txtRegisterAlert4;
  let txtEnterUsername;
  let txtEnterEmail;
  let txtEnterPassword;
  let txtSelectGender;
  let txtAcceptConditions;

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

    txtTitle = Languages.languages[localeLanguage].Register.txtTitle;
    txtChooseLanguage =
      Languages.languages[localeLanguage].Register.txtChooseLanguage;
    txtUsername = Languages.languages[localeLanguage].Register.txtUsername;
    txtYourUsername =
      Languages.languages[localeLanguage].Register.txtYourUsername;
    txtEmail = Languages.languages[localeLanguage].Register.txtEmail;
    txtYourEmail = Languages.languages[localeLanguage].Register.txtYourEmail;
    txtPassword = Languages.languages[localeLanguage].Register.txtPassword;
    txtYourPassword =
      Languages.languages[localeLanguage].Register.txtYourPassword;
    txtYourGender = Languages.languages[localeLanguage].Register.txtYourGender;
    txtYourGenderMale =
      Languages.languages[localeLanguage].Register.txtYourGenderMale;
    txtYourGenderFemale =
      Languages.languages[localeLanguage].Register.txtYourGenderFemale;
    txtSave = Languages.languages[localeLanguage].Register.txtSave;
    txtTurnBack = Languages.languages[localeLanguage].Register.txtTurnBack;
    txtRegisterAlert1 =
      Languages.languages[localeLanguage].Register.txtRegisterAlert1;
    txtRegisterAlert2 =
      Languages.languages[localeLanguage].Register.txtRegisterAlert2;
    txtRegisterAlert3 =
      Languages.languages[localeLanguage].Register.txtRegisterAlert3;
    txtRegisterAlert4 =
      Languages.languages[localeLanguage].Register.txtRegisterAlert4;
    txtEnterUsername =
      Languages.languages[localeLanguage].Register.txtEnterUsername;
    txtEnterEmail = Languages.languages[localeLanguage].Register.txtEnterEmail;
    txtEnterPassword =
      Languages.languages[localeLanguage].Register.txtEnterPassword;
    txtSelectGender =
      Languages.languages[localeLanguage].Register.txtSelectGender;
      txtAcceptConditions = Languages.languages[localeLanguage].Login.txtAcceptConditions;
  };

  const DefaultRegister = () => {
    setUsername('');
    setPassword('');
    setEmail('');
    setLanguage('eng');
    setLanguageName('English');
  };

  const ControlUsername = () => {
    if (username.length == 0) {
      return (
        <View style={styles.ViewFlexText}>
          <Text style={{ marginTop: 20, marginRight: 5 }}></Text>
          <Text style={[styles.text3, { marginTop: 20 }]}>
            {username.length}/{standartLength}
          </Text>
        </View>
      );
    } else if (username.length < 6) {
      return (
        <View style={styles.ViewFlexText}>
          <WarningIcon
            style={{ marginTop: 20, marginRight: 5 }}
            CircleIcon
            name="warning-1"
            color="error.500"
          />
          <Text style={[styles.text3, { marginTop: 20 }]}>
            {username.length}/{standartLength}
          </Text>
        </View>
      );
    } else if (username.length >= 6) {
      return (
        <View style={styles.ViewFlexText}>
          <CheckCircleIcon
            style={{ marginTop: 20, marginRight: 5 }}
            name="check-circle"
            color="emerald.500"
          />
          <Text style={[styles.text3, { marginTop: 20 }]}>
            {username.length}/{standartLength}
          </Text>
        </View>
      );
    }
  };

  const ControlEmail = () => {
    if (email.length == 0) {
      return (
        <View style={styles.ViewFlexText}>
          <Text style={{ marginTop: 20, marginRight: 5 }}></Text>
          <Text style={[styles.text3, { marginTop: 20 }]}>
            {email.length}/{standartLengthEmail}
          </Text>
        </View>
      );
    } else if (email.length < 13 || isEmailValid==false) {
      return (
        <View style={styles.ViewFlexText}>
          <WarningIcon
            style={{ marginTop: 20, marginRight: 5 }}
            CircleIcon
            name="warning-1"
            color="error.500"
          />
          <Text style={[styles.text3, { marginTop: 20 }]}>
            {email.length}/{standartLengthEmail}
          </Text>
        </View>
      );
    } else if (email.length >= 13 && isEmailValid==true) {
      return (
        <View style={styles.ViewFlexText}>
          <CheckCircleIcon
            style={{ marginTop: 20, marginRight: 5 }}
            name="check-circle"
            color="emerald.500"
          />
          <Text style={[styles.text3, { marginTop: 20 }]}>
            {email.length}/{standartLengthEmail}
          </Text>
        </View>
      );
    }
  };

  const ControlPassword = () => {
    if (password.length == 0) {
      return (
        <View style={styles.ViewFlexText}>
          <Text style={{ marginTop: 20, marginRight: 5 }}></Text>
          <Text style={[styles.text3, { marginTop: 20 }]}>
            {password.length}/{standartLength}
          </Text>
        </View>
      );
    } else if (password.length < 6) {
      return (
        <View style={styles.ViewFlexText}>
          <WarningIcon
            style={{ marginTop: 20, marginRight: 5 }}
            CircleIcon
            name="warning-1"
            color="error.500"
          />
          <Text style={[styles.text3, { marginTop: 20 }]}>
            {password.length}/{standartLength}
          </Text>
        </View>
      );
    } else if (password.length >= 6) {
      return (
        <View style={styles.ViewFlexText}>
          <CheckCircleIcon
            style={{ marginTop: 20, marginRight: 5 }}
            name="check-circle"
            color="emerald.500"
          />
          <Text style={[styles.text3, { marginTop: 20 }]}>
            {password.length}/{standartLength}
          </Text>
        </View>
      );
    }
  };

  const LanguageEng = () => {
    setLanguage('eng');
    setLanguageName('English');
  };

  const LanguageDeu = () => {
    setLanguage('deu');
    setLanguageName('Deutsch');
  };

  const LanguageFra = () => {
    setLanguage('fra');
    setLanguageName('Français');
  };

  const LanguageEsp = () => {
    setLanguage('esp');
    setLanguageName('Español');
  };

  const LanguageIta = () => {
    setLanguage('ita');
    setLanguageName('Italiano');
  };

  const LanguagePor = () => {
    setLanguage('por');
    setLanguageName('Português');
  };

  const LanguageTur = () => {
    setLanguage('tur');
    setLanguageName('Türkçe');
  };

  const LanguageRus = () => {
    setLanguage('rus');
    setLanguageName('Русский');
  };

  const LanguageJap = () => {
    setLanguage('jap');
    setLanguageName('日本');
  };

  const LanguageChi = () => {
    setLanguage('chi');
    setLanguageName('中国人');
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
      SendRegisterRequest();
    }, 500);
  };

  const handleValidEmail = val => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    if (reg.test(val) === false) {
      setIsEmailValid(false);
    } else if (reg.test(val) === true) {
      setIsEmailValid(true);
    }
  };

  const SendRegisterRequest = () => {
    if (username.length > 5) {
      if (password.length > 5) {
        if (email.length > 12 && isEmailValid==true) {
          if (gender != '') {
            fetch(MyStore.proxyRedux + '/auth/register', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                username: username,
                email: email,
                password: password,
                language: language,
                gender: gender,
              }),
            })
              .then(response => {
                if (response.status == 201) {
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
                          {txtRegisterAlert1}
                        </Box>
                      );
                    },
                  });
                  DefaultRegister();
                  navigation.goBack();
                } else if (response.status == 400) {
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
                          {txtRegisterAlert2}
                        </Box>
                      );
                    },
                  });
                  DefaultRegister();
                } else if (response.status == 502) {
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
                          {txtRegisterAlert3}
                        </Box>
                      );
                    },
                  });
                  DefaultRegister();
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
                          {txtRegisterAlert4}
                        </Box>
                      );
                    },
                  });
                  DefaultRegister();
                }
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
                    {txtSelectGender}
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
                  {txtEnterEmail}
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

  const SelectButtonLanguages = () => {
    return (
      <Center>
        <FormControl w="3/4" style={styles.select}>
          <FormControl.Label style={styles.text3}>
            {txtChooseLanguage} {languageName}
          </FormControl.Label>
          <Select
            minWidth="200"
            value={languageName}
            accessibilityLabel={languageName}
            placeholder={languageName}
            _selectedItem={{
              bg: 'black',
              endIcon: <CheckIcon size={5} />,
            }}
            mt="1">
            <Select.Item label="English" value={LanguageEng} />
            <Select.Item label="Deutsch" value={LanguageDeu} />
            <Select.Item label="Français" value={LanguageFra} />
            <Select.Item label="Español" value={LanguageEsp} />
            <Select.Item label="Italiano" value={LanguageIta} />
            <Select.Item label="Português" value={LanguagePor} />
            <Select.Item label="Türkçe" value={LanguageTur} />
            <Select.Item label="Русский" value={LanguageRus} />
            <Select.Item label="日本" value={LanguageJap} />
            <Select.Item label="中国人" value={LanguageChi} />
          </Select>
        </FormControl>
      </Center>
    );
  };

  const RadioButton = () => {
    return (
      <Radio.Group
        style={{ flexDirection: 'row' }}
        name="myRadioGroup"
        accessibilityLabel="gender"
        value={gender}
        onChange={nextGender => {
          setGender(nextGender);
        }}>
        <Radio value="male" my={1}>
          {txtYourGenderMale}
        </Radio>
        <Radio style={{ marginLeft: 25 }} value="female" my={1}>
          {txtYourGenderFemale}
        </Radio>
      </Radio.Group>
    );
  };

  return (
    <SafeAreaView style={styles.background}>
      {SetLocaleLanguage()}
      <View style={styles.header}>
        <Text style={styles.text2}>{txtTitle}</Text>
      </View>

      <View style={styles.footer}>
        <ScrollView style={styles.scroll}>
          {SelectButtonLanguages()}

          <View style={styles.TextAndIcon}>
            <Text style={[styles.text3, { marginTop: 20 }]}>{txtUsername}</Text>
            {ControlUsername()}
          </View>
          <TextInput
            style={styles.textInput}
            placeholder={txtYourUsername}
            value={username}
            autoCorrect={false}
            autoCapitalize={'none'}
            returnKeyType={'next'}
            blurOnSubmit={false}
            onSubmitEditing={() =>
              emailInputRef.current && emailInputRef.current.focus()
            }
            onChangeText={text => setUsername(text)}
          />

          <View style={styles.TextAndIcon}>
            <Text style={[styles.text3, { marginTop: 20 }]}>{txtEmail}</Text>
            {ControlEmail()}
          </View>
          <TextInput
            style={styles.textInput}
            placeholder={txtYourEmail}
            value={email}
            keyboardType={'email-address'}
            returnKeyType={'next'}
            ref={emailInputRef}
            blurOnSubmit={false}
            onSubmitEditing={() => {
              Keyboard.dismiss;
              passwordInputRef.current && passwordInputRef.current.focus();
            }}
            onChangeText={text => {
              setEmail(text);
              handleValidEmail(text);
            }}
          />

          <View style={styles.TextAndIcon}>
            <Text style={[styles.text3, { marginTop: 20 }]}>{txtPassword}</Text>
            {ControlPassword()}
          </View>
          <TextInput
            style={styles.textInput}
            placeholder={txtYourPassword}
            value={password}
            returnKeyType={'done'}
            ref={passwordInputRef}
            onChangeText={text => setPassword(text)}
            secureTextEntry={securityText}
          />

          <Text
            style={[
              styles.text3,
              { justifyContent: 'center', alignItems: 'center', marginTop: 20 },
            ]}>
            {txtYourGender}
          </Text>
          <View style={styles.RadioButtons}>{RadioButton()}</View>

          {Spinner()}

          <View style={{
            margin: 10,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Checkbox value={acceptConditions} colorScheme="info" onPress={() => {
              setAcceptConditions(!acceptConditions);
            }} >{txtAcceptConditions}</Checkbox>
          </View>

          <Button
          disabled={!acceptConditions}
            style={styles.buttonSave}
            title={txtSave}
            onPress={() => {
              if (showSpinner == false && acceptConditions==true) {
                WaitForRequest();
              }
            }}>
            {txtSave}
          </Button>

          <Button
            style={{ marginBottom: 35, marginTop: 15, borderRadius: 20 }}
            onPress={() => navigation.goBack()}>
            {txtTurnBack}
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
    flex: 9,
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
  select: {
    width: '100%',
    color: 'black',
  },
  textInput: {
    borderWidth: 0.5,
    borderRadius: 20,
    padding: 7,
    color: 'black',
  },
  buttonSave: {
    marginTop: 20,
    borderRadius: 20,
  },
  buttonTurnBack: {
    marginTop: 10,
    marginBottom: 35,
    borderRadius: 20,
  },
  dropdown: {
    flex: 1,
    justifyContent: 'center',
  },
  InputAndIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  alertBoxFlex: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  TextAndIcon: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  ViewFlexText: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: 5,
  },
  toastAlertMargin: {
    margin: 7,
  },
  spinner: {
    marginTop: 20,
    height: 35,
    flex: 1,
  },
  RadioButtons: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  scroll: {
    width: '100%',
    paddingTop: 10,
    paddingRight: 30,
    paddingLeft: 30,
  },
});

export default Register;
