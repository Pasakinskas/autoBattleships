class Utilities {
    static randinteger(size) {
        let root = size * Math.random();
        return Math.floor(root);
    }
    static repeat(times, callback) {
        for (var i = 0; i < times; i++)
            callback(i);
    }

    static randDirection() {
        let root = Math.floor(10 * Math.random());
        if (root > 5) {
            return "v";
        }
        else {
            return "h";
        }
    }
}

