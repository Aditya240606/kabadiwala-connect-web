export type SupportedLanguage = 'en' | 'hi' | 'mr';

export interface Translations {
  appName: string;
  appSubtitle: string;
  fieldReady: string;
  listen: string;
  listening: string;
  serviceArea: string;

  // Bottom Nav
  navHome: string;
  navCollections: string;
  navTransactions: string;
  navProfile: string;

  // Role Selection
  roleStepBadge: string;
  roleStepTitle: string;
  roleTitle: string;
  roleSubtitle: string;
  roleSelectedBadge: string;
  rolePrimaryBadge: string;
  roleCollectorTitle: string;
  roleCollectorSub: string;
  roleCollectorBullets: string[];
  roleCollectorTag: string;
  roleRecyclerTitle: string;
  roleRecyclerSub: string;
  roleRecyclerBullets: string[];
  roleNotice: string;
  continueCollector: string;
  continueRecycler: string;
  roleEnterWorkspace: string;

  // Collector Home
  homeCollectorMode: string;
  sampleDataBadge: string;
  homePrimaryActionTag: string;
  homeHeroTitle: string;
  homeHeroSubtitle: string;
  homeHeroCta: string;
  homeQuickCollections: string;
  homeQuickTransactions: string;
  homeQuickRecycler: string;
  homeSummaryTitle: string;
  homeSummaryToday: string;
  homeSummaryEstValue: string;
  homeSummaryIndicative: string;
  homeSummaryTotalWeight: string;
  homeSummaryActiveLots: string;
  homeRecentCollections: string;
  homeViewAll: string;
  homeSafetyTipTitle: string;
  homeSafetyTipText: string;

  // Status Labels
  statusReady: string;
  statusWaiting: string;
  statusCompleted: string;

  // Collections
  collectionsTitle: string;
  collectionsSub: string;
  newCollectionBtn: string;
  filterAll: string;
  filterWaiting: string;
  filterReady: string;
  filterCompleted: string;
  estValueLabel: string;
  viewDetails: string;

  // Collection Detail
  detailTitleSuffix: string;
  manifestTitle: string;
  weightEntryManual: string;
  categoryHighYieldPcb: string;
  pcbMotherboardTitle: string;
  materialPhotoTitle: string;
  attachmentCount: string;
  cameraCaptured: string;
  changePhotoBtn: string;
  noteTag: string;
  gradeANote: string;
  declaredWeightTitle: string;
  declaredWeightSub: string;
  estValueTitle: string;
  estValueSub: string;
  batchProgressTitle: string;
  stepOfProgress: string;
  step1Title: string;
  step1Desc: string;
  step2Title: string;
  step2Desc: string;
  step2CurrentBadge: string;
  step3Title: string;
  step3Desc: string;
  step4Title: string;
  step4Desc: string;
  verificationPolicyTitle: string;
  verificationPolicyBody: string;
  findRecyclerBtn: string;
  nextStepBadge: string;
  editLotBtn: string;

  // Profile
  profileTitle: string;
  profileSub: string;
  profileName: string;
  profilePhoneLabel: string;
  profilePhonePlaceholder: string;
  profileAreaLabel: string;
  profileRole: string;
  preferencesTitle: string;
  settingsLanguage: string;
  settingsAudio: string;
  settingsAudioSub: string;
  settingsLocalStorage: string;
  settingsLocalStorageSub: string;
  activeStatusBadge: string;
  switchRoleBtn: string;
  logoutBtn: string;
  appVersionNotice: string;
}

