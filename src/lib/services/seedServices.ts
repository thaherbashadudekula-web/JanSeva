import { ServiceRecord } from '../storage/types';

export const SEED_SERVICES: ServiceRecord[] = [
  {
    id: 'birth-certificate-issuance',
    title: {
      en: 'Issuance of Birth Certificate',
      hi: 'जन्म प्रमाण पत्र जारी करना',
      te: 'జనన ధృవీకరణ పత్రం జారీ'
    },
    category: 'certificates',
    department: 'Department of Municipal Administration & Civil Registration',
    description: {
      en: 'Official civil registration document certifying the birth of a citizen, required for school admissions, passport, and legal identification.',
      hi: 'नागरिक के जन्म को प्रमाणित करने वाला आधिकारिक नागरिक पंजीकरण दस्तावेज, जो स्कूल में प्रवेश, पासपोर्ट और कानूनी पहचान के लिए आवश्यक है।',
      te: 'పౌరుడి జననాన్ని ధృవీకరించే అధికారిక పౌర నమోదు పత్రం, పాఠశాల ప్రవేశాలు, పాస్‌పోర్ట్ మరియు చట్టపరమైన గుర్తింపు కోసం అవసరం.'
    },
    steps: {
      en: [
        'Check if birth was registered by hospital within 21 days of occurrence.',
        'Submit the discharge receipt or hospital birth report slip.',
        'Provide parent identity proof (Aadhaar/Voter ID) and address proof.',
        'Pay standard statutory registration fee if delayed beyond 30 days.',
        'Download digitally signed certificate from the portal once approved.'
      ],
      hi: [
        'जांचें कि क्या अस्पताल द्वारा जन्म के 21 दिनों के भीतर जन्म दर्ज किया गया था।',
        'अस्पताल का डिस्चार्ज रसीद या जन्म रिपोर्ट पर्ची जमा करें।',
        'माता-पिता का पहचान प्रमाण (आधार/मतदाता पहचान पत्र) और पता प्रमाण प्रदान करें।',
        '30 दिनों से अधिक देरी होने पर मानक वैधानिक पंजीकरण शुल्क का भुगतान करें।',
        'स्वीकृत होने पर पोर्टल से डिजिटल रूप से हस्ताक्षरित प्रमाण पत्र डाउनलोड करें।'
      ],
      te: [
        'జననం జరిగిన 21 రోజుల్లోగా ఆసుపత్రి ద్వారా నమోదు చేయబడిందో లేదో తనిఖీ చేయండి.',
        'ఆసుపత్రి డిశ్చార్జ్ రసీదు లేదా జనన నివేదిక స్లిప్ సమర్పించండి.',
        'తల్లిదండ్రుల గుర్తింపు రుజువు (ఆధార్/ఓటరు ఐడి) మరియు చిరునామా రుజువు అందించండి.',
        '30 రోజులకు మించి ఆలస్యమైతే నిర్దేశిత రుసుము చెల్లించండి.',
        'ఆమోదం పొందిన తర్వాత పోర్టల్ నుండి డిజిటల్ సంతకం చేసిన పత్రాన్ని డౌన్‌లోడ్ చేసుకోండి.'
      ]
    },
    eligibility: 'Citizen born within the designated municipal jurisdiction; report filed within standard registration window.',
    documentsRequired: [
      'Hospital Discharge Summary or Institutional Birth Intimation Slip',
      'Parents Identity Proof (Aadhaar / Voter ID)',
      'Marriage Certificate of Parents (where applicable)',
      'Proof of Residence of Parents'
    ],
    fees: 'Free within 21 days; Nominal late fee (₹20 to ₹50) applicable after statutory period.',
    processingTime: '7 to 14 business days from verification',
    sourceLabel: 'National Government Services Portal - Civil Registration System',
    sourceUrl: 'https://crsorgi.gov.in',
    contentLanguage: 'English',
    lastReviewedDate: '2026-07-10',
    isSynthetic: true,
    tags: ['birth', 'certificate', 'child', 'registration', 'hospital', 'identity', 'crs', 'జనన', 'ధృవీకరణ', 'పత్రం', 'పుట్టిన', 'బిడ్డ', 'janana', 'patram', 'jananam', 'బర్త్', 'సర్టిఫికేట్', 'సర్టిఫికెట్', 'బర్త్ సర్టిఫికేట్', 'పుట్టిన తేదీ', 'birth certificate', 'janana patram', 'जन्म', 'जन्म प्रमाण पत्र', 'जन्म प्रमाण', 'प्रमाण पत्र']
  },
  {
    id: 'death-certificate-issuance',
    title: {
      en: 'Issuance of Death Certificate',
      hi: 'मृत्यु प्रमाण पत्र जारी करना',
      te: 'మరణ ధృవీకరణ పత్రం జారీ'
    },
    category: 'certificates',
    department: 'Civil Registration Division / Health Department',
    description: {
      en: 'Vital records document certifying the demise of a person, essential for inheritance, insurance claims, and legal estate settlements.',
      hi: 'किसी व्यक्ति के निधन को प्रमाणित करने वाला महत्वपूर्ण रिकॉर्ड दस्तावेज, जो उत्तराधिकार, बीमा दावों और कानूनी संपत्ति निपटान के लिए आवश्यक है।',
      te: 'వ్యక్తి మరణాన్ని ధృవీకరించే కీలక రికార్డు పత్రం, వారసత్వపు హక్కులు, బీమా క్లెయిమ్‌లు మరియు చట్టపరమైన ఆస్తి పరిష్కారాలకు అవసరం.'
    },
    steps: {
      en: [
        'Report the death to the registrar office within 21 days with medical certificate of cause of death.',
        'Submit crematorium / burial receipt acknowledging final rites.',
        'Provide deceased Aadhaar card and applicant relation proof.',
        'Obtain verified digital death certificate.'
      ],
      hi: [
        'मृत्यु के कारण के चिकित्सा प्रमाण पत्र के साथ 21 दिनों के भीतर रजिस्ट्रार कार्यालय में मृत्यु की रिपोर्ट करें।',
        'अंतिम संस्कार की रसीद जमा करें।',
        'मृतक का आधार कार्ड और आवेदक का संबंध प्रमाण प्रदान करें।',
        'सत्यापित डिजिटल मृत्यु प्रमाण पत्र प्राप्त करें।'
      ],
      te: [
        'మరణ కారణానికి సంబంధించిన మెడికల్ సర్టిఫికెట్‌తో 21 రోజుల్లోగా రిజిస్ట్రార్ కార్యాలయానికి నివేదించండి.',
        'శ్మశాన వాటిక / దహన సంస్కారాల రసీదు సమర్పించండి.',
        'మరణించిన వ్యక్తి ఆధార్ కార్డు మరియు దరఖాస్తుదారుడి సంబంధిత రుజువును అందించండి.',
        'ధృవీకరించబడిన డిజిటల్ మరణ ధృవీకరణ పత్రాన్ని పొందండి.'
      ]
    },
    eligibility: 'Immediate family member or legal representative of the deceased.',
    documentsRequired: [
      'Form 4/4A Medical Certification of Cause of Death',
      'Cremation or Burial Ground Slip',
      'Identity Proof of Applicant',
      'Aadhaar / ID Card of the Deceased'
    ],
    fees: 'Free within 21 days; ₹50 statutory delay fee thereafter.',
    processingTime: '5 to 10 working days',
    sourceLabel: 'Civil Registration System Portal',
    sourceUrl: 'https://crsorgi.gov.in',
    contentLanguage: 'English',
    lastReviewedDate: '2026-06-18',
    isSynthetic: true,
    tags: ['death', 'demise', 'insurance', 'inheritance', 'certificate', 'మరణ', 'ధృవీకరణ', 'పత్రం', 'చనిపోయిన', 'marana', 'patram', 'డెత్', 'సర్టిఫికేట్', 'సర్టిఫికెట్', 'డెత్ సర్టిఫికేట్', 'మరణ ధృవీకరణ', 'death certificate', 'मृत्यु', 'मृत्यु प्रमाण पत्र', 'मौत']
  },
  {
    id: 'ration-card-food-security',
    title: {
      en: 'New Ration Card / NFSA Food Security Card',
      hi: 'नया राशन कार्ड / खाद्य सुरक्षा कार्ड',
      te: 'కొత్త రేషన్ కార్డు / ఆహార భద్రతా కార్డు'
    },
    category: 'welfare',
    department: 'Department of Consumer Affairs, Food & Public Distribution',
    description: {
      en: 'Provides subsidized food grains and essential commodities to eligible households under the National Food Security Act (NFSA).',
      hi: 'राष्ट्रीय खाद्य सुरक्षा अधिनियम (NFSA) के तहत पात्र परिवारों को रियायती खाद्यान्न और आवश्यक वस्तुएं प्रदान करता है।',
      te: 'జాతీయ ఆహార భద్రతా చట్టం (NFSA) కింద అర్హులైన కుటుంబాలకు సబ్సిడీ ఆహార ధాన్యాలు మరియు నిత్యావసర సరుకులను అందిస్తుంది.'
    },
    steps: {
      en: [
        'Verify family income limit based on rural or urban municipal benchmarks.',
        'Head of household (preferably senior adult female) submits application.',
        'Link Aadhaar for all residing family members.',
        'Undergo field inspection by local Food & Civil Supplies Inspector.',
        'Receive e-Ration Card number upon roster inclusion.'
      ],
      hi: [
        'ग्रामीण या शहरी नगर निगम के मानकों के आधार पर पारिवारिक आय सीमा की पुष्टि करें।',
        'परिवार का मुखिया (अधिमानतः वरिष्ठ वयस्क महिला) आवेदन जमा करता है।',
        'सभी निवासी परिवार के सदस्यों के लिए आधार लिंक करें।',
        'स्थानीय खाद्य और नागरिक आपूर्ति निरीक्षक द्वारा क्षेत्रीय निरीक्षण कराएं।',
        'रोस्टर में शामिल होने पर ई-राशन कार्ड नंबर प्राप्त करें।'
      ],
      te: [
        'గ్రామీణ లేదా పట్టణ నిబంధనల ప్రకారం కుటుంబ ఆదాయ పరిమితిని ధృవీకరించుకోండి.',
        'కుటుంబ పెద్ద (ముఖ్యంగా పెద్ద వయసు మహిళ) దరఖాస్తును సమర్పించాలి.',
        'నివసిస్తున్న కుటుంబ సభ్యులందరికీ ఆధార్‌ను అనుసంధానించండి.',
        'స్థానిక ఆహార మరియు పౌర సరఫరాల అధికారి క్షేత్ర స్థాయి తనిఖీని పూర్తి చేయండి.',
        'రోస్టర్‌లో చేర్చిన తర్వాత ఇ-రేషన్ కార్డు నంబర్‌ను పొందండి.'
      ]
    },
    eligibility: 'Families belonging to Antyodaya Anna Yojana (AAY) or Priority Household (PHH) based on state income criteria.',
    documentsRequired: [
      'Aadhaar cards of all family members',
      'Income Certificate from competent Revenue Authority',
      'Electricity Bill / Rent Agreement as Residence Proof',
      'Surrender / Deletion Certificate if moving from another area'
    ],
    fees: 'Nominal service charge ₹30 to ₹50 at citizen service kiosks; no statutory fee.',
    processingTime: '30 to 45 days after physical field verification',
    sourceLabel: 'Department of Food and Public Distribution Portal',
    sourceUrl: 'https://dfpd.gov.in',
    contentLanguage: 'English',
    lastReviewedDate: '2026-05-12',
    isSynthetic: true,
    tags: ['ration', 'food', 'nfsa', 'subsidy', 'grain', 'bpl', 'poverty', 'card', 'రేషన్', 'కార్డు', 'బియ్యం', 'ఆహార', 'భద్రత', 'biyyam', 'ration card', 'కొత్త రేషన్', 'బియ్యం కార్డు', 'రేషన్ షాప్', 'రేషన్ కార్డు కావాలి', 'తెల్ల రేషన్ కార్డు', 'biyyam card']
  },
  {
    id: 'property-tax-self-assessment',
    title: {
      en: 'Property Tax Payment & Mutation',
      hi: 'संपत्ति कर भुगतान और नामांतरण',
      te: 'ఆస్తి పన్ను చెల్లింపు మరియు మ్యుటేషన్'
    },
    category: 'municipal',
    department: 'Urban Local Body Revenue & Tax Department',
    description: {
      en: 'Online annual property tax assessment, payment receipts, and title mutation for residential and commercial building holdings.',
      hi: 'आवासीय और वाणिज्यिक भवनों के लिए वार्षिक संपत्ति कर मूल्यांकन, भुगतान रसीद और शीर्षक नामांतरण।',
      te: 'నివాస మరియు వాణిజ్య భవనాల కోసం ఆన్‌లైన్ వార్షిక ఆస్తి పన్ను అంచనా, చెల్లింపు రసీదులు మరియు యాజమాన్య బదిలీ (మ్యుటేషన్).'
    },
    steps: {
      en: [
        'Enter Property Assessment Number (PTIN) or Owner details.',
        'Verify plinth area, building zone, and occupancy type (Self/Tenant).',
        'View computed tax arrears, current demand, and early-bird rebate.',
        'Complete payment through official net banking/UPI gateway and download formal receipt.'
      ],
      hi: [
        'संपत्ति मूल्यांकन संख्या (PTIN) या स्वामी का विवरण दर्ज करें।',
        'प्लिंथ क्षेत्र, भवन क्षेत्र और अधिभोग प्रकार (स्वयं/किरायेदार) सत्यापित करें।',
        'गणना किए गए कर बकाया, वर्तमान मांग और अग्रिम छूट देखें।',
        'आधिकारिक नेट बैंकिंग/UPI गेटवे के माध्यम से भुगतान पूरा करें और औपचारिक रसीद डाउनलोड करें।'
      ],
      te: [
        'ఆస్తి అంచనా సంఖ్య (PTIN) లేదా యజమాని వివరాలను నమోదు చేయండి.',
        'భవనం విస్తీర్ణం, జోన్ మరియు నివాస రకాన్ని (సొంతం/అద్దె) సరిచూసుకోండి.',
        'బకాయిలు, ప్రస్తుత పన్ను డిమాండ్ మరియు ముందస్తు చెల్లింపు తగ్గింపును తనిఖీ చేయండి.',
        'అధికారిక నెట్ బ్యాంకింగ్/UPI ద్వారా చెల్లింపు పూర్తి చేసి రసీదును డౌన్‌లోడ్ చేసుకోండి.'
      ]
    },
    eligibility: 'Property owners or authorized tenants of real estate within municipal limits.',
    documentsRequired: [
      'Registered Sale Deed / Title Document',
      'Previous Year Property Tax Receipt',
      'Approved Building Sanction Plan (if newly constructed)'
    ],
    fees: 'Calculated as percentage of Unit Area Value (UAV) based on municipal schedule.',
    processingTime: 'Instant receipt for payments; 15 days for title mutation',
    sourceLabel: 'Municipal Corporation e-Governance Portal',
    sourceUrl: 'https://smartnet.niua.org',
    contentLanguage: 'English',
    lastReviewedDate: '2026-08-01',
    isSynthetic: true,
    tags: ['property', 'tax', 'municipal', 'ptin', 'house', 'mutation', 'ఆస్తి', 'పన్ను', 'ఇంటి', 'పన్ను', 'illu', 'tax', 'panu', 'ఇంటి పన్ను', 'ఆస్తి పన్ను', 'ప్రాపర్టీ టాక్స్', 'పన్ను చెల్లింపు', 'house tax', 'property tax']
  },
  {
    id: 'trade-license-registration',
    title: {
      en: 'Municipal Trade License Issuance',
      hi: 'नगर निगम व्यापार लाइसेंस जारी करना',
      te: 'మునిసిపల్ వ్యాపార లైసెన్స్ జారీ'
    },
    category: 'municipal',
    department: 'Health & Municipal Enforcement Section',
    description: {
      en: 'Statutory authorization required to operate commercial retail, restaurant, workshop, or industrial establishments safely.',
      hi: 'वाणिज्यिक खुदरा, रेस्तरां, कार्यशाला या औद्योगिक प्रतिष्ठानों को सुरक्षित रूप से संचालित करने के लिए आवश्यक वैधानिक प्राधिकरण।',
      te: 'వాణిజ్య దుకాణాలు, రెస్టారెంట్లు, వర్క్‌షాప్‌లు లేదా పరిశ్రమలను సురక్షితంగా నిర్వహించడానికి అవసరమైన అధికారిక లైసెన్స్.'
    },
    steps: {
      en: [
        'Select trade classification (food, merchandise, fabrication, hospitality).',
        'Submit business premise lease deed and property tax clearance.',
        'Upload fire NOC and health officer inspection clearance if applicable.',
        'Pay annual trade fee based on enterprise horsepower and floor space.'
      ],
      hi: [
        'व्यापार वर्गीकरण (खाद्य, व्यापारिक वस्तुएं, निर्माण, आतिथ्य) का चयन करें।',
        'व्यावसायिक परिसर का लीज डीड और संपत्ति कर का क्लीयरेंस जमा करें।',
        'यदि लागू हो तो फायर एनओसी और स्वास्थ्य अधिकारी का निरीक्षण क्लीयरेंस अपलोड करें।',
        'उद्यम के अश्वशक्ति और फर्श क्षेत्र के आधार पर वार्षिक व्यापार शुल्क का भुगतान करें।'
      ],
      te: [
        'వ్యాపార విభాగాన్ని (ఆహారం, సరుకులు, తయారీ, సేవా రంగం) ఎంచుకోండి.',
        'దుకాణం లీజు ఒప్పందం మరియు ఆస్తి పన్ను క్లియరెన్స్ సమర్పించండి.',
        'వర్తిస్తే ఫైర్ NOC మరియు హెల్త్ ఆఫీసర్ తనిఖీ పత్రాన్ని అప్‌లోడ్ చేయండి.',
        'విస్తీర్ణం మరియు యంత్రాల సామర్థ్యం ఆధారంగా వార్షిక వ్యాపార రుసుము చెల్లించండి.'
      ]
    },
    eligibility: 'Proprietors or legal representatives opening a business in commercial zones.',
    documentsRequired: [
      'Premise Ownership or Registered Rental Agreement',
      'PAN / GST Certificate of Enterprise',
      'Site Blueprint / Layout Plan',
      'Fire Safety NOC (for eateries and flammable goods)'
    ],
    fees: 'Varies from ₹1,000 to ₹15,000 annually according to category and floor size.',
    processingTime: '15 to 21 working days after site inspection',
    sourceLabel: 'National Portal of India - Business Services',
    sourceUrl: 'https://services.india.gov.in',
    contentLanguage: 'English',
    lastReviewedDate: '2026-07-22',
    isSynthetic: true,
    tags: ['business', 'trade', 'license', 'shop', 'commercial', 'establishment', 'వ్యాపార', 'లైసెన్స్', 'షాపు', 'దుకాణం', 'vyapara', 'ట్రేడ్', 'ట్రేడ్ లైసెన్స్', 'వ్యాపార లైసెన్స్', 'trade license']
  },
  {
    id: 'drinking-water-sanitation-connection',
    title: {
      en: 'Drinking Water & Sewerage Connection',
      hi: 'पेयजल और सीवरेज कनेक्शन',
      te: 'తాగునీరు మరియు మురుగునీటి కనెక్షన్'
    },
    category: 'municipal',
    department: 'Water Supply and Sewerage Board',
    description: {
      en: 'Application for new piped domestic or commercial tap water connections and underground drainage junctions.',
      hi: 'नए पाइप वाले घरेलू या वाणिज्यिक नल के पानी के कनेक्शन और भूमिगत जल निकासी जंक्शनों के लिए आवेदन।',
      te: 'కొత్త గృహ లేదా వాణిజ్య కుళాయి కనెక్షన్ మరియు భూగర్భ మురుగునీటి పారుదల పైప్‌లైన్ కోసం దరఖాస్తు.'
    },
    steps: {
      en: [
        'Submit online pipeline feasibility application with property tax receipt.',
        'Water board engineer conducts on-site line pressure and distance check.',
        'Estimate road restoration charges and meter connection fees.',
        'Water meter installed and connection commission certificate provided.'
      ],
      hi: [
        'संपत्ति कर रसीद के साथ ऑनलाइन पाइपलाइन व्यवहार्यता आवेदन जमा करें।',
        'जल बोर्ड इंजीनियर साइट पर लाइन प्रेशर और दूरी की जांच करता है।',
        'सड़क बहाली शुल्क और मीटर कनेक्शन शुल्क का अनुमान लगाएं।',
        'पानी का मीटर स्थापित किया गया और कनेक्शन चालू करने का प्रमाण पत्र प्रदान किया गया।'
      ],
      te: [
        'ఆస్తి పన్ను రసీదుతో ఆన్‌లైన్ పైప్‌లైన్ సాధ్యాసాధ్యాల దరఖాస్తును సమర్పించండి.',
        'వాటర్ బోర్డు ఇంజనీర్ క్షేత్ర స్థాయిలో పైప్‌లైన్ దూరం మరియు ప్రెషర్ తనిఖీ చేస్తారు.',
        'రహదారి మరమ్మతు మరియు మీటర్ కనెక్షన్ ఖర్చుల అంచనాను చెల్లించండి.',
        'వాటర్ మీటర్ అమర్చబడి కనెక్షన్ ప్రారంభ పత్రం అందించబడుతుంది.'
      ]
    },
    eligibility: 'Owner of habitable premise with access to municipal water network.',
    documentsRequired: [
      'Proof of Ownership (Registered Title or Sale Deed)',
      'Latest Municipal Property Tax Receipt',
      'Building Sanction Plan and Plumber Estimate'
    ],
    fees: 'Standard connection deposit + actual road cutting restoration charges.',
    processingTime: '21 to 30 working days',
    sourceLabel: 'Jal Jeevan Mission / Urban Water Board Guidelines',
    sourceUrl: 'https://jaljeevanmission.gov.in',
    contentLanguage: 'English',
    lastReviewedDate: '2026-04-19',
    isSynthetic: true,
    tags: ['water', 'tap', 'sewerage', 'pipeline', 'jal', 'meter', 'మంచినీరు', 'మంచినీటి', 'నీటి', 'తాగునీరు', 'నీళ్లు', 'నీరు', 'కనెక్షన్', 'పైపు', 'బోరు', 'neellu', 'water', 'కుళాయి', 'మురుగునీరు', 'డ్రైనేజీ', 'నీరు రావడం లేదు', 'తాగునీటి సమస్య', 'మంచినీటి సమస్య', 'water problem', 'pipeline leak']
  },
  {
    id: 'streetlight-and-civic-repairs',
    title: {
      en: 'Streetlight & Civic Infrastructure Grievance',
      hi: 'स्ट्रीटलाइट और नागरिक अवसंरचना शिकायत',
      te: 'వీధి దీపాలు మరియు పౌర మౌలిక సదుపాయాల ఫిర్యాదు'
    },
    category: 'municipal',
    department: 'Municipal Electrical & Public Works Engineering Cell',
    description: {
      en: 'Citizen incident reporting for non-functional streetlights, dangerous loose cables, open manholes, and damaged public pavements.',
      hi: 'काम न करने वाली स्ट्रीटलाइट्स, खतरनाक खुले तारों, खुले मैनहोल और क्षतिग्रस्त सार्वजनिक फुटपाथों के लिए नागरिक रिपोर्टिंग।',
      te: 'పనిచేయని వీధి దీపాలు, వేలాడే విద్యుత్ తీగలు, మూతలేని మ్యాన్‌హోల్స్ మరియు దెబ్బతిన్న రోడ్లపై పౌరుల ఫిర్యాదు పరిష్కారం.'
    },
    steps: {
      en: [
        'Identify pole number or nearest landmark with GPS coordinates.',
        'Select fault type (bulb non-functional, timer malfunction, wire short).',
        'Submit photo of the location and ward number.',
        'Field lineman dispatched for corrective action within civic SLA.'
      ],
      hi: [
        'जीपीएस निर्देशांक के साथ पोल नंबर या निकटतम लैंडमार्क की पहचान करें।',
        'दोष का प्रकार चुनें (बल्ब खराब, टाइमर खराबी, तार में शॉर्ट)।',
        'स्थान और वार्ड नंबर की तस्वीर जमा करें।',
        'नागरिक समयसीमा के भीतर सुधारात्मक कार्रवाई के लिए लाइनमैन को भेजा जाता है।'
      ],
      te: [
        'పోల్ నంబర్ లేదా ల్యాండ్‌మార్క్‌ను నమోదు చేయండి.',
        'సమస్య రకాన్ని ఎంచుకోండి (బల్బు వెలగడం లేదు, టైమర్ లోపం, తీగ తెగిపడింది).',
        'ప్రాంతం ఫోటో మరియు వార్డు సంఖ్యను సమర్పించండి.',
        'నిర్దేశిత సమయపరిమితిలో సమస్య పరిష్కారానికి సిబ్బంది వస్తారు.'
      ]
    },
    eligibility: 'Any resident or pedestrian witnessing civic hazard.',
    documentsRequired: null, // Not confirmed in available source
    fees: 'Free of charge (Citizen Grievance Redressal)',
    processingTime: '24 to 72 hours under municipal citizen charter',
    sourceLabel: 'National Urban Civic Redressal Guidelines',
    sourceUrl: 'https://mohua.gov.in',
    contentLanguage: 'English',
    lastReviewedDate: '2026-08-10',
    isSynthetic: true,
    tags: ['streetlight', 'pothole', 'manhole', 'civic', 'repair', 'electricity', 'ward', 'వీధి', 'దీపాలు', 'దీపం', 'లైటు', 'లైట్లు', 'మరమ్మతులు', 'కరెంట్', 'veedhi', 'deepalu', 'street light', 'కరెంట్ పోయింది', 'కరెంట్ బిల్లు', 'విద్యుత్ సమస్య', 'స్ట్రీట్ లైట్', 'విద్యుత్ సరఫరా', 'current bill', 'power problem']
  },
  {
    id: 'senior-citizen-pension-scheme',
    title: {
      en: 'National Social Assistance Old Age Pension',
      hi: 'राष्ट्रीय सामाजिक सहायता वृद्धावस्था पेंशन',
      te: 'వృద్ధాప్య పింఛను పథకం'
    },
    category: 'welfare',
    department: 'Department of Social Justice and Empowerment',
    description: {
      en: 'Monthly financial assistance transferred via Direct Benefit Transfer (DBT) to elderly citizens from economically vulnerable backgrounds.',
      hi: 'आर्थिक रूप से कमजोर पृष्ठभूमि के बुजुर्ग नागरिकों को प्रत्यक्ष लाभ अंतरण (DBT) के माध्यम से हस्तांतरित मासिक वित्तीय सहायता।',
      te: 'ఆర్థికంగా వెనుకబడిన వృద్ధ పౌరులకు ప్రతి నెలా నేరుగా బ్యాంకు ఖాతాలో (DBT) జమ చేయబడే ఆర్థిక సహాయం.'
    },
    steps: {
      en: [
        'Ensure applicant age is 60 years or above via birth proof or Aadhaar.',
        'Verify household income status falls below state poverty benchmark.',
        'Provide single-operated savings bank account linked to Aadhaar.',
        'Submit application at ward office or online social welfare portal.',
        'Monthly pension released to verified bank account after sanction.'
      ],
      hi: [
        'जन्म प्रमाण या आधार के माध्यम से सुनिश्चित करें कि आवेदक की आयु 60 वर्ष या उससे अधिक है।',
        'सत्यापित करें कि पारिवारिक आय गरीबी रेखा से नीचे है।',
        'आधार से जुड़ा एकल बचत बैंक खाता प्रदान करें।',
        'वार्ड कार्यालय या ऑनलाइन समाज कल्याण पोर्टल पर आवेदन जमा करें।',
        'मंजूरी के बाद सत्यापित बैंक खाते में मासिक पेंशन जारी की जाती है।'
      ],
      te: [
        'ఆధార్ లేదా జనన ధృవీకరణ ద్వారా వయస్సు 60 సంవత్సరాలు నిండినట్లు నిర్ధారించండి.',
        'కుటుంబ ఆదాయం దారిద్య్రరేఖకు దిగువన ఉన్నట్లు ధృవీకరించుకోండి.',
        'ఆధార్‌తో లింక్ చేయబడిన సింగిల్ సేవింగ్స్ బ్యాంక్ ఖాతాను అందించండి.',
        'వార్డు సచివాలయంలో లేదా ఆన్‌లైన్ పోర్టల్‌లో దరఖాస్తును సమర్పించండి.',
        'ఆమోదం తర్వాత ప్రతి నెలా బ్యాంక్ ఖాతాలో పింఛను మొత్తం జమ అవుతుంది.'
      ]
    },
    eligibility: 'Aged 60 years or above; living Below Poverty Line (BPL) or lacking regular familial sustenance.',
    documentsRequired: [
      'Age Proof (Aadhaar Card, Voter ID, or Matriculation Certificate)',
      'BPL Ration Card or Verified Income Certificate',
      'Bank Account Passbook Copy with IFSC Code',
      'Passport size photograph'
    ],
    fees: 'Free of charge',
    processingTime: '30 to 45 days after revenue sanction',
    sourceLabel: 'National Social Assistance Programme (NSAP)',
    sourceUrl: 'https://nsap.nic.in',
    contentLanguage: 'English',
    lastReviewedDate: '2026-06-30',
    isSynthetic: true,
    tags: ['pension', 'senior', 'elderly', 'welfare', 'nsap', 'dbt', 'bpl', 'వృద్ధాప్య', 'పెన్షన్', 'వృద్ధుల', 'పెన్షన్లు', 'pension', 'vrudhapya', 'పింఛను', 'వృద్ధాప్య పింఛను', 'పెన్షన్ రాలేదు', 'పెన్షన్ ఎప్పుడు వస్తుంది', 'వృద్ధుల పింఛను', 'old age pension']
  },
  {
    id: 'disability-pension-and-udid-card',
    title: {
      en: 'Unique Disability ID (UDID) & Pension',
      hi: 'विशिष्ट दिव्यांगता पहचान पत्र (UDID) और पेंशन',
      te: 'దివ్యాంగుల విశిష్ట గుర్తింపు కార్డు (UDID) మరియు పింఛను'
    },
    category: 'welfare',
    department: 'Department of Empowerment of Persons with Disabilities',
    description: {
      en: 'Single integrated card certifying disability percentage and conferring social security pensions, assistive devices, and transport subsidies.',
      hi: 'दिव्यांगता प्रतिशत को प्रमाणित करने और सामाजिक सुरक्षा पेंशन, सहायक उपकरण और परिवहन सब्सिडी प्रदान करने वाला एकल एकीकृत कार्ड।',
      te: 'వైకల్య శాతాన్ని ధృవీకరించి, సామాజిక భద్రతా పింఛన్లు, సహాయక పరికరాలు మరియు ఉచిత ప్రయాణ రాయితీలను అందించే సమగ్ర కార్డు.'
    },
    steps: {
      en: [
        'Register online on Swavlamban UDID portal with demographic data.',
        'Book medical assessment slot at district civil hospital.',
        'Undergo evaluation by medical board to determine benchmark disability (minimum 40%).',
        'Receive digital UDID card and linkage to state monthly disability stipend.'
      ],
      hi: [
        'जनसांख्यिकीय डेटा के साथ स्वावलंबन यूडीआईडी ​​पोर्टल पर ऑनलाइन पंजीकरण करें।',
        'जिला नागरिक अस्पताल में चिकित्सा मूल्यांकन स्लॉट बुक करें।',
        'मानक दिव्यांगता (न्यूनतम 40%) निर्धारित करने के लिए मेडिकल बोर्ड द्वारा मूल्यांकन कराएं।',
        'डिजिटल यूडीआईडी ​​कार्ड और राज्य मासिक दिव्यांगता वजीफे से जुड़ाव प्राप्त करें।'
      ],
      te: [
        'స్వావలంబన్ పోర్టల్‌లో వ్యక్తిగత వివరాలతో ఆన్‌లైన్‌లో నమోదు చేసుకోండి.',
        'జిల్లా ప్రభుత్వ ఆసుపత్రిలో వైద్య పరీక్ష స్లాట్ బుక్ చేసుకోండి.',
        'మెడికల్ బోర్డు ద్వారా పరీక్ష చేయించుకుని 40% లేదా అంతకంటే ఎక్కువ వైకల్య ధృవీకరణ పొందండి.',
        'డిజిటల్ UDID కార్డు మరియు నెలవారీ పింఛను అనుసంధానాన్ని పొందండి.'
      ]
    },
    eligibility: 'Citizen with 40% or higher benchmark disability as evaluated by competent government medical board.',
    documentsRequired: [
      'Aadhaar card of the applicant',
      'Previous Medical Records / Diagnosis Reports',
      'Recent Full-length Photograph showing disability',
      'Bank Account Passbook for pension transfer'
    ],
    fees: 'Free of charge',
    processingTime: '30 days following medical board evaluation',
    sourceLabel: 'Unique Disability ID (UDID) Portal',
    sourceUrl: 'https://swavlambancard.gov.in',
    contentLanguage: 'English',
    lastReviewedDate: '2026-07-05',
    isSynthetic: true,
    tags: ['disability', 'udid', 'pension', 'swavlamban', 'divyangjan', 'medical', 'దివ్యాంగుల', 'పెన్షన్', 'వికలాంగుల', 'వికలాంగుడు', 'udid', 'vikalam', 'దివ్యాంగుల పింఛను', 'వికలాంగుల పెన్షన్', 'సదరం', 'వికలాంగుల సర్టిఫికేట్', 'disability pension']
  },
  {
    id: 'caste-certificate-issuance',
    title: {
      en: 'Issuance of Community / Caste Certificate',
      hi: 'जाति / समुदाय प्रमाण पत्र जारी करना',
      te: 'కులం / సామాజిక వర్గ ధృవీకరణ పత్రం జారీ'
    },
    category: 'revenue',
    department: 'Revenue & District Administration Department',
    description: {
      en: 'Statutory certificate proving membership of Scheduled Caste (SC), Scheduled Tribe (ST), or Other Backward Classes (OBC) for education reservations and constitutional protections.',
      hi: 'शिक्षा में आरक्षण और संवैधानिक संरक्षण के लिए अनुसूचित जाति (SC), अनुसूचित जनजाति (ST), या अन्य पिछड़ा वर्ग (OBC) की सदस्यता साबित करने वाला वैधानिक प्रमाण पत्र।',
      te: 'విద్యా ప్రవేశాలలో రిజర్వేషన్లు మరియు రాజ్యాంగ రక్షణల కోసం ఎస్సీ, ఎస్టీ లేదా బీసీ వర్గాలకు చెందిన వారిగా ధృవీకరించే అధికారిక పత్రం.'
    },
    steps: {
      en: [
        'Submit proof of lineage (father/paternal relative caste certificate).',
        'Provide school transfer certificate (TC) or birth entry mentioning caste.',
        'Revenue Inspector conducts village/locality genealogy verification.',
        'Tahsildar / Sub-Divisional Magistrate issues digitally certified certificate.'
      ],
      hi: [
        'वंश का प्रमाण जमा करें (पिता/पैतृक रिश्तेदार का जाति प्रमाण पत्र)।',
        'स्कूल स्थानांतरण प्रमाण पत्र (टीसी) या जाति का उल्लेख करने वाला जन्म प्रमाण प्रदान करें।',
        'राजस्व निरीक्षक गांव/इलाके में वंशावली सत्यापन करता है।',
        'तहसीलदार/उप-मंडल मजिस्ट्रेट डिजिटल रूप से प्रमाणित प्रमाण पत्र जारी करते हैं।'
      ],
      te: [
        'వంశపారంపర్య రుజువు సమర్పించండి (తండ్రి లేదా రక్తసంబంధీకుల కుల ధృవీకరణ పత్రం).',
        'పాఠశాల రికార్డు (TC) లేదా కులం నమోదు ఉన్న జనన ధృవీకరణ పత్రం అందించండి.',
        'రెవెన్యూ ఇన్‌స్పెక్టర్ క్షేత్రస్థాయి విచారణ పూర్తి చేస్తారు.',
        'తహశీల్దార్ లేదా సబ్ కలెక్టర్ ద్వారా డిజిటల్ ధృవీకరణ పత్రం జారీ చేయబడుతుంది.'
      ]
    },
    eligibility: 'Citizen belonging to notified SC/ST/OBC category with ancestral residence proof in the state.',
    documentsRequired: [
      'Paternal Relative Caste Certificate or Pre-1950/1978 Land Records',
      'School Leaving Certificate mentioning caste',
      'Applicant Aadhaar Card and Residence Proof',
      'Affidavit sworn before Notary Public'
    ],
    fees: 'Statutory service fee ₹30 to ₹40 at citizen service centers.',
    processingTime: '15 to 30 working days',
    sourceLabel: 'National Government Services Portal - Revenue Records',
    sourceUrl: 'https://services.india.gov.in',
    contentLanguage: 'English',
    lastReviewedDate: '2026-05-28',
    isSynthetic: true,
    tags: ['caste', 'community', 'sc', 'st', 'obc', 'reservation', 'revenue', 'tahsildar', 'కుల', 'ధృవీకరణ', 'పత్రం', 'కులం', 'kulam', 'caste', 'కాస్ట్', 'సర్టిఫికేట్', 'కాస్ట్ సర్టిఫికేట్', 'కుల ధృవీకరణ', 'కుల సర్టిఫికేట్', 'caste certificate', 'जाति', 'जाति प्रमाण पत्र', 'जाति प्रमाण']
  },
  {
    id: 'income-certificate-issuance',
    title: {
      en: 'Issuance of Annual Family Income Certificate',
      hi: 'वार्षिक पारिवारिक आय प्रमाण पत्र जारी करना',
      te: 'వార్షిక కుటుంబ ఆదాయ ధృవీకరణ పత్రం జారీ'
    },
    category: 'revenue',
    department: 'Revenue & Land Administration Department',
    description: {
      en: 'Certifies total annual income of all family members from all sources, essential for scholarships, fee reimbursements, and welfare quotas.',
      hi: 'सभी स्रोतों से परिवार के सभी सदस्यों की कुल वार्षिक आय को प्रमाणित करता है, जो छात्रवृत्ति, शुल्क प्रतिपूर्ति और कल्याणकारी कोटा के लिए आवश्यक है।',
      te: 'కుటుంబ సభ్యులందరి వార్షిక మొత్తం ఆదాయాన్ని ధృవీకరించే పత్రం; విద్యార్థి స్కాలర్‌షిప్‌లు మరియు ప్రభుత్వ సంక్షేమ పథకాలకు అత్యవసరం.'
    },
    steps: {
      en: [
        'Compile salary slips, Form 16, or agriculture land passbook details.',
        'Declare total household earnings and non-agricultural revenue.',
        'Local revenue field enquiry verification.',
        'Download verified Income Certificate with 1-year statutory validity.'
      ],
      hi: [
        'वेतन पर्ची, फॉर्म 16, या कृषि भूमि पासबुक विवरण संकलित करें।',
        'कुल पारिवारिक आय और गैर-कृषि राजस्व की घोषणा करें।',
        'स्थानीय राजस्व क्षेत्रीय पूछताछ सत्यापन।',
        '1 वर्ष की वैधानिक वैधता के साथ सत्यापित आय प्रमाण पत्र डाउनलोड करें।'
      ],
      te: [
        'జీతం స్లిప్పులు, ఫారం 16 లేదా వ్యవసాయ భూమి పాస్‌బుక్ వివరాలను సమకూర్చుకోండి.',
        'కుటుంబ మొత్తం వార్షిక ఆదాయాన్ని స్వీయ ప్రకటన చేయండి.',
        'గ్రామ రెవెన్యూ అధికారి విచారణను పూర్తి చేయండి.',
        'ఒక సంవత్సరం చెల్లుబాటుతో కూడిన డిజిటల్ ఆదాయ ధృవీకరణ పత్రాన్ని డౌన్‌లోడ్ చేసుకోండి.'
      ]
    },
    eligibility: 'Resident household seeking proof of income for statutory concessions.',
    documentsRequired: [
      'Salary Certificate / IT Returns / Patta Passbook (Agriculture)',
      'Ration Card or Family Member List',
      'Affidavit of Income Declaration',
      'Electricity Bill / Residential Address Proof'
    ],
    fees: '₹35 processing fee at citizen service centers.',
    processingTime: '7 to 14 working days',
    sourceLabel: 'Revenue Administration Citizen Services',
    sourceUrl: 'https://services.india.gov.in',
    contentLanguage: 'English',
    lastReviewedDate: '2026-07-15',
    isSynthetic: true,
    tags: ['income', 'scholarship', 'revenue', 'tahsildar', 'financial', 'certificate', 'ఆదాయ', 'ధృవీకరణ', 'పత్రం', 'ఆదాయం', 'aadhayam', 'ఇన్‌కమ్', 'ఇన్కమ్', 'సర్టిఫికేట్', 'ఇన్‌కమ్ సర్టిఫికేట్', 'ఆదాయ ధృవీకరణ', 'ఆదాయ సర్టిఫికేట్', 'income certificate', 'आय', 'आय प्रमाण पत्र', 'आय प्रमाण', 'पारिवारिक आय']
  },
  {
    id: 'driving-license-learner-slot-booking',
    title: {
      en: 'Learner Driving License (LLR) & Slot Booking',
      hi: 'लर्नर ड्राइविंग लाइसेंस (LLR) और स्लॉट बुकिंग',
      te: 'లెర్నర్ డ్రైవింగ్ లైసెన్స్ (LLR) & స్లాట్ బుకింగ్'
    },
    category: 'transport',
    department: 'Ministry of Road Transport and Highways (MoRTH) / State RTO',
    description: {
      en: 'Provisional permit allowing citizens to practice driving under supervision; includes online road safety rules tutorial and computer-based test.',
      hi: 'नागरिकों को देखरेख में ड्राइविंग का अभ्यास करने की अनुमति देने वाला अनंतिम परमिट; इसमें ऑनलाइन सड़क सुरक्षा नियम ट्यूटोरियल और कंप्यूटर आधारित परीक्षण शामिल है।',
      te: 'పర్యవేక్షణలో డ్రైవింగ్ నేర్చుకోవడానికి అనుమతించే తాత్కాలిక లైసెన్స్; దీనిలో ఆన్‌లైన్ రోడ్డు భద్రతా పరీక్ష ఉంటుంది.'
    },
    steps: {
      en: [
        'Apply on Sarathi Parivahan portal with age and address proof.',
        'Complete mandatory contactless online Road Safety Tutorial video.',
        'Book online slot for computer-based learner test (traffic signs & rules).',
        'Pass test with minimum qualifying score to immediately print digital LLR valid for 6 months.'
      ],
      hi: [
        'आयु और पते के प्रमाण के साथ सारथी परिवहन पोर्टल पर आवेदन करें।',
        'अनिवार्य ऑनलाइन सड़क सुरक्षा ट्यूटोरियल वीडियो पूरा करें।',
        'कंप्यूटर आधारित शिक्षार्थी परीक्षण (यातायात संकेत और नियम) के लिए ऑनलाइन स्लॉट बुक करें।',
        '6 महीने के लिए वैध डिजिटल एलएलआर तुरंत प्रिंट करने के लिए न्यूनतम अर्हक अंकों के साथ परीक्षा पास करें।'
      ],
      te: [
        'సారథి పరివాహన్ పోర్టల్‌లో వయస్సు మరియు చిరునామా వివరాలతో దరఖాస్తు చేయండి.',
        'రోడ్డు భద్రతా నిబంధనల ఆన్‌లైన్ వీడియోను వీక్షించండి.',
        'కంప్యూటర్ టెస్ట్ కోసం తేదీ మరియు సమయాన్ని బుక్ చేసుకోండి.',
        'పరీక్షలో ఉత్తీర్ణులై 6 నెలల చెల్లుబాటుతో కూడిన డిజిటల్ LLR ను తక్షణమే ప్రింట్ తీసుకోండి.'
      ]
    },
    eligibility: 'Minimum 16 years for gearless two-wheeler up to 50cc; 18 years for standard motor vehicles; 20 years for transport commercial vehicles.',
    documentsRequired: [
      'Age Proof (Aadhaar, Passport, or Birth Certificate)',
      'Current Address Proof',
      'Medical Certificate Form 1A (mandatory if above 40 years of age)',
      'Passport Photograph and Digital Signature'
    ],
    fees: '₹150 application fee + ₹50 online test fee per vehicle class.',
    processingTime: 'Instant upon passing computer-based online test',
    sourceLabel: 'Parivahan Sewa - Ministry of Road Transport and Highways',
    sourceUrl: 'https://parivahan.gov.in',
    contentLanguage: 'English',
    lastReviewedDate: '2026-08-05',
    isSynthetic: true,
    tags: ['driving', 'license', 'llr', 'rto', 'parivahan', 'transport', 'vehicle', 'డ్రైవింగ్', 'లైసెన్స్', 'వాహనం', 'driving license', 'లెర్నర్ లైసెన్స్', 'డ్రైవింగ్ లైసెన్స్ ఎలా తీసుకోవాలి', 'ఆర్టీవో', 'స్లాట్', 'slot booking']
  },
  {
    id: 'vehicle-registration-address-change',
    title: {
      en: 'Change of Address in Vehicle Registration (RC)',
      hi: 'वाहन पंजीकरण (RC) में पता परिवर्तन',
      te: 'వాహన రిజిస్ట్రేషన్ (RC) లో చిరునామా మార్పు'
    },
    category: 'transport',
    department: 'Regional Transport Office (RTO)',
    description: {
      en: 'Update official residential or business address recorded in Vehicle Registration Certificate upon relocating.',
      hi: 'स्थानांतरित होने पर वाहन पंजीकरण प्रमाण पत्र में दर्ज आधिकारिक आवासीय या व्यावसायिक पते को अपडेट करें।',
      te: 'నివాసం మారినప్పుడు వాహన రిజిస్ట్రేషన్ కార్డు (RC) లో అధికారిక చిరునామాను మార్చుకునే సదుపాయం.'
    },
    steps: {
      en: [
        'Log in to Vahan citizen portal using vehicle registration number and chassis digits.',
        'Fill Form 33 for change of address.',
        'Upload verified new address proof and chassis pencil print if requested.',
        'Pay fee online; submit physical RC smartcard if physical endorsement required.'
      ],
      hi: [
        'वाहन पंजीकरण संख्या और चेसिस नंबर का उपयोग करके वाहन नागरिक पोर्टल पर लॉग इन करें।',
        'पते में बदलाव के लिए फॉर्म 33 भरें।',
        'सत्यापित नए पते का प्रमाण अपलोड करें।',
        'ऑनलाइन शुल्क का भुगतान करें; यदि भौतिक पृष्ठांकन की आवश्यकता हो तो आरसी स्मार्टकार्ड जमा करें।'
      ],
      te: [
        'వాహన్ పోర్టల్‌లో వాహన సంఖ్య మరియు ఛాసిస్ వివరాలతో లాగిన్ అవ్వండి.',
        'చిరునామా మార్పు కోసం ఫారం 33 నింపండి.',
        'కొత్త చిరునామా రుజువును అప్‌లోడ్ చేయండి.',
        'ఆన్‌లైన్ ఫీజు చెల్లించి, అవసరమైతే అసలు RC కార్డును RTO లో సమర్పించండి.'
      ]
    },
    eligibility: 'Registered owner of motor vehicle relocated to a new address.',
    documentsRequired: [
      'Original Registration Certificate (RC)',
      'Form 33 application',
      'Proof of New Address (Electricity bill, Aadhaar, Passport)',
      'Valid Motor Insurance Certificate',
      'Valid Pollution Under Control (PUC) Certificate'
    ],
    fees: '₹300 for Two-wheelers; ₹500 for Light Motor Vehicles.',
    processingTime: '15 to 20 working days',
    sourceLabel: 'Vahan Citizen Services - MoRTH',
    sourceUrl: 'https://parivahan.gov.in',
    contentLanguage: 'English',
    lastReviewedDate: '2026-06-11',
    isSynthetic: true,
    tags: ['vehicle', 'rc', 'address', 'vahan', 'transport', 'rto', 'వాహన', 'నమోదు', 'చిరునామా', 'మార్పు', 'vahan']
  },
  {
    id: 'government-school-admission',
    title: {
      en: 'Government School Enrollment & RTE Quota',
      hi: 'सरकारी स्कूल में प्रवेश और आरटीई कोटा',
      te: 'ప్రభుత్వ పాఠశాల ప్రవేశాలు & RTE కోటా'
    },
    category: 'education',
    department: 'Department of School Education & Literacy',
    description: {
      en: 'Admission to state primary/secondary schools and 25% free quota under Right to Education (RTE) Act for disadvantaged sections.',
      hi: 'राज्य के प्राथमिक/माध्यमिक विद्यालयों में प्रवेश और वंचित वर्गों के लिए शिक्षा का अधिकार (RTE) अधिनियम के तहत 25% मुफ्त कोटा।',
      te: 'ప్రభుత్వ ప్రాథమిక/ఉన్నత పాఠశాలల్లో ప్రవేశాలు మరియు విద్యా హక్కు చట్టం (RTE) కింద పేద పిల్లలకు 25% ఉచిత ప్రవేశాలు.'
    },
    steps: {
      en: [
        'Check neighborhood government school zone or RTE portal admission cycle.',
        'Fill student demographic details and parent contact information.',
        'Upload child birth certificate and residence distance verification.',
        'School verification and free uniform, books, and mid-day meal enrollment.'
      ],
      hi: [
        'पड़ोस के सरकारी स्कूल क्षेत्र या आरटीई पोर्टल प्रवेश चक्र की जांच करें।',
        'छात्र जनसांख्यिकीय विवरण और माता-पिता की संपर्क जानकारी भरें।',
        'बच्चे का जन्म प्रमाण पत्र और निवास दूरी सत्यापन अपलोड करें।',
        'स्कूल सत्यापन और मुफ्त वर्दी, किताबें और मध्याह्न भोजन नामांकन।'
      ],
      te: [
        'సమీప ప్రభుత్వ పాఠశాల లేదా RTE పోర్టల్ అడ్మిషన్ తేదీలను తనిఖీ చేయండి.',
        'విద్యార్థి వివరాలు మరియు తల్లిదండ్రుల వివరాలను నమోదు చేయండి.',
        'జనన ధృవీకరణ పత్రం మరియు నివాస ధృవీకరణను అప్‌లోడ్ చేయండి.',
        'పాఠశాల పరిశీలన పూర్తి చేసి ఉచిత యూనిఫాం, పుస్తకాలు మరియు మధ్యాహ్న భోజన పథకంలో చేరండి.'
      ]
    },
    eligibility: 'Children aged 6 to 14 years; RTE 25% quota specifically for EWS/disadvantaged groups.',
    documentsRequired: [
      'Child Birth Certificate or Hospital Register Extract',
      'Parent Residence Proof within School Catchment Area',
      'Income / Caste Certificate (mandatory only for RTE 25% reserved quota)'
    ],
    fees: 'Zero fee in government schools; completely free education with books and uniforms.',
    processingTime: '7 to 10 days during admission intake window',
    sourceLabel: 'Samagra Shiksha & Department of School Education',
    sourceUrl: 'https://dsel.education.gov.in',
    contentLanguage: 'English',
    lastReviewedDate: '2026-05-15',
    isSynthetic: true,
    tags: ['school', 'education', 'admission', 'rte', 'books', 'uniform', 'child', 'పాఠశాల', 'ప్రవేశం', 'బడి', 'విద్య', 'school']
  },
  {
    id: 'ayushman-bharat-health-card',
    title: {
      en: 'Ayushman Bharat PM-JAY Health Coverage Card',
      hi: 'आयुष्मान भारत पीएम-जय स्वास्थ्य कार्ड',
      te: 'ఆయుష్మాన్ భారత్ PM-JAY హెల్త్ కార్డు'
    },
    category: 'health',
    department: 'National Health Authority (NHA) / Ministry of Health & Family Welfare',
    description: {
      en: 'Health protection scheme offering secondary and tertiary hospitalization cover up to ₹5 Lakhs per family per year across empaneled hospitals.',
      hi: 'सूचीबद्ध अस्पतालों में प्रति परिवार प्रति वर्ष ₹5 लाख तक का माध्यमिक और तृतीयक अस्पताल में भर्ती कवर प्रदान करने वाली स्वास्थ्य सुरक्षा योजना।',
      te: 'నెట్‌వర్క్ ఆసుపత్రులలో కుటుంబానికి ఏడాదికి రూ. 5 లక్షల వరకు ఉచిత వైద్య చికిత్సను అందించే జాతీయ ఆరోగ్య రక్షణ పథకం.'
    },
    steps: {
      en: [
        'Check eligibility online using mobile number, Ration Card, or SECC roster.',
        'Visit nearest Ayushman Arogya Mandir, CSC Kiosk, or network hospital helpdesk.',
        'Perform e-KYC using biometric Aadhaar authentication.',
        'Generate Ayushman Bharat PVC Card / digital card containing unique ABHA ID.'
      ],
      hi: [
        'मोबाइल नंबर, राशन कार्ड, या एसईसीसी रोस्टर का उपयोग करके ऑनलाइन पात्रता की जांच करें।',
        'निकटतम आयुष्मान आरोग्य मंदिर, सीएससी कियोस्क, या नेटवर्क अस्पताल हेल्पडेस्क पर जाएं।',
        'बायोमेट्रिक आधार प्रमाणीकरण का उपयोग करके ई-केवाईसी करें।',
        'अद्वितीय आभा (ABHA) आईडी वाला आयुष्मान भारत पीवीसी कार्ड / डिजिटल कार्ड बनाएं।'
      ],
      te: [
        'మొబైల్ నంబర్ లేదా రేషన్ కార్డుతో ఆన్‌లైన్‌లో అర్హతను సరిచూసుకోండి.',
        'సమీప ప్రభుత్వ ఆసుపత్రి, ఆరోగ్య కేంద్రం లేదా CSC కేంద్రాన్ని సందర్శించండి.',
        'ఆధార్ బయోమెట్రిక్ ద్వారా e-KYC పూర్తి చేయండి.',
        'ప్రత్యేక ABHA ఐడి కలిగిన డిజిటల్ లేదా ప్లాస్టిక్ హెల్త్ కార్డును పొందండి.'
      ]
    },
    eligibility: 'Households listed in Socio-Economic Caste Census (SECC 2011) deprivation criteria or active NFSA food security cardholders.',
    documentsRequired: [
      'Aadhaar Card of the individual member',
      'Ration Card / PM-JAY Letter / State Food Security Card',
      'Active Mobile number linked to Aadhaar'
    ],
    fees: 'Free of charge at public hospitals and health centers.',
    processingTime: 'Instant digital card generation upon successful biometric e-KYC',
    sourceLabel: 'National Health Authority - PM-JAY Portal',
    sourceUrl: 'https://nha.gov.in',
    contentLanguage: 'English',
    lastReviewedDate: '2026-07-28',
    isSynthetic: true,
    tags: ['ayushman', 'health', 'hospital', 'insurance', 'pmjay', 'abha', 'medical', 'ఆరోగ్య', 'కార్డు', 'ఆయుష్మాన్', 'భారత్', 'వైద్యం', 'ఆసుపత్రి', 'aarogyasri', 'ayushman', 'ఆరోగ్య శ్రీ', 'ఆరోగ్యశ్రీ', 'హెల్త్ కార్డు', 'వైద్య బీమా', 'ఉచిత వైద్యం', 'health card']
  },
  {
    id: 'building-plan-sanction-approval',
    title: {
      en: 'Residential Building Plan Sanction',
      hi: 'आवासीय भवन योजना स्वीकृति',
      te: 'నివాస భవన నిర్మాణ ప్రణాళిక అనుమతి'
    },
    category: 'municipal',
    department: 'Urban Development & Town Planning Authority',
    description: {
      en: 'Statutory architectural and structural approval required before commencing any new residential construction, extension, or structural alteration.',
      hi: 'किसी भी नए आवासीय निर्माण, विस्तार या संरचनात्मक परिवर्तन को शुरू करने से पहले आवश्यक वैधानिक वास्तुशिल्प और संरचनात्मक अनुमोदन।',
      te: 'కొత్త ఇల్లు కట్టే ముందు లేదా ఉన్న భవనానికి మార్పులు చేసే ముందు పురపాలక సంఘం నుండి పొందవలసిన అధికారిక నిర్మాణ అనుమతి.'
    },
    steps: {
      en: [
        'Licensed surveyor/architect drafts AutoCAD drawing complying with local building by-laws.',
        'Submit online application with encumbrance certificate and land title.',
        'System conducts automated scrutiny of setbacks, FAR, height, and parking.',
        'Pay development and betterment charges; receive digitally sanctioned permit.'
      ],
      hi: [
        'लाइसेंस प्राप्त सर्वेक्षक/वास्तुकार स्थानीय भवन उप-नियमों का अनुपालन करते हुए ऑटोकैड ड्राइंग का मसौदा तैयार करता है।',
        'भार प्रमाणपत्र और भूमि शीर्षक के साथ ऑनलाइन आवेदन जमा करें।',
        'सिस्टम सेटबैक, एफएआर, ऊंचाई और पार्किंग की स्वचालित जांच करता है।',
        'विकास और सुधार शुल्क का भुगतान करें; डिजिटल रूप से स्वीकृत परमिट प्राप्त करें।'
      ],
      te: [
        'లైసెన్స్ పొందిన ఆర్కిటెక్ట్ ద్వారా ప్రభుత్వ నిబంధనల ప్రకారం ప్లాన్ గీయించండి.',
        'భూమి యాజమాన్య పత్రాలు మరియు EC తో ఆన్‌లైన్‌లో దరఖాస్తు సమర్పించండి.',
        'భవనం ఎత్తు, సెట్‌బ్యాక్‌లు మరియు పార్కింగ్ స్థలాల ఆటోమేటిక్ పరిశీలన జరుగుతుంది.',
        'మునిసిపల్ ఫీజు చెల్లించి, డిజిటల్ అనుమతి పత్రాన్ని పొందండి.'
      ]
    },
    eligibility: 'Lawful owner of non-agricultural, layout-approved plot within planning boundaries.',
    documentsRequired: [
      'Registered Sale Deed / Title Deed',
      'Up-to-date Encumbrance Certificate (EC)',
      'Approved Layout Copy / Regularization Proceeding',
      'Structural Stability Certificate by Licensed Engineer'
    ],
    // Let's demonstrate "Not confirmed in the available source" for fees and processingTime on this service:
    fees: null, // intentionally null to fulfill "Show fees only when supported by source. If not confirmed, say 'Not confirmed in the available source'"
    processingTime: null, // intentionally null to fulfill prompt specification
    sourceLabel: 'State Town & Country Planning Directorate',
    sourceUrl: 'https://mohua.gov.in',
    contentLanguage: 'English',
    lastReviewedDate: '2026-06-04',
    isSynthetic: true,
    tags: ['building', 'sanction', 'construction', 'permit', 'architect', 'town planning', 'భవన', 'నిర్మాణం', 'ప్లాన్', 'అనుమతి', 'ఇంటి', 'ఇల్లు', 'ఇంటి ప్లాన్', 'భవన ప్లాన్', 'building plan']
  },
  {
    id: 'garbage-sanitation-collection',
    title: {
      en: 'Solid Waste & Sanitation Grievance Redressal',
      hi: 'ठोस अपशिष्ट एवं स्वच्छता शिकायत निवारण',
      te: 'పారిశుధ్యం & చెత్త సేకరణ సమస్యల పరిష్కారం'
    },
    category: 'municipal',
    department: 'Municipal Corporation Health & Solid Waste Management Section',
    description: {
      en: 'Reporting irregular door-to-door garbage collection, overflowing public community dustbins, road sweeping neglect, and dead animal removal.',
      hi: 'अनियमित घर-घर कचरा संग्रहण, ओवरफ्लो होते सार्वजनिक सामुदायिक कूड़ेदान, सड़क सफाई में लापरवाही और मृत पशुओं को हटाने की रिपोर्ट करना।',
      te: 'ఇంటింటి చెత్త సేకరణ రాకపోవడం, వీధుల్లో చెత్త కుప్పలు పేరుకుపోవడం, రోడ్ల ఊడ్చివేత లోపాలు మరియు పారిశుధ్య సమస్యలపై పౌరుల ఫిర్యాదు.'
    },
    steps: {
      en: [
        'Report locality with landmark or ward street number.',
        'Specify issue type (garbage van absent, bin overflowing, uncleared debris).',
        'Upload photo of uncleared spot if available.',
        'Sanitation supervisor dispatches municipal compactors within 12 to 24 hours.'
      ],
      hi: [
        'लैंडमार्क या वार्ड स्ट्रीट नंबर के साथ इलाके की रिपोर्ट करें।',
        'मुद्दे का प्रकार बताएं (कचरा गाड़ी अनुपस्थित, कूड़ेदान भरा हुआ, मलबा न हटाना)।',
        'यदि उपलब्ध हो तो बिना साफ किए स्थान की तस्वीर अपलोड करें।',
        'स्वच्छता पर्यवेक्षक 12 से 24 घंटों के भीतर सफाई टीम भेजता है।'
      ],
      te: [
        'ల్యాండ్‌మార్క్ లేదా వార్డు వీధి నంబర్‌ను నమోదు చేయండి.',
        'సమస్య రకాన్ని ఎంచుకోండి (చెత్త బండి రాలేదు, డస్ట్ బిన్ నిండిపోయింది, రోడ్డు ఊడ్చలేదు).',
        'లభ్యమైతే స్థలం ఫోటోను అప్‌లోడ్ చేయండి.',
        'పారిశుధ్య పర్యవేక్షకుడు 12 నుండి 24 గంటల్లో చెత్త సేకరణ వాహనాన్ని పంపుతారు.'
      ]
    },
    eligibility: 'Any resident or commercial shopkeeper within municipal municipal boundaries.',
    documentsRequired: null, // Not confirmed in available source
    fees: 'Free of charge (Citizen Redressal Service)',
    processingTime: '12 to 24 hours under Swachhata Citizen Charter',
    sourceLabel: 'Swachh Bharat Mission (Urban) Portal',
    sourceUrl: 'https://swachhbharaturban.gov.in',
    contentLanguage: 'English',
    lastReviewedDate: '2026-08-14',
    isSynthetic: true,
    tags: ['garbage', 'waste', 'sanitation', 'dustbin', 'swachhata', 'cleanliness', 'municipal', 'చెత్త', 'వ్యర్థాలు', 'పారిశుధ్యం', 'చెత్తకుండీ', 'చెత్తబండి', 'మురుగు', 'డస్ట్ బిన్', 'డ్రైనేజీ', 'సఫాయి', 'చెత్త సమస్య', 'చెత్త తీయడం లేదు', 'వ్యర్థాల సేకరణ', 'కచరా', 'कचरा', 'सफाई', 'सफाईकर्मी', 'कूड़ा', 'chettah', 'sanitation', 'waste collection']
  },
  {
    id: 'road-repair-potholes-grievance',
    title: {
      en: 'Municipal Road Repair & Potholes Grievance',
      hi: 'सड़क मरम्मत एवं गड्ढों की शिकायत',
      te: 'రోడ్డు మరమ్మతులు & గుంతల ఫిర్యాదు పరిష్కారం'
    },
    category: 'municipal',
    department: 'Public Works Department (PWD) / Municipal Road Engineering',
    description: {
      en: 'Citizen incident reporting for dangerous road potholes, broken asphalt, damaged pavement blocks, and cave-ins causing traffic risks.',
      hi: 'खतरनाक सड़क गड्ढों, टूटे डामर, क्षतिग्रस्त फुटपाथ ब्लॉकों और यातायात जोखिम पैदा करने वाली धंसी हुई सड़कों के लिए नागरिक रिपोर्टिंग।',
      te: 'ప్రమాదకరమైన రోడ్డు గుంతలు, దెబ్బతిన్న తారు రోడ్లు, పేవ్‌మెంట్ మరమ్మతులు మరియు రహదారి ప్రమాదాల నివారణకు పౌర ఫిర్యాదు.'
    },
    steps: {
      en: [
        'Provide GPS pin or street name with adjacent prominent shop/building.',
        'Select fault intensity (deep pothole, cave-in, unpaved ditch after pipeline work).',
        'Submit location photo to prioritize road safety hazards.',
        'PWD engineering crew deploys cold-mix asphalt or bituminous patch within civic SLA.'
      ],
      hi: [
        'जीपीएस पिन या आस-पास की प्रमुख दुकान/भवन के साथ सड़क का नाम प्रदान करें।',
        'दोष की तीव्रता चुनें (गहरा गड्ढा, सड़क धंसना, पाइपलाइन के बाद कच्चा गड्ढा)।',
        'सड़क सुरक्षा खतरों को प्राथमिकता देने के लिए स्थान की तस्वीर जमा करें।',
        'पीडब्ल्यूडी इंजीनियरिंग टीम सड़क मरम्मत के लिए कोल्ड-मिक्स डामर पैच करती है।'
      ],
      te: [
        'సమీప ప్రముఖ భవనం లేదా వీధి పేరుతో లొకేషన్‌ను పేర్కొనండి.',
        'గుంత తీవ్రతను ఎంచుకోండి (లోతైన గుంత, రోడ్డు కుంగిపోవడం, పైప్‌లైన్ తర్వాత గుంతలు).',
        'రోడ్డు ఫోటోను అప్‌లోడ్ చేయండి.',
        'ఇంజనీరింగ్ బృందం తారు లేదా సిమెంట్ ప్యాచ్ ద్వారా మరమ్మతులు పూర్తి చేస్తుంది.'
      ]
    },
    eligibility: 'All citizens, motorists, and pedestrians commuting within municipal limits.',
    documentsRequired: null, // Not confirmed in available source
    fees: 'Free of charge',
    processingTime: '48 to 96 hours depending on bituminous patch schedule',
    sourceLabel: 'Ministry of Housing & Urban Affairs (MoHUA)',
    sourceUrl: 'https://mohua.gov.in',
    contentLanguage: 'English',
    lastReviewedDate: '2026-07-20',
    isSynthetic: true,
    tags: ['road', 'pothole', 'pavement', 'tar', 'asphalt', 'patchwork', 'engineering', 'pwd', 'రోడ్డు', 'గుంతలు', 'రోడ్లు', 'మరమ్మతులు', 'తారురోడ్డు', 'గుంత', 'సరిచేయడం', 'పాడైపోయింది', 'రోడ్డు గుంతలు', 'రోడ్డు పాడైపోయింది', 'సड़क', 'गड्ढे', 'मरम्मत', 'road repair', 'pothole']
  },
  {
    id: 'pattadar-passbook-land-records',
    title: {
      en: 'Pattadar Passbook & Agriculture Land Records',
      hi: 'पट्टादार पासबुक एवं कृषि भूमि अभिलेख',
      te: 'పట్టాదారు పాస్ పుస్తకం & వ్యవసాయ భూమి రికార్డులు'
    },
    category: 'revenue',
    department: 'Department of Land Resources & District Revenue Administration',
    description: {
      en: 'Issuance and mutation of title deed-cum-pattadar passbook, Pahani/1B Adangal land extracts for farmers and landowners.',
      hi: 'किसानों और भूमि स्वामियों के लिए शीर्षक विलेख-सह-पट्टादार पासबुक, पहानी/1बी अडंगल भूमि उद्धरण जारी करना और नामांतरण।',
      te: 'రైతులు మరియు భూయజమానుల కోసం టైటిల్ డీడ్-కమ్-పట్టాదారు పాస్ పుస్తకం జారీ, మ్యుటేషన్ మరియు పహాణీ / 1B అడంగల్ భూమి రికార్డుల సదుపాయం.'
    },
    steps: {
      en: [
        'Verify survey number and sub-division on digital land records portal (e.g. Dharani / Meebhoomi).',
        'Submit registered conveyance / sale deed and previous title documents.',
        'Village Revenue Officer (VRO) conducts boundary verification and physical crop survey.',
        'Tahsildar approves digital mutation and dispatches tamper-proof biometric Pattadar Passbook.'
      ],
      hi: [
        'डिजिटल भूमि अभिलेख पोर्टल (जैसे धरणी / मीभूमि) पर खसरा संख्या और उप-विभाजन सत्यापित करें।',
        'पंजीकृत विलेख / बिक्री विलेख और पिछले शीर्षक दस्तावेज जमा करें।',
        'ग्राम राजस्व अधिकारी (VRO) सीमा सत्यापन और भौतिक फसल सर्वेक्षण करता है।',
        'तहसीलदार डिजिटल म्यूटेशन को मंजूरी देते हैं और बायोमेट्रिक पट्टादार पासबुक भेजते हैं।'
      ],
      te: [
        'డిజిటల్ భూ రికార్డుల పోర్టల్ (ధరణి / మీభూమి) లో సర్వే నంబర్ మరియు సబ్-డివిజన్ తనిఖీ చేయండి.',
        'రిజిస్టర్డ్ దస్తావేజులు మరియు మునుపటి యాజమాన్య పత్రాలు సమర్పించండి.',
        'గ్రామ రెవెన్యూ అధికారి (VRO) సరిహద్దుల క్షేత్ర స్థాయి తనిఖీ పూర్తి చేస్తారు.',
        'తహశీల్దార్ ఆమోదం పొందిన తర్వాత డిజిటల్ పట్టాదారు పాస్ పుస్తకం జారీ చేయబడుతుంది.'
      ]
    },
    eligibility: 'Lawful agricultural landholder or legal heir with valid registered sale or inheritance deed.',
    documentsRequired: [
      'Registered Sale Deed / Gift Deed / Partition Deed',
      'Encumbrance Certificate (EC) for past 30 years',
      'Aadhaar card and Mobile number of all joint owners',
      'Existing Passbook or Khata Number copy'
    ],
    fees: '₹100 to ₹300 statutory processing fee depending on parcel extent.',
    processingTime: '15 to 30 working days after boundary enquiry',
    sourceLabel: 'Digital India Land Records Modernization Programme (DILRMP)',
    sourceUrl: 'https://dilrmp.gov.in',
    contentLanguage: 'English',
    lastReviewedDate: '2026-06-25',
    isSynthetic: true,
    tags: ['land', 'passbook', 'pattadar', 'patta', 'adangal', 'pahani', 'revenue', 'dilrmp', 'agriculture', 'పట్టాదారు', 'పాస్ పుస్తకం', 'పాస్‌బుక్', 'భూమి', 'రికార్డులు', 'అడంగల్', 'పహాణీ', 'పట్టా', 'ధరణి', 'రైతు', 'పొలం', 'జమీన్', 'పట్టాదారు పాస్ పుస్తకం', 'భూమి రికార్డులు', 'पटवारी', 'पट्टा', 'खसरा', 'खतौनी', 'जमीन', 'pattadar passbook', 'land records', 'dharani']
  },
  {
    id: 'marriage-registration-certificate',
    title: {
      en: 'Compulsory Marriage Registration Certificate',
      hi: 'अनिवार्य विवाह पंजीकरण प्रमाण पत्र',
      te: 'వివాహ నమోదు ధృవీకరణ పత్రం'
    },
    category: 'certificates',
    department: 'Registration & Stamps Department / Sub-Registrar Office',
    description: {
      en: 'Legal proof of marriage under Special Marriage Act or Hindu/Personal Marriage Acts; essential for passports, spousal visas, and joint asset rights.',
      hi: 'विशेष विवाह अधिनियम या व्यक्तिगत विवाह अधिनियमों के तहत विवाह का कानूनी प्रमाण; पासपोर्ट, जीवनसाथी वीजा और संयुक्त संपत्ति अधिकारों के लिए आवश्यक।',
      te: 'వివాహ చట్టాల కింద వివాహాన్ని చట్టబద్ధంగా ధృవీకరించే అధికారిక పత్రం; పాస్‌పోర్ట్, స్పౌజ్ వీసా మరియు ఉమ్మడి ఆస్తి హక్కులకు అత్యవసరం.'
    },
    steps: {
      en: [
        'Complete online application form with personal biodata of both spouses.',
        'Upload wedding invitation card or certified place of worship marriage memo.',
        'Book physical appearance appointment at Sub-Registrar Office with 2 adult witnesses.',
        'Sign the marriage register before Registrar and receive laminated certificate.'
      ],
      hi: [
        'दोनों जीवनसाथियों के व्यक्तिगत बायोडाटा के साथ ऑनलाइन आवेदन पत्र पूरा करें।',
        'शादी का निमंत्रण पत्र या पूजा स्थल का विवाह प्रमाण पत्र अपलोड करें।',
        '2 वयस्क गवाहों के साथ उप-रजिस्ट्रार कार्यालय में नियुक्ति स्लॉट बुक करें।',
        'रजिस्ट्रार के सामने विवाह रजिस्टर पर हस्ताक्षर करें और प्रमाणित प्रमाण पत्र प्राप्त करें।'
      ],
      te: [
        'భార్యాభర్తలిద్దరి వివరాలతో ఆన్‌లైన్ దరఖాస్తును పూర్తి చేయండి.',
        'పెళ్లి పత్రిక లేదా కల్యాణ మండపం / ఆలయ రసీదును అప్‌లోడ్ చేయండి.',
        'ఇద్దరు వయోజన సాక్షులతో సబ్-రిజిస్ట్రార్ కార్యాలయ అపాయింట్‌మెంట్ బుక్ చేసుకోండి.',
        'రిజిస్ట్రార్ సమక్షంలో సంతకాలు చేసి డిజిటల్ వివాహ ధృవీకరణ పత్రాన్ని పొందండి.'
      ]
    },
    eligibility: 'Bride minimum 18 years; Groom minimum 21 years; solemnized ceremony or mutual civil consent.',
    documentsRequired: [
      'Age Proof of Bride and Groom (Birth Certificate or 10th Marks Memo)',
      'Wedding Card / Church / Temple Marriage Solemnization Slip',
      'Residence Proof of both parties',
      'Identity Proof and Photos of 2 Adult Witnesses'
    ],
    fees: '₹100 statutory registration fee within standard notification period.',
    processingTime: '7 to 15 working days following physical appearance',
    sourceLabel: 'National Government Services Portal - Marriage Services',
    sourceUrl: 'https://services.india.gov.in',
    contentLanguage: 'English',
    lastReviewedDate: '2026-08-02',
    isSynthetic: true,
    tags: ['marriage', 'wedding', 'certificate', 'registration', 'civil', 'stamps', 'couple', 'వివాహ', 'నమోదు', 'పెళ్లి', 'ధృవీకరణ', 'పత్రం', 'మ్యారేజ్', 'సర్టిఫికేట్', 'దంపతులు', 'వివాహం', 'వివాహము', 'వివాహ నమోదు', 'మ్యారేజ్ సర్టిఫికేట్ కావాలి', 'పెళ్లి సర్టిఫికేట్', 'विवाह', 'शादी', 'मैरिज', 'प्रमाण पत्र', 'marriage certificate', 'wedding']
  }
];
