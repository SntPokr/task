// Проверяем различные вариации написания номера телефона:
// номера с кодом страны "+7", "8", либо без него,
// а также с любой комбинацией скобок, пробелов и дефисов пройдут проверку
const checkPhoneNumber = num => {
    num = num.replaceAll('(','')
    .replaceAll(')','')
    .replaceAll(' ','')
    .replaceAll('-','');
    if (num.startsWith('+7')) {
        num = num.replace('+7','8')
    }
    else if ((num.startsWith('9') && num.length == 10)) {
        num = '8' + num
    };
    if (!(num.startsWith('8') && num.length == 11)) {
        return [false, num]
    };
    let onlyNum = true;
    for (const char of num) {
        if (isNaN(Number(char))) {
            onlyNum = false;
            break;
        }
    };
    return [onlyNum, num];
};
export {checkPhoneNumber};