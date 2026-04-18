import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import ProductAds from "@/components/ProductAds";

const countryData: Record<string, { name: string; flag: string; cities: string[] }> = {
  pakistan: {
    name: "Pakistan", flag: "🇵🇰",
    cities: ["Karachi","Lahore","Islamabad","Faisalabad","Multan","Peshawar","Quetta","Rawalpindi","Sialkot","Gujranwala","Hyderabad","Sukkur","Bahawalpur","Sargodha","Dera Ghazi Khan","Sheikhupura","Jhang","Gujrat","Sahiwal","Larkana","Mardan","Abbottabad","Mirpur","Nawabshah","Mingora","Rahim Yar Khan","Okara","Kasur","Dera Ismail Khan","Muzaffarabad","Gilgit","Jhelum","Wah Cantonment","Kamoke","Hafizabad","Chiniot","Khanewal","Pakpattan","Mandi Bahauddin","Toba Tek Singh","Kohat","Bannu","Mansehra","Nowshera","Charsadda","Turbat","Gwadar","Khuzdar","Jacobabad","Larkana","Layyah"],
  },
  "saudi-arabia": {
    name: "Saudi Arabia", flag: "🇸🇦",
    cities: ["Mecca","Medina","Riyadh","Jeddah","Dammam","Taif","Tabuk","Abha","Khobar","Jubail","Yanbu","Najran","Hail","Buraidah","Khamis Mushait","Al Qatif","Al Hufuf","Arar","Sakaka","Jizan","Al Bahah","Dawadmi","Zulfi","Wajh","Qurayyat"],
  },
  "united-arab-emirates": {
    name: "United Arab Emirates", flag: "🇦🇪",
    cities: ["Dubai","Abu Dhabi","Sharjah","Ajman","Al Ain","Ras Al Khaimah","Fujairah","Umm Al Quwain","Khor Fakkan","Kalba","Dhaid","Madinat Zayed","Ruwais","Liwa Oasis"],
  },
  "united-kingdom": {
    name: "United Kingdom", flag: "🇬🇧",
    cities: ["London","Manchester","Birmingham","Leeds","Bradford","Glasgow","Sheffield","Liverpool","Edinburgh","Coventry","Leicester","Nottingham","Bristol","Cardiff","Belfast","Derby","Luton","Wolverhampton","Southampton","Portsmouth","Stoke-on-Trent","Bolton","Blackburn","Oldham","Rochdale","Huddersfield","Halifax","Dewsbury","Slough","Walsall"],
  },
  "united-states": {
    name: "United States", flag: "🇺🇸",
    cities: ["New York","Chicago","Houston","Los Angeles","Dallas","Detroit","Philadelphia","Phoenix","San Antonio","San Diego","Jacksonville","Columbus","San Jose","Austin","Fort Worth","Charlotte","Indianapolis","Seattle","Denver","Washington","Nashville","Oklahoma City","El Paso","Boston","Memphis","Atlanta","Minneapolis","Tampa","New Orleans","Baltimore"],
  },
  canada: {
    name: "Canada", flag: "🇨🇦",
    cities: ["Toronto","Vancouver","Montreal","Calgary","Ottawa","Edmonton","Winnipeg","Hamilton","Quebec City","Brampton","Mississauga","Surrey","Laval","Halifax","London","Markham","Vaughan","Gatineau","Saskatoon","Longueuil","Burnaby","Regina","Richmond","Richmond Hill","Oakville"],
  },
  australia: {
    name: "Australia", flag: "🇦🇺",
    cities: ["Sydney","Melbourne","Brisbane","Perth","Adelaide","Gold Coast","Canberra","Newcastle","Wollongong","Hobart","Geelong","Townsville","Cairns","Darwin","Toowoomba","Ballarat","Bendigo","Albury","Launceston","Mackay"],
  },
  turkey: {
    name: "Turkey", flag: "🇹🇷",
    cities: ["Istanbul","Ankara","Izmir","Bursa","Antalya","Adana","Konya","Gaziantep","Kayseri","Mersin","Eskisehir","Diyarbakir","Samsun","Denizli","Sakarya","Malatya","Trabzon","Erzurum","Van","Kahramanmaras"]
  },
  malaysia: {
    name: "Malaysia", flag: "🇲🇾",
    cities: ["Kuala Lumpur","Penang","Johor Bahru","Kota Kinabalu","Kuching","Ipoh","Shah Alam","Petaling Jaya","Subang Jaya","Klang","Ampang","Kajang","Seremban","Kota Bharu","Kuala Terengganu","Alor Setar","Miri","Sandakan","Tawau","Sibu"],
  },
  indonesia: {
    name: "Indonesia", flag: "🇮🇩",
    cities: ["Jakarta","Surabaya","Bandung","Medan","Makassar","Semarang","Palembang","Tangerang","Bekasi","Depok","Batam","Pekanbaru","Bandar Lampung","Padang","Malang","Bogor","Denpasar","Samarinda","Tasikmalaya","Balikpapan"]
  },
  bangladesh: {
    name: "Bangladesh", flag: "🇧🇩",
    cities: ["Dhaka","Chittagong","Sylhet","Rajshahi","Khulna","Comilla","Narayanganj","Gazipur","Mymensingh","Rangpur","Barishal","Jessore","Bogra","Tongi","Brahmanbaria","Saidpur","Tangail","Jamalpur","Pabna","Narsingdi"]
  },
  egypt: {
    name: "Egypt", flag: "🇪🇬",
    cities: ["Cairo","Alexandria","Giza","Shubra El Kheima","Port Said","Suez","Luxor","Asyut","Sharm el-Sheikh","Hurghada","Mansoura","Tanta","Zagazig","Ismailia","Faiyum","Damietta","Aswan","Minya","Beni Suef","Sohag"],
  },
  india: {
  name: "India", flag: "🇮🇳",
  cities: ["Delhi","Mumbai","Hyderabad","Chennai","Kolkata","Bangalore","Lucknow","Patna","Jaipur","Ahmedabad","Surat","Pune","Bhopal","Kanpur","Nagpur","Indore","Agra","Varanasi","Meerut","Aligarh"],
},
qatar: {
  name: "Qatar", flag: "🇶🇦",
  cities: ["Doha","Al Rayyan","Al Wakrah","Al Khor","Mesaieed","Dukhan","Al Shamal","Umm Salal"],
},
kuwait: {
  name: "Kuwait", flag: "🇰🇼",
  cities: ["Kuwait City","Salmiya","Hawalli","Farwaniya","Ahmadi","Jahra","Mubarak Al Kabeer"],
},
oman: {
  name: "Oman", flag: "🇴🇲",
  cities: ["Muscat","Sohar","Salalah","Nizwa","Sur","Ibra","Buraimi","Rustaq","Khasab"],
},
bahrain: {
  name: "Bahrain", flag: "🇧🇭",
  cities: ["Manama","Riffa","Muharraq","Hamad Town","Isa Town"],
},
iraq: {
  name: "Iraq", flag: "🇮🇶",
  cities: ["Baghdad","Basra","Mosul","Erbil","Kirkuk","Najaf","Karbala","Sulaymaniyah","Fallujah","Ramadi","Tikrit","Baqubah","Amarah","Nasiriyah","Samawa"],
},
jordan: {
  name: "Jordan", flag: "🇯🇴",
  cities: ["Amman","Zarqa","Irbid","Russeifa","Aqaba","Madaba","Salt","Mafraq","Jerash","Karak","Ajloun","Tafilah"],
},
lebanon: {
  name: "Lebanon", flag: "🇱🇧",
  cities: ["Beirut","Tripoli","Sidon","Tyre","Zahle","Jounieh","Nabatieh","Baalbek","Byblos","Aley"],
},
syria: {
  name: "Syria", flag: "🇸🇾",
  cities: ["Damascus","Aleppo","Homs","Latakia","Hama","Deir ez-Zor","Raqqa","Tartus","Idlib","Qamishli","Daraa","Sweida"],
},
yemen: {
  name: "Yemen", flag: "🇾🇪",
  cities: ["Sanaa","Aden","Taiz","Hodeidah","Ibb","Dhamar","Mukalla","Hajjah","Amran","Saada","Marib","Zinjibar"],
},
libya: {
  name: "Libya", flag: "🇱🇾",
  cities: ["Tripoli","Benghazi","Misrata","Tarhuna","Zawiya","Ajdabiya","Derna","Bayda","Sirte","Tobruk","Sabha","Zliten"],
},
tunisia: {
  name: "Tunisia", flag: "🇹🇳",
  cities: ["Tunis","Sfax","Sousse","Ettadhamen","Kairouan","Bizerte","Gabes","Ariana","Gafsa","Monastir","Tataouine","Nabeul"],
},
morocco: {
  name: "Morocco", flag: "🇲🇦",
  cities: ["Casablanca","Rabat","Fes","Marrakech","Agadir","Tangier","Meknes","Oujda","Kenitra","Tetouan","Safi","El Jadida","Beni Mellal","Nador","Khouribga"],
},
algeria: {
  name: "Algeria", flag: "🇩🇿",
  cities: ["Algiers","Oran","Constantine","Annaba","Blida","Batna","Djelfa","Setif","Sidi Bel Abbes","Biskra","Tebessa","El Oued","Skikda","Tiaret","Bejaia"],
},
afghanistan: {
  name: "Afghanistan", flag: "🇦🇫",
  cities: ["Kabul","Kandahar","Herat","Mazar-i-Sharif","Kunduz","Jalalabad","Ghazni","Balkh","Baghlan","Lashkar Gah","Taloqan","Pul-e-Khumri"],
},
palestine: {
  name: "Palestine", flag: "🇵🇸",
  cities: ["Gaza","Ramallah","Nablus","Hebron","Jenin","Tulkarm","Jericho","Bethlehem","Qalqilya","Khan Yunis"],
},
iran: {
  name: "Iran", flag: "🇮🇷",
  cities: ["Tehran","Mashhad","Isfahan","Karaj","Tabriz","Shiraz","Qom","Ahvaz","Kermanshah","Rasht","Zahedan","Hamadan","Arak","Yazd","Ardabil"],
},
israel: {
  name: "Israel", flag: "🇮🇱",
  cities: ["Jerusalem","Tel Aviv","Haifa","Rishon LeZion","Petah Tikva","Ashdod","Netanya","Beer Sheva","Holon","Bnei Brak","Nazareth","Jaffa"],
},

// ── Africa ──
"south-africa": {
  name: "South Africa", flag: "🇿🇦",
  cities: ["Johannesburg","Cape Town","Durban","Pretoria","Port Elizabeth","Bloemfontein","East London","Nelspruit","Polokwane","Kimberley","Rustenburg","Pietermaritzburg"],
},
namibia: {
  name: "Namibia", flag: "🇳🇦",
  cities: ["Windhoek","Walvis Bay","Swakopmund","Rundu","Oshakati","Katima Mulilo","Grootfontein","Rehoboth"],
},
botswana: {
  name: "Botswana", flag: "🇧🇼",
  cities: ["Gaborone","Francistown","Molepolole","Selebi-Phikwe","Maun","Serowe","Kanye","Mahalapye"],
},
lesotho: {
  name: "Lesotho", flag: "🇱🇸",
  cities: ["Maseru","Teyateyaneng","Mafeteng","Hlotse","Mohale's Hoek","Quthing","Qacha's Nek"],
},
swaziland: {
  name: "Swaziland", flag: "🇸🇿",
  cities: ["Mbabane","Manzini","Lobamba","Nhlangano","Siteki","Big Bend","Pigg's Peak"],
},
kenya: {
  name: "Kenya", flag: "🇰🇪",
  cities: ["Nairobi","Mombasa","Kisumu","Nakuru","Eldoret","Thika","Malindi","Kitale","Garissa","Kakamega","Nyeri","Machakos"],
},
tanzania: {
  name: "Tanzania", flag: "🇹🇿",
  cities: ["Dar es Salaam","Mwanza","Arusha","Dodoma","Mbeya","Morogoro","Tanga","Zanzibar","Kigoma","Tabora","Iringa","Songea"],
},
uganda: {
  name: "Uganda", flag: "🇺🇬",
  cities: ["Kampala","Gulu","Lira","Mbarara","Jinja","Bwizibwera","Mbale","Mukono","Kasese","Masaka","Hoima","Fort Portal"],
},
rwanda: {
  name: "Rwanda", flag: "🇷🇼",
  cities: ["Kigali","Butare","Gitarama","Ruhengeri","Gisenyi","Byumba","Cyangugu","Kibungo","Rwamagana"],
},
burundi: {
  name: "Burundi", flag: "🇧🇮",
  cities: ["Bujumbura","Gitega","Ngozi","Rumonge","Bururi","Rutana","Muramvya","Kayanza"],
},
mozambique: {
  name: "Mozambique", flag: "🇲🇿",
  cities: ["Maputo","Matola","Beira","Nampula","Chimoio","Quelimane","Tete","Nacala","Lichinga","Pemba"],
},
zambia: {
  name: "Zambia", flag: "🇿🇲",
  cities: ["Lusaka","Kitwe","Ndola","Kabwe","Chingola","Mufulira","Livingstone","Luanshya","Kasama","Chipata"],
},
zimbabwe: {
  name: "Zimbabwe", flag: "🇿🇼",
  cities: ["Harare","Bulawayo","Chitungwiza","Mutare","Gweru","Kwekwe","Kadoma","Masvingo","Chinhoyi","Norton"],
},
angola: {
  name: "Angola", flag: "🇦🇴",
  cities: ["Luanda","Huambo","Lobito","Benguela","Kuito","Lubango","Malanje","Namibe","Soyo","Cabinda"],
},
cameroon: {
  name: "Cameroon", flag: "🇨🇲",
  cities: ["Yaounde","Douala","Garoua","Bamenda","Maroua","Bafoussam","Ngaoundere","Bertoua","Loum","Kumba"],
},
congo: {
  name: "Congo", flag: "🇨🇬",
  cities: ["Brazzaville","Pointe-Noire","Dolisie","Nkayi","Impfondo","Ouesso","Owando","Madingou"],
},
gabon: {
  name: "Gabon", flag: "🇬🇦",
  cities: ["Libreville","Port-Gentil","Franceville","Oyem","Moanda","Mouila","Lambarene","Tchibanga"],
},
ghana: {
  name: "Ghana", flag: "🇬🇭",
  cities: ["Accra","Kumasi","Tamale","Sekondi-Takoradi","Cape Coast","Obuasi","Tema","Koforidua","Sunyani","Ho"],
},
guinea: {
  name: "Guinea", flag: "🇬🇳",
  cities: ["Conakry","Nzerekore","Kindia","Kankan","Labe","Kissidougou","Gueckedou","Boke"],
},
"guinea-bissau": {
  name: "Guinea-Bissau", flag: "🇬🇼",
  cities: ["Bissau","Bafata","Gabu","Bissorã","Bolama","Cacheu","Bubaque","Mansoa"],
},
"ivory-coast": {
  name: "Ivory Coast", flag: "🇨🇮",
  cities: ["Abidjan","Bouake","Daloa","Yamoussoukro","Korhogo","San-Pedro","Man","Divo","Gagnoa","Abengourou"],
},
liberia: {
  name: "Liberia", flag: "🇱🇷",
  cities: ["Monrovia","Gbarnga","Kakata","Bensonville","Harper","Voinjama","Buchanan","Zwedru"],
},
mali: {
  name: "Mali", flag: "🇲🇱",
  cities: ["Bamako","Sikasso","Mopti","Koutiala","Kayes","Segou","Gao","Timbuktu","Kidal","San"],
},
mauritania: {
  name: "Mauritania", flag: "🇲🇷",
  cities: ["Nouakchott","Nouadhibou","Nema","Kaedi","Rosso","Atar","Zouerate","Kiffa"],
},
mauritius: {
  name: "Mauritius", flag: "🇲🇺",
  cities: ["Port Louis","Beau Bassin","Vacoas","Curepipe","Quatre Bornes","Triolet","Rose Hill","Mahebourg"],
},
niger: {
  name: "Niger", flag: "🇳🇪",
  cities: ["Niamey","Zinder","Maradi","Agadez","Tahoua","Dosso","Arlit","Diffa"],
},
nigeria: {
  name: "Nigeria", flag: "🇳🇬",
  cities: ["Lagos","Kano","Ibadan","Abuja","Port Harcourt","Benin City","Maiduguri","Zaria","Aba","Jos","Ilorin","Oyo","Enugu","Abeokuta","Kaduna","Sokoto","Katsina"],
},
senegal: {
  name: "Senegal", flag: "🇸🇳",
  cities: ["Dakar","Touba","Thies","Rufisque","Kaolack","Ziguinchor","Saint-Louis","Mbour","Diourbel","Louga"],
},
"sierra-leone": {
  name: "Sierra Leone", flag: "🇸🇱",
  cities: ["Freetown","Bo","Kenema","Makeni","Koidu","Lunsar","Port Loko","Bonthe"],
},
somalia: {
  name: "Somalia", flag: "🇸🇴",
  cities: ["Mogadishu","Hargeisa","Bosasso","Kismayo","Berbera","Merca","Baidoa","Garowe","Beledweyne","Jilib"],
},
"south-sudan": {
  name: "South Sudan", flag: "🇸🇸",
  cities: ["Juba","Wau","Malakal","Yei","Aweil","Torit","Rumbek","Bentiu","Bor","Kuajok"],
},
sudan: {
  name: "Sudan", flag: "🇸🇩",
  cities: ["Khartoum","Omdurman","Kassala","Port Sudan","Obeid","Wad Madani","Atbara","El Fasher","Nyala","Gedaref","Kosti","Rabak"],
},
benin: {
  name: "Benin", flag: "🇧🇯",
  cities: ["Cotonou","Porto-Novo","Parakou","Abomey","Kandi","Ouidah","Lokossa","Natitingou"],
},
"burkina-faso": {
  name: "Burkina Faso", flag: "🇧🇫",
  cities: ["Ouagadougou","Bobo-Dioulasso","Koudougou","Ouahigouya","Banfora","Dedougou","Kaya","Tenkodogo"],
},
"cape-verde": {
  name: "Cape Verde", flag: "🇨🇻",
  cities: ["Praia","Mindelo","Santa Maria","Assomada","Pedra Badejo"],
},
"central-african-republic": {
  name: "Central African Republic", flag: "🇨🇫",
  cities: ["Bangui","Bimbo","Berbérati","Carnot","Bambari","Bouar","Bossangoa","Bangassou"],
},
chad: {
  name: "Chad", flag: "🇹🇩",
  cities: ["N'Djamena","Moundou","Sarh","Abeche","Kelo","Koumra","Pala","Am Timan"],
},
comoros: {
  name: "Comoros", flag: "🇰🇲",
  cities: ["Moroni","Mutsamudu","Fomboni","Domoni","Tsangadjou"],
},
"democratic-republic-of-congo": {
  name: "Democratic Republic of Congo", flag: "🇨🇩",
  cities: ["Kinshasa","Lubumbashi","Mbuji-Mayi","Kananga","Kisangani","Bukavu","Tshikapa","Kolwezi","Likasi","Goma","Matadi","Uvira"],
},
djibouti: {
  name: "Djibouti", flag: "🇩🇯",
  cities: ["Djibouti City","Ali Sabieh","Tadjoura","Obock","Dikhil","Arta"],
},
"equatorial-guinea": {
  name: "Equatorial Guinea", flag: "🇬🇶",
  cities: ["Malabo","Bata","Ebebiyin","Aconibe","Annobon","Luba"],
},
eritrea: {
  name: "Eritrea", flag: "🇪🇷",
  cities: ["Asmara","Keren","Massawa","Assab","Mendefera","Dekemhare","Adi Keyh"],
},
ethiopia: {
  name: "Ethiopia", flag: "🇪🇹",
  cities: ["Addis Ababa","Dire Dawa","Mekelle","Gondar","Hawassa","Bahir Dar","Dessie","Jimma","Jijiga","Shashamane"],
},
gambia: {
  name: "Gambia", flag: "🇬🇲",
  cities: ["Banjul","Serekunda","Brikama","Bakau","Farafenni","Lamin","Sukuta"],
},
madagascar: {
  name: "Madagascar", flag: "🇲🇬",
  cities: ["Antananarivo","Toamasina","Antsirabe","Fianarantsoa","Mahajanga","Toliara","Antsiranana"],
},
malawi: {
  name: "Malawi", flag: "🇲🇼",
  cities: ["Lilongwe","Blantyre","Mzuzu","Zomba","Kasungu","Mangochi","Karonga","Salima"],
},
"sao-tome-and-principe": {
  name: "São Tomé and Príncipe", flag: "🇸🇹",
  cities: ["Sao Tome","Santo Antonio","Neves"],
},
seychelles: {
  name: "Seychelles", flag: "🇸🇨",
  cities: ["Victoria","Anse Boileau","Beau Vallon"],
},
togo: {
  name: "Togo", flag: "🇹🇬",
  cities: ["Lome","Sokode","Kara","Atakpame","Dapaong","Tsevie","Aného","Bassar"],
},

// ── Asia ──
armenia: {
  name: "Armenia", flag: "🇦🇲",
  cities: ["Yerevan","Gyumri","Vanadzor","Vagharshapat","Hrazdan","Abovyan","Kapan"],
},
azerbaijan: {
  name: "Azerbaijan", flag: "🇦🇿",
  cities: ["Baku","Ganja","Sumgait","Mingachevir","Nakhchivan","Shirvan","Lankaran"],
},
brunei: {
  name: "Brunei", flag: "🇧🇳",
  cities: ["Bandar Seri Begawan","Kuala Belait","Seria","Tutong","Bangar"],
},
cambodia: {
  name: "Cambodia", flag: "🇰🇭",
  cities: ["Phnom Penh","Siem Reap","Battambang","Sihanoukville","Kampong Cham","Pursat","Kampot","Takeo"],
},
china: {
  name: "China", flag: "🇨🇳",
  cities: ["Beijing","Shanghai","Guangzhou","Shenzhen","Chengdu","Tianjin","Wuhan","Chongqing","Nanjing","Xi'an","Hangzhou","Urumqi","Kunming","Harbin","Qingdao"],
},
georgia: {
  name: "Georgia", flag: "🇬🇪",
  cities: ["Tbilisi","Kutaisi","Batumi","Rustavi","Gori","Zugdidi","Poti","Samtredia"],
},
"hong-kong": {
  name: "Hong Kong", flag: "🇭🇰",
  cities: ["Hong Kong Island","Kowloon","Mong Kok","Tsim Sha Tsui","Sha Tin","Tuen Mun","Yuen Long"],
},
japan: {
  name: "Japan", flag: "🇯🇵",
  cities: ["Tokyo","Osaka","Yokohama","Nagoya","Sapporo","Kobe","Kyoto","Fukuoka","Kawasaki","Hiroshima","Sendai","Chiba"],
},
kazakhstan: {
  name: "Kazakhstan", flag: "🇰🇿",
  cities: ["Almaty","Nur-Sultan","Shymkent","Karaganda","Aktobe","Taraz","Pavlodar","Ust-Kamenogorsk","Semey"],
},
kyrgyzstan: {
  name: "Kyrgyzstan", flag: "🇰🇬",
  cities: ["Bishkek","Osh","Jalal-Abad","Karakol","Tokmok","Uzgen","Naryn"],
},
laos: {
  name: "Laos", flag: "🇱🇦",
  cities: ["Vientiane","Luang Prabang","Savannakhet","Pakse","Thakhek","Xam Neua","Phonsavan"],
},
maldives: {
  name: "Maldives", flag: "🇲🇻",
  cities: ["Male","Addu City","Fuvahmulah","Kulhudhuffushi","Thinadhoo"],
},
mongolia: {
  name: "Mongolia", flag: "🇲🇳",
  cities: ["Ulaanbaatar","Erdenet","Darkhan","Choibalsan","Murun","Bayankhongor","Ulgii"],
},
myanmar: {
  name: "Myanmar", flag: "🇲🇲",
  cities: ["Yangon","Mandalay","Naypyidaw","Mawlamyine","Bago","Pathein","Myitkyina","Taunggyi"],
},
nepal: {
  name: "Nepal", flag: "🇳🇵",
  cities: ["Kathmandu","Pokhara","Lalitpur","Bharatpur","Biratnagar","Birgunj","Dharan","Hetauda"],
},
"north-korea": {
  name: "North Korea", flag: "🇰🇵",
  cities: ["Pyongyang","Hamhung","Chongjin","Nampo","Wonsan","Sinuiju","Tanchon"],
},
philippines: {
  name: "Philippines", flag: "🇵🇭",
  cities: ["Manila","Quezon City","Davao","Cebu","Zamboanga","Antipolo","Pasig","Taguig","Makati","Cagayan de Oro","Parañaque","Cotabato"],
},
singapore: {
  name: "Singapore", flag: "🇸🇬",
  cities: ["Singapore","Jurong East","Woodlands","Tampines","Sengkang","Punggol","Bukit Batok"],
},
"south-korea": {
  name: "South Korea", flag: "🇰🇷",
  cities: ["Seoul","Busan","Incheon","Daegu","Daejeon","Gwangju","Suwon","Ulsan","Changwon","Seongnam"],
},
"sri-lanka": {
  name: "Sri Lanka", flag: "🇱🇰",
  cities: ["Colombo","Kandy","Galle","Jaffna","Negombo","Batticaloa","Trincomalee","Anuradhapura"],
},
taiwan: {
  name: "Taiwan", flag: "🇹🇼",
  cities: ["Taipei","Kaohsiung","Taichung","Tainan","Hsinchu","Keelung","Taoyuan","Chiayi"],
},
tajikistan: {
  name: "Tajikistan", flag: "🇹🇯",
  cities: ["Dushanbe","Khujand","Kulob","Qurghonteppa","Istaravshan","Vahdat"],
},
thailand: {
  name: "Thailand", flag: "🇹🇭",
  cities: ["Bangkok","Chiang Mai","Pattaya","Phuket","Hat Yai","Nakhon Ratchasima","Udon Thani","Khon Kaen","Chon Buri","Nonthaburi"],
},
"timor-leste": {
  name: "Timor-Leste", flag: "🇹🇱",
  cities: ["Dili","Baucau","Maliana"],
},
turkmenistan: {
  name: "Turkmenistan", flag: "🇹🇲",
  cities: ["Ashgabat","Turkmenabat","Dasoguz","Mary","Balkanabat","Bayramaly"],
},
uzbekistan: {
  name: "Uzbekistan", flag: "🇺🇿",
  cities: ["Tashkent","Samarkand","Namangan","Andijan","Bukhara","Nukus","Fergana","Karshi","Kokand","Urgench"],
},
vietnam: {
  name: "Vietnam", flag: "🇻🇳",
  cities: ["Hanoi","Ho Chi Minh City","Da Nang","Hai Phong","Can Tho","Bien Hoa","Hue","Nha Trang","Buon Ma Thuot","Vung Tau"],
},

// ── Europe ──
albania: {
  name: "Albania", flag: "🇦🇱",
  cities: ["Tirana","Durres","Vlore","Shkoder","Fier","Korce","Berat","Lushnje"],
},
austria: {
  name: "Austria", flag: "🇦🇹",
  cities: ["Vienna","Graz","Linz","Salzburg","Innsbruck","Klagenfurt","Villach","Wels"],
},
belgium: {
  name: "Belgium", flag: "🇧🇪",
  cities: ["Brussels","Antwerp","Ghent","Charleroi","Liege","Bruges","Namur","Leuven","Molenbeek","Mechelen"],
},
"bosnia-and-herzegovina": {
  name: "Bosnia and Herzegovina", flag: "🇧🇦",
  cities: ["Sarajevo","Banja Luka","Tuzla","Zenica","Mostar","Bihac","Bijeljina","Trebinje"],
},
bulgaria: {
  name: "Bulgaria", flag: "🇧🇬",
  cities: ["Sofia","Plovdiv","Varna","Burgas","Ruse","Stara Zagora","Pleven","Sliven"],
},
croatia: {
  name: "Croatia", flag: "🇭🇷",
  cities: ["Zagreb","Split","Rijeka","Osijek","Zadar","Slavonski Brod","Pula","Karlovac"],
},
cyprus: {
  name: "Cyprus", flag: "🇨🇾",
  cities: ["Nicosia","Limassol","Larnaca","Famagusta","Paphos","Kyrenia"],
},
"czech-republic": {
  name: "Czech Republic", flag: "🇨🇿",
  cities: ["Prague","Brno","Ostrava","Plzen","Liberec","Olomouc","Ceske Budejovice","Hradec Kralove"],
},
denmark: {
  name: "Denmark", flag: "🇩🇰",
  cities: ["Copenhagen","Aarhus","Odense","Aalborg","Esbjerg","Randers","Kolding","Horsens"],
},
finland: {
  name: "Finland", flag: "🇫🇮",
  cities: ["Helsinki","Espoo","Tampere","Vantaa","Oulu","Turku","Jyvaskyla","Lahti"],
},
france: {
  name: "France", flag: "🇫🇷",
  cities: ["Paris","Marseille","Lyon","Toulouse","Nice","Nantes","Strasbourg","Montpellier","Bordeaux","Lille","Rennes","Reims"],
},
germany: {
  name: "Germany", flag: "🇩🇪",
  cities: ["Berlin","Hamburg","Munich","Cologne","Frankfurt","Stuttgart","Dusseldorf","Leipzig","Dortmund","Essen","Bremen","Dresden","Hanover","Nuremberg","Duisburg"],
},
greece: {
  name: "Greece", flag: "🇬🇷",
  cities: ["Athens","Thessaloniki","Patras","Piraeus","Larissa","Heraklion","Volos","Ioannina"],
},
hungary: {
  name: "Hungary", flag: "🇭🇺",
  cities: ["Budapest","Debrecen","Miskolc","Szeged","Pecs","Gyor","Nyiregyhaza","Kecskemet"],
},
ireland: {
  name: "Ireland", flag: "🇮🇪",
  cities: ["Dublin","Cork","Limerick","Galway","Waterford","Drogheda","Dundalk","Swords"],
},
italy: {
  name: "Italy", flag: "🇮🇹",
  cities: ["Rome","Milan","Naples","Turin","Palermo","Genoa","Bologna","Florence","Bari","Catania","Venice","Verona"],
},
kosovo: {
  name: "Kosovo", flag: "🇽🇰",
  cities: ["Pristina","Prizren","Peja","Mitrovica","Gjilan","Ferizaj","Gjakova"],
},
latvia: {
  name: "Latvia", flag: "🇱🇻",
  cities: ["Riga","Daugavpils","Liepaja","Jelgava"],
},
lithuania: {
  name: "Lithuania", flag: "🇱🇹",
  cities: ["Vilnius","Kaunas","Klaipeda","Siauliai"],
},
luxembourg: {
  name: "Luxembourg", flag: "🇱🇺",
  cities: ["Luxembourg City","Esch-sur-Alzette","Differdange"],
},
malta: {
  name: "Malta", flag: "🇲🇹",
  cities: ["Valletta","Birkirkara","Qormi"],
},
moldova: {
  name: "Moldova", flag: "🇲🇩",
  cities: ["Chisinau","Tiraspol","Balti","Bender"],
},
montenegro: {
  name: "Montenegro", flag: "🇲🇪",
  cities: ["Podgorica","Niksic","Herceg Novi","Bijelo Polje"],
},
netherlands: {
  name: "Netherlands", flag: "🇳🇱",
  cities: ["Amsterdam","Rotterdam","The Hague","Utrecht","Eindhoven","Tilburg","Groningen","Almere","Breda","Nijmegen"],
},
"north-macedonia": {
  name: "North Macedonia", flag: "🇲🇰",
  cities: ["Skopje","Bitola","Kumanovo","Prilep","Tetovo","Ohrid","Veles"],
},
norway: {
  name: "Norway", flag: "🇳🇴",
  cities: ["Oslo","Bergen","Trondheim","Stavanger","Drammen","Fredrikstad","Kristiansand"],
},
poland: {
  name: "Poland", flag: "🇵🇱",
  cities: ["Warsaw","Krakow","Lodz","Wroclaw","Poznan","Gdansk","Szczecin","Bydgoszcz","Lublin","Katowice"],
},
portugal: {
  name: "Portugal", flag: "🇵🇹",
  cities: ["Lisbon","Porto","Amadora","Braga","Setubal","Coimbra","Funchal","Almada"],
},
romania: {
  name: "Romania", flag: "🇷🇴",
  cities: ["Bucharest","Cluj-Napoca","Timisoara","Iasi","Constanta","Craiova","Brasov","Galati"],
},
russia: {
  name: "Russia", flag: "🇷🇺",
  cities: ["Moscow","Saint Petersburg","Novosibirsk","Yekaterinburg","Kazan","Nizhny Novgorod","Chelyabinsk","Samara","Ufa","Rostov-on-Don","Omsk","Krasnoyarsk"],
},
serbia: {
  name: "Serbia", flag: "🇷🇸",
  cities: ["Belgrade","Novi Sad","Nis","Kragujevac","Subotica","Zrenjanin"],
},
slovakia: {
  name: "Slovakia", flag: "🇸🇰",
  cities: ["Bratislava","Kosice","Presov","Zilina"],
},
slovenia: {
  name: "Slovenia", flag: "🇸🇮",
  cities: ["Ljubljana","Maribor","Celje","Kranj"],
},
spain: {
  name: "Spain", flag: "🇪🇸",
  cities: ["Madrid","Barcelona","Valencia","Seville","Zaragoza","Malaga","Murcia","Palma","Las Palmas","Bilbao","Alicante","Cordoba"],
},
sweden: {
  name: "Sweden", flag: "🇸🇪",
  cities: ["Stockholm","Gothenburg","Malmo","Uppsala","Vasteras","Orebro","Linkoping"],
},
switzerland: {
  name: "Switzerland", flag: "🇨🇭",
  cities: ["Zurich","Geneva","Basel","Bern","Lausanne","Winterthur","St. Gallen"],
},
ukraine: {
  name: "Ukraine", flag: "🇺🇦",
  cities: ["Kyiv","Kharkiv","Odessa","Dnipro","Donetsk","Zaporizhzhia","Lviv","Kryvyi Rih","Mykolaiv","Mariupol"],
},

// ── Americas ──
argentina: {
  name: "Argentina", flag: "🇦🇷",
  cities: ["Buenos Aires","Cordoba","Rosario","Mendoza","La Plata","Tucuman","Mar del Plata","Salta","Santa Fe","San Juan"],
},
bolivia: {
  name: "Bolivia", flag: "🇧🇴",
  cities: ["La Paz","Santa Cruz","Cochabamba","Sucre","Oruro","Potosi","Tarija"],
},
brazil: {
  name: "Brazil", flag: "🇧🇷",
  cities: ["Sao Paulo","Rio de Janeiro","Brasilia","Salvador","Fortaleza","Belo Horizonte","Manaus","Curitiba","Recife","Porto Alegre","Belem","Goiania"],
},
chile: {
  name: "Chile", flag: "🇨🇱",
  cities: ["Santiago","Valparaiso","Concepcion","Antofagasta","Temuco","Rancagua","Talca","Arica"],
},
colombia: {
  name: "Colombia", flag: "🇨🇴",
  cities: ["Bogota","Medellin","Cali","Barranquilla","Cartagena","Cucuta","Bucaramanga","Pereira","Santa Marta","Ibague"],
},
"costa-rica": {
  name: "Costa Rica", flag: "🇨🇷",
  cities: ["San Jose","Alajuela","Cartago","Heredia","Liberia","Limon","Puntarenas"],
},
cuba: {
  name: "Cuba", flag: "🇨🇺",
  cities: ["Havana","Santiago de Cuba","Camaguey","Holguin","Guantanamo","Santa Clara","Las Tunas"],
},
"dominican-republic": {
  name: "Dominican Republic", flag: "🇩🇴",
  cities: ["Santo Domingo","Santiago","La Romana","San Pedro de Macoris","San Cristobal","Puerto Plata"],
},
ecuador: {
  name: "Ecuador", flag: "🇪🇨",
  cities: ["Guayaquil","Quito","Cuenca","Santo Domingo","Machala","Duran","Manta","Ambato"],
},
"el-salvador": {
  name: "El Salvador", flag: "🇸🇻",
  cities: ["San Salvador","Santa Ana","San Miguel","Soyapango","Mejicanos","Apopa"],
},
guatemala: {
  name: "Guatemala", flag: "🇬🇹",
  cities: ["Guatemala City","Mixco","Villa Nueva","San Juan Sacatepequez","Quetzaltenango","Escuintla"],
},
guyana: {
  name: "Guyana", flag: "🇬🇾",
  cities: ["Georgetown","Linden","New Amsterdam","Anna Regina"],
},
haiti: {
  name: "Haiti", flag: "🇭🇹",
  cities: ["Port-au-Prince","Cap-Haitien","Gonaives","Saint-Marc"],
},
honduras: {
  name: "Honduras", flag: "🇭🇳",
  cities: ["Tegucigalpa","San Pedro Sula","La Ceiba","Choloma","El Progreso","Choluteca"],
},
jamaica: {
  name: "Jamaica", flag: "🇯🇲",
  cities: ["Kingston","Montego Bay","Portmore","Spanish Town"],
},
mexico: {
  name: "Mexico", flag: "🇲🇽",
  cities: ["Mexico City","Guadalajara","Monterrey","Puebla","Tijuana","Leon","Juarez","Zapopan","Nezahualcoyotl","Monterrey","Merida","Chihuahua"],
},
nicaragua: {
  name: "Nicaragua", flag: "🇳🇮",
  cities: ["Managua","Leon","Masaya","Matagalpa","Chinandega","Granada"],
},
panama: {
  name: "Panama", flag: "🇵🇦",
  cities: ["Panama City","San Miguelito","Tocumen","David","Arraijan","Colon"],
},
paraguay: {
  name: "Paraguay", flag: "🇵🇾",
  cities: ["Asuncion","Ciudad del Este","San Lorenzo","Luque","Capiatá","Fernando de la Mora"],
},
peru: {
  name: "Peru", flag: "🇵🇪",
  cities: ["Lima","Arequipa","Trujillo","Chiclayo","Iquitos","Piura","Cusco","Huancayo"],
},
suriname: {
  name: "Suriname", flag: "🇸🇷",
  cities: ["Paramaribo","Lelydorp","Nieuw Nickerie","Moengo"],
},
"trinidad-and-tobago": {
  name: "Trinidad and Tobago", flag: "🇹🇹",
  cities: ["Port of Spain","San Fernando","Chaguanas","Arima"],
},
uruguay: {
  name: "Uruguay", flag: "🇺🇾",
  cities: ["Montevideo","Salto","Paysandu","Las Piedras","Rivera","Maldonado"],
},
venezuela: {
  name: "Venezuela", flag: "🇻🇪",
  cities: ["Caracas","Maracaibo","Valencia","Barquisimeto","Maracay","Ciudad Guayana","San Cristobal","Maturin"],
},

// ── Oceania ──
fiji: {
  name: "Fiji", flag: "🇫🇯",
  cities: ["Suva","Nadi","Lautoka","Labasa"],
},
"new-zealand": {
  name: "New Zealand", flag: "🇳🇿",
  cities: ["Auckland","Wellington","Christchurch","Hamilton","Tauranga","Dunedin","Palmerston North"],
},
"papua-new-guinea": {
  name: "Papua New Guinea", flag: "🇵🇬",
  cities: ["Port Moresby","Lae","Mount Hagen","Madang"],
},
"solomon-islands": {
  name: "Solomon Islands", flag: "🇸🇧",
  cities: ["Honiara","Gizo","Auki"],
},
vanuatu: {
  name: "Vanuatu", flag: "🇻🇺",
  cities: ["Port Vila","Luganville","Norsup"],
},
};

