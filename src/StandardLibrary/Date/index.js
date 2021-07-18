/**
 * Handles JS Datetime bindings.
 * Works together with Date.sr
 */

class _Date_ {
    constructor() {
        this.name = '_Date_';

        this.constants = [];
    };

    loadValuesToEnv(env) {
        this.env = env;
        /// GET TODAY's DAY
        this.define('ThisDate', () => new Date().getDate());

        /// GET TODAY'S DATE AS dd/MM/yyyy
        this.define('Today', () => {
            const now = new Date();
            const day = now.getDate();
            const month = now.getMonth() + 1;
            const year = now.getFullYear();
            return `${day}/${month}/${year}`;
        });

        /// GET TODAY's MONTH
        this.define('ThisMonth', () => new Date().getMonth());

        /// GET TODAY's YEAR
        this.define('ThisYear', () => new Date().getFullYear());

        /// GET TODAY's WEEKDAY
        this.define('ThisDay', () => {
            const day = new Date().getDay();
            const days = [
                'Sunday', 'Monday', 'Tuesday',
                'Wednesday', 'Thursday', 'Friday',
                'Saturday'
            ];
            return days[day];
        });

        /// GET CURRENT SECOND
        this.define('ThisSecond', () => new Date().getSeconds());

        /// GET CURRENT TIME IN FORMAT HH:mm:ss
        this.define('TimeAs24Hour', () => new Date().toLocaleTimeString());

        /// GET CURRENT TIME IN FORMAT hh:mm:ss a
        this.define('TimeAs12Hour', () => {
            const time = new Date();
            let hh = time.getHours();
            const mm = time.getMinutes();
            const ss = time.getSeconds();
            return `${hh <= 12 ? hh : hh - 12}:${mm}:${ss} ${hh < 11 ? 'AM' : 'PM'}`;
        });

        /// GET CURRENT TIME AS TIMESTAMP
        this.define('Timestamp', () => {
            return new Date().toISOString()
                .replace('Z', '')
                .replace('-', '')
                .replace(':', '')
                .replace('.', '')
                .replace('T', '')
                .replace('-', '')
                .replace(':', '')
                .replace('.', '');
        });

        /// GET CURRENT DATE IN FORMAT DDD MMM dd yyyy
        this.define('FullDate', () => {
            return new Date().toDateString();
        });

        /// GET CURRENT TIME IN FORMAT HH:mm:ss Z (ZZZZ)
        this.define('FullTime', () => {
            return new Date().toTimeString();
        });
    };

    define(constant, callback) {
        this.env.define(constant, callback);
        this.constants.push(constant);
    };

    interceptParser(currentToken, currentStatement) {
        if (currentToken in this.constants) {
            currentToken.value = this.environment.get(currentToken)();
            console.log(currentToken);
            currentToken.type = 'STRING';
            currentStatement.push(currentToken);
        };
    };

    toString() {
        return `built-in class<${this.name}>`;
    };
}


module.exports = new _Date_();