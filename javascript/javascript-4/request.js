const otus = require("./javascript-4.js");

class WrongCliArgumentsError extends Error {
    constructor() {
        super("There are must be two CLI arguments: " +
        "requests count (a positive number) and request mode " +
        `(either '${otus.requestMode.sequential}' or '${otus.requestMode.parallel}'). Use the following pattern:` + 
        "\nnode request.js 10 s");
    }
}

const options = ((allArgs) => {
    const execArgs = allArgs.slice(2);
    if (execArgs.length !== 2)
        throw new WrongCliArgumentsError();
    const parsedCount = global.parseInt(execArgs[0]);
    if (typeof parsedCount !== typeof 0 || parsedCount <= 0)
        throw new WrongCliArgumentsError();
    const mode = execArgs[1];
    if (otus.requestMode.sequential !== mode && otus.requestMode.parallel !== mode)
        throw new WrongCliArgumentsError();
    return {
        requestCount: parsedCount,
        requestMode: mode,
    };
})(process.argv);

otus.request(options);

console.log("OK");
