import cities from "cities.json";

type City = {
  name: string;
  country: string;
  lat: string;
  lng: string;
};

// Map country slug to 2-letter ISO code
const countryCodeMap: Record<string, string> = {
  "pakistan": "PK",
  "saudi-arabia": "SA",
  "united-arab-emirates": "AE",
  "united-kingdom": "GB",
  "united-states": "US",
  "canada": "CA",
  "australia": "AU",
  "turkey": "TR",
  "malaysia": "MY",
  "indonesia": "ID",
  "bangladesh": "BD",
  "egypt": "EG",
  "india": "IN",
  "qatar": "QA",
  "kuwait": "KW",
  "oman": "OM",
  "bahrain": "BH",
  "iraq": "IQ",
  "jordan": "JO",
  "lebanon": "LB",
  "syria": "SY",
  "yemen": "YE",
  "libya": "LY",
  "tunisia": "TN",
  "morocco": "MA",
  "algeria": "DZ",
  "afghanistan": "AF",
  "palestine": "PS",
  "iran": "IR",
  "israel": "IL",
  "south-africa": "ZA",
  "namibia": "NA",
  "botswana": "BW",
  "lesotho": "LS",
  "swaziland": "SZ",
  "kenya": "KE",
  "tanzania": "TZ",
  "uganda": "UG",
  "rwanda": "RW",
  "burundi": "BI",
  "mozambique": "MZ",
  "zambia": "ZM",
  "zimbabwe": "ZW",
  "angola": "AO",
  "cameroon": "CM",
  "congo": "CG",
  "gabon": "GA",
  "ghana": "GH",
  "guinea": "GN",
  "guinea-bissau": "GW",
  "ivory-coast": "CI",
  "liberia": "LR",
  "mali": "ML",
  "mauritania": "MR",
  "mauritius": "MU",
  "niger": "NE",
  "nigeria": "NG",
  "senegal": "SN",
  "sierra-leone": "SL",
  "somalia": "SO",
  "south-sudan": "SS",
  "sudan": "SD",
  "benin": "BJ",
  "burkina-faso": "BF",
  "cape-verde": "CV",
  "central-african-republic": "CF",
  "chad": "TD",
  "comoros": "KM",
  "democratic-republic-of-congo": "CD",
  "djibouti": "DJ",
  "equatorial-guinea": "GQ",
  "eritrea": "ER",
  "ethiopia": "ET",
  "gambia": "GM",
  "madagascar": "MG",
  "malawi": "MW",
  "sao-tome-and-principe": "ST",
  "seychelles": "SC",
  "togo": "TG",
  "armenia": "AM",
  "azerbaijan": "AZ",
  "brunei": "BN",
  "cambodia": "KH",
  "china": "CN",
  "georgia": "GE",
  "hong-kong": "HK",
  "japan": "JP",
  "kazakhstan": "KZ",
  "kyrgyzstan": "KG",
  "laos": "LA",
  "maldives": "MV",
  "mongolia": "MN",
  "myanmar": "MM",
  "nepal": "NP",
  "north-korea": "KP",
  "philippines": "PH",
  "singapore": "SG",
  "south-korea": "KR",
  "sri-lanka": "LK",
  "taiwan": "TW",
  "tajikistan": "TJ",
  "thailand": "TH",
  "timor-leste": "TL",
  "turkmenistan": "TM",
  "uzbekistan": "UZ",
  "vietnam": "VN",
  "albania": "AL",
  "austria": "AT",
  "belgium": "BE",
  "bosnia-and-herzegovina": "BA",
  "bulgaria": "BG",
  "croatia": "HR",
  "cyprus": "CY",
  "czech-republic": "CZ",
  "denmark": "DK",
  "finland": "FI",
  "france": "FR",
  "germany": "DE",
  "greece": "GR",
  "hungary": "HU",
  "ireland": "IE",
  "italy": "IT",
  "kosovo": "XK",
  "latvia": "LV",
  "lithuania": "LT",
  "luxembourg": "LU",
  "malta": "MT",
  "moldova": "MD",
  "montenegro": "ME",
  "netherlands": "NL",
  "north-macedonia": "MK",
  "norway": "NO",
  "poland": "PL",
  "portugal": "PT",
  "romania": "RO",
  "russia": "RU",
  "serbia": "RS",
  "slovakia": "SK",
  "slovenia": "SI",
  "spain": "ES",
  "sweden": "SE",
  "switzerland": "CH",
  "ukraine": "UA",
  "argentina": "AR",
  "bolivia": "BO",
  "brazil": "BR",
  "chile": "CL",
  "colombia": "CO",
  "costa-rica": "CR",
  "cuba": "CU",
  "dominican-republic": "DO",
  "ecuador": "EC",
  "el-salvador": "SV",
  "guatemala": "GT",
  "guyana": "GY",
  "haiti": "HT",
  "honduras": "HN",
  "jamaica": "JM",
  "mexico": "MX",
  "nicaragua": "NI",
  "panama": "PA",
  "paraguay": "PY",
  "peru": "PE",
  "suriname": "SR",
  "trinidad-and-tobago": "TT",
  "uruguay": "UY",
  "venezuela": "VE",
  "fiji": "FJ",
  "new-zealand": "NZ",
  "papua-new-guinea": "PG",
  "solomon-islands": "SB",
  "vanuatu": "VU",
};

