// ========== INTRO: click to fade out and show main site ==========
let introActive = true;
let placeMap = null;

function handleIntroClick() {
  if (!introActive) return;
  introActive = false;

  const introScreen = document.getElementById("intro-screen");
  const mainContent = document.getElementById("main-content");

  // Fade out intro
  introScreen.classList.add("fade-out");

  // After fade, hide intro and show main site
  setTimeout(() => {
    introScreen.style.display = "none";
    mainContent.style.display = "block";
    document.body.style.overflow = "auto";
  }, 900);
}

// ========== DATA FOR REGIONS / STATES / PLACES ==========

const regionsConfig = {
  north: {
    name: "Northern India",
    tagline: "Famous for mountains, snow, culture, temples, and adventure.",
    states: [
      {
        id: "jk",
        name: "Jammu & Kashmir",
        short: "Paradise of lakes, meadows and snow peaks.",
        places: ["Srinagar", "Gulmarg", "Pahalgam", "Leh–Ladakh"],
        travel: [
          "By Air: Srinagar Airport & Leh Airport (Kushok Bakula Rimpochee).",
          "By Train: Jammu Tawi is the main railway gateway.",
          "By Road: Scenic mountain roads from Jammu, Himachal and Ladakh (check weather in winter)."
        ],
        facts: [
          "Known as the 'Paradise on Earth' for its stunning valleys and lakes.",
          "Dal Lake shikara rides in Srinagar are a must-do experience.",
          "Gulmarg is a popular skiing and snowboarding destination.",
          "Leh–Ladakh is famous for high-altitude passes and Buddhist monasteries."
        ]
      },
      {
        id: "hp",
        name: "Himachal Pradesh",
        short: "Hill stations, snow, treks and chill vibes.",
        places: ["Manali", "Shimla", "Dharamshala", "Spiti Valley"],
        travel: [
          "By Air: Kullu, Shimla, Dharamshala airports for major hill towns.",
          "By Train: Kalka and Pathankot are popular rail heads.",
          "By Road: Well-connected by scenic bus routes from Delhi, Chandigarh and other North Indian cities."
        ],
        facts: [
          "Manali and Shimla are two of India’s most famous hill stations.",
          "Spiti Valley offers surreal moon-like landscapes and high passes.",
          "Dharamshala and McLeod Ganj are known for Tibetan culture and monasteries.",
          "Ideal for trekking, camping, paragliding and snow adventures."
        ]
      },
      {
        id: "uk",
        name: "Uttarakhand",
        short: "Yoga towns, holy rivers and peaceful hill stations.",
        places: ["Rishikesh", "Haridwar", "Mussoorie", "Nainital", "Auli"],
        travel: [
          "By Air: Jolly Grant Airport (Dehradun) for Rishikesh, Haridwar, Mussoorie.",
          "By Train: Haridwar, Rishikesh, Dehradun and Kathgodam are key railway stations.",
          "By Road: Good road connectivity from Delhi and other North Indian cities."
        ],
        facts: [
          "Rishikesh is called the 'Yoga Capital of the World'.",
          "Haridwar is one of the holiest cities on the banks of the Ganga.",
          "Auli is a beautiful skiing destination with amazing Himalayan views.",
          "Nainital and Mussoorie are classic hill stations with lakes and viewpoints."
        ]
      },
      {
        id: "delhi",
        name: "Delhi",
        short: "Capital city with history, bazaars and monuments.",
        places: ["India Gate", "Red Fort", "Qutub Minar"],
        travel: [
          "By Air: Indira Gandhi International Airport (one of India’s busiest).",
          "By Train: Multiple major railway stations like New Delhi and Hazrat Nizamuddin.",
          "By Metro & Road: Extensive metro network and city buses, cabs and autos."
        ],
        facts: [
          "India Gate is a war memorial and a popular evening hangout spot.",
          "Red Fort and Qutub Minar are UNESCO World Heritage Sites.",
          "Old Delhi is famous for street food and crowded markets.",
          "A great starting point for Golden Triangle trips (Delhi–Agra–Jaipur)."
        ]
      },
      {
        id: "raj",
        name: "Rajasthan",
        short: "Deserts, palaces and royal heritage.",
        places: ["Jaipur", "Udaipur", "Jaisalmer", "Jodhpur"],
        travel: [
          "By Air: Jaipur, Udaipur and Jodhpur have airports for major cities.",
          "By Train: Jaipur, Jodhpur and Udaipur are well-connected by rail.",
          "By Road: Good highways connect Rajasthan to Delhi, Gujarat and MP."
        ],
        facts: [
          "Jaipur is called the 'Pink City' with forts and colorful markets.",
          "Udaipur is famous for its lakes and romantic palaces.",
          "Jaisalmer offers desert safaris and golden sandstone forts.",
          "Jodhpur is known as the 'Blue City' with Mehrangarh Fort towering over it."
        ]
      }
    ]
  },

  south: {
    name: "Southern India",
    tagline: "Famous for beaches, temples, greenery, and heritage.",
    states: [
      {
        id: "kar",
        name: "Karnataka",
        short: "Coffee hills, heritage ruins and chill beaches.",
        places: ["Coorg", "Gokarna", "Hampi", "Mysuru"],
        travel: [
          "By Air: Bengaluru, Mangaluru and Hubballi airports connect major regions.",
          "By Train: Well-connected rail network to Bengaluru, Mysuru and other cities.",
          "By Road: Good highways from neighboring states and coastal routes."
        ],
        facts: [
          "Coorg is known as the 'Scotland of India' with coffee plantations.",
          "Gokarna offers calm beaches and relaxed backpacker vibes.",
          "Hampi is a UNESCO World Heritage Site with ancient temple ruins.",
          "Mysuru is famous for its palace and Dussehra celebrations."
        ]
      },
      {
        id: "kerala",
        name: "Kerala",
        short: "Backwaters, greenery and peaceful life.",
        places: ["Munnar", "Alleppey Backwaters", "Kochi", "Wayanad"],
        travel: [
          "By Air: Kochi, Thiruvananthapuram and Kozhikode airports.",
          "By Train: Dense rail network connecting most towns and cities.",
          "By Road & Water: Scenic roads and houseboat cruises in the backwaters."
        ],
        facts: [
          "Called 'God’s Own Country' for its natural beauty.",
          "Munnar is famous for tea gardens and misty hills.",
          "Alleppey backwaters offer houseboat stays and canal views.",
          "Kochi blends colonial history, beaches and modern cafes."
        ]
      },
      {
        id: "tn",
        name: "Tamil Nadu",
        short: "Hill stations, beaches and powerful temples.",
        places: ["Ooty", "Kodaikanal", "Rameswaram", "Chennai (Marina Beach)"],
        travel: [
          "By Air: Chennai, Coimbatore and Madurai are major airports.",
          "By Train: Strong rail network connecting temple towns and hill stations.",
          "By Road: Good bus connectivity between cities and tourist spots."
        ],
        facts: [
          "Ooty and Kodaikanal are classic hill getaways in the Nilgiris.",
          "Rameswaram is an important pilgrimage island with a long sea bridge.",
          "Chennai’s Marina Beach is one of the longest urban beaches in the world.",
          "Tamil Nadu has many ancient Dravidian-style temples."
        ]
      },
      {
        id: "aptg",
        name: "Andhra Pradesh & Telangana",
        short: "Coastlines, valleys and vibrant cities.",
        places: ["Araku Valley", "Tirupati", "Hyderabad (Charminar)", "Hyderabad (Golconda Fort)"],
        travel: [
          "By Air: Hyderabad, Visakhapatnam, Vijayawada and Tirupati airports.",
          "By Train: Major stations connect to almost all Indian metro cities.",
          "By Road: Buses and private cabs connect hill stations and cities."
        ],
        facts: [
          "Araku Valley is a lush hill region near Visakhapatnam.",
          "Tirupati is one of India’s most visited temple towns.",
          "Hyderabad is famous for Charminar, biryani and old bazaars.",
          "Golconda Fort offers evening light shows and city views."
        ]
      }
    ]
  },

  east: {
    name: "Eastern India",
    tagline: "Known for culture, tea gardens, and natural beauty.",
    states: [
      {
        id: "wb",
        name: "West Bengal",
        short: "Hill views, mangroves and big-city culture.",
        places: ["Darjeeling", "Kolkata (Victoria Memorial)", "Sundarbans"],
        travel: [
          "By Air: Kolkata and Bagdogra airports.",
          "By Train: Extensive rail network from Kolkata across the state.",
          "By Road & River: Ferries in the Sundarbans and road trips to the hills."
        ],
        facts: [
          "Darjeeling is famous for tea and toy train rides.",
          "Kolkata is known as the 'City of Joy' with rich culture and heritage.",
          "Victoria Memorial is an iconic marble monument in Kolkata.",
          "Sundarbans is home to mangrove forests and the Bengal tiger."
        ]
      },
      {
        id: "sikkim",
        name: "Sikkim",
        short: "Compact state full of high mountains and lakes.",
        places: ["Gangtok", "Nathula Pass", "Tsomgo Lake"],
        travel: [
          "By Air: Nearest major airport is Bagdogra (West Bengal).",
          "By Road: Scenic mountain roads from Siliguri to Gangtok.",
          "Permits: Nathula and some areas need special permits for tourists."
        ],
        facts: [
          "Gangtok is a clean hill city with monasteries and viewpoints.",
          "Tsomgo (Changu) Lake is a high-altitude glacial lake.",
          "Nathula Pass lies on the Indo–China border and offers dramatic views.",
          "Sikkim promotes eco-tourism and is known for orchids and waterfalls."
        ]
      },
      {
        id: "odisha",
        name: "Odisha",
        short: "Beaches, temples and coastal lagoons.",
        places: ["Puri (Jagannath Temple & Beach)", "Konark Sun Temple", "Chilika Lake"],
        travel: [
          "By Air: Bhubaneswar is the main airport.",
          "By Train: Puri and Bhubaneswar are well connected by train.",
          "By Road & Water: Road trips along the coast, boating on Chilika Lake."
        ],
        facts: [
          "Puri is one of the Char Dham pilgrimage sites.",
          "Jagannath Rath Yatra is a famous chariot festival.",
          "Konark Sun Temple is a UNESCO World Heritage Site.",
          "Chilika Lake is Asia’s largest brackish water lagoon, popular for birds and dolphins."
        ]
      },
      {
        id: "assam",
        name: "Assam",
        short: "Tea gardens, rivers and wildlife.",
        places: ["Kaziranga National Park", "Guwahati", "Majuli Island"],
        travel: [
          "By Air: Guwahati is the main airport; Jorhat and others for specific areas.",
          "By Train: Guwahati is a major rail hub for Northeast India.",
          "By Road & Ferry: Roads and ferries connect river islands like Majuli."
        ],
        facts: [
          "Kaziranga is famous for the one-horned rhinoceros.",
          "Guwahati sits on the banks of the Brahmaputra River.",
          "Majuli is one of the world’s largest river islands.",
          "Assam is known globally for its tea gardens."
        ]
      }
    ]
  },

  west: {
    name: "Western India",
    tagline: "Deserts, beaches, architecture, and nightlife.",
    states: [
      {
        id: "goa",
        name: "Goa",
        short: "Lively beaches, nightlife and relaxed vibes.",
        places: ["Calangute", "Baga", "Candolim", "Anjuna"],
        travel: [
          "By Air: Dabolim and Manohar International Airport (Mopa).",
          "By Train: Several stations including Madgaon and Thivim.",
          "By Road: Buses and self-drive from Karnataka and Maharashtra."
        ],
        facts: [
          "Goa is India’s party capital with many beaches and clubs.",
          "Calangute and Baga are popular for water sports.",
          "Anjuna is known for its flea markets and sunsets.",
          "Goa also has beautiful churches and Portuguese-era architecture."
        ]
      },
      {
        id: "gujarat",
        name: "Gujarat",
        short: "White deserts, lions and modern monuments.",
        places: ["Rann of Kutch", "Gir National Park", "Statue of Unity"],
        travel: [
          "By Air: Ahmedabad, Bhuj, Rajkot and Vadodara airports.",
          "By Train: Wide rail connectivity across the state.",
          "By Road: Highways connect major cities and tourist sites."
        ],
        facts: [
          "The Rann of Kutch offers surreal white salt desert landscapes.",
          "Gir National Park is home to Asiatic lions.",
          "Statue of Unity is one of the tallest statues in the world.",
          "Gujarat is known for vibrant festivals like Navratri."
        ]
      },
      {
        id: "mh",
        name: "Maharashtra",
        short: "Busy cities, hill getaways and coastal drives.",
        places: ["Mumbai", "Lonavala", "Mahabaleshwar", "Pune"],
        travel: [
          "By Air: Major airports in Mumbai and Pune.",
          "By Train: Dense rail network, especially around Mumbai and Pune.",
          "By Road: Expressways connect Mumbai–Pune–Lonavala–Mahabaleshwar."
        ],
        facts: [
          "Mumbai is India’s financial capital and home of Bollywood.",
          "Lonavala and Khandala are popular monsoon hill getaways.",
          "Mahabaleshwar is famous for strawberries and viewpoints.",
          "Pune is a major education and IT hub with pleasant climate."
        ]
      }
    ]
  },

  central: {
    name: "Central India",
    tagline: "Known for wildlife and heritage sites.",
    states: [
      {
        id: "mp",
        name: "Madhya Pradesh",
        short: "Forests, tigers and ancient temples.",
        places: ["Khajuraho Temples", "Bandhavgarh National Park", "Kanha National Park", "Bhopal"],
        travel: [
          "By Air: Bhopal, Indore and Jabalpur airports.",
          "By Train: Good rail connectivity to major cities.",
          "By Road: National highways connect wildlife parks and heritage sites."
        ],
        facts: [
          "Khajuraho Temples are famous for intricate stone carvings.",
          "Bandhavgarh and Kanha are top tiger reserves in India.",
          "Madhya Pradesh is often called the 'Heart of India'.",
          "Bhopal is known as the 'City of Lakes'."
        ]
      },
      {
        id: "cg",
        name: "Chhattisgarh",
        short: "Less-crowded waterfalls and forests.",
        places: ["Chitrakoot Waterfalls", "Jagdalpur", "Barnawapara Sanctuary"],
        travel: [
          "By Air: Raipur is the main airport.",
          "By Train: Rail lines connect major towns like Raipur and Jagdalpur.",
          "By Road: Road trips through forested regions and villages."
        ],
        facts: [
          "Chitrakoot Waterfalls is often called the 'Niagara of India'.",
          "Jagdalpur is a base for exploring Bastar region’s culture and nature.",
          "Barnawapara Wildlife Sanctuary is known for rich flora and fauna.",
          "Chhattisgarh offers raw, offbeat travel experiences."
        ]
      }
    ]
  }
};

