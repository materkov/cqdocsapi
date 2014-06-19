# Ошибки

Ответы будут содержать правильные стандартные HTTP-коды:

> Примеры ошибочных ответов:

```json
{
  "data": {},
  "meta": {
    "status": 403,
    "error": "AuthenticationFailed",
    "error_message": "Invalid auth_token"
  }
}
```

```json
{
  "data": {},
  "meta": {
    "status": 400,
    "error_fields": {
      "type": [
        "This field is required."
      ],
      "html": [
        "This field is required."
      ]
    },
    "error": "BadRequest",
    "error_message": "The request could not be understood by the server due to malformed syntax"
  }
}
```



Код | Описание
---------- | -------
400 | Bad Request -- Неверные запрос (пустые или неправильные аргументы)
403 | Forbidden -- Нет доступа к данному методу
404 | Not Found -- Метода не существует
405 | Method Not Allowed -- Не разрешенный метод (например, POST вместо GET)
500, 502, 503, 504 | Internal Server Error -- Что то не так с сервером

В случае ошибки, объект `data` будет пуст, а в объекте `meta` будут содержаться поля:

Название | Описание
---      | ---
status   | HTTP-код
error    | Название ошибки
error_message | Детальное описание ошибки
error_fields | В случае, если ошибка BadRequest, здесь будет содержаться информация об ошибках в параметрах


Название ошибки (`error`) специфично для каждого метода, однако, имеются 
некоторые ошибки, которые есть везде:

Название | Описание
---      | ---
BadRequest | Неправильные или отсутствующие параметры
AuthenticationFailed | Отсутствующий, неверный или отозванный auth_token
InvalidAuthType | auth_token верный, но его нельзя использовать в методе
MethodNotAllowed | Неправильный HTTP-метод



# Автопараметры
В некоторых случаях, когда нужно передать в качестве аргумента ID пользователя или ID приложения,
можно использовать сокращения - $self_user и $self_app соответственно.
Если auth_token связан с приложением или пользователем, то эти параметры будут заменены на ID 
"текущего"" пользователя и приложения соответственно
