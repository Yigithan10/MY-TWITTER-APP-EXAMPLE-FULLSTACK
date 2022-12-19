import React, { useState } from 'react';
import Languages from '../../languages.json';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TextInput
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useToast, Box, CheckCircleIcon, WarningIcon, Button } from 'native-base';

const ChangeUsername = () => {
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const toast = useToast();
  const [showSpinner, setShowSpinner] = useState(false);
  const { MyStore } = useSelector(state => state);
  const langRedux = MyStore.languageRedux;

  const standartLength = 6;

  let ChangePassword =
    Languages.languages[langRedux].ChangePasswordScreen.ChangePassword;
  let txtPassword =
    Languages.languages[langRedux].ChangePasswordScreen.txtPassword;
  let txtNewPassword =
    Languages.languages[langRedux].ChangePasswordScreen.txtNewPassword;
  let txtChangePasswordAlert1 =
    Languages.languages[langRedux].ChangePasswordScreen.txtChangePasswordAlert1;
  let txtChangePasswordAlert2 =
    Languages.languages[langRedux].ChangePasswordScreen.txtChangePasswordAlert2;
  let txtChangePasswordAlert3 =
    Languages.languages[langRedux].ChangePasswordScreen.txtChangePasswordAlert3;
  let txtEnterPassword =
    Languages.languages[langRedux].ChangePasswordScreen.txtEnterPassword;
  let txtSave = Languages.languages[langRedux].SettingsScreen.txtSave;
  let txtTurnBack = Languages.languages[langRedux].SettingsScreen.txtTurnBack;

  const DefaultChangePassword = () => {
    setPassword('');
  };

  const GoToLoginHandle = () => {
    DefaultChangePassword();
    navigation.goBack();
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
      SendChangePasswordRequest();
    }, 1000);
  };

  const SendChangePasswordRequest = () => {
    if (password.length > 5) {
      fetch(
        MyStore.proxyRedux + '/users/updateOneUserForPassword/' +
        MyStore.idRedux,
        {
          method: 'PUT',
          headers: {
            'Authorization': 'Bearer ' + MyStore.tokenRedux,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            password: password,
          }),
        },
      )
        .then(response => {
          response.json().then(dataJson => {
            if (response.status == 200) {
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
                      {txtChangePasswordAlert1}
                    </Box>
                  );
                },
              });
              DefaultChangePassword();
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
                      {txtChangePasswordAlert2}
                    </Box>
                  );
                },
              });
              DefaultChangePassword();
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
                      {txtChangePasswordAlert3}
                    </Box>
                  );
                },
              });
              DefaultChangePassword();
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
  };

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.header}>
        <Text style={styles.text2}>{ChangePassword}</Text>
      </View>
      <View style={styles.footer}>
        <View style={styles.TextAndIcon}>
          <Text style={[styles.text3, { marginTop: 20 }]}>{txtPassword}</Text>
          {ControlPassword()}
        </View>
        <TextInput
          style={styles.textInput}
          placeholder={txtNewPassword}
          value={password}
          secureTextEntry={true}
          onChangeText={text => setPassword(text)} />

        {Spinner()}

        <View>
          <Button
            style={styles.button}
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
