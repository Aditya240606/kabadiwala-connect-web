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

  // ── Batch 3: Recycler Marketplace & Handover ──
  matchingTitle: string;
  matchingSub: string;
  matchingFilterAll: string;
  matchingFilterNearby: string;
  matchingVerifiedBadge: string;
  matchingAcceptedWaste: string;
  matchingDistanceLabel: string;
  matchingSelectBtn: string;
  matchingEmptyMsg: string;

  recyclerDetailTitle: string;
  recyclerFacilityInfo: string;
  recyclerAddressLabel: string;
  recyclerContactLabel: string;
  recyclerAcceptedMaterials: string;
  recyclerOperatingHours: string;
  recyclerInitiateBtn: string;
  recyclerPolicyNotice: string;

  handoverTitle: string;
  handoverSub: string;
  handoverLotSummary: string;
  handoverTargetFacility: string;
  handoverNotesLabel: string;
  handoverNotesPlaceholder: string;
  handoverSubmitBtn: string;
  handoverSuccessTitle: string;
  handoverSuccessMsg: string;
  handoverTxnId: string;
  handoverViewLotBtn: string;
  handoverBackToMatchingBtn: string;

  // ── Batch 4: Handover, Payment & Transaction Completion ──
  recyclerConsoleTitle: string;
  recyclerConsoleSub: string;
  recyclerIncomingCard: string;
  recyclerPendingHandovers: string;
  recyclerCompletedToday: string;
  recyclerViewIncomingBtn: string;
  recyclerRoleSwitchToCollector: string;
  collectorRoleSwitchToRecycler: string;

  recyclerIncomingTitle: string;
  recyclerIncomingSub: string;
  recyclerNoIncoming: string;
  recyclerInspectBtn: string;

  recyclerLotDetailTitle: string;
  recyclerAcceptBtn: string;
  recyclerRejectBtn: string;
  recyclerAcceptedBadge: string;
  recyclerProceedToReceive: string;
  recyclerLotStatusNotice: string;

  receiveTitle: string;
  receiveSub: string;
  receiveCollectorDeclared: string;
  receiveActualWeight: string;
  receiveWeightInstruction: string;
  receiveManualOnlyNotice: string;
  qualityTitle: string;
  qualityAccepted: string;
  qualityMixed: string;
  qualityReview: string;
  agreedRateLabel: string;
  calculatedPayout: string;
  receiveConfirmBtn: string;

  paymentTitle: string;
  paymentSub: string;
  paymentEstValue: string;
  paymentFinalSettlement: string;
  paymentSettlementNote: string;
  paymentMethodLabel: string;
  paymentCash: string;
  paymentUpi: string;
  paymentRecordingOnlyNotice: string;
  paymentNotesLabel: string;
  paymentCompleteBtn: string;

  txnCompleteTitle: string;
  txnCompleteSub: string;
  digitalReceiptTitle: string;
  recordDisclaimer: string;
  txnIdLabel: string;
  txnStatusLabel: string;
  txnDateLabel: string;
  declaredVsReceived: string;
  viewHistoryBtn: string;
  backToConsoleBtn: string;

  trackingTitle: string;
  trackingSub: string;
  stageInitiated: string;
  stageInitiatedDesc: string;
  stageAccepted: string;
  stageAcceptedDesc: string;
  stageCollected: string;
  stageCollectedDesc: string;
  stageCompleted: string;
  stageCompletedDesc: string;
  historyTitle: string;
  historySub: string;
  historyEmpty: string;
  viewDigitalRecord: string;
  trackTransactionBtn: string;
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

    // ── Batch 3: Recycler Marketplace & Handover ──
    matchingTitle: 'MATCHING RECYCLERS',
    matchingSub: 'Verified e-waste recyclers for your lot',
    matchingFilterAll: 'All Facilities',
    matchingFilterNearby: 'Nearby (Within 5 km)',
    matchingVerifiedBadge: 'VERIFIED FACILITY',
    matchingAcceptedWaste: 'Accepted Materials',
    matchingDistanceLabel: 'Distance',
    matchingSelectBtn: 'VIEW & SELECT',
    matchingEmptyMsg: 'No verified recyclers found for this category.',

    recyclerDetailTitle: 'RECYCLER PROFILE',
    recyclerFacilityInfo: 'Facility Information',
    recyclerAddressLabel: 'Facility Address',
    recyclerContactLabel: 'Direct Contact',
    recyclerAcceptedMaterials: 'Accepted Scrap Categories',
    recyclerOperatingHours: 'Operating Hours: 09:00 AM – 06:00 PM',
    recyclerInitiateBtn: 'INITIATE HANDOVER',
    recyclerPolicyNotice: 'Recycler will physically weigh and inspect scrap at the yard before settlement.',

    handoverTitle: 'HANDOVER REQUEST',
    handoverSub: 'Assign scrap lot to verified recycler',
    handoverLotSummary: 'Material Lot Details',
    handoverTargetFacility: 'Destination Facility',
    handoverNotesLabel: 'Handover Notes / Delivery Instructions',
    handoverNotesPlaceholder: 'e.g., Scheduled delivery tomorrow 10 AM, clean dismantled units',
    handoverSubmitBtn: 'SUBMIT HANDOVER REQUEST',
    handoverSuccessTitle: 'HANDOVER INITIATED',
    handoverSuccessMsg: 'Your handover request has been recorded and assigned to the recycler.',
    handoverTxnId: 'Transaction ID',
    handoverViewLotBtn: 'VIEW LOT',
    handoverBackToMatchingBtn: 'RECYCLERS LIST',

    // ── Batch 4: Handover, Payment & Transaction Completion ──
    recyclerConsoleTitle: 'RECYCLER CONSOLE',
    recyclerConsoleSub: 'Facility Operations & Handovers',
    recyclerIncomingCard: 'Incoming Requests',
    recyclerPendingHandovers: 'Pending Handovers',
    recyclerCompletedToday: 'Completed Today',
    recyclerViewIncomingBtn: 'VIEW INCOMING LOTS',
    recyclerRoleSwitchToCollector: 'Switch to Collector',
    collectorRoleSwitchToRecycler: 'Switch to Recycler',

    recyclerIncomingTitle: 'INCOMING LOTS',
    recyclerIncomingSub: 'Handovers awaiting recycler acceptance',
    recyclerNoIncoming: 'No pending incoming lots found.',
    recyclerInspectBtn: 'INSPECT LOT',

    recyclerLotDetailTitle: 'LOT INSPECTION',
    recyclerAcceptBtn: 'ACCEPT HANDOVER',
    recyclerRejectBtn: 'REJECT REQUEST',
    recyclerAcceptedBadge: 'ACCEPTED FOR YARD HANDOVER',
    recyclerProceedToReceive: 'PROCEED TO WEIGHING & INSPECTION',
    recyclerLotStatusNotice: 'Physical inspection required at yard before final settlement.',

    receiveTitle: 'PHYSICAL HANDOVER',
    receiveSub: 'Record received weight & quality at yard',
    receiveCollectorDeclared: 'Collector Declared Weight',
    receiveActualWeight: 'Recycler Received Weight',
    receiveWeightInstruction: 'Enter physical scale reading manually (KG)',
    receiveManualOnlyNotice: 'Physical inspection at yard. Weight must be manually verified and entered. No automatic scale or Bluetooth sensor.',
    qualityTitle: 'Material Quality / Grade',
    qualityAccepted: 'Accepted / Clean',
    qualityMixed: 'Mixed Grade',
    qualityReview: 'Needs Review',
    agreedRateLabel: 'Agreed Rate per KG',
    calculatedPayout: 'Calculated Total',
    receiveConfirmBtn: 'CONFIRM RECEIVED MATERIAL',

    paymentTitle: 'PAYMENT SETTLEMENT',
    paymentSub: 'Record settlement method and final amount',
    paymentEstValue: 'Estimated Value (Indicative)',
    paymentFinalSettlement: 'Final Settlement Amount',
    paymentSettlementNote: 'Final amount is settled after physical inspection and weighing.',
    paymentMethodLabel: 'Payment Method',
    paymentCash: 'Cash Payment',
    paymentUpi: 'UPI Transfer',
    paymentRecordingOnlyNotice: 'Recording only. No automated UPI transfer, payment gateway, or bank integration.',
    paymentNotesLabel: 'Payment / Reference Note',
    paymentCompleteBtn: 'RECORD PAYMENT & COMPLETE',

    txnCompleteTitle: 'TRANSACTION COMPLETE',
    txnCompleteSub: 'Digital record of recorded handover and settlement',
    digitalReceiptTitle: 'DIGITAL TRANSACTION RECORD',
    recordDisclaimer: 'This document is a digital record of the transaction entered by both parties. Photograph is reference only, not legal or weight certification.',
    txnIdLabel: 'Transaction ID',
    txnStatusLabel: 'Status',
    txnDateLabel: 'Date & Time',
    declaredVsReceived: 'Weight Comparison',
    viewHistoryBtn: 'VIEW TRANSACTION HISTORY',
    backToConsoleBtn: 'RETURN TO CONSOLE',

    trackingTitle: 'TRANSACTION TRACKING',
    trackingSub: 'Live handover & settlement status',
    stageInitiated: 'Handover Initiated',
    stageInitiatedDesc: 'Request sent to recycler facility',
    stageAccepted: 'Recycler Accepted',
    stageAcceptedDesc: 'Recycler approved delivery to yard',
    stageCollected: 'Physical Handover',
    stageCollectedDesc: 'Material weighed and inspected at yard',
    stageCompleted: 'Settlement Recorded',
    stageCompletedDesc: 'Final payment recorded and completed',
    historyTitle: 'TRANSACTION HISTORY',
    historySub: 'Past e-waste handovers and digital records',
    historyEmpty: 'No transactions recorded yet.',
    viewDigitalRecord: 'VIEW RECORD',
    trackTransactionBtn: 'TRACK TRANSACTION',
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

    // ── Batch 3: Recycler Marketplace & Handover ──
    matchingTitle: 'रिसाइक्लर मिलान',
    matchingSub: 'आपकी सामग्री के लिए सत्यापित रिसाइक्लर्स',
    matchingFilterAll: 'सभी सुविधाएं',
    matchingFilterNearby: 'निकटतम (5 किमी के अंदर)',
    matchingVerifiedBadge: 'सत्यापित सुविधा',
    matchingAcceptedWaste: 'स्वीकृत सामग्री',
    matchingDistanceLabel: 'दूरी',
    matchingSelectBtn: 'देखें व चुनें',
    matchingEmptyMsg: 'इस श्रेणी के लिए कोई रिसाइक्लर नहीं मिला।',

    recyclerDetailTitle: 'रिसाइक्लर प्रोफाइल',
    recyclerFacilityInfo: 'सुविधा विवरण',
    recyclerAddressLabel: 'सुविधा का पता',
    recyclerContactLabel: 'सीधा संपर्क',
    recyclerAcceptedMaterials: 'स्वीकृत स्क्रैप श्रेणियां',
    recyclerOperatingHours: 'कार्य समय: सुबह 09:00 – शाम 06:00',
    recyclerInitiateBtn: 'हस्तांतरण शुरू करें',
    recyclerPolicyNotice: 'अंतिम भुगतान से पहले यार्ड पर सामग्री का प्रत्यक्ष निरीक्षण और तौल किया जाएगा।',

    handoverTitle: 'हस्तांतरण अनुरोध',
    handoverSub: 'रिसाइक्लर को सामग्री सौंपें',
    handoverLotSummary: 'सामग्री विवरण',
    handoverTargetFacility: 'चयनित रिसाइक्लर',
    handoverNotesLabel: 'हस्तांतरण नोट / निर्देश',
    handoverNotesPlaceholder: 'उदा. कल सुबह 10 बजे डिलीवरी, साफ अलग किया हुआ माल',
    handoverSubmitBtn: 'हस्तांतरण अनुरोध भेजें',
    handoverSuccessTitle: 'हस्तांतरण दर्ज',
    handoverSuccessMsg: 'आपका हस्तांतरण अनुरोध सफलतापूर्वक दर्ज हो गया है।',
    handoverTxnId: 'लेन-देन ID',
    handoverViewLotBtn: 'लॉट देखें',
    handoverBackToMatchingBtn: 'रिसाइक्लर सूची',

    // ── Batch 4: Handover, Payment & Transaction Completion ──
    recyclerConsoleTitle: 'रिसाइक्लर कंसोल',
    recyclerConsoleSub: 'सुविधा संचालन एवं हस्तांतरण',
    recyclerIncomingCard: 'आने वाले अनुरोध',
    recyclerPendingHandovers: 'लंबित हस्तांतरण',
    recyclerCompletedToday: 'आज पूर्ण',
    recyclerViewIncomingBtn: 'आने वाले लॉट देखें',
    recyclerRoleSwitchToCollector: 'कबाड़ीवाला मोड में जाएं',
    collectorRoleSwitchToRecycler: 'रिसाइक्लर मोड में जाएं',

    recyclerIncomingTitle: 'आने वाले लॉट',
    recyclerIncomingSub: 'स्वीकृति हेतु लंबित लॉट',
    recyclerNoIncoming: 'कोई लंबित लॉट नहीं मिला।',
    recyclerInspectBtn: 'लॉट की जांच करें',

    recyclerLotDetailTitle: 'लॉट निरीक्षण',
    recyclerAcceptBtn: 'हस्तांतरण स्वीकार करें',
    recyclerRejectBtn: 'अस्वीकार करें',
    recyclerAcceptedBadge: 'यार्ड हस्तांतरण के लिए स्वीकृत',
    recyclerProceedToReceive: 'वजन और जांच के लिए आगे बढ़ें',
    recyclerLotStatusNotice: 'अंतिम निपटान से पहले यार्ड पर भौतिक निरीक्षण अनिवार्य है।',

    receiveTitle: 'भौतिक हस्तांतरण',
    receiveSub: 'यार्ड पर प्राप्त वजन और गुणवत्ता दर्ज करें',
    receiveCollectorDeclared: 'कबाड़ीवाला द्वारा घोषित वजन',
    receiveActualWeight: 'रिसाइक्लर द्वारा प्राप्त वजन',
    receiveWeightInstruction: 'कांटे का वजन मैन्युअल दर्ज करें (KG)',
    receiveManualOnlyNotice: 'यार्ड पर प्रत्यक्ष निरीक्षण। वजन मैन्युअल रूप से सत्यापित और दर्ज किया जाना चाहिए। कोई स्वचालित कांटा या ब्लूटूथ सेंसर नहीं।',
    qualityTitle: 'सामग्री गुणवत्ता / ग्रेड',
    qualityAccepted: 'स्वीकृत / साफ',
    qualityMixed: 'मिश्रित ग्रेड',
    qualityReview: 'समीक्षा आवश्यक',
    agreedRateLabel: 'सहमति दर प्रति किलो',
    calculatedPayout: 'गणना की गई राशि',
    receiveConfirmBtn: 'प्राप्त सामग्री की पुष्टि करें',

    paymentTitle: 'भुगतान निपटान',
    paymentSub: 'निपटान विधि और अंतिम राशि दर्ज करें',
    paymentEstValue: 'अनुमानित मूल्य (संकेतक)',
    paymentFinalSettlement: 'अंतिम निपटान राशि',
    paymentSettlementNote: 'अंतिम राशि प्रत्यक्ष निरीक्षण और वजन के बाद तय होती है।',
    paymentMethodLabel: 'भुगतान विधि',
    paymentCash: 'नकद भुगतान',
    paymentUpi: 'यूपीआई ट्रांसफर',
    paymentRecordingOnlyNotice: 'केवल रिकॉर्डिंग। कोई स्वचालित यूपीआई, पेमेंट गेटवे या बैंक इंटीग्रेशन नहीं।',
    paymentNotesLabel: 'भुगतान / संदर्भ नोट',
    paymentCompleteBtn: 'भुगतान दर्ज करें और पूर्ण करें',

    txnCompleteTitle: 'लेन-देन पूर्ण हुआ',
    txnCompleteSub: 'हस्तांतरण और निपटान का डिजिटल रिकॉर्ड',
    digitalReceiptTitle: 'डिजिटल लेन-देन रिकॉर्ड',
    recordDisclaimer: 'यह दस्तावेज़ दोनों पक्षों द्वारा दर्ज लेन-देन का डिजिटल रिकॉर्ड है। फोटो केवल संदर्भ के लिए है, कानूनी या वजन प्रमाणन नहीं।',
    txnIdLabel: 'लेन-देन ID',
    txnStatusLabel: 'स्थिति',
    txnDateLabel: 'दिनांक और समय',
    declaredVsReceived: 'वजन तुलना',
    viewHistoryBtn: 'लेन-देन इतिहास देखें',
    backToConsoleBtn: 'कंसोल पर वापस जाएं',

    trackingTitle: 'लेन-देन ट्रैकिंग',
    trackingSub: 'हस्तांतरण एवं निपटान स्थिति',
    stageInitiated: 'हस्तांतरण शुरू हुआ',
    stageInitiatedDesc: 'रिसाइक्लर सुविधा को अनुरोध भेजा गया',
    stageAccepted: 'रिसाइक्लर ने स्वीकार किया',
    stageAcceptedDesc: 'रिसाइक्लर ने यार्ड डिलीवरी स्वीकृत की',
    stageCollected: 'भौतिक हस्तांतरण',
    stageCollectedDesc: 'यार्ड पर सामग्री का वजन और जांच की गई',
    stageCompleted: 'निपटान दर्ज हुआ',
    stageCompletedDesc: 'अंतिम भुगतान दर्ज हुआ और लेन-देन पूरा हुआ',
    historyTitle: 'लेन-देन इतिहास',
    historySub: 'पिछले ई-कचरा हस्तांतरण और डिजिटल रिकॉर्ड',
    historyEmpty: 'अभी तक कोई लेन-देन दर्ज नहीं हुआ है।',
    viewDigitalRecord: 'रिकॉर्ड देखें',
    trackTransactionBtn: 'लेन-देन ट्रैक करें',
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

    // ── Batch 3: Recycler Marketplace & Handover ──
    matchingTitle: 'रिसायकलर शोध',
    matchingSub: 'तुमच्या सामग्रीसाठी अधिकृत रिसायकलर्स',
    matchingFilterAll: 'सर्व सुविधा',
    matchingFilterNearby: 'जवळचे (५ किमी अंतरावर)',
    matchingVerifiedBadge: 'सत्यापित सुविधा',
    matchingAcceptedWaste: 'स्वीकार्य साहित्य',
    matchingDistanceLabel: 'अंतर',
    matchingSelectBtn: 'पहा व निवडा',
    matchingEmptyMsg: 'या श्रेणीसाठी कोणतेही रिसायकलर उपलब्ध नाही.',

    recyclerDetailTitle: 'रिसायकलर प्रोफाइल',
    recyclerFacilityInfo: 'सुविधा माहिती',
    recyclerAddressLabel: 'सुविधेचा पत्ता',
    recyclerContactLabel: 'थेट संपर्क',
    recyclerAcceptedMaterials: 'स्वीकार्य भंगार वर्ग',
    recyclerOperatingHours: 'कामकाजाची वेळ: सकाळी ०९:०० – संध्याकाळी ०६:००',
    recyclerInitiateBtn: 'हस्तांतरण सुरू करा',
    recyclerPolicyNotice: 'अंतिम भरणा करण्यापूर्वी यार्डवर सामग्रीची प्रत्यक्ष तपासणी आणि मोजणी केली जाईल.',

    handoverTitle: 'हस्तांतरण विनंती',
    handoverSub: 'रिसायकलरकडे सामग्री सोपवा',
    handoverLotSummary: 'सामग्री तपशील',
    handoverTargetFacility: 'निवडलेले रिसायकलर',
    handoverNotesLabel: 'हस्तांतरण नोंद / सूचना',
    handoverNotesPlaceholder: 'उदा. उद्या सकाळी १० वाजता डिलिव्हरी, स्वच्छ वेगळे केलेले',
    handoverSubmitBtn: 'हस्तांतरण विनंती पाठवा',
    handoverSuccessTitle: 'हस्तांतरण नोंदवले',
    handoverSuccessMsg: 'तुमची हस्तांतरण विनंती यशस्वीरित्या नोंदवली गेली आहे.',
    handoverTxnId: 'व्यवहार ID',
    handoverViewLotBtn: 'लॉट पहा',
    handoverBackToMatchingBtn: 'रिसायकलर यादी',

    // ── Batch 4: Handover, Payment & Transaction Completion ──
    recyclerConsoleTitle: 'रिसायकलर कन्सोल',
    recyclerConsoleSub: 'सुविधा ऑपरेशन्स आणि हस्तांतरण',
    recyclerIncomingCard: 'येणाऱ्या विनंत्या',
    recyclerPendingHandovers: 'प्रलंबित हस्तांतरण',
    recyclerCompletedToday: 'आज पूर्ण झालेले',
    recyclerViewIncomingBtn: 'येणारे लॉट्स पहा',
    recyclerRoleSwitchToCollector: 'कबाड़ीवाला मोडवर जा',
    collectorRoleSwitchToRecycler: 'रिसायकलर मोडवर जा',

    recyclerIncomingTitle: 'येणारे लॉट्स',
    recyclerIncomingSub: 'स्वीकृतीसाठी प्रलंबित लॉट्स',
    recyclerNoIncoming: 'कोणताही प्रलंबित लॉट आढळला नाही.',
    recyclerInspectBtn: 'लॉट तपासा',

    recyclerLotDetailTitle: 'लॉट तपासणी',
    recyclerAcceptBtn: 'हस्तांतरण स्वीकारा',
    recyclerRejectBtn: 'विनंती नाकारा',
    recyclerAcceptedBadge: 'यार्ड हस्तांतरणासाठी स्वीकृत',
    recyclerProceedToReceive: 'वजन आणि तपासणीसाठी पुढे जा',
    recyclerLotStatusNotice: 'अंतिम देयकापूर्वी यार्डवर प्रत्यक्ष तपासणी आवश्यक आहे.',

    receiveTitle: 'प्रत्यक्ष हस्तांतरण',
    receiveSub: 'यार्डवर प्राप्त वजन आणि गुणवत्ता नोंदवा',
    receiveCollectorDeclared: 'कबाड़ीवाला यांनी नोंदवलेले वजन',
    receiveActualWeight: 'रिसायकलरकडून मिळालेले वजन',
    receiveWeightInstruction: 'काट्यावरील प्रत्यक्ष वजन मॅन्युअल नोंदवा (KG)',
    receiveManualOnlyNotice: 'यार्डवर प्रत्यक्ष तपासणी. वजन मॅन्युअली तपासून नोंदवले पाहिजे. कोणताही स्वयंचलित काटा किंवा ब्लूटूथ सेन्सर नाही.',
    qualityTitle: 'सामग्री दर्जा / प्रत',
    qualityAccepted: 'स्वीकृत / स्वच्छ',
    qualityMixed: 'मिश्रित प्रत',
    qualityReview: 'पुनरावलोकन आवश्यक',
    agreedRateLabel: 'संमती दर प्रति किलो',
    calculatedPayout: 'हिशोब केलेली रक्कम',
    receiveConfirmBtn: 'मिळालेल्या सामग्रीची पुष्टी करा',

    paymentTitle: 'पेमेंट देयक नोंद',
    paymentSub: 'पैसे देण्याची पद्धत आणि अंतिम रक्कम नोंदवा',
    paymentEstValue: 'अंदाजे मूल्य (सांकेतिक)',
    paymentFinalSettlement: 'अंतिम देय रक्कम',
    paymentSettlementNote: 'अंतिम रक्कम प्रत्यक्ष तपासणी आणि वजनानंतर ठरवली जाते.',
    paymentMethodLabel: 'पेमेंट पद्धती',
    paymentCash: 'रोख पेमेंट',
    paymentUpi: 'UPI ट्रान्सफर',
    paymentRecordingOnlyNotice: 'फक्त नोंदणीसाठी. कोणतेही स्वयंचलित UPI, पेमेंट गेटवे किंवा बँक जोडणी नाही.',
    paymentNotesLabel: 'पेमेंट / संदर्भ नोंद',
    paymentCompleteBtn: 'पेमेंट नोंदवा आणि पूर्ण करा',

    txnCompleteTitle: 'व्यवहार पूर्ण झाला',
    txnCompleteSub: 'हस्तांतरण आणि देयकाची डिजिटल नोंद',
    digitalReceiptTitle: 'डिजिटल व्यवहार नोंद',
    recordDisclaimer: 'हा दस्तऐवज दोन्ही पक्षांनी नोंदवलेल्या व्यवहाराची डिजिटल नोंद आहे. फोटो केवळ संदर्भासाठी आहे, कायदेशीर किंवा वजन प्रमाणपत्र नाही.',
    txnIdLabel: 'व्यवहार ID',
    txnStatusLabel: 'स्थिती',
    txnDateLabel: 'दिनांक आणि वेळ',
    declaredVsReceived: 'वजन तुलना',
    viewHistoryBtn: 'व्यवहार इतिहास पहा',
    backToConsoleBtn: 'कन्सोलवर परत जा',

    trackingTitle: 'व्यवहार ट्रॅकिंग',
    trackingSub: 'हस्तांतरण आणि देयक स्थिती',
    stageInitiated: 'हस्तांतरण सुरू झाले',
    stageInitiatedDesc: 'रिसायकलर सुविधेला विनंती पाठवली',
    stageAccepted: 'रिसायकलरने स्वीकारले',
    stageAcceptedDesc: 'रिसायकलरने यार्ड डिलिव्हरी मंजूर केली',
    stageCollected: 'प्रत्यक्ष हस्तांतरण',
    stageCollectedDesc: 'यार्डवर सामग्रीचे वजन व तपासणी झाली',
    stageCompleted: 'देयक नोंदवले गेले',
    stageCompletedDesc: 'अंतिम पेमेंट नोंदवून व्यवहार पूर्ण झाला',
    historyTitle: 'व्यवहार इतिहास',
    historySub: 'मागील ई-कचरा हस्तांतरण आणि डिजिटल नोंदी',
    historyEmpty: 'अद्याप कोणतेही व्यवहार नोंदवलेले नाहीत.',
    viewDigitalRecord: 'नोंद पहा',
    trackTransactionBtn: 'व्यवहार ट्रॅक करा',
  },
};

