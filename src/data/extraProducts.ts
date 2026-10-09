import { Offer, Product, StoreId } from '@/types/product';

interface ProductSeed {
  id: string;
  title: string;
  brand: string;
  category: string;
  subCategory: string;
  description: string;
  price: number;
  image: string;
  tags: string[];
  featured?: boolean;
}

// These 50 entries are demo catalog records. Prices, ratings and stock are illustrative,
// not live merchant data. Every "View Deal" link opens a retailer search for the item.
const PRODUCT_SEEDS: ProductSeed[] = [
  {
    "id": "google-pixel-9",
    "title": "Google Pixel 9 5G (128 GB)",
    "brand": "Google",
    "category": "Mobiles & Tablets",
    "subCategory": "Smartphones",
    "description": "Google Pixel smartphone with an advanced camera system and clean Android experience.",
    "price": 74999,
    "image": "photo-1598327105666-5b89351aff97",
    "tags": [
      "Google",
      "Pixel",
      "5G",
      "Android"
    ],
    "featured": true
  },
  {
    "id": "apple-iphone-15",
    "title": "Apple iPhone 15 (128 GB)",
    "brand": "Apple",
    "category": "Mobiles & Tablets",
    "subCategory": "Smartphones",
    "description": "Apple smartphone with a Super Retina display, dual-camera system and USB-C connectivity.",
    "price": 59900,
    "image": "photo-1592750475338-74b7b21085ab",
    "tags": [
      "Apple",
      "iPhone",
      "5G",
      "iOS"
    ],
    "featured": true
  },
  {
    "id": "redmi-note-14-pro-plus",
    "title": "Redmi Note 14 Pro+ 5G",
    "brand": "Xiaomi",
    "category": "Mobiles & Tablets",
    "subCategory": "Smartphones",
    "description": "Mid-range 5G smartphone with a high-resolution display and versatile camera features.",
    "price": 30999,
    "image": "photo-1605236453806-6ff36851218e",
    "tags": [
      "Redmi",
      "Xiaomi",
      "5G",
      "AMOLED"
    ],
    "featured": true
  },
  {
    "id": "nothing-phone-2a",
    "title": "Nothing Phone (2a) 5G",
    "brand": "Nothing",
    "category": "Mobiles & Tablets",
    "subCategory": "Smartphones",
    "description": "Distinctive Android smartphone with a transparent-inspired design and smooth display.",
    "price": 23999,
    "image": "photo-1511707171634-5f897ff02540",
    "tags": [
      "Nothing",
      "Android",
      "5G"
    ],
    "featured": true
  },
  {
    "id": "motorola-edge-50-pro",
    "title": "Motorola Edge 50 Pro 5G",
    "brand": "Motorola",
    "category": "Mobiles & Tablets",
    "subCategory": "Smartphones",
    "description": "5G smartphone with a curved display, fast charging and multi-camera setup.",
    "price": 31999,
    "image": "photo-1605236453806-6ff36851218e",
    "tags": [
      "Motorola",
      "5G",
      "Smartphone"
    ]
  },
  {
    "id": "samsung-galaxy-a55",
    "title": "Samsung Galaxy A55 5G (128 GB)",
    "brand": "Samsung",
    "category": "Mobiles & Tablets",
    "subCategory": "Smartphones",
    "description": "Samsung Galaxy A-series phone with an AMOLED display and versatile cameras.",
    "price": 26999,
    "image": "photo-1610945265064-0e34e5519bbf",
    "tags": [
      "Samsung",
      "Galaxy",
      "5G"
    ],
    "featured": true
  },
  {
    "id": "oneplus-nord-ce4",
    "title": "OnePlus Nord CE4 5G",
    "brand": "OnePlus",
    "category": "Mobiles & Tablets",
    "subCategory": "Smartphones",
    "description": "OnePlus mid-range phone with fast charging and a high-refresh-rate display.",
    "price": 24999,
    "image": "photo-1580910051074-3eb694886505",
    "tags": [
      "OnePlus",
      "Nord",
      "5G"
    ]
  },
  {
    "id": "apple-ipad-air-m2",
    "title": "Apple iPad Air 11-inch (M2)",
    "brand": "Apple",
    "category": "Mobiles & Tablets",
    "subCategory": "Tablets",
    "description": "Portable Apple tablet powered by the M-series chip for work, study and creative apps.",
    "price": 59900,
    "image": "photo-1544244015-0df4b3ffc6b0",
    "tags": [
      "Apple",
      "iPad",
      "Tablet"
    ],
    "featured": true
  },
  {
    "id": "samsung-tab-s9-fe",
    "title": "Samsung Galaxy Tab S9 FE Wi-Fi",
    "brand": "Samsung",
    "category": "Mobiles & Tablets",
    "subCategory": "Tablets",
    "description": "Samsung tablet for streaming, note-taking and everyday productivity.",
    "price": 32999,
    "image": "photo-1598327105666-5b89351aff97",
    "tags": [
      "Samsung",
      "Tablet",
      "S Pen"
    ]
  },
  {
    "id": "xiaomi-pad-6",
    "title": "Xiaomi Pad 6 Wi-Fi Tablet",
    "brand": "Xiaomi",
    "category": "Mobiles & Tablets",
    "subCategory": "Tablets",
    "description": "Android tablet with a large high-refresh-rate screen for entertainment and study.",
    "price": 26999,
    "image": "photo-1611532736597-de2d4265fba3",
    "tags": [
      "Xiaomi",
      "Tablet",
      "Android"
    ]
  },
  {
    "id": "dell-inspiron-14",
    "title": "Dell Inspiron 14 Laptop",
    "brand": "Dell",
    "category": "Laptops & Computers",
    "subCategory": "Laptops",
    "description": "Everyday Dell laptop suitable for college, office productivity and browsing.",
    "price": 58990,
    "image": "photo-1496181133206-80ce9b88a853",
    "tags": [
      "Dell",
      "Laptop",
      "Windows"
    ],
    "featured": true
  },
  {
    "id": "hp-pavilion-15",
    "title": "HP Pavilion 15 Laptop",
    "brand": "HP",
    "category": "Laptops & Computers",
    "subCategory": "Laptops",
    "description": "HP laptop designed for multitasking, coursework and everyday computing.",
    "price": 64990,
    "image": "photo-1517336714731-489689fd1ca8",
    "tags": [
      "HP",
      "Laptop",
      "Windows"
    ]
  },
  {
    "id": "lenovo-loq-gaming",
    "title": "Lenovo LOQ Gaming Laptop",
    "brand": "Lenovo",
    "category": "Laptops & Computers",
    "subCategory": "Gaming Laptops",
    "description": "Gaming-focused laptop with discrete graphics options and performance cooling.",
    "price": 82990,
    "image": "photo-1593642632823-8f785ba67e45",
    "tags": [
      "Lenovo",
      "Gaming",
      "Laptop"
    ],
    "featured": true
  },
  {
    "id": "asus-vivobook-16",
    "title": "ASUS Vivobook 16 Laptop",
    "brand": "ASUS",
    "category": "Laptops & Computers",
    "subCategory": "Laptops",
    "description": "Large-screen laptop for study, entertainment and daily productivity.",
    "price": 56990,
    "image": "photo-1525547719571-a2d4ac8945e2",
    "tags": [
      "ASUS",
      "Vivobook",
      "Laptop"
    ]
  },
  {
    "id": "acer-aspire-7",
    "title": "Acer Aspire 7 Performance Laptop",
    "brand": "Acer",
    "category": "Laptops & Computers",
    "subCategory": "Laptops",
    "description": "Versatile performance laptop for multitasking, light creative work and gaming.",
    "price": 62990,
    "image": "photo-1593642702821-c8da6771f0c6",
    "tags": [
      "Acer",
      "Laptop",
      "Performance"
    ]
  },
  {
    "id": "logitech-mx-master-3s",
    "title": "Logitech MX Master 3S Wireless Mouse",
    "brand": "Logitech",
    "category": "Laptops & Computers",
    "subCategory": "Computer Accessories",
    "description": "Ergonomic wireless productivity mouse with customizable controls.",
    "price": 8995,
    "image": "photo-1527814050087-3793815479db",
    "tags": [
      "Logitech",
      "Mouse",
      "Wireless"
    ]
  },
  {
    "id": "keychron-k2-keyboard",
    "title": "Keychron K2 Wireless Mechanical Keyboard",
    "brand": "Keychron",
    "category": "Laptops & Computers",
    "subCategory": "Computer Accessories",
    "description": "Compact mechanical keyboard suitable for desk setups and programming.",
    "price": 8999,
    "image": "photo-1587829741301-dc798b83add3",
    "tags": [
      "Keychron",
      "Keyboard",
      "Mechanical"
    ]
  },
  {
    "id": "samsung-t7-shield-ssd",
    "title": "Samsung T7 Shield Portable SSD 1TB",
    "brand": "Samsung",
    "category": "Laptops & Computers",
    "subCategory": "Storage",
    "description": "Portable solid-state storage drive for backups and transferring files.",
    "price": 9999,
    "image": "photo-1597872200969-2b65d0559e19",
    "tags": [
      "Samsung",
      "SSD",
      "Storage"
    ]
  },
  {
    "id": "airpods-pro-2",
    "title": "Apple AirPods Pro (2nd generation)",
    "brand": "Apple",
    "category": "Audio & Wearables",
    "subCategory": "Earbuds",
    "description": "Wireless earbuds with active noise cancellation, transparency mode and a compact charging case.",
    "price": 19900,
    "image": "photo-1600294037681-c80b4cb5b434",
    "tags": [
      "Apple",
      "AirPods",
      "ANC"
    ],
    "featured": true
  },
  {
    "id": "galaxy-buds3-pro",
    "title": "Samsung Galaxy Buds3 Pro",
    "brand": "Samsung",
    "category": "Audio & Wearables",
    "subCategory": "Earbuds",
    "description": "Premium wireless earbuds with adaptive noise control and a compact charging case.",
    "price": 17999,
    "image": "photo-1590658268037-6bf12165a8df",
    "tags": [
      "Samsung",
      "Earbuds",
      "ANC"
    ]
  },
  {
    "id": "jbl-flip-6",
    "title": "JBL Flip 6 Portable Bluetooth Speaker",
    "brand": "JBL",
    "category": "Audio & Wearables",
    "subCategory": "Speakers",
    "description": "Portable Bluetooth speaker designed for music at home and on the go.",
    "price": 9999,
    "image": "photo-1608043152269-423dbba4e7e1",
    "tags": [
      "JBL",
      "Speaker",
      "Bluetooth"
    ],
    "featured": true
  },
  {
    "id": "boat-nirvana-751",
    "title": "boAt Nirvana 751 ANC Headphones",
    "brand": "boAt",
    "category": "Audio & Wearables",
    "subCategory": "Headphones",
    "description": "Over-ear wireless headphones with noise-cancellation features.",
    "price": 3999,
    "image": "photo-1505740420928-5e560c06d30e",
    "tags": [
      "boAt",
      "Headphones",
      "ANC"
    ]
  },
  {
    "id": "apple-watch-se-2",
    "title": "Apple Watch SE (2nd generation)",
    "brand": "Apple",
    "category": "Audio & Wearables",
    "subCategory": "Smartwatches",
    "description": "Apple smartwatch for notifications, activity tracking and everyday use.",
    "price": 24900,
    "image": "photo-1523275335684-37898b6baf30",
    "tags": [
      "Apple",
      "Watch",
      "Fitness"
    ],
    "featured": true
  },
  {
    "id": "galaxy-watch7",
    "title": "Samsung Galaxy Watch7 Bluetooth",
    "brand": "Samsung",
    "category": "Audio & Wearables",
    "subCategory": "Smartwatches",
    "description": "Samsung smartwatch with activity tracking, health insights and phone integration.",
    "price": 29999,
    "image": "photo-1524805444758-089113d48a6d",
    "tags": [
      "Samsung",
      "Watch",
      "Fitness"
    ]
  },
  {
    "id": "garmin-forerunner-255",
    "title": "Garmin Forerunner 255 GPS Running Watch",
    "brand": "Garmin",
    "category": "Audio & Wearables",
    "subCategory": "Fitness Watches",
    "description": "GPS sports watch designed for running metrics and training tracking.",
    "price": 27990,
    "image": "photo-1434493789847-2f02dc6ca35d",
    "tags": [
      "Garmin",
      "GPS",
      "Running"
    ]
  },
  {
    "id": "canon-eos-r50",
    "title": "Canon EOS R50 Mirrorless Camera",
    "brand": "Canon",
    "category": "Laptops & Computers",
    "subCategory": "Cameras",
    "description": "Compact mirrorless camera for photography, video and content creation.",
    "price": 68990,
    "image": "photo-1516035069371-29a1b244cc32",
    "tags": [
      "Canon",
      "Camera",
      "Mirrorless"
    ],
    "featured": true
  },
  {
    "id": "dji-osmo-action-4",
    "title": "DJI Osmo Action 4 Camera",
    "brand": "DJI",
    "category": "Laptops & Computers",
    "subCategory": "Action Cameras",
    "description": "Action camera for outdoor video and adventure recording.",
    "price": 24990,
    "image": "photo-1502920917128-1aa500764cbd",
    "tags": [
      "DJI",
      "Action Camera",
      "Video"
    ]
  },
  {
    "id": "playstation-5-slim",
    "title": "Sony PlayStation 5 Slim Console",
    "brand": "Sony",
    "category": "Laptops & Computers",
    "subCategory": "Gaming",
    "description": "Home gaming console with a library of PlayStation games and media apps.",
    "price": 44990,
    "image": "photo-1606813907291-d86efa9b94db",
    "tags": [
      "Sony",
      "PlayStation",
      "Gaming"
    ],
    "featured": true
  },
  {
    "id": "xbox-series-s",
    "title": "Microsoft Xbox Series S Console",
    "brand": "Microsoft",
    "category": "Laptops & Computers",
    "subCategory": "Gaming",
    "description": "Compact Xbox gaming console for digital games and streaming apps.",
    "price": 34990,
    "image": "photo-1606144042614-b2417e99c4e3",
    "tags": [
      "Xbox",
      "Microsoft",
      "Gaming"
    ]
  },
  {
    "id": "nintendo-switch-oled",
    "title": "Nintendo Switch OLED Console",
    "brand": "Nintendo",
    "category": "Laptops & Computers",
    "subCategory": "Gaming",
    "description": "Hybrid handheld and TV-connected game console with an OLED screen.",
    "price": 31990,
    "image": "photo-1606813907291-d86efa9b94db",
    "tags": [
      "Nintendo",
      "Console",
      "Gaming"
    ]
  },
  {
    "id": "dyson-v8-vacuum",
    "title": "Dyson V8 Cordless Vacuum Cleaner",
    "brand": "Dyson",
    "category": "Home & Kitchen",
    "subCategory": "Vacuum Cleaners",
    "description": "Cordless vacuum cleaner for everyday floor and home cleaning.",
    "price": 29900,
    "image": "photo-1558317374-067fb5f30001",
    "tags": [
      "Dyson",
      "Vacuum",
      "Cleaning"
    ],
    "featured": true
  },
  {
    "id": "philips-air-fryer",
    "title": "Philips Digital Air Fryer",
    "brand": "Philips",
    "category": "Home & Kitchen",
    "subCategory": "Kitchen Appliances",
    "description": "Countertop air fryer for cooking and reheating a variety of foods.",
    "price": 9999,
    "image": "photo-1556911220-e15b29be8c8f",
    "tags": [
      "Philips",
      "Air Fryer",
      "Kitchen"
    ]
  },
  {
    "id": "philips-mixer-grinder",
    "title": "Philips HL7756 Mixer Grinder",
    "brand": "Philips",
    "category": "Home & Kitchen",
    "subCategory": "Kitchen Appliances",
    "description": "Kitchen mixer grinder for everyday food preparation.",
    "price": 3999,
    "image": "photo-1570222094114-d054a817e56b",
    "tags": [
      "Philips",
      "Mixer Grinder",
      "Kitchen"
    ]
  },
  {
    "id": "kent-supreme-ro",
    "title": "KENT Supreme RO Water Purifier",
    "brand": "KENT",
    "category": "Home & Kitchen",
    "subCategory": "Water Purifiers",
    "description": "Home water purifier; check the retailer listing for exact filtration variant and service details.",
    "price": 15990,
    "image": "photo-1581091226825-a6a2a5aee158",
    "tags": [
      "KENT",
      "Water Purifier",
      "Home"
    ]
  },
  {
    "id": "xiaomi-air-purifier-4",
    "title": "Xiaomi Smart Air Purifier 4",
    "brand": "Xiaomi",
    "category": "Home & Kitchen",
    "subCategory": "Air Purifiers",
    "description": "Smart air purifier for home air-quality management.",
    "price": 13999,
    "image": "photo-1581578731548-c64695cc6952",
    "tags": [
      "Xiaomi",
      "Air Purifier",
      "Smart Home"
    ]
  },
  {
    "id": "lg-refrigerator-260l",
    "title": "LG 260L Double Door Refrigerator",
    "brand": "LG",
    "category": "Home & Kitchen",
    "subCategory": "Refrigerators",
    "description": "Double-door refrigerator for family food storage; confirm exact finish and configuration with the seller.",
    "price": 28990,
    "image": "photo-1571175443880-49e1d25b2bc5",
    "tags": [
      "LG",
      "Refrigerator",
      "Home"
    ]
  },
  {
    "id": "ifb-microwave-30l",
    "title": "IFB 30L Convection Microwave Oven",
    "brand": "IFB",
    "category": "Home & Kitchen",
    "subCategory": "Microwave Ovens",
    "description": "Convection microwave for reheating, baking and everyday cooking.",
    "price": 14990,
    "image": "photo-1585659722983-3a675dabf23d",
    "tags": [
      "IFB",
      "Microwave",
      "Kitchen"
    ]
  },
  {
    "id": "agaro-espresso-maker",
    "title": "Agaro Imperial Espresso Coffee Maker",
    "brand": "Agaro",
    "category": "Home & Kitchen",
    "subCategory": "Coffee Machines",
    "description": "Home espresso machine for preparing coffee drinks; verify included accessories on the seller page.",
    "price": 10990,
    "image": "photo-1517668808822-9ebb02f2a0e6",
    "tags": [
      "Agaro",
      "Coffee Maker",
      "Kitchen"
    ]
  },
  {
    "id": "havells-ceiling-fan",
    "title": "Havells Stealth Air Ceiling Fan",
    "brand": "Havells",
    "category": "Home & Kitchen",
    "subCategory": "Fans",
    "description": "Modern ceiling fan for home interiors; confirm size and finish before purchasing.",
    "price": 7990,
    "image": "photo-1558317374-067fb5f30001",
    "tags": [
      "Havells",
      "Fan",
      "Home"
    ]
  },
  {
    "id": "crompton-water-heater",
    "title": "Crompton Arno Neo Water Heater",
    "brand": "Crompton",
    "category": "Home & Kitchen",
    "subCategory": "Water Heaters",
    "description": "Storage water heater for household use; confirm capacity and installation terms with retailer.",
    "price": 6990,
    "image": "photo-1556911220-e15b29be8c8f",
    "tags": [
      "Crompton",
      "Water Heater",
      "Home"
    ]
  },
  {
    "id": "adidas-ultraboost-light",
    "title": "Adidas Ultraboost Light Running Shoes",
    "brand": "Adidas",
    "category": "Fashion & Footwear",
    "subCategory": "Footwear",
    "description": "Cushioned running shoes designed for training and everyday wear.",
    "price": 16999,
    "image": "photo-1542291026-7eec264c27ff",
    "tags": [
      "Adidas",
      "Running Shoes",
      "Footwear"
    ],
    "featured": true
  },
  {
    "id": "puma-rs-x",
    "title": "Puma RS-X Sneakers",
    "brand": "Puma",
    "category": "Fashion & Footwear",
    "subCategory": "Footwear",
    "description": "Retro-inspired casual sneakers for everyday outfits.",
    "price": 8999,
    "image": "photo-1552346154-21d32810aba3",
    "tags": [
      "Puma",
      "Sneakers",
      "Footwear"
    ]
  },
  {
    "id": "nike-dunk-low",
    "title": "Nike Dunk Low Retro Sneakers",
    "brand": "Nike",
    "category": "Fashion & Footwear",
    "subCategory": "Footwear",
    "description": "Low-top lifestyle sneakers; verify available colorway and sizes at the retailer.",
    "price": 9695,
    "image": "photo-1543163521-1bf539c55dd2",
    "tags": [
      "Nike",
      "Dunk Low",
      "Sneakers"
    ]
  },
  {
    "id": "levis-511-jeans",
    "title": "Levi's 511 Slim Fit Jeans",
    "brand": "Levi's",
    "category": "Fashion & Footwear",
    "subCategory": "Clothing",
    "description": "Slim-fit denim jeans; check the retailer for waist size, length and wash options.",
    "price": 2999,
    "image": "photo-1542272604-787c3835535d",
    "tags": [
      "Levi's",
      "Jeans",
      "Clothing"
    ]
  },
  {
    "id": "adidas-classic-backpack",
    "title": "Adidas Classic 3-Stripes Backpack",
    "brand": "Adidas",
    "category": "Fashion & Footwear",
    "subCategory": "Bags",
    "description": "Everyday backpack for carrying books, personal items and accessories.",
    "price": 2499,
    "image": "photo-1553062407-98eeb64c6a62",
    "tags": [
      "Adidas",
      "Backpack",
      "Bags"
    ]
  },
  {
    "id": "fastrack-sunglasses",
    "title": "Fastrack UV-Protected Sunglasses",
    "brand": "Fastrack",
    "category": "Fashion & Footwear",
    "subCategory": "Accessories",
    "description": "Everyday sunglasses; confirm lens type, size and UV-protection details in the listing.",
    "price": 1799,
    "image": "photo-1511499767150-a48a237f0083",
    "tags": [
      "Fastrack",
      "Sunglasses",
      "Accessories"
    ]
  },
  {
    "id": "casio-gshock-ga2100",
    "title": "Casio G-Shock GA-2100 Watch",
    "brand": "Casio",
    "category": "Fashion & Footwear",
    "subCategory": "Watches",
    "description": "Durable casual watch from the G-Shock range; confirm the exact color variant.",
    "price": 8995,
    "image": "photo-1524805444758-089113d48a6d",
    "tags": [
      "Casio",
      "G-Shock",
      "Watch"
    ]
  },
  {
    "id": "philips-oneblade",
    "title": "Philips OneBlade Grooming Kit",
    "brand": "Philips",
    "category": "Fashion & Footwear",
    "subCategory": "Grooming",
    "description": "Electric grooming tool for trimming and styling facial hair.",
    "price": 2999,
    "image": "photo-1621607512214-68297480165e",
    "tags": [
      "Philips",
      "Grooming",
      "Personal Care"
    ]
  },
  {
    "id": "loreal-revitalift-serum",
    "title": "L'Oréal Paris Revitalift Serum",
    "brand": "L'Oréal Paris",
    "category": "Fashion & Footwear",
    "subCategory": "Beauty & Personal Care",
    "description": "Face serum product; check the seller page for ingredient details, size and suitability.",
    "price": 899,
    "image": "photo-1608248543803-ba4f8c70ae0b",
    "tags": [
      "L'Oreal",
      "Serum",
      "Skincare"
    ]
  },
  {
    "id": "titan-skinn-raw",
    "title": "Titan Skinn Raw Eau de Parfum",
    "brand": "Titan",
    "category": "Fashion & Footwear",
    "subCategory": "Fragrance",
    "description": "Fragrance listing; confirm bottle size and variant before purchasing.",
    "price": 1995,
    "image": "photo-1541643600914-78b084683601",
    "tags": [
      "Titan",
      "Perfume",
      "Fragrance"
    ]
  }
];

