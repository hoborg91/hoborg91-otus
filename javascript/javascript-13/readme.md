# Домашнее задание к занятиям №12 и №13 (Node - Modules, EventLoop, Timers)

## Условия

tree - вывод списка файлов и папок файловой системы
Напишите `NodeJS` скрипт `tree` для вывода списка файлов и папок файловой системы.
Результатом работы должен быть объект с массивами `{ files, folders }`.
Вызовы файловой системы должны быть асинхронными.
Скрипт принимает входной параметр - путь до папки.
Добавить возможность выполнять этот скрипт через команду `npm run tree -- path`

Пример

```
foo/
├── bar/
│├── bar1.txt
│├── bar2.txt
│└── baz/
├── f1.txt
└── f2.txt
```

При вызове с путем `foo/` скрипт должен вернуть структуру:

```json
{
"files": [
"foo/f1.txt",
"foo/f2.txt",
"foo/bar/bar1.txt",
"foo/bar/bar2.txt"
],
"dirs": [
"foo",
"foo/bar",
"foo/bar/baz"
]
}
``` 

## Реализация

Перед запуском надо восстановить пакеты:

```
npm i
```

### Запуск вручную

```
node script foo/
```

Ожидаемый результат:

```
foo/f1.txt
foo/f2.txt
foo/bar/bar1.txt
foo/bar/bar2.txt
---
foo/
foo/bar
foo/bar/barz
```

В разных операционных системах могут использоваться разные разделители пути: прямая или обратная косая черта.

### Запуск через команду npm

```
npm run tree foo/
```

Ожидаемый результат совпадает с указанным выше.

### Запуск тестов

```
npm run test
```

Пример ожидаемого результата:
```
PASS ./tree.unit.test.js
PASS ./tree.integration.test.js
Test Suites: 2 passed, 2 total
Tests:       6 passed, 6 total
Ran all test suites.
```
