---
author_profile: true
layout: single
date: '2024-06-28 13:20:25 +0900'
categories:
  - python
comments: true
sidebar:
  nav: "main"
toc: true # 우측에 본문 목차 네비게이션 생성
title: "파이썬 tkinter로 구현한 실시간 디지털 시계"
---
## 개요
파이썬으로 현재 시간을 표시하도록 하는 방법은 간단합니다. datetime 모듈을 이용해 콘솔 창에 현재 시간을 출력하도록 다음과 같이 코드를 짜면 되기 때문이죠.
```python
from datetime import datetime

# 현재 시간 가져오기
now = datetime.now()

# 현재 시간을 문자열로 포맷팅
current_time = now.strftime("%Y-%m-%d %H:%M:%S")

# 콘솔에 출력
print("현재 시간:", current_time)

```
그러나 이 코드를 실행하면 이 코드를 실행한 시점의 시간만 알 수 있고, 시간이 흐르며 1초마다 업데이트되는 실시간 시계는 구현할 수 없습니다. 제가 실시간 시계를 쓸 일이 많은데 웹사이트를 일일히 찾아보기도 귀찮고 해서 코딩하고자 찾아보니 관련한 글이 전혀 없고, 있더라도 PyQt처럼 별도로 라이브러리를 다운받아 사용해야 하는 것만 있길래 별도의 설치 필요 없이 간단히 제가 직접 구현해 올리고자 합니다.

## 구현 방법
우선 시간을 표시하는 모듈 중 time 모듈을 사용했습니다. datetime이 아닌 time인 이유는, time 모듈이 UNIX의 타임 스탬프 기반으로 시간을 출력하기에 제가 구현하고자 하는 시스템 시계를 만드는 데에 더 적합하기 때문입니다.

그러나 time 모듈만 사용해 구현하면 콘솔창에 그대로 현재 시간을 출력하는 것과 별반 다르지 않습니다. 따라서 GUI를 갖추어 현재 시간을 실시간으로 업데이트하도록, 파이썬의 GUI 라이브러리인 tkinter를 사용합니다.

## 전체 코드
```python
import tkinter as tk
import time

def update_time():
    current_time = time.strftime('%Y-%m-%d\n%H:%M:%S') # 연-월-일 시-분-초 순으로 출력하도록 저장
    clock_label.config(text=current_time) # 현재 시간을 텍스트로 출력
    clock_label.after(1000, update_time)  # 1초마다 업데이트

root = tk.Tk()
root.title("실시간 시계")

clock_label = tk.Label(root, font=('Arial', 48), bg='black', fg='white') # 화면 상에 출력되는 label의 크기와 폰트, 색
clock_label.pack(anchor='center') # 글자가 출력되는 위치

update_time()  # 시간 업데이트 함수 호출

root.mainloop()

```

time 모듈과 tkinter 라이브러리를 호출한 후, 먼저 update_time 함수를 만듭니다.

먼저 current_time 변수에 strftime을 이용해 시간을 연-월-일 시:분:초 형식으로 출력되도록 문자열을 포매팅한 것을 저장한 후, GUI 상에 출력되는 clock_label 위젯에 config 값을 방금 설정한 current_time 변수로 출력되도록 설정해 줍니다. 

그 후 실시간 업데이트를 구현하도록 after 함수를 이용해 1초마다 이 update_time 함수가 다시 실행되도록 해줍니다. 이렇게 하면 1초마다 현재 시간을 가져와 GUI 상에 label로 출력할 수 있습니다.

함수 밖에서 clock_label 위젯에 화변에 출력되는 텍스트의 폰트와 크기, 배경색과 글자색을 설정해줍니다. 그 후, pack 함수로 anchor를 정가운데로 설정하여 label의 위치 기준점을 GUI의 정가운데로 고정합니다.

여기까지 끝났으면 update_time 함수를 호출하여 만들고자 했던 디지털 시계를 구현할 수 있습니다.

## 실제 구현 스샷
![실시간 시계 스샷](https://github.com/gkeksd/RealtimeClock/assets/54362230/452bd84d-b8b6-4e82-9533-33694b749a8c)

프로그램을 실행하면 다음과 같이 구현됩니다. 저는 이 코드를 pyinstaller를 활용해 exe 실행파일로 만들었습니다. 이 파일을 다운받고 싶으시면 제 github의 [해당 저장소](https://github.com/gkeksd/RealtimeClock/releases/tag/%ED%8C%8C%EC%9D%B4%EC%8D%AC)로 이동해 다운받아 주세요.