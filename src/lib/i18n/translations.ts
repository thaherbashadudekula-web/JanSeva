import { Language } from '../storage/types';

export interface UIStrings {
  // Navigation & Brand
  portalTitle: string;
  portalSubtitle: string;
  home: string;
  services: string;
  assistant: string;
  fileGrievance: string;
  trackGrievance: string;
  staffPortal: string;
  demoDisclaimerBadge: string;
  demoBannerText: string;
  officialSourceNotice: string;
  machineTranslationDisclaimer: string;

  // Home Page
  heroTitle: string;
  heroSubtitle: string;
  searchPlaceholder: string;
  exploreCategories: string;
  popularServices: string;
  quickActions: string;
  needHelpPrompt: string;
  talkToAssistant: string;
  trackExistingRequest: string;
  fileSampleIssue: string;

  // Service Directory
  directoryTitle: string;
  directorySubtitle: string;
  searchServicesLabel: string;
  categoryFilterLabel: string;
  allCategories: string;
  categoryCertificates: string;
  categoryWelfare: string;
  categoryMunicipal: string;
  categoryRevenue: string;
  categoryTransport: string;
  categoryHealth: string;
  categoryEducation: string;
  noServicesFound: string;
  viewDetails: string;
  sourceLabel: string;
  contentLanguageLabel: string;
  lastReviewed: string;
  syntheticNotice: string;
  officialSourceLink: string;

  // Service Detail
  stepByStepGuide: string;
  eligibilityTitle: string;
  documentsTitle: string;
  feesTitle: string;
  processingTimeTitle: string;
  notConfirmedInSource: string;
  backToDirectory: string;
  askAssistantAboutThis: string;
  submitRelatedGrievance: string;

  // Grievance Submission
  grievanceTitle: string;
  grievanceSubtitle: string;
  privacyNoticeTitle: string;
  privacyNoticeText: string;
  subjectLabel: string;
  subjectPlaceholder: string;
  categoryLabel: string;
  locationLabel: string;
  locationPlaceholder: string;
  descriptionLabel: string;
  descriptionPlaceholder: string;
  attachmentLabel: string;
  attachmentHelpText: string;
  submitButton: string;
  submitting: string;
  successTitle: string;
  successSubtitle: string;
  refNumberLabel: string;
  pinLabel: string;
  pinNoticeText: string;
  copyDetailsButton: string;
  copiedNotice: string;
  trackNowButton: string;
  fileAnotherButton: string;
  demoSubmissionWarning: string;

  // Citizen Tracking
  trackingTitle: string;
  trackingSubtitle: string;
  refNumberInputLabel: string;
  refNumberInputPlaceholder: string;
  pinInputLabel: string;
  pinInputPlaceholder: string;
  checkStatusButton: string;
  checkingStatus: string;
  invalidPinError: string;
  notFoundError: string;
  rateLimitedError: string;
  statusOverview: string;
  statusHistoryTitle: string;
  currentStatus: string;
  category: string;
  location: string;
  dateSubmitted: string;
  lastUpdated: string;
  timelineBy: string;
  noHistoryAvailable: string;

  // Status Labels
  statusSubmitted: string;
  statusUnderReview: string;
  statusInProgress: string;
  statusResolved: string;
  statusClosed: string;

  // Assistant / Chat
  assistantTitle: string;
  assistantSubtitle: string;
  chatPlaceholder: string;
  sendMessage: string;
  speechInputButton: string;
  speechListening: string;
  speechProcessing: string;
  speechUnsupported: string;
  speechMicBlocked: string;
  editTranscriptHint: string;
  clearChat: string;
  suggestedQuestionsTitle: string;
  q1: string;
  q2: string;
  q3: string;
  q4: string;
  sourcesCited: string;
  noEvidenceDisclaimer: string;
  assistantClarificationPrompt: string;

  // Staff Portal
  staffPortalTitle: string;
  staffPortalSubtitle: string;
  passcodeLabel: string;
  passcodePlaceholder: string;
  staffLoginButton: string;
  staffLogoutButton: string;
  staffDisclaimer: string;
  activeQueueCount: string;
  allStaffQueue: string;
  updateStatusButton: string;
  internalNotesLabel: string;
  internalNotesPlaceholder: string;
  changeCategoryLabel: string;
  saveChangesButton: string;
  updateSuccess: string;
  reviewerIdentity: string;

  // Accessibility & General
  loading: string;
  close: string;
  selectLanguage: string;
  errorOccurred: string;
  requiredField: string;
  login: string;
  logout: string;
  dashboard: string;
}