const STORE_NAMES: Record<StoreId, string> = {
  amazon: 'Amazon India',
  flipkart: 'Flipkart',
  croma: 'Croma',
  'reliance-digital': 'Reliance Digital',
  'tata-cliq': 'Tata CLiQ',
  myntra: 'Myntra',
  ajio: 'Ajio',
};

function retailerSearchUrl(storeId: StoreId, title: string): string {
  const q = encodeURIComponent(title);
  switch (storeId) {
    case 'amazon':
      return 'https://www.amazon.in/s?k=' + q;
    case 'flipkart':
      return 'https://www.flipkart.com/search?q=' + q;
    case 'croma':
      return 'https://www.croma.com/searchB?q=' + q;
    case 'reliance-digital':
      return 'https://www.reliancedigital.in/search?q=' + q;
    case 'tata-cliq':
      return 'https://www.tatacliq.com/search/?searchCategory=all&text=' + q;
    case 'myntra':
      return 'https://www.myntra.com/search?q=' + q;
    case 'ajio':
      return 'https://www.ajio.com/search/?text=' + q;
  }
}

function imageUrl(photoId: string, width: number): string {
  return 'https://images.unsplash.com/' + photoId + '?auto=format&fit=crop&w=' + width + '&q=80';
}

function roundToTen(value: number): number {
  return Math.round(value / 10) * 10;
}

