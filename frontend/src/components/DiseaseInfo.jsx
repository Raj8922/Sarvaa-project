import React from "react";

const diseaseColors = {
  tb: "#c20000",
  cancer: "#6d28d9",
  hiv: "#e11d48",
  dengue: "#f59e42",
  malaria: "#388e3c",
  chikungunya: "#1976d2",
  cholera: "#00bcd4",
  gastroenteritis: "#43a047",
  diarrhea: "#fbc02d",
  jaundice: "#ffb300",
  typhoid: "#8d6e63"
};
const diseaseIcons = {
  tb: "🫁",
  cancer: "🎗️",
  hiv: "🧬",
  dengue: "🦟",
  malaria: "🦟",
  chikungunya: "🦟",
  cholera: "💧",
  gastroenteritis: "🍽️",
  diarrhea: "🚰",
  jaundice: "🟡",
  typhoid: "🧫"
};

const diseaseData = {
  tb: {
    name: "Tuberculosis (TB)",
    overview:
      "Tuberculosis (TB) is a potentially serious infectious disease that mainly affects the lungs. It spreads through the air when an infected person coughs or sneezes.",
    concerns: [
      "Severe lung damage",
      "Spread to other organs (brain, spine, kidneys)",
      "Drug-resistant TB",
      "Death if untreated"
    ],
    prevention: [
      "Early detection and treatment",
      "Cover mouth and nose when coughing or sneezing",
      "Ensure good ventilation in living spaces",
      "Complete the full course of TB medication"
    ],
    documents: [
      { name: "WHO TB Fact Sheet", url: "https://www.who.int/news-room/fact-sheets/detail/tuberculosis" },
      { name: "TB Guidelines (PDF)", url: "https://tbcindia.gov.in/WriteReadData/l892s/832092935TB%20Guidelines.pdf" }
    ]
  },
  cancer: {
    name: "Cancer",
    overview:
      "Cancer is a group of diseases involving abnormal cell growth with the potential to invade or spread to other parts of the body. Early detection and treatment are crucial.",
    concerns: [
      "Spread to other organs (metastasis)",
      "Organ failure",
      "Severe pain and complications",
      "Death if untreated"
    ],
    prevention: [
      "Avoid tobacco and limit alcohol",
      "Eat a healthy diet rich in fruits and vegetables",
      "Exercise regularly",
      "Get regular screenings (mammogram, Pap smear, etc.)",
      "Vaccinate against cancer-causing viruses (HPV, Hepatitis B)"
    ],
    documents: [
      { name: "WHO Cancer Fact Sheet", url: "https://www.who.int/news-room/fact-sheets/detail/cancer" },
      { name: "Cancer Awareness (PDF)", url: "https://www.cancerindia.org.in/wp-content/uploads/2017/11/Cancer-Awareness.pdf" }
    ]
  },
  hiv: {
    name: "HIV/AIDS",
    overview:
      "HIV (Human Immunodeficiency Virus) attacks the immune system and can lead to AIDS (Acquired Immunodeficiency Syndrome). It is a lifelong condition but can be managed with medication.",
    concerns: [
      "Severe immune suppression",
      "Opportunistic infections",
      "Cancers associated with HIV",
      "Death if untreated"
    ],
    prevention: [
      "Practice safe sex (use condoms)",
      "Get tested regularly",
      "Do not share needles",
      "Take antiretroviral therapy if diagnosed"
    ],
    documents: [
      { name: "WHO HIV/AIDS Fact Sheet", url: "https://www.who.int/news-room/fact-sheets/detail/hiv-aids" },
      { name: "HIV/AIDS Guidelines (PDF)", url: "https://naco.gov.in/sites/default/files/NACO%20National%20HIV%20Testing%20Guidelines.pdf" }
    ]
  },
  dengue: {
    name: "Dengue",
    overview:
      "Dengue is a mosquito-borne viral infection causing flu-like illness and, occasionally, developing into severe dengue. It is common in tropical and subtropical climates.",
    concerns: [
      "Severe dengue (dengue hemorrhagic fever)",
      "Shock syndrome",
      "Organ failure",
      "Death if untreated"
    ],
    prevention: [
      "Avoid mosquito bites (use nets, repellents)",
      "Eliminate standing water",
      "Wear long-sleeved clothing",
      "Community fogging during outbreaks"
    ],
    documents: [
      { name: "WHO Dengue Fact Sheet", url: "https://www.who.int/news-room/fact-sheets/detail/dengue-and-severe-dengue" }
    ]
  },
  malaria: {
    name: "Malaria",
    overview:
      "Malaria is a life-threatening disease caused by parasites transmitted through the bites of infected mosquitoes. It is preventable and curable.",
    concerns: [
      "Severe anemia",
      "Organ failure",
      "Cerebral malaria (brain infection)",
      "Death if untreated"
    ],
    prevention: [
      "Use insecticide-treated bed nets",
      "Eliminate standing water",
      "Take antimalarial medication if recommended",
      "Wear protective clothing"
    ],
    documents: [
      { name: "WHO Malaria Fact Sheet", url: "https://www.who.int/news-room/fact-sheets/detail/malaria" },
      { name: "Malaria Prevention (PDF)", url: "https://www.cdc.gov/malaria/resources/pdf/fsp/english/fs_malaria.pdf" }
    ]
  },
  chikungunya: {
    name: "Chikungunya",
    overview:
      "Chikungunya is a viral disease transmitted to humans by infected mosquitoes. It causes fever and severe joint pain.",
    concerns: [
      "Severe joint pain (can last for months)",
      "Fatigue",
      "Rarely, neurological complications"
    ],
    prevention: [
      "Avoid mosquito bites (nets, repellents)",
      "Eliminate standing water",
      "Wear long-sleeved clothing"
    ],
    documents: [
      { name: "WHO Chikungunya Fact Sheet", url: "https://www.who.int/news-room/fact-sheets/detail/chikungunya" }
    ]
  },
  cholera: {
    name: "Cholera",
    overview:
      "Cholera is an acute diarrheal infection caused by ingesting contaminated food or water. It can cause severe dehydration and death if untreated.",
    concerns: [
      "Severe dehydration",
      "Shock",
      "Death if untreated"
    ],
    prevention: [
      "Drink safe, clean water",
      "Practice good hand hygiene",
      "Proper sanitation and food safety"
    ],
    documents: [
      { name: "WHO Cholera Fact Sheet", url: "https://www.who.int/news-room/fact-sheets/detail/cholera" }
    ]
  },
  gastroenteritis: {
    name: "Gastroenteritis",
    overview:
      "Gastroenteritis is an intestinal infection marked by diarrhea, cramps, nausea, vomiting, and fever. It is usually caused by viruses, bacteria, or parasites.",
    concerns: [
      "Severe dehydration",
      "Electrolyte imbalance",
      "Hospitalization in severe cases"
    ],
    prevention: [
      "Wash hands frequently",
      "Drink clean water",
      "Eat properly cooked food",
      "Avoid street food during outbreaks"
    ],
    documents: [
      { name: "CDC Gastroenteritis Info", url: "https://www.cdc.gov/ncidod/dvrd/revb/gastroenteritis.htm" }
    ]
  },
  diarrhea: {
    name: "Diarrhea",
    overview:
      "Diarrhea is a common condition that involves frequent, loose, or watery bowel movements. It can lead to dehydration, especially in children and the elderly.",
    concerns: [
      "Severe dehydration",
      "Malnutrition",
      "Death in vulnerable populations"
    ],
    prevention: [
      "Drink safe water",
      "Practice good hygiene",
      "Proper sanitation",
      "Breastfeeding for infants"
    ],
    documents: [
      { name: "WHO Diarrhea Fact Sheet", url: "https://www.who.int/news-room/fact-sheets/detail/diarrhoeal-disease" }
    ]
  },
  jaundice: {
    name: "Jaundice",
    overview:
      "Jaundice is a condition that causes yellowing of the skin and eyes due to high bilirubin levels. It is often a symptom of underlying liver disease or infection.",
    concerns: [
      "Liver failure",
      "Chronic hepatitis",
      "Serious underlying disease"
    ],
    prevention: [
      "Vaccinate against hepatitis",
      "Avoid contaminated food and water",
      "Practice safe sex",
      "Avoid alcohol abuse"
    ],
    documents: [
      { name: "MedlinePlus Jaundice Info", url: "https://medlineplus.gov/jaundice.html" }
    ]
  },
  typhoid: {
    name: "Typhoid",
    overview:
      "Typhoid fever is a bacterial infection due to Salmonella typhi, spread through contaminated food and water. It can be life-threatening if untreated.",
    concerns: [
      "Intestinal perforation",
      "Sepsis",
      "Death if untreated"
    ],
    prevention: [
      "Drink safe water",
      "Wash hands frequently",
      "Vaccination",
      "Eat well-cooked food"
    ],
    documents: [
      { name: "WHO Typhoid Fact Sheet", url: "https://www.who.int/news-room/fact-sheets/detail/typhoid" }
    ]
  }
};

