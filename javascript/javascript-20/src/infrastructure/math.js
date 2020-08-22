function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomIntExcept(min, max, except) {
    const init = getRandomInt(min, max);
    let result = init;
    while (except.indexOf(result) >= 0) {
        result++;
        if (result > max)
            result = min;
        if (result === init)
            throw new Error('Все доступные числа исчерпаны');
    }
    return result;
}

export function getRandomBoolean() {
    return Math.random() > 0.5
        ? true
        : false;
}

const operationsMap = {
    'addition': '+',
    'subtraction': '-',
    'multiplication': '*',
    'division': '/',
    'exponentiation': '**',
};

function randomOperation(allowedOperations) {
    if (allowedOperations === null || allowedOperations.length === 0)
        throw new Error('The are no available operations.');
    const index = getRandomInt(0, allowedOperations.length - 1);
    const result = operationsMap[allowedOperations[index]];
    return result;
}

function tryInventTask(allowedOperations, difficulty) {
    const operands = [];
    const operators = [];
    for (let i = 0; i <= difficulty; i++) {
        operands.push(Math.floor(Math.random() * 10) + 1);
    }
    for (let i = 0; i < difficulty; i++) {
        operators.push(randomOperation(allowedOperations));
    }
    let question = '' + operands[0];
    for (let i = 0; i < difficulty; i++) {
        question += ' ' + operators[i] + ' ' + operands[i + 1];
    }
    const answer = (new Function(`return ${question};`))();
    return {
        operands,
        operators,
        question,
        answer,
    };
}

export function inventTask(allowedOperations, difficulty) {
    for (let i = 0; i < 10; i++) {
        const result = tryInventTask(allowedOperations, difficulty);
        if (!Number.isNaN(result.answer) && Number.isFinite(result.answer))
            return result;
    }
    throw new Error('Не получается придумать задание. Попробуйте уменьшить сложность.');
}

export function getKnownIndices(chunksCount) {
    if (chunksCount < 2)
        throw new Error('Нужно как минимум 2 операнда.');
    const state = [];
    for (let i = 0; i < chunksCount; i++) {
        state.push(null);
    }
    const defined = [];
    let idx = 0;
    
    idx = getRandomIntExcept(0, chunksCount - 1, defined);
    state[idx] = true;
    defined.push(idx);

    idx = getRandomIntExcept(0, chunksCount - 1, defined);
    state[idx] = false;
    defined.push(idx);

    for (let i = 0; i < chunksCount; i++) {
        if (state[i] !== null)
            continue;
        state[i] = getRandomBoolean();
    }

    return state;
}