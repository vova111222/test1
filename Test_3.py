products = {
    "apple": {
        "price": 10,
        "amount": 125
    },
    "milk": {
        "price": 100,
        "amount": 10
    },
    "banana": {
        "price": 5,
        "amount": 67
    },
    "eg": {
        "price": 5,
        "amount": 1250
    },
}


print('Добро пожаловать в магазин, что вы хотите купить?')
user_want = str(input("Введите товар: "))

while True:
    if user_want in products.keys(): # есть ли товар в магазине
        print("Такой товар есть, подождите секунду, ведутся расчёты.")
        msg_for_user = "Сколько вы хотите товара " + "'" + user_want + "':"
        amount = int(input(msg_for_user)) # сколько пользователь хочет купить
        if amount <= products[user_want]['amount']: # проверка есть ли в нужном кол-ве на складе
            cost = products[user_want]['price'] * amount # вычисляем стоимость покупки
            products[user_want]['amount'] = products[user_want]['amount'] - amount # обновляем остаток на складе
            print('Цена за покупку данного товара: ', cost)
        else: # если товара нет на складе в нужном кол-ве
            print('Товара в таком количестве нет на складе.')
            print('Имеется ' + user_want + ':' + str(products[user_want]['amount']))
        user_want = str(input("Введите товар: "))

    elif user_want == 'Уйти': # если пользователь хочет уйти
        break
    elif user_want == '' or user_want == ' ':
        print('Введите корректное название')
        user_want = str(input("Введите товар: "))
    else: # остаточная логика
        print("Такого товара нет, может хотите другой?")
        user_want = str(input("Введите товар: "))
