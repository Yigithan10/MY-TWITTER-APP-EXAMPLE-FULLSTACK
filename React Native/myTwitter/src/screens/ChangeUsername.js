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
import {
  useToast, Box, CheckCircleIcon, WarningIcon, Button
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
  const [username, setUsername] = useState(MyStore.usernameRedux);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const toast = useToast();
  const [showSpinner, setShowSpinner] = useState(false);
  const langRedux = MyStore.languageRedux;

  const standartLength = 6;

  let ChangeUsername =
    Languages.languages[langRedux].ChangeUsernameScreen.ChangeUsername;
  let txtUsername =
    Languages.languages[langRedux].ChangeUsernameScreen.txtUsername;
  let txtNewUsername =
    Languages.languages[langRedux].ChangeUsernameScreen.txtNewUsername;
  let txtChangeUsernameAlert1 =
    Languages.languages[langRedux].ChangeUsernameScreen.txtChangeUsernameAlert1;
  let txtChangeUsernameAlert2 =
    Languages.languages[langRedux].ChangeUsernameScreen.txtChangeUsernameAlert2;
  let txtChangeUsernameAlert3 =
    Languages.languages[langRedux].ChangeUsernameScreen.txtChangeUsernameAlert3;
  let txtEnterUsername =
    Languages.languages[langRedux].ChangeUsernameScreen.txtEnterUsername;
  let txtSave = Languages.languages[langRedux].SettingsScreen.txtSave;
  let txtTurnBack = Languages.languages[langRedux].SettingsScreen.txtTurnBack;

  const DefaultChangeUsername = () => {
    setUsername('');
  };

  const GoToLoginHandle = () => {
    DefaultChangeUsername();
    navigation.goBack();
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
    if (username.length > 5) {
      fetch(
        MyStore.proxyRedux + '/users/updateOneUserForUsername/' +
        MyStore.idRedux,
        {
          method: 'PUT',
          headers: {
            'Authorization': 'Bearer ' + MyStore.tokenRedux,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
          }),
        },
      )
        .then(response => {
          response.json().then(dataJson => {
            if (response.status == 200) {
              dispatch(SetUsername(dataJson.username));
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
                      {txtChangeUsernameAlert1}
                    </Box>
                  );
                },
              });
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
                      {txtChangeUsernameAlert2}
                    </Box>
                  );
                },
              });
              DefaultChangeUsername();
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
                      {txtChangeUsernameAlert3}
                    </Box>
                  );
                },
              });
              GoToLoginHandle();
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
              {txtEnterUsername}
            </Box>
          );
        },
      });
    }
  };

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.header}>
        <Text style={styles.text2}>{ChangeUsername}</Text>
      </View>
      <View style={styles.footer}>
        <View style={styles.TextAndIcon}>
          <Text style={[styles.text3, { marginTop: 20 }]}>{txtUsername}</Text>
          {ControlUsername()}
        </View>
        <TextInput
          style={styles.textInput}
          placeholder={txtNewUsername}
          value={username}
          onChangeText={text => setUsername(text)} />

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