// ========== IMAGE CONFIG FOR ALL PLACES ==========

// 1 thumbnail per place
const placeThumbnailMap = {
  "Srinagar":
    "https://media.istockphoto.com/id/1096502490/photo/dal-lake-house-boat-morning-sun-rise-and-lake-reflection.jpg?s=612x612&w=0&k=20&c=_MebV6kHbvAbiwmrDCLRhCmb2iqW-HgNdzIwX7bM7pE=",
  "Gulmarg":
    "https://t4.ftcdn.net/jpg/03/62/19/27/360_F_362192710_3iIlgxQS78PoqysUTzdARNYeKFBaFxE9.jpg",
  "Pahalgam":
    "https://media.istockphoto.com/id/488722541/photo/the-beautiful-nature-with-himalaya-mountain-background.jpg?s=612x612&w=0&k=20&c=9TOH5KqrKuHvVC_yd6Y3Vxpi8mBoyKcbQs301kd8hO4=",
  "Leh–Ladakh":
    "https://media.istockphoto.com/id/1218830644/photo/beautiful-lake.jpg?s=612x612&w=0&k=20&c=r5or5KmtrZE5P93cDPG2FzxWQxhZA0qeTInoXJ7qXxA=",
  "Manali":
    "https://i.ytimg.com/vi/TsJiwEz5BDU/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDbDkrNC_IbYoLV_i1rX2-mDXbwfA",
  "Shimla":
    "https://t3.ftcdn.net/jpg/03/40/58/02/360_F_340580278_RTo3vXppsiITp3XSdIvNTENpBzDRWlAn.jpg",
  Dharamshala: "https://www.shutterstock.com/image-photo/dhramshala-cricket-stadium-himalchal-pradesh-600nw-1326861611.jpg",
  "Spiti Valley": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDz5gjNfESfB4Kru60YnDmZBzM19CQKb5NZg&s",
  Rishikesh:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_22ccylZzREBRL2M9GZKjppDlavmTPdQHLg&s",
  Haridwar:
    "https://media.istockphoto.com/id/825268350/photo/hardiwar.jpg?s=612x612&w=0&k=20&c=eCQt-N-2-wVm_imfNFtRyOPds8-NVLuoxTkHQ8N0ESg=",
  Mussoorie:
    "https://t3.ftcdn.net/jpg/02/33/23/76/360_F_233237697_Hz6Y1YumSJFpPuZbW4eJLrlTiboIWTDd.jpg",
  Nainital:
    "https://media.istockphoto.com/id/484389570/photo/himalayas.jpg?s=612x612&w=0&k=20&c=6jM32XJBWlvv6x7AF-av52jlncPkz5hn_AEhjaDSFYI=",
  Auli:
    "https://www.shutterstock.com/image-photo/auli-himalayan-ski-resort-hill-600nw-2466311907.jpg",
  "India Gate": "images/india-gate-thumb.jpg",
  "Red Fort": "images/red-fort-thumb.jpg",
  "Qutub Minar": "images/qutub-minar-thumb.jpg",
  Jaipur: "images/jaipur-thumb.jpg",
  Udaipur: "images/udaipur-thumb.jpg",
  Jaisalmer: "images/jaisalmer-thumb.jpg",
  Jodhpur: "images/jodhpur-thumb.jpg",

  Coorg: "images/coorg-thumb.jpg",
  Gokarna: "images/gokarna-thumb.jpg",
  Hampi: "images/hampi-thumb.jpg",
  Mysuru: "images/mysuru-thumb.jpg",
  Munnar: "images/munnar-thumb.jpg",
  "Alleppey Backwaters": "images/alleppey-backwaters-thumb.jpg",
  Kochi: "images/kochi-thumb.jpg",
  Wayanad: "images/wayanad-thumb.jpg",
  Ooty: "images/ooty-thumb.jpg",
  Kodaikanal: "images/kodaikanal-thumb.jpg",
  Rameswaram: "images/rameswaram-thumb.jpg",
  "Chennai (Marina Beach)": "images/chennai-marina-beach-thumb.jpg",
  "Araku Valley": "images/araku-valley-thumb.jpg",
  Tirupati: "images/tirupati-thumb.jpg",
  "Hyderabad (Charminar)": "images/hyderabad-charminar-thumb.jpg",
  "Hyderabad (Golconda Fort)": "images/hyderabad-golconda-fort-thumb.jpg",

  Darjeeling: "images/darjeeling-thumb.jpg",
  "Kolkata (Victoria Memorial)":
    "images/kolkata-victoria-memorial-thumb.jpg",
  Sundarbans: "images/sundarbans-thumb.jpg",
  Gangtok: "images/gangtok-thumb.jpg",
  "Nathula Pass": "images/nathula-pass-thumb.jpg",
  "Tsomgo Lake": "images/tsomgo-lake-thumb.jpg",
  "Puri (Jagannath Temple & Beach)":
    "images/puri-jagannath-temple-beach-thumb.jpg",
  "Konark Sun Temple": "images/konark-sun-temple-thumb.jpg",
  "Chilika Lake": "images/chilika-lake-thumb.jpg",
  "Kaziranga National Park":
    "images/kaziranga-national-park-thumb.jpg",
  Guwahati: "images/guwahati-thumb.jpg",
  "Majuli Island": "images/majuli-island-thumb.jpg",

  Calangute: "images/calangute-thumb.jpg",
  Baga: "images/baga-thumb.jpg",
  Candolim: "images/candolim-thumb.jpg",
  Anjuna: "images/anjuna-thumb.jpg",
  "Rann of Kutch": "images/rann-of-kutch-thumb.jpg",
  "Gir National Park": "images/gir-national-park-thumb.jpg",
  "Statue of Unity": "images/statue-of-unity-thumb.jpg",
  Mumbai: "images/mumbai-thumb.jpg",
  Lonavala: "images/lonavala-thumb.jpg",
  Mahabaleshwar: "images/mahabaleshwar-thumb.jpg",
  Pune: "images/pune-thumb.jpg",

  "Khajuraho Temples": "images/khajuraho-temples-thumb.jpg",
  "Bandhavgarh National Park":
    "images/bandhavgarh-national-park-thumb.jpg",
  "Kanha National Park": "images/kanha-national-park-thumb.jpg",
  Bhopal: "images/bhopal-thumb.jpg",
  "Chitrakoot Waterfalls": "images/chitrakoot-waterfalls-thumb.jpg",
  Jagdalpur: "images/jagdalpur-thumb.jpg",
  "Barnawapara Sanctuary": "images/barnawapara-sanctuary-thumb.jpg",
};