const DiseaseInfo = ({ diseaseKey, onClose }) => {
  const info = diseaseData[diseaseKey];
  const color = diseaseColors[diseaseKey] || "#c20000";
  const icon = diseaseIcons[diseaseKey] || "💊";
  if (!info) return null;
  return (
    <div className="disease-info-modal" style={{ '--disease-color': color }}>
      <button className="disease-info-close" onClick={onClose}>&times;</button>
      <h2>
        <span className="disease-info-avatar" style={{ background: color }}>{icon}</span>
        {info.name} Information
      </h2>
      <p><b>Overview:</b> {info.overview}</p>
      <div>
        <span className="section-title">Serious Health Concerns:</span>
        <ul>
          {info.concerns.map((c, i) => <li key={i}>{c}</li>)}
        </ul>
      </div>
      <div>
        <span className="section-title">Prevention Tips:</span>
        <ul>
          {info.prevention.map((c, i) => <li key={i}>{c}</li>)}
        </ul>
      </div>
      <div>
        <span className="section-title">Documents & Resources:</span>
        <ul>
          {info.documents.map((doc, i) => (
            <li key={i}><a href={doc.url} target="_blank" rel="noopener noreferrer">{doc.name}</a></li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DiseaseInfo;
export { diseaseData, diseaseColors, diseaseIcons }; 