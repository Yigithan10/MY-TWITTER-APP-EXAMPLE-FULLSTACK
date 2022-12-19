import React, { useState, useEffect, createRef, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  BackHandler,
  ScrollView,
  TextInput,
  Keyboard,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  useToast,
  IconButton,
  Icon,
  Avatar,
  Button,
  Box,
  WarningIcon,
  Link,
} from 'native-base';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
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
import Languages from '../../languages.json';

const SendMessage = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const toast = useToast();
  const { MyStore } = useSelector(state => state);

  let MessagesLen;

  const [sendMessage, setSendMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const [messageIdState, setMessageIdState] = useState(0);
  const [messageUsernameState, setMessageUsernameState] = useState('');
  const [messageEmailState, setMessageEmailState] = useState('');
  const [messageLanguageState, setMessageLanguageState] = useState('');
  const [messageGenderState, setMessageGenderState] = useState('');
  const [messageDateState, setMessageDateState] = useState('');
  const [messageTimeState, setMessageTimeState] = useState('');

  const [messagesLeng, setMessagesLeng] = useState(0);

  const scrollRef = useRef();

  const messageInputRef = createRef();

  const userId = MyStore.sendMessageIdRedux3;
  const userUsername = MyStore.sendMessageUsernameRedux3;
  const userEmail = MyStore.sendMessageEmailRedux3;
  const userLanguage = MyStore.sendMessageLanguageRedux3;
  const userGender = MyStore.sendMessageGenderRedux3;
  const userDate = MyStore.sendMessageDateRedux3;
  const userTime = MyStore.sendMessageTimeRedux3;

  const langRedux = MyStore.languageRedux;

  let txtEnterMessage = Languages.languages[langRedux].MessageScreen.txtEnterMessage;
  let txtMessageAlert1 = Languages.languages[langRedux].MessageScreen.txtMessageAlert1;
  let txtEnterMessage2 = Languages.languages[langRedux].HomeScreen.txtEnterMessage;

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

  const IconButtonsTurnBack = () => {
    return (
      <IconButton
        onPress={() => {
          dispatch(SetSendMessageId3(0));
          dispatch(SetSendMessageUsername3(''));
          dispatch(SetSendMessageEmail3(''));
          dispatch(SetSendMessageLanguage3(''));
          dispatch(SetSendMessageGender3(''));
          dispatch(SetSendMessageDate3(''));
          dispatch(SetSendMessageTime3(''));
          navigation.goBack();
        }}
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

  useEffect(() => {
    setMessages([]);
    SendAllMessagesRequest();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (messages.length != 0 || messages[0] != ' ') {
        onPressTouch();
      }
    }, 150);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      SendAllMessagesRequest();
      onPressTouch();
    }, 8000);
  }, [messages]);

  const onPressTouch = () => {
    scrollRef.current?.scrollToEnd({
      animated: true,
    });
  };

  useEffect(() => {
    onPressTouch();
  }, [messagesLeng])

  const SendAllMessagesRequest = () => {
    fetch(
      MyStore.proxyRedux + '/messages?userId=' +
      MyStore.idRedux +
      '&toUserId=' +
      MyStore.sendMessageIdRedux3,
      {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + MyStore.tokenRedux,
          'Content-Type': 'application/json',
        },
      },
    ).then(response => {
      response.json().then(messagesJson => {
        console.log('messagesJson', messagesJson);
        if (response.status == 200 || response.status == 201) {
          if (messagesJson.length != messagesLeng) {
            setMessagesLeng(messagesJson.length)
          }
          setMessages(messagesJson);
        }
      });
    });
  };

  const RenderAllMessages = () => {
    if (messages.length != 0) {
      return (
        <View style={styles.messagesContainer}>
          {messages[0] != ' ' &&
            messages.map(message => (
              <View key={message.id}>
                {message.user.id == MyStore.idRedux ? (
                  <View key={message.id} style={styles.messageCardRight}>
                    <View style={styles.messageCardInRight}>
                      <View style={styles.messageText}>
                        <Text style={styles.textMessage}>{message.message}</Text>
                      </View>
                      <View style={styles.messageDate}>
                        <Text style={styles.textTime}>
                          {message.localTime[0] +
                            message.localTime[1] +
                            message.localTime[2] +
                            message.localTime[3] +
                            message.localTime[4]}
                        </Text>
                      </View>
                    </View>
                  </View>
                ) : (
                  <View key={message.id} style={styles.messageCardLeft}>
                    <View style={styles.messageCardInLeft}>
                      <View style={styles.messageText}>
                        <Text style={styles.textMessage}>{message.message}</Text>
                      </View>
                      <View style={styles.messageDate}>
                        <Text style={styles.textTime}>
                          {message.localTime[0] +
                            message.localTime[1] +
                            message.localTime[2] +
                            message.localTime[3] +
                            message.localTime[4]}
                        </Text>
                      </View>
                    </View>
                  </View>
                )}
              </View>
            ))}
        </View>
      );
    } else {
      return (
        <Text style={styles.text3}>{""}</Text>
      );
    }
  };

  const SendMessageRequest = () => {
    if (sendMessage != '') {
      fetch(MyStore.proxyRedux + '/messages', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + MyStore.tokenRedux,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: MyStore.idRedux,
          toUserId: MyStore.sendMessageIdRedux3,
          message: sendMessage,
        }),
      }).then(response => {
        response.json().then(createJson => {
          if (response.status == 201 || response.status == 200) {
            console.log('The message basarili!');
            setSendMessage('');
            SendAllMessagesRequest();
            setTimeout(() => {
              onPressTouch();
            }, 150);
          } else {
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
                    {txtMessageAlert1}
                  </Box>
                );
              },
            });
          }
        });
      });
    } else {
      onPressTouch();
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
              {txtEnterMessage}
            </Box>
          );
        },
      });
    }
  };

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>{IconButtonsTurnBack()}</View>
        <Link
          onPress={() => {
            dispatch(
              SetSendMessageId1(userId),
            );
            dispatch(
              SetSendMessageUsername1(
                userUsername,
              ),
            );
            dispatch(
              SetSendMessageEmail1(userEmail),
            );
            dispatch(
              SetSendMessageLanguage1(
                userLanguage,
              ),
            );
            dispatch(
              SetSendMessageGender1(
                userGender,
              ),
            );
            dispatch(
              SetSendMessageDate1(
                userDate,
              ),
            );
            dispatch(
              SetSendMessageTime1(
                userTime,
              ),
            );
            navigation.navigate('ShowUserProfileScreen1');
          }}
          style={styles.headerMiddle}>
          {MyStore.sendMessageImagePathRedux3 != '' ? (
            <Avatar
              style={{ justifyContent: 'center', alignItems: 'center', borderWidth: 0.5, backgroundColor: '#CACFD2' }}
              size="45px"
              source={{ uri: MyStore.sendMessageImagePathRedux3 }}>
              <Text style={{ color: 'black', fontSize: 25 }}>
                {userUsername[0].toUpperCase()}
              </Text>
            </Avatar>
          )
            :
            (
              <Avatar
                style={{ justifyContent: 'center', alignItems: 'center', borderWidth: 0.5, backgroundColor: '#CACFD2' }}
                size="45px">
                <Text style={{ color: 'black', fontSize: 25 }}>
                  {userUsername[0].toUpperCase()}
                </Text>
              </Avatar>
            )}
          <Text style={styles.text2}>{userUsername}</Text>
        </Link>
        <View style={styles.headerRight}></View>
      </View>
      <View style={styles.footer}>
        <ScrollView style={styles.scroll} ref={scrollRef}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {RenderAllMessages()}
          </View>
        </ScrollView>
      </View>
      <View style={styles.down}>
        <View style={styles.downInput}>
          <TextInput
            onPressIn={() => {
              setTimeout(() => {
                onPressTouch();
              }, 200);
            }}
            style={styles.textInput}
            placeholder={txtEnterMessage2}
            value={sendMessage}
            autoCapitalize={'none'}
            blurOnSubmit={false}
            returnKeyType={'send'}
            ref={messageInputRef}
            onSubmitEditing={() => {
              SendMessageRequest();
              setTimeout(() => {
                onPressTouch();
              }, 150);
            }}
            onChangeText={text => setSendMessage(text)}></TextInput>
        </View>

        <View style={styles.downButton}>
          <Button
            onPress={() => {
              SendMessageRequest();
              setTimeout(() => {
                onPressTouch();
              }, 150);
            }}
            style={styles.button}>
            <Icon as={MaterialIcon} name="send" color={'black'} size={25} />
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    flex: 1,
  },
  headerLeft: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  headerMiddle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 3,
  },
  headerRight: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  footer: {
    backgroundColor: 'white',
    flex: 7,
  },
  down: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  downInput: {
    backgroundColor: 'white',
    width: '80%',
  },
  downButton: {
    backgroundColor: 'white',
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
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
    width: '75%',
    borderRadius: 20,
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
  scroll: {
    width: '100%',
    height: '100%',
    borderWidth: 1,
  },
  messagesContainer: {
    width: '100%',
    height: '100%',
  },
  messageCardLeft: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    margin: 5,
    borderRadius: 20,
  },
  messageCardRight: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    margin: 5,
    borderRadius: 20,
  },
  messageCardInLeft: {
    backgroundColor: '#BDC3C7',
    borderTopEndRadius: 20,
    borderTopRightRadius: 20,
    borderTopStartRadius: 0,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomEndRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomStartRadius: 20,
    minWidth: '40%',
    maxWidth: '80%',
    paddingLeft: 15,
    paddingRight: 15,
  },
  messageCardInRight: {
    backgroundColor: '#3498DB',
    borderTopEndRadius: 0,
    borderTopRightRadius: 20,
    borderTopStartRadius: 20,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomEndRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomStartRadius: 20,
    minWidth: '40%',
    maxWidth: '80%',
    paddingLeft: 15,
    paddingRight: 15,
  },
  messageText: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageDate: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  textMessage: {
    fontSize: 13,
    fontStyle: 'bold',
    color: 'black',
    margin: 5,
  },
  textTime: {
    fontSize: 9,
    fontStyle: 'bold',
    color: 'black',
    marginTop: 5,
    marginLeft: 5,
    marginBottom: 5,
  },
});

export default SendMessage;
