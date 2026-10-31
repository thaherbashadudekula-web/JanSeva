import { Language, ServiceRecord } from '../storage/types';
import { storage } from '../storage/adapter';

export interface AssistantResponse {
  answer: string;
  isSupported: boolean;
  matchedServices: Array<{
    id: string;
    title: string;
    category: string;
    department: string;
    sourceLabel: string;
    sourceUrl: string;
    lastReviewedDate: string;
    contentLanguage: string;
    isSynthetic: boolean;
  }>;
  clarificationPrompt?: string;
  suggestedActions: Array<{
    label: string;
    href: string;
  }>;
}

const STOP_WORDS = new Set([
  // English common words
  'how', 'what', 'when', 'where', 'which', 'who', 'why', 'can', 'could', 'would', 
  'should', 'does', 'did', 'the', 'and', 'for', 'about', 'with', 'from', 'have', 
  'this', 'that', 'will', 'your', 'my', 'our', 'get', 'want', 'need', 'give', 'help',
  'apply', 'application', 'process', 'procedure', 'please', 'tell', 'details', 'info',
  'information', 'issue', 'problem',

  // Hindi question words, pronouns, auxiliaries, particles, and common verbs
  'कैसे', 'कहाँ', 'कहा', 'कब', 'कौन', 'किसको', 'क्यों', 'कितना', 'कितने', 'क्या', 
  'करें', 'करे', 'करवाना', 'करना', 'करते', 'बनवाएं', 'बनवाना', 'चाहिए', 'सकते', 
  'सकता', 'सकती', 'होगा', 'होगी', 'होता', 'होते', 'प्राप्त', 'मिलता', 'मिलेगा', 
  'मिलेगी', 'आवेदन', 'प्रक्रिया', 'के', 'की', 'का', 'को', 'से', 'में', 'पर', 'और', 
  'या', 'है', 'हैं', 'था', 'थी', 'थे', 'मुझे', 'हमें', 'मेरा', 'मेरी', 'हमारा', 
  'हमारी', 'आप', 'मैं', 'हम', 'बताइए', 'बताएं', 'जानकारी', 'विवरण', 'समस्या', 
  'लेना', 'देना', 'जाना', 'नहीं', 'नही', 'काम',
  'kare', 'kaise', 'kya', 'hai', 'mein', 'ko', 'se', 'chahiye', 'mujhe', 'batao',

  // Telugu question words, pronouns, auxiliaries, particles, and common conversational verbs
  'ఎలా', 'ఎలాంటి', 'ఎక్కడ', 'ఎప్పుడు', 'ఎవరు', 'ఎవరికి', 'ఎందుకు', 'ఎంత', 'ఏమిటి', 
  'ఏంటి', 'ఏం', 'చేయాలి', 'చేసుకోవాలి', 'చేస్తారు', 'చేస్తారా', 'చేయవచ్చు', 'పొందాలి', 
  'పొందవచ్చు', 'రావాలి', 'వస్తుంది', 'వచ్చింది', 'తీసుకోవాలి', 'ఇవ్వాలి', 'వెళ్ళాలి', 
  'కావాలి', 'ఉంటుంది', 'ఉన్నాయి', 'ఉంది', 'లేదు', 'దరఖాస్తు', 'విధానం', 'మరియు', 'లేదా', 
  'కోసం', 'కొరకు', 'నుండి', 'నుంచి', 'లో', 'కి', 'కు', 'తో', 'పై', 'దగ్గర', 'నాకు', 'మాకు', 'నా', 'మా', 
  'మీరు', 'నేను', 'మేము', 'వాళ్ళు', 'చెప్పండి', 'వివరాలు', 'సమాచారం', 'గురించి', 
  'సమస్య', 'ఇబ్బంది', 'ఎవరిని', 'అడగాలి', 'తెలుసుకోవాలి', 'అప్లై', 'చేయడం', 'చేయడం ఎలా', 'పనిచేయడం',
  'రాలేదు', 'పోవాలి', 'చెయ్యాలి', 'చూడాలి', 'తెల్పండి', 'ఇవ్వండి', 'చేయండి',
  
  // Romanized Telugu
  'naku', 'maku', 'kavali', 'cheyali', 'cheskovali', 'ela', 'enti', 'eppudu', 'ekkada', 
  'enduku', 'vastundi', 'ledu', 'undi', 'kosam', 'gurinchi', 'cheppandi', 'ivvali', 
  'theeskovali', 'apply', 'problem', 'samasyalu', 'raledu', 'cheyyali'
]);

