import type { Language } from '../types.ts';

export const ASSET_IMAGES = {
  courthouseHero: '/src/assets/images/hero_maharashtra_courthouse_1795616720752.jpg',
  mentorshipLibrary: '/src/assets/images/legal_mentorship_library_1795616720163.jpg',
  draftingWorkshop: '/src/assets/images/legal_drafting_workshop_1795616721544.jpg',
};

export interface BilingualText {
  en: string;
  mr: string;
}

export function t(lang: Language, text: BilingualText): string {
  return lang === 'mr' ? text.mr : text.en;
}

export const SITE_COPY = {
  orgFullName: {
    en: 'Maharashtra Junior Advocates Welfare Association',
    mr: 'महाराष्ट्र कनिष्ठ वकील कल्याण संघटना',
  },
  shortName: 'MAJAWA',
  sloganEn: 'DIGNITY FOR JUNIORS, JUSTICE FOR ALL.',
  sloganMr: 'वकिलांना सन्मान, सर्वांसाठी न्याय',
  statusBanner: {
    en: 'Proposed Association · Registration in Progress',
    mr: 'प्रस्तावित संघटना · नोंदणी प्रक्रिया प्रगतीपथावर',
  },
  proposedBy: {
    en: 'Proposed by Adv. Sarfaraz Shahezad Ansari, Advocate, Bhiwandi',
    mr: 'प्रस्तावना: अॅड. सरफराज शहजाद अन्सारी, वकील, भिवंडी',
  },
  proposedOffice: {
    en: 'Bhiwandi, District Thane, Maharashtra, India',
    mr: 'भिवंडी, जिल्हा ठाणे, महाराष्ट्र, भारत',
  },
  initialArea: {
    en: 'Bhiwandi, Kalyan and Thane, Maharashtra',
    mr: 'भिवंडी, कल्याण आणि ठाणे, महाराष्ट्र',
  },
  nav: {
    home: { en: 'Home', mr: 'मुख्यपृष्ठ' },
    about: { en: 'About Us', mr: 'आमच्याविषयी' },
    objectives: { en: 'Objectives', mr: 'उद्दिष्टे' },
    welfare: { en: 'Welfare', mr: 'कल्याण योजना' },
    membership: { en: 'Membership', mr: 'सदस्यत्व' },
    grievance: { en: 'Grievance', mr: 'तक्रार सहाय्य' },
    training: { en: 'Training', mr: 'प्रशिक्षण व उपक्रम' },
    news: { en: 'News', mr: 'बातम्या व अद्यतने' },
    contact: { en: 'Contact', mr: 'संपर्क' },
    joinCta: { en: 'Join MAJAWA', mr: 'MAJAWA मध्ये सामील व्हा' },
  },
  home: {
    kicker: {
      en: 'Proposed Association · Registration in Progress · Bhiwandi, Kalyan & Thane',
      mr: 'प्रस्तावित संघटना · नोंदणी प्रगतीपथावर · भिवंडी, कल्याण आणि ठाणे',
    },
    heroTitle: {
      en: 'Empowering Junior Advocates. Strengthening the Legal Profession.',
      mr: 'कनिष्ठ वकिलांचे सक्षमीकरण. वकिली व्यवसायाचे बळकटीकरण.',
    },
    heroSubheading: {
      en: 'MAJAWA is a proposed welfare-oriented initiative dedicated to promoting the dignity, professional development, financial welfare and legitimate interests of junior advocates across Maharashtra.',
      mr: 'MAJAWA हा महाराष्ट्रभरातील कनिष्ठ वकिलांचा सन्मान, व्यावसायिक विकास, आर्थिक कल्याण आणि कायदेशीर हक्क जपण्यासाठी समर्पित एक प्रस्तावित कल्याणकारी उपक्रम आहे.',
    },
    coreInsight: {
      en: 'The main issue is not only stipend. It is the dignity, fairness and protection of junior advocates, and the absence of any safeguard or forum when a senior treats a junior unfairly.',
      mr: 'मुख्य प्रश्न केवळ मानधनाचा नाही. तर कनिष्ठ वकिलांचा सन्मान, न्याय्य वागणूक आणि अन्याय झाल्यास कोणतेही संरक्षण किंवा व्यासपीठ नसणे हा आहे.',
    },
    btnBecomeMember: { en: 'Become a Member', mr: 'सदस्य बना' },
    btnExploreMission: { en: 'Explore Our Mission', mr: 'आमचे ध्येय जाणून घ्या' },
    btnContactUs: { en: 'Contact Us', mr: 'संपर्क साधा' },
    utilityStrip: {
      areaLabel: { en: 'Initial Area of Operation', mr: 'प्रारंभिक कार्यक्षेत्र' },
      areaValue: { en: 'Bhiwandi, Kalyan & Thane', mr: 'भिवंडी, कल्याण आणि ठाणे' },
      eligLabel: { en: 'Junior Eligibility', mr: 'कनिष्ठ सदस्य पात्रता' },
      eligValue: { en: 'Up to 7 Years Practice', mr: '७ वर्षांपर्यंत वकिली अनुभव' },
      feeLabel: { en: 'Proposed Annual Fee', mr: 'प्रस्तावित वार्षिक शुल्क' },
      feeValue: { en: '₹500 (Post-Registration Only)', mr: '₹५०० (नोंदणीनंतरच)' },
      cohortLabel: { en: 'Founding Cohort Goal', mr: 'संस्थापक गट उद्दिष्ट' },
      cohortValue: { en: '9–11 Founding Advocates', mr: '९–११ संस्थापक वकील' },
    },
    whyTitle: { en: 'Why MAJAWA?', mr: 'MAJAWA का आवश्यक आहे?' },
    whyBody1: {
      en: 'The initial years of legal practice are often challenging. Financial insecurity, lack of structured mentorship, inadequate professional opportunities and the absence of effective support mechanisms can make the journey difficult for young advocates.',
      mr: 'वकिली व्यवसायाची सुरुवातीची वर्षे अत्यंत आव्हानात्मक असतात. आर्थिक अस्थिरता, सुयोग्य मार्गदर्शनाचा अभाव, अपुऱ्या व्यावसायिक संधी आणि प्रभावी सहाय्य यंत्रणेचा अभाव यामुळे तरुण वकिलांचा प्रवास कठीण होतो.',
    },
    whyBody2: {
      en: 'MAJAWA aims to create a united and constructive platform to address these concerns through welfare initiatives, professional development, representation and lawful institutional engagement.',
      mr: 'कल्याणकारी उपक्रम, व्यावसायिक प्रशिक्षण, संस्थात्मक प्रतिनिधित्व आणि कायदेशीर संवादाच्या माध्यमातून या समस्या सोडविण्यासाठी एक संघटित आणि विधायक व्यासपीठ निर्माण करणे हे MAJAWA चे ध्येय आहे.',
    },
    pillars: [
      {
        num: '01',
        title: { en: 'Financial Welfare', mr: 'आर्थिक कल्याण' },
        desc: {
          en: 'Advocacy for structured stipends, reimbursement of out-of-pocket court expenses, emergency hardship assistance, and medical or accident welfare schemes.',
          mr: 'नियमित मानधन, न्यायालयीन खर्चाची परतफेड, आपत्कालीन आर्थिक मदत निधी आणि वैद्यकीय व अपघात विमा योजनांसाठी प्रयत्न.',
        },
      },
      {
        num: '02',
        title: { en: 'Professional Dignity', mr: 'व्यावसायिक सन्मान' },
        desc: {
          en: 'Written engagement terms, a voluntary Ethical Chamber Code, protection against baseless character attacks when changing chambers, and respectful bar culture.',
          mr: 'लेखी कार्यकरार, ऐच्छिक नैतिक चेंबर संहिता, चेंबर बदलताना होणाऱ्या निराधार आरोपांपासून संरक्षण आणि सन्मानपूर्वक वकिली वातावरण.',
        },
      },
      {
        num: '03',
        title: { en: 'Legal Training & Mentorship', mr: 'कायदेशीर प्रशिक्षण व मार्गदर्शन' },
        desc: {
          en: 'Practical workshops on drafting, pleading, BNS, BNSS, BSA, moot courts, English legal writing, and pairing with willing senior mentors.',
          mr: 'मसुदा लेखन, युक्तिवाद, BNS, BNSS, BSA कायद्यांचे प्रशिक्षण, अभिरूप न्यायालये, कायदेशीर इंग्रजी लेखन आणि अनुभवी ज्येष्ठांचे मार्गदर्शन.',
        },
      },
      {
        num: '04',
        title: { en: 'Grievance Support', mr: 'तक्रार सहाय्य व मार्गदर्शन' },
        desc: {
          en: 'A confidential committee offering fair mediation, conciliation, and lawful guidance toward competent statutory forums without strikes or public shaming.',
          mr: 'संप किंवा जाहीर बदनामी न करता गोपनीय समितीमार्फत न्याय्य मध्यस्थी, समेट आणि सक्षम कायदेशीर मंचाकडे जाण्यासाठी मार्गदर्शन.',
        },
      },
    ],
    realityTitle: {
      en: 'What Junior Advocates Actually Face',
      mr: 'कनिष्ठ वकिलांना प्रत्यक्षात सामोरे जावे लागणाऱ्या अडचणी',
    },
    realitySubtitle: {
      en: 'Documented patterns observed repeatedly in practice across Bhiwandi, Thane, and Kalyan — presented without naming individuals.',
      mr: 'भिवंडी, ठाणे आणि कल्याण परिसरात सातत्याने दिसून आलेली वस्तुस्थिती — कोणाचेही नाव न घेता मांडलेली.',
    },
    realities: [
      {
        problem: { en: 'Unpaid or Underpaid Work', mr: 'अत्यल्प किंवा शून्य मानधन' },
        practice: {
          en: 'Juniors work for months or years with no payment, or a token ₹2,000 to ₹5,000 a month even after two or three years in the same chamber.',
          mr: 'कनिष्ठ वकील महिने किंवा वर्षानुवर्षे विनामोबदला, किंवा एकाच चेंबरमध्ये २–३ वर्षे काम करूनही केवळ ₹२,००० ते ₹५,००० इतक्या अल्प रकमेवर काम करतात.',
        },
      },
      {
        problem: { en: 'Out-of-Pocket Expenses Not Refunded', mr: 'न्यायालयीन खर्चाची परतफेड न होणे' },
        practice: {
          en: 'Court fees, travel, photocopying, typing and filing costs are paid by the junior and never reimbursed.',
          mr: 'कोर्ट फी, प्रवास, झेरॉक्स, टायपिंग आणि फाईलिंगचा खर्च कनिष्ठ स्वतःच्या खिशातून करतात आणि त्याची परतफेड होत नाही.',
        },
      },
      {
        problem: { en: 'Character Attacks When Leaving', mr: 'चेंबर सोडताना चारित्र्यहनन' },
        practice: {
          en: 'When a junior moves to another chamber, baseless accusations are circulated damaging their reputation and integrity.',
          mr: 'कनिष्ठ दुसऱ्या चेंबरमध्ये गेल्यास त्यांच्या प्रामाणिकपणावर व क्षमतेवर निराधार आरोप करून प्रतिमा मलिन केली जाते.',
        },
      },
      {
        problem: { en: 'Interference With New Work', mr: 'नवीन कामात हस्तक्षेप' },
        practice: {
          en: 'Former seniors occasionally contact a junior’s independent or new clients, undermining confidence and professional independence.',
          mr: 'माजी ज्येष्ठांकडून कनिष्ठाच्या स्वतंत्र अशीलांशी संपर्क साधून त्यांच्या नवीन कामात अडथळे आणले जातात.',
        },
      },
      {
        problem: { en: 'Forced Migration', mr: 'नाइलाजाने स्थलांतर' },
        practice: {
          en: 'Juniors residing in Bhiwandi travel to Kalyan or Thane solely because local chambers do not provide survivable stipends.',
          mr: 'भिवंडीतील कनिष्ठांना स्थानिक पातळीवर पुरेसे मानधन न मिळाल्याने नाइलाजाने कल्याण किंवा ठाणे येथे काम शोधावे लागते.',
        },
      },
      {
        problem: { en: 'No Written Terms', mr: 'लेखी कार्यकराराचा अभाव' },
        practice: {
          en: 'Nothing is recorded regarding duties, payment, expense refunds, client ownership or notice period, leaving juniors without proof in disputes.',
          mr: 'कामाच्या जबाबदाऱ्या, मानधन, खर्च परतफेड, अशीलांचे हक्क किंवा नोटीस कालावधी याबाबत कोणतीही लेखी नोंद नसते.',
        },
      },
      {
        problem: { en: 'Fear of Speaking Up', mr: 'बोलण्याची भीती' },
        practice: {
          en: 'A junior who raises a concern risks losing chamber space, reputation and references — so most choose silence.',
          mr: 'तक्रार केल्यास चेंबरमधील जागा, प्रतिष्ठा आणि संदर्भ गमावण्याची भीती असल्यामुळे बहुतांश कनिष्ठ गप्प राहतात.',
        },
      },
    ],
    visionTitle: { en: 'Our Vision', mr: 'आमची दृष्टी (Vision)' },
    visionBody: {
      en: 'To create a legal profession where every junior advocate has access to dignity, fair opportunities, professional guidance and a supportive environment to grow.',
      mr: 'असा वकिली व्यवसाय निर्माण करणे जिथे प्रत्येक कनिष्ठ वकिलाला सन्मान, न्याय्य संधी, व्यावसायिक मार्गदर्शन आणि प्रगतीसाठी पोषक वातावरण मिळेल.',
    },
    missionTitle: { en: 'Our Mission', mr: 'आमचे ध्येय (Mission)' },
    missionBody: {
      en: 'To promote the welfare, protection, professional development and collective representation of junior advocates through lawful, transparent and constructive initiatives.',
      mr: 'कायदेशीर, पारदर्शक आणि विधायक उपक्रमांच्या माध्यमातून कनिष्ठ वकिलांचे कल्याण, संरक्षण, व्यावसायिक विकास आणि सामूहिक प्रतिनिधित्व वृद्धिंगत करणे.',
    },
    closingQuote: {
      en: '“We seek not privilege, but dignity. Not confrontation, but cooperation. Not special treatment, but fair opportunity for every deserving junior advocate.”',
      mr: '“आम्ही विशेषाधिकार मागत नाही, तर सन्मान मागतो. संघर्ष नाही, तर सहकार्य इच्छितो. वेगळी वागणूक नाही, तर प्रत्येक पात्र कनिष्ठ वकिलाला न्याय्य संधी मिळावी हीच आमची अपेक्षा आहे.”',
    },
  },
  about: {
    title: { en: 'About MAJAWA', mr: 'MAJAWA विषयी' },
    subtitle: {
      en: 'A constructive, lawful institutional initiative proposed for junior advocates across Bhiwandi, Kalyan, Thane, and Maharashtra.',
      mr: 'भिवंडी, कल्याण, ठाणे आणि संपूर्ण महाराष्ट्रातील कनिष्ठ वकिलांसाठी प्रस्तावित एक विधायक व कायदेशीर संस्थात्मक उपक्रम.',
    },
    introTitle: { en: 'Introduction & Founding Context', mr: 'प्रस्तावना आणि संस्थापनेची पार्श्वभूमी' },
    introBody1: {
      en: 'Every senior advocate, Senior Counsel, and judge began their journey as a junior. The first seven years at the Bar decide whether a talented young advocate builds a sustainable legal career or quietly leaves the profession.',
      mr: 'प्रत्येक ज्येष्ठ वकील आणि न्यायाधीश यांनी आपल्या कारकिर्दीची सुरुवात कनिष्ठ वकील म्हणूनच केली आहे. वकिलीची पहिली सात वर्षे ठरवतात की एक गुणवान तरुण वकील या व्यवसायात टिकतो की निमूटपणे व्यवसाय सोडतो.',
    },
    introBody2: {
      en: 'Proposed by Adv. Sarfaraz Shahezad Ansari (Advocate, Bhiwandi), Maharashtra Junior Advocates Welfare Association (MAJAWA) is currently in its pre-registration formation stage. It is drafted for open discussion with prospective founding members across Bhiwandi, Kalyan, and Thane, with a long-term vision of establishing district and taluka units across Maharashtra.',
      mr: 'भिवंडी येथील अॅड. सरफराज शहजाद अन्सारी यांनी प्रस्तावित केलेली महाराष्ट्र कनिष्ठ वकील कल्याण संघटना (MAJAWA) सध्या नोंदणीपूर्व टप्प्यात आहे. भिवंडी, कल्याण आणि ठाणे येथील संभाव्य संस्थापक सदस्यांशी चर्चेसाठी हा मसुदा तयार केला असून, भविष्यात संपूर्ण महाराष्ट्रात जिल्हा व तालुका स्तरावर विस्तार करण्याचे ध्येय आहे.',
    },
    valuesTitle: { en: 'Our Eight Core Values', mr: 'आमची आठ मूलभूत मूल्ये' },
    values: [
      { en: 'Justice', mr: 'न्याय' },
      { en: 'Dignity', mr: 'सन्मान' },
      { en: 'Equality', mr: 'समानता' },
      { en: 'Integrity', mr: 'प्रामाणिकपणा' },
      { en: 'Transparency', mr: 'पारदर्शकता' },
      { en: 'Unity', mr: 'एकता' },
      { en: 'Professional Excellence', mr: 'व्यावसायिक उत्कृष्टता' },
      { en: 'Mutual Support', mr: 'परस्पर सहकार्य' },
    ],
    positionTitle: { en: 'Our Five-Point Institutional Position', mr: 'आमची पाच-सूत्री संस्थात्मक भूमिका' },
    positions: [
      {
        title: { en: '1. Dignity First', mr: '१. सन्मान प्रथम' },
        desc: { en: 'Every junior advocate is a full member of the Bar and deserves unconditional professional respect.', mr: 'प्रत्येक कनिष्ठ वकील हा बारचा सन्माननीय सदस्य आहे आणि आदरास पात्र आहे.' },
      },
      {
        title: { en: '2. Fair Treatment', mr: '२. न्याय्य वागणूक' },
        desc: { en: 'Agreed remuneration and legitimate out-of-pocket court expenses must be honoured on time.', mr: 'ठरलेले मानधन आणि न्यायालयीन कामकाजाचा प्रत्यक्ष खर्च वेळेत परत मिळणे आवश्यक आहे.' },
      },
      {
        title: { en: '3. Protection', mr: '३. संरक्षण' },
        desc: { en: 'Baseless allegations or client interference against a junior who changes chambers should have lawful remedies.', mr: 'चेंबर बदलणाऱ्या कनिष्ठावर होणारे निराधार आरोप किंवा कामातील हस्तक्षेप यांवर कायदेशीर उपाययोजना असाव्यात.' },
      },
      {
        title: { en: '4. Fair Process for Everyone', mr: '४. सर्वांसाठी न्याय्य प्रक्रिया' },
        desc: { en: 'Seniors are not our enemies; honest seniors are our natural allies. No one is presumed guilty on an allegation alone.', mr: 'ज्येष्ठ वकील आमचे शत्रू नाहीत; प्रामाणिक ज्येष्ठ आमचे नैसर्गिक सहकारी आहेत. केवळ आरोपावरून कोणीही दोषी मानले जाणार नाही.' },
      },
      {
        title: { en: '5. Lawful Methods Only', mr: '५. केवळ कायदेशीर मार्ग' },
        desc: { en: 'Representation, mediation, awareness and proper complaints. No strikes, no boycotts, and no public shaming.', mr: 'निवेदने, मध्यस्थी, जनजागृती आणि रीतसर तक्रारी. कोणताही संप, बहिष्कार किंवा जाहीर बदनामी नाही.' },
      },
    ],
    roadmapTitle: { en: 'Five-Stage Formation & Expansion Roadmap', mr: 'संस्थापना व विस्ताराचा पाच-टप्प्यांचा आराखडा' },
    roadmap: [
      {
        stage: { en: 'Stage 1: Pre-Registration (Current)', mr: 'टप्पा १: नोंदणीपूर्व टप्पा (सध्या)' },
        desc: { en: 'Collect expressions of interest, form a founding cohort of 9 to 11 advocates, and refine the draft charter.', mr: 'स्वारस्य अर्ज संकलन, ९ ते ११ संस्थापक वकिलांचा गट स्थापन करणे आणि मसुद्यास अंतिम स्वरूप देणे.' },
      },
      {
        stage: { en: 'Stage 2: Legal Registration', mr: 'टप्पा २: कायदेशीर नोंदणी' },
        desc: { en: 'Finalise Memorandum of Association & Rules, register under the Societies Registration Act, 1860 & Maharashtra Public Trust process, open association bank account, PAN, and appoint auditor.', mr: 'घटना व नियम अंतिम करणे, सोसायटी नोंदणी कायदा १८६० आणि महाराष्ट्र सार्वजनिक विश्वस्त कायद्यान्वये नोंदणी, संस्थेचे बँक खाते, PAN आणि लेखापरीक्षक नेमणूक.' },
      },
      {
        stage: { en: 'Stage 3: Regional Launch', mr: 'टप्पा ३: प्रादेशिक प्रारंभ' },
        desc: { en: 'Open formal membership across Bhiwandi, Thane, and Kalyan; constitute the independent Grievance Committee; publish the Rights Charter and model engagement letter.', mr: 'भिवंडी, ठाणे आणि कल्याण येथे अधिकृत सदस्यत्व खुले करणे; स्वतंत्र तक्रार निवारण समिती स्थापन करणे; हक्क सनद आणि कार्यकरार पत्र प्रसिद्ध करणे.' },
      },
      {
        stage: { en: 'Stage 4: Institutional Representation', mr: 'टप्पा ४: संस्थात्मक प्रतिनिधित्व' },
        desc: { en: 'Submit data-backed representations to the Bar Council of Maharashtra & Goa, Bar Council of India, and Government of Maharashtra; launch regular training programmes.', mr: 'बार कौन्सिल ऑफ महाराष्ट्र अँड गोवा, बार कौन्सिल ऑफ इंडिया आणि महाराष्ट्र शासनाकडे निवेदने सादर करणे आणि नियमित प्रशिक्षण कार्यक्रम सुरू करणे.' },
      },
      {
        stage: { en: 'Stage 5: Maharashtra-Wide Network', mr: 'टप्पा ५: राज्यव्यापी विस्तार' },
        desc: { en: 'Establish district and taluka units across Maharashtra to support junior advocates statewide.', mr: 'संपूर्ण महाराष्ट्रात जिल्हा व तालुका स्तर युनिट्स स्थापन करून कनिष्ठ वकिलांना बळ देणे.' },
      },
    ],
    commitmentTitle: { en: 'Our Commitment', mr: 'आमची वचनबद्धता' },
    commitmentBody: {
      en: 'Until formal legal registration is completed, MAJAWA will transparently identify itself as a proposed association, will not collect membership fees or donations, and will not claim statutory powers reserved exclusively for Bar Councils or Courts.',
      mr: 'औपचारिक कायदेशीर नोंदणी पूर्ण होईपर्यंत MAJAWA स्वतःचा उल्लेख नेहमी “प्रस्तावित संघटना” असाच करेल, कोणतेही शुल्क किंवा देणगी स्वीकारणार नाही आणि बार कौन्सिल किंवा न्यायालयांचे वैधानिक अधिकार असल्याचा दावा करणार नाही.',
    },
  },
  objectives: {
    title: { en: 'Objectives & Rights Charter', mr: 'उद्दिष्टे आणि हक्क सनद' },
    subtitle: {
      en: 'Four structured pillars of action paired with the proposed 10-Point Junior Advocates’ Rights Charter and strict institutional boundaries.',
      mr: 'कार्यपद्धतीचे चार प्रमुख स्तंभ, प्रस्तावित १०-सूत्री कनिष्ठ वकील हक्क सनद आणि संस्थेच्या स्पष्ट मर्यादा.',
    },
    groups: [
      {
        code: 'A',
        title: { en: 'Financial Welfare', mr: 'आर्थिक कल्याण' },
        items: [
          { en: 'Advocacy for structured stipends and fair minimum remuneration standards, aligned with Bar Council recommendations.', mr: 'बार कौन्सिलच्या शिफारशींनुसार नियमित मानधन आणि किमान आर्थिक मोबदल्यासाठी प्रयत्न.' },
          { en: 'Establishing an Emergency Assistance Fund for genuine hardship, kept strictly separate from administrative accounts.', mr: 'खऱ्या आर्थिक अडचणींसाठी स्वतंत्र आपत्कालीन मदत निधी उभारणे.' },
          { en: 'Medical, accident, and group insurance welfare initiatives for junior advocates.', mr: 'कनिष्ठ वकिलांसाठी वैद्यकीय, अपघात आणि गट विमा कल्याण योजनांसाठी कार्य करणे.' },
          { en: 'Financial awareness, chamber expense transparency, and sustainable local practice-building guidance.', mr: 'आर्थिक साक्षरता, कार्यालयीन खर्चात पारदर्शकता आणि स्थानिक वकिली स्थैर्यासाठी मार्गदर्शन.' },
        ],
      },
      {
        code: 'B',
        title: { en: 'Professional Protection', mr: 'व्यावसायिक संरक्षण' },
        items: [
          { en: 'Promoting a simple written engagement letter specifying duties, payment, expense refunds, own-client rights, and notice terms.', mr: 'कर्तव्ये, मानधन, खर्च परतफेड, स्वतःच्या अशीलांचे हक्क आणि नोटीस अटी स्पष्ट करणारे साधे लेखी कार्यकरार पत्र प्रोत्साहित करणे.' },
          { en: 'Publishing a voluntary Ethical Chamber Code so supportive seniors may be recognised as MAJAWA Ethical Chamber Supporters.', mr: 'ऐच्छिक नैतिक चेंबर संहिता प्रसिद्ध करून सहकार्य करणाऱ्या ज्येष्ठ वकिलांना सन्मानित करणे.' },
          { en: 'Confidential mediation for payment and expense disputes before formal action, plus guidance on remedies under civil, criminal, and Bar Council forums (Sec. 35, Advocates Act, 1961).', mr: 'मानधन व खर्च वादांमध्ये गोपनीय मध्यस्थी तसेच दिवाणी, फौजदारी व बार कौन्सिल (कलम ३५, वकील कायदा १९६१) मंचाकडे जाण्यासाठी मार्गदर्शन.' },
          { en: 'Protecting members from baseless defamation, client interference, or retaliation for bona fide complaints.', mr: 'चेंबर बदलल्यावर होणारी बदनामी, कामातील हस्तक्षेप किंवा सद्भावनेने केलेल्या तक्रारीवरील सूडबुद्धीच्या कारवाईपासून संरक्षण.' },
        ],
      },
      {
        code: 'C',
        title: { en: 'Professional Development', mr: 'व्यावसायिक विकास' },
        items: [
          { en: 'Practical drafting and pleading workshops across civil, criminal, and writ practice.', mr: 'दिवाणी, फौजदारी आणि रिट कामकाजावरील व्यावहारिक मसुदा लेखन कार्यशाळा.' },
          { en: 'Structured training on BNS, BNSS, BSA, legal research methods, and legal database access.', mr: 'BNS, BNSS, BSA कायदे, कायदेशीर संशोधन आणि कायदेशीर डेटाबेस वापराचे प्रशिक्षण.' },
          { en: 'Courtroom advocacy clinics, moot court competitions, and mock trials.', mr: 'न्यायालयीन युक्तिवाद सत्रे, अभिरूप न्यायालय (Moot Court) आणि सराव खटले.' },
          { en: 'English legal communication, legal writing workshops, and pairing with willing senior mentors.', mr: 'कायदेशीर इंग्रजी संवाद व लेखन कार्यशाळा आणि अनुभवी ज्येष्ठांसोबत मार्गदर्शन जोडणी.' },
        ],
      },
      {
        code: 'D',
        title: { en: 'Institutional Representation', mr: 'संस्थात्मक प्रतिनिधित्व' },
        items: [
          { en: 'Formal representations before the Bar Council of Maharashtra and Goa, Bar Council of India, and Government of Maharashtra.', mr: 'बार कौन्सिल ऑफ महाराष्ट्र अँड गोवा, बार कौन्सिल ऑफ इंडिया आणि महाराष्ट्र शासनाकडे रीतसर निवेदने सादर करणे.' },
          { en: 'Empirical surveys on junior advocates’ income and working conditions so policy demands rest on verified data.', mr: 'कनिष्ठ वकिलांचे उत्पन्न आणि कार्यस्थिती यावर सर्वेक्षण करून पुराव्यावर आधारित धोरणात्मक मागण्या मांडणे.' },
          { en: 'Constructive welfare policy recommendations and cooperation with local Bar Associations in Bhiwandi, Kalyan, and Thane.', mr: 'भिवंडी, कल्याण आणि ठाणे येथील स्थानिक बार असोसिएशनसोबत समन्वय व कल्याणकारी सूचना.' },
        ],
      },
    ],
    charterTitle: { en: 'Junior Advocates’ Rights Charter (Proposed)', mr: 'कनिष्ठ वकील हक्क सनद (प्रस्तावित)' },
    charterItems: [
      { en: 'Every junior advocate deserves dignity and respect.', mr: 'प्रत्येक कनिष्ठ वकिलाला सन्मान आणि आदराची वागणूक मिळालीच पाहिजे.' },
      { en: 'Agreed remuneration must be paid on time.', mr: 'ठरलेले मानधन वेळेवर दिले गेलेच पाहिजे.' },
      { en: 'Reasonable out-of-pocket expenses incurred for the senior’s matters must be refunded.', mr: 'ज्येष्ठांच्या प्रकरणांसाठी कनिष्ठाने केलेला रास्त खर्च परत मिळालाच पाहिजे.' },
      { en: 'Engagement terms should be clear and preferably written.', mr: 'कामाच्या अटी स्पष्ट आणि शक्यतो लेखी असाव्यात.' },
      { en: 'Juniors should receive genuine training and exposure to real work.', mr: 'कनिष्ठांना प्रत्यक्ष कामाचा अनुभव आणि खरे प्रशिक्षण मिळाले पाहिजे.' },
      { en: 'No junior should be defamed, threatened or intimidated for leaving or changing a chamber.', mr: 'चेंबर सोडल्यामुळे किंवा बदलल्यामुळे कोणत्याही कनिष्ठाची बदनामी, धमकी किंवा दडपण आणले जाऊ नये.' },
      { en: 'A junior’s freedom to practise and build his own clientele, within the rules of the profession, must be respected.', mr: 'व्यावसायिक नियमांच्या अधीन राहून स्वतःची वकिली व अशीलवर्ग घडविण्याच्या कनिष्ठाच्या स्वातंत्र्याचा सन्मान व्हावा.' },
      { en: 'Grievances must be heard fairly and confidentially.', mr: 'तक्रारींची सुनावणी न्याय्य आणि गोपनीय पद्धतीने झाली पाहिजे.' },
      { en: 'Seniority carries a responsibility to mentor.', mr: 'ज्येष्ठतेसोबत नवीन पिढीला घडविण्याची जबाबदारी येते.' },
      { en: 'Juniors should have a seat at the table where welfare policy is discussed.', mr: 'कल्याणकारी धोरणांच्या चर्चेत कनिष्ठ वकिलांचे प्रतिनिधित्व असले पाहिजे.' },
    ],
    neverTitle: { en: 'What MAJAWA Will Never Do', mr: 'MAJAWA कधीही काय करणार नाही' },
    neverSubtitle: {
      en: 'A movement that respects legal process is harder to attack and easier to trust.',
      mr: 'कायदेशीर प्रक्रियेचा सन्मान करणारी चळवळ अधिक विश्वासार्ह आणि भक्कम असते.',
    },
    neverItems: [
      { en: 'Declare any advocate guilty of professional misconduct — that statutory power belongs strictly to the Bar Council.', mr: 'कोणत्याही वकिलाला व्यावसायिक गैरवर्तनाबद्दल दोषी जाहीर करणार नाही — तो अधिकार केवळ बार कौन्सिलचा आहे.' },
      { en: 'Call for strikes, coercive boycotts, or disruption of court proceedings.', mr: 'संप, बळजबरीचा बहिष्कार किंवा न्यायालयीन कामकाजात अडथळा आणण्याचे आवाहन करणार नाही.' },
      { en: 'Publish unverified allegations or publicly name senior advocates based on a complaint.', mr: 'तक्रारीच्या आधारे अपुष्ट आरोप किंवा ज्येष्ठ वकिलांची नावे जाहीर करणार नाही.' },
      { en: 'Take sides in party politics.', mr: 'पक्षीय राजकारणात कोणतीही बाजू घेणार नाही.' },
      { en: 'Interfere with the independence of courts or Bar Councils.', mr: 'न्यायालये किंवा बार कौन्सिलच्या स्वातंत्र्यात हस्तक्षेप करणार नाही.' },
      { en: 'Distribute association funds as profit among members.', mr: 'संस्थेचा निधी सदस्यांमध्ये नफा म्हणून वाटणार नाही.' },
    ],
  },
  welfare: {
    title: { en: 'Junior Advocate Welfare', mr: 'कनिष्ठ वकील कल्याण उपक्रम' },
    subtitle: {
      en: 'Addressing financial insecurity, emergency hardship, medical protection, mentorship, and resource access — marked transparently as proposed until formally instituted.',
      mr: 'आर्थिक अस्थिरता, आपत्कालीन अडचणी, वैद्यकीय संरक्षण, मार्गदर्शन आणि कायदेशीर संसाधने — औपचारिक स्थापनेपर्यंत सर्व उपक्रम स्पष्टपणे “प्रस्तावित” म्हणून नमूद केले आहेत.',
    },
    sectionTitle: { en: 'Our Proposed Welfare Initiatives', mr: 'आमचे प्रस्तावित कल्याणकारी उपक्रम' },
    proposedTag: { en: 'Proposed · Pending Registration & Rules Approval', mr: 'प्रस्तावित · नोंदणी व नियमांच्या मंजुरीच्या अधीन' },
    initiatives: [
      {
        title: { en: 'Structured Stipend & Fair Remuneration Framework', mr: 'नियमित मानधन व न्याय्य मोबदला आराखडा' },
        focus: { en: 'Financial Security', mr: 'आर्थिक सुरक्षा' },
        desc: {
          en: 'Promoting adoption of written chamber engagement letters with transparent monthly stipends, clear reimbursement timelines for court filing/travel expenses, and alignment with Bar Council stipend recommendations.',
          mr: 'लेखी कार्यकराराद्वारे मासिक मानधन, न्यायालयीन व प्रवास खर्चाच्या परतफेडीची स्पष्ट मुदत आणि बार कौन्सिलच्या मानधन शिफारशींच्या अंमलबजावणीसाठी पाठपुरावा.',
        },
      },
      {
        title: { en: 'Separate Emergency Hardship Assistance Fund', mr: 'स्वतंत्र आपत्कालीन आर्थिक सहाय्य निधी' },
        focus: { en: 'Crisis Support', mr: 'संकटकालीन मदत' },
        desc: {
          en: 'Proposed dedicated welfare pool kept strictly separate from administrative accounts to assist registered junior members facing acute family medical crises, bereavement, or severe temporary hardship.',
          mr: 'नोंदणीकृत कनिष्ठ सदस्यांवर कुटुंबातील गंभीर आजारपण किंवा तीव्र आर्थिक संकट आल्यास मदतीसाठी प्रशासकीय खात्यापासून पूर्णपणे वेगळा निधी.',
        },
      },
      {
        title: { en: 'Medical, Accident & Group Insurance Facilitation', mr: 'वैद्यकीय, अपघात व गट विमा सुविधा' },
        focus: { en: 'Health & Protection', mr: 'आरोग्य व संरक्षण' },
        desc: {
          en: 'Exploring institutional group health and accident coverage options alongside guidance on existing State Bar Council and statutory advocate welfare schemes.',
          mr: 'राज्य बार कौन्सिल व वैधानिक वकील कल्याण योजनांची माहिती देण्यासोबतच गट आरोग्य व अपघात विमा पर्यायांचा अभ्यास व पाठपुरावा.',
        },
      },
      {
        title: { en: 'Senior–Junior Mentorship & Ethical Chambers', mr: 'ज्येष्ठ-कनिष्ठ मार्गदर्शन आणि नैतिक चेंबर्स' },
        focus: { en: 'Career Sustainability', mr: 'कारकीर्द स्थैर्य' },
        desc: {
          en: 'Connecting junior advocates with Ethical Chamber Supporters committed to genuine courtroom exposure, respectful guidance, and enabling young advocates to build viable practices locally in Bhiwandi, Kalyan, and Thane.',
          mr: 'प्रत्यक्ष न्यायालयीन अनुभव देणाऱ्या नैतिक चेंबर समर्थकांशी जोडणी करून भिवंडी, कल्याण व ठाणे येथे स्थानिक पातळीवर सक्षम वकिली उभारण्यास सहाय्य.',
        },
      },
      {
        title: { en: 'Shared Legal Research & Database Access', mr: 'सामायिक कायदेशीर संशोधन व संदर्भ सुविधा' },
        focus: { en: 'Resource Access', mr: 'साधनसंपत्ती उपलब्धता' },
        desc: {
          en: 'Working toward affordable collective access to digital law libraries, bare acts, model pleadings, and practice manuals so independent juniors are not held back by subscription costs.',
          mr: 'डिजिटल कायदा ग्रंथालये, बेअर अॅक्ट्स आणि मसुदा नमुने अल्प खर्चात उपलब्ध करून देण्यासाठी सामूहिक उपक्रम.',
        },
      },
      {
        title: { en: 'Income & Working Conditions Data Surveys', mr: 'उत्पन्न व कार्यस्थिती सर्वेक्षण' },
        focus: { en: 'Evidence-Based Advocacy', mr: 'पुराव्यावर आधारित मांडणी' },
        desc: {
          en: 'Conducting anonymised surveys among junior advocates across Maharashtra to present factual, data-driven memoranda to Bar Councils and government welfare bodies.',
          mr: 'महाराष्ट्रातील कनिष्ठ वकिलांचे गोपनीय सर्वेक्षण करून बार कौन्सिल आणि शासनाकडे वस्तुनिष्ठ निवेदने सादर करणे.',
        },
      },
    ],
  },
  grievance: {
    heading: { en: 'Your Professional Dignity Matters.', mr: 'तुमचा व्यावसायिक सन्मान महत्त्वाचा आहे.' },
    intro: {
      en: 'MAJAWA intends to establish a confidential Junior Advocates Grievance Redressal and Professional Protection Committee. Every enquiry submitted here is kept strictly private, never published publicly, and never opened to public comments.',
      mr: 'MAJAWA तर्फे गोपनीय कनिष्ठ वकील तक्रार निवारण आणि व्यावसायिक संरक्षण समिती स्थापन करण्याचा प्रस्ताव आहे. येथे नोंदवलेली प्रत्येक चौकशी पूर्णपणे गोपनीय ठेवली जाते आणि ती कधीही जाहीर केली जात नाही.',
    },
    concernsTitle: { en: 'Matters Covered for Confidential Guidance', mr: 'गोपनीय मार्गदर्शनासाठी समाविष्ट विषय' },
    concerns: [
      { en: 'Non-payment or arbitrary withholding of agreed remuneration / stipend.', mr: 'ठरलेले मानधन न देणे किंवा अनावश्यकपणे रोखून ठेवणे.' },
      { en: 'Unreimbursed out-of-pocket court fees, filing, travel, or copying expenses.', mr: 'कोर्ट फी, फाईलिंग, प्रवास किंवा झेरॉक्स खर्चाची परतफेड न होणे.' },
      { en: 'Unfair working arrangements, absence of agreed terms, or sudden arbitrary dismissal.', mr: 'अन्याय्य कामाच्या अटी, लेखी कराराचा अभाव किंवा अचानक काढून टाकणे.' },
      { en: 'Workplace harassment, intimidation, or baseless defamation after leaving a chamber.', mr: 'कामाच्या ठिकाणी छळ, धमकी किंवा चेंबर सोडल्यानंतर होणारी निराधार बदनामी.' },
      { en: 'Interference with a junior’s independent clients or professional difficulties requiring mentorship.', mr: 'कनिष्ठाच्या स्वतंत्र अशीलांच्या कामात हस्तक्षेप किंवा व्यावसायिक अडचणींसाठी मार्गदर्शन.' },
    ],
    processTitle: { en: 'Proposed 6-Step Confidential Process', mr: 'प्रस्तावित ६-टप्प्यांची गोपनीय प्रक्रिया' },
    processSteps: [
      { step: '01', title: { en: 'Confidential Submission', mr: 'गोपनीय नोंदणी' }, desc: { en: 'Submit in writing through this secure confidential channel.', mr: 'या सुरक्षित गोपनीय मंचाद्वारे लेखी स्वरूपात माहिती पाठवा.' } },
      { step: '02', title: { en: 'Acknowledgement (7 Working Days)', mr: 'पोचपावती (७ कामकाजाचे दिवस)' }, desc: { en: 'Preliminary acknowledgement issued with a unique reference number.', mr: 'स्वतंत्र संदर्भ क्रमांकासह प्राथमिक पोचपावती दिली जाते.' } },
      { step: '03', title: { en: 'Scrutiny (~15 Days)', mr: 'प्राथमिक छाननी (सुमारे १५ दिवस)' }, desc: { en: 'Reviewed by committee members independent of the Governing Body; conflicted members recuse.', mr: 'संचालक मंडळाबाहेरील किमान दोन स्वतंत्र सदस्यांकडून तपासणी; हितसंबंध असलेले सदस्य बाजूला राहतात.' } },
      { step: '04', title: { en: 'Fair Hearing for Both Sides', mr: 'दोन्ही बाजूंचे न्याय्य ऐकणे' }, desc: { en: 'Where mediation is pursued, both sides receive a fair, respectful opportunity to respond.', mr: 'मध्यस्थीच्या टप्प्यावर दोन्ही बाजूंना सन्मानपूर्वक म्हणणे मांडण्याची संधी दिली जाते.' } },
      { step: '05', title: { en: 'Recommendation & Guidance', mr: 'शिफारस व मार्गदर्शन' }, desc: { en: 'Conciliation, settlement, legal guidance, referral to the Bar Council (Sec. 35) / courts / police, or closure.', mr: 'समेट, तडजोड, कायदेशीर मार्गदर्शन, बार कौन्सिल (कलम ३५) / न्यायालय / पोलिसांकडे संदर्भ किंवा प्रकरण बंद.' } },
      { step: '06', title: { en: 'Follow-Up & Record', mr: 'पाठपुरावा व नोंद' }, desc: { en: 'Confidential follow-up to guard against retaliation and record outcome.', mr: 'सूडबुद्धीची कारवाई होऊ नये म्हणून गोपनीय पाठपुरावा व नोंद.' } },
    ],
    disclaimer: {
      en: 'MAJAWA is not a statutory disciplinary authority and does not replace the jurisdiction of the Bar Council, courts or other competent authorities. Submission of an enquiry does not create an advocate-client relationship or guarantee a particular legal remedy.',
      mr: 'MAJAWA ही वैधानिक शिस्तभंग प्राधिकरण नाही आणि ती बार कौन्सिल, न्यायालये किंवा अन्य सक्षम प्राधिकरणांची जागा घेत नाही. येथे चौकशी सादर केल्यामुळे वकील-अशील संबंध निर्माण होत नाही किंवा विशिष्ट कायदेशीर उपायाची हमी मिळत नाही.',
    },
    privacyReminder: {
      en: 'Security Notice: Do not share passwords, Aadhaar numbers, bank PINs, or sensitive third-party identity documents in this preliminary form.',
      mr: 'सुरक्षा सूचना: कृपया या प्राथमिक अर्जामध्ये पासवर्ड, आधार क्रमांक, बँक पिन किंवा अनावश्यक संवेदनशील कागदपत्रे नमूद करू नका.',
    },
  },
};
