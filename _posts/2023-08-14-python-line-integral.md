---
author_profile: true
layout: single
date: '2023-08-14 16:37:38 +0900'
categories:
  - python
comments: true
sidebar:
  nav: "main"
toc: true # 우측에 본문 목차 네비게이션 생성
title: "파이썬을 이용한 선적분(line integral) 계산기 구현"
---
## 1.개요 및 전체 코드

일반수학(미적분학) 선적분 파트 공부하다 하나하나 계산하는 대신 계산기가 대신 해주었으면 좋겠다 싶어서 만든 계산기입니다.
굳이 코딩까지 해서 만든 이유는 공학용 계산기에도, 울프럼 알파에도 선적분 기능이 보이지 않아서...

우선 전체 코드입니다.
```
import numpy as np
from scipy.integrate import quad
import sympy as sp

# 사용자가 적분할 함수 입력
expression_str = input("x와 y에 대해 적분할 함수를 입력하세요.: ")
x, y = sp.symbols('x y')
expression = sp.sympify(expression_str)

# 곡선의 매개변수 함수
def x_parametric(t):
    # Define x(t) here
    return t

def y_parametric(t):
    # Define y(t) here
    return t

# 적분식 정의
def integrand(t):
    return expression.subs({x: x_parametric(t), y: y_parametric(t)})

# 적분 구간
t_start = float(input("적분 범위 시점: "))
t_end = float(input("적분 범위 종점: "))

# 적분 수행
result, error = quad(integrand, t_start, t_end)

print("선적분 결과:", result)
print("오차범위:", error)

```

## 2.사전 세팅
우선 필요한 파이썬 라이브러리는 scipy와 sympy입니다. scipy는 science+python으로 말 그대로 과학 계산용 라이브러리이고, sympy는 symbol+python으로써 방정식 기호 계산을 하게 해주는 라이브러리입니다.
만약 두 라이브러리가 없으시다면 cmd를 켜서 pip 명령으로 설치하시길 추천드립니다. 위 코드를 보면 맨 첫번째에 numpy도 보이는데 scipy 설치할 때 numpy도 같이 설치가 됩니다. 왜냐하면, scipy가 기본적으로 numpy 위에서 돌아가는 라이브러리니까요. 
```
pip install scipy
```
```
pip install sympy
```