export async function generateMetadata({ params }: { params: Promise<{ country: string }> }): Promise<Metadata> {
  const { country } = await params;
  const data = countryData[country];
  if (!data) return {};
  return {
    title: `Prayer Times ${data.name} | Namaz Timings All Cities`,
    description: `Accurate Islamic prayer times for all cities in ${data.name}. Get today's Fajr, Dhuhr, Asr, Maghrib and Isha timings for ${data.cities.slice(0, 5).join(", ")} and more.`,
    keywords: `prayer times ${data.name}, namaz timings ${data.name}, salah times ${data.name}, ${data.cities.slice(0, 4).map(c => `prayer times ${c}`).join(", ")}`,
    alternates: { canonical: `https://prayer.souqalmadina.com.pk/${country}` },
  };
}

export const dynamic = "force-dynamic";

export default async function CountryPage({ params }: { params: Promise<{ country: string }> }) {
  const { country } = await params;
  const data = countryData[country];
  if (!data) notFound();

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      {/* Hero */}
      <section className="pt-14 pb-10 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="text-5xl mb-4">{data.flag}</div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-3" style={{ letterSpacing: "-2px" }}>
            Prayer Times
            <br />
            <span className="italic font-light" style={{ fontFamily: "'Playfair Display',serif", color: "#c9a84c" }}>
              {data.name}
            </span>
          </h1>
          <p className="text-white/60 text-base leading-relaxed max-w-lg mx-auto">
            Accurate Namaz timings for {data.cities.length} cities in {data.name}. Updated daily.
          </p>
        </div>
      </section>

      {/* City Grid */}
      <main className="max-w-4xl mx-auto px-4 pb-14 w-full flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {data.cities.map((city) => (
            <Link
              key={city}
              href={`/${country}/${city.toLowerCase().replace(/ /g, "-")}`}
              className="group flex items-center justify-between p-5 rounded-2xl bg-white/90 border border-white/30 hover:border-yellow-400 hover:shadow-xl transition-all duration-200 hover:scale-[1.02]"
            >
              <div>
                <div className="font-bold text-base" style={{ color: "#0a3d2e" }}>
                  {city}
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mt-0.5">
                  Namaz Timings Today
                </div>
              </div>
              <span className="text-gray-300 group-hover:text-yellow-500 transition-colors text-xl">→</span>
            </Link>
          ))}
        </div>

        {/* SEO text */}
        <article className="mt-12 p-8 bg-white/90 rounded-3xl">
          <h2 className="text-2xl font-black mb-4" style={{ color: "#0a3d2e" }}>
            Islamic Prayer Times in {data.name}
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Finding accurate prayer times in {data.name} is essential for Muslims who wish to perform their daily Salah on time. Our platform provides the most precise and up-to-date timings for all major cities including {data.cities.slice(0, 4).join(", ")}, and many more.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Whether you are a local resident or a traveler in {data.name}, Souq Al Madina Prayer Times ensures you never miss Fajr, Dhuhr, Asr, Maghrib or Isha. Our data is sourced from the globally trusted Aladhan API.
          </p>
        </article>
      </main>

      {/* Product Ads */}
      <div className="bg-white py-2">
        <ProductAds />
      </div>
    </div>
  );
}