// 8 gallery images per place
const placeGalleryMap = {
  Srinagar: [
    "https://images.pexels.com/photos/26110235/pexels-photo-26110235.jpeg?cs=srgb&dl=pexels-amjed-wani-1355393378-26110235.jpg&fm=jpg",
    "https://images.unsplash.com/photo-1614056965546-42fbe24eb36c?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNyaW5hZ2FyfGVufDB8fDB8fHww",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc3ivna3yngf6S_CwKpmkEFaSRpp9TKMqghw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7aKL1JmBVA8liDdmhQDzWI5miqfztb639aw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAwJ65xbTOXBAjJjI9GYSSRiBCMkWJkZz3JQ&s",
    "https://media.istockphoto.com/id/899087286/photo/waterplants-on-dal-lake-srinagar-kashmir-india.jpg?s=612x612&w=0&k=20&c=eg1bh74yfxt1qi8WdQtQ8VOGpeZjT4Jp4ozay3Rg2IQ=",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRFu8WfcjNz6m2LguRo4VD18FdsfhtM7Ha4Q&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4ULLlQUSZC8YFRLnYQQH-9bV8OPzeFp6Uyw&s"
  ],
  Gulmarg: [
    "images/gulmarg-1.jpg",
    "images/gulmarg-2.jpg",
    "images/gulmarg-3.jpg",
    "images/gulmarg-4.jpg",
    "images/gulmarg-5.jpg",
    "images/gulmarg-6.jpg",
    "images/gulmarg-7.jpg",
    "images/gulmarg-8.jpg"
  ],
  Pahalgam: [
    "images/pahalgam-1.jpg",
    "images/pahalgam-2.jpg",
    "images/pahalgam-3.jpg",
    "images/pahalgam-4.jpg",
    "images/pahalgam-5.jpg",
    "images/pahalgam-6.jpg",
    "images/pahalgam-7.jpg",
    "images/pahalgam-8.jpg"
  ],
  "Leh–Ladakh": [
    "images/leh-ladakh-1.jpg",
    "images/leh-ladakh-2.jpg",
    "images/leh-ladakh-3.jpg",
    "images/leh-ladakh-4.jpg",
    "images/leh-ladakh-5.jpg",
    "images/leh-ladakh-6.jpg",
    "images/leh-ladakh-7.jpg",
    "images/leh-ladakh-8.jpg"
  ],
  Manali: [
    "images/manali-1.jpg",
    "images/manali-2.jpg",
    "images/manali-3.jpg",
    "images/manali-4.jpg",
    "images/manali-5.jpg",
    "images/manali-6.jpg",
    "images/manali-7.jpg",
    "images/manali-8.jpg"
  ],
  Shimla: [
    "images/shimla-1.jpg",
    "images/shimla-2.jpg",
    "images/shimla-3.jpg",
    "images/shimla-4.jpg",
    "images/shimla-5.jpg",
    "images/shimla-6.jpg",
    "images/shimla-7.jpg",
    "images/shimla-8.jpg"
  ],
  Dharamshala: [
    "images/dharamshala-1.jpg",
    "images/dharamshala-2.jpg",
    "images/dharamshala-3.jpg",
    "images/dharamshala-4.jpg",
    "images/dharamshala-5.jpg",
    "images/dharamshala-6.jpg",
    "images/dharamshala-7.jpg",
    "images/dharamshala-8.jpg"
  ],
  "Spiti Valley": [
    "images/spiti-valley-1.jpg",
    "images/spiti-valley-2.jpg",
    "images/spiti-valley-3.jpg",
    "images/spiti-valley-4.jpg",
    "images/spiti-valley-5.jpg",
    "images/spiti-valley-6.jpg",
    "images/spiti-valley-7.jpg",
    "images/spiti-valley-8.jpg"
  ],
  Rishikesh: [
    "images/rishikesh-1.jpg",
    "images/rishikesh-2.jpg",
    "images/rishikesh-3.jpg",
    "images/rishikesh-4.jpg",
    "images/rishikesh-5.jpg",
    "images/rishikesh-6.jpg",
    "images/rishikesh-7.jpg",
    "images/rishikesh-8.jpg"
  ],
  Haridwar: [
    "images/haridwar-1.jpg",
    "images/haridwar-2.jpg",
    "images/haridwar-3.jpg",
    "images/haridwar-4.jpg",
    "images/haridwar-5.jpg",
    "images/haridwar-6.jpg",
    "images/haridwar-7.jpg",
    "images/haridwar-8.jpg"
  ],
  Mussoorie: [
    "images/mussoorie-1.jpg",
    "images/mussoorie-2.jpg",
    "images/mussoorie-3.jpg",
    "images/mussoorie-4.jpg",
    "images/mussoorie-5.jpg",
    "images/mussoorie-6.jpg",
    "images/mussoorie-7.jpg",
    "images/mussoorie-8.jpg"
  ],
  Nainital: [
    "images/nainital-1.jpg",
    "images/nainital-2.jpg",
    "images/nainital-3.jpg",
    "images/nainital-4.jpg",
    "images/nainital-5.jpg",
    "images/nainital-6.jpg",
    "images/nainital-7.jpg",
    "images/nainital-8.jpg"
  ],
  Auli: [
    "images/auli-1.jpg",
    "images/auli-2.jpg",
    "images/auli-3.jpg",
    "images/auli-4.jpg",
    "images/auli-5.jpg",
    "images/auli-6.jpg",
    "images/auli-7.jpg",
    "images/auli-8.jpg"
  ],
  "India Gate": [
    "images/india-gate-1.jpg",
    "images/india-gate-2.jpg",
    "images/india-gate-3.jpg",
    "images/india-gate-4.jpg",
    "images/india-gate-5.jpg",
    "images/india-gate-6.jpg",
    "images/india-gate-7.jpg",
    "images/india-gate-8.jpg"
  ],
  "Red Fort": [
    "images/red-fort-1.jpg",
    "images/red-fort-2.jpg",
    "images/red-fort-3.jpg",
    "images/red-fort-4.jpg",
    "images/red-fort-5.jpg",
    "images/red-fort-6.jpg",
    "images/red-fort-7.jpg",
    "images/red-fort-8.jpg"
  ],
  "Qutub Minar": [
    "images/qutub-minar-1.jpg",
    "images/qutub-minar-2.jpg",
    "images/qutub-minar-3.jpg",
    "images/qutub-minar-4.jpg",
    "images/qutub-minar-5.jpg",
    "images/qutub-minar-6.jpg",
    "images/qutub-minar-7.jpg",
    "images/qutub-minar-8.jpg"
  ],
  Jaipur: [
    "images/jaipur-1.jpg",
    "images/jaipur-2.jpg",
    "images/jaipur-3.jpg",
    "images/jaipur-4.jpg",
    "images/jaipur-5.jpg",
    "images/jaipur-6.jpg",
    "images/jaipur-7.jpg",
    "images/jaipur-8.jpg"
  ],
  Udaipur: [
    "images/udaipur-1.jpg",
    "images/udaipur-2.jpg",
    "images/udaipur-3.jpg",
    "images/udaipur-4.jpg",
    "images/udaipur-5.jpg",
    "images/udaipur-6.jpg",
    "images/udaipur-7.jpg",
    "images/udaipur-8.jpg"
  ],
  Jaisalmer: [
    "images/jaisalmer-1.jpg",
    "images/jaisalmer-2.jpg",
    "images/jaisalmer-3.jpg",
    "images/jaisalmer-4.jpg",
    "images/jaisalmer-5.jpg",
    "images/jaisalmer-6.jpg",
    "images/jaisalmer-7.jpg",
    "images/jaisalmer-8.jpg"
  ],
  Jodhpur: [
    "images/jodhpur-1.jpg",
    "images/jodhpur-2.jpg",
    "images/jodhpur-3.jpg",
    "images/jodhpur-4.jpg",
    "images/jodhpur-5.jpg",
    "images/jodhpur-6.jpg",
    "images/jodhpur-7.jpg",
    "images/jodhpur-8.jpg"
  ],

  Coorg: [
    "images/coorg-1.jpg",
    "images/coorg-2.jpg",
    "images/coorg-3.jpg",
    "images/coorg-4.jpg",
    "images/coorg-5.jpg",
    "images/coorg-6.jpg",
    "images/coorg-7.jpg",
    "images/coorg-8.jpg"
  ],
  Gokarna: [
    "images/gokarna-1.jpg",
    "images/gokarna-2.jpg",
    "images/gokarna-3.jpg",
    "images/gokarna-4.jpg",
    "images/gokarna-5.jpg",
    "images/gokarna-6.jpg",
    "images/gokarna-7.jpg",
    "images/gokarna-8.jpg"
  ],
  Hampi: [
    "images/hampi-1.jpg",
    "images/hampi-2.jpg",
    "images/hampi-3.jpg",
    "images/hampi-4.jpg",
    "images/hampi-5.jpg",
    "images/hampi-6.jpg",
    "images/hampi-7.jpg",
    "images/hampi-8.jpg"
  ],
  Mysuru: [
    "images/mysuru-1.jpg",
    "images/mysuru-2.jpg",
    "images/mysuru-3.jpg",
    "images/mysuru-4.jpg",
    "images/mysuru-5.jpg",
    "images/mysuru-6.jpg",
    "images/mysuru-7.jpg",
    "images/mysuru-8.jpg"
  ],
  Munnar: [
    "images/munnar-1.jpg",
    "images/munnar-2.jpg",
    "images/munnar-3.jpg",
    "images/munnar-4.jpg",
    "images/munnar-5.jpg",
    "images/munnar-6.jpg",
    "images/munnar-7.jpg",
    "images/munnar-8.jpg"
  ],
  "Alleppey Backwaters": [
    "images/alleppey-backwaters-1.jpg",
    "images/alleppey-backwaters-2.jpg",
    "images/alleppey-backwaters-3.jpg",
    "images/alleppey-backwaters-4.jpg",
    "images/alleppey-backwaters-5.jpg",
    "images/alleppey-backwaters-6.jpg",
    "images/alleppey-backwaters-7.jpg",
    "images/alleppey-backwaters-8.jpg"
  ],
  Kochi: [
    "images/kochi-1.jpg",
    "images/kochi-2.jpg",
    "images/kochi-3.jpg",
    "images/kochi-4.jpg",
    "images/kochi-5.jpg",
    "images/kochi-6.jpg",
    "images/kochi-7.jpg",
    "images/kochi-8.jpg"
  ],
  Wayanad: [
    "images/wayanad-1.jpg",
    "images/wayanad-2.jpg",
    "images/wayanad-3.jpg",
    "images/wayanad-4.jpg",
    "images/wayanad-5.jpg",
    "images/wayanad-6.jpg",
    "images/wayanad-7.jpg",
    "images/wayanad-8.jpg"
  ],
  Ooty: [
    "images/ooty-1.jpg",
    "images/ooty-2.jpg",
    "images/ooty-3.jpg",
    "images/ooty-4.jpg",
    "images/ooty-5.jpg",
    "images/ooty-6.jpg",
    "images/ooty-7.jpg",
    "images/ooty-8.jpg"
  ],
  Kodaikanal: [
    "images/kodaikanal-1.jpg",
    "images/kodaikanal-2.jpg",
    "images/kodaikanal-3.jpg",
    "images/kodaikanal-4.jpg",
    "images/kodaikanal-5.jpg",
    "images/kodaikanal-6.jpg",
    "images/kodaikanal-7.jpg",
    "images/kodaikanal-8.jpg"
  ],
  Rameswaram: [
    "images/rameswaram-1.jpg",
    "images/rameswaram-2.jpg",
    "images/rameswaram-3.jpg",
    "images/rameswaram-4.jpg",
    "images/rameswaram-5.jpg",
    "images/rameswaram-6.jpg",
    "images/rameswaram-7.jpg",
    "images/rameswaram-8.jpg"
  ],
  "Chennai (Marina Beach)": [
    "images/chennai-marina-beach-1.jpg",
    "images/chennai-marina-beach-2.jpg",
    "images/chennai-marina-beach-3.jpg",
    "images/chennai-marina-beach-4.jpg",
    "images/chennai-marina-beach-5.jpg",
    "images/chennai-marina-beach-6.jpg",
    "images/chennai-marina-beach-7.jpg",
    "images/chennai-marina-beach-8.jpg"
  ],
  "Araku Valley": [
    "images/araku-valley-1.jpg",
    "images/araku-valley-2.jpg",
    "images/araku-valley-3.jpg",
    "images/araku-valley-4.jpg",
    "images/araku-valley-5.jpg",
    "images/araku-valley-6.jpg",
    "images/araku-valley-7.jpg",
    "images/araku-valley-8.jpg"
  ],
  Tirupati: [
    "images/tirupati-1.jpg",
    "images/tirupati-2.jpg",
    "images/tirupati-3.jpg",
    "images/tirupati-4.jpg",
    "images/tirupati-5.jpg",
    "images/tirupati-6.jpg",
    "images/tirupati-7.jpg",
    "images/tirupati-8.jpg"
  ],
  "Hyderabad (Charminar)": [
    "images/hyderabad-charminar-1.jpg",
    "images/hyderabad-charminar-2.jpg",
    "images/hyderabad-charminar-3.jpg",
    "images/hyderabad-charminar-4.jpg",
    "images/hyderabad-charminar-5.jpg",
    "images/hyderabad-charminar-6.jpg",
    "images/hyderabad-charminar-7.jpg",
    "images/hyderabad-charminar-8.jpg"
  ],
  "Hyderabad (Golconda Fort)": [
    "images/hyderabad-golconda-fort-1.jpg",
    "images/hyderabad-golconda-fort-2.jpg",
    "images/hyderabad-golconda-fort-3.jpg",
    "images/hyderabad-golconda-fort-4.jpg",
    "images/hyderabad-golconda-fort-5.jpg",
    "images/hyderabad-golconda-fort-6.jpg",
    "images/hyderabad-golconda-fort-7.jpg",
    "images/hyderabad-golconda-fort-8.jpg"
  ],

  Darjeeling: [
    "images/darjeeling-1.jpg",
    "images/darjeeling-2.jpg",
    "images/darjeeling-3.jpg",
    "images/darjeeling-4.jpg",
    "images/darjeeling-5.jpg",
    "images/darjeeling-6.jpg",
    "images/darjeeling-7.jpg",
    "images/darjeeling-8.jpg"
  ],
  "Kolkata (Victoria Memorial)": [
    "images/kolkata-victoria-memorial-1.jpg",
    "images/kolkata-victoria-memorial-2.jpg",
    "images/kolkata-victoria-memorial-3.jpg",
    "images/kolkata-victoria-memorial-4.jpg",
    "images/kolkata-victoria-memorial-5.jpg",
    "images/kolkata-victoria-memorial-6.jpg",
    "images/kolkata-victoria-memorial-7.jpg",
    "images/kolkata-victoria-memorial-8.jpg"
  ],
  Sundarbans: [
    "images/sundarbans-1.jpg",
    "images/sundarbans-2.jpg",
    "images/sundarbans-3.jpg",
    "images/sundarbans-4.jpg",
    "images/sundarbans-5.jpg",
    "images/sundarbans-6.jpg",
    "images/sundarbans-7.jpg",
    "images/sundarbans-8.jpg"
  ],
  Gangtok: [
    "images/gangtok-1.jpg",
    "images/gangtok-2.jpg",
    "images/gangtok-3.jpg",
    "images/gangtok-4.jpg",
    "images/gangtok-5.jpg",
    "images/gangtok-6.jpg",
    "images/gangtok-7.jpg",
    "images/gangtok-8.jpg"
  ],
  "Nathula Pass": [
    "images/nathula-pass-1.jpg",
    "images/nathula-pass-2.jpg",
    "images/nathula-pass-3.jpg",
    "images/nathula-pass-4.jpg",
    "images/nathula-pass-5.jpg",
    "images/nathula-pass-6.jpg",
    "images/nathula-pass-7.jpg",
    "images/nathula-pass-8.jpg"
  ],
  "Tsomgo Lake": [
    "images/tsomgo-lake-1.jpg",
    "images/tsomgo-lake-2.jpg",
    "images/tsomgo-lake-3.jpg",
    "images/tsomgo-lake-4.jpg",
    "images/tsomgo-lake-5.jpg",
    "images/tsomgo-lake-6.jpg",
    "images/tsomgo-lake-7.jpg",
    "images/tsomgo-lake-8.jpg"
  ],
  "Puri (Jagannath Temple & Beach)": [
    "images/puri-jagannath-temple-beach-1.jpg",
    "images/puri-jagannath-temple-beach-2.jpg",
    "images/puri-jagannath-temple-beach-3.jpg",
    "images/puri-jagannath-temple-beach-4.jpg",
    "images/puri-jagannath-temple-beach-5.jpg",
    "images/puri-jagannath-temple-beach-6.jpg",
    "images/puri-jagannath-temple-beach-7.jpg",
    "images/puri-jagannath-temple-beach-8.jpg"
  ],
  "Konark Sun Temple": [
    "images/konark-sun-temple-1.jpg",
    "images/konark-sun-temple-2.jpg",
    "images/konark-sun-temple-3.jpg",
    "images/konark-sun-temple-4.jpg",
    "images/konark-sun-temple-5.jpg",
    "images/konark-sun-temple-6.jpg",
    "images/konark-sun-temple-7.jpg",
    "images/konark-sun-temple-8.jpg"
  ],
  "Chilika Lake": [
    "images/chilika-lake-1.jpg",
    "images/chilika-lake-2.jpg",
    "images/chilika-lake-3.jpg",
    "images/chilika-lake-4.jpg",
    "images/chilika-lake-5.jpg",
    "images/chilika-lake-6.jpg",
    "images/chilika-lake-7.jpg",
    "images/chilika-lake-8.jpg"
  ],
  "Kaziranga National Park": [
    "images/kaziranga-national-park-1.jpg",
    "images/kaziranga-national-park-2.jpg",
    "images/kaziranga-national-park-3.jpg",
    "images/kaziranga-national-park-4.jpg",
    "images/kaziranga-national-park-5.jpg",
    "images/kaziranga-national-park-6.jpg",
    "images/kaziranga-national-park-7.jpg",
    "images/kaziranga-national-park-8.jpg"
  ],
  Guwahati: [
    "images/guwahati-1.jpg",
    "images/guwahati-2.jpg",
    "images/guwahati-3.jpg",
    "images/guwahati-4.jpg",
    "images/guwahati-5.jpg",
    "images/guwahati-6.jpg",
    "images/guwahati-7.jpg",
    "images/guwahati-8.jpg"
  ],
  "Majuli Island": [
    "images/majuli-island-1.jpg",
    "images/majuli-island-2.jpg",
    "images/majuli-island-3.jpg",
    "images/majuli-island-4.jpg",
    "images/majuli-island-5.jpg",
    "images/majuli-island-6.jpg",
    "images/majuli-island-7.jpg",
    "images/majuli-island-8.jpg"
  ],

  Calangute: [
    "images/calangute-1.jpg",
    "images/calangute-2.jpg",
    "images/calangute-3.jpg",
    "images/calangute-4.jpg",
    "images/calangute-5.jpg",
    "images/calangute-6.jpg",
    "images/calangute-7.jpg",
    "images/calangute-8.jpg"
  ],
  Baga: [
    "images/baga-1.jpg",
    "images/baga-2.jpg",
    "images/baga-3.jpg",
    "images/baga-4.jpg",
    "images/baga-5.jpg",
    "images/baga-6.jpg",
    "images/baga-7.jpg",
    "images/baga-8.jpg"
  ],
  Candolim: [
    "images/candolim-1.jpg",
    "images/candolim-2.jpg",
    "images/candolim-3.jpg",
    "images/candolim-4.jpg",
    "images/candolim-5.jpg",
    "images/candolim-6.jpg",
    "images/candolim-7.jpg",
    "images/candolim-8.jpg"
  ],
  Anjuna: [
    "images/anjuna-1.jpg",
    "images/anjuna-2.jpg",
    "images/anjuna-3.jpg",
    "images/anjuna-4.jpg",
    "images/anjuna-5.jpg",
    "images/anjuna-6.jpg",
    "images/anjuna-7.jpg",
    "images/anjuna-8.jpg"
  ],
  "Rann of Kutch": [
    "images/rann-of-kutch-1.jpg",
    "images/rann-of-kutch-2.jpg",
    "images/rann-of-kutch-3.jpg",
    "images/rann-of-kutch-4.jpg",
    "images/rann-of-kutch-5.jpg",
    "images/rann-of-kutch-6.jpg",
    "images/rann-of-kutch-7.jpg",
    "images/rann-of-kutch-8.jpg"
  ],
  "Gir National Park": [
    "images/gir-national-park-1.jpg",
    "images/gir-national-park-2.jpg",
    "images/gir-national-park-3.jpg",
    "images/gir-national-park-4.jpg",
    "images/gir-national-park-5.jpg",
    "images/gir-national-park-6.jpg",
    "images/gir-national-park-7.jpg",
    "images/gir-national-park-8.jpg"
  ],
  "Statue of Unity": [
    "images/statue-of-unity-1.jpg",
    "images/statue-of-unity-2.jpg",
    "images/statue-of-unity-3.jpg",
    "images/statue-of-unity-4.jpg",
    "images/statue-of-unity-5.jpg",
    "images/statue-of-unity-6.jpg",
    "images/statue-of-unity-7.jpg",
    "images/statue-of-unity-8.jpg"
  ],
  Mumbai: [
    "images/mumbai-1.jpg",
    "images/mumbai-2.jpg",
    "images/mumbai-3.jpg",
    "images/mumbai-4.jpg",
    "images/mumbai-5.jpg",
    "images/mumbai-6.jpg",
    "images/mumbai-7.jpg",
    "images/mumbai-8.jpg"
  ],
  Lonavala: [
    "images/lonavala-1.jpg",
    "images/lonavala-2.jpg",
    "images/lonavala-3.jpg",
    "images/lonavala-4.jpg",
    "images/lonavala-5.jpg",
    "images/lonavala-6.jpg",
    "images/lonavala-7.jpg",
    "images/lonavala-8.jpg"
  ],
  Mahabaleshwar: [
    "images/mahabaleshwar-1.jpg",
    "images/mahabaleshwar-2.jpg",
    "images/mahabaleshwar-3.jpg",
    "images/mahabaleshwar-4.jpg",
    "images/mahabaleshwar-5.jpg",
    "images/mahabaleshwar-6.jpg",
    "images/mahabaleshwar-7.jpg",
    "images/mahabaleshwar-8.jpg"
  ],
  Pune: [
    "images/pune-1.jpg",
    "images/pune-2.jpg",
    "images/pune-3.jpg",
    "images/pune-4.jpg",
    "images/pune-5.jpg",
    "images/pune-6.jpg",
    "images/pune-7.jpg",
    "images/pune-8.jpg"
  ],

  "Khajuraho Temples": [
    "images/khajuraho-temples-1.jpg",
    "images/khajuraho-temples-2.jpg",
    "images/khajuraho-temples-3.jpg",
    "images/khajuraho-temples-4.jpg",
    "images/khajuraho-temples-5.jpg",
    "images/khajuraho-temples-6.jpg",
    "images/khajuraho-temples-7.jpg",
    "images/khajuraho-temples-8.jpg"
  ],
  "Bandhavgarh National Park": [
    "images/bandhavgarh-national-park-1.jpg",
    "images/bandhavgarh-national-park-2.jpg",
    "images/bandhavgarh-national-park-3.jpg",
    "images/bandhavgarh-national-park-4.jpg",
    "images/bandhavgarh-national-park-5.jpg",
    "images/bandhavgarh-national-park-6.jpg",
    "images/bandhavgarh-national-park-7.jpg",
    "images/bandhavgarh-national-park-8.jpg"
  ],
  "Kanha National Park": [
    "images/kanha-national-park-1.jpg",
    "images/kanha-national-park-2.jpg",
    "images/kanha-national-park-3.jpg",
    "images/kanha-national-park-4.jpg",
    "images/kanha-national-park-5.jpg",
    "images/kanha-national-park-6.jpg",
    "images/kanha-national-park-7.jpg",
    "images/kanha-national-park-8.jpg"
  ],
  Bhopal: [
    "images/bhopal-1.jpg",
    "images/bhopal-2.jpg",
    "images/bhopal-3.jpg",
    "images/bhopal-4.jpg",
    "images/bhopal-5.jpg",
    "images/bhopal-6.jpg",
    "images/bhopal-7.jpg",
    "images/bhopal-8.jpg"
  ],
  "Chitrakoot Waterfalls": [
    "images/chitrakoot-waterfalls-1.jpg",
    "images/chitrakoot-waterfalls-2.jpg",
    "images/chitrakoot-waterfalls-3.jpg",
    "images/chitrakoot-waterfalls-4.jpg",
    "images/chitrakoot-waterfalls-5.jpg",
    "images/chitrakoot-waterfalls-6.jpg",
    "images/chitrakoot-waterfalls-7.jpg",
    "images/chitrakoot-waterfalls-8.jpg"
  ],
  Jagdalpur: [
    "images/jagdalpur-1.jpg",
    "images/jagdalpur-2.jpg",
    "images/jagdalpur-3.jpg",
    "images/jagdalpur-4.jpg",
    "images/jagdalpur-5.jpg",
    "images/jagdalpur-6.jpg",
    "images/jagdalpur-7.jpg",
    "images/jagdalpur-8.jpg"
  ],
  "Barnawapara Sanctuary": [
    "images/barnawapara-sanctuary-1.jpg",
    "images/barnawapara-sanctuary-2.jpg",
    "images/barnawapara-sanctuary-3.jpg",
    "images/barnawapara-sanctuary-4.jpg",
    "images/barnawapara-sanctuary-5.jpg",
    "images/barnawapara-sanctuary-6.jpg",
    "images/barnawapara-sanctuary-7.jpg",
    "images/barnawapara-sanctuary-8.jpg"
  ]
};

