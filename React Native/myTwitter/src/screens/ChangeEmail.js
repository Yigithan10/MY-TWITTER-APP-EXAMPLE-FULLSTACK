import React, { useState } from 'react';
import Languages from '../../languages.json';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useToast, Box, CheckCircleIcon, WarningIcon, Button } from 'native-base';
import {
  SetId,
  SetUsername,
  SetEmail,
  SetLanguage,
  SetGender,
} from '../redux/action';

const ChangeEmail = () => {
  const { MyStore } = useSelector(state => state);
  const [email, setEmail] = useState(MyStore.emailRedux);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const toast = useToast();
  const [showSpinner, setShowSpinner] = useState(false);
  const langRedux = MyStore.languageRedux;

  const standartLengthEmail = 13;

  let ChangeEmail =
    Languages.languages[langRedux].ChangeEmailScreen.ChangeEmail;
  let txtEmail = Languages.languages[langRedux].ChangeEmailScreen.txtEmail;
  let txtNewEmail =
    Languages.languages[langRedux].ChangeEmailScreen.txtNewEmail;
  let txtChangeEmailAlert1 =
    Languages.languages[langRedux].ChangeEmailScreen.txtChangeEmailAlert1;
  let txtChangeEmailAlert2 =
    Languages.languages[langRedux].ChangeEmailScreen.txtChangeEmailAlert2;
  let txtChangeEmailAlert3 =
    Languages.languages[langRedux].ChangeEmailScreen.txtChangeEmailAlert3;
  let txtEnterEmail =
    Languages.languages[langRedux].ChangeEmailScreen.txtEnterEmail;
  let txtSave = Languages.languages[langRedux].SettingsScreen.txtSave;
  let txtTurnBack = Languages.languages[langRedux].SettingsScreen.txtTurnBack;

  const DefaultChangeEmail = () => {
    setEmail('');
  };

  const GoToLoginHandle = () => {
    DefaultChangeEmail();
    navigation.goBack();
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
    } else if (email.length < 13) {
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
    } else if (email.length >= 13) {
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
      SendChangeUsernameRequest();
    }, 1000);
  };

  const SendChangeUsernameRequest = () => {
    if (email.length > 12) {
      fetch(
        MyStore.proxyRedux + '/users/updateOneUserForEmail/' +
        MyStore.idRedux,
        {
          method: 'PUT',
          headers: {
            'Authorization': 'Bearer ' + MyStore.tokenRedux,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
          }),
        },
      )
        .then(response => {
          response.json().then(dataJson => {
            if (response.status == 200) {
              dispatch(SetEmail(dataJson.email));
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
                      {txtChangeEmailAlert1}
                    </Box>
                  );
                },
              });
              DefaultChangeEmail();
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
                      {txtChangeEmailAlert2}
                    </Box>
                  );
                },
              });
              DefaultChangeEmail();
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
                      {txtChangeEmailAlert3}
                    </Box>
                  );
                },
              });
              DefaultChangeEmail();
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
              {txtEnterEmail}
            </Box>
          );
        },
      });
    }
  };

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.header}>
        <Text style={styles.text2}>{ChangeEmail}</Text>
      </View>
      <View style={styles.footer}>
        <View style={styles.TextAndIcon}>
          <Text style={[styles.text3, { marginTop: 20 }]}>{txtEmail}</Text>
          {ControlEmail()}
        </View>
        <TextInput
          style={styles.textInput}
          placeholder={txtNewEmail}
          value={email}
          defaultValue={email}
          onChangeText={text => setEmail(text)} />

        {Spinner()}

        <View>
          <Button style={styles.button} onPress={WaitForRequest} >{txtSave}</Button>
        </View>
        <View>
          <Button style={styles.button} onPress={() => navigation.goBack()} >{txtTurnBack}</Button>
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

export default ChangeEmail;
