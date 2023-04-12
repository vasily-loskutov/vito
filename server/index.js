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
// [
//   {
//       "id": 2,
//       "name": "Ноутбук HUAWEI 53013PLU NbD-WDI9 MateBook D14 i3/8GB/256GB Sp/Gr",
//       "description": "Ноутбук Huawei 53013PLU NbD-WDI9 MateBook D14 i3/8GB/256GB Sp/Gr габаритами 15,9х322,5х214,8 мм с предустановленной домашней Windows 11 и веб-камерой на 1 МПикс весит 1,38 кг. Датчик отпечатка пальца защищает от взлома и похищения сведений.",
//       "price": 39999,
//       "photo": [
//           "https://img.mvideo.ru/Pdb/30066800b.jpg",
//           "https://cdn.rbt.ru/images/gen/item_image/image/9801/63/980084_r2537.jpg",
//           "https://static.eldorado.ru/photos/mv/Big/30066800bb3.jpg"
//       ],
//       "rate": 4,
//       "count": 1,
//       "createdAt": "2023-03-31T13:54:30.689Z",
//       "updatedAt": "2023-04-01T12:49:37.225Z"
//   },
//   {
//       "id": 8,
//       "name": "Смартфон Apple iPhone 14 Pro Max 256GB Deep Purple",
//       "description": "Данная модель могла быть предварительно активирована. Является абсолютно новой, не проходила процедуру привязки аккаунта Apple ID.Обращаем ваше внимание, указанная выше информация не влияет на потребительские",
//       "price": 125999,
//       "photo": [
//           "https://i4you.ru/image/cache/catalog/0iPhone/iPhone14pro/14propurple3-500x600.jpg",
//           "https://cifra-shop.ru/image/cache/catalog/product/7/v52vogeqyiwjq2n_9a5e0385-1400x1000.jpg",
//           "https://my-apple-store.ru/wa-data/public/shop/products/82/26/12682/images/19740/19740.970.jpg"
//       ],
//       "rate": 5,
//       "count": 1,
//       "createdAt": "2023-04-01T12:50:03.311Z",
//       "updatedAt": "2023-04-01T12:50:03.311Z"
//   },
//   {
//       "id": 3,
//       "name": "Смартфон Xiaomi 12 Lite 128Gb Black",
//       "description": "Смартфон Xiaomi 12 Lite основан на восьмиядерном процессоре Snapdragon 778G, который работает в паре с 8/128 Гб памяти и ОС Android 12. Модель оснащена 6,55-дюймовым OLED-экраном с частотой обновления 120 Гц.",
//       "price": 34999,
//       "photo": [
//           "https://mi-xx.ru/mdata/topimg/size3/5730.jpg",
//           "https://markerplus.ru/wa-data/public/shop/products/70/44/284470/images/342053/342053.970x0.jpg",
//           "https://spb.xiacom.ru/upload/ammina.optimizer/jpg-webp/q80/upload/resize_cache/iblock/647/620_620_1/202ca263-3366-11ed-a250-00155d6abf1f_87d88ab1-38e4-11ed-a250-00155d6abf1f.webp"
//       ],
//       "rate": 3.2,
//       "count": 1,
//       "createdAt": "2023-04-01T12:10:54.046Z",
//       "updatedAt": "2023-04-01T12:10:54.046Z"
//   },
//   {
//       "id": 4,
//       "name": "Ноутбук Honor MagicBook 16 R5/16/512 Grey (HYM-W56)",
//       "description": "Ноутбук Honor MagicBook 16 Grey — модель без предустановленной операционной системы, оснащенная шестиядерным процессором AMD Ryzen 5 5600H с тактовой частотой 3,3 ГГц и кэш-памятью объемом 16 Мб.",
//       "price": 55999,
//       "photo": [
//           "https://main-cdn.sbermegamarket.ru/big2/hlr-system/-99/388/574/524/165/3/100047017125b1.jpg",
//           "https://img.mvideo.ru/Pdb/30066661b.jpg",
//           "https://avatars.mds.yandex.net/get-mpic/1924580/img_id298193091741686087.jpeg/600x800"
//       ],
//       "rate": 4.6,
//       "count": 1,
//       "createdAt": "2023-04-01T12:23:17.533Z",
//       "updatedAt": "2023-04-01T12:23:17.533Z"
//   },
//   {
//       "id": 5,
//       "name": "Холодильник Haier C2F637CFMV",
//       "description": "Холодильник с нижней морозильной камерой Haier C2F637CFMV отлично впишется в современный интерьер кухни благодаря применению стильной и практичной отделки из нержавеющей стали.",
//       "price": 54999,
//       "photo": [
//           "https://cdn1.ozone.ru/s3/multimedia-1/6014949325.jpg",
//           "https://main-cdn.sbermegamarket.ru/big1/hlr-system/1748262/100000012691b0.jpg",
//           "https://262911.selcdn.ru/static/iblock/f58/f58d3905239963cd87697355208c1ea5/6a0f5250fb30ce6d7a2038849728ca5e.jpg"
//       ],
//       "rate": 5,
//       "count": 1,
//       "createdAt": "2023-04-01T12:26:35.323Z",
//       "updatedAt": "2023-04-01T12:26:35.323Z"
//   },
//   {
//       "id": 6,
//       "name": "Холодильник Candy CCRN 6200W",
//       "description": "В холодильнике Candy CCRN 6200W стильный дизайн сочетается с современными решениями, обеспечивающими стабильную и эффективную работу. Это и украшение кухни, и прибор, в котором созданы оптимальные условия для хранения продуктов.",
//       "price": 36999,
//       "photo": [
//           "https://static.insales-cdn.com/images/products/1/7792/326794864/1_34004286_15_01_F_CCRN_6200W.jpg",
//           "https://img.mvideo.ru/Pdb/20070162b.jpg",
//           "https://avatars.mds.yandex.net/get-mpic/5222168/img_id3724579385938721290.png/orig"
//       ],
//       "rate": 2.3,
//       "count": 1,
//       "createdAt": "2023-04-01T12:28:54.052Z",
//       "updatedAt": "2023-04-01T12:28:54.052Z"
//   },
//   {
//       "id": 7,
//       "name": "Ноутбук игровой MSI Katana GF76 12UE-660RU",
//       "description": "Игровой ноутбук MSI Katana GF76 12UE-660RU в пластиковом корпусе черного цвета — модель с предустановленной ОС Windows 11, снабженная SSD-накопителем на 512 Гб. В основе высокой производительности лежит Intel Core i5 12450H",
//       "price": 109999,
//       "photo": [
//           "https://avatars.mds.yandex.net/get-mpic/5234464/img_id7089117576127750011.jpeg/orig",
//           "https://avatars.mds.yandex.net/get-mpic/2017291/img_id2014696168376063491.jpeg/orig",
//           "https://ir.ozone.ru/s3/multimedia-v/c1000/6540574231.jpgg"
//       ],
//       "rate": 4.3,
//       "count": 1,
//       "createdAt": "2023-04-01T12:32:15.693Z",
//       "updatedAt": "2023-04-01T12:32:15.693Z"
//   },
//   {
//       "id": 1,
//       "name": "Смартфон Samsung Galaxy A13 4/64Gb черный",
//       "description": "Смартфон Samsung Galaxy A13 оснащен двумя слотами для SIM-карт формата nanoSIM. Экран создан по технологии PLS, его диагональ — 6,6 дюйма, разрешение — 2408х1080 пикселей, частота обновления — 60 Гц.",
//       "price": 10999,
//       "photo": [
//           "https://ir.ozone.ru/s3/multimedia-1/c700/6329232565.jpg",
//           "https://main-cdn.sbermegamarket.ru/big1/hlr-system/-10/650/469/466/718/29/100031821060b0.jpg",
//           "https://main-cdn.sbermegamarket.ru/big2/hlr-system/-10/650/469/456/718/29/100031821060b1.jpg"
//       ],
//       "rate": 3.2,
//       "count": 1,
//       "createdAt": "2023-03-31T13:54:09.729Z",
//       "updatedAt": "2023-04-01T12:41:29.032Z"
//   }
// ]
