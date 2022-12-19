import React, {useState} from 'react';
import Languages from '../../languages.json';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {
  useToast,
  Box,
  Input,
  CheckCircleIcon,
  WarningIcon,
  Radio,
  Button
} from 'native-base';
import {
  SetId,
  SetUsername,
  SetEmail,
  SetLanguage,
  SetGender,
} from '../redux/action';

const ChangeGender = () => {
  const {MyStore} = useSelector(state => state);
  const [gender, setGender] = useState(MyStore.genderRedux);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const toast = useToast();
  const [showSpinner, setShowSpinner] = useState(false);

  const [userId, setUserId] = useState(0);
  const [userUsername, setUserUsername] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userGender, setUserGender] = useState('');

  const langRedux = MyStore.languageRedux;

  let ChangeGender =
    Languages.languages[langRedux].ChangeGenderScreen.ChangeGender;
  let txtChangeGenderMale =
    Languages.languages[langRedux].ChangeGenderScreen.txtChangeGenderMale;
  let txtChangeGenderFemale =
    Languages.languages[langRedux].ChangeGenderScreen.txtChangeGenderFemale;
  let txtChangeGenderAlert1 =
    Languages.languages[langRedux].ChangeGenderScreen.txtChangeGenderAlert1;
  let txtChangeGenderAlert2 =
    Languages.languages[langRedux].ChangeGenderScreen.txtChangeGenderAlert2;
  let txtChangeGenderAlert3 =
    Languages.languages[langRedux].ChangeGenderScreen.txtChangeGenderAlert3;
  let txtChangeGenderAlert4 =
    Languages.languages[langRedux].ChangeGenderScreen.txtChangeGenderAlert4;
  let txtSave = Languages.languages[langRedux].SettingsScreen.txtSave;
  let txtTurnBack = Languages.languages[langRedux].SettingsScreen.txtTurnBack;

  const DefaultChangeGender = () => {
    setGender('');
  };

  const GoToLoginHandle = () => {
    DefaultChangeGender();
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
      SendChangeGenderRequest();
    }, 1000);
  };

  const SendChangeGenderRequest = () => {
    if (gender != '') {
      fetch(
        MyStore.proxyRedux + '/users/updateOneUserForGender/' +
          MyStore.idRedux,
        {
          method: 'PUT',
          headers: {
            'Authorization': 'Bearer ' + MyStore.tokenRedux,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            gender: gender,
          }),
        },
      )
        .then(response => {
          response.json().then(dataJson => {
            if (response.status == 200) {
              dispatch(SetGender(dataJson.gender));
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
                      {txtChangeGenderAlert1}
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
                      {txtChangeGenderAlert2}
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
                      {txtChangeGenderAlert3}
                    </Box>
                  );
                },
              });
              DefaultChangeGender();
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
              {txtChangeGenderAlert4}
            </Box>
          );
        },
      });
    }
  };

  const RadioButton = () => {
    return (
      <Radio.Group
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}
        name="myRadioGroup"
        accessibilityLabel="gender"
        value={gender}
        onChange={nextGender => {
          setGender(nextGender);
        }}>
        <View
          style={{
            marginTop: 30,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Radio value="male" my={1}>
            {txtChangeGenderMale}
          </Radio>
          <Radio style={{marginLeft: 30}} value="female" my={1}>
            {txtChangeGenderFemale}
          </Radio>
        </View>
      </Radio.Group>
    );
  };

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.header}>
        <Text style={styles.text2}>{ChangeGender}</Text>
      </View>
      <View style={styles.footer}>
        <View>{RadioButton()}</View>

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

export default ChangeGender;