// helper functions for images

function getPlaceThumbnail(placeName) {
  return placeThumbnailMap[placeName] || "images/default-thumb.jpg";
}

function generatePlaceGallery(placeName) {
  return (
    placeGalleryMap[placeName] || [
      "images/default-1.jpg",
      "images/default-2.jpg",
      "images/default-3.jpg",
      "images/default-4.jpg",
      "images/default-5.jpg",
      "images/default-6.jpg",
      "images/default-7.jpg",
      "images/default-8.jpg"
    ]
  );
}

// ========== NEW: REGION BACKGROUND HELPER ==========

function setRegionBackground(regionKey) {
  const main = document.getElementById("main-content");
  if (!main) return;

  main.classList.remove("bg-north", "bg-south", "bg-east", "bg-west", "bg-central");

  if (!regionKey) return;

  if (["north", "south", "east", "west", "central"].includes(regionKey)) {
    main.classList.add(`bg-${regionKey}`);
  }
}

// ========== PRICING / RECEIPT DATA ==========

const defaultPricing = {
  travel: 6000,
  hotel: 7000,
  food: 3000,
  gstRate: 5
};

const placeDetailsConfig = {
  Srinagar: {
    subtitle: "Shikaras, Mughal gardens and mountain views around Dal Lake.",
    lat: 34.0837,
    lng: 74.7973,
    travel: [
      "Fly into Srinagar International Airport and take a cab (30–40 minutes) to Dal Lake or the city centre.",
      "Move around by shikara on Dal Lake and local taxis/autorickshaws along Boulevard Road."
    ],
    facts: [
      "Dal Lake is famous for its houseboats, shikaras and floating markets.",
      "Morning and sunset shikara rides are a must-do experience."
    ],
    events: [
      "Tulip Festival at Indira Gandhi Memorial Tulip Garden in spring (typically March–April).",
      "Local cultural evenings and shikara-light shows during peak tourist season."
    ],
    packageInclude: ["One night ‘full jagamaga’ houseboat experience with decorated rooms and special dinner."],
    restaurants: [
      "Fat Panda – popular lake-view spot near Dal Gate.",
      "Chinar Garden at The Lalit – classic lakeside dining.",
      "Shamyana Restaurant on Boulevard Road for Kashmiri wazwan."
    ],
    pricing: {
      travel: 7000,
      hotel: 9000,
      food: 3500,
      gstRate: 5
    }
  },

  Gulmarg: {
    subtitle: "Skiing, cable cars and lush meadows in Kashmir.",
    lat: 34.0484,
    lng: 74.3805,
    travel: [
      "Fly into Srinagar Airport and drive 1.5–2 hours to Gulmarg.",
      "Local taxis or shared cabs from Srinagar."
    ],
    facts: [
      "Gulmarg is a premier skiing destination with Gondola cable car rides.",
      "Known for its golf course and scenic hiking trails."
    ],
    events: [
      "Winter skiing festivals and snow activities.",
      "Summer trekking and paragliding events."
    ],
    packageInclude: ["One night stay with cable car access and skiing gear rental."],
    restaurants: [
      "Local cafes serving Kashmiri tea and snacks.",
      "In-resort dining with international cuisine."
    ],
    pricing: {
      travel: 6500,
      hotel: 8500,
      food: 3200,
      gstRate: 5
    }
  },

  Pahalgam: {
    subtitle: "Tranquil valleys, rivers and adventure in Kashmir.",
    lat: 34.0161,
    lng: 75.3150,
    travel: [
      "Fly into Srinagar Airport and drive 2–3 hours to Pahalgam.",
      "Buses and taxis from Srinagar or Jammu."
    ],
    facts: [
      "Pahalgam is a base for trekking to Amarnath Cave.",
      "Famous for Lidder River and Betaab Valley."
    ],
    events: [
      "Amarnath Yatra season events.",
      "Local festivals and river rafting camps."
    ],
    packageInclude: ["One night riverside camp with bonfire."],
    restaurants: [
      "Riverside shacks with local delicacies.",
      "Homestay kitchens offering Kashmiri food."
    ],
    pricing: {
      travel: 6800,
      hotel: 8800,
      food: 3400,
      gstRate: 5
    }
  },

  "Leh–Ladakh": {
    subtitle: "High-altitude deserts, monasteries and passes.",
    lat: 34.1526,
    lng: 77.5771,
    travel: [
      "Fly into Leh Airport (Kushok Bakula Rimpochee).",
      "Overland routes via Manali or Srinagar (check acclimatization)."
    ],
    facts: [
      "Leh–Ladakh features Pangong Lake and Nubra Valley.",
      "Known for Buddhist monasteries and high passes like Khardung La."
    ],
    events: [
      "Hemis Festival and local Buddhist celebrations.",
      "Adventure treks and bike tours."
    ],
    packageInclude: ["One night stay with acclimatization support."],
    restaurants: [
      "Tibetan and Ladakhi eateries in Leh.",
      "Camp kitchens during treks."
    ],
    pricing: {
      travel: 12000,
      hotel: 10000,
      food: 4000,
      gstRate: 5
    }
  },

  Manali: {
    subtitle: "Snowy peaks, riverside cafes and adventure sports in Himachal.",
    lat: 32.2432,
    lng: 77.1892,
    travel: [
      "Nearest airport: Kullu–Manali Airport (Bhuntar), about 50 km from Manali.",
      "Overnight Volvo buses and taxis from Delhi/Chandigarh via the Kullu valley."
    ],
    facts: [
      "Old Manali is known for cosy cafes and scenic trails.",
      "Solang Valley and Atal Tunnel side trips are popular for snow and views."
    ],
    events: [
      "National Winter Carnival in Manali (early January).",
      "Local festivals such as Hadimba Devi Fair and Doongri Forest Festival."
    ],
    packageInclude: ["One night ‘full jagamaga’ campfire experience with music and local food."],
    restaurants: [
      "Cafes in Old Manali serving international and Himachali food.",
      "Mall Road restaurants with hot momos, thukpa and trout specials."
    ],
    pricing: {
      travel: 6500,
      hotel: 8000,
      food: 3000,
      gstRate: 5
    }
  },

  Shimla: {
    subtitle: "Colonial architecture, viewpoints and apple orchards.",
    lat: 31.1048,
    lng: 77.1734,
    travel: [
      "Fly into Shimla Airport or drive from Chandigarh (4–5 hours).",
      "Toy train from Kalka to Shimla for a scenic ride."
    ],
    facts: [
      "Shimla is the capital of Himachal Pradesh with British-era buildings.",
      "Famous for Mall Road, Jakhu Temple and apple picking."
    ],
    events: [
      "Shimla Summer Festival.",
      "Winter carnival and cultural shows."
    ],
    packageInclude: ["One night heritage hotel stay."],
    restaurants: [
      "Mall Road cafes with continental food.",
      "Local eateries for Himachali dishes."
    ],
    pricing: {
      travel: 6000,
      hotel: 7500,
      food: 2900,
      gstRate: 5
    }
  },

  Dharamshala: {
    subtitle: "Tibetan culture, monasteries and peaceful vibes.",
    lat: 32.2190,
    lng: 76.3234,
    travel: [
      "Fly into Dharamshala Airport or drive from Pathankot (3–4 hours).",
      "Buses from Delhi and nearby cities."
    ],
    facts: [
      "Home to the Dalai Lama and Tibetan monasteries.",
      "Known for trekking and Kangra Valley views."
    ],
    events: [
      "Tibetan festivals and cultural programs.",
      "Meditation retreats and yoga camps."
    ],
    packageInclude: ["One night monastery visit with guide."],
    restaurants: [
      "Tibetan momo houses.",
      "Cafes with organic and local food."
    ],
    pricing: {
      travel: 6200,
      hotel: 7800,
      food: 3100,
      gstRate: 5
    }
  },

  "Spiti Valley": {
    subtitle: "Moon-like landscapes, ancient monasteries and high passes.",
    lat: 32.2467,
    lng: 78.0167,
    travel: [
      "Drive from Manali or Shimla (long, scenic routes).",
      "Flights to nearby airports like Kullu."
    ],
    facts: [
      "Spiti has remote villages and Key Monastery.",
      "Known for cold desert and high-altitude treks."
    ],
    events: [
      "Local festivals and trekking expeditions.",
      "Cultural tours in monasteries."
    ],
    packageInclude: ["One night homestay in a Spiti village."],
    restaurants: [
      "Basic homestay meals.",
      "Local cafes in Kaza."
    ],
    pricing: {
      travel: 10000,
      hotel: 9500,
      food: 3800,
      gstRate: 5
    }
  },

  Rishikesh: {
    subtitle: "Yoga capital, Ganges and adventure activities.",
    lat: 30.0869,
    lng: 78.2676,
    travel: [
      "Fly into Dehradun Airport and drive 1 hour to Rishikesh.",
      "Trains to Haridwar, then buses/taxis."
    ],
    facts: [
      "Rishikesh is famous for rafting and yoga ashrams.",
      "Triveni Ghat and Beatles Ashram are key spots."
    ],
    events: [
      "International Yoga Festival.",
      "River rafting and adventure camps."
    ],
    packageInclude: ["One night yoga session and rafting."],
    restaurants: [
      "Ashram cafes with healthy food.",
      "Riverside eateries."
    ],
    pricing: {
      travel: 5500,
      hotel: 7000,
      food: 2800,
      gstRate: 5
    }
  },

  Haridwar: {
    subtitle: "Holy Ganges, temples and spiritual vibes.",
    lat: 29.9457,
    lng: 78.1642,
    travel: [
      "Fly into Dehradun or Delhi, then drive 3–4 hours.",
      "Trains directly to Haridwar Junction."
    ],
    facts: [
      "Haridwar is a major pilgrimage site with Ganga Aarti.",
      "Known for Har Ki Pauri and temples."
    ],
    events: [
      "Kumbh Mela and Ganga Aarti.",
      "Spiritual retreats."
    ],
    packageInclude: ["One night temple stay."],
    restaurants: [
      "Ghatside eateries.",
      "Local sweet shops."
    ],
    pricing: {
      travel: 5200,
      hotel: 6800,
      food: 2700,
      gstRate: 5
    }
  },

  Mussoorie: {
    subtitle: "Hill station with viewpoints and colonial charm.",
    lat: 30.4598,
    lng: 78.0644,
    travel: [
      "Drive from Dehradun (1 hour) or Delhi (6–7 hours).",
      "Buses and taxis available."
    ],
    facts: [
      "Mussoorie has Gun Hill and Mall Road.",
      "Known for its misty views and literature festivals."
    ],
    events: [
      "Literature festivals and cultural events.",
      "Trekking and paragliding."
    ],
    packageInclude: ["One night viewpoint stay."],
    restaurants: [
      "Mall Road cafes.",
      "Local bakeries."
    ],
    pricing: {
      travel: 5800,
      hotel: 7200,
      food: 2900,
      gstRate: 5
    }
  },

  Nainital: {
    subtitle: "Lake town with boating and scenic views.",
    lat: 29.3919,
    lng: 79.4542,
    travel: [
      "Drive from Delhi (7–8 hours) or fly to Pantnagar.",
      "Trains to Kathgodam, then taxis."
    ],
    facts: [
      "Nainital has Naini Lake and viewpoints like Snow View.",
      "Popular for boating and horse riding."
    ],
    events: [
      "Local fairs and boating festivals.",
      "Adventure activities."
    ],
    packageInclude: ["One night lakeside stay."],
    restaurants: [
      "Mallital cafes.",
      "Local eateries."
    ],
    pricing: {
      travel: 6000,
      hotel: 7500,
      food: 3000,
      gstRate: 5
    }
  },

  Auli: {
    subtitle: "Skiing destination with Himalayan views.",
    lat: 30.5280,
    lng: 79.5670,
    travel: [
      "Drive from Rishikesh or Dehradun (6–7 hours).",
      "Cable car from Joshimath."
    ],
    facts: [
      "Auli is known for skiing and cable car rides.",
      "Surrounded by snow-capped peaks."
    ],
    events: [
      "Winter skiing events.",
      "Trekking in summer."
    ],
    packageInclude: ["One night ski resort stay."],
    restaurants: [
      "Resort dining.",
      "Local cafes."
    ],
    pricing: {
      travel: 7000,
      hotel: 8500,
      food: 3200,
      gstRate: 5
    }
  },

  "India Gate": {
    subtitle: "War memorial and iconic landmark in Delhi.",
    lat: 28.6129,
    lng: 77.2295,
    travel: [
      "Metro or taxis within Delhi.",
      "Flights/trains to Delhi."
    ],
    facts: [
      "India Gate honors Indian soldiers.",
      "Popular evening spot."
    ],
    events: [
      "Republic Day parades.",
      "Evening light shows."
    ],
    packageInclude: ["Guided tour."],
    restaurants: [
      "Nearby cafes.",
      "Street food."
    ],
    pricing: {
      travel: 2000,
      hotel: 5000,
      food: 1500,
      gstRate: 5
    }
  },

  "Red Fort": {
    subtitle: "Historic Mughal fort in Delhi.",
    lat: 28.6562,
    lng: 77.2410,
    travel: [
      "Metro or taxis within Delhi.",
      "Flights/trains to Delhi."
    ],
    facts: [
      "UNESCO site with Mughal architecture.",
      "Site of Independence Day speech."
    ],
    events: [
      "Independence Day celebrations.",
      "Cultural shows."
    ],
    packageInclude: ["Audio guide tour."],
    restaurants: [
      "Nearby eateries.",
      "Street food."
    ],
    pricing: {
      travel: 2000,
      hotel: 5000,
      food: 1500,
      gstRate: 5
    }
  },

  "Qutub Minar": {
    subtitle: "Tallest brick minaret in the world.",
    lat: 28.5244,
    lng: 77.1855,
    travel: [
      "Metro or taxis within Delhi.",
      "Flights/trains to Delhi."
    ],
    facts: [
      "UNESCO site with intricate carvings.",
      "Part of Qutub Complex."
    ],
    events: [
      "Light and sound shows.",
      "Cultural festivals."
    ],
    packageInclude: ["Guided tour."],
    restaurants: [
      "Nearby cafes.",
      "Local food stalls."
    ],
    pricing: {
      travel: 2000,
      hotel: 5000,
      food: 1500,
      gstRate: 5
    }
  },

  Jaipur: {
    subtitle: "Pink City with palaces and forts.",
    lat: 26.9124,
    lng: 75.7873,
    travel: [
      "Fly into Jaipur Airport.",
      "Trains/buses from Delhi."
    ],
    facts: [
      "Famous for Hawa Mahal and Amber Fort.",
      "Known as the Pink City."
    ],
    events: [
      "Elephant festivals.",
      "Cultural shows."
    ],
    packageInclude: ["Fort tour."],
    restaurants: [
      "Rajasthani thali places.",
      "Street food."
    ],
    pricing: {
      travel: 4000,
      hotel: 6000,
      food: 2000,
      gstRate: 5
    }
  },

  Udaipur: {
    subtitle: "City of Lakes with palaces.",
    lat: 24.5854,
    lng: 73.7125,
    travel: [
      "Fly into Udaipur Airport.",
      "Trains/buses from Ahmedabad."
    ],
    facts: [
      "Known for Lake Pichola and palaces.",
      "Romantic destination."
    ],
    events: [
      "Boat festivals.",
      "Cultural events."
    ],
    packageInclude: ["Boat ride."],
    restaurants: [
      "Lakeside dining.",
      "Local cuisine."
    ],
    pricing: {
      travel: 4500,
      hotel: 6500,
      food: 2200,
      gstRate: 5
    }
  },

  Jaisalmer: {
    subtitle: "Golden City with desert forts.",
    lat: 26.9157,
    lng: 70.9083,
    travel: [
      "Fly into Jaisalmer Airport.",
      "Trains/buses from Jodhpur."
    ],
    facts: [
      "Famous for Jaisalmer Fort and desert safaris.",
      "Golden sandstone architecture."
    ],
    events: [
      "Desert festivals.",
      "Camel safaris."
    ],
    packageInclude: ["Desert camp."],
    restaurants: [
      "Desert camps.",
      "Local eateries."
    ],
    pricing: {
      travel: 5000,
      hotel: 7000,
      food: 2500,
      gstRate: 5
    }
  },

  Jodhpur: {
    subtitle: "Blue City with Mehrangarh Fort.",
    lat: 26.2389,
    lng: 73.0243,
    travel: [
      "Fly into Jodhpur Airport.",
      "Trains/buses from Jaipur."
    ],
    facts: [
      "Known as the Blue City.",
      "Famous for forts and palaces."
    ],
    events: [
      "Rajasthani festivals.",
      "Cultural shows."
       ],
    packageInclude: ["Fort tour."],
    restaurants: [
      "Local thali places.",
      "Street food."
    ],
    pricing: {
      travel: 4200,
      hotel: 6200,
      food: 2100,
      gstRate: 5
    }
  },

  Coorg: {
    subtitle: "Coffee plantations and misty hills.",
    lat: 12.3375,
    lng: 75.8069,
    travel: [
      "Fly into Bengaluru, then drive 4–5 hours.",
      "Buses from Mysuru."
    ],
    facts: [
      "Known as Scotland of India.",
      "Coffee estates and waterfalls."
    ],
    events: [
      "Coffee festivals.",
      "Trekking events."
    ],
    packageInclude: ["Coffee estate tour."],
    restaurants: [
      "Estate cafes.",
      "Local food."
    ],
    pricing: {
      travel: 5500,
      hotel: 7000,
      food: 2800,
      gstRate: 5
    }
  },

  Gokarna: {
    subtitle: "Beaches and temples in Karnataka.",
    lat: 14.5466,
    lng: 74.3188,
    travel: [
      "Drive from Goa or Bengaluru.",
      "Buses from nearby cities."
    ],
    facts: [
      "Famous for Om Beach and temples.",
      "Backpacker destination."
    ],
    events: [
      "Beach festivals.",
      "Yoga retreats."
    ],
    packageInclude: ["Beach stay."],
    restaurants: [
      "Beach shacks.",
      "Seafood."
    ],
    pricing: {
      travel: 6000,
      hotel: 7500,
      food: 3000,
      gstRate: 5
    }
  },

  Hampi: {
    subtitle: "Ancient ruins and boulders.",
    lat: 15.3350,
    lng: 76.4600,
    travel: [
      "Fly to Bengaluru, then drive 6–7 hours.",
      "Trains to Hospet."
    ],
    facts: [
      "UNESCO site with Vijayanagara ruins.",
      "Bouldering and temples."
    ],
    events: [
      "Cultural festivals.",
      "Trekking."
    ],
    packageInclude: ["Ruins tour."],
    restaurants: [
      "Local eateries.",
      "Street food."
    ],
    pricing: {
      travel: 6500,
      hotel: 8000,
      food: 3200,
      gstRate: 5
    }
  },

  Mysuru: {
    subtitle: "Palaces and gardens in Karnataka.",
    lat: 12.2958,
    lng: 76.6394,
    travel: [
      "Fly into Mysuru Airport.",
      "Trains from Bengaluru."
    ],
    facts: [
      "Famous for Mysuru Palace.",
      "Known for silk and incense."
    ],
    events: [
      "Dussehra festival.",
      "Cultural shows."
    ],
    packageInclude: ["Palace tour."],
    restaurants: [
      "Local cuisine.",
      "Street food."
    ],
    pricing: {
      travel: 5000,
      hotel: 6500,
      food: 2600,
      gstRate: 5
    }
  },

  Munnar: {
    subtitle: "Tea plantations and hills.",
    lat: 10.0889,
    lng: 77.0595,
    travel: [
      "Drive from Kochi (4–5 hours).",
      "Buses from nearby."
    ],
    facts: [
      "Tea estates and Eravikulam Park.",
      "Misty hills."
    ],
    events: [
      "Tea festivals.",
      "Wildlife tours."
    ],
    packageInclude: ["Tea estate visit."],
    restaurants: [
      "Estate cafes.",
      "Local food."
    ],
    pricing: {
      travel: 5500,
      hotel: 7000,
      food: 2800,
      gstRate: 5
    }
  },

  "Alleppey Backwaters": {
    subtitle: "Houseboats and canals.",
    lat: 9.4981,
    lng: 76.3388,
    travel: [
      "Drive from Kochi (1.5 hours).",
      "Trains to Alleppey."
    ],
    facts: [
      "Famous for houseboat cruises.",
      "Backwater lagoons."
    ],
    events: [
      "Boat festivals.",
      "Cultural cruises."
    ],
    packageInclude: ["Houseboat stay."],
    restaurants: [
      "Boat dining.",
      "Local seafood."
    ],
    pricing: {
      travel: 5000,
      hotel: 6500,
      food: 2600,
      gstRate: 5
    }
  },

  Kochi: {
    subtitle: "Chinese fishing nets and history.",
    lat: 9.9312,
    lng: 76.2673,
    travel: [
      "Fly into Kochi Airport.",
      "Trains/buses from nearby."
    ],
    facts: [
      "Fort Kochi and Chinese nets.",
      "Colonial history."
    ],
    events: [
      "Cultural festivals.",
      "Boat rides."
    ],
    packageInclude: ["Fort tour."],
    restaurants: [
      "Seafood places.",
      "Local cuisine."
    ],
    pricing: {
      travel: 5200,
      hotel: 6800,
      food: 2700,
      gstRate: 5
    }
  },

  Wayanad: {
    subtitle: "Wildlife and waterfalls.",
    lat: 11.6854,
    lng: 76.1320,
    travel: [
      "Drive from Mysuru (3–4 hours).",
      "Buses from Kerala."
    ],
    facts: [
      "Muthanga Wildlife Sanctuary.",
      "Waterfalls and spice plantations."
    ],
    events: [
      "Wildlife tours.",
      "Adventure activities."
    ],
    packageInclude: ["Sanctuary visit."],
    restaurants: [
      "Local eateries.",
      "Spice-infused food."
    ],
    pricing: {
      travel: 5800,
      hotel: 7200,
      food: 2900,
      gstRate: 5
    }
  },

  Ooty: {
    subtitle: "Queen of Hill Stations.",
    lat: 11.4102,
    lng: 76.6950,
    travel: [
      "Drive from Coimbatore (3 hours).",
      "Trains to Ooty."
    ],
    facts: [
      "Tea gardens and Nilgiri hills.",
      "Botanical gardens."
    ],
    events: [
      "Tea festivals.",
      "Cultural shows."
    ],
    packageInclude: ["Garden tour."],
    restaurants: [
      "Tea cafes.",
      "Local food."
    ],
    pricing: {
      travel: 5500,
      hotel: 7000,
      food: 2800,
      gstRate: 5
    }
  },

  Kodaikanal: {
    subtitle: "Lakes and viewpoints.",
    lat: 10.2381,
    lng: 77.4892,
    travel: [
      "Drive from Madurai (4 hours).",
      "Buses from nearby."
    ],
    facts: [
      "Kodaikanal Lake and falls.",
      "Misty hills."
    ],
    events: [
      "Lake festivals.",
      "Trekking."
    ],
    packageInclude: ["Lake boat ride."],
    restaurants: [
      "Hill station cafes.",
      "Local cuisine."
    ],
    pricing: {
      travel: 5200,
      hotel: 6800,
      food: 2700,
      gstRate: 5
    }
  },

  Rameswaram: {
    subtitle: "Pilgrimage island.",
    lat: 9.2881,
    lng: 79.3129,
    travel: [
      "Drive from Madurai (3 hours).",
      "Ferry from mainland."
    ],
    facts: [
      "Ramanathaswamy Temple.",
      "Adam's Bridge."
    ],
    events: [
      "Temple festivals.",
      "Pilgrimage tours."
    ],
    packageInclude: ["Temple visit."],
    restaurants: [
      "Temple prasad.",
      "Local food."
    ],
    pricing: {
      travel: 5000,
      hotel: 6500,
      food: 2600,
      gstRate: 5
    }
  },

  "Chennai (Marina Beach)": {
    subtitle: "Longest urban beach.",
    lat: 13.0827,
    lng: 80.2707,
    travel: [
      "Fly into Chennai Airport.",
      "Trains/buses within city."
    ],
    facts: [
      "Marina Beach promenade.",
      "Sunset views."
    ],
    events: [
      "Beach festivals.",
      "Cultural events."
    ],
    packageInclude: ["Beach walk."],
    restaurants: [
      "Beach shacks.",
      "South Indian food."
    ],
    pricing: {
      travel: 3000,
      hotel: 5500,
      food: 1800,
      gstRate: 5
    }
  },

  "Araku Valley": {
    subtitle: "Coffee and tribal culture.",
    lat: 18.3321,
    lng: 82.8610,
    travel: [
      "Drive from Visakhapatnam (4 hours).",
      "Trains to nearby."
    ],
    facts: [
      "Coffee plantations.",
      "Tribal villages."
    ],
    events: [
      "Coffee festivals.",
      "Cultural tours."
    ],
    packageInclude: ["Plantation tour."],
    restaurants: [
      "Local cafes.",
      "Tribal food."
    ],
    pricing: {
      travel: 6000,
      hotel: 7500,
      food: 3000,
      gstRate: 5
    }
  },

  Tirupati: {
    subtitle: "Tirumala Temple.",
    lat: 13.6288,
    lng: 79.4192,
    travel: [
      "Fly into Tirupati Airport.",
      "Trains to Tirupati."
    ],
    facts: [
      "Famous temple.",
      "Pilgrimage site."
    ],
    events: [
      "Temple festivals.",
      "Devotional events."
    ],
    packageInclude: ["Temple darshan."],
    restaurants: [
      "Temple prasad.",
      "Local food."
    ],
    pricing: {
      travel: 4500,
      hotel: 6500,
      food: 2200,
      gstRate: 5
    }
  },

  "Hyderabad (Charminar)": {
    subtitle: "Historic monument.",
    lat: 17.3616,
    lng: 78.4747,
    travel: [
      "Fly into Hyderabad Airport.",
      "Trains/buses within city."
    ],
    facts: [
      "Iconic structure.",
      "Old city charm."
    ],
    events: [
      "Cultural shows.",
      "Festivals."
    ],
    packageInclude: ["Monument tour."],
    restaurants: [
      "Biryani places.",
      "Local cuisine."
    ],
    pricing: {
      travel: 3500,
      hotel: 6000,
      food: 2000,
      gstRate: 5
    }
  },

  "Hyderabad (Golconda Fort)": {
    subtitle: "Historic fort.",
    lat: 17.3833,
    lng: 78.4011,
    travel: [
      "Drive within Hyderabad.",
      "Taxis available."
    ],
    facts: [
      "Golconda Fort.",
      "Echo point."
    ],
    events: [
      "Light shows.",
      "Cultural events."
    ],
    packageInclude: ["Fort tour."],
    restaurants: [
      "Nearby eateries.",
      "Street food."
    ],
    pricing: {
      travel: 3500,
      hotel: 6000,
      food: 2000,
      gstRate: 5
    }
  },

  Darjeeling: {
    subtitle: "Tea gardens and toy train.",
    lat: 27.0360,
    lng: 88.2627,
    travel: [
      "Fly to Bagdogra, then drive 3 hours.",
      "Toy train from Siliguri."
    ],
    facts: [
      "Tea estates.",
      "Himalayan views."
    ],
    events: [
      "Tea festivals.",
      "Cultural shows."
    ],
    packageInclude: ["Tea tour."],
    restaurants: [
      "Tea cafes.",
      "Local food."
    ],
    pricing: {
      travel: 6500,
      hotel: 8000,
      food: 3200,
      gstRate: 5
    }
  },

  "Kolkata (Victoria Memorial)": {
    subtitle: "Colonial monument.",
    lat: 22.5448,
    lng: 88.3426,
    travel: [
      "Fly into Kolkata Airport.",
      "Trains/buses within city."
    ],
    facts: [
      "Victoria Memorial.",
      "Art galleries."
    ],
    events: [
      "Cultural festivals.",
      "Light shows."
    ],
    packageInclude: ["Museum tour."],
    restaurants: [
      "Nearby cafes.",
      "Bengali food."
    ],
    pricing: {
      travel: 3000,
      hotel: 5500,
      food: 1800,
      gstRate: 5
    }
  },

  Sundarbans: {
    subtitle: "Mangrove forests.",
    lat: 21.9497,
    lng: 88.9402,
    travel: [
      "Drive from Kolkata (3–4 hours).",
      "Ferries available."
    ],
    facts: [
      "Wildlife sanctuary.",
      "Bengal tiger habitat."
    ],
    events: [
      "Wildlife tours.",
      "Boat safaris."
    ],
    packageInclude: ["Boat cruise."],
    restaurants: [
      "Camp dining.",
      "Local food."
    ],
    pricing: {
      travel: 7000,
      hotel: 8500,
      food: 3200,
      gstRate: 5
    }
  },

  Gangtok: {
    subtitle: "Sikkim capital.",
    lat: 27.3314,
    lng: 88.6138,
    travel: [
      "Fly to Bagdogra, then drive 4–5 hours.",
      "Buses from Siliguri."
    ],
    facts: [
      "Monasteries.",
      "Himalayan views."
    ],
    events: [
      "Cultural festivals.",
      "Trekking."
    ],
    packageInclude: ["Monastery tour."],
    restaurants: [
      "Local eateries.",
      "Tibetan food."
    ],
    pricing: {
      travel: 6500,
      hotel: 8000,
      food: 3200,
      gstRate: 5
    }
  },

  "Nathula Pass": {
    subtitle: "Border pass.",
    lat: 27.3833,
    lng: 88.8167,
    travel: [
      "Drive from Gangtok (4–5 hours).",
      "Permits required."
    ],
    facts: [
      "Indo-China border.",
      "Scenic views."
    ],
    events: [
      "Border tours.",
      "Adventure trips."
    ],
    packageInclude: ["Pass visit."],
    restaurants: [
      "Local cafes.",
      "Camp food."
    ],
    pricing: {
      travel: 7500,
      hotel: 9000,
      food: 3500,
      gstRate: 5
    }
  },

  "Tsomgo Lake": {
    subtitle: "High-altitude lake.",
    lat: 27.3000,
    lng: 88.7833,
    travel: [
      "Drive from Gangtok (2–3 hours).",
      "Permits required."
    ],
    facts: [
      "Glacial lake.",
      "Yak rides."
    ],
    events: [
      "Lake tours.",
      "Adventure activities."
    ],
    packageInclude: ["Lake visit."],
    restaurants: [
      "Local eateries.",
      "Camp dining."
    ],
    pricing: {
      travel: 7000,
      hotel: 8500,
      food: 3200,
      gstRate: 5
    }
  },

  "Puri (Jagannath Temple & Beach)": {
    subtitle: "Temple and beach.",
    lat: 19.8135,
    lng: 85.8312,
    travel: [
      "Fly to Bhubaneswar, then drive 1 hour.",
      "Trains to Puri."
    ],
    facts: [
      "Jagannath Temple.",
      "Golden beach."
    ],
    events: [
      "Rath Yatra.",
      "Beach festivals."
    ],
    packageInclude: ["Temple darshan."],
    restaurants: [
      "Temple prasad.",
      "Seafood."
    ],
    pricing: {
      travel: 4500,
      hotel: 6500,
      food: 2200,
      gstRate: 5
    }
  },

  "Konark Sun Temple": {
    subtitle: "Sun Temple.",
    lat: 19.8876,
    lng: 86.0945,
    travel: [
      "Drive from Puri (1 hour).",
      "Buses available."
    ],
    facts: [
      "UNESCO site.",
      "Stone carvings."
    ],
    events: [
      "Cultural shows.",
      "Festivals."
    ],
    packageInclude: ["Temple tour."],
    restaurants: [
      "Nearby eateries.",
      "Local food."
    ],
    pricing: {
      travel: 4000,
      hotel: 6000,
      food: 2000,
      gstRate: 5
    }
  },

  "Chilika Lake": {
    subtitle: "Largest lagoon.",
    lat: 19.8281,
    lng: 85.5178,
    travel: [
      "Drive from Puri (1–2 hours).",
      "Boat tours."
    ],
    facts: [
      "Bird sanctuary.",
      "Dolphins."
    ],
    events: [
      "Boat festivals.",
      "Wildlife tours."
    ],
    packageInclude: ["Boat ride."],
    restaurants: [
      "Local eateries.",
      "Seafood."
    ],
    pricing: {
      travel: 4500,
      hotel: 6500,
      food: 2200,
      gstRate: 5
    }
  },

  "Kaziranga National Park": {
    subtitle: "Rhino sanctuary.",
    lat: 26.5775,
    lng: 93.1711,
    travel: [
      "Fly to Jorhat, then drive 2 hours.",
      "Trains to nearby."
    ],
    facts: [
      "One-horned rhinos.",
      "Wildlife."
    ],
    events: [
      "Safari tours.",
      "Wildlife festivals."
    ],
    packageInclude: ["Jeep safari."],
    restaurants: [
      "Camp dining.",
      "Local food."
    ],
    pricing: {
      travel: 7000,
      hotel: 8500,
      food: 3200,
      gstRate: 5
    }
  },

  Guwahati: {
    subtitle: "Gateway to Northeast.",
    lat: 26.1445,
    lng: 91.7362,
    travel: [
      "Fly into Guwahati Airport.",
      "Trains/buses."
    ],
    facts: [
      "Kamakhya Temple.",
      "River views."
    ],
    events: [
      "Temple festivals.",
      "Cultural events."
    ],
    packageInclude: ["Temple tour."],
    restaurants: [
      "Assamese food.",
      "Local eateries."
    ],
    pricing: {
      travel: 5500,
      hotel: 7000,
      food: 2800,
      gstRate: 5
    }
  },

  "Majuli Island": {
    subtitle: "River island.",
    lat: 26.9833,
    lng: 94.2167,
    travel: [
      "Ferry from Jorhat (2–3 hours).",
      "Drive to Jorhat first."
    ],
    facts: [
      "Largest river island.",
      "Monasteries."
    ],
    events: [
      "Cultural festivals.",
      "Boat tours."
    ],
    packageInclude: ["Island tour."],
    restaurants: [
      "Local eateries.",
      "Assamese food."
    ],
    pricing: {
      travel: 6500,
      hotel: 8000,
      food: 3200,
      gstRate: 5
    }
  },

  Calangute: {
    subtitle: "Goa beach.",
    lat: 15.5418,
    lng: 73.7553,
    travel: [
      "Fly to Goa, then drive 1 hour.",
      "Buses/taxis."
    ],
    facts: [
      "Water sports.",
      "Nightlife."
    ],
    events: [
      "Beach parties.",
      "Festivals."
    ],
    packageInclude: ["Beach stay."],
    restaurants: [
      "Shacks.",
      "Seafood."
    ],
    pricing: {
      travel: 6000,
      hotel: 7500,
      food: 3000,
      gstRate: 5
    }
  },

  Baga: {
    subtitle: "Goa beach.",
    lat: 15.5557,
    lng: 73.7515,
    travel: [
      "Drive from Panaji (30 min).",
      "Taxis available."
    ],
    facts: [
      "Party beach.",
      "Shacks."
    ],
    events: [
      "Nightlife.",
      "Water sports."
    ],
    packageInclude: ["Beach activities."],
    restaurants: [
      "Beach shacks.",
      "International food."
    ],
    pricing: {
      travel: 6000,
      hotel: 7500,
      food: 3000,
      gstRate: 5
    }
  },

  Candolim: {
    subtitle: "Goa beach.",
    lat: 15.5181,
    lng: 73.7626,
    travel: [
      "Drive from Panaji (20 min).",
      "Taxis."
    ],
    facts: [
      "Quiet beach.",
      "Resorts."
    ],
    events: [
      "Relaxation.",
      "Festivals."
    ],
    packageInclude: ["Resort stay."],
    restaurants: [
      "Resort dining.",
      "Local food."
    ],
    pricing: {
      travel: 6000,
      hotel: 7500,
      food: 3000,
      gstRate: 5
    }
  },

  Anjuna: {
    subtitle: "Goa beach.",
    lat: 15.5837,
    lng: 73.7389,
    travel: [
      "Drive from Panaji (40 min).",
      "Taxis."
    ],
    facts: [
      "Flea market.",
      "Hippie vibe."
    ],
    events: [
      "Markets.",
      "Music festivals."
    ],
    packageInclude: ["Market visit."],
    restaurants: [
      "Cafes.",
      "Street food."
    ],
    pricing: {
      travel: 6000,
      hotel: 7500,
      food: 3000,
      gstRate: 5
    }
  },

  "Rann of Kutch": {
    subtitle: "White desert.",
    lat: 23.7333,
    lng: 70.7833,
    travel: [
      "Fly to Bhuj, then drive 1.5 hours.",
      "Trains to Bhuj."
    ],
    facts: [
      "Salt desert.",
      "Festivals."
    ],
    events: [
      "Rann Utsav.",
      "Desert camps."
    ],
    packageInclude: ["Desert stay."],
    restaurants: [
      "Camp dining.",
      "Local food."
    ],
    pricing: {
      travel: 7000,
      hotel: 8500,
      food: 3200,
      gstRate: 5
    }
  },

  "Gir National Park": {
    subtitle: "Lion sanctuary.",
    lat: 21.1167,
    lng: 70.7833,
    travel: [
      "Drive from Rajkot (4 hours).",
      "Flights to Rajkot."
    ],
    facts: [
      "Asiatic lions.",
      "Safari."
    ],
    events: [
      "Wildlife tours.",
      "Festivals."
    ],
    packageInclude: ["Safari."],
    restaurants: [
      "Local eateries.",
      "Camp food."
    ],
    pricing: {
      travel: 6500,
      hotel: 8000,
      food: 3200,
      gstRate: 5
    }
  },

  "Statue of Unity": {
    subtitle: "Tallest statue.",
    lat: 21.8383,
    lng: 73.7191,
    travel: [
      "Drive from Vadodara (3 hours).",
      "Trains/buses."
    ],
    facts: [
      "Sardar Patel statue.",
      "Museum."
    ],
    events: [
      "Cultural shows.",
      "Festivals."
    ],
    packageInclude: ["Statue visit."],
    restaurants: [
      "Nearby cafes.",
      "Local food."
    ],
    pricing: {
      travel: 5000,
      hotel: 6500,
      food: 2600,
      gstRate: 5
    }
  },

  Mumbai: {
    subtitle: "City of Dreams.",
    lat: 19.0760,
    lng: 72.8777,
    travel: [
      "Fly into Mumbai Airport.",
      "Trains/buses."
    ],
    facts: [
      "Bollywood.",
      "Gateway of India."
    ],
    events: [
      "Film festivals.",
      "Cultural events."
    ],
    packageInclude: ["City tour."],
    restaurants: [
      "Street food.",
      "Fine dining."
    ],
    pricing: {
      travel: 3000,
      hotel: 5500,
      food: 1800,
      gstRate: 5
    }
  },

  Lonavala: {
    subtitle: "Hill station.",
    lat: 18.6822,
    lng: 73.3210,
    travel: [
      "Drive from Mumbai (2 hours).",
      "Trains to Lonavala."
    ],
    facts: [
      "Waterfalls.",
      "Caves."
    ],
    events: [
      "Monsoon festivals.",
      "Trekking."
    ],
    packageInclude: ["Cave tour."],
    restaurants: [
      "Local cafes.",
      "Maharashtrian food."
    ],
    pricing: {
      travel: 4000,
      hotel: 6000,
      food: 2000,
      gstRate: 5
    }
  },

  Mahabaleshwar: {
    subtitle: "Strawberry farms.",
    lat: 17.9243,
    lng: 73.6569,
    travel: [
      "Drive from Pune (3 hours).",
      "Buses available."
    ],
    facts: [
      "Viewpoints.",
      "Strawberries."
    ],
    events: [
      "Fruit festivals.",
      "Cultural shows."
    ],
    packageInclude: ["Farm tour."],
    restaurants: [
      "Fruit cafes.",
      "Local food."
    ],
    pricing: {
      travel: 4500,
      hotel: 6500,
      food: 2200,
      gstRate: 5
    }
  },

  Pune: {
    subtitle: "Cultural city.",
    lat: 18.5204,
    lng: 73.8567,
    travel: [
      "Fly into Pune Airport.",
      "Trains/buses."
    ],
    facts: [
      "Education hub.",
      "Historical sites."
    ],
    events: [
      "Festivals.",
      "Cultural events."
    ],
    packageInclude: ["City tour."],
    restaurants: [
      "Street food.",
      "Maharashtrian cuisine."
    ],
    pricing: {
      travel: 3500,
      hotel: 6000,
      food: 2000,
      gstRate: 5
    }
  },

  "Khajuraho Temples": {
    subtitle: "Erotic sculptures.",
    lat: 24.8318,
    lng: 79.9199,
    travel: [
      "Fly to Khajuraho Airport.",
      "Trains to nearby."
    ],
    facts: [
      "UNESCO site.",
      "Stone carvings."
    ],
    events: [
      "Dance festivals.",
      "Cultural shows."
    ],
    packageInclude: ["Temple tour."],
    restaurants: [
      "Local eateries.",
      "Madhya Pradesh food."
    ],
    pricing: {
      travel: 5500,
      hotel: 7000,
      food: 2800,
      gstRate: 5
    }
  },

  "Bandhavgarh National Park": {
    subtitle: "Tiger reserve.",
    lat: 23.7167,
    lng: 81.0333,
    travel: [
      "Drive from Jabalpur (3 hours).",
      "Flights to Jabalpur."
    ],
    facts: [
      "Tigers.",
      "Jungle safaris."
    ],
    events: [
      "Wildlife tours.",
      "Festivals."
    ],
    packageInclude: ["Safari."],
    restaurants: [
      "Camp dining.",
      "Local food."
    ],
    pricing: {
      travel: 6500,
      hotel: 8000,
      food: 3200,
      gstRate: 5
    }
  },

  "Kanha National Park": {
    subtitle: "Jungle Book setting.",
    lat: 22.3333,
    lng: 80.6167,
    travel: [
      "Drive from Nagpur (4 hours).",
      "Flights to Nagpur."
    ],
    facts: [
      "Tigers.",
      "Wildlife."
    ],
    events: [
      "Safari tours.",
      "Festivals."
    ],
    packageInclude: ["Jungle stay."],
    restaurants: [
      "Camp food.",
      "Local cuisine."
    ],
    pricing: {
      travel: 6500,
      hotel: 8000,
      food: 3200,
      gstRate: 5
    }
  },

  Bhopal: {
    subtitle: "City of Lakes.",
    lat: 23.2599,
    lng: 77.4126,
    travel: [
      "Fly into Bhopal Airport.",
      "Trains/buses."
    ],
    facts: [
      "Lakes.",
      "Museums."
    ],
    events: [
      "Cultural festivals.",
      "Lake tours."
    ],
    packageInclude: ["Lake visit."],
    restaurants: [
      "Local food.",
      "Street food."
    ],
    pricing: {
      travel: 4000,
      hotel: 6000,
      food: 2000,
      gstRate: 5
    }
  },

  "Chitrakoot Waterfalls": {
    subtitle: "Niagara of India.",
    lat: 25.1667,
    lng: 81.2167,
    travel: [
      "Drive from Allahabad (2 hours).",
      "Buses available."
    ],
    facts: [
      "Waterfalls.",
      "Ramayana sites."
    ],
    events: [
      "Pilgrimage tours.",
      "Festivals."
    ],
    packageInclude: ["Waterfall visit."],
    restaurants: [
      "Local eateries.",
      "Pilgrimage food."
    ],
    pricing: {
      travel: 5000,
      hotel: 6500,
      food: 2600,
      gstRate: 5
    }
  },

  Jagdalpur: {
    subtitle: "Bastar culture.",
    lat: 19.0667,
    lng: 82.0167,
    travel: [
      "Drive from Raipur (4 hours).",
      "Flights to Raipur."
    ],
    facts: [
      "Tribal culture.",
      "Forests."
    ],
    events: [
      "Tribal festivals.",
      "Cultural tours."
    ],
    packageInclude: ["Tribal visit."],
    restaurants: [
      "Local food.",
      "Tribal cuisine."
    ],
    pricing: {
      travel: 6000,
      hotel: 7500,
      food: 3000,
      gstRate: 5
    }
  },

  "Barnawapara Sanctuary": {
    subtitle: "Wildlife reserve.",
    lat: 20.7167,
    lng: 82.7167,
    travel: [
      "Drive from Raipur (2 hours).",
      "Buses available."
    ],
    facts: [
      "Wildlife.",
      "Lakes."
    ],
    events: [
      "Safari tours.",
      "Festivals."
    ],
    packageInclude: ["Wildlife tour."],
    restaurants: [
      "Local eateries.",
      "Camp food."
    ],
    pricing: {
      travel: 5500,
      hotel: 7000,
      food: 2800,
      gstRate: 5
    }
  },

  // All other places fall back to state travel/facts + defaultPricing
};

