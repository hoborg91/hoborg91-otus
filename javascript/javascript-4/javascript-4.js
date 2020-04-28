// ==== Условия ====

// Реализовать скрипт request для тестирования веб сервера
// Создать локальный веб сервер `server`, отвечающий на запросы каждые 100ms

// Создать скрипт `request`, принимающий на вход
// - количество запросов `N`
// - тип запросов - параллельный или последовательный

// Скрипт `request` должен отправлять `N` последовательных или параллельных `HTTP` запросов к локальному серверу `server` 

// ==== Реализация ====

const http = require("http");
const infra = require("../infrastructure.common.js");

function now() {
    return new Date().toLocaleString();
}

const serverSettings = {
    hostname: "127.0.0.1",
    port: 3000,
    maxRequestQueueSize: 10 * 1000,
};

// ==== Реализация server ====

runServer = (responseIntervalMs, onRequestReceived, onRequestHandled, onServerRun) => {

    // Проверка аргументов

    if (responseIntervalMs === null || responseIntervalMs === undefined)
        responseIntervalMs = 100;
    else if (false
        || typeof responseIntervalMs !== typeof 0
        || responseIntervalMs <= 0
    )
        throw new infra.ArgumentError("If specified, the responseIntervalMs argument must be a positive integer.");
    
    if (onRequestReceived === null || onRequestReceived === undefined)
        onRequestReceived = (req) => console.log(`${now()} [SERVER] Incoming request: ${req.url}`);
    else if (typeof onRequestReceived !== typeof infra.dummyFunction)
        throw new infra.ArgumentError("If specified, the onRequestReceived argument must be a function.");
    
    if (onRequestHandled === null || onRequestHandled === undefined)
        onRequestHandled = (req) => console.log(`${now()} [SERVER] Request handled: ${req.url}`);
    else if (typeof onRequestHandled !== typeof infra.dummyFunction)
        throw new infra.ArgumentError("If specified, the onRequestHandled argument must be a function.");

    if (onServerRun === null || onServerRun === undefined)
        onServerRun = (hostname, port) => console.log(`${now()} [SERVER] Running at http://${hostname}:${port}/`);
    else if (typeof onServerRun !== typeof infra.dummyFunction)
        throw new infra.ArgumentError("If specified, the onServerRun argument must be a function.");

    // Основное содержимое метода

    const requestsQueue = [];
    global.setInterval(
        () => {
            if (requestsQueue.length === 0)
                return;
            const request = requestsQueue.shift();
            request();
        },
        responseIntervalMs
    );

    const server = http.createServer((req, res) => {
        onRequestReceived(req);
        if (requestsQueue.length > serverSettings.maxRequestQueueSize) {
            res.statusCode = 500;
            res.end();
            return;
        }
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/plain");
        requestsQueue.push(() => {
            onRequestHandled(req);
            res.end("Hello, world!");
        });
    });
    
    server.listen(serverSettings.port, serverSettings.hostname, () => {
        onServerRun(serverSettings.hostname, serverSettings.port);
    });

    return server;
}

// ==== Реализация request ====

function execRequest(hostname, port, onResponse, onSuccess) {
    return new Promise(function(resolve, reject) {
        const req = http.request(`http://${hostname}:${port}`, {}, (res) => {
            onResponse(res);
            if (res.statusCode === 200) {
                let body = "";
                res.on("data", (chunk) => {
                    body += chunk;
                });
                res.on("end", () => {
                    onSuccess(body);
                });
                resolve(res);
            }
            else
                reject(res);
        });
        req.on("error", e => reject(e));
        req.on("abort", e => reject(e));
        req.on("timeout", e => reject(e));
        try {
            req.end();
        } catch(e) {
            reject(e);
        }
    });
}

const RequestModeSequential = "s";
const RequestModeParallel = "p";
function checkRequestOptions(options) {
    if (false
        || typeof options !== typeof {}
        || options === null
        || typeof options.requestCount !== typeof 0
        || options.requestCount <= 0
        || !(options.requestMode === RequestModeSequential || options.requestMode === RequestModeParallel)
    )
        throw new infra.ArgumentError("The request options argument must be an object, " + 
            "containing requestCount (a positive integer) and requestMode " +
            `('${RequestModeSequential}' or '${RequestModeParallel}') fields.`);
    
    if (true
        && options.onError !== undefined 
        && options.onError !== null 
        && typeof options.onError !== typeof infra.dummyFunction
    )
        throw new infra.ArgumentError("The request options argument contains an onError field which is not a function.");

    if (true
        && options.onResponse !== undefined 
        && options.onResponse !== null 
        && typeof options.onResponse !== typeof infra.dummyFunction
    )
        throw new infra.ArgumentError("The request options argument contains an onResponse field which is not a function.");

    if (true
        && options.onSuccess !== undefined 
        && options.onSuccess !== null 
        && typeof options.onSuccess !== typeof infra.dummyFunction
    )
        throw new infra.ArgumentError("The request options argument contains an onSuccess field which is not a function.");
}

request = (options) => {
    checkRequestOptions(options);
    const onError = typeof options.onError === typeof infra.dummyFunction
        ? options.onError
        : (e) => console.log(`${now()} [CLIENT] Error! ${e}`);
    const onResponse = typeof options.onResponse === typeof infra.dummyFunction
        ? options.onResponse
        : (res) => console.log(`${now()} [CLIENT] Response: ${res.statusCode} ${res.statusMessage}`);
    const onSuccess = typeof options.onSuccess === typeof infra.dummyFunction
        ? options.onSuccess
        : (body) => console.log(body);

    const requestCall = () => execRequest(serverSettings.hostname, serverSettings.port, onResponse, onSuccess);
    
    switch (options.requestMode) {
        case RequestModeSequential:
            let requestsSequence = requestCall();
            for (let i = 1; i < options.requestCount; i++) {
                requestsSequence = requestsSequence.then(r => requestCall()).catch(onError);
            }
            return requestsSequence;
        case RequestModeParallel:
            const parallelRequests = [];
            for (let i = 0; i < options.requestCount; i++) {
                parallelRequests.push(requestCall().catch(onError));
            }
            return Promise.all(parallelRequests);
        default:
            throw new NotSupportedError(`The request mode '${options.requestMode}' is not supported.`);
    }
}

// ==== Экспорт ====

module.exports = {
    runServer,
    request,
    requestMode: {
        sequential: RequestModeSequential,
        parallel: RequestModeParallel,
    },
}