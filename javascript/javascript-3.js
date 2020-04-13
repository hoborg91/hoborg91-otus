// Условия

// getPath - поиск уникального селектора
// Написать алгоритм и функцию `getPath()`, находяющую уникальный css-селектор для элемента в документе.
// Уникальный селектор может быть использован `document.querySelector()` и возвращать исходный элемент.

// Так чтобы `document.querySelectorAll()`, вызванный с этим селектором, не должен находить никаких 
// элементов, кроме исходного.

// ```javascript
// $0 // HTMLElement
// getPath($0) // => "body div.someclass ul li:first-child"
// ```

// Реализация

const maxDepth = 100 * 1000;

class CannotConstructSelectorError extends Error {
    constructor(...args) {
        super("Cannot construct a selector. Check that the given element is located inside the BODY tag.", ...args);
    }
}

function getPath(element) {
    if (!(element instanceof HTMLElement))
        throw new ArgumentError("The given element argument must be a HTMLElement.");
    
    let result = "";
    let step = 0;
    function climb(element) {
        if (element.nodeName === "BODY")
            return;
        if (++step > maxDepth)
            throw new CannotConstructSelectorError();
        if (!(element.parentElement instanceof HTMLElement))
            throw new CannotConstructSelectorError();
        
        const elementNaturalIndex = Array.prototype.indexOf.call(element.parentElement.children, element) + 1;
        
        const current = `:nth-child(${elementNaturalIndex})`;
        result = result === ""
            ? current
            : current + " > " + result;
        climb(element.parentElement);
    }
    
    climb(element);
    
    return "body > " + result;
}

// Тесты

// Тесты. Проверка аргументов

Infra.assertThrows(() => getPath(0), ArgumentError, "element");
Infra.assertThrows(() => getPath(document.createElement("div")), CannotConstructSelectorError);

// Тесты. Запускаем алгоритм для всех элементов в body

Array.from(document.querySelectorAll("body *")).forEach(elementToTest => {
    // Вызываем проверяемую функцию
    const result = getPath(elementToTest);
    
    // Проверяем, что результатом доволен querySelector
    const single = document.querySelector(result);
    Infra.assertEqual(elementToTest, single);
    
    // Проверяем, что результатом доволен querySelectorAll
    const all = Array.from(document.querySelectorAll(result));
    Infra.assertEqual(1, all.length);
    Infra.assertEqual(elementToTest, all[0]);
});

// Конец

console.log("OK");
