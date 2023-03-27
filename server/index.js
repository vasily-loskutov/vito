const express = require("express");
require("dotenv").config();
const app = express();
const routes = require("./routes");
const sequelize = require("./db");
const cors = require("cors");

const cookieParser = require("cookie-parser");

const errorMiddleware = require("./middleware/errorMiddleware");
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);
app.use(express.urlencoded({ extended: false }));
app.use("/api", routes);

app.use(errorMiddleware);
const PORT = process.env.PORT ?? 8080;
async function start() {
  try {
    app.listen(PORT, async () => {
      await sequelize.authenticate();
      await sequelize.sync();
      console.log(`Server started on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}
start();
// {
//   "name":"Samsung a12",
//   "linkToGoodPage":1,
//    "photo": [
//     "https://avatars.mds.yandex.net/get-mpic/4219828/img_id4095419568343885039.jpeg/orig",
//     "https://avatars.mds.yandex.net/get-mpic/3934197/img_id8491830053390720189.jpeg/orig",
//     "https://appleprostore.ru/wp-content/uploads/2022/09/apple-iphone-14-pro-max-deep-purple-2.jpg"
//   ],
//   "price":12000

// }
// [
//   {
//       "id": 1,
//       "name": "Samsung a12",
//       "description": "Самсунг а12 бла блабла",
//       "price": 12000,
//          "photo": [
//   "https://3dnews.ru/assets/external/illustrations/2020/11/25/1026214/gsmarena_001.jpg",
//   "https://www.notebookcheck-ru.com/uploads/tx_nbc2/SamsungGalaxyA12.jpg",
//   "https://3dnews.ru/assets/external/illustrations/2020/11/25/1026214/gsmarena_002.jpg"
// ],
//       "rate": 3.2,
//       "createdAt": "2023-03-13T17:41:36.408Z",
//       "updatedAt": "2023-03-13T17:41:36.408Z"
//   },
//   {
//       "id": 2,
//       "name": "Iphone 14 pro max",
//       "description": "Iphone 14 pro max бла блабла",
//       "price": 168990,
//       "photo": [
//           "https://avatars.mds.yandex.net/get-mpic/4219828/img_id4095419568343885039.jpeg/orig",
//           "https://avatars.mds.yandex.net/get-mpic/3934197/img_id8491830053390720189.jpeg/orig",
//           "https://appleprostore.ru/wp-content/uploads/2022/09/apple-iphone-14-pro-max-deep-purple-2.jpg"
//       ],
//       "rate": 4.2,
//       "createdAt": "2023-03-13T17:42:17.046Z",
//       "updatedAt": "2023-03-13T17:42:17.046Z"
//   }
// ]