/**
 * Strips common Telugu noun/verb inflectional suffixes to extract root stems.
 */
function expandStems(token: string): string[] {
  const stems = [token];
  const suffixes = [
    'కోసం', 'కొరకు', 'నుండి', 'నుంచి', 'వరకు',
    'లోని', 'లో', 'పై', 'తో', 'వద్ద', 'దగ్గర',
    'కు', 'కి', 'ను', 'ని',
    'లు', 'ల'
  ];
  for (const suf of suffixes) {
    if (token.length > suf.length + 1 && token.endsWith(suf)) {
      stems.push(token.slice(0, -suf.length));
    }
  }
  return stems;
}

// Tokenize text into keywords, stripping basic punctuation and common stopwords
function tokenize(text: string): string[] {
  const rawTokens = text
    .toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"'–—]/g, ' ')
    .split(/\s+/)
    .filter(token => token.length >= 2 && !STOP_WORDS.has(token));

  const expanded = new Set<string>();
  for (const t of rawTokens) {
    expanded.add(t);
    const stems = expandStems(t);
    for (const s of stems) {
      if (s.length >= 2 && !STOP_WORDS.has(s)) {
        expanded.add(s);
      }
    }
  }
  return Array.from(expanded);
}

/**
 * Detect language of query: Telugu script/words -> 'te', Devanagari/Hindi -> 'hi', otherwise fallback.
 */
export function detectLanguage(query: string, fallback: Language): Language {
  if (/[\u0c00-\u0c7f]/.test(query)) {
    return 'te';
  }
  if (/[\u0900-\u097f]/.test(query)) {
    return 'hi';
  }
  const lower = query.toLowerCase();
  const romanizedTe = [
    'kavali', 'cheyali', 'cheskovali', 'ela', 'enti', 'eppudu', 'ekkada',
    'enduku', 'vastundi', 'ledu', 'undi', 'cheppandi', 'ivvali', 'theeskovali',
    'biyyam', 'pattadar', 'adangal', 'pahani', 'dharani', 'guntalu', 'chettah', 'raledu'
  ];
  if (romanizedTe.some(kw => lower.includes(kw))) {
    return 'te';
  }
  const romanizedHi = [
    'chahiye', 'kaise', 'kya', 'batao', 'kare', 'karna', 'milega', 'hoga'
  ];
  if (romanizedHi.some(kw => lower.includes(kw))) {
    return 'hi';
  }
  return fallback;
}

