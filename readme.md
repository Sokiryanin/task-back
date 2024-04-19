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

13. 