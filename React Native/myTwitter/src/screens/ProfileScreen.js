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
  Platform,
  Dimensions,
  ImageBackground,
  Touchable,
  TouchableOpacity
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import {
  useToast,
  Box,
  CheckCircleIcon,
  WarningIcon,
  IconButton,
  Icon,
  Avatar,
  ScrollView,
  Link,
  Button,
  Skeleton,
  Center,
  VStack,
  Image
} from 'native-base';
import {
  SetSendMessageId1,
  SetSendMessageUsername1,
  SetSendMessageEmail1,
  SetSendMessageLanguage1,
  SetSendMessageGender1,
  SetSendMessageDate1,
  SetSendMessageTime1,
  SetShowTweetCommentsId,
  SetIsComment,
  SetImagePath,
  SetSendMessageImagePath1,
  SetContainerScreen
} from '../redux/action';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const [selectImage, setSelectImage] = useState(false);

  const [stateTweetId, setStateTweetId] = useState(0);

  const [isSkeleton, setSkeleton] = useState(false);

  const [myTweets, setMyTweets] = useState([]);
  const [myLikes, setMyLikes] = useState([]);

  const [sendValue, setSendValue] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const toast = useToast();
  const { MyStore } = useSelector(state => state);

  const textInputRef = createRef();
  const textUpdateInputRef = createRef();

  const [scrollPosition, setScrollPosition] = useState(0);

  const [isDeleteTweet, setIsDeleteTweet] = useState(false);
  const [isUpdateTweet, setIsUpdateTweet] = useState(false);
  const [isClickUpdateTweet, setIsClickUpdateTweet] = useState(false);

  const [showSpinnerCreateTweet, setShowSpinnerCreateTweet] = useState(false);

  const [isCreatingTweet, setIsCreatingTweet] = useState(false);

  const scrollRef = useRef();

  const langRedux = MyStore.languageRedux;

  let txtLoginAlertQuestion =
    Languages.languages[langRedux].Login.txtLoginAlertQuestion;
  let txtAlertText1 = Languages.languages[langRedux].Login.txtAlertText1;
  let txtAlertNo = Languages.languages[langRedux].Login.txtAlertNo;
  let txtAlertYes = Languages.languages[langRedux].Login.txtAlertYes;

  let txtAlertQuestion =
    Languages.languages[langRedux].MainContainer.txtAlertQuestion;
  let txtAlertText12 = Languages.languages[langRedux].MainContainer.txtAlertText1;
  let txtAlertNo2 = Languages.languages[langRedux].MainContainer.txtAlertNo;
  let txtAlertYes2 = Languages.languages[langRedux].MainContainer.txtAlertYes;

  let txtProfileScreen =
    Languages.languages[langRedux].ProfileScreen.txtProfileScreen;

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

  const LogOutAsk = () => {
    Alert.alert(txtAlertQuestion, txtAlertText12, [
      {
        text: txtAlertNo2,
      },
      { text: txtAlertYes2, onPress: LogOut },
    ]);
  };

  const HandleNoPhoto = () => {
    Alert.alert("profil image kaldirilsinmi", "profil image kaldirilacak", [
      {
        text: "no",
      },
      { text: "evet", onPress: SendUserNoProfileImage },
    ]);
  };

  const removeData = async () => {
    try {
      await AsyncStorage.removeItem('token');
    } catch (e) {
      console.log(e);
    }
  }

  const LogOut = () => {
    removeData();
    dispatch(SetContainerScreen("Home"));
    navigation.navigate('Login');
  };

  function handleBackButtonClick() {
    Alert.alert(txtAlertQuestion, txtAlertText1, [
      {
        text: txtAlertNo,
      },
      { text: txtAlertYes, onPress: LogOut },
    ]);
    return true;
  }

  function DeleteTweet(tweetId, retweetId) {
    Alert.alert(txtAskDeleteTweet, txtDeleteTweet, [
      {
        text: txtNo,
      },
      { text: txtYes, onPress: () => SendDeleteTweetRequest(tweetId, retweetId) },
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
    scrollRef.current?.scrollTo({
      y: 0,
      animated: false,
    });
  };

  const IconButtonsSettings = () => {
    return (
      <IconButton
        onPress={() => navigation.navigate('SettingsScreen')}
        icon={<Icon as={MaterialIcon} name="settings" />}
        color={'black'}
        size={50}
        _icon={{
          color: 'black',
          size: 'xl',
        }}
        _hover={{
          bg: 'coolGray.800:alpha.20',
        }}
        _pressed={{
          bg: 'coolGray.800:alpha.20',
          _icon: {
            name: 'settings',
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

  const IconButtonsExit = () => {
    return (
      <IconButton
        onPress={LogOutAsk}
        icon={<Icon as={MaterialIcon} name="exit-to-app" />}
        color={'black'}
        size={50}
        _icon={{
          color: 'black',
          size: 'xl',
        }}
        _hover={{
          bg: 'coolGray.800:alpha.20',
        }}
        _pressed={{
          bg: 'coolGray.800:alpha.20',
          _icon: {
            name: 'exit-to-app',
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

  const IconButtonsDelete = (tweetId, retweetId) => {
    return (
      <IconButton
        onPress={() => {
          DeleteTweet(tweetId, retweetId);
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

  const IconButtonsNoProfile = () => {
    return (
      <Icon as={MaterialCommunityIcons} name="image-off"
        color={'black'}
        size={'xl'} />
    );
  };

  const IconButtonsCamera = () => {
    return (
      <Icon as={Ionicons} name="camera"
        color={'black'}
        size={'xl'} />
    );
  };

  const IconButtonsGalery = () => {
    return (
      <Icon as={MaterialIcon} name="photo-library"
        color={'black'}
        size={'xl'} />
    );
  };

  const IconButtonsCancel = () => {
    return (
      <Icon as={MaterialIcon} name="cancel"
        color={'black'}
        size={'xl'} />
    );
  };

  const SendMyImageRequest = () => {
    fetch(MyStore.proxyRedux + '/users/uploadImage/' + MyStore.idRedux, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + MyStore.tokenRedux,
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (response.status == 200) {
          response.json().then(imageUserData => {
            dispatch(SetImagePath(imageUserData.imagePath));
            console.log('imageUserData', imageUserData);
          })
        }
      })
  };

  const WaitSkeleton = () => {
    setSkeleton(true);
    SendMyImageRequest();
    SendMyTweetsRequest();
    onPressTouch();
    setTimeout(() => {
      setSkeleton(false);
    }, 750);
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    WaitSkeleton();
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }, []);

  useEffect(() => {
    if (MyStore.containerScreen == "Profile") {
      console.log("MyStore.imagePathReduxProfile", MyStore.imagePathRedux);
      console.log("MyStore.tokenRedux", MyStore.tokenRedux);
      WaitSkeleton();
    }
  }, [MyStore.containerScreen])

  useEffect(() => {
    if (MyStore.isComment != 0) {
      console.log("MyStore.tokenRedux", MyStore.tokenRedux);
      SendMyTweetsRequest();
      dispatch(SetShowTweetCommentsId(0));
      dispatch(SetIsComment(0));
    }
  }, [MyStore.isComment])

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
    fetch(MyStore.proxyRedux + '/tweets?userId=' + MyStore.idRedux, {
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
          SendMyTweetsRequest();
        });
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

  const DefaultCreateTweet = () => {
    setTitle('');
    setText('');
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
                DefaultCreateTweet();
                setShowSpinnerCreateTweet(false);
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
        DefaultCreateTweet();
        setShowSpinnerCreateTweet(false);
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
      DefaultCreateTweet();
      setShowSpinnerCreateTweet(false);
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
  };

  const SendDeleteTweetRequest = (tweetId, retweetId) => {
    setIsDeleteTweet(true);
    if (isUpdateTweet == false) {
      fetch(MyStore.proxyRedux + '/tweets/' + tweetId + "/" + retweetId, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer ' + MyStore.tokenRedux,
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          if (response.status == 200) {
            onRefresh();
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
            setIsDeleteTweet(false);
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
                    {txtAlertDelete2}
                  </Box>
                );
              },
            });
            setIsDeleteTweet(false);
          }
        })
        .catch(err => {
          console.log(err);
        });
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
                onPress={() => setIsCreatingTweet(false)}>
                {txtCreateTweetCancel}
              </Button>
            </View>
            <View style={styles.shareButton}>
              <Button
                style={styles.button}
                onPress={() => {
                  setShowSpinnerCreateTweet(true);
                  SendSaveTweetRequest();
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

  const RenderMyTweetsOrUpdateTweet = () => {
    if (isClickUpdateTweet == false && isSkeleton == false) {
      return (
        <View>
          {CreateTweet()}
          {RenderMyTweets()}
        </View>
      );
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
      return RenderUpdateTweet();
    }
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
            {myTweets.map(tweet => (
              <View key={tweet.id} style={styles.tweetCard}>
                {tweet.retweetUser.id != tweet.user.id && (
                  <View style={styles.tweetCardUpRetweet}>
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
                              dispatch(SetSendMessageId1(tweet.retweetUser.id));
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
                                SetSendMessageGender1(tweet.retweetUser.gender),
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
                              dispatch(SetSendMessageId1(tweet.retweetUser.id));
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
                                SetSendMessageGender1(tweet.retweetUser.gender),
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
                        </View>
                      )}
                    </View>
                  </View>
                )}
                <View style={styles.tweetCardUp}>
                  {MyStore.imagePathRedux != '' ? (
                    <Link style={styles.tweetCardUpLeft}>
                      <Avatar
                        style={{ justifyContent: 'center', alignItems: 'center', borderWidth: 0.5, backgroundColor: '#CACFD2' }}
                        size="45px"
                        source={{ uri: MyStore.imagePathRedux }}>
                        <Text style={{ color: 'white', fontSize: 25 }}>
                          {MyStore.usernameRedux[0].toUpperCase()}
                        </Text>
                      </Avatar>
                      <Text style={styles.text3}>{MyStore.usernameRedux}</Text>
                    </Link>
                  )
                    :
                    (
                      <Link style={styles.tweetCardUpLeft}>
                        <Avatar
                          style={{ justifyContent: 'center', alignItems: 'center', borderWidth: 0.5, backgroundColor: '#CACFD2' }}
                          size="45px">
                          <Text style={{ color: 'white', fontSize: 25 }}>
                            {MyStore.usernameRedux[0].toUpperCase()}
                          </Text>
                        </Avatar>
                        <Text style={styles.text3}>{MyStore.usernameRedux}</Text>
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

  const CalculateMonth = () => {
    if (MyStore.dateRedux[5] + MyStore.dateRedux[6] == '01') {
      return txtJanuary;
    } else if (MyStore.dateRedux[5] + MyStore.dateRedux[6] == '02') {
      return txtFebruary;
    } else if (MyStore.dateRedux[5] + MyStore.dateRedux[6] == '03') {
      return txtMarch;
    } else if (MyStore.dateRedux[5] + MyStore.dateRedux[6] == '04') {
      return txtApril;
    } else if (MyStore.dateRedux[5] + MyStore.dateRedux[6] == '05') {
      return txtMay;
    } else if (MyStore.dateRedux[5] + MyStore.dateRedux[6] == '06') {
      return txtJune;
    } else if (MyStore.dateRedux[5] + MyStore.dateRedux[6] == '07') {
      return txtJuly;
    } else if (MyStore.dateRedux[5] + MyStore.dateRedux[6] == '08') {
      return txtAugust;
    } else if (MyStore.dateRedux[5] + MyStore.dateRedux[6] == '09') {
      return txtSeptember;
    } else if (MyStore.dateRedux[5] + MyStore.dateRedux[6] == '10') {
      return txtOctober;
    } else if (MyStore.dateRedux[5] + MyStore.dateRedux[6] == '11') {
      return txtNovember;
    } else if (MyStore.dateRedux[5] + MyStore.dateRedux[6] == '12') {
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
            borderWidth: 1,
            borderRadius: 15,
            marginTop: 20,
          }}>
          <View style={{
            width: '100%',
            justifyContent: 'flex-end',
            alignItems: 'flex-end'
          }}>
            <IconButton
              onPress={() => {
                setSelectImage(true);
              }}
              icon={<Icon as={MaterialIcon} name="edit" />}
              style={{ margin: 5 }}
              color={'black'}
              size={30}
              _icon={{
                color: 'black',
                size: 'xl',
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
                    size: 'xl',
                  },
                },
              }}
              _ios={{
                _icon: {
                  size: 'xl',
                },
              }}
            />
          </View>
          <View style={{
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            {MyStore.imagePathRedux != '' ? (
              <Avatar
                style={{ marginTop: 10, borderWidth: 0.5, backgroundColor: '#CACFD2' }}
                alignSelf="center"
                size="2xl"
                source={{ uri: MyStore.imagePathRedux }}>
                {MyStore.usernameRedux[0].toUpperCase()}
              </Avatar>
            )
              :
              (
                <Avatar
                  style={{ marginTop: 10, borderWidth: 0.5, backgroundColor: '#CACFD2' }}
                  alignSelf="center"
                  size="2xl">
                  {MyStore.usernameRedux[0].toUpperCase()}
                </Avatar>
              )}
            <Text style={styles.text2}>{MyStore.usernameRedux}</Text>
          </View>
          {MyStore.languageRedux == 'tur' ? (
            <View style={styles.joinDate}>
              <Text style={styles.text4}>
                {MyStore.dateRedux[8] + MyStore.dateRedux[9]}{' '}
                {CalculateMonth()}{' '}
                {MyStore.dateRedux[0] +
                  MyStore.dateRedux[1] +
                  MyStore.dateRedux[2] +
                  MyStore.dateRedux[3]}
                {txtJoinYou}
              </Text>
            </View>
          ) : (
            <View style={styles.joinDate}>
              <Text style={styles.text4}>
                {txtJoinYou + ' '}
                {MyStore.dateRedux[8] + MyStore.dateRedux[9]}{' '}
                {CalculateMonth()}{' '}
                {MyStore.dateRedux[0] +
                  MyStore.dateRedux[1] +
                  MyStore.dateRedux[2] +
                  MyStore.dateRedux[3]}
              </Text>
            </View>
          )}
        </View>
      );
    }
  };

  const SendUserImageRequest = async (image) => {
    let formData = new FormData();
    formData.append("file", {
      uri: image.path,
      type: image.mime, // or photo.type
      name: MyStore.usernameRedux,
    });
    let response = await fetch(MyStore.proxyRedux + '/users/uploadImage/' + MyStore.idRedux, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + MyStore.tokenRedux,
        'Content-Type': 'multipart/form-data',
      },
      body: formData
    })
      .then(response => {
        response.json().then(imageJson => {
          console.log('imageJson ', imageJson);
          if (response.status == 200) {
            dispatch(SetImagePath(imageJson.imagePath));
            WaitSkeleton();
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
                    {"image yuklendi"}
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
                    {"image yuklenemedi"}
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
                    {"birseyler yanlıs gitti"}
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

    console.log("response", response);
  };

  const SendUserNoProfileImage = () => {
    fetch(MyStore.proxyRedux + '/users/noUploadImage/' + MyStore.idRedux, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + MyStore.tokenRedux,
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (response.status == 200) {
          WaitSkeleton();
          dispatch(SetImagePath(''));
          setSelectImage(false);
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
                  {"image kaldırıldı"}
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
                  {"profile image zaten yok"}
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
                  {"image kaldırılamadi"}
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

  const TakePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 300,
      cropping: true,
    }).then(image => {
      console.log(image);
      SendUserImageRequest(image);
      console.log(image);
      setSelectImage(false);
    });
  }

  const ChoosePhotoFromGalery = () => {
    console.log("choosePhotoFromGalery");
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true
    }).then(image => {
      console.log(image);
      SendUserImageRequest(image);
      console.log(image);
      setSelectImage(false);
    });
  }

  const SelectImageMenu = () => {
    return (
      <View style={{
        height: Dimensions.get('window').height - 300,
        padding: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <View style={{
          flexDirection: 'row',
          height: '25%',
          paddingTop: 10,
        }}>
          <TouchableOpacity onPress={() => {
            TakePhotoFromCamera();
          }}
            style={{
              width: '50%',
              borderWidth: 0.5,
              borderRadius: 20,
              backgroundColor: '#F0F3F4',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              margin: 10
            }}>
            {IconButtonsCamera()}
            <Text style={styles.text6}>Open Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            ChoosePhotoFromGalery();
          }}
            style={{
              width: '50%',
              borderWidth: 0.5,
              borderRadius: 20,
              backgroundColor: '#F0F3F4',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              margin: 10
            }}>
            {IconButtonsGalery()}
            <Text style={styles.text6}>Open Galery</Text>
          </TouchableOpacity>
        </View>

        <View style={{
          flexDirection: 'row',
          height: '25%',
          paddingTop: 10,
        }}>
          <TouchableOpacity onPress={() => {
            setSelectImage(false);
          }}
            style={{
              width: '50%',
              borderWidth: 0.5,
              borderRadius: 20,
              backgroundColor: '#F0F3F4',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              margin: 10
            }}>
            {IconButtonsCancel()}
            <Text style={styles.text6}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            HandleNoPhoto();
          }} style={{
            width: '50%',
            borderWidth: 0.5,
            borderRadius: 20,
            backgroundColor: '#F0F3F4',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            margin: 10
          }}>
            {IconButtonsNoProfile()}
            <Text style={styles.text6}>No Profile Photo</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  const ProfileOrSelectImage = () => {
    if (selectImage == false) {
      return (
        <ScrollView
          style={styles.scroll}
          ref={scrollRef}>
          {ProfileAvatar()}
          {RenderMyTweetsOrUpdateTweet()}
        </ScrollView>
      )
    } else {
      return (
        <ScrollView
          style={styles.scroll}
          ref={scrollRef}>
          {SelectImageMenu()}
        </ScrollView>
      )
    }
  }

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <IconButtonsSettings />
        </View>
        <View style={styles.headerMiddle}>
          <Text style={styles.text2}>{txtProfileScreen}</Text>
        </View>
        <View style={styles.headerRight}>
          <IconButtonsExit />
        </View>
      </View>
      <View style={styles.footer}>
        <RefreshControl
          style={styles.refreshControl}
          onRefresh={onRefresh}
          refreshing={refreshing}>
          {ProfileOrSelectImage()}
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
  textInput: {
    width: '80%',
    borderWidth: 0.5,
    borderRadius: 20,
    padding: 7,
    color: 'black',
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

export default ProfileScreen;