export async function processCitizenQuery(
  userQuery: string,
  preferredLanguage: Language
): Promise<AssistantResponse> {
  const query = userQuery.trim();
  const language = detectLanguage(query, preferredLanguage);

  if (!query) {
    return {
      answer: language === 'hi' 
        ? 'कृपया नागरिक सेवाओं या प्रक्रियाओं के बारे में अपना प्रश्न पूछें।'
        : language === 'te'
        ? 'దయచేసి పౌర సేవలు లేదా విధానాల గురించి మీ ప్రశ్నను అడగండి.'
        : 'Please ask a question regarding civic services, government certificates, or procedures.',
      isSupported: false,
      matchedServices: [],
      suggestedActions: [
        { label: 'Browse Service Directory', href: '/services' },
        { label: 'Submit Sample Grievance', href: '/grievance/new' }
      ]
    };
  }

  const allServices = await storage.getAllServices();
  const tokens = tokenize(query);

  // Score each service based on query matching
  const scored = allServices.map(service => {
    let score = 0;
    const matchedTokens = new Set<string>();

    // Check tags (exact, substring, or reverse substring)
    for (const tag of service.tags) {
      const tagLower = tag.toLowerCase();
      for (const t of tokens) {
        if (tagLower === t) {
          score += 14;
          matchedTokens.add(t);
        } else if (tagLower.includes(t) || (t.length >= 3 && t.includes(tagLower))) {
          score += 10;
          matchedTokens.add(t);
        }
      }
    }

    // Check titles across all 3 languages (English, Hindi, Telugu)
    const titleEn = service.title.en.toLowerCase();
    const titleHi = service.title.hi.toLowerCase();
    const titleTe = service.title.te.toLowerCase();
    for (const t of tokens) {
      if (titleEn.includes(t)) { score += 10; matchedTokens.add(t); }
      if (titleHi.includes(t) || (t.length >= 3 && t.includes(titleHi))) { score += 10; matchedTokens.add(t); }
      if (titleTe.includes(t) || (t.length >= 3 && (titleTe.includes(t) || t.includes(titleTe)))) { score += 10; matchedTokens.add(t); }
    }

    // Check description across all 3 languages
    const descEn = service.description.en.toLowerCase();
    const descHi = service.description.hi.toLowerCase();
    const descTe = service.description.te.toLowerCase();
    for (const t of tokens) {
      if (descEn.includes(t)) { score += 5; matchedTokens.add(t); }
      if (descHi.includes(t)) { score += 5; matchedTokens.add(t); }
      if (descTe.includes(t)) { score += 5; matchedTokens.add(t); }
    }

    // Check department & category
    for (const t of tokens) {
      if (service.department.toLowerCase().includes(t)) { score += 4; matchedTokens.add(t); }
      if (service.category.toLowerCase().includes(t)) { score += 4; matchedTokens.add(t); }
    }

    return { service, score, matchedTokensCount: matchedTokens.size };
  });

  // Filter matches with meaningful score
  const matches = scored
    .filter(item => item.score >= 8 && item.matchedTokensCount >= 1)
    .sort((a, b) => b.score - a.score);

  if (matches.length === 0) {
    // Unsupported answer handling
    const noEvidenceMsg = 
      language === 'hi'
        ? `उपलब्ध क्यूरेटेड सरकारी स्रोतों से इस प्रश्न का उत्तर पुष्ट नहीं किया जा सकता है।

नागरिक सुरक्षा और सटीकता के लिए, हम गैर-सत्यापित सरकारी नियमों या पात्रता का अनुमान नहीं लगाते हैं।

उपयोगी अगले कदम:
1. संपूर्ण सार्वजनिक सेवा निर्देशिका देखें।
2. यदि यह किसी नागरिक समस्या या सेवा में देरी से संबंधित है, तो नमूना शिकायत दर्ज करें।
3. संबंधित सरकारी विभाग के आधिकारिक पोर्टल पर सीधे जाएं।`
        : language === 'te'
        ? `అందుబాటులో ఉన్న ప్రభుత్వ మూలాల నుండి ఈ సమాధానం నిర్ధారించబడలేదు.

పౌరుల భద్రత మరియు ఖచ్చితత్వం కోసం, మేము ధృవీకరించని ప్రభుత్వ నిబంధనలను ఊహించము.

ఉపయోగకరమైన తదుపరి దశలు:
1. సేవల డైరెక్టరీలో శోధించండి.
2. స్థానిక పౌర సమస్య లేదా సేవా లోపం ఉంటే నమూనా ఫిర్యాదును నమోదు చేయండి.
3. సంబంధిత శాఖ అధికారిక పోర్టల్‌ను నేరుగా సందర్శించండి.`
        : `The answer cannot be confirmed from the available curated sources.

To avoid misleading citizens, this assistant strictly refrains from speculating on unverified government rules, fees, or requirements.

Recommended Next Steps:
1. Search the full Service Directory to see documented civic services.
2. If this is regarding a civic failure, service disruption, or municipal issue, submit a sample grievance.
3. Consult the designated government department's official website directly.`;

    return {
      answer: noEvidenceMsg,
      isSupported: false,
      matchedServices: [],
      suggestedActions: [
        { label: language === 'hi' ? 'सेवा निर्देशिका' : language === 'te' ? 'సేవల డైరెక్టరీ' : 'View Service Directory', href: '/services' },
        { label: language === 'hi' ? 'शिकायत दर्ज करें' : language === 'te' ? 'ఫిర్యాదు దాఖలు చేయండి' : 'Submit Sample Grievance', href: '/grievance/new' }
      ]
    };
  }

  // Candidate best match
  const bestMatch = matches[0].service;

  // Check for explicit alien non-civic entities (e.g. rocket, submarine, spaceship, alien, crypto mining)
  const ALIEN_ENTITIES = new Set([
    'rocket', 'launchpad', 'submarine', 'spaceship', 'spacecraft', 'mars', 'galaxy',
    'crypto', 'bitcoin', 'weapons', 'uranium', 'nuclear', 'alien'
  ]);
  const hasAlienEntity = tokens.some(t => ALIEN_ENTITIES.has(t));

  if (hasAlienEntity) {
    const alienWords = tokens.filter(t => ALIEN_ENTITIES.has(t));
    const noEvidenceMsg = 
      language === 'hi'
        ? `उपलब्ध क्यूरेटेड सरकारी स्रोतों से इस प्रश्न ("${alienWords.join(', ')}") का उत्तर पुष्ट नहीं किया जा सकता है।

नागरिक सुरक्षा और सटीकता के लिए, हम गैर-सत्यापित सरकारी नियमों या प्रक्रियाओं का अनुमान नहीं लगाते हैं।

उपयोगी अगले कदम:
1. संपूर्ण सार्वजनिक सेवा निर्देशिका देखें।
2. यदि यह किसी नागरिक समस्या या सेवा वितरण में देरी से संबंधित है, तो नमूना शिकायत दर्ज करें।
3. संबंधित सरकारी विभाग के आधिकारिक पोर्टल पर सीधे जाएं।`
        : language === 'te'
        ? `అందుబాటులో ఉన్న ప్రభుత్వ మూలాల నుండి ఈ సమాధానం నిర్ధారించబడలేదు ("${alienWords.join(', ')}").

పౌరుల భద్రత మరియు ఖచ్చితత్వం కోసం, మేము ధృవీకరించని ప్రభుత్వ నిబంధనలను ఊహించము.

ఉపయోగకరమైన తదుపరి దశలు:
1. సేవల డైరెక్టరీలో శోధించండి.
2. స్థానిక పౌర సమస్య లేదా సేవా లోపం ఉంటే నమూనా ఫిర్యాదును నమోదు చేయండి.
3. సంబంధిత శాఖ అధికారిక పోర్టల్‌ను నేరుగా సందర్శించండి.`
        : `The answer cannot be confirmed from the available curated sources (specifically regarding: ${alienWords.join(', ')}).

To avoid misleading citizens, this assistant strictly refrains from speculating on unverified government rules, fees, or requirements.

Recommended Next Steps:
1. Search the full Service Directory to see documented civic services.
2. If this is regarding a civic failure, service disruption, or municipal issue, submit a sample grievance.
3. Consult the designated government department's official website directly.`;

    return {
      answer: noEvidenceMsg,
      isSupported: false,
      matchedServices: [],
      suggestedActions: [
        { label: language === 'hi' ? 'सेवा निर्देशिका' : language === 'te' ? 'సేవల డైరెక్టరీ' : 'View Service Directory', href: '/services' },
        { label: language === 'hi' ? 'शिकायत दर्ज करें' : language === 'te' ? 'ఫిర్యాదు దాఖలు చేయండి' : 'Submit Sample Grievance', href: '/grievance/new' }
      ]
    };
  }

  // Best match
  const isAmbiguous = matches.length > 1 && matches[0].score - matches[1].score < 4;

  // Format grounded answer
  const title = bestMatch.title[language] || bestMatch.title.en;
  const desc = bestMatch.description[language] || bestMatch.description.en;
  const steps = (bestMatch.steps[language] || bestMatch.steps.en)
    .map((step, idx) => `${idx + 1}. ${step}`)
    .join('\n');

  const unconfirmedLabel = 
    language === 'hi'
      ? 'उपलब्ध स्रोत में पुष्टि नहीं हुई है।'
      : language === 'te'
      ? 'అందుబాటులో ఉన్న మూలంలో నిర్ధారించబడలేదు.'
      : 'Not confirmed in the available source.';

  const eligibilityText = bestMatch.eligibility || unconfirmedLabel;
  const documentsText = bestMatch.documentsRequired && bestMatch.documentsRequired.length > 0
    ? bestMatch.documentsRequired.map(d => `• ${d}`).join('\n')
    : unconfirmedLabel;
  const feesText = bestMatch.fees || unconfirmedLabel;
  const processingText = bestMatch.processingTime || unconfirmedLabel;

  let answerText = '';

  if (language === 'hi') {
    answerText = `### ${title}
**विभाग:** ${bestMatch.department}

${desc}

#### आधिकारिक चरण:
${steps}

#### मुख्य आवश्यकताएं (स्रोतों द्वारा प्रमाणित):
- **पात्रता:** ${eligibilityText}
- **आवश्यक दस्तावेज:**
${documentsText}
- **सरकारी शुल्क:** ${feesText}
- **प्रसंस्करण समय:** ${processingText}`;
  } else if (language === 'te') {
    answerText = `### ${title}
**శాఖ:** ${bestMatch.department}

${desc}

#### అధికారిక విధానం & దశలు:
${steps}

#### ధృవీకరించబడిన వివరాలు:
- **అర్హత:** ${eligibilityText}
- **కావలసిన పత్రాలు:**
${documentsText}
- **రుసుములు:** ${feesText}
- **ప్రాసెసింగ్ సమయం:** ${processingText}`;
  } else {
    answerText = `### ${title}
**Department:** ${bestMatch.department}

${desc}

#### Step-by-Step Procedure:
${steps}

#### Documented Requirements (Cited from Source):
- **Eligibility:** ${eligibilityText}
- **Required Documents:**
${documentsText}
- **Statutory Fees:** ${feesText}
- **Estimated Processing Time:** ${processingText}`;
  }

  const clarification = isAmbiguous
    ? (language === 'hi' 
        ? `संबंधित अन्य सेवाएं भी मिली हैं: ${matches.slice(1, 3).map(m => `"${m.service.title[language] || m.service.title.en}"`).join(', ')}। क्या आप इनमें से किसी विशिष्ट सेवा के बारे में पूछना चाहते हैं?`
        : language === 'te'
        ? `సంబంధిత ఇతర సేవలు కూడా కనుగొనబడ్డాయి: ${matches.slice(1, 3).map(m => `"${m.service.title[language] || m.service.title.en}"`).join(', ')}. మీరు వీటిలో నిర్దిష్ట సేవ గురించి తెలుసుకోవాలనుకుంటున్నారా?`
        : `We also found related services: ${matches.slice(1, 3).map(m => `"${m.service.title.en}"`).join(', ')}. Would you like details on one of these specifically?`)
    : undefined;

  const matchedServices = matches.slice(0, 3).map(m => ({
    id: m.service.id,
    title: m.service.title[language] || m.service.title.en,
    category: m.service.category,
    department: m.service.department,
    sourceLabel: m.service.sourceLabel,
    sourceUrl: m.service.sourceUrl,
    lastReviewedDate: m.service.lastReviewedDate,
    contentLanguage: m.service.contentLanguage,
    isSynthetic: m.service.isSynthetic
  }));

  const suggestedActions = [
    {
      label: language === 'hi' 
        ? `"${title}" का पूरा विवरण देखें` 
        : language === 'te' 
        ? `"${title}" పూర్తి వివరాలు చూడండి` 
        : `View Full Service Details: ${title}`,
      href: `/services/${bestMatch.id}`
    },
    {
      label: language === 'hi' 
        ? 'इस सेवा से संबंधित शिकायत दर्ज करें' 
        : language === 'te' 
        ? 'ఈ సేవకు సంబంధించి ఫిర్యాదు చేయండి' 
        : 'File Grievance Regarding This Service',
      href: `/grievance/new?category=${bestMatch.category}`
    }
  ];

  return {
    answer: answerText,
    isSupported: true,
    matchedServices,
    clarificationPrompt: clarification,
    suggestedActions
  };
}