// ========== STATE & PLACE UI ==========

let currentRegionKey = null;
let userIsSignedUp = false;
let hasUnlockedPrice = false;
let selectedPlaceName = "";
let currentPricing = { ...defaultPricing };
let currentBookingPrice = 0; // per person including GST

function setupRegionCards() {
  const regionCards = document.querySelectorAll(".region-card");
  regionCards.forEach((card) => {
    card.addEventListener("click", () => {
      const regionKey = card.getAttribute("data-region");
      showRegion(regionKey);
    });
  });
}

function showRegion(regionKey) {
  currentRegionKey = regionKey;
  const region = regionsConfig[regionKey];
  if (!region) return;

  // change background according to region
  setRegionBackground(regionKey);

  // hide regions grid, show region panel
  document.getElementById("regions-grid").classList.add("hidden");
  const regionPanel = document.getElementById("region-panel");
  regionPanel.classList.remove("hidden");

  // header
  const header = document.getElementById("region-header");
  header.innerHTML = `
    <h2>${region.name}</h2>
    <p>${region.tagline}</p>
  `;

  // states grid
  const statesGrid = document.getElementById("states-grid");
  statesGrid.innerHTML = "";
  region.states.forEach((state) => {
    const div = document.createElement("div");
    div.className = "state-card";
    div.setAttribute("data-state-id", state.id);
    div.innerHTML = `
      <h3>${state.name}</h3>
      <p>${state.short}</p>
    `;
    div.addEventListener("click", () => showState(state.id));
    statesGrid.appendChild(div);
  });
}

