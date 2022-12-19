import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  createRef,
} from 'react';
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
  Keyboard,
  TextInput,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import {
  useToast,
  Box,
  IconButton,
  Icon,
  ScrollView,
  CheckCircleIcon,
  WarningIcon,
  Button,
  Link,
  Avatar,
  Center,
  Skeleton,
  VStack
} from 'native-base';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  SetSendMessageId1,
  SetSendMessageUsername1,
  SetSendMessageEmail1,
  SetSendMessageLanguage1,
  SetSendMessageGender1,
  SetSendMessageDate1,
  SetSendMessageTime1,
  SetSendMessageId2,
  SetSendMessageUsername2,
  SetSendMessageEmail2,
  SetSendMessageLanguage2,
  SetSendMessageGender2,
  SetSendMessageDate2,
  SetSendMessageTime2,
  SetShowTweetCommentsId,
  SetIsComment,
  SetSendMessageImagePath1,
  SetContainerScreen
} from '../redux/action';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
  const [stateTweetId, setStateTweetId] = useState(0);

  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const [isSkeleton, setSkeleton] = useState(false);

  const [myTweets, setMyTweets] = useState([]);
  const [isMyTweets, setIsMyTweets] = useState([]);
  const [myLikes, setMyLikes] = useState([]);
  const [myComments, setMyComments] = useState([]);

  const [showSpinnerCreateTweet, setShowSpinnerCreateTweet] = useState(false);

  const [sendValue, setSendValue] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const [isCreatingTweet, setIsCreatingTweet] = useState(false);

  const [scrollPosition, setScrollPosition] = useState(0);

  const [tweetsLen, setTweetsLen] = useState(0);
  const [isTweetsLen, setIsTweetsLen] = useState(false);
  const [isButtonTweetsLen, setIsButtonTweetsLen] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const toast = useToast();
  const { MyStore } = useSelector(state => state);

  const [isDeleteTweet, setIsDeleteTweet] = useState(false);
  const [isUpdateTweet, setIsUpdateTweet] = useState(false);
  const [isClickUpdateTweet, setIsClickUpdateTweet] = useState(false);

  const textInputRef = createRef();
  const textUpdateInputRef = createRef();

  const scrollRef = useRef();

  const langRedux = MyStore.languageRedux;

  let txtLoginAlertQuestion =
    Languages.languages[langRedux].Login.txtLoginAlertQuestion;
  let txtAlertText1 = Languages.languages[langRedux].Login.txtAlertText1;
  let txtAlertNo = Languages.languages[langRedux].Login.txtAlertNo;
  let txtAlertYes = Languages.languages[langRedux].Login.txtAlertYes;

  let txtHomeScreen = Languages.languages[langRedux].HomeScreen.txtHomeScreen;

  let txtAskCreateTweet =
    Languages.languages[langRedux].HomeScreen.txtAskCreateTweet;
  let txtCreateTweet = Languages.languages[langRedux].HomeScreen.txtCreateTweet;
  let txtCreateTweetTitle =
    Languages.languages[langRedux].HomeScreen.txtCreateTweetTitle;
  let txtCreateTweetTitleInput =
    Languages.languages[langRedux].HomeScreen.txtCreateTweetTitleInput;
  let txtCreateTweetText =
    Languages.languages[langRedux].HomeScreen.txtCreateTweetText;
  let txtCreateTweetTextInput =
    Languages.languages[langRedux].HomeScreen.txtCreateTweetTextInput;
  let txtCreateTweetCancel =
    Languages.languages[langRedux].HomeScreen.txtCreateTweetCancel;
  let txtCreateTweetShare =
    Languages.languages[langRedux].HomeScreen.txtCreateTweetShare;

  let txtUpdateTweet = Languages.languages[langRedux].HomeScreen.txtUpdateTweet;
  let txtUpdateTweetTitle =
    Languages.languages[langRedux].HomeScreen.txtUpdateTweetTitle;
  let txtUpdateTweetTitleInput =
    Languages.languages[langRedux].HomeScreen.txtUpdateTweetTitleInput;
  let txtUpdateTweetText =
    Languages.languages[langRedux].HomeScreen.txtUpdateTweetText;
  let txtUpdateTweetTextInput =
    Languages.languages[langRedux].HomeScreen.txtUpdateTweetTextInput;

  let txtEdit = Languages.languages[langRedux].HomeScreen.txtEdit;
  let txtDelete = Languages.languages[langRedux].HomeScreen.txtDelete;
  let txtLike = Languages.languages[langRedux].HomeScreen.txtLike;
  let txtComment = Languages.languages[langRedux].HomeScreen.txtComment;
  let txtRetweet = Languages.languages[langRedux].HomeScreen.txtRetweet;
  let txtComplaint = Languages.languages[langRedux].HomeScreen.txtComplaint;
  let txtCancel = Languages.languages[langRedux].HomeScreen.txtCancel;

  let txtRetweetedByUser =
    Languages.languages[langRedux].HomeScreen.txtRetweetedByUser;
  let txtTweetNotFound =
    Languages.languages[langRedux].HomeScreen.txtTweetNotFound;

  let txtAskDeleteTweet =
    Languages.languages[langRedux].HomeScreen.txtAskDeleteTweet;
  let txtDeleteTweet = Languages.languages[langRedux].HomeScreen.txtDeleteTweet;
  let txtAskRetweetTweet =
    Languages.languages[langRedux].HomeScreen.txtAskRetweetTweet;
  let txtRetweetTweet =
    Languages.languages[langRedux].HomeScreen.txtRetweetTweet;
  let txtAskComplaintTweet =
    Languages.languages[langRedux].HomeScreen.txtAskComplaintTweet;
  let txtAskCancelComplaintTweet =
    Languages.languages[langRedux].HomeScreen.txtAskCancelComplaintTweet;
  let txtCancelComplaintTweet =
    Languages.languages[langRedux].HomeScreen.txtCancelComplaintTweet;
  let txtYes = Languages.languages[langRedux].HomeScreen.txtYes;
  let txtThereAreNewTweets = Languages.languages[langRedux].HomeScreen.txtThereAreNewTweets;

  let txtAlertDelete1 =
    Languages.languages[langRedux].HomeScreen.txtAlertDelete1;
  let txtAlertDelete2 =
    Languages.languages[langRedux].HomeScreen.txtAlertDelete2;
  let txtAlertTweet1 = Languages.languages[langRedux].HomeScreen.txtAlertTweet1;
  let txtAlertTweet2 = Languages.languages[langRedux].HomeScreen.txtAlertTweet2;
  let txtAlertComplaint1 =
    Languages.languages[langRedux].HomeScreen.txtAlertComplaint1;
  let txtAlertComplaint2 =
    Languages.languages[langRedux].HomeScreen.txtAlertComplaint2;
  let txtAlertComplaint3 =
    Languages.languages[langRedux].HomeScreen.txtAlertComplaint3;
  let txtAlertComplaint4 =
    Languages.languages[langRedux].HomeScreen.txtAlertComplaint4;
  let txtAlertRetweet1 =
    Languages.languages[langRedux].HomeScreen.txtAlertRetweet1;
  let txtAlertRetweet2 =
    Languages.languages[langRedux].HomeScreen.txtAlertRetweet2;
  let txtAlertRetweet3 =
    Languages.languages[langRedux].HomeScreen.txtAlertRetweet3;
  let txtAlertCancelComplaint1 =
    Languages.languages[langRedux].HomeScreen.txtAlertCancelComplaint1;
  let txtAlertCancelComplaint2 =
    Languages.languages[langRedux].HomeScreen.txtAlertCancelComplaint2;
  let txtAlertCancelUpdate1 =
    Languages.languages[langRedux].HomeScreen.txtAlertCancelUpdate1;
  let txtAlertCancelUpdate2 =
    Languages.languages[langRedux].HomeScreen.txtAlertCancelUpdate2;
  let txtAlertCancelTitleEmpty1 =
    Languages.languages[langRedux].HomeScreen.txtAlertCancelTitleEmpty1;
  let txtAlertCancelTextEmpty1 =
    Languages.languages[langRedux].HomeScreen.txtAlertCancelTextEmpty1;
  let txtNotFoundTweet =
    Languages.languages[langRedux].HomeScreen.txtNotFoundTweet;
  let txtNotFoundComplaint =
    Languages.languages[langRedux].HomeScreen.txtNotFoundComplaint;

  function handleRetweetButton(retweetTitle, retweetText, retweetId, tweetId) {
    Alert.alert(txtAskRetweetTweet, txtRetweetTweet, [
      {
        text: txtAlertNo,
      },
      {
        text: txtAlertYes,
        onPress: () => {
          SendSaveRetweetRequest(retweetTitle, retweetText, retweetId, tweetId);
        },
      },
    ]);
    return true;
  }

  function DeleteTweet(tweetId, tweetRetweetId) {
    Alert.alert(txtAskDeleteTweet, txtDeleteTweet, [
      {
        text: txtAlertNo,
      },
      { text: txtAlertYes, onPress: () => SendDeleteTweetRequest(tweetId, tweetRetweetId) },
    ]);
    return true;
  }

  function handleComplaintButton(tweetId) {
    Alert.alert(txtAskComplaintTweet, txtAskCancelComplaintTweet, [
      {
        text: txtAlertNo,
      },
      {
        text: txtAlertYes,
        onPress: () => {
          SendSaveComplaintRequest(tweetId);
        },
      },
    ]);
    return true;
  }

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
    setIsButtonTweetsLen(false);
    scrollRef.current?.scrollTo({
      y: 0,
      animated: false,
    });
  };

  const IconButtonsDelete = (tweetId, tweetRetweetId) => {
    return (
      <IconButton
        onPress={() => {
          DeleteTweet(tweetId, tweetRetweetId);
        }}
        icon={<Icon as={MaterialIcon} name="delete" />}
        style={{ marginRight: 7 }}
        color={'black'}
        size={30}
        _icon={{
          color: 'black',
          size: 'md',
        }}
        _hover={{
          bg: 'coolGray.800:alpha.20',
        }}
        _pressed={{
          bg: 'coolGray.800:alpha.20',
          _icon: {
            name: 'delete',
          },
          _ios: {
            _icon: {
              size: 'md',
            },
          },
        }}
        _ios={{
          _icon: {
            size: 'md',
          },
        }}
      />
    );
  };

  const IconButtonsEdit = (tweetId, tweetTitle, tweetText) => {
    return (
      <IconButton
        onPress={() => {
          setStateTweetId(tweetId);
          setTitle(tweetTitle);
          setText(tweetText);
          setIsClickUpdateTweet(true);
        }}
        icon={<Icon as={MaterialIcon} name="edit" />}
        style={{ marginLeft: 7 }}
        color={'black'}
        size={30}
        _icon={{
          color: 'black',
          size: 'md',
        }}
        _hover={{
          bg: 'coolGray.800:alpha.20',
        }}
        _pressed={{
          bg: 'coolGray.800:alpha.20',
          _icon: {
            name: 'edit',
          },
          _ios: {
            _icon: {
              size: 'md',
            },
          },
        }}
        _ios={{
          _icon: {
            size: 'md',
          },
        }}
      />
    );
  };

  const IconButtonsComplaint = tweetId => {
    return (
      <IconButton
        onPress={() => {
          handleComplaintButton(tweetId);
        }}
        icon={<Icon as={MaterialIcon} name="block" />}
        color={'black'}
        size={30}
        _icon={{
          color: 'black',
          size: 'md',
        }}
        _hover={{
          bg: 'coolGray.800:alpha.20',
        }}
        _pressed={{
          bg: 'coolGray.800:alpha.20',
          _icon: {
            name: 'block',
          },
          _ios: {
            _icon: {
              size: 'md',
            },
          },
        }}
        _ios={{
          _icon: {
            size: 'md',
          },
        }}
      />
    );
  };

  const IconButtonsRetweet = (retweetTitle, retweetText, retweetId, tweetId) => {
    return (
      <IconButton
        onPress={() => {
          handleRetweetButton(retweetTitle, retweetText, retweetId, tweetId);
        }}
        icon={<Icon as={Entypo} name="retweet" />}
        color={'black'}
        size={30}
        _icon={{
          color: 'black',
          size: 'md',
        }}
        _hover={{
          bg: 'coolGray.800:alpha.20',
        }}
        _pressed={{
          bg: 'coolGray.800:alpha.20',
          _icon: {
            name: 'retweet',
          },
          _ios: {
            _icon: {
              size: 'md',
            },
          },
        }}
        _ios={{
          _icon: {
            size: 'md',
          },
        }}
      />
    );
  };

  const IconButtonsUp = () => {
    if (scrollPosition == 0) {
      return null;
    } else {
      return (
        <IconButton
          onPress={() => {
            onPressTouch();
          }}
          icon={<Icon as={AntDesign} name="up" />}
          color={'darkgreen'}
          size={30}
          _icon={{
            color: 'darkgreen',
            size: '2xl',
          }}
          _hover={{
            bg: 'coolGray.800:alpha.20',
          }}
          _pressed={{
            bg: 'coolGray.800:alpha.20',
            _icon: {
              name: 'edit',
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
    }
  };

  const DefaultCreateTweet = () => {
    setTitle('');
    setText('');
  };

  const WaitSkeleton = () => {
    setSkeleton(true);
    SendMyTweetsRequest();
    onPressTouch();
    setTimeout(() => {
      setSkeleton(false);
    }, 750);
  }

  useEffect(() => {
    if (MyStore.containerScreen == "Home") {
      console.log("MyStore.imagePathReduxHome ", MyStore.imagePathRedux);
      console.log("MyStore.tokenRedux", MyStore.tokenRedux);
      SendMyTweetsRequest();
    }
  }, [MyStore.containerScreen])

  useEffect(() => {
    if (isSkeleton == false) {
      setSkeleton(true);
      SendMyTweetsRequest();
      onPressTouch();
      setTimeout(() => {
        setSkeleton(false);
        setSendValue(1);
      }, 500);
    }
  }, []);

  useEffect(() => {
    if (MyStore.isComment != 0) {
      SendMyTweetsRequest();
      dispatch(SetShowTweetCommentsId(0));
      dispatch(SetIsComment(0));
    }
  }, [MyStore.isComment])

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setSkeleton(true);
    SendMyTweetsRequest();
    setTimeout(() => {
      setRefreshing(false);
      setSkeleton(false);
    }, 500);
  }, []);

  const SpinnerCreateTweet = () => {
    if (showSpinnerCreateTweet == true) {
      return (
        <ActivityIndicator style={styles.spinner} size="large" color="green" />
      );
    } else {
      return <Text style={styles.spinner}></Text>;
    }
  };

  const SendMyTweetsRequest = () => {
    fetch(MyStore.proxyRedux + '/tweets', {
      method: 'GET',
      headers:{
        'Authorization': 'Bearer ' + MyStore.tokenRedux,
      }
    })
      .then(response => {
        response.json().then(dataJson => {
          dataJson.reverse();
          if (tweetsLen < dataJson.length && tweetsLen != 0) {
            setIsTweetsLen(true);
            setIsMyTweets(dataJson);
          } else {
            setTweetsLen(dataJson.length);
            setIsButtonTweetsLen(false);
            setIsTweetsLen(false);
            console.log('homescreen dataJson', dataJson);
            setMyTweets(dataJson);
          }
          dataJson.map(tweet => {
            SendGetMyLikes(tweet.id);
          });
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  const SendGetMyLikes = tweetId => {
    fetch(MyStore.proxyRedux + '/likes/likes/' + tweetId, {
      method: 'GET',
      headers:{
        'Authorization': 'Bearer ' + MyStore.tokenRedux,
      }
    })
      .then(response => {
        response.json().then(likesJson => {
          if (response.status == 200) {
            console.log('likesJson if bloğu 1 likes : ', likesJson);
            return setMyLikes(likesJson);
          } else {
            console.log('likesJson if bloğu 2 likes : ', likesJson);
            return setMyLikes([]);
          }
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  const SendCreateLike = (tweetId, userId) => {
    fetch(MyStore.proxyRedux + '/likes', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + MyStore.tokenRedux,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tweetId: tweetId,
        userId: userId,
      }),
    })
      .then(response => {
        response.json().then(createJson => {
          SendMyTweetsRequest();
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  const CreateTweet = () => {
    if (isCreatingTweet == true) {
      return (
        <View style={styles.createTweet}>
          <View style={styles.createTweetTitle}>
            <Text style={styles.text2}>{txtCreateTweet}</Text>
          </View>
          <View style={styles.createTweetInputTitle}>
            <Text style={styles.text3}>{txtCreateTweetTitle}</Text>
            <TextInput
              style={styles.textInput}
              placeholder={txtCreateTweetTitleInput}
              value={title}
              returnKeyType={'next'}
              blurOnSubmit={false}
              onSubmitEditing={() => {
                textInputRef.current && textInputRef.current.focus();
              }}
              onChangeText={text => setTitle(text)}></TextInput>
          </View>
          <View style={styles.createTweetInputText}>
            <Text style={styles.text3}>{txtCreateTweetText}</Text>
            <TextInput
              style={styles.textInput}
              placeholder={txtCreateTweetTextInput}
              value={text}
              returnKeyType={'done'}
              ref={textInputRef}
              onSubmitEditing={() => {
                Keyboard.dismiss;
                setShowSpinnerCreateTweet(true);
                SendSaveTweetRequest();
              }}
              onChangeText={text => setText(text)}></TextInput>
          </View>
          {SpinnerCreateTweet()}
          <View style={styles.MyButtons}>
            <View style={styles.cancelButton}>
              <Button
                style={styles.button}
                onPress={() => {
                  setShowSpinnerCreateTweet(false);
                  setIsCreatingTweet(false);
                }}>
                {txtCreateTweetCancel}
              </Button>
            </View>
            <View style={styles.shareButton}>
              <Button
                style={styles.button}
                onPress={() => {
                  setShowSpinnerCreateTweet(true);
                  SendSaveTweetRequest();
                  onRefresh();
                }}>
                {txtCreateTweetShare}
              </Button>
            </View>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.createTweet}>
          <View>
            <Text style={styles.text3}>{txtAskCreateTweet}</Text>
            <Button
              startIcon={
                <Icon as={Ionicons} name="ios-create-outline" size={25} />
              }
              style={styles.button}
              onPress={() => setIsCreatingTweet(true)}>
              {txtCreateTweet}
            </Button>
          </View>
        </View>
      );
    }
  };

  const SendUpdateTweetRequest = () => {
    if (isDeleteTweet == false) {
      if (title != '') {
        if (text != '') {
          setIsUpdateTweet(true);
          fetch(MyStore.proxyRedux + '/tweets/' + stateTweetId, {
            method: 'PUT',
            headers: {
              'Authorization': 'Bearer ' + MyStore.tokenRedux,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              title: title,
              text: text,
            }),
          })
            .then(response => {
              if (response.status == 200) {
                setIsUpdateTweet(false);
                setIsClickUpdateTweet(false);
                setShowSpinnerCreateTweet(false);
                DefaultCreateTweet();
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
                        {txtAlertCancelUpdate1}
                      </Box>
                    );
                  },
                });
                onRefresh();
              } else {
                setIsUpdateTweet(false);
                setIsClickUpdateTweet(false);
                setShowSpinnerCreateTweet(false);
                DefaultCreateTweet();
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
                        {txtAlertCancelUpdate2}
                      </Box>
                    );
                  },
                });
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          setShowSpinnerCreateTweet(false);
          DefaultCreateTweet();
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
                  {txtAlertCancelTextEmpty1}
                </Box>
              );
            },
          });
        }
      } else {
        setShowSpinnerCreateTweet(false);
        DefaultCreateTweet();
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
                {txtAlertCancelTitleEmpty1}
              </Box>
            );
          },
        });
      }
    }
  };

  const SendSaveComplaintRequest = tweetId => {
    fetch(MyStore.proxyRedux + '/complaints', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + MyStore.tokenRedux,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tweetId: tweetId,
        userId: MyStore.idRedux,
      }),
    })
      .then(response => {
        if (response.status == 201) {
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
                  {txtAlertComplaint1}
                </Box>
              );
            },
          });
        } else if (response.status == 400) {
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
                  {txtAlertComplaint2}
                </Box>
              );
            },
          });
        } else if (response.status == 502) {
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
                  {txtAlertComplaint3}
                </Box>
              );
            },
          });
        } else {
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
                  {txtAlertComplaint4}
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

  const favoriteButtonColor = tweetId => {
    return myLikes.find(
      like => like.user.id === MyStore.idRedux && like.tweet.id === tweetId,
    )
      ? 'darkred'
      : 'black';
  };

  const RenderMyTweets = () => {
    if (myTweets.length == 0) {
      if (isSkeleton == false) {
        return (
          <View style={styles.tweetsPlace}>
            <Text style={styles.text2}>{txtNotFoundTweet}</Text>
          </View>
        );
      }
    } else if (isSkeleton == true) {
      return (
        <Center w="100%">
          <VStack style={{ padding: 20 }} w="90%" maxW="400" borderWidth="1" space={8} overflow="hidden" rounded="md" _dark={{
            borderColor: "coolGray.500"
          }} _light={{
            borderColor: "coolGray.200"
          }}>
            <View style={{
              flexDirection: 'row'
            }}>
              <View style={{ width: '60%', alignItems: 'flex-start' }}>
                <Skeleton h="3" flex="2" rounded="full" />
              </View>
              <View style={{ width: '20%', alignItems: 'flex-end' }}>
                <Skeleton size="5" rounded="full" />
              </View>
              <View style={{ width: '20%', alignItems: 'flex-end' }}>
                <Skeleton size="5" rounded="full" />
              </View>
            </View>
            <Skeleton.Text px="1" />
            <Skeleton.Text px="1" />
            <View style={{
              flexDirection: 'row'
            }}>
              <View style={{ width: '25%', justifyContent: 'flex-end' }}>
                <Skeleton size="5" rounded="full" />
              </View>
              <View style={{ width: '25%', justifyContent: 'flex-end' }}>
                <Skeleton size="5" rounded="full" />
              </View>
              <View style={{ width: '25%', justifyContent: 'flex-end' }}>
                <Skeleton size="5" rounded="full" />
              </View>
              <View style={{ width: '25%', justifyContent: 'flex-end' }}>
                <Skeleton style={{ margin: 5 }} h="3" flex="2" rounded="full" />
                <Skeleton style={{ margin: 5 }} h="3" flex="2" rounded="full" />
              </View>
            </View>
          </VStack>
        </Center>
      );
    } else {
      if (isSkeleton == false) {
        return (
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 35,
            }}>
            {CreateTweet()}
            {myTweets.map(tweet => (
              <View key={tweet.id} style={styles.tweetCard}>
                {tweet.retweetUser.id != tweet.user.id && (
                  <View style={styles.tweetCardUpRetweet}>
                    {tweet.retweetUser.id == MyStore.idRedux ? (
                      <View style={styles.tweetCardUpRetweet}>
                        <Icon
                          as={Entypo}
                          style={{ color: 'black' }}
                          size={30}
                          name="retweet"
                        />
                        {MyStore.languageRedux == 'tur' ? (
                          <View style={styles.tweetCardUpRetweet}>
                            <Link
                              onPress={() => {
                                dispatch(SetContainerScreen('Profile'));
                                navigation.navigate('Profile');
                              }}>
                              <Text
                                style={[
                                  styles.text4,
                                  { fontStyle: 'italic', margin: 0 },
                                ]}>
                                {' ' + tweet.retweetUser.username}
                              </Text>
                            </Link>
                            <Text style={[styles.text4, { margin: 0 }]}>
                              {txtRetweetedByUser}
                            </Text>
                          </View>
                        ) : (
                          <View style={styles.tweetCardUpRetweet}>
                            <Text style={[styles.text4, { margin: 0 }]}>
                              {txtRetweetedByUser}
                            </Text>
                            <Link
                              onPress={() => {
                                navigation.navigate('Profile');
                              }}>
                              <Text
                                style={[
                                  styles.text4,
                                  { fontStyle: 'italic', margin: 0 },
                                ]}>
                                {' ' + tweet.retweetUser.username}
                              </Text>
                            </Link>
                          </View>
                        )}
                      </View>
                    ) : (
                      <View style={styles.tweetCardUpRetweet}>
                        <Icon
                          as={Entypo}
                          style={{ color: 'black' }}
                          size={30}
                          name="retweet"
                        />
                        {MyStore.languageRedux == 'tur' ? (
                          <View style={styles.tweetCardUpRetweet}>
                            <Link
                              onPress={() => {
                                dispatch(
                                  SetSendMessageId1(tweet.retweetUser.id),
                                );
                                dispatch(
                                  SetSendMessageUsername1(
                                    tweet.retweetUser.username,
                                  ),
                                );
                                dispatch(
                                  SetSendMessageEmail1(tweet.retweetUser.email),
                                );
                                dispatch(
                                  SetSendMessageLanguage1(
                                    tweet.retweetUser.language,
                                  ),
                                );
                                dispatch(
                                  SetSendMessageGender1(
                                    tweet.retweetUser.gender,
                                  ),
                                );
                                dispatch(
                                  SetSendMessageDate1(
                                    tweet.retweetUser.localDate,
                                  ),
                                );
                                dispatch(
                                  SetSendMessageTime1(
                                    tweet.retweetUser.localTime,
                                  ),
                                );
                                dispatch(SetSendMessageImagePath1(tweet.retweetUser.imagePath));
                                navigation.navigate('ShowUserProfileScreen1');
                              }}>
                              <Text
                                style={[
                                  styles.text4,
                                  { fontStyle: 'italic', margin: 0 },
                                ]}>
                                {tweet.retweetUser.username}
                              </Text>
                            </Link>
                            <Text style={[styles.text4, { margin: 0 }]}>
                              {txtRetweetedByUser}
                            </Text>
                          </View>
                        ) : (
                          <View style={styles.tweetCardUpRetweet}>
                            <Text style={[styles.text4, { margin: 0 }]}>
                              {txtRetweetedByUser}
                            </Text>
                            <Link
                              onPress={() => {
                                dispatch(
                                  SetSendMessageId1(tweet.retweetUser.id),
                                );
                                dispatch(
                                  SetSendMessageUsername1(
                                    tweet.retweetUser.username,
                                  ),
                                );
                                dispatch(
                                  SetSendMessageEmail1(tweet.retweetUser.email),
                                );
                                dispatch(
                                  SetSendMessageLanguage1(
                                    tweet.retweetUser.language,
                                  ),
                                );
                                dispatch(
                                  SetSendMessageGender1(
                                    tweet.retweetUser.gender,
                                  ),
                                );
                                dispatch(
                                  SetSendMessageDate1(
                                    tweet.retweetUser.localDate,
                                  ),
                                );
                                dispatch(
                                  SetSendMessageTime1(
                                    tweet.retweetUser.localTime,
                                  ),
                                );
                                dispatch(SetSendMessageImagePath1(tweet.retweetUser.imagePath));
                                onRefresh();
                                navigation.navigate('ShowUserProfileScreen1');
                              }}>
                              <Text
                                style={[
                                  styles.text4,
                                  { fontStyle: 'italic', margin: 0 },
                                ]}>
                                {tweet.retweetUser.username}
                              </Text>
                            </Link>
                          </View>
                        )}
                      </View>
                    )}
                  </View>
                )}
                <View style={styles.tweetCardUp}>
                  {tweet.user.id == MyStore.idRedux ? (
                    <Link
                      style={styles.tweetCardUpLeft}
                      onPress={() => {
                        navigation.navigate('Profile');
                      }}>
                      {MyStore.imagePathRedux != '' ? (
                        <Avatar
                          style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderWidth: 0.5,
                            backgroundColor: '#CACFD2'
                          }}
                          size="45px"
                          source={{ uri: MyStore.imagePathRedux }}>
                          <Text style={{ color: 'white', fontSize: 25 }}>
                            {tweet.user.username[0].toUpperCase()}
                          </Text>
                        </Avatar>
                      )
                        :
                        (
                          <Avatar
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                              borderWidth: 0.5,
                              backgroundColor: '#CACFD2'
                            }}
                            size="45px">
                            <Text style={{ color: 'white', fontSize: 25 }}>
                              {tweet.user.username[0].toUpperCase()}
                            </Text>
                          </Avatar>
                        )}
                      <Text style={styles.text3}>{tweet.user.username}</Text>
                    </Link>
                  ) : (
                    <Link
                      style={styles.tweetCardUpLeft}
                      onPress={() => {
                        dispatch(SetSendMessageId1(tweet.user.id));
                        dispatch(SetSendMessageUsername1(tweet.user.username));
                        dispatch(SetSendMessageEmail1(tweet.user.email));
                        dispatch(SetSendMessageLanguage1(tweet.user.language));
                        dispatch(SetSendMessageGender1(tweet.user.gender));
                        dispatch(SetSendMessageDate1(tweet.user.localDate));
                        dispatch(SetSendMessageTime1(tweet.user.localTime));
                        dispatch(SetSendMessageImagePath1(tweet.user.imagePath));
                        navigation.navigate('ShowUserProfileScreen1');
                      }}>
                      {tweet.user.imagePath != '' ? (
                        <Avatar
                          style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderWidth: 0.5,
                            backgroundColor: '#CACFD2'
                          }}
                          size="45px"
                          source={{ uri: tweet.user.imagePath }}>
                          <Text style={{ color: 'white', fontSize: 25 }}>
                            {tweet.user.username[0].toUpperCase()}
                          </Text>
                        </Avatar>
                      )
                        :
                        (
                          <Avatar
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                              borderWidth: 0.5,
                              backgroundColor: '#CACFD2'
                            }}
                            size="45px">
                            <Text style={{ color: 'white', fontSize: 25 }}>
                              {tweet.user.username[0].toUpperCase()}
                            </Text>
                          </Avatar>
                        )}
                      <Text style={styles.text3}>{tweet.user.username}</Text>
                    </Link>
                  )}
                  <View style={styles.tweetCardUpRight1}>
                    {tweet.user.id == MyStore.idRedux &&
                      tweet.retweetUser.id == MyStore.idRedux ? (
                      <View
                        style={{
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        {IconButtonsEdit(tweet.id, tweet.title, tweet.text)}
                        <Text style={styles.text6}>{txtEdit}</Text>
                      </View>
                    ) : (
                      <View
                        style={{
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}></View>
                    )}
                  </View>
                  <View style={styles.tweetCardUpRight2}>
                    {tweet.user.id == MyStore.idRedux ? (
                      <View
                        style={{
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        {IconButtonsDelete(tweet.id, tweet.retweetId)}
                        <Text style={[styles.text6, { marginRight: 13 }]}>
                          {txtDelete}
                        </Text>
                      </View>
                    ) : (
                      <View
                        style={{
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        {IconButtonsComplaint(tweet.id)}
                        <Text style={styles.text6}>{txtComplaint}</Text>
                      </View>
                    )}
                  </View>
                </View>
                <View style={styles.tweetCardTitle}>
                  <Text style={styles.text5}>{tweet.title}</Text>
                </View>
                <View style={styles.tweetCardText}>
                  <Text style={styles.text5}>{tweet.text}</Text>
                </View>
                <View style={styles.tweetCardDown}>
                  <View style={styles.favoriteButton}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <IconButton
                        onPress={() => {
                          SendCreateLike(tweet.id, MyStore.idRedux);
                        }}
                        _icon={{
                          id: 'favorite',
                          color: favoriteButtonColor(tweet.id),
                          size: 'md',
                        }}
                        icon={<Icon as={AntDesign} name="heart" />}
                        size={30}
                        _hover={{
                          bg: 'coolGray.800:alpha.20',
                        }}
                        _pressed={{
                          bg: 'coolGray.800:alpha.20',
                          _icon: {
                            name: 'heart',
                          },
                          _ios: {
                            _icon: {
                              size: 'md',
                            },
                          },
                        }}
                        _ios={{
                          _icon: {
                            size: 'md',
                          },
                        }}
                      />
                      <Text style={styles.text4}>{tweet.likes}</Text>
                    </View>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text style={[styles.text6]}>{txtLike}</Text>
                    </View>
                  </View>
                  <View style={styles.commentButton}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <IconButton
                        onPress={() => {
                          dispatch(SetShowTweetCommentsId(tweet.id));
                          navigation.navigate('TweetComments');
                        }}
                        icon={<Icon as={FontAwesome} name="comment" />}
                        color={'black'}
                        size={30}
                        _icon={{
                          color: 'black',
                          size: 'md',
                        }}
                        _hover={{
                          bg: 'coolGray.800:alpha.20',
                        }}
                        _pressed={{
                          bg: 'coolGray.800:alpha.20',
                          _icon: {
                            name: 'comment',
                          },
                          _ios: {
                            _icon: {
                              size: 'md',
                            },
                          },
                        }}
                        _ios={{
                          _icon: {
                            size: 'md',
                          },
                        }}
                      />
                      <Text style={styles.text4}>{tweet.comments}</Text>
                    </View>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text style={[styles.text6]}>{txtComment}</Text>
                    </View>
                  </View>
                  {tweet.user.id != MyStore.idRedux && tweet.retweetUser.id != MyStore.idRedux ? (
                    <View style={styles.retweetButton}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        {IconButtonsRetweet(
                          tweet.title,
                          tweet.text,
                          tweet.retweetUser.id,
                          tweet.id,
                        )}
                        <Text style={styles.text4}>{tweet.retweets}</Text>
                      </View>
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text style={[styles.text6]}>{txtRetweet}</Text>
                      </View>
                    </View>
                  ) : (
                    <View style={styles.retweetButton}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <IconButton
                          icon={<Icon as={Entypo} name="retweet" color={'black'} size={'md'} />}
                          color={'black'}
                          size={30}
                          disabled={true}
                        />
                        <Text style={styles.text4}>{tweet.retweets}</Text>
                      </View>
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text style={[styles.text6]}>{txtRetweet}</Text>
                      </View>
                    </View>
                  )}
                  <View style={styles.tweetDate}>
                    <Text style={styles.text6}>
                      {tweet.localTime[0] +
                        tweet.localTime[1] +
                        tweet.localTime[2] +
                        tweet.localTime[3] +
                        tweet.localTime[4]}
                    </Text>
                    <Text style={styles.text6}>
                      {tweet.localDate[8] + tweet.localDate[9]}/
                      {tweet.localDate[5] + tweet.localDate[6]}/
                      {tweet.localDate[0] +
                        tweet.localDate[1] +
                        tweet.localDate[2] +
                        tweet.localDate[3]}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        );
      }
    }
  };

  const SendSaveRetweetRequest = (retweetTitle, retweetText, retweetId, tweetId) => {
    fetch(MyStore.proxyRedux + '/tweets/retweet', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + MyStore.tokenRedux,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: retweetTitle,
        text: retweetText,
        userId: MyStore.idRedux,
        retweetUserId: retweetId,
        retweetId: tweetId
      }),
    })
      .then(response => {
        response.json().then(dataJson => {
          if (response.status == 201) {
            setShowSpinnerCreateTweet(false);
            DefaultCreateTweet();
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
                    {txtAlertRetweet1}
                  </Box>
                );
              },
            });
          } else if (response.status == 502) {
            setShowSpinnerCreateTweet(false);
            DefaultCreateTweet();
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
                    {txtAlertRetweet2}
                  </Box>
                );
              },
            });
          } else {
            setShowSpinnerCreateTweet(false);
            DefaultCreateTweet();
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
                    {txtAlertRetweet3}
                  </Box>
                );
              },
            });
          }
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  const SendSaveTweetRequest = () => {
    if (title != '') {
      if (text != '') {
        fetch(MyStore.proxyRedux + '/tweets', {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer ' + MyStore.tokenRedux,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: title,
            text: text,
            userId: MyStore.idRedux,
            retweetUserId: MyStore.idRedux,
          }),
        })
          .then(response => {
            response.json().then(dataJson => {
              if (response.status == 201) {
                setIsCreatingTweet(false);
                setIsUpdateTweet(false);
                setShowSpinnerCreateTweet(false);
                DefaultCreateTweet();
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
                        {txtAlertTweet1}
                      </Box>
                    );
                  },
                });
                onRefresh();
              } else {
                setShowSpinnerCreateTweet(false);
                DefaultCreateTweet();
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
                        {txtAlertTweet2}
                      </Box>
                    );
                  },
                });
              }
            });
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        setShowSpinnerCreateTweet(false);
        DefaultCreateTweet();
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
                {'text alanina icerik girin!'}
              </Box>
            );
          },
        });
      }
    } else {
      setShowSpinnerCreateTweet(false);
      DefaultCreateTweet();
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
              {'title alanina icerik girin!'}
            </Box>
          );
        },
      });
    }
  };

  const RenderUpdateTweet = () => {
    return (
      <View style={styles.createTweet}>
        <View style={styles.createTweetTitle}>
          <Text style={styles.text2}>{txtUpdateTweet}</Text>
        </View>
        <View style={styles.createTweetInputTitle}>
          <Text style={styles.text3}>{txtUpdateTweetTitle}</Text>
          <TextInput
            style={styles.textInput}
            placeholder={txtUpdateTweetTitleInput}
            value={title}
            defaultValue={title}
            returnKeyType={'next'}
            blurOnSubmit={false}
            onSubmitEditing={() => {
              textUpdateInputRef.current && textUpdateInputRef.current.focus();
            }}
            onChangeText={text => setTitle(text)}></TextInput>
        </View>
        <View style={styles.createTweetInputText}>
          <Text style={styles.text3}>{txtUpdateTweetText}</Text>
          <TextInput
            style={styles.textInput}
            placeholder={txtUpdateTweetTextInput}
            value={text}
            defaultValue={text}
            returnKeyType={'done'}
            ref={textUpdateInputRef}
            onSubmitEditing={() => {
              Keyboard.dismiss;
              setShowSpinnerCreateTweet(true);
              SendUpdateTweetRequest();
            }}
            onChangeText={text => setText(text)}></TextInput>
        </View>
        {SpinnerCreateTweet()}
        <View style={styles.MyButtons}>
          <View style={styles.cancelButton}>
            <Button
              style={styles.button}
              onPress={() => {
                setIsCreatingTweet(false);
                setIsClickUpdateTweet(false);
              }}>
              {txtCreateTweetCancel}
            </Button>
          </View>
          <View style={styles.shareButton}>
            <Button
              style={styles.button}
              onPress={() => {
                setShowSpinnerCreateTweet(true);
                SendUpdateTweetRequest();
              }}>
              {txtCreateTweetShare}
            </Button>
          </View>
        </View>
      </View>
    );
  };

  const SendDeleteTweetRequest = (tweetId, retweetId) => {
    console.log("MyStore.tokenRedux", MyStore.tokenRedux)
    setIsDeleteTweet(true);
    if (isUpdateTweet == false) {
      fetch(MyStore.proxyRedux + '/tweets/' + tweetId + "/" + retweetId, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer ' + MyStore.tokenRedux,
        }
      })
        .then(response => {
          if (response.status == 200) {
            onRefresh();
            setIsDeleteTweet(false);
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
                    {txtAlertDelete1}
                  </Box>
                );
              },
            });
          } else {
            onRefresh();
            setIsDeleteTweet(false);
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
                    {txtAlertDelete2}
                  </Box>
                );
              },
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  const RenderMyTweetsOrUpdateTweet = () => {
    if (isClickUpdateTweet == false) {
      return <View>{RenderMyTweets()}</View>;
    } else {
      return RenderUpdateTweet();
    }
  };

  const ThereAreNewTweets = () => {
    if (isTweetsLen == true) {
      return (
        <View style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Button onPress={() => {
            setIsButtonTweetsLen(true);
            setIsTweetsLen(false);
            setTweetsLen(isMyTweets.length);
            onPressTouch();
            setMyTweets(isMyTweets);
          }} style={styles.button}
            startIcon={<Icon as={AntDesign} name="upcircle" size={'xl'} color={'black'} />}>
            {txtThereAreNewTweets}
          </Button>
        </View>
      )
    }
  }

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.header}>
        <View style={styles.headerLeft}></View>
        <View style={styles.headerMiddle}>
          <Text style={styles.text2}>{txtHomeScreen}</Text>
        </View>
        <View style={styles.headerRight}></View>
      </View>
      <View style={styles.footer}>
        <RefreshControl
          style={styles.refreshControl}
          onRefresh={onRefresh}
          refreshing={refreshing}>
          <ScrollView
            style={styles.scroll}
            ref={scrollRef}>
            {/* // onScroll={e => setScrollPosition(e.nativeEvent.contentOffset.y)}> */}
            {RenderMyTweetsOrUpdateTweet()}
          </ScrollView>
          <View
            style={{
              marginTop: 25,
              width: '100%',
              justifyContent: 'flex-start',
              alignItems: 'center',
              position: 'absolute',
            }}>
            {ThereAreNewTweets()}
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
  toastAlertMargin: {
    margin: 7,
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
    fontSize: 17,
    fontStyle: 'bold',
    color: 'black',
    margin: 5,
  },
  text4: {
    fontSize: 15,
    fontStyle: 'bold',
    color: 'black',
  },
  text5: {
    fontSize: 13,
    fontStyle: 'bold',
    color: 'black',
    margin: 5,
  },
  text6: {
    fontSize: 12,
    fontStyle: 'bold',
    color: 'black',
    margin: 5,
  },
  text7: {
    fontSize: 11,
    fontStyle: 'bold',
    color: 'black',
    margin: 5,
  },
  textInput: {
    width: '80%',
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
    borderWidth: 1,
    padding: 15,
  },
  refreshControl: {
    width: '100%',
    height: '100%',
  },
  tweetCard: {
    backgroundColor: '#F0F3F4',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: 25,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: 'black',
  },
  tweetCardUpRetweet: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    padding: 7,
    borderColor: 'black',
  },
  tweetCardUp: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 7,
    borderColor: 'black',
  },
  tweetCardUpLeft: {
    width: '60%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  tweetCardUpRight1: {
    width: '20%',
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
  },
  tweetCardUpRight2: {
    width: '20%',
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
  },
  tweetCardTitle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 7,
    borderColor: 'black',
  },
  tweetCardText: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    padding: 7,
    borderColor: 'black',
  },
  tweetCardDown: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    padding: 7,
    borderColor: 'black',
  },
  favoriteButton: {
    width: '25%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
  commentButton: {
    width: '25%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  retweetButton: {
    width: '25%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tweetDate: {
    width: '25%',
    justifyContent: 'center',
    alignItems: 'flex-end',
    flexDirection: 'column',
  },
  createTweet: {
    backgroundColor: '#F0F3F4',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 10,
    marginTop: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 15,
  },
  createTweetTitle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    margin: 5,
    padding: 7,
  },
  createTweetInputTitle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    margin: 5,
  },
  createTweetInputText: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    margin: 5,
  },
  MyButtons: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 10,
  },
  cancelButton: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  shareButton: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  createTweetView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 15,
  },
  spinner: {
    backgroundColor: '#F0F3F4',
    margin: 10,
    height: 50,
    width: '100%',
    flex: 1,
  },
  tweetsPlace: {
    backgroundColor: '#F0F3F4',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 15,
    marginBottom: 35,
  },
  joinDate: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },
});

export default HomeScreen;
