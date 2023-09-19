    // Предполагаем, что ключ-значения ID, имени и сотового телефона всегда приходят в исходных данных
const myJson = 
'{"Operation": "I", "ShipperID": "4", "ShipperName": "DPD", "Phone": "910 4404434"}';
    // Распарсим исходный объект
const obj = JSON.parse(myJson);
    // Проверим номер телефона на валидность
import {checkPhoneNumber} from './phone_check.mjs';
let phoneCheckData = checkPhoneNumber(obj.Phone); 
let validPhone = phoneCheckData[0];
if (!validPhone) {
    console.log(`'${obj.Phone}' is not a valid Phone!`)
}
else {
    // Приведем вид номера телефона к красивому и единообразному "+7 (9xx) xxx-xx-xx"
let phone = phoneCheckData[1];
phone = phone.replace ('8','');
let phoneCode = phone.slice(0,3);
let phoneP2 = phone.slice(3,6);
let phoneP3 = phone.slice(6,8);
let phoneP4 = phone.slice(8,10);
let nicePhone = `+7 (${phoneCode}) ${phoneP2}-${phoneP3}-${phoneP4}`;
    // Выведем в консоль искомый результат в зависимости от значения "Operation"
let mySentence;
    if (obj.Operation == 'I') {
        mySentence = 
        `INSERT INTO Shippers (ShipperID, ShipperName, Phone) VALUES (${obj.ShipperID}, '${obj.ShipperName}', '${nicePhone}')`
    }
    else if (obj.Operation == 'U') {
        mySentence = 
        `UPDATE Shippers SET ShipperName = '${obj.ShipperName}', Phone = '${nicePhone}' WHERE ShipperID = ${obj.ShipperID}`
    }
    else if (obj.Operation == 'D') {
        mySentence = 
        `DELETE FROM Shippers WHERE ShipperID = ${obj.ShipperID}`
    }
    else {
        mySentence = 'Not a valid Operation!';
    }
    console.log(mySentence);
}