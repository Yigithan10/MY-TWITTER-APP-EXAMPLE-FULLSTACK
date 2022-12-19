import React, {
  useState,
  useEffect,
  createRef,
  useRef,
  useCallback,
} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  RefreshControl,
  TextInput,
  BackHandler,
  ActivityIndicator,
  Alert,
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
  FlatList,
  VStack,
  Spacer,
  Center,
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
import Languages from '../../languages.json';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';

const TweetComments = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const toast = useToast();
  const { MyStore } = useSelector(state => state);

  const [commentId, setCommentId] = useState(0);
  const [text, setText] = useState('');
  const [isClickUpdateComment, setIsClickUpdateComment] = useState(false);

  const scrollRef = useRef();

  const sendCommentInputRef = createRef();

  const [showSpinner, setShowSpinner] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [comments, setComments] = useState([]);
  const [sendComment, setSendComment] = useState('');

  const langRedux = MyStore.languageRedux;

  let txtComment = Languages.languages[langRedux].HomeScreen.txtComment;
  let txtEnterComment = Languages.languages[langRedux].HomeScreen.txtEnterComment;
  let txtEnterNewComment = Languages.languages[langRedux].HomeScreen.txtEnterNewComment;
  let txtEnterComment2 = Languages.languages[langRedux].HomeScreen.txtEnterComment2;
  let txtCommentNotFound = Languages.languages[langRedux].HomeScreen.txtCommentNotFound;
  let txtEnterCommentAlert1 = Languages.languages[langRedux].HomeScreen.txtEnterCommentAlert1;
  let txtEnterCommentAlert2 = Languages.languages[langRedux].HomeScreen.txtEnterCommentAlert2;
  let txtEnterCommentAlert3 = Languages.languages[langRedux].HomeScreen.txtEnterCommentAlert3;
  let txtEnterCommentAlert4 = Languages.languages[langRedux].HomeScreen.txtEnterCommentAlert4;
  let txtEnterCommentAlert5 = Languages.languages[langRedux].HomeScreen.txtEnterCommentAlert5;
  let txtEnterCommentDelete1 = Languages.languages[langRedux].HomeScreen.txtEnterCommentDelete1;
  let txtEnterCommentDelete2 = Languages.languages[langRedux].HomeScreen.txtEnterCommentDelete2;
  let txtChangeUsernameAlert3 = Languages.languages[langRedux].HomeScreen.txtChangeUsernameAlert3;
  let txtYes = Languages.languages[langRedux].HomeScreen.txtYes;
  let txtNo = Languages.languages[langRedux].HomeScreen.txtNo;
  let txtEdit = Languages.languages[langRedux].HomeScreen.txtEdit;
  let txtDelete = Languages.languages[langRedux].HomeScreen.txtDelete;

  function DeleteComment(commentId) {
    Alert.alert(txtEnterCommentDelete1, txtEnterCommentDelete2, [
      {
        text: txtNo,
      },
      { text: txtYes, onPress: () => SendDeleteCommentRequest(commentId) },
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

  const IconButtonsTurnBack = () => {
    return (
      <IconButton
        onPress={() => {
          if (isClickUpdateComment == true) {
            setIsClickUpdateComment(false);
          } else {
            console.log("in IconButtonsTurnBack");
            dispatch(SetIsComment(1));
            navigation.goBack();
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

  useEffect(() => {
    setShowSpinner(true);
    SendTweetCommentsRequest();
    setTimeout(() => {
      setShowSpinner(false);
      onPressTouch();
    }, 150);
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    SendTweetCommentsRequest();
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }, []);

  const onPressTouch = () => {
    scrollRef.current?.scrollToEnd({
      animated: true,
    });
  };

  const Spinner = () => {
    if (showSpinner == true) {
      return (
        <View style={styles.commentsPlace}>
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

  const SendTweetCommentsRequest = () => {
    fetch(
      MyStore.proxyRedux + '/comments?tweetId=' +
      MyStore.showTweetCommentsId,
      {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + MyStore.tokenRedux,
          'Content-Type': 'application/json',
        },
      },
    )
      .then(response => {
        response.json().then(commentsJson => {
          commentsJson.reverse();
          console.log('commentsJson', commentsJson);
          setComments(commentsJson);
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  const SendCreateComment = () => {
    if (sendComment != "") {
      fetch(MyStore.proxyRedux + '/comments', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + MyStore.tokenRedux,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tweetId: MyStore.showTweetCommentsId,
          userId: MyStore.idRedux,
          text: sendComment,
        }),
      })
        .then(response => {
          response.json().then(createJson => {
            if (response.status == 201) {
              setSendComment('');
              SendTweetCommentsRequest();
              onRefresh();
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
                      {txtChangeUsernameAlert3}
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
              {txtEnterComment}
            </Box>
          );
        },
      });
    }
  };

  const SendDeleteCommentRequest = commentId => {
    fetch(MyStore.proxyRedux + '/comments/' + commentId, {
      method: 'Delete',
      headers: {
        'Authorization': 'Bearer ' + MyStore.tokenRedux,
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (response.status == 200) {
          onRefresh();
          setSendComment('');
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
                  {txtEnterCommentAlert4}
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
                  {txtEnterCommentAlert5}
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

  const SendUpdateCommentRequest = () => {
    if (text.length != 0) {
      fetch(MyStore.proxyRedux + '/comments?commentId=' + commentId, {
        method: 'PUT',
        headers: {
          'Authorization': 'Bearer ' + MyStore.tokenRedux,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text,
        }),
      })
        .then(response => {
          response.json().then(updateJson => {
            if (response.status == 200) {
              setSendComment('');
              SendTweetCommentsRequest();
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
                      {txtEnterCommentAlert1}
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
                      {txtEnterCommentAlert2}
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
                      {txtEnterCommentAlert3}
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
              {txtEnterCommentAlert3}
            </Box>
          );
        },
      });
    }
  };

  const AllComments = () => {
    if (showSpinner == false) {
      if (comments.length != 0) {
        if (isClickUpdateComment == false) {
          return (
            <Box>
              <FlatList
                data={comments}
                renderItem={({ item }) => (
                  <Box>
                    {comments.length != 0 && item.user.id == MyStore.idRedux ? (
                      <Box
                        style={{
                          flexDirection: 'row',
                        }}
                        borderBottomWidth="1"
                        _dark={{
                          borderColor: 'muted.50',
                        }}
                        borderColor="muted.800"
                        pl={['0', '4']}
                        pr={['0', '5']}
                        py="2">
                        <VStack
                          style={{
                            flexDirection: 'column',
                            justifyContent: 'flex-start',
                            alignItems: 'flex-start',
                          }}>
                          <VStack
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'flex-start',
                              alignItems: 'flex-start',
                            }}>
                            <Link
                              onPress={() => {
                                dispatch(SetContainerScreen('Profile'));
                                navigation.navigate('Profile');
                              }}
                              space={[2, 3]}>
                              {MyStore.imagePathRedux != '' ? (
                                <Avatar
                                  style={{ marginLeft: 5, justifyContent: 'center', alignItems: 'center', borderWidth: 0.5, backgroundColor: '#CACFD2' }}
                                  size="28px"
                                  source={{ uri: MyStore.imagePathRedux }}>
                                  {item.user.username[0].toUpperCase()}
                                </Avatar>
                              )
                                :
                                (
                                  <Avatar
                                    style={{ marginLeft: 5, justifyContent: 'center', alignItems: 'center', borderWidth: 0.5, backgroundColor: '#CACFD2' }}
                                    size="28px">
                                    {item.user.username[0].toUpperCase()}
                                  </Avatar>
                                )}
                              <Text style={styles.text3}>
                                {item.user.username}
                              </Text>
                            </Link>
                          </VStack>
                          <VStack
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'flex-start',
                              alignItems: 'flex-start',
                            }}>
                            <Text style={[styles.text5, { margin: 5 }]}>
                              {item.localDate[8] + item.localDate[9]}/
                              {item.localDate[5] + item.localDate[6]}/
                              {item.localDate[0] +
                                item.localDate[1] +
                                item.localDate[2] +
                                item.localDate[3]}
                            </Text>
                            <Text style={[styles.text5, { margin: 5 }]}>
                              {"|"}
                            </Text>
                            <Text style={[styles.text5, { margin: 5 }]}>
                              {item.localTime[0] +
                                item.localTime[1] +
                                item.localTime[2] +
                                item.localTime[3] +
                                item.localTime[4]}
                            </Text>
                          </VStack>
                        </VStack>
                        <VStack
                          style={{
                            justifyContent: 'flex-start',
                            alignItems: 'flex-start',
                            marginTop: 3,
                            maxWidth: '50%',
                          }}>
                          <Text style={styles.text5}>{item.text}</Text>
                        </VStack>
                        <Spacer />
                        <VStack
                          style={{
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <IconButton
                            onPress={() => {
                              setCommentId(item.id);
                              setText(item.text);
                              setIsClickUpdateComment(true);
                            }}
                            icon={
                              <Icon
                                as={MaterialCommunityIcons}
                                name="comment-edit"
                              />
                            }
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
                          <Text style={styles.text5}>{txtEdit}</Text>
                        </VStack>
                        <VStack
                          style={{
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <IconButton
                            onPress={() => {
                              DeleteComment(item.id);
                            }}
                            icon={<Icon as={MaterialIcon} name="delete" />}
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
                          <Text style={styles.text5}>{txtDelete}</Text>
                        </VStack>
                      </Box>
                    ) : (
                      <Box
                        style={{
                          flexDirection: 'row',
                        }}
                        borderBottomWidth="1"
                        _dark={{
                          borderColor: 'muted.50',
                        }}
                        borderColor="muted.800"
                        pl={['0', '4']}
                        pr={['0', '5']}
                        py="2">
                        <VStack
                          style={{
                            flexDirection: 'column',
                            justifyContent: 'flex-start',
                            alignItems: 'flex-start',
                          }}>
                          <VStack
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'flex-start',
                              alignItems: 'flex-start',
                            }}>
                            <Link
                              onPress={() => {
                                console.log('userrr');
                                dispatch(SetSendMessageId1(item.user.id));
                                dispatch(
                                  SetSendMessageUsername1(item.user.username),
                                );
                                dispatch(SetSendMessageEmail1(item.user.email));
                                dispatch(
                                  SetSendMessageLanguage1(item.user.language),
                                );
                                dispatch(
                                  SetSendMessageGender1(item.user.gender),
                                );
                                dispatch(
                                  SetSendMessageDate1(item.user.localDate),
                                );
                                dispatch(
                                  SetSendMessageTime1(item.user.localTime),
                                );
                                dispatch(
                                  SetSendMessageImagePath1(item.user.imagePath),
                                );
                                navigation.navigate('ShowUserProfileScreen1');
                              }}
                              space={[2, 3]}>
                              {item.user.imagePath != '' ? (
                                <Avatar
                                  style={{ marginLeft: 5, justifyContent: 'center', alignItems: 'center', borderWidth: 0.5, backgroundColor: '#CACFD2' }}
                                  size="28px"
                                  source={{ uri: item.user.imagePath }}>
                                  {item.user.username[0].toUpperCase()}
                                </Avatar>
                              )
                                :
                                (
                                  <Avatar
                                    style={{ marginLeft: 5, justifyContent: 'center', alignItems: 'center', borderWidth: 0.5, backgroundColor: '#CACFD2' }}
                                    size="28px">
                                    {item.user.username[0].toUpperCase()}
                                  </Avatar>
                                )}
                              <Text style={styles.text3}>
                                {item.user.username}
                              </Text>
                            </Link>
                          </VStack>
                          <VStack
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'flex-start',
                              alignItems: 'flex-start',
                            }}>
                            <Text style={[styles.text5, { margin: 5 }]}>
                              {item.localDate[8] + item.localDate[9]}/
                              {item.localDate[5] + item.localDate[6]}/
                              {item.localDate[0] +
                                item.localDate[1] +
                                item.localDate[2] +
                                item.localDate[3]}
                            </Text>
                            <Text style={[styles.text5, { margin: 5 }]}>
                              {"|"}
                            </Text>
                            <Text style={[styles.text5, { margin: 5 }]}>
                              {item.localTime[0] +
                                item.localTime[1] +
                                item.localTime[2] +
                                item.localTime[3] +
                                item.localTime[4]}
                            </Text>
                          </VStack>
                        </VStack>
                        <VStack
                          style={{
                            justifyContent: 'flex-start',
                            alignItems: 'flex-start',
                            marginTop: 3,
                            maxWidth: '50%',
                          }}>
                          <Text style={styles.text5}>{item.text}</Text>
                        </VStack>
                        <Spacer />
                        <VStack
                          style={{
                            justifyContent: 'flex-start',
                            alignItems: 'flex-start',
                          }}></VStack>
                      </Box>
                    )}
                  </Box>
                )}
                keyExtractor={item => item.id}
              />
            </Box>
          );
        } else {
          return (
            <View
              style={{
                width: '100%',
                height: '100%',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}>
              <Text style={styles.text3}>Update comment</Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TextInput
                  onPressIn={() => {
                    setTimeout(() => {
                      onPressTouch();
                    }, 200);
                  }}
                  style={[styles.textInput, { width: '75%' }]}
                  placeholder={txtEnterNewComment}
                  defaultValue={text}
                  // autoCapitalize={'none'}
                  // blurOnSubmit={false}
                  returnKeyType={'done'}
                  onSubmitEditing={() => {
                    SendUpdateCommentRequest();
                    setTimeout(() => {
                      setIsClickUpdateComment(false);
                      SendTweetCommentsRequest();
                      onRefresh();
                      onPressTouch();
                    }, 500);
                  }}
                  onChangeText={text => setText(text)}
                />
                <View
                  style={{
                    width: '20%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Button
                    style={styles.button}
                    onPress={() => {
                      SendUpdateCommentRequest();
                      setTimeout(() => {
                        setIsClickUpdateComment(false);
                        SendTweetCommentsRequest();
                        onRefresh();
                        onPressTouch();
                      }, 500);
                    }}>
                    <Icon
                      as={MaterialCommunityIcons}
                      name="comment-check"
                      color={'black'}
                      size={25}
                    />
                  </Button>
                </View>
              </View>
            </View>
          );
        }
      } else {
        return (
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.text3}>{txtCommentNotFound}</Text>
          </View>
        );
      }
    } else {
      return Spinner();
    }
  };

  const DownInputAndButton = () => {
    if (isClickUpdateComment == false) {
      return (
        <View style={styles.down}>
          <View style={styles.downInput}>
            <TextInput
              onPressIn={() => {
                setTimeout(() => {
                  onPressTouch();
                }, 200);
              }}
              style={styles.textInput}
              placeholder={txtEnterComment2}
              value={sendComment}
              // autoCapitalize={'none'}
              // blurOnSubmit={false}
              returnKeyType={'send'}
              ref={sendCommentInputRef}
              onSubmitEditing={() => {
                SendCreateComment();
                setTimeout(() => {
                  onPressTouch();
                }, 150);
              }}
              onChangeText={text => setSendComment(text)}
            />
          </View>
          <View style={styles.downButton}>
            <Button
              onPress={() => {
                SendCreateComment();
                setTimeout(() => {
                  onPressTouch();
                }, 150);
              }}
              style={styles.button}>
              <Icon
                as={MaterialCommunityIcons}
                name="comment-check"
                color={'black'}
                size={25}
              />
            </Button>
          </View>
        </View>
      );
    } else {
      return <Text> </Text>;
    }
  };

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>{IconButtonsTurnBack()}</View>
        <View style={styles.headerMiddle}>
          <Text style={styles.text2}>
            {txtComment}
          </Text>
        </View>
        <View style={styles.headerRight}></View>
      </View>
      <View style={styles.footer}>
        <RefreshControl
          style={styles.refreshControl}
          onRefresh={onRefresh}
          refreshing={refreshing}>
          {AllComments()}
        </RefreshControl>
      </View>
      {DownInputAndButton()}
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
  buttonUpdate: {
    width: '25%',
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
  spinner: {
    margin: 10,
    padding: 25,
    height: 50,
    width: '100%',
    flex: 1,
  },
  commentUserPlace: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 15,
    marginBottom: 35,
  },
  commentsPlace: {
    backgroundColor: '#F0F3F4',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 15,
    marginBottom: 35,
  },
});

export default TweetComments;