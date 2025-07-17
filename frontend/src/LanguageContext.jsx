import React, { createContext, useContext, useState } from 'react';

const translations = {
  English: {
    mainTitle: ['MAHA', 'AROGYA', 'PULSE'],
    
    navbar: [
      { name: 'Home', link: '#', active: true },
      
    ],
    updates: [
      'eSanjeevani (Telemedicine) Services',
      'Covid19 Updates',
      'New Schemes Announced',
    ],
    footer: {
      company: 'Sarvaa Analytics',
      slogan: 'Empowering Health with Technology',
      contact: 'Contact',
      phone: 'Phone: +91-9876543210',
      email: 'Email: info@sarvaaanalytics.com',
      address: 'Address: 123, Tech Park, Mumbai, Maharashtra, India',
      follow: 'Follow Us',
      facebook: 'Facebook',
      twitter: 'Twitter',
      linkedin: 'LinkedIn',
    },
    chatbot: {
      exampleQuestions: [
        'Who is the current Chief Minister of Maharashtra?',
        'What is the structure of the Maharashtra State Legislature?',
        'Which major schemes are run by the Maharashtra Government for farmers?',
        'Hi! How can I help you with Maharashtra Health Department information today?'
      ],
      welcome: 'Hi! How can I help you with Maharashtra Health Department information today?',
      send: 'Send',
      inputPlaceholder: 'I Ask anything..',
    },
    budget: {
      pageTitle: 'Health Minister Budget Overview',
      selectDepartment: 'Select a Department',
      totalBudget: 'Total Budget',
      departmentBudget: 'Department Budget',
      pieChartTitle: 'Budget Distribution',
      barChartTitle: 'Yearly Budget Trend',
      departments: [
        'Public Health',
        'Medical Education',
        'AYUSH',
        'Family Welfare',
        'National Health Mission',
        'Other'
      ]
    }
  },
  Hindi: {
    mainTitle: ['महा', 'आरोग्य', 'पल्स'],
 
    navbar: [
      { name: 'होम', link: '#', active: true },
    
    ],
    updates: [
      'ई-संजीवनी (टेलीमेडिसिन) सेवाएँ',
      'कोविड19 अपडेट्स',
      'नई योजनाएँ घोषित',
    ],
    footer: {
      company: 'सर्वा एनालिटिक्स',
      slogan: 'प्रौद्योगिकी के साथ स्वास्थ्य को सशक्त बनाना',
      contact: 'संपर्क करें',
      phone: 'फोन: +91-9876543210',
      email: 'ईमेल: info@sarvaaanalytics.com',
      address: 'पता: 123, टेक पार्क, मुंबई, महाराष्ट्र, भारत',
      follow: 'हमें फॉलो करें',
      facebook: 'फेसबुक',
      twitter: 'ट्विटर',
      linkedin: 'लिंक्डइन',
    },
    chatbot: {
      exampleQuestions: [
        'महाराष्ट्र के वर्तमान मुख्यमंत्री कौन हैं?',
        'महाराष्ट्र राज्य विधानमंडल की संरचना क्या है?',
        'महाराष्ट्र सरकार द्वारा किसानों के लिए कौन सी प्रमुख योजनाएँ चलाई जाती हैं?',
        'नमस्ते! मैं महाराष्ट्र स्वास्थ्य विभाग की जानकारी में आपकी कैसे मदद कर सकता हूँ?'
      ],
      welcome: 'नमस्ते! मैं महाराष्ट्र स्वास्थ्य विभाग की जानकारी में आपकी कैसे मदद कर सकता हूँ?',
      send: 'भेजें',
      inputPlaceholder: 'कुछ भी पूछें..',
    },
    budget: {
      pageTitle: 'स्वास्थ्य मंत्री बजट अवलोकन',
      selectDepartment: 'विभाग चुनें',
      totalBudget: 'कुल बजट',
      departmentBudget: 'विभागीय बजट',
      pieChartTitle: 'बजट वितरण',
      barChartTitle: 'वार्षिक बजट प्रवृत्ति',
      departments: [
        'सार्वजनिक स्वास्थ्य',
        'चिकित्सा शिक्षा',
        'आयुष',
        'परिवार कल्याण',
        'राष्ट्रीय स्वास्थ्य मिशन',
        'अन्य'
      ]
    }
  },
  Marathi: {
    mainTitle: ['महा', 'आरोग्य', 'पल्स'],
   
    navbar: [
      { name: 'मुख्यपृष्ठ', link: '#', active: true },
      
    ],
    updates: [
      'ई-संजीवनी (टेलीमेडिसिन) सेवा',
      'कोविड19 अद्यतने',
      'नवीन योजना जाहीर',
    ],
    footer: {
      company: 'सर्वा एनालिटिक्स',
      slogan: 'तंत्रज्ञानासह आरोग्य सक्षम करणे',
      contact: 'संपर्क',
      phone: 'फोन: +91-9876543210',
      email: 'ईमेल: info@sarvaaanalytics.com',
      address: 'पत्ता: 123, टेक पार्क, मुंबई, महाराष्ट्र, भारत',
      follow: 'आम्हाला फॉलो करा',
      facebook: 'फेसबुक',
      twitter: 'ट्विटर',
      linkedin: 'लिंक्डइन',
    },
    chatbot: {
      exampleQuestions: [
        'सध्याचे महाराष्ट्राचे मुख्यमंत्री कोण आहेत?',
        'महाराष्ट्र राज्य विधिमंडळाची रचना काय आहे?',
        'महाराष्ट्र सरकार शेतकऱ्यांसाठी कोणत्या प्रमुख योजना चालवते?',
        'नमस्कार! मी महाराष्ट्र आरोग्य विभागाच्या माहितीसाठी कशी मदत करू शकतो?'
      ],
      welcome: 'नमस्कार! मी महाराष्ट्र आरोग्य विभागाच्या माहितीसाठी कशी मदत करू शकतो?',
      send: 'पाठवा',
      inputPlaceholder: 'काहीही विचारा..',
    },
    budget: {
      pageTitle: 'आरोग्य मंत्री अर्थसंकल्पाचा आढावा',
      selectDepartment: 'विभाग निवडा',
      totalBudget: 'एकूण अर्थसंकल्प',
      departmentBudget: 'विभागाचा अर्थसंकल्प',
      pieChartTitle: 'अर्थसंकल्प वितरण',
      barChartTitle: 'वार्षिक अर्थसंकल्प प्रवृत्ती',
      departments: [
        'सार्वजनिक आरोग्य',
        'वैद्यकीय शिक्षण',
        'आयुष',
        'कुटुंब कल्याण',
        'राष्ट्रीय आरोग्य अभियान',
        'इतर'
      ]
    }
  }
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('English');
  const value = {
    language,
    setLanguage,
    t: translations[language],
  };
  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
} 