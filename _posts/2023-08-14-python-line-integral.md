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

일반수학(미적분학) 선적분 파트 공부하다 하나하나 계산하는 대신 계산기가 대신 해주었으면 좋겠다 싶어서 만든 계산기입니다.<br>
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
    # x(t)를 여기에 정의
    return t

def y_parametric(t):
    # y(t)를 여기에 정의
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
우선 필요한 파이썬 라이브러리는 scipy와 sympy입니다.<br> scipy는 science+python으로 말 그대로 과학 계산용 라이브러리이고, sympy는 symbol+python으로써 방정식 기호 계산을 하게 해주는 라이브러리입니다.
만약 두 라이브러리가 없으시다면 cmd를 켜서 pip 명령으로 설치하시길 추천드립니다. 위 코드를 보면 맨 첫번째에 numpy도 보이는데 scipy 설치할 때 numpy도 같이 설치가 됩니다. 왜냐하면, scipy가 기본적으로 numpy 위에서 돌아가는 라이브러리니까요. 
```
pip install scipy
```
```
pip install sympy
```

## 3.코드 작성
### 1.라이브러리 호출 및 함수 입력
우리가 작성할 코드는 사용자가 입력한 x, y의 이변수함수에 대해 역시 사용자가 지정한 구간에서 선적분을 수행하는 것입니다. 따라서 먼저 라이브러리를 호출한 뒤, 사용자에게 함수를 입력하게 하여 변수에 저장하면 됩니다. 우선 다른 라이브러리를 호출하기 이전에 numpy가 수학&과학 분야에서 가장 기본이 되는 라이브러리이므로, 먼저 numpy를 호출해주어야 합니다.
```
import numpy as np
from scipy.integrate import quad
import sympy as sp
```
첫 줄에서 넘파이를 호출하고, 둘째 줄에선 scipy를 호출하는데 적분 기능을 사용할 것이므로 scipy.integrate로 써 줍니다. quad는 적분 한번 할때 사용하는 함수입니다. 만약 이중적분을 하고싶다면 dbquad를, 삼중적분을 하고 싶다면 tpquad를 입력해 주시면 됩니다.

그 후 `expression_str`<sup>[1](#footnote_1)</sup> 변수에 적분할 함수를 입력해 줍니다. 저는 x와 y에 대한 이변수함수로 설정했 습니다만 z까지 붙여서 삼변수함수에 대해 적분할 경우에는 밑에 설명할 코드에 z를 붙여주시면 됩니다.

```
x, y = sp.symbols('x y')
```
이 줄은 x와 y를 함수의 기호(미지수)로써 사용한다는 것을 정의한 부분입니다. 이 부분 없이 그냥 코드를 작성하면 오류가 나기 때문에 필수적인 부분입니다.

```
expression = sp.sympify(expression_str)
```
그 다음 세 번째 줄은, 앞서 입력했던 함수를 저장한 변수 `expression_str`은 **문자열**이었는데, 이를 수식으로 바꿔주는 것입니다. sp는 sympy, simpify는 sympy의 문자열 변수를 수식으로 바꿔주는 함수입니다.

### 2.매개변수 설정 및 적분식 정의
그 다음으로 선적분을 위해서는 x와 y<sup>[2](#footnote_2)</sup>의 t에 대한 매개변수 관계를 설정해 주어야 합니다. 이를 위해 x_parametic(t)와 y_parametic(t)라고 각각 이름지은 함수를 활용해 매개변수를 설정한 다음, integrand(t)함수를 이용해 적분식을 정의해 주겠습니다. 

```
# 적분식 정의
def integrand(t):
    return expression.subs({x: x_parametric(t), y: y_parametric(t)})
```
expression.subs는 위에서 수식화한 expression 변수에서 x를 `x_parametric(t)`로, y는 `y_parametric(t)`로 대체한다는 의미입니다. subs는 대체한다는 뜻의 substitution의 약자입니다. 즉, 예를 들어 위에서 함수를 x+y로 입력했다면, 이를 '`x_parametric(t)`+`y_parametric(t)`'로 대체한다는 의미가 되겠습니다.

### 3.적분구간 설정과 적분 수행, 결과 출력
자, 적분식까지 정의했으니 이제 적분 구간을 설정하고, 최종적으로 결과를 출력해야 합니다. 적분구간은 사용자가 정의한 구간에서 적분할 예정이기에 `t_start`변수와 `t_end` 변수에 저장해줍시다. 이때 반드시 **float 자료형**으로 정의해주셔야 합니다. 

```
# 적분 수행
result, error = quad(integrand, t_start, t_end)
```
이제 대망의 적분하는 코드입니다. scipy에선 앞에서도 말씀드렸듯 단일적분의 경우 quad함수를 이용해서 적분하는데, 형식은 quad(적분식, 구간 시점, 구간 종점)입니다. 적분 결과는 튜플의 형태로 저장되며, quad[0]이 결과, quad[1]이 오차입니다. 따라서 결과 변수인 `result`는 quad[0], 오차인 `error`변수는 quad[1]을 저장해주어야 합니다. 사실 코드를 저렇게 쓰지 않고 나누어서

```
integrate[] = quad(integrand, t_start, t_end)
result = integrate[0]
error = integrate[1]
```
이렇게 코드를 쓰는 경우가 보통 많습니다만, 제가 쓴 방식으로 해도 결과는 똑같고 코드도 더 짧아지기에 저는 저렇게 작성했습니다.

## 4.결론 및 주의사항
이렇게 지금가지 scipy와 sympy 라이브러리를 활용해 파이썬으로 선적분 계산을 구현하는 방식에 대해 알아보았습니다. 사실 저는 매개변수까지 사용자 입력으로 구현하고 싶었습니다만 제 코딩 실력이 미천하여 x랑 y 둘다 t로 고정시킬 수밖에 없었네요..^^;; 만약 매개변수도 사용자 정의식으로 작성할 만한 실력이 되시는 분이라면 한번 그 부분도 수정해 보시길 추천드립니다.

**적분할 시 주의점**<br>
1. 함수를 입력할 때, 무조건 문자와 연산자 사이는 띄어서 쓰셔야 합니다. 이말인 즉슨, x + y라는 함수를 입력하고자 한다면 x+y가 아닌, x + y처럼 띄어쓰기를 해야 한다는 뜻입니다. 왜인지는 모르겠지만 붙여서 쓰면 에러가 나더라고요.
2. 문자 앞에 계수를 쓰실 때는 **무조건** 곱셈 연산다 `*`를 쓰셔야 합니다. 왜냐하면, 만약 2y를 2*y가 아니라 2y로 그대로 적으면 2는 정수 자료형인데 y는 문자열이기에 오류가 납니다.  


<a name="footnote_1">1</a>: (함수가 문자열이므로 변수 뒤에 str을 붙임)<br>
<a name="footnote_2">2</a>: 경우에 따라선 z까지