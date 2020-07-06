
# Домашняя работа для `Занятие "GraphQL Server"`

## Условия

На выбор одна из следующих задач:

---

Часть 1.
Написать схему GraphQL для примера веб-приложения e-commerce shop:
до 3 балла - какие сущности (минимум 3, можно больше), какие у них поля, какие обязательные какие нет
до 4 баллов - какие запросы/мутации понадобятся (минимум 4, можно больше)

Часть 2.
до 5 баллов - развернуть локально graphQL + nodejs или воспользоваться одним из веб демо (graphqlbin), перенести полностью или частично написанную в Части 1 схему.
Результатом работы будет ссылка на онлайн демо или репозиторий.

---

// ИЛИ

Написать `NodeJS Rest API` приложение для сохранения `RSS` рассылок.
В приложении должно быть следующие точки доступа
- Создание рассылки по `URL`. При успешном добавлении приложение будет запрашивать `RSS` рассылку, парсить `XML` и сохранять документы в базу данных.
- Показ списка всех добавленных `URL` рассылок.
- Показ всех сохраненных из `RSS` документов.

Приложение должно содержать тесты для всех точек доступа. 

## Реализация (задача по GraphQL)

Чтобы подготовить репозиторий:

```
npm i
```

Чтобы запустить интеграционные тесты:

```
npm test
```

Пример ожидаемого вывода в консоли:

```
  console.log
    Running a GraphQL API server at http://localhost:4000/graphql

      at Object.<anonymous> (server.js:144:9)

PASS ./integration.test.js
  GraphQL server
    √ returns a cart with empty products collection (111 ms)
    √ modifies a cart contnet (17 ms)

Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        7.766 s
Ran all test suites.
```

Чтобы запустить сервер GraphQL для тестирования вручную:

```
node server
```

Пример ожидаемого вывода в консоли:

```
Running a GraphQL API server at http://localhost:4000/graphql
```

После этого в интернет-обозреветеле можно открыть страницу http://localhost:4000/graphql и выполнять запросы GraphQL. Далее приведён примерный план проверки.

Шаг | Запрос | Ожидаемый ответ
--- | --- | ---
Посмотреть на корзину (корзина должна быть пуста) | `query { cart(id: 1) { products { product { id } } } }` | `{ "data": { "cart": { "products": [] } } }`
Посмотреть на товар (у товара не должно быть отзывов) | `query { product(id: 101) { name price { rubles kopeks } state reviews { rating comment } } }` | `{ "data": { "product": { "name": "Medicine mask", "price": { "rubles": 99, "kopeks": 50 }, "state": "SOLDOUT", "reviews": [] } } }`
Добавить отзыв к товару (у товара должен появиться отзыв) | `mutation { addReview(productId: 101, comment: "Why sold out!?", rating: 1) }` | `{ "data": { "addReview": "1" } }`
Проверить, что отзыв добавлен (у товара должен быть один отзыв) | `query { product(id: 101) { reviews { rating comment } } }` | `{ "data": { "product": { "reviews": [ { "rating": 1, "comment": "Why sold out!?" } ] } } }`
Попробовать добавить в корзину распроданный товар (это действие не должно ничего изменить) | `mutation { addToCart(cartId: 1, productId: 101) }` | `{ "data": { "addToCart": false } }`
Добавить в корзину доступный товар (товар должен оказаться в корзине) | `mutation { addToCart(cartId: 1, productId: 102) }` | `{ "data": { "addToCart": true } }`
Попробовать установить отрицательное количество покупаемого товара (это действие не должно ничего изменить) | `mutation { setProductQuantityInCart(cartId: 1, productId: 102, quantity: -10) }` | `{ "data": { "setProductQuantityInCart": false } }`
Установить (положительное) количество покупаемого товара (в корзине должно поменяться количество товара) | `mutation { setProductQuantityInCart(cartId: 1, productId: 102, quantity: 10) }` | `{ "data": { "setProductQuantityInCart": true } }`
Проверить количество товара в корзине (корзина должна содержать изменённое количество единственного товара) | `query { cart(id: 1) { products { product { id } quantity} } }` | `{ "data": { "cart": { "products": [ { "product": { "id": "102" }, "quantity": 10 } ] } } }`
Установить нулевое количество покупаемого товара и удалить его из корзины (корзина должна стать пустой) | `mutation { setProductQuantityInCart(cartId: 1, productId: 102, quantity: 0) }` | `{ "data": { "setProductQuantityInCart": true } }`
Проверить количество товара в корзине (корзина должна быть пуста) | `query { cart(id: 1) { products { product { id } quantity} } }` | `{ "data": { "cart": { "products": [] } } }`
