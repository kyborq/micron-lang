# Calculang

Тестовое задание на JavaScript разработчика.

## Установка

### 1. Склонируйте репозиторий

```
git clone https://github.com/kyborq/micro-lang.git
```

### 2. Перейдите в каталог с проектом

```
cd micro-lang
```

### 3. Установите пакеты

```
npm install
```

### 4. Запускайте!

```
npm start
```

## Синтаксис

### Переменные

#### VAR

VAR объявляет переменную со значением NaN

```
var a
```

#### LET

LET объявляет переменную с переданным значением или обновляет существующую

```
let b = 15
```

```
var a
let a = 15
```

### Функции

#### FN

FN создает функцию с выражением. Выражение вычисляемое. Если в выражении изменится переменная то и значение функции тоже изменится

```
let a = 5
let b = 15
fn sumAB = a + b
```

### Команды печати

#### PRINT

PRINT используется для вывода идентификатора (функции или переменной) в консоль

```
let a = 15
print a
```

#### PRINTVARS

PRINTVARS используется для вывода всех переменных в консоль

```
let a = 15
let b = 35
printvars
```

#### PRINTFNS

PRINTFNS используется для вывода всех функций в консоль

```
let year = 2022
let born = 2002
fn age = year - born
printfns
```

## Тестовые образцы для ввода в консоль

### 1. Объявление, присваивание и вывод значений переменных

```
var x
print x
let x = 42
print x
let x = 1.234
print x
let y = x 
let x = 99 
printvars
```

### 2. Объявление функций

```
var x
var y
fn XPlusY=x+y
print XPlusY
let x=3
let y=4
print XPlusY
let x=10
print XPlusY
let z=3.5
fn XPlusYDivZ=XPlusY/z
printfns
```

### 3. Различия между fn и let

```
let v=42
let variable=v 
fn function=v 
let v=43
print variable
print function
```

### 4. Вычисление площади круга

```
var radius
let pi=3.14159265
fn radiusSquared=radius*radius
fn circleArea=pi*radiusSquared
let radius=10
print circleArea
let circle10Area=circleArea
let radius=20
let circle20Area=circleArea
printfns
printvars
```

### 5.  Вычисление последовательности Фибоначчи

```
let v0=0
let v1=1
fn fib0=v0
fn fib1=v1
fn fib2=fib1+fib0
fn fib3=fib2+fib1
fn fib4=fib3+fib2
fn fib5=fib4+fib3
fn fib6=fib5+fib4
printfns
let v0=1
let v1=1
printfns
```

### 6. Еще больше чисел Фибоначчи

```
let v0=0
let v1=1
fn fib0=v0
fn fib1=v1
fn fib2=fib1+fib0
fn fib3=fib2+fib1
fn fib4=fib3+fib2
fn fib5=fib4+fib3
fn fib6=fib5+fib4
fn fib7=fib6+fib5
fn fib8=fib7+fib6
fn fib9=fib8+fib7
fn fib10=fib9+fib8
fn fib11=fib10+fib9
fn fib12=fib11+fib10
fn fib13=fib12+fib11
fn fib14=fib13+fib12
fn fib15=fib14+fib13
fn fib16=fib15+fib14
fn fib17=fib16+fib15
fn fib18=fib17+fib16
fn fib19=fib18+fib17
fn fib20=fib19+fib18
fn fib21=fib20+fib19
fn fib22=fib21+fib20
fn fib23=fib22+fib21
fn fib24=fib23+fib22
fn fib25=fib24+fib23
fn fib26=fib25+fib24
fn fib27=fib26+fib25
fn fib28=fib27+fib26
fn fib29=fib28+fib27
fn fib30=fib29+fib28
fn fib31=fib30+fib29
fn fib32=fib31+fib30
fn fib33=fib32+fib31
fn fib34=fib33+fib32
fn fib35=fib34+fib33
fn fib36=fib35+fib34
fn fib37=fib36+fib35
fn fib38=fib37+fib36
fn fib39=fib38+fib37
fn fib40=fib39+fib38
printfns
```
