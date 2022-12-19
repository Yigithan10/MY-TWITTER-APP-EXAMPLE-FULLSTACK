import React, { useState, useEffect, useCallback } from 'react';
import Languages from '../../languages.json';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  BackHandler,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import {
  useToast,
  Box,
  CheckCircleIcon,
  IconButton,
  Icon,
  ScrollView,
  Spinner,
  Link,
  Avatar,
  Button,
} from 'native-base';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
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

const ComplaintsTweetScreen = () => {
  const [myComplaints, setMyComplaints] = useState([]);
  const [showSpinner, setShowSpinner] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [sendValue, setSendValue] = useState(0);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const toast = useToast();
  const { MyStore } = useSelector(state => state);

  const langRedux = MyStore.languageRedux;

  let SettingsScreen = Languages.languages[langRedux].SettingsScreen.SettingsScreen;
  let txtTurnBack = Languages.languages[langRedux].SettingsScreen.txtTurnBack;

  let txtAskCreateTweet = Languages.languages[langRedux].HomeScreen.txtAskCreateTweet;
  let txtCreateTweet = Languages.languages[langRedux].HomeScreen.txtCreateTweet;
  let txtCreateTweetTitle = Languages.languages[langRedux].HomeScreen.txtCreateTweetTitle;
  let txtCreateTweetTitleInput = Languages.languages[langRedux].HomeScreen.txtCreateTweetTitleInput;
  let txtCreateTweetText = Languages.languages[langRedux].HomeScreen.txtCreateTweetText;
  let txtCreateTweetTextInput = Languages.languages[langRedux].HomeScreen.txtCreateTweetTextInput;
  let txtCreateTweetCancel = Languages.languages[langRedux].HomeScreen.txtCreateTweetCancel;
  let txtCreateTweetShare = Languages.languages[langRedux].HomeScreen.txtCreateTweetShare;

  let txtUpdateTweet = Languages.languages[langRedux].HomeScreen.txtUpdateTweet;
  let txtUpdateTweetTitle = Languages.languages[langRedux].HomeScreen.txtUpdateTweetTitle;
  let txtUpdateTweetTitleInput = Languages.languages[langRedux].HomeScreen.txtUpdateTweetTitleInput;
  let txtUpdateTweetText = Languages.languages[langRedux].HomeScreen.txtUpdateTweetText;
  let txtUpdateTweetTextInput = Languages.languages[langRedux].HomeScreen.txtUpdateTweetTextInput;

  let txtEdit = Languages.languages[langRedux].HomeScreen.txtEdit;
  let txtDelete = Languages.languages[langRedux].HomeScreen.txtDelete;
  let txtLike = Languages.languages[langRedux].HomeScreen.txtLike;
  let txtRetweet = Languages.languages[langRedux].HomeScreen.txtRetweet;
  let txtComplaint = Languages.languages[langRedux].HomeScreen.txtComplaint;
  let txtCancel = Languages.languages[langRedux].HomeScreen.txtCancel;

  let txtRetweetedByUser = Languages.languages[langRedux].HomeScreen.txtRetweetedByUser;
  let txtTweetNotFound = Languages.languages[langRedux].HomeScreen.txtTweetNotFound;

  let txtAskDeleteTweet = Languages.languages[langRedux].HomeScreen.txtAskDeleteTweet;
  let txtDeleteTweet = Languages.languages[langRedux].HomeScreen.txtDeleteTweet;
  let txtAskRetweetTweet = Languages.languages[langRedux].HomeScreen.txtAskRetweetTweet;
  let txtRetweetTweet = Languages.languages[langRedux].HomeScreen.txtRetweetTweet;
  let txtAskComplaintTweet = Languages.languages[langRedux].HomeScreen.txtAskComplaintTweet;
  let txtAskCancelComplaintTweet = Languages.languages[langRedux].HomeScreen.txtAskCancelComplaintTweet;
  let txtCancelComplaintTweet = Languages.languages[langRedux].HomeScreen.txtCancelComplaintTweet;
  let txtYes = Languages.languages[langRedux].HomeScreen.txtYes;
  let txtNo = Languages.languages[langRedux].HomeScreen.txtNo;

  let txtAlertDelete1 = Languages.languages[langRedux].HomeScreen.txtAlertDelete1;
  let txtAlertDelete2 = Languages.languages[langRedux].HomeScreen.txtAlertDelete2;
  let txtAlertTweet1 = Languages.languages[langRedux].HomeScreen.txtAlertTweet1;
  let txtAlertTweet2 = Languages.languages[langRedux].HomeScreen.txtAlertTweet2;
  let txtAlertComplaint1 = Languages.languages[langRedux].HomeScreen.txtAlertComplaint1;
  let txtAlertComplaint2 = Languages.languages[langRedux].HomeScreen.txtAlertComplaint2;
  let txtAlertComplaint3 = Languages.languages[langRedux].HomeScreen.txtAlertComplaint3;
  let txtAlertComplaint4 = Languages.languages[langRedux].HomeScreen.txtAlertComplaint4;
  let txtAlertRetweet1 = Languages.languages[langRedux].HomeScreen.txtAlertRetweet1;
  let txtAlertRetweet2 = Languages.languages[langRedux].HomeScreen.txtAlertRetweet2;
  let txtAlertRetweet3 = Languages.languages[langRedux].HomeScreen.txtAlertRetweet3;
  let txtAlertCancelComplaint1 = Languages.languages[langRedux].HomeScreen.txtAlertCancelComplaint1;
  let txtAlertCancelComplaint2 = Languages.languages[langRedux].HomeScreen.txtAlertCancelComplaint2;
  let txtAlertCancelUpdate1 = Languages.languages[langRedux].HomeScreen.txtAlertCancelUpdate1;
  let txtAlertCancelUpdate2 = Languages.languages[langRedux].HomeScreen.txtAlertCancelUpdate2;
  let txtAlertCancelTitleEmpty1 = Languages.languages[langRedux].HomeScreen.txtAlertCancelTitleEmpty1;
  let txtAlertCancelTextEmpty1 = Languages.languages[langRedux].HomeScreen.txtAlertCancelTextEmpty1;
  let txtNotFoundTweet = Languages.languages[langRedux].HomeScreen.txtNotFoundTweet;
  let txtNotFoundComplaint = Languages.languages[langRedux].HomeScreen.txtNotFoundComplaint;

  function handleBackButtonClick() {
    navigation.goBack();
    return true;
  }

  function handleCancelAlert(complaintId) {
    Alert.alert(
      txtAskCancelComplaintTweet,
      txtCancelComplaintTweet,
      [
        {
          text: txtNo,
        },
        { text: txtYes, onPress: () => SendDeleteComplaintRequest(complaintId) },
      ],
    );
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

  const IconButtonsCancel = complaintId => {
    return (
      <IconButton
        onPress={() => {
          handleCancelAlert(complaintId);
        }}
        icon={<Icon as={MaterialIcon} name="cancel" />}
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
            name: 'cancel',
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

  useEffect(() => {
    if (sendValue == 0) {
      setShowSpinner(true);
      SendRenderMyComplaints();
      setTimeout(() => {
        setShowSpinner(false);
        setSendValue(1);
      }, 500);
    }
  }, []);

  const SendRenderMyComplaints = () => {
    fetch(MyStore.proxyRedux + '/complaints?userId=' + MyStore.idRedux, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + MyStore.tokenRedux,
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        response.json().then(complaintsJson => {
          console.log('complaintsJson ', complaintsJson);
          complaintsJson.reverse();
          setMyComplaints(complaintsJson);
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  const SendDeleteComplaintRequest = complaintId => {
    fetch(MyStore.proxyRedux + '/complaints/' + complaintId, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + MyStore.tokenRedux,
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (response.status == 200) {
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
                  {txtAlertCancelComplaint1}
                </Box>
              );
            },
          });
          onRefresh();
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
                  {{ txtAlertCancelComplaint2 }}
                </Box>
              );
            },
          });
          onRefresh();
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const Spinner = () => {
    if (showSpinner == true) {
      return (
        <View style={styles.complaintPlace}>
          <ActivityIndicator
            style={styles.spinner}
            size="large"
            color="green"
          />
        </View>
      );
    } else {
      return <Text style={styles.spinner}></Text>;
    }
  };

  const RenderSpinnerOrComplaints = () => {
    if (showSpinner == false) {
      return MyComplaints();
    } else {
      return Spinner();
    }
  };

  const MyComplaints = () => {
    if (myComplaints.length != 0) {
      return (
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {myComplaints.map(complaint => (
            <View key={complaint.id} style={styles.tweetCard}>
              {complaint.tweet.retweetUser.id != complaint.tweet.user.id && (
                <View style={styles.tweetCardUpRetweet}>
                  <Icon
                    as={Entypo}
                    style={{ color: 'black' }}
                    size={'md'}
                    name="retweet"
                  />
                  <Link
                    onPress={() => {
                      dispatch(SetSendMessageId1(complaint.tweet.retweetUser.id));
                      dispatch(SetSendMessageUsername1(complaint.tweet.retweetUser.username),);
                      dispatch(SetSendMessageEmail1(complaint.tweet.retweetUser.email));
                      dispatch(SetSendMessageLanguage1(complaint.tweet.retweetUser.language),);
                      dispatch(SetSendMessageGender1(complaint.tweet.retweetUser.gender));
                      dispatch(SetSendMessageDate1(complaint.tweet.retweetUser.localDate));
                      dispatch(SetSendMessageTime1(complaint.tweet.retweetUser.localTime));
                      dispatch(SetSendMessageImagePath1(complaint.tweet.retweetUser.imagePath));
                      navigation.navigate('ShowUserProfileScreen1');
                    }}>
                    <Text style={[styles.text4, { fontStyle: 'italic' }]}>
                      {' ' + complaint.tweet.retweetUser.username}
                    </Text>
                  </Link>
                  <Text style={styles.text4}>
                    {txtRetweetedByUser}
                  </Text>
                </View>
              )}
              <View key={complaint.id} style={styles.tweetCardUp}>
                <View style={styles.tweetCardUpLeft}>
                  <Link
                    onPress={() => {
                      dispatch(SetSendMessageId1(complaint.tweet.user.id));
                      dispatch(SetSendMessageUsername1(complaint.tweet.user.username),);
                      dispatch(SetSendMessageEmail1(complaint.tweet.user.email));
                      dispatch(SetSendMessageLanguage1(complaint.tweet.user.language),);
                      dispatch(SetSendMessageGender1(complaint.tweet.user.gender));
                      dispatch(SetSendMessageDate1(complaint.tweet.user.localDate));
                      dispatch(SetSendMessageTime1(complaint.tweet.user.localTime));
                      dispatch(SetSendMessageImagePath1(complaint.tweet.user.imagePath));
                      navigation.navigate('ShowUserProfileScreen1');
                    }}
                    style={{
                      width: '100%',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                    }}>
                    {complaint.tweet.user.imagePath != '' ? (
                      <Avatar
                        style={{ justifyContent: 'center', alignItems: 'center', borderWidth: 0.5, backgroundColor: '#CACFD2' }}
                        size="45px"
                        source={{ uri: complaint.tweet.user.imagePath }}>
                        <Text style={{ color: 'white', fontSize: 25 }}>
                          {complaint.tweet.user.username[0].toUpperCase()}
                        </Text>
                      </Avatar>
                    )
                      :
                      (
                        <Avatar
                          style={{ justifyContent: 'center', alignItems: 'center', borderWidth: 0.5, backgroundColor: '#CACFD2' }}
                          size="45px">
                          <Text style={{ color: 'white', fontSize: 25 }}>
                            {complaint.tweet.user.username[0].toUpperCase()}
                          </Text>
                        </Avatar>
                      )}
                    <Text style={styles.text3}>
                      {complaint.tweet.user.username}
                    </Text>
                  </Link>
                </View>
                <View style={styles.tweetCardUpRight1}></View>
                <View style={styles.tweetCardUpRight2}></View>
              </View>
              <View style={styles.tweetCardTitle}>
                <Text style={styles.text5}>{complaint.tweet.title}</Text>
              </View>
              <View style={styles.tweetCardText}>
                <Text style={styles.text5}>{complaint.tweet.text}</Text>
              </View>
              <View style={styles.tweetCardDown}>
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  {IconButtonsCancel(complaint.id)}
                  <Text style={styles.text6}>{txtCancel}</Text>
                </View>
                <View style={{ flexDirection: 'column', alignItems: 'flex-end' }}>
                  <Text style={styles.text6}>
                    {complaint.tweet.localTime[0] +
                      complaint.tweet.localTime[1] +
                      complaint.tweet.localTime[2] +
                      complaint.tweet.localTime[3] +
                      complaint.tweet.localTime[4]}
                  </Text>
                  <Text style={styles.text6}>
                    {complaint.tweet.localDate[8] +
                      complaint.tweet.localDate[9]}
                    /
                    {complaint.tweet.localDate[5] +
                      complaint.tweet.localDate[6]}
                    /
                    {complaint.tweet.localDate[0] +
                      complaint.tweet.localDate[1] +
                      complaint.tweet.localDate[2] +
                      complaint.tweet.localDate[3]}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      );
    } else {
      return (
        <View style={styles.complaintPlace}>
          <Text style={styles.text3}>{txtNotFoundComplaint}</Text>
        </View>
      );
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    SendRenderMyComplaints();
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }, []);

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>{IconButtonsTurnBack()}</View>
        <View style={styles.headerMiddle}>
          <Text style={styles.text2}>{SettingsScreen}</Text>
        </View>
        <View style={styles.headerRight}></View>
      </View>
      <View style={styles.footer}>
        <RefreshControl
          style={styles.refreshControl}
          onRefresh={onRefresh}
          refreshing={refreshing}>
          <ScrollView style={styles.scroll}>
            {RenderSpinnerOrComplaints()}
          </ScrollView>
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
  headerLeft: {
    width: '20%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  headerMiddle: {
    width: '60%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  headerRight: {
    width: '20%',
    justifyContent: 'flex-start',
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
    fontSize: 17,
    fontStyle: 'bold',
    color: 'black',
    margin: 5,
  },
  text4: {
    fontSize: 15,
    fontStyle: 'bold',
    color: 'black',
    margin: 5,
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
  SpinnerOrComplaints: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#0094C4',
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
  spinner: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  complaintPlace: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 35,
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
  alertBoxFlex: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  toastAlertMargin: {
    margin: 7,
  },
  complaintPlace: {
    backgroundColor: '#F0F3F4',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 15,
    marginBottom: 35,
  },
});

export default ComplaintsTweetScreen;
