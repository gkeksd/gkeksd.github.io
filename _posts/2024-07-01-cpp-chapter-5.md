---
author_profile: true
layout: single
date: '2024-07-01 18:35:45 +0900'
categories:
  - cpp
comments: true
sidebar:
  nav: "main"
toc: true # 우측에 본문 목차 네비게이션 생성
title: "객체지향 프로그래밍 - 포르잔 c++ 바이블: 5장"
---
교재: 포르잔 C++ 바이블

## 증감 연산자
++(증가 연산자)와 --(감소 연산자)는 피연산자의 값을 1만큼 증가시키거나 감소시키는 연산자로, 피연산자의 앞에 오느냐 뒤에 오느냐에 따라 전위 증감 연산자/후위 증감 연산자로 나뉜다.
 * Lvalue: 수정할 수 있는 객체로, 변수나 리스트와 같이 값을 수정할 수 있는 객체들이 이에 해당한다. 대입연산자(=) 왼쪽과 오른쪽 모두 사용할 수 있는 객체로, 이 객체는 표현식이 한번 끝난 이후에도 계속 존속한다.
 * Rvalue: 수정할 수 없는 리터럴 객체로, 16이나 5와 같이 수정이 불가능한 객체가 이에 해당한다. 대입 연산자(=)의 오른쪽에만 사용할 수 있다. 즉 Lvalue = Rvalue 식으로만 사용 가능하다. Rvalue는 표현식이 종료된 이후에는 사라져 버린다.