export const translations: Record<SupportedLanguage, Translations> = {
  en: {
    appName: 'KABADIWALA CONNECT',
    appSubtitle: 'E-WASTE PLATFORM',
    fieldReady: 'FIELD READY',
    listen: 'Listen',
    listening: 'Playing...',
    serviceArea: 'Service Area',

    // Bottom Nav
    navHome: 'Home',
    navCollections: 'Collections',
    navTransactions: 'Transactions',
    navProfile: 'Profile',

    // Role Selection
    roleStepBadge: 'STEP 3 OF 3',
    roleStepTitle: 'Role Selection',
    roleTitle: 'Who are you?',
    roleSubtitle: 'Select how you will use Kabadiwala Connect.',
    roleSelectedBadge: '✓ SELECTED ROLE',
    rolePrimaryBadge: 'PRIMARY',
    roleCollectorTitle: 'COLLECTOR',
    roleCollectorSub: 'Collect and sell e-waste scrap',
    roleCollectorBullets: [
      'Log scrap lots with photo & weight',
      'Find nearby verified recyclers',
      'Keep digital records of sales and receipts',
    ],
    roleCollectorTag: '★ Best for street scrap collectors & aggregators',
    roleRecyclerTitle: 'RECYCLER',
    roleRecyclerSub: 'Buy and process e-waste scrap',
    roleRecyclerBullets: [
      'Discover incoming local scrap lots and availability',
      'Verify weight physically at handover',
      'Generate formal lot handover receipts',
    ],
    roleNotice:
      'You can change your role later in Profile settings. No upfront fees or deposits required.',
    continueCollector: 'CONTINUE AS COLLECTOR',
    continueRecycler: 'CONTINUE AS RECYCLER',
    roleEnterWorkspace: 'Press to enter Collector workspace',

    // Collector Home
    homeCollectorMode: 'COLLECTOR MODE',
    sampleDataBadge: 'SAMPLE DATA',
    homePrimaryActionTag: 'PRIMARY ACTION',
    homeHeroTitle: 'START NEW COLLECTION',
    homeHeroSubtitle: 'Log a new e-waste scrap lot with weight and photo',
    homeHeroCta: 'START NOW',
    homeQuickCollections: 'COLLECTIONS',
    homeQuickTransactions: 'TRANSACTIONS',
    homeQuickRecycler: 'FIND RECYCLER',
    homeSummaryTitle: "TODAY'S SUMMARY",
    homeSummaryToday: 'Today',
    homeSummaryEstValue: 'Estimated Value',
    homeSummaryIndicative: 'Indicative Price',
    homeSummaryTotalWeight: 'Total Weight',
    homeSummaryActiveLots: 'Active Lots',
    homeRecentCollections: 'RECENT LOTS',
    homeViewAll: 'View All',
    homeSafetyTipTitle: 'SAFETY SORTING TIP',
    homeSafetyTipText:
      'Keep batteries and phones separate from mixed scrap for safer sorting and handling.',

    // Status
    statusReady: 'Ready',
    statusWaiting: 'Waiting',
    statusCompleted: 'Completed',

    // Collections
    collectionsTitle: 'COLLECTIONS',
    collectionsSub: 'Active and completed e-waste material lots',
    newCollectionBtn: 'NEW COLLECTION',
    filterAll: 'All',
    filterWaiting: 'Waiting',
    filterReady: 'Ready',
    filterCompleted: 'Completed',
    estValueLabel: 'Est. Value',
    viewDetails: 'View Details',

    // Collection Detail
    detailTitleSuffix: 'Details',
    manifestTitle: 'E-WASTE MANIFEST',
    weightEntryManual: 'WEIGHT ENTRY: MANUAL',
    categoryHighYieldPcb: 'CATEGORY: HIGH YIELD PCB',
    pcbMotherboardTitle: 'Motherboard PCB',
    materialPhotoTitle: 'MATERIAL PHOTO',
    attachmentCount: '1 ATTACHMENT',
    cameraCaptured: 'CAMERA CAPTURED',
    changePhotoBtn: 'Change Photo',
    noteTag: 'NOTE',
    gradeANote: 'Grade A • Clean Dismantled • No heavy chassis metals',
    declaredWeightTitle: 'DECLARED WEIGHT',
    declaredWeightSub: 'Collector declared',
    estValueTitle: 'EST. VALUE',
    estValueSub: 'Indicative estimate',
    batchProgressTitle: 'BATCH PROGRESS',
    stepOfProgress: 'STEP 2 OF 4',
    step1Title: 'Lot Created',
    step1Desc: 'Logged by collector with declared photo & weight',
    step2Title: 'Waiting for Recycler',
    step2Desc: 'Broadcasted to 4 registered recyclers within 6km radius',
    step2CurrentBadge: 'CURRENT',
    step3Title: 'Recycler Matched',
    step3Desc: 'Awaiting recycler acceptance & slot booking',
    step4Title: 'Handover & Payment',
    step4Desc: 'Physical handover & final receipt at recycler facility',
    verificationPolicyTitle: 'VERIFICATION POLICY',
    verificationPolicyBody:
      'Estimated value is indicative based on declared category. The recycler physically re-weighs and verifies material condition at handover before issuing final payment receipt.',
    findRecyclerBtn: 'FIND RECYCLER',
    nextStepBadge: 'NEXT',
    editLotBtn: 'EDIT LOT DETAILS',

    // Profile
    profileTitle: 'COLLECTOR PROFILE',
    profileSub: 'Account and primary device preferences',
    profileName: 'Your Name',
    profilePhoneLabel: 'Phone:',
    profilePhonePlaceholder: '+91 XXXXX XXXXX',
    profileAreaLabel: 'Assigned Area:',
    profileRole: 'Collector',
    preferencesTitle: 'DEVICE PREFERENCES',
    settingsLanguage: 'App Language',
    settingsAudio: 'Audio Guide Assistance',
    settingsAudioSub: 'Voice guidance on buttons',
    settingsLocalStorage: 'Local Lot Storage Cache',
    settingsLocalStorageSub: 'Offline collection cache',
    activeStatusBadge: 'ACTIVE',
    switchRoleBtn: 'SWITCH TO RECYCLER MODE',
    logoutBtn: 'LOG OUT',
    appVersionNotice: 'Designed for informal e-waste aggregators & recyclers',
  },

  hi: {
    appName: 'कबाड़ीवाला कनेक्ट',
    appSubtitle: 'ई-कचरा प्लेटफॉर्म',
    fieldReady: 'फील्ड तैयार',
    listen: 'सुनें',
    listening: 'बोल रहा है...',
    serviceArea: 'सेवा क्षेत्र',

    // Bottom Nav
    navHome: 'मुख्य',
    navCollections: 'सामग्री',
    navTransactions: 'लेन-देन',
    navProfile: 'प्रोफाइल',

    // Role Selection
    roleStepBadge: 'चरण 3 / 3',
    roleStepTitle: 'भूमिका चयन',
    roleTitle: 'आप कौन हैं?',
    roleSubtitle: 'चुनें कि आप कबाड़ीवाला कनेक्ट का उपयोग कैसे करेंगे।',
    roleSelectedBadge: '✓ चयनित भूमिका',
    rolePrimaryBadge: 'प्राथमिक',
    roleCollectorTitle: 'कबाड़ीवाला',
    roleCollectorSub: 'ई-कचरा इकट्ठा करें और बेचें',
    roleCollectorBullets: [
      'फोटो और वजन के साथ स्क्रैप लॉट दर्ज करें',
      'पास के सत्यापित रिसाइक्लर खोजें',
      'बिक्री और रसीदों का डिजिटल हिसाब रखें',
    ],
    roleCollectorTag: '★ कबाड़ संग्राहकों और एग्रीगेटर्स के लिए सर्वोत्तम',
    roleRecyclerTitle: 'रिसाइक्लर',
    roleRecyclerSub: 'ई-कचरा खरीदें और रीसायकल करें',
    roleRecyclerBullets: [
      'स्थानीय ई-कचरा लॉट की उपलब्धता देखें',
      'हैंडओवर पर भौतिक रूप से वजन जांचें',
      'औपचारिक लॉट हैंडओवर रसीद जारी करें',
    ],
    roleNotice:
      'आप प्रोफाइल सेटिंग्स में कभी भी अपनी भूमिका बदल सकते हैं। किसी प्रकार का अग्रिम शुल्क नहीं।',
    continueCollector: 'कबाड़ीवाला के रूप में आगे बढ़ें',
    continueRecycler: 'रिसाइक्लर के रूप में आगे बढ़ें',
    roleEnterWorkspace: 'कलेक्टर डैशबोर्ड में प्रवेश करने के लिए दबाएं',

    // Collector Home
    homeCollectorMode: 'कबाड़ीवाला मोड',
    sampleDataBadge: 'उदाहरण डेटा',
    homePrimaryActionTag: 'मुख्य कार्य',
    homeHeroTitle: 'नई सामग्री दर्ज करें',
    homeHeroSubtitle: 'फोटो और वजन के साथ नया ई-कचरा लॉट जोड़ें',
    homeHeroCta: 'अभी शुरू करें',
    homeQuickCollections: 'सामग्री',
    homeQuickTransactions: 'लेन-देन',
    homeQuickRecycler: 'रिसाइक्लर खोजें',
    homeSummaryTitle: 'आज का सारांश',
    homeSummaryToday: 'आज',
    homeSummaryEstValue: 'अनुमानित मूल्य',
    homeSummaryIndicative: 'सांकेतिक मूल्य',
    homeSummaryTotalWeight: 'कुल वजन',
    homeSummaryActiveLots: 'सक्रिय लॉट',
    homeRecentCollections: 'हालिया सामग्री',
    homeViewAll: 'सभी देखें',
    homeSafetyTipTitle: 'सुरक्षा सुझाव',
    homeSafetyTipText:
      'सुरक्षित छंटाई के लिए बैटरी और मोबाइल को अन्य कबाड़ से अलग रखें।',

    // Status
    statusReady: 'तैयार',
    statusWaiting: 'प्रतीक्षा',
    statusCompleted: 'पूर्ण',

    // Collections
    collectionsTitle: 'सामग्री सूची',
    collectionsSub: 'सक्रिय और पूर्व में दर्ज की गई सामग्री सूची',
    newCollectionBtn: 'नई सामग्री',
    filterAll: 'सभी',
    filterWaiting: 'प्रतीक्षा',
    filterReady: 'तैयार',
    filterCompleted: 'पूर्ण',
    estValueLabel: 'अनुमानित मूल्य',
    viewDetails: 'विवरण देखें',

    // Collection Detail
    detailTitleSuffix: 'विवरण',
    manifestTitle: 'ई-कचरा घोषणापत्र',
    weightEntryManual: 'वज़न: मैन्युअल दर्ज',
    categoryHighYieldPcb: 'श्रेणी: उच्च गुणवत्ता पीसीबी',
    pcbMotherboardTitle: 'मदरबोर्ड पीसीबी',
    materialPhotoTitle: 'सामग्री की फोटो',
    attachmentCount: '1 फोटो संलग्न',
    cameraCaptured: 'फोटो संलग्न',
    changePhotoBtn: 'फोटो बदलें',
    noteTag: 'नोट',
    gradeANote: 'ग्रेड ए • साफ अलग किया हुआ • कोई भारी चेसिस धातु नहीं',
    declaredWeightTitle: 'घोषित वजन',
    declaredWeightSub: 'कबाड़ीवाला द्वारा दर्ज',
    estValueTitle: 'अनुमानित मूल्य',
    estValueSub: 'सांकेतिक मूल्य',
    batchProgressTitle: 'चक्र स्थिति',
    stepOfProgress: 'चरण 2 / 4',
    step1Title: 'लॉट दर्ज',
    step1Desc: 'घोषित फोटो और वजन के साथ संग्राहक द्वारा दर्ज',
    step2Title: 'रिसाइक्लर की प्रतीक्षा',
    step2Desc: '6 किमी के दायरे में 4 पंजीकृत रिसाइक्लर्स को सूचित किया गया',
    step2CurrentBadge: 'वर्तमान',
    step3Title: 'रिसाइक्लर मैच',
    step3Desc: 'रिसाइक्लर स्वीकृति और समय स्लॉट की प्रतीक्षा',
    step4Title: 'हैंडओवर और भुगतान',
    step4Desc: 'रिसाइक्लर केंद्र पर भौतिक हैंडओवर और अंतिम रसीद',
    verificationPolicyTitle: 'सत्यापन नीति',
    verificationPolicyBody:
      'अनुमानित मूल्य घोषित श्रेणी पर आधारित सांकेतिक दर है। अंतिम भुगतान रसीद जारी करने से पहले रिसाइक्लर हैंडओवर पर भौतिक रूप से सामग्री का वजन और स्थिति जांचेगा।',
    findRecyclerBtn: 'रिसाइक्लर खोजें',
    nextStepBadge: 'आगे',
    editLotBtn: 'विवरण सुधारें',

    // Profile
    profileTitle: 'कलेक्टर प्रोफाइल',
    profileSub: 'खाता और प्राथमिक सेटिंग्स',
    profileName: 'आपका नाम',
    profilePhoneLabel: 'मोबाइल:',
    profilePhonePlaceholder: '+91 XXXXX XXXXX',
    profileAreaLabel: 'आवंटित क्षेत्र:',
    profileRole: 'कबाड़ीवाला',
    preferencesTitle: 'डिवाइस प्राथमिकताएं',
    settingsLanguage: 'ऐप की भाषा',
    settingsAudio: 'आवाज सहायता',
    settingsAudioSub: 'बटन पर आवाज मार्गदर्शन',
    settingsLocalStorage: 'स्थानीय डेटा स्टोरेज',
    settingsLocalStorageSub: 'ऑफलाइन लॉट संग्रह कैश',
    activeStatusBadge: 'सक्रिय',
    switchRoleBtn: 'रिसाइक्लर मोड में बदलें',
    logoutBtn: 'लॉग आउट',
    appVersionNotice: 'अनौपचारिक ई-कचरा संग्राहकों और रिसाइक्लर्स के लिए निर्मित',
  },

  mr: {
    appName: 'कबाड़ीवाला कनेक्ट',
    appSubtitle: 'ई-कचरा प्लॅटफॉर्म',
    fieldReady: 'सज्ज',
    listen: 'ऐका',
    listening: 'बोलत आहे...',
    serviceArea: 'सेवा क्षेत्र',

    // Bottom Nav
    navHome: 'मुख्य',
    navCollections: 'सामग्री',
    navTransactions: 'व्यवहार',
    navProfile: 'प्रोफाइल',

    // Role Selection
    roleStepBadge: 'टप्पा 3 / 3',
    roleStepTitle: 'भूमिका निवड',
    roleTitle: 'तुम्ही कोण आहात?',
    roleSubtitle: 'आपण कबाड़ीवाला कनेक्ट कसे वापरणार ते निवडा.',
    roleSelectedBadge: '✓ निवडलेली भूमिका',
    rolePrimaryBadge: 'प्राथमिक',
    roleCollectorTitle: 'कबाड़ीवाला',
    roleCollectorSub: 'ई-कचरा गोळा करा आणि विका',
    roleCollectorBullets: [
      'फोटो व वजनासह स्क्रॅप लॉट नोंदवा',
      'जवळचे नोंदणीकृत रिसायकलर शोधा',
      'विक्री आणि पावत्यांचा डिजिटल हिशोब ठेवा',
    ],
    roleCollectorTag: '★ भंगार गोळा करणारे व एग्रीगेटर्ससाठी उत्तम',
    roleRecyclerTitle: 'रिसायकलर',
    roleRecyclerSub: 'ई-कचरा खरेदी करा आणि प्रक्रिया करा',
    roleRecyclerBullets: [
      'स्थानिक ई-कचरा लॉट उपलब्धता पहा',
      'हस्तांतरणावेळी प्रत्यक्ष वजन तपासा',
      'अधिकृत लॉट हस्तांतरण पावती जारी करा',
    ],
    roleNotice:
      'तुम्ही नंतर प्रोफाइल सेटिंग्जमध्ये कधीही भूमिका बदलू शकता. कोणतेही शुल्क आवश्यक नाही.',
    continueCollector: 'कबाड़ीवाला म्हणून पुढे जा',
    continueRecycler: 'रिसायकलर म्हणून पुढे जा',
    roleEnterWorkspace: 'कलेक्टर डॅशबोर्डवर जाण्यासाठी दाबा',

    // Collector Home
    homeCollectorMode: 'कबाड़ीवाला मोड',
    sampleDataBadge: 'नमुना डेटा',
    homePrimaryActionTag: 'मुख्य कृती',
    homeHeroTitle: 'नवीन सामग्री जमा करा',
    homeHeroSubtitle: 'फोटो आणि वजनासह नवीन ई-कचरा लॉट नोंदवा',
    homeHeroCta: 'आता सुरू करा',
    homeQuickCollections: 'सामग्री',
    homeQuickTransactions: 'व्यवहार',
    homeQuickRecycler: 'रिसायकलर शोधा',
    homeSummaryTitle: 'आजचा सारांश',
    homeSummaryToday: 'आज',
    homeSummaryEstValue: 'अंदाजे मूल्य',
    homeSummaryIndicative: 'सांकेतिक मूल्य',
    homeSummaryTotalWeight: 'एकूण वजन',
    homeSummaryActiveLots: 'सक्रिय लॉट',
    homeRecentCollections: 'अलीकडील लॉट',
    homeViewAll: 'सर्व पहा',
    homeSafetyTipTitle: 'सुरक्षितता सल्ला',
    homeSafetyTipText:
      'सुरक्षित वर्गीकरणासाठी बॅटरी आणि फोन इतर कचऱ्यापासून वेगळे ठेवा.',

    // Status
    statusReady: 'तयार',
    statusWaiting: 'प्रतीक्षा',
    statusCompleted: 'पूर्ण',

    // Collections
    collectionsTitle: 'सामग्री यादी',
    collectionsSub: 'सक्रिय आणि पूर्ण झालेल्या लॉटची यादी',
    newCollectionBtn: 'नवीन सामग्री',
    filterAll: 'सर्व',
    filterWaiting: 'प्रतीक्षा',
    filterReady: 'तयार',
    filterCompleted: 'पूर्ण',
    estValueLabel: 'अंदाजे मूल्य',
    viewDetails: 'तपशील पहा',

    // Collection Detail
    detailTitleSuffix: 'तपशील',
    manifestTitle: 'ई-कचरा घोषणापत्र',
    weightEntryManual: 'वजन: मॅन्युअल नोंद',
    categoryHighYieldPcb: 'श्रेणी: उच्च दर्जा पीसीबी',
    pcbMotherboardTitle: 'मदरबोर्ड पीसीबी',
    materialPhotoTitle: 'सामग्री छायाचित्र',
    attachmentCount: '1 फोटो संलग्न',
    cameraCaptured: 'फोटो संलग्न',
    changePhotoBtn: 'फोटो बदला',
    noteTag: 'टीप',
    gradeANote: 'ग्रेड ए • स्वच्छ वेगळे केलेले • धातूचे अवजड भाग नाहीत',
    declaredWeightTitle: 'घोषित वजन',
    declaredWeightSub: 'कबाड़ीवाला यांनी नोंदवलेले',
    estValueTitle: 'अंदाजे मूल्य',
    estValueSub: 'प्रातिनिधिक दर',
    batchProgressTitle: 'टप्पा स्थिती',
    stepOfProgress: 'टप्पा 2 / 4',
    step1Title: 'लॉट नोंदवला',
    step1Desc: 'घोषित फोटो आणि वजनासह नोंदणी पूर्ण',
    step2Title: 'रिसायकलरची प्रतीक्षा',
    step2Desc: '6 किमी परिसरातील 4 नोंदणीकृत रिसायकलरना सूचित केले',
    step2CurrentBadge: 'सध्या',
    step3Title: 'रिसायकलर मिळाला',
    step3Desc: 'रिसायकलर स्वीकृती आणि स्लॉट बुकिंगची प्रतीक्षा',
    step4Title: 'हस्तांतरण आणि भरणा',
    step4Desc: 'रिसायकलर केंद्रावर प्रत्यक्ष हस्तांतरण आणि पावती',
    verificationPolicyTitle: 'पडताळणी धोरण',
    verificationPolicyBody:
      'अंदाजे मूल्य घोषित श्रेणीवर आधारित प्रातिनिधिक आहे. अंतिम पावती देण्यापूर्वी रिसायकलर प्रत्यक्ष हस्तांतरणावेळी वजन व स्थितीची पडताळणी करेल.',
    findRecyclerBtn: 'रिसायकलर शोधा',
    nextStepBadge: 'पुढे',
    editLotBtn: 'तपशील बदला',

    // Profile
    profileTitle: 'कलेक्टर प्रोफाइल',
    profileSub: 'खाते आणि प्राधान्ये',
    profileName: 'आपले नाव',
    profilePhoneLabel: 'मोबाइल:',
    profilePhonePlaceholder: '+91 XXXXX XXXXX',
    profileAreaLabel: 'नियुक्त क्षेत्र:',
    profileRole: 'कबाड़ीवाला',
    preferencesTitle: 'डिव्हाइस प्राधान्ये',
    settingsLanguage: 'ॲपची भाषा',
    settingsAudio: 'ध्वनी मार्गदर्शन',
    settingsAudioSub: 'बटणांवर आवाज मार्गदर्शन',
    settingsLocalStorage: 'स्थानिक डेटा',
    settingsLocalStorageSub: 'ऑफलाइन लॉट संग्रह कॅश',
    activeStatusBadge: 'सक्रिय',
    switchRoleBtn: 'रिसायकलर मोड निवडा',
    logoutBtn: 'बाहेर पडा',
    appVersionNotice: 'अनौपचारिक ई-कचरा गोळा करणारे व रिसायकलर्ससाठी डिझाइन केलेले',
  },
};