function showState(stateId) {
  const region = regionsConfig[currentRegionKey];
  if (!region) return;

  const state = region.states.find((s) => s.id === stateId);
  if (!state) return;

  // hide region panel, show state panel
  document.getElementById("region-panel").classList.add("hidden");
  const statePanel = document.getElementById("state-panel");
  statePanel.classList.remove("hidden");

  // state header
  const stateHeader = document.getElementById("state-header");
  stateHeader.innerHTML = `
    <h2>${state.name}</h2>
    <p>${state.short}</p>
  `;

  // places
  const placesGrid = document.getElementById("places-grid");
  placesGrid.innerHTML = "";
  state.places.forEach((place) => {
    const imgSrc = getPlaceThumbnail(place);
    const card = document.createElement("div");
    card.className = "place-card";
    card.innerHTML = `
      <img src="${imgSrc}" alt="${place}" class="place-img" />
      <div class="place-content">
        <h4>${place}</h4>
        <p>Explore ${place} with unique experiences, local food and scenic views.</p>
      </div>
    `;
    placesGrid.appendChild(card);
  });

  // travel list (left section in state panel)
  const travelList = document.getElementById("travel-list");
  travelList.innerHTML = "";
  state.travel.forEach((line) => {
    const li = document.createElement("li");
    li.textContent = line;
    travelList.appendChild(li);
  });

  // facts list (right section in state panel)
  const factsList = document.getElementById("facts-list");
  factsList.innerHTML = "";
  state.facts.forEach((fact) => {
    const li = document.createElement("li");
    li.textContent = fact;
    factsList.appendChild(li);
  });
}