![화면 캡처 2024-07-01 184654](https://github.com/gkeksd/codding-archive/assets/54362230/192cbad6-986a-400c-9f28-52d08e7ce33b)
1. 전위 증감 연산자: 피연산자 앞에 ++/--가 나오는 연산자이다. 피연산자는 Lvalue이며, 연산 결과 또한 Lvalue여야 한다. 이 연산자는 피연산자의 값을 1 증가/감소시킨 후 피연산자를 리턴한다. 즉 변수 a가 16일 때 ++a는 a를 1 증가시킨 17을 리턴한다.
![화면 캡처 2024-07-01 184758](https://github.com/gkeksd/codding-archive/assets/54362230/1b408a53-f805-48b5-84c3-becf826df085)
2. 후위 증감 연산자: 피연산자 뒤에 ++/--가 나오는 연산자이다. 피연산자는 앞과 마찬가지로 Lvalue이지만, 연산 결과는 값으로 나타내어지기에 Rvalue이다. 이 연산자는 피연산자를 먼저 리턴한 후 값을 1 증가시킨다. 즉 변수 a가 16일때 a++는 16을 리턴한 후 a의 값을 17로 증가시킨다. 

## 리스트 초기화(List Initialization)
변수를 선언할 때 int a = 5;와 같은 방법 이외에도 ()나 {}를 이용해 다양하게 초기화할 수 있다. 이러한 초기화는 double 값을 int 변수에 초기화시키는 등의 축소 변환(narrowing conversion)이 일어날 때 발생할 수 있는 데이터 손실을 예방할 수 있다.
```cpp
unsigned int a = 5;
unsigned int a(5);
unsigned int a = { 5 };
unsigned int a{5};
```

그러나 모든 타입의 자료형에서 이 방식이 모두 허용되는 것은 아니다. 예를 들어 부호가 없는 정수(int) 자료형에서는 위의 두 개는 허용되지만, {}를 이용한 밑의 두 방법은 허용되지 않는다. 즉
```cpp
int x = 5.16; //x: 5
int x(5.16); //x: 5
```
이 두 방법은 사용할 수 있지만,
```cpp
int x = {5.16};
int x{5.16};
```
이 두 방법은 사용할 수 없다.

## 반복문(Loop 또는 Iteration)
반복문이랑 특정한 부분의 코드가 반복적으로 시행될 수 있도록 하는 구문을 말한다. C++의 반복문은 크게 조건을 먼저 확인하느냐 나중에 확인하느냐에 따라, 또 반복하는 방식에 따라 구분될 수 있다.

### While 문
![화면 캡처 2024-07-01 185251](https://github.com/gkeksd/codding-archive/assets/54362230/83fde718-7c45-4b11-836f-bf58739a742f)
while 문은 if 문처럼 문장 내부 조건을 두고 이 조건이 참일 시 반복을 실행하는 구문이다. 한번 반복이 시행되면 다시 처음으로 돌아가 조건이 맞는지 검사한 후 똑같은 과정을 계속 반복하며, 조건이 거짓이 되면 그 때에 반복을 시행하지 않고 다음으로 넘어간다. 반복할 문장이 하나라면 중괄호를 생략해도 무방하지만, 두 개 이상일 때에는 중괄호를 반드시 쳐 주어야 한다.

#### 카운터-제어 while 문
![화면 캡처 2024-07-01 185609](https://github.com/gkeksd/codding-archive/assets/54362230/d6e4ee49-6fa6-4317-8314-75c68d510d89)
반복 횟수를 알고 있고 그 횟수만큼 반복해야 할 때 사용하는 while 문을 카운터 제어 while 문이라고 한다. 반복 숫자를 세기 위해 숫자 카운트 대상이 되는 변수를 미리 반복문 전에 초기화해야 한다. 정해놓은 대로 조건이 거짓이 되었을 때 반복문을 탈출할 수 있도록 반복문 내부에서 카운트를 세는 구문을 삽입한다.

다음은 카운터 제어 while 문을 사용한 전형적인 예제이다.
```cpp
#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    int score;
    int sum = 0;
    double average;

    int counter = 0; //반복문 전에 카운트 변수 초기화
    while (counter < 4) {
        cout << "점수를 하나 입력하세요(0~100의 범위): ";
        cin >> score;
        sum += score;
        counter ++; //카운터 변수 증가시킴
    }

    average = static_cast<double>(sum) / 4;
    cout << fixed << setprecision(2);
    cout << "평균 점수 = " << average;
}
```

#### 이벤트 제어 while 문
![화면 캡처 2024-07-01 190837](https://github.com/gkeksd/codding-archive/assets/54362230/6b2d31ea-481e-4d9b-9103-94ae8c44ebf9)
이벤트 제어 while 문이란, 이전처럼 정해진 규칙에 따라 정해진 값에서 반복문을 탈출하도록 하는 것이 아닌, 특정한 상황(Event)이 발생했을 때 반복을 종료하도록 while 문을 설계하는 것이다. 센티널(sentinel) 제어, EOF 제어, flag 제어 while 문으로 각각 나뉜다.

##### 센티널 제어 while 문
센티널(sentinel)이란 보초값, 감시값 등으로도 번역되며, num != -1(num이 -1이 아닐 때)의 조건에서 -1처럼 조건이 참인지 거짓인지의 여부를 결정하는 값을 의미한다. 즉 센티널 제어 while 문이란, 이러한 센티널 값을 기준으로 참거짓을 가려 반복을 시행하고, 센티널 값에 해당하는 값이 입력되거나 센티널 값을 기준으로 조건에서 거짓이 되었을 경우 반복을 종료하도록 하는 것이다.

다음은 센티널 제어 while 문을 사용한 전형적인 예제이다.
```cpp
#include <iostream>
using namespace std;

int main() {
    int sum = 0;
    int num;

    cout << "정수를 입력하세요(종료하려면 -1): ";
    cin >> num;

    while (num != -1) {
        sum += num;
        cout << "정수를 입력하세요(종료하려면 -1): ";
        cin >> num;
    }
    cout << endl << "합 = " << sum << endl;
}
```

##### EOF 제어 while 문
EOF(End of File)란 말 그대로 파일의 끝을 의미하며, 컴퓨터 자판에서 ctrl + z나 ctrl + d 등의 키를 통해 EOF를 입력할 수 있다. 이 반복문은 이런 식으로 EOF 값이 입력되었을 경우 while 문을 종료한다. 따라서 while 문의 조건문에 이전과 같은 논리 연산 문장을 집어넣지 않는다. 

다음은 EOF 제어 while 문을 사용한 전형적인 예제이다.
```cpp
#include <iostream>
using namespace std;

int main() {
    int sum = 0;
    int num;

    cout << "첫 번째 숫자를 입력하세요(종료하려면 EOF): ";
    while (cin >> num) { //EOF 제어문이기에 일반적인 조건문이 아니라 반복이 시행될 때마다 시행되는 표현식으로 넣음
        sum += num;
        cout << "다음 숫자를 입력하세요: "; 
    }

    cout << endl << "합 = " << sum << endl;
}
```

##### flag 제어 while 문
flag 제어란 bool 타입의 flag 변수의 참/거짓 여부를 통해 반복을 제어한다. 기본적으로 flag 변수가 참일 때 기준에서 반복문을 짜며, 특정한 조건에서 flag 변수가 거짓이 되게 함으로서 반복문을 탈출한다. 이것을 설정하지 않음으로서 무한 루프 상태로 만들수도 있다.

##### 무한 루프 while 문
항상 참이거나 조건이 거짓이 되지 않도록 설계함으로서 멈추지 않고 계속 반복을 실행하는 while 문이다. 이 역시 반복문 내에서 특정한 조건에서 반복문을 탈출하도록 설정할 수 있다.

### for 문
![화면 캡처 2024-07-01 192702](https://github.com/gkeksd/codding-archive/assets/54362230/58818b39-56b8-4756-b4dc-05d0ab9e8124)
for 문 역시 while 문처럼 반복문이지만, 조건식만을 조건에 넣었던 while 문과는 달리 초기값, 조건식, 변경 연산 모두 또는 일부를 조건에 넣는다. 구조상 for 문은 카운터 제어에, while 문은 이벤트 제어에 조금 더 적합하나, for 문 역시 이벤트 제어에 활용할 수는 있다.

다음은 for 문을 카운터 제어에 활용한 전형적인 예이며, 위의 카운터 제어 while 문의 예제와 동일한 기능을 수행했다.

```cpp
#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    int score;
    int sum = 0;
    double average;

    for (int counter = 0; counter < 4; i++) {
        cout << "점수를 하나 입력하세요(0~100의 범위): ";
        cin >> score;
        sum += score;
    }

    average = static_cast<double>(sum) / 4;
    cout << fixed << setprecision(2);
    cout << "평균 점수 = " << average;
}
```

위의 예제와 같이 카운터 제어에 있어서 for 문이 조금 더 효율적으로 사용할 수 있다.

한편 for 문의 세 조건식을 무조건 써야 하는 것은 아니라서, 조건식을 생략하면 무한 루프로 활용할 수 있다. 무한 루프 for 문은 무한 루프 while 문과 구조는 같으나, 변수를 초기화해 사용해야 할 필요가 있을 때 주로 사용한다.

한편 제어 변수(카운터 변수)가 for 반복문 이전에 초기화된 경우 초기화 표현식을 생략 가능하다. 또 제어 변수의 값 변경이 for 본문에서 이미 계산되었거나 필요하지 않은 경우 표현식을 생략 가능하다. 

한 조건식 내에 쉼표를 사용해 여러 식을 나열하는 것도 가능하다. 즉 for 문 안에서 여러 변수를 초기화해 사용할 수도 있다.

#### 중첩 반복문
for 문 등 반복문 두개를 중첩해 중첩 반복문으로 사용할 수 있다. 외부 반복문이 초기화된 변수의 특정 값에 대해 실행 중일 때 내부 반복문을 모두 실행하고, 이것이 외부 반복문이 모두 실행될때까지 계속 반복한다. 

다음은 for 문을 통해 중첩 반복문을 사용하는 전형적인 예이다.
```cpp
#include <iostream>
using namespace std;

int main() {
    int rows;
    int cols;

    cout << "행의 수를 입력하세요: ";
    cin >> rows;
    cout << "열의 수를 입력하세요: ";
    cin >> cols;

    for (int count1 = 1; count1 <= rows; count1++) {
        for (int count2 = 1; count2 <= cols; count2++)
            cout << "*";
        cout << endl;
    }
}
```

### break/continue 문
switch 문에서 특정 조건일 때 구문을 탈출하거나 다시 시행할 수 있는 break/continue 문을 반복문에서도 사용할 수 있다. 특정 조건에서 break을 사용하면 가장 안쪽의 반복문을 즉시 탈출하며, continue를 사용하면 가장 안쪽의 반복문을 처음부터 다시 시행한다.