---
author_profile: true
layout: single
date: '2025-01-10 14:20:34 +0900'
categories:
  - c++
comments: true
sidebar:
  nav: "main"
toc: true
published: true
title: "모던 C++ 주요 기법 정리"
---
## 1. 숫자 구분자
```cpp
int val = 1000000;
int val_14 = 1'000'000;

EXPECT_TRUE(val == val_14);
```

## 2. 스마트 포인터
```cpp
#include <memory> 
class Widget { 
private: 
    std::unique_ptr<int> data; 
public: 
    widget(const int size) { 
        data = std::make_unique<int>(size); 
    } 
    void do_something() {} 
}; 

void functionUsingWidget() { widget w(1000000); }
// lifetime automatically tied to enclosing scope 
// construct w, including the w.data gadget member w.do_something(); } 
// automatic destruction and deallocation for w and w.data
```

## 3. STL 컨테이너를 위한 vector
```cpp
// Example1 
vector<string> apples; 
apples.push_back("Granny Smith"); 

// Example2 
map<string, string> apple_color; 
... 
apple_color["Granny Smith"] = "Green";
```


## 4. STL 알고리즘
```cpp
auto comp = [](const widget& w1, const widget& w2) { return w1.widget() < w2.widget(); } 
sort( v.begin(), v.end(), comp ); 
auto i = lower_bound( v.begin(), v.end(), comp ); 
// lower_bound는 찾으려는 key 값보다 같거나 큰 값이 처음 나타나는 배열 내 위치를 반환합니다.
```


## 5. auto와 decltype
### (1) auto
```cpp
// auto는 배열을 포인터로, 최상위 const는 무시하고, 참조성을 제거하여 추론
map<int, list<string>>::iterator i = m.begin(); // C-style 
auto i = m.begin(); // modern C++

// auto는 함수 인자로 사용 불가
double Func_11(int a, auto b) {
    return a + b;   
}

// auto는 함수 반환 타입 추론 가능
auto Add1_14(int a, int b) {
     return a + b;
}
int result1 = Add1_14(10, 20); // int로 리턴
```
### (2) decltype
```cpp
//decltype은 괄호 내 객체의 타입 그대로 추론
int a = 0;
const int b = 0;

decltype(a) c_11 = a; // a와 동일한 int로 추론
decltype(b) d_11 = a; // b와 동일한 const int로 추론

// decltype을 함수 인자로 사용 가능
template<typename T, typename U>
 void Func_11(T a, U b, decltype(a + b)* result) { // a + b는 int
     *result = a + b;
}

//추론 표현식이 복잡할 경우 decltype(auto) 사용 가능
int Func(int a, int b) {
    return a + b;
}
decltype(auto) d_14 = Func(10, 20); //추론 방식은 decltype과 동일
decltype(auto) d_14 = {1, 2, 3}; // (X) 컴파일 오류. 중괄호 복사 초기화는 추론하지 못함.

// decltype(auto)로 함수 리턴 타입 추론 가능
decltype(auto) Add3_14(int a, int b) {
     const int result = a + b;

     return result; 
 }
 const int result3 = Add3_14(10, 20); // const int 리턴. 리턴하는 result 타입과 동일
```

## 6. using
```cpp
// C++11 이전
typedef unsigned int uint;
typedef pair<int, string> pis;
typedef double da10[10];
typedef void (*func)(int);

// C++11 이후
using uint = unsigned int;
using pis = pair<int, string>;
using da10 = double[10];
using func = void(*)(int);

// 템플릿 별칭
template<typename T>
using matrix1d = vector<T>;

// 예시 활용
da10 arr {};
matrix1d<float> vec(3);
matrix1d<int> vec(5); // 타입 변환 가능

void my_function(int n) { cout << n << endl; }
func fp = &my_function; 
```

## 7. 범위 기반 반복문
### (1) 일반적인 범위 기반 반복문
```cpp
#include <iostream> 
#include <vector> 

int main() {
    std::vector<int> v {1,2,3}; 

    // C-style 
    for(int i = 0; i < v.size(); ++i) { 
        std::cout << v[i]; 
    }
    
    // Modern C++ 
    for(auto& num : v) { 
        std::cout << num; 
    } 
}
```

### (2) 초기식이 존재하는 범위 기반 반복문
```cpp
int sum{0};

// 초기식으로 v_20 벡터를 초기화 후 범위 기반 반복을 수행
for (std::vector<int> v_20{1, 2, 3}; int val : v_20) {
    sum += val;
}
```


## 8. 매크로 대신 constexpr 사용
```cpp
// C-style
#define SIZE 10 
// modern C++
constexpr int size = 10;
```


## 9. {}를 이용한 일관된 초기화
```cpp
#include <vector> 
struct S { 
    std::string name; 
    float num; 
    S(std::string s, float f) : name(s), num(f) {} 
}; 

int main() { 
    // C-style initialization 
    std::vector<S> v; 
    S s1("Norah", 2.7); 
    S s2("Frank", 3.5); 
    S s3("Jeri", 85.9); 
    v.push_back(s1); 
    v.push_back(s2); 
    v.push_back(s3); 
    
    // Modern C++ 
    std::vector<S> v2 {s1, s2, s3}; 
    // or 
    ... std::vector<S> v3{ 
        {"Norah", 2.7}, 
        {"Frank", 3.5}, 
        {"Jeri", 85.9}
    }; 
}
```


## 10. 함수 객체 생성을 위한 람다 표현식
```cpp
std::vector<int> v {1,2,3,4,5}; 
int x = 2;
int y = 4; 
auto result = find_if(begin(v), end(v), [=](int i) { return i > x && i <y; }); //[식]는 외부의 모든 변수를 const형으로 가져옵니다.
```


## 11. 암시적 변환 방지를 위한 explicit
### (1) 일반적인 explicit 활용
```cpp
class T {
public:
    // 암시적 변환을 허용합니다.
    operator bool() const {return true;}
};

class T_11 {
public:
    // 명시적으로만 변환을 허용합니다.
    explicit operator bool() const {return true;} 
};

T t;
int val1{t}; 
// (△) 비권장. bool()을 이용하여 형변환 하고 암시적으로 int로 변환합니다.
// 예상치 못한 오류나 동작 발생 가능

T_11 t_11;
int val2{t_11}; // (X) 컴파일 오류
bool val3{static_cast<bool>(t_11)}; 
// 명시적으로만 변환해야 사용할 수 있습니다.
```

### (2) 특정 타입에만 암시적 형변환 차단하기
```cpp
class A_20 {
    T m_Val;
public:
    // 정수 타입인 경우에만 explicit합니다.
    explicit(std::is_integral<T>::value) A_20(T val) : m_Val{val} {}
};

A_20<int> a{0};
A_20<int> b = 0; // (X) 컴파일 오류. explicit로 차단했습니다.

A_20<std::string> c{"Hello"};
A_20<std::string> d = std::string{"World"}; // (O) 정수 타입이 아니어서 암시적 형변환을 허용합니다.
```