# Apps
## Объект App

<span class="object-example"></span>

```json
{
  "data": {
    "app": {
      "id": 2,
      "name": "Test shop2",
      "origin": "http://localhost:8080",
      "api_key": "e6rF5TPZhrWXETArwwXWFJ20b6rOxQHf",
      "admins": [
        1,
        2
      ]
    }
  },
  "meta": {
    "status": 200
  }
}
```


Название | Описание
--- | ---
id | ID
name | Имя приложения. Должно быть уникальным.
origin | Адрес приложения
api_key | API Key
admins | Массив, ID пользователей, которым разрешен доступ к панели администратора этого рпиложения

## Объект App (расширенный)

<span class="object-example"></span>

```json
{
  "data": {
    "app": {
      "id": 2,
      "name": "Test shop2",
      "origin": "http://example.com",
      "api_key": "e6rF5TPZhrWX2TArwvXWFJ20b6r3xQHf",
      "api_secret": "lvM9T5pm14WGOzvYyHc5ZCMtwss7apZ4H9i2LNeoyw3KbI6J5BcHlhDfCpeIpBN8",
      "admins": [
        1,
        2
      ],
      "settings": {
        "max_discount": "0.05",
        "converted_percent": "0.3",
        "bonus": true,
        "bonus_account": "",
        "bonus_landing": "http://example.com/"
      }
    }
  },
  "meta": {
    "status": 200
  }
}
```

Название | Описание
--- | ---
id | ID
name | Имя приложения. Должно быть уникальным.
origin | Адрес приложения
api_key | API Key
api_secret | API Secret
admins | Массив, ID пользователей, которым разрешен доступ к панели администратора этого рпиложения
settings.max_discount | Максимальный процент скидки
settings.converted_percent | Процент от цены, который конвертируется в морковки
settings.bonus | Включена ли бонусная система
settings.bonus_landing | Стрнаица, на которую ведут реккомендации



## Получить информацию о приложении
```
GET http://api.carrotquest.io/v1/apps/{APP_ID}
```

```shell
curl "http://api.carrotquest.io/v1/apps/5?auth_token=XXX"
```

```json
{
  "meta": {
    "status": 200
  },
  "data": {
    "app": {
      "id": 5,
      "name": "EcoDom",
      "origin": "http://www.ecodomshop.ru",
      "api_key": "9aZIEqDHAjhMi0wHoD8udndOyJSFGZkg",
      "admins": [
        273,
        147
      ]
    }
  }
}
```

Выдает базовую, общедоступную информацию о приложении.


### Возаращаемое значение
Возвращает [базовый объект App](#Объект-app)


## Получить расширенную информацию о приложении
```
GET http://api.carrotquest.io/v1/apps/{APP_ID}/extendedinfo
```

```shell
curl "http://api.carrotquest.io/v1/apps/5/extendedinfo?auth_token=XXX"
```

```json
{
  "data": {
    "app": {
      "id": 2,
      "name": "Test shop2",
      "origin": "http://localhost:8080",
      "api_key": "e6rF5TPchrWXE5ArwwXWFJ20b6rOxQHf",
      "api_secret": "lvM9T5pm14WGvzvYyHm5ZCjtwss7apZ4W9i1LNeoywwKbI6J5BcHdhDfCpeIpBN8",
      "admins": [
        1,
        2
      ],
      "settings": {
        "max_discount": "0.05",
        "converted_percent": "0.3",
        "bonus": true,
        "bonus_account": "",
        "bonus_landing": "http://localhost:8080/"
      }
    }
  },
  "meta": {
    "status": 200
  }
}
```

Выдает расширенную информацию о приложении.


### Возаращаемое значение
Возвращает [расширенный объект App](#Объект-app-(расширенный))




## Создать приложение
```
POST http://api.carrotquest.io/v1/apps
```

```shell
curl "http://api.carrotquest.io/v1/apps?auth_token=XXX" \
  -d "name=My super app"
  -d "origin=http://mydomain.ru"
```

```json
{
  "data": {
    "app": {
      "id": 2,
      "name": "Test shop2",
      "origin": "http://localhost:8080",
      "api_key": "e6rF5TPchrWXE5ArwwXWFJ20b6rOxQHf",
      "admins": [
        3
      ]
    }
  },
  "meta": {
    "status": 200
  }
}
```

Создает новое приложение

### Параметры
Название | Описание
--- | ---
name | **обязательный** Название приложения
origin | Адрес приложения


### Возаращаемое значение
Если приложение создано успешно, возвращает [базовый объект App](#Объект-app).

Если имя не уникально, возвращатся ошибка `AppNameDuplicate` (статус 400)



## Обновить приложение
```
PUT http://api.carrotquest.io/v1/apps/{APP_ID}
```

```shell
curl "http://api.carrotquest.io/v1/apps/5?auth_token=XXX&name=MySuperApp"
  -X PUT
  -d origin=http://example.com
  -d "name=My name"
  -d converted_percent=0.05
  -d max_discount=0.10
  -d bonus=true
  -d "bonus_landing=http://example.com/some_page.php"
```

```json
{
  "data": {
  },
  "meta": {
    "status": 200
  }
}
```

Обновляет информацию о приложении

### Параметры
Название | Описание
--- | ---
name | **обязательный** Название приложения
origin | **обязательный** Адрес приложения
max_discount | **обязательный** Максимальный процент скидки
converted_percent | **обязательный** Процент от цены, который конвертируется в морковки
bonus | **обязательный** Включена ли бонусная система
bonus_landing | **обязательный** Стрнаица, на которую ведут реккомендации




## Проверить занятость имени
```
GET http://api.carrotquest.io/v1/apps/checknameavailable
```

```shell
curl "http://api.carrotquest.io/v1/apps/checknameavailable?auth_token=XXX&name=MySuperApp"
```

```json
{
  "data": {
    "available": true
  },
  "meta": {
    "status": 200
  }
}
```

Проверяет, доступно ли имя для приложение (имена должны быть уникальными)

### Параметры
Название | Описание
--- | ---
name | **обязательный** Название приложения


### Возаращаемое значение
Если имя доступно, то перемнная `available` будет иметь значение `true`; иначе - `false`
