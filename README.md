# Content aggregator app - Bachelor's Thesis

This repository is represents my approach at an content aggregator type app such as Reddit.

Student: Robert-Cristian Iurisniti  
Supervisor: Teaching Assistant Pop Emilia

## App:
The app will permit students to stay up to date with their university life, from courses, labs and seminars, as well as other activities held by the university.

* A User will have access to various university pages e.g. faculty pages - Channels - on which university staff can create articles - Threads -  with information and announcements pertaining to their faculties.

* On each Thread, the User has the ability to discuss the contents of the Thread.

* In addition each User, if given the permission, can post articles to their own page. This is to facilitate to the university staff the ability to share course materials with the students.

* A User can choose to follow certain Threads and subscribe to Channels i.e. be notified when a new comment appears on a followed Thread or a new Thread appears on a subscribed Channel.

## Technologies used:
* Front-end: Javascript with React-Native
* Back-end: Django Rest Framework
* Persistence: PostgreSql Database

---

## Instructions
Make sure to modify the configs of both back and front for connection to DB and network
### FrontEnd
* npm install -g react-native-cli
* install android studio and follow instructions from [React Native](https://facebook.github.io/react-native/docs/getting-started.html)
* cd front_end/ubbmock/
* run npm install
* run react-native run-android

### Backend
* cd django/ubbmock
* create a virtual enviroment using virtualenv
* activate the virtual enviroment
* pip install -r requirements.txt
* python ./manage.py runserver


_Robert-Cristian Iurisniti_ (iurisnit.robert@gmail.com)
