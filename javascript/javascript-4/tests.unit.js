// Модульные тесты

const otus = require("./javascript-4.js");
const infra = require("../infrastructure.common.js");

// Модульные тесты. Запрос

infra.Assert.throwsError(
    () => otus.request(null),
    infra.ArgumentError,
    "options"
);

infra.Assert.throwsError(
    () => otus.request({ 
            requestCount: -1, 
            requestMode: otus.requestMode.sequential, 
    }),
    infra.ArgumentError,
    "requestCount"
);

infra.Assert.throwsError(
    () => otus.request({ 
            requestCount: 3, 
            requestMode: "x", 
    }),
    infra.ArgumentError,
    "requestMode"
);

infra.Assert.throwsError(
    () => otus.request({ 
            requestCount: 3, 
            requestMode: "s", 
            onSuccess: 1,
    }),
    infra.ArgumentError,
    "onSuccess"
);

infra.Assert.throwsError(
    () => otus.request({ 
            requestCount: 3, 
            requestMode: "s", 
            onSuccess: 1,
    }),
    infra.ArgumentError,
    "onSuccess"
);

// Модульные тесты. Сервер

infra.Assert.throwsError(
    () => otus.runServer(0),
    infra.ArgumentError,
    "responseIntervalMs"
);

infra.Assert.throwsError(
    () => otus.runServer(1, 1, infra.dummyFunction, infra.dummyFunction),
    infra.ArgumentError,
    "onRequestReceived"
);

infra.Assert.throwsError(
    () => otus.runServer(1, infra.dummyFunction, 1, infra.dummyFunction),
    infra.ArgumentError,
    "onRequestHandled"
);

infra.Assert.throwsError(
    () => otus.runServer(1, infra.dummyFunction, infra.dummyFunction, 1),
    infra.ArgumentError,
    "onServerRun"
);

// Конец

console.log("OK");
process.exit();