function backToRegions() {
  // hide panels, show regions grid again
  document.getElementById("state-panel").classList.add("hidden");
  document.getElementById("region-panel").classList.add("hidden");
  document.getElementById("regions-grid").classList.remove("hidden");

  // reset background to default when going back to all-India view
  setRegionBackground(null);
}

function backToRegion() {
  // hide state, show region panel again
  document.getElementById("state-panel").classList.add("hidden");
  document.getElementById("region-panel").classList.remove("hidden");
}

// ========== HELPERS FOR PLACE MODAL ==========

function getCurrentStateData() {
  const heading = document.querySelector("#state-header h2");
  if (!heading) return null;
  const stateName = heading.textContent.trim();

  for (const regionKey in regionsConfig) {
    const region = regionsConfig[regionKey];
    const found = region.states.find((s) => s.name === stateName);
    if (found) return { regionKey, state: found };
  }
  return null;
}

function fillList(id, items) {
  const ul = document.getElementById(id);
  if (!ul) return;
  ul.innerHTML = "";
  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    ul.appendChild(li);
  });
}

// NEW: generate our own events & packages section for each place
function generateServiceDetails(placeName) {
  return {
    events: [
      `Welcome meet-up and trip briefing on your first day in ${placeName}.`,
      `Guided local sightseeing in and around ${placeName} covering key viewpoints and highlights.`,
      `Evening get-together with light music and group activities (subject to group size and weather).`
    ],
    packages: [
      `Couple package: cosy stay near main attractions of ${placeName}, private transfers and relaxed sightseeing schedule.`,
      `Family package: family rooms / interconnected rooms, kid-friendly sightseeing plan and flexible meal timings in ${placeName}.`,
      `Baby-friendly offer: early check-in on request, hot water / basic baby-food support and shorter daily travel distances.`
    ],
    pickupDrop: [
      `Pickup from nearest airport / railway station / bus stand to ${placeName} during standard arrival window (7:00 AM – 10:00 PM).`,
      `Return drop to the same point on your last day as per departure time.`,
      `Option to upgrade to fully private cab transfers only for your family / group.`
    ],
    packageRestaurants: [
      `Pre-selected partner restaurants / in-house kitchens in ${placeName} for hygienic veg & non-veg meals.`,
      `Breakfast and one major meal (lunch or dinner) included at our partner property; other meals can be added on request.`,
      `One local-special tasting session in ${placeName} (street food / regional dish) wherever possible.`
    ],
    facilities: [
      `Dedicated Brocelle Adventures trip coordinator on WhatsApp / call throughout your stay in ${placeName}.`,
      `Support for birthday / anniversary surprises – basic decoration and cake arrangement on prior request.`,
      `Help with basic medical needs – directions to nearest pharmacy / clinic if required.`,
      `Flexible itinerary tweaks if weather or local conditions change during your ${placeName} trip.`
    ]
  };
}

