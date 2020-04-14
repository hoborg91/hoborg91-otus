class ArgumentError extends Error {
    constructor(...args) {
        super(args);
    }
}

class NotSupportedError extends Error {
    constructor(...args) {
        super(args);
    }
}

class AssertError extends Error {
    constructor(...args) {
        super(args);
    }
}

const dummyFunction = () => null;

function checkIsFunction(f, argumentName, customMessage) {
    if (typeof f !== typeof (dummyFunction))
        throw new ArgumentError(customMessage || `The ${argumentName || "given"} argument must be a function.`);
};

class Assert {
    static equal(a, b) {
        if (a !== b)
            throw new AssertError(`Expected: ${a}. Given: ${b}.`);
    }
    
    static throwsError(action, errorClass, errorMessagePart) {
        checkIsFunction(action, "action");
        if (typeof errorClass !== typeof dummyFunction || !(errorClass.prototype instanceof Error))
            throw new ArgumentError("The given errorClass must be a class inheriting the Error class.");
        
        try {
            action();
        } catch(e) {
            if (!(e instanceof errorClass))
                throw new AssertError(`Expected error: ${errorClass}. Catched error: ${e}.`);
            if (errorMessagePart !== undefined && e.message.indexOf(errorMessagePart) < 0)
                throw new AssertError(`Expected error message containing: "${errorMessagePart}". Catched error message: "${e.message}".`);
            return;
        }
        throw new AssertError(`Expected error: ${errorClass}. Catched: nothing.`);
    }
}

Object.defineProperty(Array.prototype, 'any', {
    value: function(test) {
        checkIsFunction(test, "test");
        
        for (let i = 0; i < this.length; i++) {
            if (test(this[i], i, this)) {
                return true;
            }
        }
        return false; 
    }
});

Object.defineProperty(Array.prototype, 'all', {
    value: function(test) {
        checkIsFunction(test, "test");
        
        for (let i = 0; i < this.length; i++) {
            if (!test(this[i], i, this))
                return false;
        }
        return true;
    }
});

module.exports = {
    ArgumentError,
    NotSupportedError,
    dummyFunction,
    checkIsFunction,
    Assert,
}
