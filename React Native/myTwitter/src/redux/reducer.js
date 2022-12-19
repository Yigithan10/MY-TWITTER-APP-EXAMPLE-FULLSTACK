const INITIAL_STATE = {
  proxyRedux: "http://192.168.1.36:7979",

  containerScreen: "Home",

  tokenRedux: "",
  id: 0,
  usernameRedux: '',
  emailRedux: '',
  languageRedux: '',
  genderRedux: '',
  dateRedux: '',
  timeRedux: '',
  imagePathRedux: '',

  sendMessageIdRedux1: 0,
  sendMessageUsernameRedux1: '',
  sendMessageEmailRedux1: '',
  sendMessageLanguageRedux1: '',
  sendMessageGenderRedux1: '',
  sendMessageDateRedux1: '',
  sendMessageTimeRedux1: '',
  sendMessageImagePathRedux1: '',

  sendMessageIdRedux2: 0,
  sendMessageUsernameRedux2: '',
  sendMessageEmailRedux2: '',
  sendMessageLanguageRedux2: '',
  sendMessageGenderRedux2: '',
  sendMessageDateRedux2: '',
  sendMessageTimeRedux2: '',
  sendMessageImagePathRedux2: '',

  sendMessageIdRedux3: 0,
  sendMessageUsernameRedux3: '',
  sendMessageEmailRedux3: '',
  sendMessageLanguageRedux3: '',
  sendMessageGenderRedux3: '',
  sendMessageDateRedux3: '',
  sendMessageTimeRedux3: '',
  sendMessageImagePathRedux3: '',

  showTweetCommentsId: 0,
  isComment: 0
};

//-----

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_CONTAINERSCREEN':
      return { ...state, containerScreen: action.payload };

    case 'SET_ID':
      return { ...state, idRedux: action.payload };

    case 'SET_TOKEN':
      return { ...state, tokenRedux: action.payload };

    case 'SET_USERNAME':
      return { ...state, usernameRedux: action.payload };

    case 'SET_EMAIL':
      return { ...state, emailRedux: action.payload };

    case 'SET_LANGUAGE':
      return { ...state, languageRedux: action.payload };

    case 'SET_GENDER':
      return { ...state, genderRedux: action.payload };

    case 'SET_DATE':
      return { ...state, dateRedux: action.payload };

    case 'SET_TIME':
      return { ...state, timeRedux: action.payload };

    case 'SET_IMAGEPATH':
      return { ...state, imagePathRedux: action.payload };

    case 'SET_SENDMESSAGEID1':
      return { ...state, sendMessageIdRedux1: action.payload };

    case 'SET_SENDMESSAGEUSERNAME1':
      return { ...state, sendMessageUsernameRedux1: action.payload };

    case 'SET_SENDMESSAGEEMAIL1':
      return { ...state, sendMessageEmailRedux1: action.payload };

    case 'SET_SENDMESSAGELANGUAGE1':
      return { ...state, sendMessageLanguageRedux1: action.payload };

    case 'SET_SENDMESSAGEGENDER1':
      return { ...state, sendMessageGenderRedux1: action.payload };

    case 'SET_SENDMESSAGEDATE1':
      return { ...state, sendMessageDateRedux1: action.payload };

    case 'SET_SENDMESSAGETIME1':
      return { ...state, sendMessageTimeRedux1: action.payload };

    case 'SET_SENDMESSAGEIMAGEPATH1':
      return { ...state, sendMessageImagePathRedux1: action.payload };

    case 'SET_SENDMESSAGEID2':
      return { ...state, sendMessageIdRedux2: action.payload };

    case 'SET_SENDMESSAGEUSERNAME2':
      return { ...state, sendMessageUsernameRedux2: action.payload };

    case 'SET_SENDMESSAGEEMAIL2':
      return { ...state, sendMessageEmailRedux2: action.payload };

    case 'SET_SENDMESSAGELANGUAGE2':
      return { ...state, sendMessageLanguageRedux2: action.payload };

    case 'SET_SENDMESSAGEGENDER2':
      return { ...state, sendMessageGenderRedux2: action.payload };

    case 'SET_SENDMESSAGEDATE2':
      return { ...state, sendMessageDateRedux2: action.payload };

    case 'SET_SENDMESSAGETIME2':
      return { ...state, sendMessageTimeRedux2: action.payload };

    case 'SET_SENDMESSAGEIMAGEPATH2':
      return { ...state, sendMessageImagePathRedux2: action.payload };

    case 'SET_SENDMESSAGEID3':
      return { ...state, sendMessageIdRedux3: action.payload };

    case 'SET_SENDMESSAGEUSERNAME3':
      return { ...state, sendMessageUsernameRedux3: action.payload };

    case 'SET_SENDMESSAGEEMAIL3':
      return { ...state, sendMessageEmailRedux3: action.payload };

    case 'SET_SENDMESSAGELANGUAGE3':
      return { ...state, sendMessageLanguageRedux3: action.payload };

    case 'SET_SENDMESSAGEGENDER3':
      return { ...state, sendMessageGenderRedux3: action.payload };

    case 'SET_SENDMESSAGEDATE3':
      return { ...state, sendMessageDateRedux3: action.payload };

    case 'SET_SENDMESSAGETIME3':
      return { ...state, sendMessageTimeRedux3: action.payload };

    case 'SET_SENDMESSAGEIMAGEPATH3':
      return { ...state, sendMessageImagePathRedux3: action.payload };

    case 'SET_SHOWTWEETCOMMENTSID':
      return { ...state, showTweetCommentsId: action.payload };

    case 'SET_ISCOMMENT':
      return { ...state, isComment: action.payload };

    default:
      return state;
  }
};
