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

  // ── Batch 2: Collection Flow ──
  flowStepLabel: string;
  flowStep1Capture: string;
  flowStep2Classify: string;
  flowStep3Weight: string;
  flowStep4Review: string;

  // Capture Photo
  captureTitle: string;
  captureInstruction: string;
  captureBtn: string;
  captureRetake: string;
  captureUsePhoto: string;
  capturePhotoTip: string;

  // AI Classification
  classifyingTitle: string;
  classifyingMsg: string;
  classifyResultTitle: string;
  classifyConfidence: string;
  classifyModel: string;
  classifyConfirmBtn: string;
  classifyCorrectBtn: string;
  classifyManualBtn: string;
  classifySuggested: string;
  classifyAiAssisted: string;

  // Manual Category
  manualCategoryTitle: string;
  manualCategoryInstruction: string;
  manualCategoryConfirm: string;

  // Weight Entry
  weightTitle: string;
  weightInstruction: string;
  weightInputLabel: string;
  weightUnit: string;
  weightNextBtn: string;
  weightManualNote: string;

  // Review & Create Lot
  reviewTitle: string;
  reviewCategory: string;
  reviewWeight: string;
  reviewEstValue: string;
  reviewIndicativeNote: string;
  reviewPhoto: string;
  reviewMethod: string;
  reviewCreateBtn: string;
  reviewEditBtn: string;

  // Lot Created
  lotCreatedTitle: string;
  lotCreatedMsg: string;
  lotCreatedId: string;
  lotCreatedViewBtn: string;
  lotCreatedNewBtn: string;
  lotCreatedHomeBtn: string;
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
    roleStepBadge: 'STEP 1 OF 1',
    roleStepTitle: 'Identity',
    roleTitle: 'Choose your role',
    roleSubtitle: 'Select how you will use Kabadiwala Connect',
    roleSelectedBadge: '✓ SELECTED',
    rolePrimaryBadge: 'PRIMARY',
    roleCollectorTitle: 'COLLECTOR',
    roleCollectorSub: 'Collect & sell scrap',
    roleCollectorBullets: [],
    roleCollectorTag: 'Best for scrap collectors & aggregators',
    roleRecyclerTitle: 'RECYCLER',
    roleRecyclerSub: 'Buy & process scrap',
    roleRecyclerBullets: [],
    roleNotice: 'You can switch roles later in Profile settings.',
    continueCollector: 'CONTINUE AS COLLECTOR',
    continueRecycler: 'CONTINUE AS RECYCLER',
    roleEnterWorkspace: '',

    // Collector Home
    homeCollectorMode: 'COLLECTOR MODE',
    sampleDataBadge: 'SAMPLE DATA',
    homePrimaryActionTag: 'PRIMARY ACTION',
    homeHeroTitle: 'START NEW COLLECTION',
    homeHeroSubtitle: '',
    homeHeroCta: 'START COLLECTION',
    homeQuickCollections: 'Collections',
    homeQuickTransactions: 'Transactions',
    homeQuickRecycler: 'Find Recycler',
    homeSummaryTitle: "TODAY'S SUMMARY",
    homeSummaryToday: 'Today',
    homeSummaryEstValue: 'Est. Value',
    homeSummaryIndicative: 'Indicative',
    homeSummaryTotalWeight: 'Total Weight',
    homeSummaryActiveLots: 'Lots',
    homeRecentCollections: 'RECENT LOTS',
    homeViewAll: 'View All',
    homeSafetyTipTitle: 'SAFETY TIP',
    homeSafetyTipText: 'Keep batteries and phones separate from mixed scrap.',

    // Status
    statusReady: 'Ready',
    statusWaiting: 'Waiting',
    statusCompleted: 'Completed',

    // Collections
    collectionsTitle: 'Collections',
    collectionsSub: 'Logged e-waste scrap lots',
    newCollectionBtn: 'New Collection',
    filterAll: 'All',
    filterWaiting: 'Waiting',
    filterReady: 'Ready',
    filterCompleted: 'Completed',
    estValueLabel: 'Est. Value',
    viewDetails: 'View Details',

    // Collection Detail
    detailTitleSuffix: 'Details',
    manifestTitle: 'E-WASTE MANIFEST',
    weightEntryManual: 'Weight: Manual',
    categoryHighYieldPcb: 'CATEGORY: HIGH YIELD PCB',
    pcbMotherboardTitle: 'Motherboard PCB',
    materialPhotoTitle: 'MATERIAL PHOTO',
    attachmentCount: '1 ATTACHMENT',
    cameraCaptured: 'PHOTO ATTACHED',
    changePhotoBtn: 'Change Photo',
    noteTag: 'NOTE',
    gradeANote: 'Grade A • Clean Dismantled',
    declaredWeightTitle: 'DECLARED WEIGHT',
    declaredWeightSub: 'Manual Entry',
    estValueTitle: 'EST. VALUE',
    estValueSub: 'Indicative Price',
    batchProgressTitle: 'LIFECYCLE PROGRESS',
    stepOfProgress: 'STEP 2 OF 4',
    step1Title: 'Lot Created',
    step1Desc: 'Logged with weight & photo',
    step2Title: 'Waiting for Recycler',
    step2Desc: 'Broadcasted to nearby recyclers',
    step2CurrentBadge: 'CURRENT',
    step3Title: 'Recycler Matched',
    step3Desc: 'Awaiting pickup confirmation',
    step4Title: 'Handover & Payment',
    step4Desc: 'Weighing & settlement at yard',
    verificationPolicyTitle: 'VERIFICATION POLICY',
    verificationPolicyBody:
      'Recycler physically re-weighs and inspects material at handover before final settlement.',
    findRecyclerBtn: 'FIND RECYCLER',
    nextStepBadge: 'NEXT',
    editLotBtn: 'EDIT LOT',

    // Profile
    profileTitle: 'Profile',
    profileSub: 'Collector Profile',
    profileName: 'Your Name',
    profilePhoneLabel: 'Phone:',
    profilePhonePlaceholder: '+91 XXXXX XXXXX',
    profileAreaLabel: 'Service Area:',
    profileRole: 'Collector',
    preferencesTitle: 'PREFERENCES',
    settingsLanguage: 'App Language',
    settingsAudio: 'Audio Guidance',
    settingsAudioSub: '',
    settingsLocalStorage: 'Local Storage',
    settingsLocalStorageSub: '',
    activeStatusBadge: 'ACTIVE',
    switchRoleBtn: 'SWITCH TO RECYCLER',
    logoutBtn: 'LOG OUT',
    appVersionNotice: '',

    // ── Batch 2: Collection Flow ──
    flowStepLabel: 'STEP',
    flowStep1Capture: 'Photo',
    flowStep2Classify: 'Classify',
    flowStep3Weight: 'Weight',
    flowStep4Review: 'Review',

    captureTitle: 'CAPTURE MATERIAL',
    captureInstruction: 'Take a clear photo of the e-waste material',
    captureBtn: 'TAKE PHOTO',
    captureRetake: 'RETAKE',
    captureUsePhoto: 'USE THIS PHOTO',
    capturePhotoTip: 'Place material on a flat surface with good lighting',

    classifyingTitle: 'IDENTIFYING MATERIAL',
    classifyingMsg: 'AI is analyzing your photo…',
    classifyResultTitle: 'AI CLASSIFICATION',
    classifyConfidence: 'Confidence',
    classifyModel: 'Model',
    classifyConfirmBtn: 'CONFIRM CATEGORY',
    classifyCorrectBtn: 'SELECT DIFFERENT',
    classifyManualBtn: 'CHOOSE MANUALLY',
    classifySuggested: 'SUGGESTED',
    classifyAiAssisted: 'AI Assisted',

    manualCategoryTitle: 'SELECT CATEGORY',
    manualCategoryInstruction: 'Choose the e-waste category',
    manualCategoryConfirm: 'CONFIRM SELECTION',

    weightTitle: 'ENTER WEIGHT',
    weightInstruction: 'Enter the material weight',
    weightInputLabel: 'Weight',
    weightUnit: 'KG',
    weightNextBtn: 'CONTINUE',
    weightManualNote: 'Manual Entry',

    reviewTitle: 'REVIEW LOT',
    reviewCategory: 'Category',
    reviewWeight: 'Weight',
    reviewEstValue: 'Est. Value',
    reviewIndicativeNote: 'Indicative price — final at handover',
    reviewPhoto: 'Photo',
    reviewMethod: 'Method',
    reviewCreateBtn: 'CREATE LOT',
    reviewEditBtn: 'EDIT',

    lotCreatedTitle: 'LOT CREATED',
    lotCreatedMsg: 'Your e-waste lot has been logged successfully',
    lotCreatedId: 'Lot ID',
    lotCreatedViewBtn: 'VIEW LOT',
    lotCreatedNewBtn: 'NEW COLLECTION',
    lotCreatedHomeBtn: 'GO HOME',
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
    roleStepBadge: 'चरण 1 / 1',
    roleStepTitle: 'पहचान',
    roleTitle: 'अपनी भूमिका चुनें',
    roleSubtitle: 'चुनें कि आप ऐप का उपयोग कैसे करेंगे',
    roleSelectedBadge: '✓ चयनित',
    rolePrimaryBadge: 'प्राथमिक',
    roleCollectorTitle: 'कबाड़ीवाला',
    roleCollectorSub: 'कबाड़ इकट्ठा करें व बेचें',
    roleCollectorBullets: [],
    roleCollectorTag: 'कबाड़ संग्राहकों के लिए सर्वोत्तम',
    roleRecyclerTitle: 'रिसाइक्लर',
    roleRecyclerSub: 'कबाड़ खरीदें व रीसायकल करें',
    roleRecyclerBullets: [],
    roleNotice: 'आप प्रोफाइल में कभी भी भूमिका बदल सकते हैं।',
    continueCollector: 'कबाड़ीवाला के रूप में आगे बढ़ें',
    continueRecycler: 'रिसाइक्लर के रूप में आगे बढ़ें',
    roleEnterWorkspace: '',

    // Collector Home
    homeCollectorMode: 'कबाड़ीवाला मोड',
    sampleDataBadge: 'उदाहरण डेटा',
    homePrimaryActionTag: 'मुख्य कार्य',
    homeHeroTitle: 'नई सामग्री दर्ज करें',
    homeHeroSubtitle: '',
    homeHeroCta: 'संग्रह शुरू करें',
    homeQuickCollections: 'सामग्री',
    homeQuickTransactions: 'लेन-देन',
    homeQuickRecycler: 'रिसाइक्लर खोजें',
    homeSummaryTitle: 'आज का सारांश',
    homeSummaryToday: 'आज',
    homeSummaryEstValue: 'अनुमानित मूल्य',
    homeSummaryIndicative: 'सांकेतिक',
    homeSummaryTotalWeight: 'कुल वजन',
    homeSummaryActiveLots: 'लॉट',
    homeRecentCollections: 'हालिया सामग्री',
    homeViewAll: 'सभी देखें',
    homeSafetyTipTitle: 'सुरक्षा सुझाव',
    homeSafetyTipText: 'बैटरी और मोबाइल को अन्य कबाड़ से अलग रखें।',

    // Status
    statusReady: 'तैयार',
    statusWaiting: 'प्रतीक्षा',
    statusCompleted: 'पूर्ण',

    // Collections
    collectionsTitle: 'सामग्री',
    collectionsSub: 'दर्ज की गई ई-कचरा सामग्री',
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
    weightEntryManual: 'वज़न: मैन्युअल',
    categoryHighYieldPcb: 'श्रेणी: उच्च गुणवत्ता पीसीबी',
    pcbMotherboardTitle: 'मदरबोर्ड पीसीबी',
    materialPhotoTitle: 'सामग्री की फोटो',
    attachmentCount: '1 फोटो संलग्न',
    cameraCaptured: 'फोटो संलग्न',
    changePhotoBtn: 'फोटो बदलें',
    noteTag: 'नोट',
    gradeANote: 'ग्रेड ए • साफ अलग किया हुआ',
    declaredWeightTitle: 'घोषित वजन',
    declaredWeightSub: 'मैन्युअल प्रविष्टि',
    estValueTitle: 'अनुमानित मूल्य',
    estValueSub: 'सांकेतिक दर',
    batchProgressTitle: 'चक्र स्थिति',
    stepOfProgress: 'चरण 2 / 4',
    step1Title: 'लॉट दर्ज',
    step1Desc: 'वजन और फोटो दर्ज',
    step2Title: 'रिसाइक्लर की प्रतीक्षा',
    step2Desc: 'निकटतम रिसाइक्लर्स को सूचित',
    step2CurrentBadge: 'वर्तमान',
    step3Title: 'रिसाइक्लर मैच',
    step3Desc: 'पिकअप पुष्टि की प्रतीक्षा',
    step4Title: 'हैंडओवर और भुगतान',
    step4Desc: 'यार्ड पर तौल व भुगतान',
    verificationPolicyTitle: 'सत्यापन नीति',
    verificationPolicyBody:
      'अंतिम भुगतान से पहले रिसाइक्लर हैंडओवर पर सामग्री का प्रत्यक्ष वजन और निरीक्षण करता है।',
    findRecyclerBtn: 'रिसाइक्लर खोजें',
    nextStepBadge: 'आगे',
    editLotBtn: 'लॉट सुधारें',

    // Profile
    profileTitle: 'प्रोफाइल',
    profileSub: 'कलेक्टर प्रोफाइल',
    profileName: 'आपका नाम',
    profilePhoneLabel: 'मोबाइल:',
    profilePhonePlaceholder: '+91 XXXXX XXXXX',
    profileAreaLabel: 'सेवा क्षेत्र:',
    profileRole: 'कबाड़ीवाला',
    preferencesTitle: 'प्राथमिकताएं',
    settingsLanguage: 'ऐप की भाषा',
    settingsAudio: 'आवाज सहायता',
    settingsAudioSub: '',
    settingsLocalStorage: 'स्थानीय डेटा',
    settingsLocalStorageSub: '',
    activeStatusBadge: 'सक्रिय',
    switchRoleBtn: 'रिसाइक्लर मोड में बदलें',
    logoutBtn: 'लॉग आउट',
    appVersionNotice: '',

    // ── Batch 2: Collection Flow ──
    flowStepLabel: 'चरण',
    flowStep1Capture: 'फोटो',
    flowStep2Classify: 'पहचान',
    flowStep3Weight: 'वज़न',
    flowStep4Review: 'समीक्षा',

    captureTitle: 'सामग्री कैप्चर करें',
    captureInstruction: 'ई-कचरा सामग्री की स्पष्ट फोटो लें',
    captureBtn: 'फोटो लें',
    captureRetake: 'दोबारा लें',
    captureUsePhoto: 'यह फोटो उपयोग करें',
    capturePhotoTip: 'सामग्री को समतल जगह पर अच्छी रोशनी में रखें',

    classifyingTitle: 'सामग्री पहचान',
    classifyingMsg: 'AI आपकी फोटो का विश्लेषण कर रहा है…',
    classifyResultTitle: 'AI वर्गीकरण',
    classifyConfidence: 'विश्वसनीयता',
    classifyModel: 'मॉडल',
    classifyConfirmBtn: 'श्रेणी पुष्ट करें',
    classifyCorrectBtn: 'अन्य चुनें',
    classifyManualBtn: 'मैन्युअल चुनें',
    classifySuggested: 'सुझावित',
    classifyAiAssisted: 'AI सहायित',

    manualCategoryTitle: 'श्रेणी चुनें',
    manualCategoryInstruction: 'ई-कचरा श्रेणी चुनें',
    manualCategoryConfirm: 'चयन पुष्ट करें',

    weightTitle: 'वज़न दर्ज करें',
    weightInstruction: 'सामग्री का वज़न दर्ज करें',
    weightInputLabel: 'वज़न',
    weightUnit: 'KG',
    weightNextBtn: 'आगे बढ़ें',
    weightManualNote: 'मैन्युअल प्रविष्टि',

    reviewTitle: 'लॉट समीक्षा',
    reviewCategory: 'श्रेणी',
    reviewWeight: 'वज़न',
    reviewEstValue: 'अनुमानित मूल्य',
    reviewIndicativeNote: 'सांकेतिक मूल्य — अंतिम भुगतान हैंडओवर पर',
    reviewPhoto: 'फोटो',
    reviewMethod: 'पद्धति',
    reviewCreateBtn: 'लॉट बनाएं',
    reviewEditBtn: 'संशोधन',

    lotCreatedTitle: 'लॉट बनाया गया',
    lotCreatedMsg: 'आपका ई-कचरा लॉट सफलतापूर्वक दर्ज हो गया',
    lotCreatedId: 'लॉट ID',
    lotCreatedViewBtn: 'लॉट देखें',
    lotCreatedNewBtn: 'नया संग्रह',
    lotCreatedHomeBtn: 'मुख्य पृष्ठ',
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
    roleStepBadge: 'टप्पा 1 / 1',
    roleStepTitle: 'ओळख',
    roleTitle: 'आपली भूमिका निवडा',
    roleSubtitle: 'ॲप कसे वापरणार ते निवडा',
    roleSelectedBadge: '✓ निवडले',
    rolePrimaryBadge: 'प्राथमिक',
    roleCollectorTitle: 'कबाड़ीवाला',
    roleCollectorSub: 'भंगार गोळा करा व विका',
    roleCollectorBullets: [],
    roleCollectorTag: 'भंगार गोळा करणाऱ्यांसाठी उत्तम',
    roleRecyclerTitle: 'रिसायकलर',
    roleRecyclerSub: 'भंगार खरेदी करा व प्रक्रिया करा',
    roleRecyclerBullets: [],
    roleNotice: 'तुम्ही नंतर प्रोफाइलमध्ये भूमिका बदलू शकता.',
    continueCollector: 'कबाड़ीवाला म्हणून पुढे जा',
    continueRecycler: 'रिसायकलर म्हणून पुढे जा',
    roleEnterWorkspace: '',

    // Collector Home
    homeCollectorMode: 'कबाड़ीवाला मोड',
    sampleDataBadge: 'नमुना डेटा',
    homePrimaryActionTag: 'मुख्य कृती',
    homeHeroTitle: 'नवीन सामग्री जमा करा',
    homeHeroSubtitle: '',
    homeHeroCta: 'नोंदणी सुरू करा',
    homeQuickCollections: 'सामग्री',
    homeQuickTransactions: 'व्यवहार',
    homeQuickRecycler: 'रिसायकलर शोधा',
    homeSummaryTitle: 'आजचा सारांश',
    homeSummaryToday: 'आज',
    homeSummaryEstValue: 'अंदाजे मूल्य',
    homeSummaryIndicative: 'सांकेतिक',
    homeSummaryTotalWeight: 'एकूण वजन',
    homeSummaryActiveLots: 'लॉट',
    homeRecentCollections: 'अलीकडील लॉट',
    homeViewAll: 'सर्व पहा',
    homeSafetyTipTitle: 'सुरक्षितता सल्ला',
    homeSafetyTipText: 'बॅटरी आणि फोन इतर कचऱ्यापासून वेगळे ठेवा.',

    // Status
    statusReady: 'तयार',
    statusWaiting: 'प्रतीक्षा',
    statusCompleted: 'पूर्ण',

    // Collections
    collectionsTitle: 'सामग्री',
    collectionsSub: 'नोंदवलेले ई-कचरा लॉट्स',
    newCollectionBtn: 'नवीन सामग्री',
    filterAll: 'सर्व',
    filterWaiting: 'प्रतीक्षा',
    filterReady: 'तयार',
    filterCompleted: 'पूर्ण',
    estValueLabel: 'अंदाजे मूल्य',
    viewDetails: 'तपशील पहा',

    // Collection Detail
    detailTitleSuffix: 'तपशील',
    manifestTitle: 'संकलन तपशील',
    weightEntryManual: 'वजन: मॅन्युअल',
    categoryHighYieldPcb: 'श्रेणी: उच्च दर्जा पीसीबी',
    pcbMotherboardTitle: 'मदरबोर्ड पीसीबी',
    materialPhotoTitle: 'सामग्रीचा फोटो',
    attachmentCount: '1 फोटो संलग्न',
    cameraCaptured: 'फोटो संलग्न',
    changePhotoBtn: 'फोटो बदला',
    noteTag: 'टीप',
    gradeANote: 'ग्रेड ए • स्वच्छ वेगळे केलेले',
    declaredWeightTitle: 'घोषित वजन',
    declaredWeightSub: 'मॅन्युअल नोंद',
    estValueTitle: 'अंदाजे मूल्य',
    estValueSub: 'प्रातिनिधिक दर',
    batchProgressTitle: 'संकलनाची स्थिती',
    stepOfProgress: 'टप्पा 2 / 4',
    step1Title: 'लॉट नोंदवला',
    step1Desc: 'वजन व फोटो नोंदवले',
    step2Title: 'रिसायकलरची प्रतीक्षा',
    step2Desc: 'जवळच्या रिसायकलरना सूचित',
    step2CurrentBadge: 'सध्या',
    step3Title: 'रिसायकलर मिळाला',
    step3Desc: 'पिकअप निश्चितीची प्रतीक्षा',
    step4Title: 'हस्तांतरण आणि भरणा',
    step4Desc: 'यार्डवर वजन व पावती',
    verificationPolicyTitle: 'पडताळणी धोरण',
    verificationPolicyBody:
      'अंतिम भरणा करण्यापूर्वी रिसायकलर प्रत्यक्ष हस्तांतरणावेळी वजन व स्थितीची पडताळणी करेल.',
    findRecyclerBtn: 'रिसायकलर शोधा',
    nextStepBadge: 'पुढे',
    editLotBtn: 'लॉट बदला',

    // Profile
    profileTitle: 'प्रोफाइल',
    profileSub: 'कलेक्टर प्रोफाइल',
    profileName: 'आपले नाव',
    profilePhoneLabel: 'मोबाइल:',
    profilePhonePlaceholder: '+91 XXXXX XXXXX',
    profileAreaLabel: 'सेवा क्षेत्र:',
    profileRole: 'कबाड़ीवाला',
    preferencesTitle: 'प्राधान्ये',
    settingsLanguage: 'ॲपची भाषा',
    settingsAudio: 'ध्वनी मार्गदर्शन',
    settingsAudioSub: '',
    settingsLocalStorage: 'स्थानिक डेटा',
    settingsLocalStorageSub: '',
    activeStatusBadge: 'सक्रिय',
    switchRoleBtn: 'रिसायकलर मोड निवडा',
    logoutBtn: 'बाहेर पडा',
    appVersionNotice: '',

    // ── Batch 2: Collection Flow ──
    flowStepLabel: 'टप्पा',
    flowStep1Capture: 'फोटो',
    flowStep2Classify: 'ओळख',
    flowStep3Weight: 'वजन',
    flowStep4Review: 'पुनरावलोकन',

    captureTitle: 'सामग्री कॅप्चर करा',
    captureInstruction: 'ई-कचरा सामग्रीचा स्पष्ट फोटो घ्या',
    captureBtn: 'फोटो घ्या',
    captureRetake: 'पुन्हा घ्या',
    captureUsePhoto: 'हा फोटो वापरा',
    capturePhotoTip: 'सामग्री सपाट जागी चांगल्या प्रकाशात ठेवा',

    classifyingTitle: 'सामग्री ओळख',
    classifyingMsg: 'AI तुमच्या फोटोचे विश्लेषण करत आहे…',
    classifyResultTitle: 'AI वर्गीकरण',
    classifyConfidence: 'विश्वासार्हता',
    classifyModel: 'मॉडेल',
    classifyConfirmBtn: 'श्रेणी पुष्टी करा',
    classifyCorrectBtn: 'वेगळी निवडा',
    classifyManualBtn: 'मॅन्युअल निवडा',
    classifySuggested: 'सुचवलेले',
    classifyAiAssisted: 'AI सहाय्यित',

    manualCategoryTitle: 'श्रेणी निवडा',
    manualCategoryInstruction: 'ई-कचरा श्रेणी निवडा',
    manualCategoryConfirm: 'निवड पुष्टी करा',

    weightTitle: 'वजन नोंदवा',
    weightInstruction: 'सामग्रीचे वजन नोंदवा',
    weightInputLabel: 'वजन',
    weightUnit: 'KG',
    weightNextBtn: 'पुढे जा',
    weightManualNote: 'मॅन्युअल नोंद',

    reviewTitle: 'लॉट पुनरावलोकन',
    reviewCategory: 'श्रेणी',
    reviewWeight: 'वजन',
    reviewEstValue: 'अंदाजे मूल्य',
    reviewIndicativeNote: 'सांकेतिक मूल्य — अंतिम भरणा हस्तांतरणावेळी',
    reviewPhoto: 'फोटो',
    reviewMethod: 'पद्धती',
    reviewCreateBtn: 'लॉट तयार करा',
    reviewEditBtn: 'बदला',

    lotCreatedTitle: 'लॉट तयार झाला',
    lotCreatedMsg: 'तुमचा ई-कचरा लॉट यशस्वीरित्या नोंदवला गेला',
    lotCreatedId: 'लॉट ID',
    lotCreatedViewBtn: 'लॉट पहा',
    lotCreatedNewBtn: 'नवीन संकलन',
    lotCreatedHomeBtn: 'मुख्य पृष्ठ',
  },
};

