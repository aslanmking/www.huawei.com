class querystring {
    static parse(str, sep = '&', eq = '=') {
        let result = {};
        if (typeof str === 'string' && str) {
            let temp = str.replace(/^.+\?/i, '');
            let arr = temp.split(sep);
            arr.forEach(el => {
                let item = el.split(eq);
                if (result[item[0]]) {
                    if (!Array.isArray(result[item[0]])) {
                        result[item[0]] = [result[item[0]]];
                    }
                    result[item[0]].push(item[1]);
                } else {
                    result[item[0]] = item[1];
                }
            });
        }
        return result;
    }

    static stringify(obj, sep = '&', eq = '=') {
        let result = '';
        if (typeof obj === 'object' && obj != null) {
            for (let key in obj) {
                if (Array.isArray(obj[key])) {
                    obj[key].forEach(el => {
                        result += `${key}${eq}${el}${sep}`;
                    });
                } else {
                    result += `${key}${eq}${obj[key]}${sep}`;
                }
            }
        }
        return result.replace(/&+$/, '');
    }
}

export default querystring;