export const TRANSLATIONS: Record<Language, UIStrings> = {
  en: {
    portalTitle: 'JanSeva Citizen Portal',
    portalSubtitle: 'Transparent Public Services & Grievance Demo Platform',
    home: 'Home',
    services: 'Service Directory',
    assistant: 'Citizen Assistant',
    fileGrievance: 'Submit Grievance',
    trackGrievance: 'Track Status',
    staffPortal: 'Staff Queue',
    demoDisclaimerBadge: 'DEMO PROTOTYPE',
    demoBannerText: 'Civic Demo Environment: All submissions and status updates are simulated. No requests are forwarded to actual government authorities.',
    officialSourceNotice: 'Official source texts are preserved in their published source language.',
    machineTranslationDisclaimer: 'Translations are provided for citizen accessibility and are not certified legal translations.',

    heroTitle: 'Accessible Public Services at Your Fingertips',
    heroSubtitle: 'Explore authentic guidelines for civic services, check documented eligibility, file sample grievances securely, and get grounded answers.',
    searchPlaceholder: 'Search by service name, certificate, welfare scheme...',
    exploreCategories: 'Explore by Department & Category',
    popularServices: 'Essential Citizen Services',
    quickActions: 'Quick Citizen Actions',
    needHelpPrompt: 'Unsure where to start? Ask our grounded virtual assistant.',
    talkToAssistant: 'Open Citizen Assistant',
    trackExistingRequest: 'Track Existing Request',
    fileSampleIssue: 'Submit a Sample Issue',

    directoryTitle: 'Public Services Directory',
    directorySubtitle: 'Curated catalogue of public services with official source references and documented requirements.',
    searchServicesLabel: 'Search Services',
    categoryFilterLabel: 'Filter by Department / Category',
    allCategories: 'All Categories',
    categoryCertificates: 'Certificates & Vital Records',
    categoryWelfare: 'Social Welfare & Pensions',
    categoryMunicipal: 'Municipal & Civil Works',
    categoryRevenue: 'Revenue & Land Records',
    categoryTransport: 'Transport & Driving',
    categoryHealth: 'Public Health',
    categoryEducation: 'Public Education',
    noServicesFound: 'No services match your search or filter criteria.',
    viewDetails: 'View Complete Requirements',
    sourceLabel: 'Official Source Portal',
    contentLanguageLabel: 'Source Content Language',
    lastReviewed: 'Last Source Audit',
    syntheticNotice: 'Curated Demo Record',
    officialSourceLink: 'Visit Source Website',

    stepByStepGuide: 'Official Procedure & Steps',
    eligibilityTitle: 'Eligibility Criteria',
    documentsTitle: 'Required Documentation',
    feesTitle: 'Statutory Fees & Charges',
    processingTimeTitle: 'Standard Processing Time',
    notConfirmedInSource: 'Not confirmed in the available source.',
    backToDirectory: '← Back to Service Directory',
    askAssistantAboutThis: 'Ask Assistant About This Service',
    submitRelatedGrievance: 'File Grievance Regarding This Service',

    grievanceTitle: 'Submit a Sample Grievance',
    grievanceSubtitle: 'Report a local civic issue or service delivery bottleneck. Minimal personal information required.',
    privacyNoticeTitle: 'Privacy-First Architecture',
    privacyNoticeText: 'We do not collect names, phone numbers, email addresses, or biometric data. Your request is identified exclusively by a secure reference number and secret PIN.',
    subjectLabel: 'Subject / Summary',
    subjectPlaceholder: 'e.g. Broken drainage cover on Ward 5 Market Road',
    categoryLabel: 'Issue Category',
    locationLabel: 'Location or Landmark Area',
    locationPlaceholder: 'e.g. Near Community Health Center, Ward 8, MG Road',
    descriptionLabel: 'Detailed Description',
    descriptionPlaceholder: 'Please describe the issue, frequency, and severity clearly...',
    attachmentLabel: 'Optional Document / Photo Reference',
    attachmentHelpText: 'Attach a sample document or enter a reference file name (max 5MB).',
    submitButton: 'Submit Sample Request',
    submitting: 'Securely Processing...',
    successTitle: 'Sample Request Registered Successfully',
    successSubtitle: 'Your request has been saved in the civic demo database. Note down your credentials below to check status.',
    refNumberLabel: 'Reference Number',
    pinLabel: 'Secret Access PIN (6 Digits)',
    pinNoticeText: 'IMPORTANT: Save this PIN now! For security reasons, this PIN is stored using a cryptographic one-way hash and cannot be recovered if lost.',
    copyDetailsButton: 'Copy Reference & PIN',
    copiedNotice: 'Copied to clipboard!',
    trackNowButton: 'Track Status Now',
    fileAnotherButton: 'Submit Another Request',
    demoSubmissionWarning: 'DEMO NOTICE: This sample request is stored solely within the local demonstration database and will NOT trigger real-world municipal or government action.',

    trackingTitle: 'Track Request / Grievance',
    trackingSubtitle: 'Check the real-time status and staff review history for your submitted reference number.',
    refNumberInputLabel: 'Reference Number',
    refNumberInputPlaceholder: 'e.g. SR-20261025-8F3A',
    pinInputLabel: '6-Digit Access PIN',
    pinInputPlaceholder: 'e.g. 123456',
    checkStatusButton: 'View Request Status',
    checkingStatus: 'Verifying Credentials...',
    invalidPinError: 'Incorrect PIN provided for this reference number. Please check and re-enter.',
    notFoundError: 'No sample request was found with this reference number.',
    rateLimitedError: 'Too many consecutive failed attempts. For security, lookups for this reference number are temporarily locked for 15 minutes.',
    statusOverview: 'Status Overview',
    statusHistoryTitle: 'Activity & Review Timeline',
    currentStatus: 'Current Status',
    category: 'Category',
    location: 'Reported Area',
    dateSubmitted: 'Date Submitted',
    lastUpdated: 'Last Updated',
    timelineBy: 'Action by',
    noHistoryAvailable: 'No timeline events recorded yet.',

    statusSubmitted: 'Submitted',
    statusUnderReview: 'Under Review',
    statusInProgress: 'In Progress',
    statusResolved: 'Resolved',
    statusClosed: 'Closed',

    assistantTitle: 'Citizen Services AI Assistant',
    assistantSubtitle: 'Ask questions about government procedures, required certificates, and civic schemes. Grounded strictly in curated sources.',
    chatPlaceholder: 'Type your question or click the mic to speak...',
    sendMessage: 'Send',
    speechInputButton: 'Voice input (EN / HI / TE)',
    speechListening: 'Listening... Speak clearly',
    speechProcessing: 'Processing audio transcript...',
    speechUnsupported: 'Voice speech recognition is not supported in this browser. Please use keyboard text entry.',
    speechMicBlocked: 'Microphone permission denied. Please allow microphone access in your browser settings.',
    editTranscriptHint: 'Review or edit the recognized speech before sending:',
    clearChat: 'Clear Conversation',
    suggestedQuestionsTitle: 'Frequently Asked Questions',
    q1: 'What documents do I need to register a birth certificate?',
    q2: 'How do I apply for a senior citizen pension scheme?',
    q3: 'What is the procedure if streetlights in my ward are not functioning?',
    q4: 'How can I apply for an Ayushman Bharat health card?',
    sourcesCited: 'Sources Consulted',
    noEvidenceDisclaimer: 'This detail is not confirmed in the available government sources. To avoid misleading you, we cannot speculate. You may consult the respective department directly or submit a civic grievance.',
    assistantClarificationPrompt: 'Would you like to narrow down by a specific city, department, or procedure?',

    staffPortalTitle: 'Demo Staff Review Queue',
    staffPortalSubtitle: 'Internal demonstration queue for reviewing citizen submissions, adjusting categories, and posting review notes.',
    passcodeLabel: 'Demo Staff Passcode',
    passcodePlaceholder: 'Enter demo staff passcode (default: staff-demo-2026)',
    staffLoginButton: 'Authenticate as Demo Staff',
    staffLogoutButton: 'Sign Out Staff Session',
    staffDisclaimer: 'Staff Interface Notice: Actions performed here update the sample database entries. This interface does NOT represent an official municipal administrative dashboard.',
    activeQueueCount: 'Sample Requests in Queue',
    allStaffQueue: 'Grievance Review Table',
    updateStatusButton: 'Update Status / Review',
    internalNotesLabel: 'Staff Reviewer Notes',
    internalNotesPlaceholder: 'Enter review remarks, inspection findings, or resolution details...',
    changeCategoryLabel: 'Reassign Category',
    saveChangesButton: 'Save Status Update',
    updateSuccess: 'Status updated successfully.',
    reviewerIdentity: 'Demo Reviewer',

    loading: 'Loading...',
    close: 'Close',
    selectLanguage: 'Language / भाषा / భాష',
    errorOccurred: 'An unexpected error occurred. Please try again.',
    requiredField: 'This field is required.',
    login: 'Sign In',
    logout: 'Sign Out',
    dashboard: 'Dashboard'
  },

  hi: {
    portalTitle: 'जनसेवा नागरिक पोर्टल',
    portalSubtitle: 'पारदर्शी सार्वजनिक सेवाएं और शिकायत डेमो प्लेटफॉर्म',
    home: 'होम',
    services: 'सेवा निर्देशिका',
    assistant: 'नागरिक सहायक',
    fileGrievance: 'शिकायत दर्ज करें',
    trackGrievance: 'स्थिति ट्रैक करें',
    staffPortal: 'कर्मचारी कतार',
    demoDisclaimerBadge: 'डेमो प्रोटोटाइप',
    demoBannerText: 'नागरिक डेमो वातावरण: सभी प्रस्तुतियां और स्थिति अपडेट केवल डेमो हैं। कोई भी अनुरोध वास्तविक सरकारी प्राधिकरणों को नहीं भेजा जाता है।',
    officialSourceNotice: 'आधिकारिक स्रोत सामग्री को उनकी मूल प्रकाशित भाषा में सुरक्षित रखा गया है।',
    machineTranslationDisclaimer: 'अनुवाद नागरिकों की सुलभता के लिए प्रदान किए गए हैं और ये प्रमाणित कानूनी अनुवाद नहीं हैं।',

    heroTitle: 'सार्वजनिक सेवाएं आपकी उंगलियों पर',
    heroSubtitle: 'नागरिक सेवाओं के लिए प्रामाणिक दिशा-निर्देश खोजें, दस्तावेजी पात्रता जांचें, शिकायतें दर्ज करें और सटीक उत्तर प्राप्त करें।',
    searchPlaceholder: 'सेवा नाम, प्रमाण पत्र, कल्याण योजना खोजें...',
    exploreCategories: 'विभाग और श्रेणी के अनुसार देखें',
    popularServices: 'आवश्यक नागरिक सेवाएं',
    quickActions: 'त्वरित नागरिक कार्य',
    needHelpPrompt: 'समझ नहीं आ रहा कहां से शुरू करें? हमारे सहायक से पूछें।',
    talkToAssistant: 'नागरिक सहायक खोलें',
    trackExistingRequest: 'अनुरोध की स्थिति जांचें',
    fileSampleIssue: 'नमूना समस्या दर्ज करें',

    directoryTitle: 'सार्वजनिक सेवा निर्देशिका',
    directorySubtitle: 'आधिकारिक स्रोत संदर्भों और प्रलेखित आवश्यकताओं के साथ सार्वजनिक सेवाओं की सूची।',
    searchServicesLabel: 'सेवाएं खोजें',
    categoryFilterLabel: 'विभाग / श्रेणी के अनुसार फ़िल्टर करें',
    allCategories: 'सभी श्रेणियां',
    categoryCertificates: 'प्रमाण पत्र एवं नागरिक अभिलेख',
    categoryWelfare: 'सामाजिक कल्याण एवं पेंशन',
    categoryMunicipal: 'नगर पालिका और नागरिक कार्य',
    categoryRevenue: 'राजस्व और भूमि अभिलेख',
    categoryTransport: 'परिवहन और ड्राइविंग',
    categoryHealth: 'सार्वजनिक स्वास्थ्य',
    categoryEducation: 'सार्वजनिक शिक्षा',
    noServicesFound: 'आपकी खोज या फ़िल्टर से कोई सेवा मेल नहीं खाती।',
    viewDetails: 'पूरी आवश्यकताएं देखें',
    sourceLabel: 'आधिकारिक स्रोत पोर्टल',
    contentLanguageLabel: 'स्रोत सामग्री की भाषा',
    lastReviewed: 'अंतिम स्रोत समीक्षा',
    syntheticNotice: 'क्यूरेटेड डेमो रिकॉर्ड',
    officialSourceLink: 'स्रोत वेबसाइट देखें',

    stepByStepGuide: 'आधिकारिक प्रक्रिया और चरण',
    eligibilityTitle: 'पात्रता मानदंड',
    documentsTitle: 'आवश्यक दस्तावेज',
    feesTitle: 'वैधानिक शुल्क और प्रभार',
    processingTimeTitle: 'मानक प्रसंस्करण समय',
    notConfirmedInSource: 'उपलब्ध स्रोत में पुष्टि नहीं हुई है।',
    backToDirectory: '← सेवा निर्देशिका पर वापस जाएं',
    askAssistantAboutThis: 'इस सेवा के बारे में सहायक से पूछें',
    submitRelatedGrievance: 'इस सेवा से संबंधित शिकायत दर्ज करें',

    grievanceTitle: 'नमूना शिकायत दर्ज करें',
    grievanceSubtitle: 'स्थानीय नागरिक समस्या या सेवा वितरण बाधा की रिपोर्ट करें। न्यूनतम व्यक्तिगत जानकारी आवश्यक है।',
    privacyNoticeTitle: 'गोपनीयता-प्रथम वास्तुकला',
    privacyNoticeText: 'हम नाम, फोन नंबर, ईमेल या बायोमेट्रिक डेटा एकत्र नहीं करते हैं। आपके अनुरोध की पहचान केवल एक सुरक्षित संदर्भ संख्या और गुप्त पिन द्वारा होती है।',
    subjectLabel: 'विषय / सारांश',
    subjectPlaceholder: 'उदा. वार्ड 5 मार्केट रोड पर नाली का ढक्कन टूटा हुआ है',
    categoryLabel: 'समस्या की श्रेणी',
    locationLabel: 'स्थान या लैंडमार्क क्षेत्र',
    locationPlaceholder: 'उदा. सामुदायिक स्वास्थ्य केंद्र के पास, वार्ड 8, एमजी रोड',
    descriptionLabel: 'विस्तृत विवरण',
    descriptionPlaceholder: 'कृपया समस्या, आवृत्ति और गंभीरता का स्पष्ट वर्णन करें...',
    attachmentLabel: 'वैकल्पिक दस्तावेज / फोटो संदर्भ',
    attachmentHelpText: 'एक नमूना दस्तावेज संलग्न करें या फ़ाइल नाम दर्ज करें (अधिकतम 5MB)।',
    submitButton: 'नमूना अनुरोध जमा करें',
    submitting: 'प्रक्रिया जारी है...',
    successTitle: 'नमूना अनुरोध सफलतापूर्वक पंजीकृत',
    successSubtitle: 'आपका अनुरोध डेमो डेटाबेस में सुरक्षित हो गया है। स्थिति की जांच के लिए नीचे दिए गए क्रेडेंशियल नोट करें।',
    refNumberLabel: 'संदर्भ संख्या (Reference Number)',
    pinLabel: 'गुप्त एक्सेस पिन (6 अंक)',
    pinNoticeText: 'महत्वपूर्ण: इस पिन को अभी सहेजें! सुरक्षा कारणों से, यह पिन एन्क्रिप्टेड है और खो जाने पर पुनर्प्राप्त नहीं किया जा सकता है।',
    copyDetailsButton: 'संदर्भ और पिन कॉपी करें',
    copiedNotice: 'क्लिपबोर्ड पर कॉपी किया गया!',
    trackNowButton: 'अभी स्थिति ट्रैक करें',
    fileAnotherButton: 'अन्य अनुरोध सबमिट करें',
    demoSubmissionWarning: 'डेमो सूचना: यह अनुरोध केवल प्रदर्शन डेटाबेस में संग्रहीत है और किसी वास्तविक सरकारी कार्रवाई को ट्रिगर नहीं करेगा।',

    trackingTitle: 'अनुरोध / शिकायत ट्रैक करें',
    trackingSubtitle: 'अपनी संदर्भ संख्या के लिए रीयल-टाइम स्थिति और समीक्षा इतिहास जांचें।',
    refNumberInputLabel: 'संदर्भ संख्या (Reference Number)',
    refNumberInputPlaceholder: 'उदा. SR-20261025-8F3A',
    pinInputLabel: '6-अंकीय एक्सेस पिन',
    pinInputPlaceholder: 'उदा. 123456',
    checkStatusButton: 'अनुरोध स्थिति देखें',
    checkingStatus: 'सत्यापन हो रहा है...',
    invalidPinError: 'इस संदर्भ संख्या के लिए गलत पिन दर्ज किया गया है। कृपया जांचें और पुनः प्रयास करें।',
    notFoundError: 'इस संदर्भ संख्या के साथ कोई नमूना अनुरोध नहीं मिला।',
    rateLimitedError: 'लगातार कई असफल प्रयास। सुरक्षा के लिए, इस संदर्भ संख्या को 15 मिनट के लिए अस्थायी रूप से लॉक कर दिया गया है।',
    statusOverview: 'स्थिति का विवरण',
    statusHistoryTitle: 'गतिविधि एवं समीक्षा समयरेखा',
    currentStatus: 'वर्तमान स्थिति',
    category: 'श्रेणी',
    location: 'सूचित क्षेत्र',
    dateSubmitted: 'प्रस्तुति तिथि',
    lastUpdated: 'अंतिम अपडेट',
    timelineBy: 'द्वारा कार्रवाई',
    noHistoryAvailable: 'अभी तक कोई गतिविधि दर्ज नहीं की गई है।',

    statusSubmitted: 'जमा किया गया (Submitted)',
    statusUnderReview: 'समीक्षाधीन (Under Review)',
    statusInProgress: 'प्रगति पर है (In Progress)',
    statusResolved: 'हल किया गया (Resolved)',
    statusClosed: 'बंद किया गया (Closed)',

    assistantTitle: 'नागरिक सेवा एआई सहायक',
    assistantSubtitle: 'सरकारी प्रक्रियाओं, प्रमाण पत्रों और नागरिक योजनाओं के बारे में प्रश्न पूछें। आधिकारिक स्रोतों पर आधारित।',
    chatPlaceholder: 'अपना प्रश्न लिखें या बोलने के लिए माइक पर क्लिक करें...',
    sendMessage: 'भेजें',
    speechInputButton: 'ध्वनि इनपुट (अंग्रेजी / हिंदी / तेलुगु)',
    speechListening: 'सुन रहा हूँ... कृपया स्पष्ट बोलें',
    speechProcessing: 'ध्वनि संसाधित हो रही है...',
    speechUnsupported: 'इस ब्राउज़र में ध्वनि पहचान समर्थित नहीं है। कृपया कीबोर्ड से टाइप करें।',
    speechMicBlocked: 'माइक्रोफ़ोन की अनुमति अस्वीकृत। कृपया ब्राउज़र सेटिंग्स में माइक्रोफ़ोन की अनुमति दें।',
    editTranscriptHint: 'संदेश भेजने से पहले बोले गए पाठ की समीक्षा करें या संपादित करें:',
    clearChat: 'बातचीत साफ़ करें',
    suggestedQuestionsTitle: 'अक्सर पूछे जाने वाले प्रश्न',
    q1: 'जन्म प्रमाण पत्र बनवाने के लिए किन दस्तावेजों की आवश्यकता है?',
    q2: 'वृद्धावस्था पेंशन योजना के लिए कैसे आवेदन करें?',
    q3: 'यदि मेरे वार्ड की स्ट्रीट लाइट काम नहीं कर रही है तो क्या प्रक्रिया है?',
    q4: 'आयुष्मान भारत स्वास्थ्य कार्ड के लिए कैसे आवेदन करें?',
    sourcesCited: 'परामर्शित स्रोत',
    noEvidenceDisclaimer: 'उपलब्ध सरकारी स्रोतों में इस विवरण की पुष्टि नहीं हुई है। किसी भी भ्रम से बचने के लिए हम अनुमान नहीं लगाते। आप संबंधित विभाग से संपर्क कर सकते हैं।',
    assistantClarificationPrompt: 'क्या आप किसी विशिष्ट शहर, विभाग या प्रक्रिया के बारे में स्पष्टीकरण चाहते हैं?',

    staffPortalTitle: 'डेमो स्टाफ समीक्षा कतार',
    staffPortalSubtitle: 'नागरिक प्रस्तुतियों की समीक्षा, श्रेणी बदलने और टिप्पणियां जोड़ने के लिए आंतरिक प्रदर्शन कतार।',
    passcodeLabel: 'डेमो स्टाफ पासकोड',
    passcodePlaceholder: 'स्टाफ पासकोड दर्ज करें (डिफ़ॉल्ट: staff-demo-2026)',
    staffLoginButton: 'डेमो स्टाफ के रूप में लॉगिन करें',
    staffLogoutButton: 'सत्र समाप्त करें',
    staffDisclaimer: 'स्टाफ इंटरफेस सूचना: यहां की गई कार्रवाई नमूना डेटाबेस को अपडेट करती है। यह आधिकारिक प्रशासनिक पोर्टल नहीं है।',
    activeQueueCount: 'कतार में नमूना अनुरोध',
    allStaffQueue: 'शिकायत समीक्षा तालिका',
    updateStatusButton: 'स्थिति अपडेट / समीक्षा',
    internalNotesLabel: 'स्टाफ समीक्षक टिप्पणियां',
    internalNotesPlaceholder: 'समीक्षा विवरण, निरीक्षण निष्कर्ष या समाधान नोट दर्ज करें...',
    changeCategoryLabel: 'श्रेणी पुन: सौंपें',
    saveChangesButton: 'स्थिति सहेजें',
    updateSuccess: 'स्थिति सफलतापूर्वक अपडेट की गई।',
    reviewerIdentity: 'डेमो समीक्षक',

    loading: 'लोड हो रहा है...',
    close: 'बंद करें',
    selectLanguage: 'भाषा चुनें (Language)',
    errorOccurred: 'एक अप्रत्याशित त्रुटि हुई। कृपया पुन: प्रयास करें।',
    requiredField: 'यह फ़ील्ड आवश्यक है।',
    login: 'साइन इन',
    logout: 'लॉग आउट',
    dashboard: 'डैशबोर्ड'
  },

  te: {
    portalTitle: 'జనసేవ పౌర పోర్టల్',
    portalSubtitle: 'పారదర్శక ప్రజా సేవలు మరియు ఫిర్యాదుల డెమో వేదిక',
    home: 'హోమ్',
    services: 'సేవల డైరెక్టరీ',
    assistant: 'పౌర సహాయకుడు',
    fileGrievance: 'ఫిర్యాదు దాఖలు చేయండి',
    trackGrievance: 'స్థితిని ట్రాక్ చేయండి',
    staffPortal: 'సిబ్బంది క్యూ',
    demoDisclaimerBadge: 'డెమో ప్రోటోటైప్',
    demoBannerText: 'పౌర డెమో వాతావరణం: సమర్పణలు మరియు స్థితి నవీకరణలు అన్నీ డెమో మాత్రమే. వాస్తవ ప్రభుత్వ అధికారులకు ఏ అభ్యర్థనలు పంపబడవు.',
    officialSourceNotice: 'అధికారిక మూల పాఠ్యాలు ప్రచురించబడిన అసలు భాషలోనే భద్రపరచబడ్డాయి.',
    machineTranslationDisclaimer: 'అనువాదాలు పౌరుల సౌలభ్యం కోసం అందించబడ్డాయి మరియు ఇవి ధృవీకరించబడిన చట్టపరమైన అనువాదాలు కావు.',

    heroTitle: 'ప్రజా సేవలు మీ వేలికొనలపై',
    heroSubtitle: 'పౌర సేవల కోసం ప్రామాణిక మార్గదర్శకాలను అన్వేషించండి, ధృవీకరించబడిన అర్హతలను తనిఖీ చేయండి, నమూనా ఫిర్యాదులను నమోదు చేయండి.',
    searchPlaceholder: 'సేవ పేరు, ధృవీకరణ పత్రం, సంక్షేమ పథకం శోధించండి...',
    exploreCategories: 'శాఖలు మరియు వర్గాల వారీగా అన్వేషించండి',
    popularServices: 'ముఖ్యమైన పౌర సేవలు',
    quickActions: 'త్వరిత పౌర చర్యలు',
    needHelpPrompt: 'ఎక్కడ ప్రారంభించాలో తెలియదా? మా పౌర సహాయకుడిని అడగండి.',
    talkToAssistant: 'పౌర సహాయకుడిని తెరవండి',
    trackExistingRequest: 'అభ్యర్థన స్థితిని తనిఖీ చేయండి',
    fileSampleIssue: 'నమూనా సమస్యను నివేదించండి',

    directoryTitle: 'ప్రజా సేవల డైరెక్టరీ',
    directorySubtitle: 'అధికారిక మూల సూచనలు మరియు ధృవీకరించబడిన అవసరాలతో కూడిన ప్రజా సేవల జాబితా.',
    searchServicesLabel: 'సేవలను శోధించండి',
    categoryFilterLabel: 'శాఖ / వర్గం వారీగా ఫిల్టర్ చేయండి',
    allCategories: 'అన్ని వర్గాలు',
    categoryCertificates: 'ధృవీకరణ పత్రాలు & పౌర రికార్డులు',
    categoryWelfare: 'సామాజిక సంక్షేమం & పెన్షన్లు',
    categoryMunicipal: 'మున్సిపల్ & పౌర పనులు',
    categoryRevenue: 'రెవెన్యూ & భూ రికార్డులు',
    categoryTransport: 'రవాణా & డ్రైవింగ్ లైసెన్స్',
    categoryHealth: 'ప్రజా ఆరోగ్యం',
    categoryEducation: 'ప్రభుత్వ విద్య',
    noServicesFound: 'మీ శోధన ప్రమాణాలకు సరిపోయే సేవలు కనుగొనబడలేదు.',
    viewDetails: 'పూర్తి వివరాలు చూడండి',
    sourceLabel: 'అధికారిక మూల పోర్టల్',
    contentLanguageLabel: 'మూల కంటెంట్ భాష',
    lastReviewed: 'చివరి సమీక్ష తేదీ',
    syntheticNotice: 'క్యూరేటెడ్ డెమో రికార్డ్',
    officialSourceLink: 'మూల వెబ్‌సైట్‌ను సందర్శించండి',

    stepByStepGuide: 'అధికారిక విధానం & దశలు',
    eligibilityTitle: 'అర్హత ప్రమాణాలు',
    documentsTitle: 'కావలసిన పత్రాలు',
    feesTitle: 'రుసుములు & ఛార్జీలు',
    processingTimeTitle: 'ప్రామాణిక ప్రాసెసింగ్ సమయం',
    notConfirmedInSource: 'అందుబాటులో ఉన్న మూలంలో నిర్ధారించబడలేదు.',
    backToDirectory: '← సేవల డైరెక్టరీకి తిరిగి వెళ్లండి',
    askAssistantAboutThis: 'ఈ సేవ గురించి సహాయకుడిని అడగండి',
    submitRelatedGrievance: 'ఈ సేవకు సంబంధించి ఫిర్యాదు చేయండి',

    grievanceTitle: 'నమూనా ఫిర్యాదును నమోదు చేయండి',
    grievanceSubtitle: 'స్థానిక పౌర సమస్య లేదా సేవా లోపాన్ని నివేదించండి. కనీస వ్యక్తిగత సమాచారం మాత్రమే అవసరం.',
    privacyNoticeTitle: 'గోప్యత-మొదటి విధానం',
    privacyNoticeText: 'మేము పేర్లు, ఫోన్ నంబర్లు, ఇమెయిల్‌లు లేదా బయోమెట్రిక్ డేటాను సేకరించము. మీ అభ్యర్థన సురక్షిత సూచన సంఖ్య మరియు పిన్ ద్వారా మాత్రమే గుర్తించబడుతుంది.',
    subjectLabel: 'విషయం / సారాంశం',
    subjectPlaceholder: 'ఉదా. వార్డు 5 మార్కెట్ రోడ్డులో డ్రైనేజీ మూత పగిలిపోయింది',
    categoryLabel: 'సమస్య వర్గం',
    locationLabel: 'ప్రాంతం లేదా మైలురాయి',
    locationPlaceholder: 'ఉదా. కమ్యూనిటీ హెల్త్ సెంటర్ దగ్గర, వార్డు 8, ఎంజీ రోడ్',
    descriptionLabel: 'వివరణాత్మక వివరణ',
    descriptionPlaceholder: 'దయచేసి సమస్య, తీవ్రతను స్పష్టంగా వివరించండి...',
    attachmentLabel: 'ఐచ్ఛిక పత్రం / ఫోటో సూచన',
    attachmentHelpText: 'నమూనా పత్రాన్ని జత చేయండి లేదా ఫైల్ పేరును నమోదు చేయండి (గరిష్టంగా 5MB).',
    submitButton: 'నమూనా అభ్యర్థనను సమర్పించండి',
    submitting: 'ప్రాసెస్ చేయబడుతోంది...',
    successTitle: 'నమూనా అభ్యర్థన విజయవంతంగా నమోదైంది',
    successSubtitle: 'మీ అభ్యర్థన డెమో డేటాబేస్‌లో భద్రపరచబడింది. స్థితిని తనిఖీ చేయడానికి క్రింది వివరాలను భద్రపరుచుకోండి.',
    refNumberLabel: 'రిఫరెన్స్ సంఖ్య (Reference Number)',
    pinLabel: 'రహస్య యాక్సెస్ పిన్ (6 అంకెలు)',
    pinNoticeText: 'ముఖ్యమైనది: ఈ పిన్‌ను ఇప్పుడే సేవ్ చేయండి! భద్రతా కారణాల వల్ల ఇది ఎన్‌క్రిప్ట్ చేయబడింది, పోతే తిరిగి పొందలేరు.',
    copyDetailsButton: 'రిఫరెన్స్ & పిన్ కాపీ చేయండి',
    copiedNotice: 'క్లిప్‌బోర్డ్‌కి కాపీ చేయబడింది!',
    trackNowButton: 'ఇప్పుడే స్థితిని ట్రాక్ చేయండి',
    fileAnotherButton: 'మరొక అభ్యర్థనను సమర్పించండి',
    demoSubmissionWarning: 'డెమో గమనిక: ఇది కేవలం డెమో రికార్డు మాత్రమే, ఇది వాస్తవ ప్రభుత్వ చర్యను ప్రారంభించదు.',

    trackingTitle: 'అభ్యర్థన / ఫిర్యాదు స్థితి',
    trackingSubtitle: 'మీ రిఫరెన్స్ సంఖ్య కోసం నిజ-సమయ స్థితి మరియు సమీక్ష చరిత్రను తనిఖీ చేయండి.',
    refNumberInputLabel: 'రిఫరెన్స్ సంఖ్య (Reference Number)',
    refNumberInputPlaceholder: 'ఉదా. SR-20261025-8F3A',
    pinInputLabel: '6-అంకెల యాక్సెస్ పిన్',
    pinInputPlaceholder: 'ఉదా. 123456',
    checkStatusButton: 'అభ్యర్థన స్థితిని వీక్షించండి',
    checkingStatus: 'ధృవీకరిస్తోంది...',
    invalidPinError: 'ఈ రిఫరెన్స్ సంఖ్యకు తప్పుడు పిన్ అందించబడింది. దయచేసి మళ్లీ ప్రయత్నించండి.',
    notFoundError: 'ఈ రిఫరెన్స్ సంఖ్యతో ఎటువంటి అభ్యర్థన కనుగొనబడలేదు.',
    rateLimitedError: 'చాలా విఫల ప్రయత్నాలు జరిగాయి. భద్రత కోసం, ఈ రిఫరెన్స్ సంఖ్య 15 నిమిషాల పాటు తాత్కాలికంగా లాక్ చేయబడింది.',
    statusOverview: 'స్థితి సమాచారం',
    statusHistoryTitle: 'కార్యకలాపాలు & సమీక్ష కాలక్రమం',
    currentStatus: 'ప్రస్తుత స్థితి',
    category: 'వర్గం',
    location: 'నివేదించబడిన ప్రాంతం',
    dateSubmitted: 'సమర్పించిన తేదీ',
    lastUpdated: 'చివరి నవీకరణ',
    timelineBy: 'చర్య తీసుకున్నది',
    noHistoryAvailable: 'ఇంకా ఎలాంటి చర్యలు నమోదు కాలేదు.',

    statusSubmitted: 'సమర్పించబడింది (Submitted)',
    statusUnderReview: 'సమీక్షలో ఉంది (Under Review)',
    statusInProgress: 'పురోగతిలో ఉంది (In Progress)',
    statusResolved: 'పరిష్కరించబడింది (Resolved)',
    statusClosed: 'ముగిసింది (Closed)',

    assistantTitle: 'పౌర సేవల ఏఐ సహాయకుడు',
    assistantSubtitle: 'ప్రభుత్వ విధానాలు, ధృవీకరణ పత్రాలు మరియు సంక్షేమ పథకాల గురించి ప్రశ్నలు అడగండి. ధృవీకరించబడిన సమాచారం మాత్రమే అందించబడుతుంది.',
    chatPlaceholder: 'మీ ప్రశ్నను టైప్ చేయండి లేదా మాట్లాడటానికి మైక్ క్లిక్ చేయండి...',
    sendMessage: 'పంపు',
    speechInputButton: 'వాయిస్ ఇన్‌పుట్ (ఇంగ్లీష్ / హిందీ / తెలుగు)',
    speechListening: 'వింటోంది... స్పష్టంగా మాట్లాడండి',
    speechProcessing: 'ఆడియో ప్రాసెస్ చేయబడుతోంది...',
    speechUnsupported: 'ఈ బ్రౌజర్‌లో వాయిస్ రికగ్నిషన్ అందుబాటులో లేదు. దయచేసి కీబోర్డ్ ద్వారా టైప్ చేయండి.',
    speechMicBlocked: 'మైక్రోఫోన్ అనుమతి నిరాకరించబడింది. దయచేసి బ్రౌజర్ సెట్టింగ్‌లలో మైక్రోఫోన్ అనుమతించండి.',
    editTranscriptHint: 'సందేశం పంపే ముందు మాట్లాడిన వచనాన్ని సమీక్షించండి లేదా సవరించండి:',
    clearChat: 'చాట్ క్లియర్ చేయండి',
    suggestedQuestionsTitle: 'తరచుగా అడిగే ప్రశ్నలు',
    q1: 'జనన ధృవీకరణ పత్రం కోసం ఏయే పత్రాలు అవసరం?',
    q2: 'వృద్ధాప్య పెన్షన్ పథకం కోసం ఎలా దరఖాస్తు చేసుకోవాలి?',
    q3: 'మా వార్డులో వీధి దీపాలు వెలగకపోతే ఏమి చేయాలి?',
    q4: 'ఆయుష్మాన్ భారత్ హెల్త్ కార్డు కోసం ఎలా దరఖాస్తు చేయాలి?',
    sourcesCited: 'పరిశీలించిన మూలాలు',
    noEvidenceDisclaimer: 'అందుబాటులో ఉన్న ప్రభుత్వ మూలాలలో ఈ వివరాలు నిర్ధారించబడలేదు. మేము ఊహాజనిత సమాచారాన్ని అందించము. దయచేసి సంబంధిత విభాగాన్ని నేరుగా సంప్రదించండి.',
    assistantClarificationPrompt: 'మీరు నిర్దిష్ట నగరం, విభాగం లేదా విధానం గురించి మరింత తెలుసుకోవాలనుకుంటున్నారా?',

    staffPortalTitle: 'డెమో సిబ్బంది సమీక్ష క్యూ',
    staffPortalSubtitle: 'పౌరుల సమర్పణలను సమీక్షించడానికి, వర్గాలను మార్చడానికి మరియు గమనికలను జోడించడానికి అంతర్గత డెమో వేదిక.',
    passcodeLabel: 'డెమో సిబ్బంది పాస్‌కోడ్',
    passcodePlaceholder: 'సిబ్బంది పాస్‌కోడ్ నమోదు చేయండి (డిఫాల్ట్: staff-demo-2026)',
    staffLoginButton: 'సిబ్బందిగా లాగిన్ అవ్వండి',
    staffLogoutButton: 'లాగ్ అవుట్',
    staffDisclaimer: 'సిబ్బంది ఇంటర్‌ఫేస్ గమనిక: ఇక్కడ తీసుకున్న చర్యలు నమూనా డేటాబేస్‌ను మాత్రమే అప్‌డేట్ చేస్తాయి. ఇది అధికారిక పరిపాలనా పోర్టల్ కాదు.',
    activeQueueCount: 'క్యూలో ఉన్న నమూనా అభ్యర్థనలు',
    allStaffQueue: 'ఫిర్యాదు సమీక్ష పట్టిక',
    updateStatusButton: 'స్థితి నవీకరణ / సమీక్ష',
    internalNotesLabel: 'సిబ్బంది సమీక్షకుని గమనికలు',
    internalNotesPlaceholder: 'సమీక్ష వివరాలు, తనిఖీ ఫలితాలు లేదా పరిష్కార వివరాలను నమోదు చేయండి...',
    changeCategoryLabel: 'వర్గాన్ని మార్చండి',
    saveChangesButton: 'నవీకరణను సేవ్ చేయండి',
    updateSuccess: 'స్థితి విజయవంతంగా నవీకరించబడింది.',
    reviewerIdentity: 'డెమో సమీక్షకుడు',

    loading: 'లోడ్ అవుతోంది...',
    close: 'మూసివేయి',
    selectLanguage: 'భాషను ఎంచుకోండి (Language)',
    errorOccurred: 'ఊహించని లోపం జరిగింది. దయచేసి మళ్లీ ప్రయత్నించండి.',
    requiredField: 'ఈ ఫీల్డ్ తప్పనిసరి.',
    login: 'సైన్ ఇన్',
    logout: 'లాగ్ అవుట్',
    dashboard: 'డాష్‌బోర్డ్'
  }
};

