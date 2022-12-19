import React, { useState, useEffect, useCallback, useRef } from 'react';
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
import { useRoute, useNavigation } from '@react-navigation/native';
import {
  useToast,
  Box,
  CheckCircleIcon,
  WarningIcon,
  IconButton,
  Icon,
  Avatar,
  ScrollView,
  Input,
  Link,
  Button,
  Skeleton,
  Center,
  VStack
} from 'native-base';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import SendMessage from './SendMessageScreen';
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
  SetIsComment,
  SetContainerScreen
} from '../redux/action';

const ShowUserProfileScreen2 = () => {
  const [stateTweetId, setStateTweetId] = useState(0);

  const [myTweets, setMyTweets] = useState([]);
  const [myLikes, setMyLikes] = useState([]);

  const [isSkeleton, setSkeleton] = useState(false);

  const [sendValue, setSendValue] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const [scrollPosition, setScrollPosition] = useState(0);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const toast = useToast();
  const route = useRoute();
  const { MyStore } = useSelector(state => state);

  const scrollRef = useRef();

  const userId = MyStore.sendMessageIdRedux2;
  const userUsername = MyStore.sendMessageUsernameRedux2;
  const userEmail = MyStore.sendMessageEmailRedux2;
  const userLanguage = MyStore.sendMessageLanguageRedux2;
  const userGender = MyStore.sendMessageGenderRedux2;
  const userDate = MyStore.sendMessageDateRedux2;
  const userTime = MyStore.sendMessageTimeRedux2;

  const langRedux = MyStore.languageRedux;

  let txtAlertQuestion =
    Languages.languages[langRedux].MainContainer.txtAlertQuestion;
  let txtAlertText1 =
    Languages.languages[langRedux].MainContainer.txtAlertText1;
  let txtAlertNo = Languages.languages[langRedux].MainContainer.txtAlertNo;
  let txtAlertYes = Languages.languages[langRedux].MainContainer.txtAlertYes;

  let txtMessageScreen =
    Languages.languages[langRedux].MessageScreen.txtMessageScreen;

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
  let txtComplaintTweet =
    Languages.languages[langRedux].HomeScreen.txtAskComplaintTweet;
  let txtAskCancelComplaintTweet =
    Languages.languages[langRedux].HomeScreen.txtAskCancelComplaintTweet;
  let txtCancelComplaintTweet =
    Languages.languages[langRedux].HomeScreen.txtCancelComplaintTweet;
  let txtYes = Languages.languages[langRedux].HomeScreen.txtYes;
  let txtNo = Languages.languages[langRedux].HomeScreen.txtNo;

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

  let txtFoundUsers = Languages.languages[langRedux].SearchScreen.txtFoundUsers;
  let txtUserNotFound =
    Languages.languages[langRedux].SearchScreen.txtUserNotFound;
  let txtSendMessage =
    Languages.languages[langRedux].SearchScreen.txtSendMessage;
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

  function handleRetweetButton(retweetTitle, retweetText, retweetId, tweetId) {
    Alert.alert(txtAskRetweetTweet, txtRetweetTweet, [
      {
        text: txtNo,
      },
      {
        text: txtYes,
        onPress: () => {
          SendSaveTweetRequest(retweetTitle, retweetText, retweetId, tweetId);
        },
      },
    ]);
    return true;
  }

  function handleComplaintButton(tweetId) {
    Alert.alert(txtAskComplaintTweet, txtComplaintTweet, [
      {
        text: txtNo,
      },
      {
        text: txtYes,
        onPress: () => {
          SendSaveComplaintRequest(tweetId);
        },
      },
    ]);
    return true;
  }

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

  const onPressTouch = () => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: false,
    });
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

  const IconButtonsTurnBack = () => {
    return (
      <IconButton
        onPress={() => {
          dispatch(SetSendMessageId2(0));
          dispatch(SetSendMessageUsername2(''));
          dispatch(SetSendMessageEmail2(''));
          dispatch(SetSendMessageLanguage2(''));
          dispatch(SetSendMessageGender2(''));
          dispatch(SetSendMessageDate2(''));
          dispatch(SetSendMessageTime2(''));
          if (MyStore.sendMessageIdRedux1 == 0) {
            return navigation.goBack('Profile');
          } else {
            return navigation.navigate('ShowUserProfileScreen1');
          }
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

  useEffect(() => {
    if (sendValue == 0) {
      if (isSkeleton == false) {
        setSkeleton(true);
        SendUserTweetsRequest();
        setTimeout(() => {
          setSkeleton(false);
          setSendValue(1);
        }, 1000);
      }
    }
  }, []);

  useEffect(() => {
    if (MyStore.isComment != 0) {
      SendUserTweetsRequest();
      dispatch(SetShowTweetCommentsId(0));
      dispatch(SetIsComment(0));
    }
  }, [MyStore.isComment])

  const SendUserTweetsRequest = () => {
    fetch(MyStore.proxyRedux + '/tweets?userId=' + userId, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + MyStore.tokenRedux,
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        response.json().then(dataJson => {
          dataJson.reverse();
          console.log('dataJson', dataJson);
          setMyTweets(dataJson);
          dataJson.map(tweet => {
            SendGetUserLikes(tweet.id);
          });
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  const SendGetUserLikes = tweetId => {
    fetch(MyStore.proxyRedux + '/likes/likes/' + tweetId, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + MyStore.tokenRedux,
        'Content-Type': 'application/json',
      },
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
          console.log('createJson ', createJson);
          SendUserTweetsRequest();
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  const SendSaveTweetRequest = (retweetTitle, retweetText, retweetId, tweetId) => {
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
            onRefresh();
          } else if (response.status == 502) {
            onRefresh();
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
            onRefresh();
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

  const RenderUserTweets = () => {
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
              marginTop: 30,
            }}>
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
                                dispatch(SetContainerScreen('Profile'));
                                navigation.navigate('Profile');
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
                                onPressTouch();
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
                                onPressTouch();
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
                  <Link style={styles.tweetCardUpLeft}>
                    {MyStore.sendMessageImagePathRedux2 != '' ? (
                      <Avatar
                        style={{ justifyContent: 'center', alignItems: 'center', borderWidth: 0.5, backgroundColor: '#CACFD2' }}
                        alignSelf="center"
                        size="45px"
                        source={{ uri: MyStore.sendMessageImagePathRedux2 }}
                      >
                        {userUsername[0].toUpperCase()}
                      </Avatar>
                    )
                      :
                      (
                        <Avatar
                          style={{ justifyContent: 'center', alignItems: 'center', borderWidth: 0.5, backgroundColor: '#CACFD2' }}
                          alignSelf="center"
                          size="45px">
                          {userUsername[0].toUpperCase()}
                        </Avatar>
                      )}
                    <Text style={styles.text3}>{userUsername}</Text>
                  </Link>
                  <View style={styles.tweetCardUpRight1}></View>
                  <View style={styles.tweetCardUpRight2}>
                    <View
                      style={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      {IconButtonsComplaint(tweet.id)}
                      <Text style={styles.text6}>{txtComplaint}</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.tweetCardTitle}>
                  <Text style={styles.text5}>{tweet.title}</Text>
                </View>
                <View style={styles.tweetCardText}>
                  <Text style={styles.text5}>{tweet.text}</Text>
                </View>
                <View style={styles.tweetCardDown}>
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
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
                          style={{ marginLeft: 10, marginRight: 5 }}
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
              </View>
            ))}
          </View>
        );
      }
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    SendUserTweetsRequest();
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }, []);

  const CalculateMonth = () => {
    if (userDate[5] + userDate[6] == '01') {
      return txtJanuary;
    } else if (userDate[5] + userDate[6] == '02') {
      return txtFebruary;
    } else if (userDate[5] + userDate[6] == '03') {
      return txtMarch;
    } else if (userDate[5] + userDate[6] == '04') {
      return txtApril;
    } else if (userDate[5] + userDate[6] == '05') {
      return txtMay;
    } else if (userDate[5] + userDate[6] == '06') {
      return txtJune;
    } else if (userDate[5] + userDate[6] == '07') {
      return txtJuly;
    } else if (userDate[5] + userDate[6] == '08') {
      return txtAugust;
    } else if (userDate[5] + userDate[6] == '09') {
      return txtSeptember;
    } else if (userDate[5] + userDate[6] == '10') {
      return txtOctober;
    } else if (userDate[5] + userDate[6] == '11') {
      return txtNovember;
    } else if (userDate[5] + userDate[6] == '12') {
      return txtDecember;
    }
  };

  const ProfileAvatar = () => {
    if (isSkeleton == false) {
      return (
        <View
          style={{
            backgroundColor: '#F0F3F4',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 15,
            marginTop: 20,
            borderWidth: 1,
          }}>
          {MyStore.sendMessageImagePathRedux2 != '' ? (
            <Avatar
              style={{ marginTop: 10, borderWidth: 0.5, backgroundColor: '#CACFD2' }}
              alignSelf="center"
              size="2xl"
              source={{ uri: MyStore.sendMessageImagePathRedux2 }}>
              {userUsername[0].toUpperCase()}
            </Avatar>
          )
            :
            (
              <Avatar
                style={{ marginTop: 10, borderWidth: 0.5, backgroundColor: '#CACFD2' }}
                alignSelf="center"
                size="2xl">
                {userUsername[0].toUpperCase()}
              </Avatar>
            )}
          <Text style={styles.text2}>{userUsername}</Text>
          <View style={styles.sendMessage}>
            <Button
              startIcon={
                <Icon as={Feather} name="message-circle" size={25} />
              }
              style={styles.button}
              onPress={() => {
                dispatch(SetSendMessageId3(userId));
                dispatch(SetSendMessageUsername3(userUsername));
                dispatch(SetSendMessageEmail3(userEmail));
                dispatch(SetSendMessageLanguage3(userLanguage));
                dispatch(SetSendMessageGender3(userGender));
                dispatch(SetSendMessageDate3(userDate));
                dispatch(SetSendMessageTime3(userTime));
                dispatch(SetSendMessageImagePath3(MyStore.sendMessageImagePathRedux2));
                navigation.navigate('SendMessageScreen');
              }}>
              {txtSendMessage}
            </Button>
          </View>
          {MyStore.languageRedux == 'tur' ? (
            <View style={styles.joinDate}>
              <Text style={styles.text3}>
                {userDate[8] + userDate[9]} {CalculateMonth()}{' '}
                {userDate[0] + userDate[1] + userDate[2] + userDate[3]}
                {txtJoin}
              </Text>
            </View>
          ) : (
            <View style={styles.joinDate}>
              <Text style={styles.text3}>
                {txtJoin}
                {userDate[8] + userDate[9]} {CalculateMonth()}{' '}
                {userDate[0] + userDate[1] + userDate[2] + userDate[3]}
              </Text>
            </View>
          )}
        </View>
      )
    }
  }

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>{IconButtonsTurnBack()}</View>
        <View style={styles.headerMiddle}></View>
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
            {/* // onScroll={e => setScrollPosition(e.nativeEvent.contentOffset.y)} */}
            {ProfileAvatar()}
            {RenderUserTweets()}
          </ScrollView>
          <View
            style={{
              position: 'absolute',
              bottom: 25,
              right: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {IconButtonsUp()}
          </View>
        </RefreshControl>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  header: {
    backgroundColor: 'white',
    flexDirection: 'row',
    flex: 1,
  },
  headerLeft: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '20%',
  },
  headerMiddle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '60%',
  },
  headerRight: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '20%',
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
  textTweetUsername: {
    fontSize: 18,
    fontStyle: 'bold',
    color: 'white',
    margin: 5,
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
  tweetsPlace: {
    backgroundColor: '#F0F3F4',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 15,
    marginTop: 20,
    marginBottom: 35,
  },
  joinDate: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },
  sendMessage: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },
});

export default ShowUserProfileScreen2;
