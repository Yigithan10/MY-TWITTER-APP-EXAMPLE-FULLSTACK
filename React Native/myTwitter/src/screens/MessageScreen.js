import React, { useState, useEffect, useRef, useCallback } from 'react';
import Languages from '../../languages.json';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  BackHandler,
  Alert,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import {
  useToast,
  IconButton,
  Icon,
  ScrollView,
  FlatList,
  Avatar,
  Box,
  HStack,
  VStack,
  Heading,
  Spacer,
  Button,
  Link,
} from 'native-base';
import {
  SetSendMessageId1,
  SetSendMessageUsername1,
  SetSendMessageEmail1,
  SetSendMessageLanguage1,
  SetSendMessageGender1,
  SetSendMessageDate1,
  SetSendMessageTime1,
  SetSendMessageImagePath1,
  SetSendMessageId2,
  SetSendMessageUsername2,
  SetSendMessageEmail2,
  SetSendMessageLanguage2,
  SetSendMessageGender2,
  SetSendMessageDate2,
  SetSendMessageTime2,
  SetSendMessageImagePath2,
  SetSendMessageId3,
  SetSendMessageUsername3,
  SetSendMessageEmail3,
  SetSendMessageLanguage3,
  SetSendMessageGender3,
  SetSendMessageDate3,
  SetSendMessageTime3,
  SetSendMessageImagePath3,
  SetShowTweetCommentsId,
  SetIsComment
} from '../redux/action';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';

const MessageScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const toast = useToast();
  const { MyStore } = useSelector(state => state);

  const [sendValue, setSendValue] = useState(0);
  const [showSpinner, setShowSpinner] = useState(false);
  const [conversation, setConversation] = useState([]);

  const [refreshing, setRefreshing] = useState(false);

  const scrollRef = useRef();

  const langRedux = MyStore.languageRedux;

  const [dialogVisible, setDialogVisible] = useState(false);
  const [email, setEmail] = useState('deneme100@gmail.com');
  const [friend, setFriend] = useState('');
  const [chats, setChats] = useState([]);

  let txtLoginAlertQuestion =
    Languages.languages[langRedux].Login.txtLoginAlertQuestion;
  let txtAlertText1 = Languages.languages[langRedux].Login.txtAlertText1;
  let txtAlertNo = Languages.languages[langRedux].Login.txtAlertNo;
  let txtAlertYes = Languages.languages[langRedux].Login.txtAlertYes;

  let txtMessageScreen =
    Languages.languages[langRedux].MessageScreen.txtMessageScreen;

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

  const onPressTouch = () => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: false,
    });
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    SendConversationRequest();
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }, []);

  //---

  const Spinner = () => {
    if (showSpinner == true) {
      return (
        <View>
          <ActivityIndicator
            style={styles.spinner}
            size="large"
            color="green"
          />
        </View>
      );
    } else {
      return <Text>{" "}</Text>;
    }
  };

  useEffect(() => {
    if (MyStore.containerScreen == "Message") {
      onRefresh();
    }
  }, [MyStore.containerScreen])

  useEffect(() => {
    if (showSpinner == false) {
      setShowSpinner(true);
      SendConversationRequest();
      onPressTouch();
      setTimeout(() => {
        setShowSpinner(false);
        setSendValue(1);
      }, 750);
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      SendConversationRequest();
    }, 5000);
  }, [conversation]);

  const SendConversationRequest = () => {
    fetch(MyStore.proxyRedux + '/conversations?userId=' + MyStore.idRedux, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + MyStore.tokenRedux,
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        response.json().then(conversationJson => {
          if (response.status == 200 || response.status == 200) {
            console.log(
              'conversationJson if bloğu 1 likes : ',
              conversationJson,
            );
            setConversation(conversationJson);
          } else {
            console.log(
              'conversationJson if bloğu 1 likes : ',
              conversationJson,
            );
            setConversation([]);
          }
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  const MyConversation = () => {
    if (showSpinner == false) {
      if (conversation.length != 0) {
        return (
          <Box>
            <FlatList
              data={conversation}
              renderItem={({ item }) => (
                <Box
                  borderBottomWidth="1"
                  _dark={{
                    borderColor: 'muted.50',
                  }}
                  borderColor="muted.800"
                  pl={['0', '4']}
                  pr={['0', '5']}
                  py="2">
                  {item.user.id == MyStore.idRedux ? (
                    <Link
                      onPress={() => {
                        console.log('toUserrrr');
                        dispatch(SetSendMessageId3(item.toUser.id));
                        dispatch(SetSendMessageUsername3(item.toUser.username));
                        dispatch(SetSendMessageEmail3(item.toUser.email));
                        dispatch(SetSendMessageLanguage3(item.toUser.language));
                        dispatch(SetSendMessageGender3(item.toUser.gender));
                        dispatch(SetSendMessageDate3(item.toUser.localDate));
                        dispatch(SetSendMessageTime3(item.toUser.localTime));
                        dispatch(SetSendMessageImagePath3(item.toUser.imagePath));
                        navigation.navigate('SendMessageScreen');
                      }}
                      space={[2, 3]}
                      justifyContent="space-between">
                      {item.toUser.imagePath != '' ? (
                        <Avatar
                          style={{ justifyContent: 'center', alignItems: 'center', borderWidth: 0.5, backgroundColor: '#CACFD2' }}
                          size="48px"
                          source={{ uri: item.toUser.imagePath }}>
                          {item.toUser.username[0].toUpperCase()}
                        </Avatar>
                      )
                        :
                        (
                          <Avatar
                            style={{ justifyContent: 'center', alignItems: 'center', borderWidth: 0.5, backgroundColor: '#CACFD2' }}
                            size="48px">
                            {item.toUser.username[0].toUpperCase()}
                          </Avatar>
                        )}
                      <VStack style={{ margin: 5 }}>
                        <Text
                          style={styles.text3}
                          _dark={{
                            color: 'warmGray.50',
                          }}
                          color="coolGray.800"
                          bold>
                          {item.toUser.username}
                        </Text>
                        <Text
                          style={[
                            styles.text5,
                            {
                              width: '100%',
                              maxWidth: '100%',
                            },
                          ]}
                          color="coolGray.600"
                          _dark={{
                            color: 'warmGray.200',
                          }}>
                          {item.message}
                        </Text>
                      </VStack>
                      <Spacer />
                      <Text
                        style={[styles.text5, { margin: 5 }]}
                        fontSize="xs"
                        _dark={{
                          color: 'warmGray.50',
                        }}
                        color="coolGray.800"
                        alignSelf="flex-start">
                        {item.localTime[0] +
                          item.localTime[1] +
                          item.localTime[2] +
                          item.localTime[3] +
                          item.localTime[4]}
                      </Text>
                    </Link>
                  ) : (
                    <Link
                      onPress={() => {
                        console.log('userrrr');
                        dispatch(SetSendMessageId3(item.user.id));
                        dispatch(SetSendMessageUsername3(item.user.username));
                        dispatch(SetSendMessageEmail3(item.user.email));
                        dispatch(SetSendMessageLanguage3(item.user.language));
                        dispatch(SetSendMessageGender3(item.user.gender));
                        dispatch(SetSendMessageDate3(item.user.localDate));
                        dispatch(SetSendMessageTime3(item.user.localTime));
                        dispatch(SetSendMessageImagePath3(item.user.imagePath));
                        navigation.navigate('SendMessageScreen');
                      }}
                      space={[2, 3]}
                      justifyContent="space-between">
                      {item.user.imagePath != '' ? (
                        <Avatar
                          style={{ justifyContent: 'center', alignItems: 'center', borderWidth: 0.5, backgroundColor: '#CACFD2' }}
                          size="48px"
                          source={{ uri: item.user.imagePath }}>
                          {item.user.username[0].toUpperCase()}
                        </Avatar>
                      )
                        :
                        (
                          <Avatar
                            style={{ justifyContent: 'center', alignItems: 'center', borderWidth: 0.5, backgroundColor: '#CACFD2' }}
                            size="48px">
                            {item.user.username[0].toUpperCase()}
                          </Avatar>
                        )}
                      <VStack style={{ margin: 5 }}>
                        <Text
                          style={styles.text3}
                          _dark={{
                            color: 'warmGray.50',
                          }}
                          color="coolGray.800"
                          bold>
                          {item.user.username}
                        </Text>
                        <Text
                          style={[
                            styles.text5,
                            {
                              width: '100%',
                              maxWidth: '100%',
                            },
                          ]}
                          color="coolGray.600"
                          _dark={{
                            color: 'warmGray.200',
                          }}>
                          {item.message}
                        </Text>
                      </VStack>
                      <Spacer />
                      <Text
                        style={[styles.text5, { margin: 5 }]}
                        fontSize="xs"
                        _dark={{
                          color: 'warmGray.50',
                        }}
                        color="coolGray.800"
                        alignSelf="flex-start">
                        {item.localTime[0] +
                          item.localTime[1] +
                          item.localTime[2] +
                          item.localTime[3] +
                          item.localTime[4]}
                      </Text>
                    </Link>
                  )}
                </Box>
              )}
              keyExtractor={item => item.id}
            />
          </Box>
        );
      } else {
        return (
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.text3}>Sohbet bulunamadi!</Text>
          </View>
        );
      }
    } else {
      return Spinner();
    }
  };

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.header}>
        <Text style={styles.text2}>{txtMessageScreen}</Text>
      </View>
      <View style={styles.footer}>
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          style={styles.refreshControl}>
          <View style={styles.scroll}>
            <MyConversation />
          </View>
        </RefreshControl>
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
  textInput: {
    borderWidth: 0.5,
    borderRadius: 20,
    padding: 7,
    color: 'black',
  },
  button: {
    borderRadius: 20,
  },
  scroll: {
    width: '100%',
    height: '100%',
    padding: 15,
    borderWidth: 1,
  },
  refreshControl: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  conversations: {
    backgroundColor: '#F0F3F4',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 15,
    marginBottom: 35,
  },
});

export default MessageScreen;
