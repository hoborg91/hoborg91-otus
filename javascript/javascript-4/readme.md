## Проверка вручную

Нужно запустить два терминала. В первом терминале запустить сервер:
```
node server
```
Из второго терминала отправить сначала несколько последовательных запросов:
```
node request 4 s
```
...а потом несколько параллельных запросов:
```
node request 4 p
```
Ожидается, что терминал с сервером покажет 8 пришедших и обработанных запросов. 
Первые 4 запроса будут обрабатываться сразу, как только прийдут. 
Оставшиеся 4 запроса сначала прийдут на сервер, а потом обработаются все сразу. 
Терминал с запросами должен показать ответы сервера с сотоянием `200` и ответом "Hello, world!".

## Проверка тестами

Запустить модульные тесты:
```
node tests.unit
```
Запустить интеграционные тесты:
```
node tests.integration
```
Ожидается, что после обоих запусков в консоль будет выведено слово "OK".