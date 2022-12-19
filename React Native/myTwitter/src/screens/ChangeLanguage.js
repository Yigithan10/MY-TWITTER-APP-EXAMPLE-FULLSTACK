import React, { useEffect, useState } from 'react';
import Languages from '../../languages.json';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import {
  useToast,
  Box,
  Center,
  Input,
  CheckCircleIcon,
  FormControl,
  CheckIcon,
  Select,
  WarningIcon,
  Button
} from 'native-base';
import {
  SetId,
  SetUsername,
  SetEmail,
  SetLanguage,
  SetGender,
} from '../redux/action';

const ChangeUsername = () => {
  const { MyStore } = useSelector(state => state);
  const [language, setLanguage] = useState(MyStore.languageRedux);
  const [languageName, setLanguageName] = useState();
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const toast = useToast();
  const [showSpinner, setShowSpinner] = useState(false);
  const langRedux = MyStore.languageRedux;

  let ChangeLanguage =
    Languages.languages[langRedux].ChangeLanguageScreen.ChangeLanguage;
  let txtChangeLanguage =
    Languages.languages[langRedux].ChangeLanguageScreen.txtChangeLanguage;
  let txtChangeLanguageAlert1 =
    Languages.languages[langRedux].ChangeLanguageScreen.txtChangeLanguageAlert1;
  let txtChangeLanguageAlert2 =
    Languages.languages[langRedux].ChangeLanguageScreen.txtChangeLanguageAlert2;
  let txtChangeLanguageAlert3 =
    Languages.languages[langRedux].ChangeLanguageScreen.txtChangeLanguageAlert3;
  let txtSave = Languages.languages[langRedux].SettingsScreen.txtSave;
  let txtTurnBack = Languages.languages[langRedux].SettingsScreen.txtTurnBack;

  const DefaultChangeLanguage = () => {
    setLanguage(language);
    if (language == 'eng') {
      setLanguageName('English');
    } else if (language == 'deu') {
      setLanguageName('Deutsch');
    } else if (language == 'fra') {
      setLanguageName('Français');
    } else if (language == 'esp') {
      setLanguageName('Español');
    } else if (language == 'ita') {
      setLanguageName('Italiano');
    } else if (language == 'por') {
      setLanguageName('Português');
    } else if (language == 'tur') {
      setLanguageName('Türkçe');
    } else if (language == 'rus') {
      setLanguageName('Русский');
    } else if (language == 'jap') {
      setLanguageName('日本');
    } else if (language == 'chi') {
      setLanguageName('中国人');
    }
  };

  useEffect(() => {
    DefaultChangeLanguage();
  });

  const GoToLoginHandle = () => {
    DefaultChangeLanguage();
    navigation.goBack();
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
      SendChangeLanguageRequest();
    }, 1000);
  };

  const SendChangeLanguageRequest = () => {
    fetch(
      MyStore.proxyRedux + '/users/updateOneUserForLanguage/' +
      MyStore.idRedux,
      {
        method: 'PUT',
        headers: {
          'Authorization': 'Bearer ' + MyStore.tokenRedux,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          language: language,
        }),
      },
    )
      .then(response => {
        response.json().then(dataJson => {
          if (response.status == 200) {
            dispatch(SetLanguage(dataJson.language));
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
                    {txtChangeLanguageAlert1}
                  </Box>
                );
              },
            });
            DefaultChangeLanguage();
            GoToLoginHandle();
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
                    {txtChangeLanguageAlert2}
                  </Box>
                );
              },
            });
            DefaultChangeLanguage();
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
                    {txtChangeLanguageAlert3}
                  </Box>
                );
              },
            });
            DefaultChangeLanguage();
          }
        });
      })
      .catch(err => {
        console.log(err);
      });
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

  const SelectButtonLanguages = () => {
    return (
      <Center>
        <FormControl w="3/4" style={styles.select}>
          <FormControl.Label style={styles.text2}>
            {txtChangeLanguage} {languageName}
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

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.header}>
        <Text style={styles.text2}>{ChangeLanguage}</Text>
      </View>
      <View style={styles.footer}>
        <Center>{SelectButtonLanguages()}</Center>

        {Spinner()}

        <View>
          <Button style={styles.button}
            onPress={WaitForRequest} >{txtSave}</Button>
        </View>
        <View>
          <Button style={styles.button}
            onPress={() => navigation.goBack()} >{txtTurnBack}</Button>
        </View>
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
    flex: 1,
    backgroundColor: 'white',
    paddingVertical: 50,
    paddingHorizontal: 50,
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
  button: {
    marginTop: 30,
    borderRadius: 20,
  },
  dropdown: {
    flex: 1,
    justifyContent: 'center',
  },
  alertBoxFlex: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
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
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: 5,
  },
  toastAlertMargin: {
    margin: 7,
  },
  spinner: {
    marginTop: 30,
    flex: 1,
  },
});

export default ChangeUsername;
