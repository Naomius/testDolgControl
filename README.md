# TestDolgControl

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.0.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

- Стили для login/signup общие. Из за этого вынес отдельно.
- Передача и вывод book, варианты были разные(не знаю какой именно нужно было показать): 
1-й Был через state, 
2-й Текущий вариант, через хранение в сервисе,
3-й через localStore можно было бы так же,
4-й Если бы делал запрос на бек, то естественно передавал бы id, получал его через activateRoute.params и сразу прогонял бы к примеру через switchMap.