export function getCountryCode(slug: string): string | null {
  return countryCodeMap[slug] || null;
}

export function getCitiesBySlug(countrySlug: string): string[] {
  const code = countryCodeMap[countrySlug];
  if (!code) return [];
  
  const seen = new Set<string>();
  return (cities as City[])
    .filter((c) => c.country === code)
    .map((c) => c.name)
    .filter((name) => {
      const key = name.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .sort();
}
export function getSingleCityCoords(countryCode: string, cityName: string): { lat: string; lng: string } | null {
  const city = (cities as City[]).find(
    (c) =>
      c.country === countryCode.toUpperCase() &&
      c.name.toLowerCase() === cityName.toLowerCase()
  );
  return city ? { lat: city.lat, lng: city.lng } : null;
}
// Population data for major cities (top cities per country)
const cityPopulations: Record<string, number> = {
  // Pakistan
  "karachi": 14910352, "lahore": 11126285, "faisalabad": 3640000,
  "rawalpindi": 2098231, "islamabad": 1014825, "gujranwala": 2027001,
  "peshawar": 1970042, "multan": 1871843, "hyderabad": 1732693,
  "quetta": 1001205, "sialkot": 655852, "abbottabad": 148587,
  // UAE
  "dubai": 3331420, "abu dhabi": 1482816, "sharjah": 1274749,
  "al ain": 766936, "ajman": 540361, "ras al-khaimah": 345000,
  "fujairah": 225769, "umm al-quwain": 72000,
  // Saudi Arabia
  "riyadh": 7676654, "jeddah": 4697000, "mecca": 1919900,
  "medina": 1488782, "dammam": 1188000, "taif": 987914,
  "tabuk": 714900, "buraidah": 614800, "khobar": 165799,
  // UK
  "london": 9002488, "birmingham": 1141816, "leeds": 789194,
  "glasgow": 635640, "sheffield": 584853, "bradford": 537173,
  "liverpool": 498042, "edinburgh": 488050, "manchester": 553230,
  "bristol": 470000, "leicester": 368600, "cardiff": 362756,
  // India
  "mumbai": 20667656, "delhi": 32941000, "bangalore": 13193000,
  "hyderabad": 10534418, "ahmedabad": 8450228, "chennai": 10971108,
  "kolkata": 14850000, "surat": 7784276, "pune": 7400000,
  "jaipur": 3766352, "lucknow": 3681416, "kanpur": 3144000,
  // Indonesia
  "jakarta": 10562088, "surabaya": 2874699, "bandung": 2575478,
  "medan": 2435252, "semarang": 1653524, "makassar": 1489011,
  "palembang": 1708413, "tangerang": 2001000, "depok": 2484186,
  "bekasi": 3723836, "bogor": 1081009, "yogyakarta": 422732,
  // Germany
  "berlin": 3769495, "hamburg": 1841179, "munich": 1487708,
  "cologne": 1084394, "frankfurt": 773068, "stuttgart": 634830,
  "dusseldorf": 619294, "leipzig": 587857, "dortmund": 587696,
  "essen": 579432, "bremen": 567559, "dresden": 556780,
  // Nigeria
  "lagos": 14862000, "kano": 3848885, "ibadan": 3565108,
  "abuja": 3464000, "port harcourt": 1865000, "benin city": 1496000,
  "maiduguri": 803000, "zaria": 975153, "aba": 897560,
  "jos": 816824, "ilorin": 847582, "oyo": 430000,
  // USA
  "new york": 8336817, "los angeles": 3979576, "chicago": 2693976,
  "houston": 2304580, "phoenix": 1608139, "philadelphia": 1603797,
  "san antonio": 1434625, "san diego": 1386932, "dallas": 1304379,
  "san jose": 1013240, "austin": 961855, "jacksonville": 949611,
  // Canada
  "toronto": 2731571, "montreal": 1780000, "calgary": 1336000,
  "ottawa": 1017449, "edmonton": 1062643, "mississauga": 721599,
  "winnipeg": 749534, "vancouver": 675218, "brampton": 656480,
  // Australia
  "sydney": 5312000, "melbourne": 5078000, "brisbane": 2514000,
  "perth": 2085973, "adelaide": 1402393, "gold coast": 679127,
  // Turkey
  "istanbul": 15462452, "ankara": 5503985, "izmir": 4367251,
  "bursa": 3101833, "antalya": 2619832, "adana": 2237940,
  // Malaysia
  "kuala lumpur": 1768000, "johor bahru": 1638067, "ipoh": 657892,
  "shah alam": 664001, "petaling jaya": 613369, "subang jaya": 708374,
  // Bangladesh
  "dhaka": 10356500, "chittagong": 5252000, "sylhet": 526412,
  "rajshahi": 700132, "khulna": 663342, "comilla": 389769,
  // Egypt
  "cairo": 21323000, "alexandria": 5200000, "giza": 4239988,
  "shubra el-kheima": 1099354, "port said": 749371, "suez": 728180,
  // Qatar
  "doha": 2382000, "al rayyan": 781906, "al wakrah": 264231,
  // Kuwait
  "kuwait city": 2989000, "ahmadi": 637411, "hawalli": 487000,
  // Morocco
  "casablanca": 3752000, "rabat": 1932000, "fes": 1150000,
  "marrakech": 1070838, "agadir": 916000, "tangier": 1065601,
  // Algeria
  "algiers": 3915811, "oran": 803329, "constantine": 938475,
  "batna": 365584, "djelfa": 490248, "annaba": 464740,
  // Iran
  "tehran": 9259000, "mashhad": 3372660, "isfahan": 2243249,
  "karaj": 1973470, "tabriz": 1773033, "shiraz": 1869001,
  // Iraq
  "baghdad": 7682136, "basra": 2750000, "mosul": 1800000,
  "erbil": 1294000, "najaf": 1300000, "karbala": 700000,
  // France
  "paris": 2161000, "marseille": 870731, "lyon": 522969,
  "toulouse": 493465, "nice": 342669, "nantes": 314138,
  // Russia
  "moscow": 12506468, "saint petersburg": 5384342, "novosibirsk": 1625631,
  "yekaterinburg": 1495066, "kazan": 1257391, "chelyabinsk": 1196680,
};

export function getMajorCities(countrySlug: string): string[] {
  const code = countryCodeMap[countrySlug];
  if (!code) return [];

  const seen = new Set<string>();
  const allCities = (cities as City[])
    .filter((c) => c.country === code)
    .filter((c) => {
      const key = c.name.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .filter((c) => {
      const pop = cityPopulations[c.name.toLowerCase()] ?? 0;
      return pop >= 10000;
    });

  const sortedCities = allCities
    .sort((a, b) => {
      const popA = cityPopulations[a.name.toLowerCase()] ?? 0;
      const popB = cityPopulations[b.name.toLowerCase()] ?? 0;
      return popB - popA;
    });

  return sortedCities.map((c) => c.name);
}