function openPlaceModal(placeName) {
  selectedPlaceName = placeName;

  const stateData = getCurrentStateData();
  if (!stateData) return;

  const state = stateData.state;
  const detail = placeDetailsConfig[placeName] || {};
  currentPricing = detail.pricing || { ...defaultPricing };

  const perTravel = currentPricing.travel;
  const perHotel = currentPricing.hotel;
  const perFood = currentPricing.food;
  const gstRate = currentPricing.gstRate || 0;

  const perSubtotal = perTravel + perHotel + perFood;
  const perGst = (perSubtotal * gstRate) / 100;
  const perTotal = perSubtotal + perGst;
  currentBookingPrice = perTotal;

  const titleEl = document.getElementById("place-modal-title");
  const subtitleEl = document.getElementById("place-modal-subtitle");
  if (titleEl) titleEl.textContent = placeName;
  if (subtitleEl) {
    subtitleEl.textContent = detail.subtitle || state.short || "";
  }

  // gallery
  const galleryEl = document.getElementById("place-gallery");
  if (galleryEl) {
    galleryEl.innerHTML = "";
    const galleryImages = generatePlaceGallery(placeName);
    galleryImages.forEach((src) => {
      const img = document.createElement("img");
      img.src = src;
      img.alt = placeName;
      img.className = "gallery-img";
      galleryEl.appendChild(img);
    });
  }

  // Initialize Google Map
  const mapEl = document.getElementById("place-map");
  if (mapEl && detail.lat && detail.lng && typeof google !== 'undefined') {
    const location = { lat: detail.lat, lng: detail.lng };
    placeMap = new google.maps.Map(mapEl, {
      zoom: 12,
      center: location,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    new google.maps.Marker({
      position: location,
      map: placeMap,
      title: placeName
    });
  } else if (mapEl) {
    mapEl.innerHTML = "<p style='text-align:center;padding:20px;'>Map loading...</p>";
  }

  // existing info lists in modal
  fillList("place-modal-travel-list", detail.travel || state.travel || []);
  fillList("place-modal-facts-list", detail.facts || state.facts || []);
  fillList(
    "place-modal-events-list",
    detail.events || [
      "Seasonal local festivals, fairs and cultural programs take place here.",
      "Check local tourism calendars for updated event dates."
    ]
  );
  fillList(
    "place-modal-package-include-list",
    detail.packageInclude || [
      "Multiple homestays, guest houses and stays are available close to major sights.",
      "You can choose from budget, mid-range and premium stays."
    ]
  );
  fillList(
    "place-modal-restaurants-list",
    detail.restaurants || [
      "Plenty of local restaurants and cafes serve regional dishes.",
      "Street food and small family-run eateries are popular here."
    ]
  );

  // NEW SECTION: Events & packages we conduct at this place
  const services = generateServiceDetails(placeName);
  let servicesSection = document.getElementById("place-services-section");

  if (!servicesSection) {
    const modal = document.querySelector("#place-modal .modal-card");
    if (modal) {
      servicesSection = document.createElement("div");
      servicesSection.id = "place-services-section";
      servicesSection.className = "place-extra-section";
      modal.appendChild(servicesSection);
    }
  }

  if (servicesSection) {
    servicesSection.innerHTML = `
      <h3 style="margin-top:1.6rem;margin-bottom:0.8rem;font-size:1.1rem;">
        Our Events, Packages & Facilities at ${placeName}
      </h3>
      <div class="state-info">
        <div class="info-block">
          <h4>Events conducted by us</h4>
          <ul>
            ${services.events.map((e) => `<li>${e}</li>`).join("")}
          </ul>
        </div>
        <div class="info-block">
          <h4>Packages for couples & families</h4>
          <ul>
            ${services.packages.map((p) => `<li>${p}</li>`).join("")}
          </ul>
        </div>
        <div class="info-block">
          <h4>Pickup & drop timings</h4>
          <ul>
            ${services.pickupDrop.map((t) => `<li>${t}</li>`).join("")}
          </ul>
        </div>
        <div class="info-block">
          <h4>Restaurants & facilities we offer</h4>
          <ul>
            ${services.packageRestaurants.map((r) => `<li>${r}</li>`).join("")}
            ${services.facilities.map((f) => `<li>${f}</li>`).join("")}
          </ul>
        </div>
      </div>
    `;
  }

  // price label (blur until signup)
  const priceEl = document.getElementById("place-modal-price");
  if (priceEl) {
    if (!hasUnlockedPrice) {
      priceEl.textContent = "Sign up to see price";
      priceEl.classList.add("blur-price");
    } else {
      priceEl.textContent =
        "₹ " + perTotal.toLocaleString("en-IN") + " / person (incl. GST)";
      priceEl.classList.remove("blur-price");
    }
  }

  const modal = document.getElementById("place-modal");
  if (modal) modal.classList.remove("hidden");
}

function closeModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.add("hidden");
}

// ========== GLOBAL DELEGATED CLICKS FOR CARDS & MODALS ==========

// open place modal on place-card click
document.addEventListener("click", (event) => {
  const card = event.target.closest(".place-card");
  if (!card) return;

  const titleEl = card.querySelector("h4");
  if (!titleEl) return;

  const placeName = titleEl.textContent.trim();
  if (!placeName) return;

  openPlaceModal(placeName);
});

// close on X button
document.addEventListener("click", (event) => {
  const btn = event.target.closest(".modal-close");
  if (!btn) return;
  const id = btn.getAttribute("data-close");
  if (id) closeModal(id);
});

// close when clicking dark backdrop
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("overlay-backdrop")) {
    const overlay = event.target.closest(".overlay");
    if (overlay) overlay.classList.add("hidden");
  }
});

// ========== BOOKING MODAL & RECEIPT ==========

function openBookingModal() {
  const modal = document.getElementById("booking-modal");
  if (!modal) return;

  const titleEl = document.getElementById("booking-place-title");
  if (titleEl) {
    titleEl.textContent = selectedPlaceName
      ? `${selectedPlaceName} – Booking & Receipt`
      : "Trip booking receipt";
  }

  const priceEl = document.getElementById("booking-price");
  if (priceEl) {
    priceEl.textContent =
      "₹ " + currentBookingPrice.toLocaleString("en-IN") + " / person (incl. GST)";
  }

  const countInput = document.getElementById("booking-count");
  const totalEl = document.getElementById("booking-total");

  function updateTotal() {
    if (!countInput || !totalEl) return;
    let count = parseInt(countInput.value || "1", 10);
    if (Number.isNaN(count) || count < 1) count = 1;

    const total = count * currentBookingPrice;
    totalEl.textContent = "₹ " + total.toLocaleString("en-IN");

    // Check for free cottage offer
    if (count > 4 && count < 10) {
      alert("Congratulations! You have got a free cottage included with your trip!");
    }
  }

  if (countInput && totalEl) {
    countInput.value = "1";
    countInput.oninput = updateTotal;
    updateTotal();
  }

  const status = document.getElementById("booking-status");
  if (status) status.textContent = "";

  modal.classList.remove("hidden");
}

function handleConfirmBooking() {
  const countInput = document.getElementById("booking-count");
  const status = document.getElementById("booking-status");
  if (!status) return;

  let count = 1;
  if (countInput) {
    const n = parseInt(countInput.value || "1", 10);
    count = !Number.isNaN(n) && n > 0 ? n : 1;
  }

  const p = currentPricing || defaultPricing;
  const perTravel = p.travel;
  const perHotel = p.hotel;
  const perFood = p.food;
  const gstRate = p.gstRate || 0;

  const perSubtotal = perTravel + perHotel + perFood;
  const perGst = (perSubtotal * gstRate) / 100;
  const perTotal = perSubtotal + perGst;

  const totalTravel = perTravel * count;
  const totalHotel = perHotel * count;
  const totalFood = perFood * count;
  const totalSubtotal = perSubtotal * count;
  const totalGst = perGst * count;
  const grandTotal = perTotal * count;

  status.innerHTML = `
    <strong>Booking receipt</strong><br/>
    Destination: ${selectedPlaceName || "Selected place"}<br/>
    Travellers: ${count}<br/><br/>
    <strong>Per person cost:</strong><br/>
    Travel expense: ₹ ${perTravel.toLocaleString("en-IN")}<br/>
    Hotel stay: ₹ ${perHotel.toLocaleString("en-IN")}<br/>
    Restaurants & food: ₹ ${perFood.toLocaleString("en-IN")}<br/>
    Subtotal: ₹ ${perSubtotal.toLocaleString("en-IN")}<br/>
    GST (${gstRate}%): ₹ ${perGst.toLocaleString("en-IN")}<br/>
    Total per person: ₹ ${perTotal.toLocaleString("en-IN")}<br/><br/>
    <strong>Total for ${count} person(s):</strong><br/>
    Travel expense: ₹ ${totalTravel.toLocaleString("en-IN")}<br/>
    Hotel stay: ₹ ${totalHotel.toLocaleString("en-IN")}<br/>
    Restaurants & food: ₹ ${totalFood.toLocaleString("en-IN")}<br/>
    Subtotal: ₹ ${totalSubtotal.toLocaleString("en-IN")}<br/>
    GST (${gstRate}%): ₹ ${totalGst.toLocaleString("en-IN")}<br/>
    <strong>Grand total: ₹ ${grandTotal.toLocaleString("en-IN")}</strong><br/><br/>
    <span style="font-size:0.8rem;opacity:0.9;">
      (Demo only – payment gateway is not connected.)
    </span>
  `;
}

// ========== SIGNUP FLOW ==========

function handleSignupSubmit(e) {
  e.preventDefault();
  userIsSignedUp = true;
  hasUnlockedPrice = true;

  // close signup, open booking/receipt page directly
  closeModal("signup-modal");
  openBookingModal();
}

// ========== INIT (attach all listeners here) ==========

window.addEventListener("load", () => {
  const introScreen = document.getElementById("intro-screen");
  if (introScreen) {
    introScreen.addEventListener("click", handleIntroClick);
  }

  setupRegionCards();

  // back buttons
  const backRegions = document.getElementById("back-to-regions");
  if (backRegions) backRegions.addEventListener("click", backToRegions);

  const backRegion = document.getElementById("back-to-region");
  if (backRegion) backRegion.addEventListener("click", backToRegion);

  const placeBookBtn = document.getElementById("place-book-btn");
  if (placeBookBtn) {
    placeBookBtn.addEventListener("click", () => {
      closeModal("place-modal");

      if (!userIsSignedUp) {
        const signupModal = document.getElementById("signup-modal");
        if (signupModal) signupModal.classList.remove("hidden");

        const msg = document.getElementById("signup-status");
        if (msg) {
          msg.textContent =
            "Please sign up to reveal the price and view your booking receipt.";
        }
      } else {
        openBookingModal();
      }
    });
  }
  function handleConfirmBooking() {
  // store that booking happened (optional)
  localStorage.setItem("bookingDone", "true");

  // Hide main content and show thank you section
  const mainContent = document.getElementById("main-content");
  const introScreen = document.getElementById("intro-screen");
  const thankYouSection = document.getElementById("thank-you-section");
  
  if (mainContent) mainContent.style.display = "none";
  if (introScreen) introScreen.style.display = "none";
  if (thankYouSection) {
    thankYouSection.classList.remove("hidden");
    thankYouSection.style.display = "block";
  }
}


  const signupForm = document.getElementById("signup-form");
  if (signupForm) {
    signupForm.addEventListener("submit", handleSignupSubmit);
  }

  const confirmBookingBtn = document.getElementById("confirm-booking-btn");
  if (confirmBookingBtn) {
    confirmBookingBtn.addEventListener("click", handleConfirmBooking);
  }
});
