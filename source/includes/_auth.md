# Auth
## Авторизоваться из JS на сайте приложения

```
POST http://api.carrotquest.io/v1/auth/jsconnect?auth_token=XXX
```

```shell
curl "http://api.carrotquest.io/v1/auth/jsconnect?auth_token=XXX" \
  -d "app_key=6-a832b29f610bc27d9e9a11249c6192"
```

```json
{
  "meta": {
    "status": 200
  },
  "data": {
    "authToken": "user.3138.IHBp4Gyaa1an5UbazcZ2J1PHvtZzu6Rg.aa042afad15bf0dbfbb33d5214193369954523dfd5f97e05",
    "user": {
      "type": "full",
      "hasAvatar": true,
      "name": "Maks Materkov",
      "id": 3138,
      "carrots": 0
    },
    "app": {
      "settings": {
        "bonus": false
      },
      "id": 3
    }
  }
}
```

Функции может быть передан действительный тукен (типа `user.XXX`), но может быть пустым. На сайте клиента тукен сохраняется в куке `carrotquest_auth_token`, ***на домене клиента (!)***. Наша JS библиотека при каждой загрузке странице будет смотреть, есть ли уже сохраненный тукен в куках.

В любом случае, функция возвращает authToken, который каждый раз заново устанавливается в куки. Возвращаемый тукен будет тем же самым (чаще всего), но может и быть другим, Например, если сначала юзер зашел на сайт клиента (выдан тукен), затем зарегался в бонусной системе (при этом установился глобальный тукен) и после этого снова вернулся на сайт. Теперь есть старый тукен (в куках на стороне клиента) и установлен глобальный (в куках на нашей стороне). В этом случае будет возвращен новый тукен, т.к. ID пользователя при регистрации изменился.

### Параметры
Название | Описание
--- | ---
app_key | API Key





## Установить глобальный тукен
```
GET http://api.carrotquest.io/v1/auth/trackglobal
```

```shell
curl "http://api.carrotquest.io/v1/auth/trackglobal?auth_token=XXX"
```

```json
{
  "meta": {
    "status": 200
  },
  "data": {
  }
}
```

Эта функция принимает auth_token и устанавливает куку `carrotquest_auth_token_global` (см. описание типов тукенов выше)

Вопрос - зачем нужен глобальные и "локальные" тукены? Оказалось, что некоторые браузеры (Сафари) не позволяют ставить куки на домены тех сайтов, которые пользователь ни разу не посещал. То есть, например, человек захдит на сайт www.ecodomshop.ru и наша система попытается установить куку, но на домене .carrotquest.io. Этот гадкий браузер не даст этого сделать! Пэтому такая морока с авторизацией и такое разнообразие типов авторизации.




## Войти в личный кабинет
```
POST http://api.carrotquest.io/v1/auth/accountlogin
```

```shell
curl "http://api.carrotquest.io/v1/auth/accountlogin" \
  -d "email=my@email.com" \
  -d "password=1234"
```

```json
{
  "meta": {
    "status": 200
  },
  "data": {
  	"authToken": "account.123.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  }
}
```

Вход в личный кабинет. Если вход успешен, в ответе будет содержаться authToken, который нужно использовать для общения с API в личном кабинете юзера (тукен типа `account.XXX`).

Если неправильные емейл/пароль, будет ответ 400 с ошибкой `InvalidCredentials`.

### Параметры
Название | Описание
--- | ---
email | Email
password | Password






## Зарегистрироваться в бонусной системе
```
POST http://api.carrotquest.io/v1/auth/accountregister
```

Попытка регистрации пользователя в бонусной системе. Параметр - email. Если такого емейла нет, то он регистрируется (пароль высылается на почту). Если регистрация успешна, в ответе будет содержаться authToken для работы в личном кабинете (тукен типа `account.XXX`)





## Войти в панель администратора
```
POST http://api.carrotquest.io/v1/auth/panellogin
```

```shell
curl "http://api.carrotquest.io/v1/auth/panellogin?auth_token=XXX" \
  -d "email=my@email.com" \
  -d "password=1234"
```

```json
{
  "meta": {
    "status": 200
  },
  "data": {
  	"authToken": "panel.123.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  }
}
```

Вход в панель администратора. Если вход успешен, в ответе будет содержаться authToken, который нужно использовать для общения с API в панели администратора (тукен типа `panel.XXX`)

Если неправильные емейл/пароль, будет ответ 400 с ошибкой `InvalidCredentials`.

### Параметры
Название | Описание
--- | ---
email | Email
password | Password

### Возвращаемое значение
Возвращает authToken







## Проверить тукен
```
GET http://api.carrotquest.io/v1/auth/checktoken
```

```shell
curl "http://api.carrotquest.io/v1/auth/checktoken?auth_token=XXX"
```

```json
{
  "data": {
    "type": "panel",
    "created": 1402976580,
    "user": 2,
    "app": null,
    "authToken": "panel.2.723b2f823d427a10adc79a02117d2d8eff6cb164ec2e8619"
  },
  "meta": {
    "status": 200
  }
}
```

Выдает описание тукена


### Вовзращаемое значение

Возвращает информацию о переданном тукене