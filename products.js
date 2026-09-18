const DEFAULT_PRODUCTS = [
  // КОТЛЫ
  { id:1, name:"Газовый котёл Baxi Eco Four 24F", category:"Котлы", price:78000, oldPrice:89000,
    img:"https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400", desc:"24 кВт, двухконтурный, турбированный" },
  { id:2, name:"Котёл Navien DELUXE 16K", category:"Котлы", price:52000, oldPrice:60000,
    img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400", desc:"16 кВт, двухконтурный" },
  { id:3, name:"Электрический котёл Bosch 18 кВт", category:"Котлы", price:41000, oldPrice:0,
    img:"https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400", desc:"Электрокотёл, 18 кВт" },

  // РАДИАТОРЫ
  { id:4, name:"Радиатор биметалл Royal Thermo 500", category:"Радиаторы", price:6500, oldPrice:7200,
    img:"https://images.unsplash.com/photo-1595515106864-077d54f2c4d8?w=400", desc:"10 секций, 500 мм" },
  { id:5, name:"Радиатор алюминиевый 500мм", category:"Радиаторы", price:4200, oldPrice:0,
    img:"https://images.unsplash.com/photo-1615873968403-89e068629265?w=400", desc:"8 секций" },
  { id:6, name:"Радиатор стальной панельный 500x1000", category:"Радиаторы", price:8900, oldPrice:0,
    img:"https://images.unsplash.com/photo-1585128792020-803d29415281?w=400", desc:"Стальной, 500x1000" },

  // ТРУБЫ И ФИТИНГИ
  { id:7, name:"Труба PPR 25мм (2м)", category:"Трубы", price:320, oldPrice:0,
    img:"https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=400", desc:"Полипропиленовая" },
  { id:8, name:"Труба металлопластик 16мм", category:"Трубы", price:180, oldPrice:0,
    img:"https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400", desc:"За метр" },

  // НАСОСЫ
  { id:9, name:"Циркуляционный насос Grundfos 25-40", category:"Насосы", price:18500, oldPrice:21000,
    img:"https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400", desc:"Grundfos Alpha" },
  { id:10, name:"Насос Wilo Star-RS 25/6", category:"Насосы", price:14200, oldPrice:0,
    img:"https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400", desc:"Wilo" },

  // ТЕРМОРЕГУЛЯТОРЫ
  { id:11, name:"Терморегулятор радиатора Danfoss", category:"Автоматика", price:2800, oldPrice:0,
    img:"https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400", desc:"Термоголовка" },
  { id:12, name:"Термостат комнатный программируемый", category:"Автоматика", price:5600, oldPrice:6400,
    img:"https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400", desc:"Недельный программатор" },

  // БОЙЛЕРЫ
  { id:13, name:"Бойлер косвенного нагрева 100л", category:"Бойлеры", price:32000, oldPrice:0,
    img:"https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400", desc:"100 литров" },
  { id:14, name:"Водонагреватель накопительный 50л", category:"Бойлеры", price:17500, oldPrice:19000,
    img:"https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?w=400", desc:"Электрический" },

  // КОМПЛЕКТУЮЩИЕ
  { id:15, name:"Кран шаровой 1/2", category:"Комплектующие", price:850, oldPrice:0,
    img:"https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400", desc:"Латунный" },
  { id:16, name:"Расширительный бак 12л", category:"Комплектующие", price:3400, oldPrice:0,
    img:"https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400", desc:"Для отопления" },
];

// Инициализация базы товаров в localStorage
function initProducts() {
  if (!localStorage.getItem('cc_products')) {
    localStorage.setItem('cc_products', JSON.stringify(DEFAULT_PRODUCTS));
  }
}
function getProducts() {
  return JSON.parse(localStorage.getItem('cc_products') || '[]');
}
function saveProducts(list) {
  localStorage.setItem('cc_products', JSON.stringify(list));
}
initProducts();