# ✏️ VIZTA - Visuzlization-powered course evaluation service

<img src="/img/Landing.png"/>

# Try it out!
* Test account: `test123@connect.hku.hk`
* Test password: `q12wq12W`

# 📖 Table of Contents

- [🚀About](#About)
- [🪟 0. Light & Dark Mode](#lightdarkmode)
- [🔑 1. Register](#register)
- [🔓 2. Login / Logout](#loginandlogout)
- [📚 3. Main Page](#main)
- [❤️ 4. Favorites Page](#favorites)
- [📊 5. Visualization Page](#visualization)
	- [5.1. Overview](#overview)
	- [5.2. Course Information](#courseinfo)
	- [5.3. Yearly Trends](#yearlytrends)
	- [5.4. Professor Statistics](#professorstats)
- [🌐 6. Profile (reset passwrod) Page](#profile)
- [📕 5. Review Page](#review)
- [🚒 Report Bugs](#report-bugs)
- [💌 Contributions](#contributions)

  

## 🚀 About <a name="about"></a>

<img src="/img/about.gif"/>

- The objective of this project is to develop a university course reviewing system that provides students with an intuitive and informative way to assess potential courses of interest. The system focuses on visualizing static data, such as grading criteria and distribution of reviews by year and professor, to enable students to make more informed decisions about their academic choices.

  

- VIZTA offers a comprehensive and user-friendly interface that allows students to easily search for courses and view relevant information, including course descriptions, prerequisites, and professor bios. In addition, students can view course ratings and read detailed reviews from other students to gain a more comprehensive understanding of the course content and teaching staff.

  

- VIZTA utilizes data visualization techniques to present review data in a meaningful way, enabling students to easily identify trends and make more informed decisions. For example, students can view the distribution of reviews over time to assess the consistency of a course's quality, or view review data by professor to identify instructors who are particularly effective.

  

- VIZTA also provides a mechanism for students to leave reviews of their own, allowing them to share their experiences with other students and contribute to the broader community of learners. Overall, the system aims to provide a comprehensive and informative way for students to review courses and make informed academic decisions.

  
## 🪟 Light & Dark Mode <a name="lightdarkmode"></a>
  
<img src="/img/lightdarkmode.gif"/>

- User can select their color theme up to their preference by clicking the icon on the top right of the page.

## 🔑 Register <a name="register"></a>


<img src="/img/signup.png"/>
  

- A demo video is available for the sign-up logic, which showcases the verification code being sent via email instead of being displayed in the console. The sign-up page includes valid email and password verification, confirmation password, and corresponding alerts when the user makes mistakes.


## 🔓 Log In  <a name="loginandlogout"></a>

  

<img src="/img/signin.png"/>

  

- The project features a login page that securely stores user information on the server. After successful login with valid credentials, the user is issued a JWT token that expires in 30 minutes. The token is stored as a header component and is required for accessing any API. If the token is invalid or has expired, users can only access the landing page and sign-in/sign-up pages.

## 📚 Main Page  <a name="main"></a>

  

<img src="/img/main.gif"/>

  

- The main page of the project displays a list of courses available for the semester. On the left side, users can view their favorite courses. Each course is listed with its name, description, and the number of reviews it has received.

  

## 📊 Vizualization Page  <a name="visualization"></a>

  

<img src="/img/visualization.gif"/>

  

- When a user selects a course from the main page, they are redirected to the visualization page, which contains four tabs: overview, course information, yearly trends, and professor stats.

  

### `Overview`  <a name="overview"></a>

  

<img src="/img/overview.gif"/>

  

- The overview page on the visualization page displays an overall score for the course, which scales up to a maximum of 5 and is an average of five components: GPA, workload, lecture quality, final exam difficulty, and lecture quality (which has sub-components of entertainment, interactivity, and delivery). The four criteria, except for lecture quality, are visualized as a horizontal bar chart. The lecture quality component is visualized as a circular progress chart.


- In addition to the visualization, there is a select text field where users can toggle and select specific years and professors for the course. The data changes correspondingly with nice animations.

  

### `Course Info`  <a name="courseinfo"></a>

  

<img src="/img/courseinfo.gif"/>

  

- The course info page displays general information about the course, including faculty, prerequisites, and descriptions. It also displays the class timetable for the semester and the grading ratio.

  

### `Yearly Trends`  <a name="yearlytrends"></a>

  

<img src="/img/yearlytrend.gif"/>

  

- The yearly trends page displays the performance of a professor throughout the year, based on the criteria selected by the user. Users can select multiple professors and view their performance simultaneously.

  

### `Professor Stats`  <a name="professorstats"></a>

  

<img src="/img/profstats.gif"/>

  

- The professor statistics page displays the overall score from the overview page, but with a multi-select switch component that allows users to compare data between professors.

  

## 🌐 Profile (reset password)  <a name="profile"></a>

  

<img src="/img/profile.gif"/>

  

- Now the profile page only has reset password feature and showing basic user information. We will further include more features such as analysis of the user's school work performance, customizable time table, and AI-based recommandation system.

  

## 📕 Add Review   <a name="review"></a>

  

<img src="/img/review.gif"/>

  

- If the user has submitted review before, the user will be blocked from making another review. The users are required to fill in every componenets that shows up in the visualization page.

# 🚒 Report Bugs <a name="report-bugs"></a>

The first version of **VIZTA** was released just a couple days ago so you might encounter some bugs and errors.

We would greatly appreciate if you report them as raising `issues` then we will respond and update as soon as possible.

# 💌 Contribute to the project <a name="contribution"></a>

- If you have any new features wish were in VIZTA, please don't hesitate to raise issues.

- If you wish to contribute to the project as a programmer, please first **open an issue** with the `feature` tag (title prefixed with `[Feat] description`) describing your suggested features. After getting approval from the maintainer, you can drop pull requests and we will review each of them carefully.
