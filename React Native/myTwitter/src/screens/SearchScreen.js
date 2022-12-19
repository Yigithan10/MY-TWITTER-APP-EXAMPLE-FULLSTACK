import React, { useState, useEffect } from 'react';
import Languages from '../../languages.json';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  BackHandler,
  Alert,
  Platform,
  Dimensions,
  ActivityIndicator,
  TextInput
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import {
  useToast,
  VStack,
  CheckCircleIcon,
  IconButton,
  Icon,
  Heading,
  Avatar,
  ScrollView,
  AlertDialog,
  Link,
  Button,
} from 'native-base';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import ShowUserProfileScreen1 from './ShowUserProfileScreen1';
import SendMessageScreen from './SendMessageScreen';
import {
  SetSendMessageId1,
  SetSendMessageUsername1,
  SetSendMessageEmail1,
  SetSendMessageLanguage1,
  SetSendMessageGender1,
  SetSendMessageDate1,
  SetSendMessageTime1,
  SetSendMessageImagePath1,
} from '../redux/action';

const SearchScreen = () => {
  const [searchUsername, setSearchUsername] = useState('');
  const [myUsersData, setMyUsersData] = useState([]);
  const [showSpinner, setShowSpinner] = useState(true);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const toast = useToast();
  const { MyStore } = useSelector(state => state);

  const userId = MyStore.sendMessageIdRedux1;
  const userUsername = MyStore.sendMessageUsernameRedux1;
  const userEmail = MyStore.sendMessageEmailRedux1;
  const userLanguage = MyStore.sendMessageLanguageRedux1;
  const userGender = MyStore.sendMessageGenderRedux1;
  const userDate = MyStore.sendMessageDateRedux1;
  const userTime = MyStore.sendMessageTimeRedux1;

  const langRedux = MyStore.languageRedux;

  let txtLoginAlertQuestion =
    Languages.languages[langRedux].Login.txtLoginAlertQuestion;
  let txtAlertText1 = Languages.languages[langRedux].Login.txtAlertText1;
  let txtAlertNo = Languages.languages[langRedux].Login.txtAlertNo;
  let txtAlertYes = Languages.languages[langRedux].Login.txtAlertYes;

  let txtSearchScreen = Languages.languages[langRedux].SearchScreen.txtSearchScreen;
  let SearchPerson = Languages.languages[langRedux].SearchScreen.SearchPerson;

  let txtFoundUserss = Languages.languages[langRedux].SearchScreen.txtFoundUsers;
  let txtUserNotFound = Languages.languages[langRedux].SearchScreen.txtUserNotFound;
  let txtSendMessage = Languages.languages[langRedux].SearchScreen.txtSendMessage;
  let txtJanuary = Languages.languages[langRedux].SearchScreen.txtJanuary;
  let txtFebruary = Languages.languages[langRedux].SearchScreen.txtFebruary;
  let txtMarch = Languages.languages[langRedux].SearchScreen.txtMarch;
  let txtApril = Languages.languages[langRedux].SearchScreen.txtApril;
  let txtMay = Languages.languages[langRedux].SearchScreen.txtMay;
  let txtJune = Languages.languages[langRedux].SearchScreen.txtJune;
  let txtJuly = Languages.languages[langRedux].SearchScreen.txtJuly;
  let txtAugust = Languages.languages[langRedux].SearchScreen.txtAugust;
  let txtSeptember = Languages.languages[langRedux].SearchScreen.txtSeptember;
  let txtOctober = Languages.languages[langRedux].SearchScreen.txtOctober;
  let txtNovember = Languages.languages[langRedux].SearchScreen.txtNovember;
  let txtDecember = Languages.languages[langRedux].SearchScreen.txtDecember;
  let txtJoin = Languages.languages[langRedux].SearchScreen.txtJoin;
  let txtJoinYou = Languages.languages[langRedux].SearchScreen.txtJoinYou;

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

  const IconButtonsTurnBack = () => {
    return (
      <IconButton
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

  const SearchBar = () => {
    return (
      <VStack style={{ marginTop: 20 }} w="90%" space={5} alignSelf="center">
        <TextInput
          placeholder={SearchPerson}
          value={searchUsername}
          onChangeText={text => setSearchUsername(text)}
          style={{ borderWidth: 0.5, borderRadius: 20, padding: 7, color: 'black' }}
          InputLeftElement={
            <Icon
              m="2"
              ml="3"
              size="6"
              color="gray.400"
              as={<MaterialIcon name="search" />}
            />
          }
        />
      </VStack>
    );
  };

  const txtFoundUsers = () => {
    return <Heading style={{ margin: 20 }}>{txtFoundUserss}</Heading>;
  };

  useEffect(() => {
    if (searchUsername != '') {
      SendSearchUserRequest();
    } else {
      setMyUsersData([]);
    }
  }, [searchUsername]);

  useEffect(() => {
    if (MyStore.containerScreen == "Search") {
      console.log("SearchScreen");
    }
  }, [MyStore.containerScreen])

  const SendSearchUserRequest = () => {
    if (searchUsername != '') {
      fetch(
        MyStore.proxyRedux + '/users/searchContainsForUsername/' +
        searchUsername,
        {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer ' + MyStore.tokenRedux,
            'Content-Type': 'application/json',
          },
        },
      )
        .then(response => {
          response.json().then(dataJson => {
            setMyUsersData(dataJson);
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  const ShowMyData = () => {
    if (searchUsername != '') {
      if (myUsersData.length == 0) {
        return (
          <Text style={[styles.text3, { color: 'red' }]}>
            {txtUserNotFound}
          </Text>
        );
      } else {
        return ShowSearchUsers();
      }
    } else {
      return <Text style={styles.text3}>{SearchPerson}</Text>;
    }
  };

  const ShowSearchUsers = () => {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}>
        {myUsersData.map(user => (
          <View key={user.id}>
            {user.id == MyStore.idRedux ? (
              <Link
                onPress={() => {
                  dispatch(SetContainerScreen('Profile'));
                  navigation.navigate("Profile");
                }}>
                <View key={user.id} style={styles.userCard}>
                  {MyStore.imagePathRedux != '' ? (
                    <View style={styles.userCardAvatar}>
                      <Avatar
                        style={{ justifyContent: 'center', alignItems: 'center', borderWidth: 0.5, backgroundColor: '#CACFD2' }}
                        size="45px"
                        source={{ uri: MyStore.imagePathRedux }}>
                        <Text style={{ color: 'white', fontSize: 25 }}>
                          {user.username[0].toUpperCase()}
                        </Text>
                      </Avatar>
                    </View>
                  )
                    :
                    (
                      <View style={styles.userCardAvatar}>
                        <Avatar
                          style={{ justifyContent: 'center', alignItems: 'center', borderWidth: 0.5, backgroundColor: '#CACFD2' }}
                          size="45px">
                          <Text style={{ color: 'white', fontSize: 25 }}>
                            {user.username[0].toUpperCase()}
                          </Text>
                        </Avatar>
                      </View>
                    )}
                  <View style={styles.userCardAvatarText}>
                    <Text style={styles.text2}>{user.username}</Text>
                  </View>
                </View>
              </Link>
            ) : (
              <Link
                onPress={() => {
                  dispatch(SetSendMessageId1(user.id));
                  dispatch(SetSendMessageUsername1(user.username));
                  dispatch(SetSendMessageEmail1(user.email));
                  dispatch(SetSendMessageLanguage1(user.language));
                  dispatch(SetSendMessageGender1(user.gender));
                  dispatch(SetSendMessageDate1(user.localDate));
                  dispatch(SetSendMessageTime1(user.localTime));
                  dispatch(SetSendMessageImagePath1(user.imagePath));
                  navigation.navigate('ShowUserProfileScreen1');
                }}>
                <View key={user.id} style={styles.userCard}>
                  {user.imagePath != '' ? (
                    <View style={styles.userCardAvatar}>
                      <Avatar
                        style={{ justifyContent: 'center', alignItems: 'center', borderWidth: 0.5, backgroundColor: '#CACFD2' }}
                        size="45px"
                        source={{ uri: user.imagePath }}>
                        <Text style={{ color: 'white', fontSize: 25 }}>
                          {user.username[0].toUpperCase()}
                        </Text>
                      </Avatar>
                    </View>
                  )
                    :
                    (
                      <View style={styles.userCardAvatar}>
                        <Avatar
                          style={{ justifyContent: 'center', alignItems: 'center', borderWidth: 0.5, backgroundColor: '#CACFD2' }}
                          size="45px">
                          <Text style={{ color: 'white', fontSize: 25 }}>
                            {user.username[0].toUpperCase()}
                          </Text>
                        </Avatar>
                      </View>
                    )}
                  <View style={styles.userCardAvatarText}>
                    <Text style={styles.text2}>{user.username}</Text>
                  </View>
                </View>
              </Link>
            )}
          </View>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.header}>
        <Text style={styles.text2}>{txtSearchScreen}</Text>
      </View>
      <View style={styles.footer}>
        {SearchBar()}
        {txtFoundUsers()}
        <ScrollView style={styles.scroll}>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            {ShowMyData()}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 9,
    borderWidth: 1
  },
  alertBoxFlex: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
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
  scroll: {
    width: '100%',
    height: '100%',
    padding: 15,
  },
  refreshControl: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  userCard: {
    backgroundColor: '#F0F3F4',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    marginBottom: 25,
  },
  userCardAvatar: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: '35%',
    padding: 15,
  },
  userCardAvatarText: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '65%',
  },
  userScreen: {
    backgroundColor: '#F0F3F4',
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height / 1.55,
  },
  userScreenAvatarAndUsername: {
    backgroundColor: '#F0F3F4',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50%',
    borderWidth: 1,
  },
  userScreenFooter: {
    backgroundColor: '#F0F3F4',
    height: '10%',
    paddingTop: 10,
    paddingLeft: 60,
    paddingRight: 60,
  },
  userScreenTurnBackButton: {
    backgroundColor: '#F0F3F4',
    justifyContent: 'center',
    alignItems: 'center',
    height: '30%',
    borderWidth: 1,
  },
  spinner: {
    margin: 10,
    height: 50,
    width: '100%',
    flex: 1,
  },
});

export default SearchScreen;
