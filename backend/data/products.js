export const products = [
  {
    name: "Mozarella Cheese",
    description:
      "Fresh mozzarella is generally white but when seasoned it turns to a light yellow depending on the animal's diet. Due to its high moisture content, it is traditionally served the day after it is made but can be kept in brine for up to a week or longer when sold in vacuum-sealed packages. Low-moisture mozzarella can be kept refrigerated for up to a month, though some shredded low-moisture mozzarella is sold with a shelf life of up to six months. Mozzarella is used for most types of pizza and several pasta dishes or served with sliced tomatoes and basil in Caprese salad.",
    price: 2.99,
    countInStock: 10,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Mozzarella_di_bufala3.jpg/1280px-Mozzarella_di_bufala3.jpg",
  },
  {
    name: "Parmesan Cheese",
    description:
      "Parmesan is an Italian hard, granular cheese produced from cows' milk and aged at least 12 months.",
    price: 3.99,
    countInStock: 10,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Parmigiano-Reggiano.jpg/1280px-Parmigiano-Reggiano.jpg",
  },
  {
    name: "Gouda Cheese",
    description:
      "Gouda is a yellow-coloured Dutch cheese named after the city of Gouda in the Netherlands. It is one of the most popular cheeses in the world, and is the most popular cheese in the Netherlands. It is a hard cheese with a smooth texture and a sweet, nutty flavour. It is often used in sandwiches, and is a common ingredient in macaroni and cheese.",
    price: 4.99,
    countInStock: 10,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/WikiCheese_-_Gouda_36_mois_03.jpg/1280px-WikiCheese_-_Gouda_36_mois_03.jpg",
  },
];

export const users = [
  {
    name: "Admin User",
    username: "admin",
    password: "admin",
    isAdmin: true,
    isAccountant: false,
  },
];

export const clients = [
  {
    name: "John Doe",
    email: "jdoe@test.org",
    password: "123456",
    phone: "1234567890",
    address: {
      street: "123 Main St",
      city: "Anytown",
      state: "NY",
      postalCode: "M4B 1B3",
    },
    orders: [
      {
        orderDate: "2021-01-01T00:00:00.000Z",
        orderTotal: 35,
        orderItems: [
          {
            name: "Mozarella Cheese",
            quantity: 2,
            price: 7.98,
          },
          {
            name: "Parmesan Cheese",
            quantity: 1,
            price: 3.99,
          },
        ],
        orderStatus: [
          {
            received: true,
            processing: false,
            shipped: false,
            delivered: false,
          },
        ],
      },
    ],
  },
];
