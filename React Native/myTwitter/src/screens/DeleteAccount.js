import React, { useState } from 'react';
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
import { useToast, Box, CheckCircleIcon, WarningIcon, Button } from 'native-base';

const ChangeUsername = () => {
  const navigation = useNavigation();
  const toast = useToast();
  const [showSpinner, setShowSpinner] = useState(false);
  const { MyStore } = useSelector(state => state);
  const langRedux = MyStore.languageRedux;

  let DeleteAccount =
    Languages.languages[langRedux].DeleteAccountScreen.DeleteAccount;
  let txtDeleteAccountAsk =
    Languages.languages[langRedux].DeleteAccountScreen.txtDeleteAccountAsk;
  let txtDeleteAccountYes =
    Languages.languages[langRedux].DeleteAccountScreen.txtDeleteAccountYes;
  let txtDeleteAccountCancel =
    Languages.languages[langRedux].DeleteAccountScreen.txtDeleteAccountCancel;
  let txtDeleteAccountAlert1 =
    Languages.languages[langRedux].DeleteAccountScreen.txtDeleteAccountAlert1;
  let txtDeleteAccountAlert2 =
    Languages.languages[langRedux].DeleteAccountScreen.txtDeleteAccountAlert2;
  let txtDeleteAccountAlert3 =
    Languages.languages[langRedux].DeleteAccountScreen.txtDeleteAccountAlert3;

  const GoToLoginHandle = () => {
    navigation.navigate('Login');
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
      SendDeleteAccountRequest();
    }, 2000);
  };

  const SendDeleteAccountRequest = () => {
    fetch(MyStore.proxyRedux + '/users/deleteOneUser/' + MyStore.idRedux, {
      method: 'DELETE',
    })
      .then(response => {
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
                  {txtDeleteAccountAlert1}
                </Box>
              );
            },
          });
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
                  {txtDeleteAccountAlert2}
                </Box>
              );
            },
          });
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
                  {txtDeleteAccountAlert3}
                </Box>
              );
            },
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.header}>
        <Text style={styles.text2}>{DeleteAccount}</Text>
      </View>
      <View style={styles.footer}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.text3}>{txtDeleteAccountAsk}</Text>
        </View>
        {Spinner()}

        <View>
          <Button
            style={styles.button}
            onPress={WaitForRequest} >{txtDeleteAccountYes}</Button>
        </View>
        <View>
          <Button
            style={styles.button}
            onPress={() => navigation.goBack()}
          >{txtDeleteAccountCancel}</Button>
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
  button: {
    marginTop: 30,
    borderRadius: 20,
  },
  alertBoxFlex: {
    display: 'flex',
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
