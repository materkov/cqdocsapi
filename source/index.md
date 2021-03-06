---
title: CarrotQuest API Reference

language_tabs:
  - shell

toc_footers:
  - <a href='http://github.com/tripit/slate'>Documentation Powered by Slate</a>

includes:
  - errors
  - auth
  - apps
  - events

search: true
---

# Введение

Это описание API CarrotQuest

> API enpoint:

```
http://api.carrotquest.io/v1
```

# Формат данных

Все ответы отдаются в JSON. Других форматов нет и в ближайшее времени не предвидится. Каждый ответ заключен в "конверт".

> Конверт

```json
{
  "meta": {
    "status": 200
  },
  "data": {
    
  }
}
```


Есть два обязательных объекта, присутсвующих в каждом ответе: `data` и `meta`. Блок `meta` содержит метаданные об ответе. Поле `status` совпадает с HTTP кодом возврата. Блок `data` содержит сам ответ.

# Стиль

API сделан в объектно-ориентированном стиле. Будем очень сильно стараться соотвествовать канонам [REST API](http://ru.wikipedia.org/wiki/REST).

Все, что начинается с символа $ - систмное имя.

Все параметры к запросам - необязательные, если явно не указано обратное.

Стиль именования переменных - under_score (стандартный для python)


# Ключи

У каждого приложения (app) есть **ID** (идентификатор, положительно число), 
**API Key** (публичный ключ, может появляться в javascript коде), **API Secret**
(приватный ключ, его необходимо хранить в секрете, использовать его можно только с 
серверной стороны, то есть в javascript-коде он ни в коем млучае не должен появляться)


# Авторизация
Для того, чтобы общаться с API, необходима авторизация, чтобы знать, от чьего имени происходит запрос. Каждый запрос должен включать GET-параметр auth_token. Поддерживаются 4 типа тукенов:


auth_token | Где используется
---------- | ----------------
user.userid.apikey.token | Клиентский JS код на стороне приложения, но без сессии
session.js.userid.apikey | Клиентский JS код на стороне приложения (**УСТАРЕЛ!**)
app.apikey.apisecret | Серверный код на стороне приложения
account.userid.token | Личный кабинет пользователя
panel.userid.token | Панель администратора
global.userid.token | Глобальный тукен, который ложиться в куку `carrotquest_auth_token_global` на домене .carrotquest.io (хорошо, если браузер юзера сохранит эту куку - тогда можно организовать тотальную слежку). Использовать напрямую его нельзя.
superuser.XXX | *TODO*
oauth.oauth | *TODO*

Если в auth_token несколько "компонентов", они разделены символом точки. apikey, apisecret, userid - нужно заменить на реальные данные.

Например, чтобы обратиться к конечной точке `/users/USER_ID/carrots` с серверной стороны, нужно сделать запрос на URL `http://api.carrotquest.io/v1/users/USER_ID/carrots?auth_token=app.XXX.YYY` (здесь apikey=XXX, apisecret=YYY)