const STORES_BY_CATEGORY: Record<string, StoreId[]> = {
  'Fashion & Footwear': ['amazon', 'myntra', 'ajio', 'tata-cliq'],
  'Home & Kitchen': ['amazon', 'flipkart', 'reliance-digital', 'croma'],
};

export const EXTRA_PRODUCTS: Product[] = PRODUCT_SEEDS.map((seed, index) => {
  const storeIds =
    STORES_BY_CATEGORY[seed.category] ??
    ['amazon', 'flipkart', 'croma', 'reliance-digital'];
  const originalPrice = roundToTen(seed.price * 1.15);
  const prices = storeIds.map((_, storeIndex) =>
    roundToTen(seed.price * (1 + storeIndex * 0.025))
  );
  const offers: Offer[] = storeIds.map((storeId, storeIndex) => {
    const price = prices[storeIndex];
    return {
      id: 'offer-extra-' + seed.id + '-' + storeId,
      storeId,
      storeName: STORE_NAMES[storeId],
      price,
      originalPrice,
      discountPercentage: Math.max(
        0,
        Math.round(((originalPrice - price) / originalPrice) * 100)
      ),
      availability: 'limited',
      deliveryInfo: 'Check retailer for current delivery and stock',
      deliveryDays: undefined,
      productUrl: retailerSearchUrl(storeId, seed.title),
      seller: STORE_NAMES[storeId] + ' listing',
      isLowestPrice: storeIndex === 0,
      priceDifferenceFromLowest: price - prices[0],
      lastUpdated: 'Sample listing',
    };
  });

  const image = imageUrl(seed.image, 1000);
  return {
    id: 'prod-extra-' + seed.id,
    title: seed.title,
    slug: seed.id,
    brand: seed.brand,
    category: seed.category,
    subCategory: seed.subCategory,
    description: seed.description,
    images: [image],
    thumbnail: imageUrl(seed.image, 600),
    rating: Number((4.1 + ((index % 8) * 0.1)).toFixed(1)),
    reviewCount: 120 + index * 37,
    specifications: {
      Brand: seed.brand,
      Category: seed.category,
      'Listing type': 'Demo catalog entry',
      'Current price': 'Check retailer website',
    },
    highlights: [
      seed.description,
      'Confirm current price, stock, product variant and delivery information with the retailer.',
    ],
    offers,
    lowestPrice: Math.min(...prices),
    highestPrice: Math.max(...prices),
    maxSavings: Math.max(...prices) - Math.min(...prices),
    tags: seed.tags,
    featured: Boolean(seed.featured),
    createdAt: new Date(Date.UTC(2026, 9, 1 + (index % 9), 10)).toISOString(),
  };
});
