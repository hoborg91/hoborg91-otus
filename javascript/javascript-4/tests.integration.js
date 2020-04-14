// Интеграционные тесты

const otus = require("./javascript-4.js");
const infra = require("../infrastructure.common.js");

Promise.resolve()

// Интеграционные тесты. Отправляем запросы последовательно

.then(() => {
    const requestCount = 3;
    let requestsReceived = 0, requestsHandled = 0, serversRunned = 0;
    let responsesReceived = 0, responsesSucceeded = 0;

    const server = otus.runServer(10, () => requestsReceived++, () => requestsHandled++, () => serversRunned++);
    return otus.request({ 
        requestCount, 
        requestMode:  otus.requestMode.sequential, 
        onResponse: () => responsesReceived++,
        onSuccess: () => responsesSucceeded++,
        onError: (e) => { throw new Error(e.message); },
    }).then(() => ({ server, requestCount, requestsReceived, requestsHandled, serversRunned, responsesReceived, responsesSucceeded }));
})
.then(({ server, requestCount, requestsReceived, requestsHandled, serversRunned, responsesReceived, responsesSucceeded }) => {
    server.close();

    infra.Assert.equal(requestCount, requestsReceived);
    infra.Assert.equal(requestCount, requestsHandled);
    infra.Assert.equal(1, serversRunned);

    infra.Assert.equal(requestCount, responsesReceived);
    infra.Assert.equal(requestCount, responsesSucceeded);
})

// Интеграционные тесты. Отправляем запросы параллельно

.then(() => {
    const requestCount = 3;
    let requestsReceived = 0, requestsHandled = 0, serversRunned = 0;
    let responsesReceived = 0, responsesSucceeded = 0;

    const server = otus.runServer(1, () => requestsReceived++, () => requestsHandled++, () => serversRunned++);
    return otus.request({ 
        requestCount, 
        requestMode:  otus.requestMode.parallel, 
        onResponse: () => responsesReceived++,
        onSuccess: () => responsesSucceeded++,
        onError: (e) => { throw new Error(e.message); },
    }).then(() => ({ server, requestCount, requestsReceived, requestsHandled, serversRunned, responsesReceived, responsesSucceeded }));
})
.then(({ server, requestCount, requestsReceived, requestsHandled, serversRunned, responsesReceived, responsesSucceeded }) => {
    server.close();

    infra.Assert.equal(requestCount, requestsReceived);
    infra.Assert.equal(requestCount, requestsHandled);
    infra.Assert.equal(1, serversRunned);

    infra.Assert.equal(requestCount, responsesReceived);
    infra.Assert.equal(requestCount, responsesSucceeded);
})

// Конец

.then(() => {
    console.log("OK");
    process.exit();
});
