Робота з Node.js

1. npm init -y ініціалізація проєкту
2. встановлюємо всі необхідні залежності
3. Додаємо файл index.js
4. Прописуємо скрипт для запуску проєкта в package.json: "scripts": {"start": "node index"};
5. Встановлюємо nodemon для автоматичного перезапуску проєкта. 
6. --save-dev - скорочення -D
7. Прописуємо скрипт для запуску проєкта в package.json: "scripts:dev": {"start": "nodemon index"};
8. Команда для запуску проєкту npm run start:dev
9. Імпорт/експорт Якщо є декілька функцій які обробляють якесь завдання, їх потрібно перекинути в загальну папку та створити всередині цієї папки файл index.js для експорту всіх файлів в цій папці. (CommonJS);
10. Якщо ми хочемо писати на ES6 модулях нам потрібно в package.json дописати "type": "module".
11. Імпорт/експорт в ES6 модулях: 

варіант 1: 

шлях dateFunc > getCurrentMonth.js: 

const getCurrentMonth = () => {
  const now = new Date();
  return now.getMonth() + 1;
};

export default getCurrentMonth;

шлях dateFunc > isLeepYear.js: 

const isLeepYear = () => {
  console.log("leep year");
};

export default isLeepYear;

шлях dateFunc > index.js:

export { default as getCurrentMonth } from "./getCurrentMonth.js";
export { default as isLeepYear } from "./isLeepYear.js";

src > index.js: 
імпорт в основний index.js
import { getCurrentMonth, isLeepYear } from "./dateFunc/index.js";

12. Робота в файлами. Читання!

Пишемо import fs from "fs/promises"; та в цому файлі прописуємо асинхронну ф-цію:

варіант 1:
const filepath = "./files/file.txt";
const func = async () => {
  const result = await fs.readFile("./files/file.txt");
  треба result привести до string: 
    const text = buffer.toString();
    text - наш текст із файла
};

або передати спосіб кодування, варіант 2:

const func = async () => {
  const text = await fs.readFile(filepath, "utf-8");
  console.log(text);
};

або можно викростита пакет detect-file-encoding-and-language, варіант 3: 

const func = async () => {
  const text = await detectFileEncoding(filepath);
  console.log(text);
};

Дописування в файл. fs.appendFile();

Оновлення файлу, перезапис. fs.writeFile();

видалення файлу fs.unlink();

<< Створення своєї бази данних: >>

1. Створюється функція екшенів, в нашому випадку invokeAction, в якій за подомогою switch прописуємо всі кейси для роботи з базою данних. В нашому випадку (отримання всіх бордів, отримання одного борду по id, додавання борду, оновлення борду, видалення борду, додавання таски в борд, видалення таски в борд, оновлення таски). 

2. Створюється так званий сервіс у якому прописуються функції які отримають данні із екшенів для обробки дошок та тасок.  
Щоб прочитати те що користувач написав в консолі використовуєтсья массив  process.argv. Пишимо в консолі node app --action list. Або використовують пакети Yargs або Commander.

/* Express найпопулярніша бібліотека для створення веб серверів*/

1. Після створення серверу, при використанні методу get для відправки відповіді на запит краще використовувати метод json, наприклда res.json(data). Бо json метод може повернути null а метод send не може. Стандартний сервер: 

import express from "express"
const app = express();
app.get("./data", (req, res) => {
  res.json(data);
});
app.listen(3000, () => console.log("Server running on PORT 3000"));

Для перевірки запитів використовуй Postman

2. Middleware (далі MW) - проміжні обробки. Необхідні дії, які потрібно передати перед відправкою відповіді з сервера. 
  Схема: 
Frontend => Web-server => middleware1 => middleware2 => app.get("/data", (res, next)=>{});

Щоб створити MW потрібно викликати метод "use", метод приймає першим арг. маршрут, а другим колбек. Якщо передати колбек без маршуту, то MW спрацює для всіх запитів. 

app.use((req, res) => {console.log("First middleware")})

Express обробляє запити по черзі, тому після знаходження першого співпадіння він зупиняється. 
Якщо першим буде знайдений MW без маршруту то відповіді від сервера на фронтенд не буде. Тому MW і називається проміжним. Він повинен щось обробити і відправити запит далі. Тому третім аргументом в колбек ф-ції передається ф-ція next. Якщо викликати next() в колбеку то він каже експресу що треба шукати далі. 
Таким яином можно використовувати MW не одну. 

app.use((req, res, next) => {console.log("First middleware");
next(); 
})

Тому MW котру треба виконати перед будь-яким маршрутом потрібно викликати на початку. 
Частіше всього MW використовується для обробки CORS запитів. 


3. CORS - cross original request (запит з одного домену на інший). 

app.use((req, res, next) => {
  // Дозвіл запитів з конкретних джерел
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Дозвіл певних методів запиту
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  // Дозвіл певних заголовків у запиті
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  //Дозвіл відправлення куки та аутентифікації
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Перехід до наступної middleware
  next();
});

Але так не пишуть а використовують пакет CORS.

import express from "express"
import cors from "cors"

const app = express();
const corsMiddleware = cors();
app.use(corsMiddleware);

app.get("./data", (req, res) => {
  res.json(data);
});
app.listen(3000, () => console.log("Server running on PORT 3000"));

Якщо приходить запит на адресу якої нема то прописуємо мідлвар для обробки помилки: 

app.use((req, res) => {
  res.status(404).json({
    message: "Not found"
  })
})

4. REST API - основні правила. 
Адреса запиту починається з іменника в множині, який вказує на обʼєкт:
 /products, /boards, /users 

CRUD-операція визнається методом HTTP-запиту, а не адресою: 
GET /boards - повернути всі дошки. 
POST /boards - додати одну дошку.

Якщо треба звернутися до одного обʼєкту то в кінці маршурут через / додають id цього обʼєкту:
GET /boards/1 - повернути дошку з id 1;
DELETE /boards/2 - видалити дошку з id 2;

Якщо запит повертає данні а не розмітку то починати адресу краще з /api:
/api/boards

Якщо хочете мати кілька версій API, то версію краще додавати до адреси: 
/api/v1/boards
/api/v2/boards

5. Правила відповідей REST API
Як пройшла обробка запиту на бекенді визначає статус відповіді: 
200 - OK
201 - Created
204 - No Content

301 - адреса переїхала на завжди
302 - адреса переїхала тимчасово

400 - Bad Request помилка в тілі запиту
401 - Unauthorized
403 - Forbidden
404 - Not Found - не знайдена адреса або обʼєкт з таким id
409 - Conflict

помилки сервера
500 - Server error

При додаванні або оновлені у відповідь треба відправляти обʼєкт з id 

6. Створюємо маршрути boards.
7. Якщо працюємо з JSON - Створюємо папку models, там створюємо папку boards, закидуємо нашу базу даних та файл index.js в якому прописуємо функції які считують та перезаписують наш JSON. 
7. Створюємо контролери для роутів також в окремій папці. 
Схема така: 
index.js (ф-ції для зчитування та зміни бази) => Controllers робить запит до бази даних, обробляє помилки (якщо вони є) та відправляє відповідь на фронтенд => Routes



