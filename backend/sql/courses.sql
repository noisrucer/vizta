-- Active: 1671800850866@@127.0.0.1@3306@vizta
--
-- COMP2396

INSERT INTO course
VALUES ('COMP2396',
        'Object-oriented programming and Java',
        'Introduction to object-oriented programming; abstract data types and classes; inheritance and polymorphism; object-oriented program design; Java language and its program development environment; user interfaces and GUI programming; collection class and iteration protocol; program documentation',
        'Faculty of Engineering');

-- Pass in ENGG1340 or COMP2113 or COMP2123; Mutually exclusive with ELEC2543 or FITE2000


INSERT INTO subclass
VALUES ('A', 'COMP2396', 2022, 1, 'Kwan Yee Wong', 50, 0, 50, 0);

INSERT INTO subclass_info
VALUES ('A', 'COMP2396', 2022, 1, 'Tuesday', '10:30', '12:20', 'CPD-LG.18'),
       ('A', 'COMP2396', 2022, 1, 'Thursday', '10:30', '12:20', 'CPD-LG.18');

--
-- COMP2501
--
INSERT INTO course
VALUES ('COMP2501',
        'Introduction to Data Science and Engineering',
        'The course introduces basic concepts and methodology of data science. The goal of this course is to provide students with an overview and practical experience of the entire data analysis process. Topics include: data source and data acquisition, data preparation and manipulation, exploratory data analysis, statistical and predictive analysis, data visualization and communication',
        'Faculty of Engineering');

-- Pass in COMP1117 or ENGG1330; Mutually exclusive with: STAT1005 or STAT1015

INSERT INTO Subclass
VALUES ('A', 'COMP2501', 2022, 1, 'Hing Fung Ting', 50, 0, 50, 0);

INSERT INTO subclass_info
VALUES ('A', 'COMP2501', 2022, 1, 'Monday', '14:30', '15:20', 'LE4'),
       ('A', 'COMP2501', 2022, 1, 'Thursday', '13:30', '15:20', 'LE4');

--
-- COMP3231
--
INSERT INTO Course
VALUES ('COMP3231',
        'Computer architecture',
        'Introduction to computer design process; performance and cost analysis; instruction set design; data-path and controller design; pipelining; memory system; I/O design; introduction to advanced topics',
        'Faculty of Engineering');

INSERT INTO Subclass
VALUES ('A', 'COMP3231', 2022, 1, 'Heming Cui', 60, 0, 40, 0);

INSERT INTO subclass_info
VALUES ('A', 'COMP3231', 2022, 1, 'Monday', '17:30', '18:20', '--'),
       ('A', 'COMP3231', 2022, 1, 'Thursday', '16:30', '18:20', '--');

--
-- COMP3258
--
INSERT INTO Course
VALUES ('COMP3258',
        'Functional programming',
        'The course teaches the basics of functional programming using the language Haskell. The main goal is introduce students to fundamental programming concepts such as recursion, abstraction, lambda expressions and higher-order functions and data types. The course will also study the mathematical reasoning involved in the design of functional programs and techniques for proving properties about functions so defined. With the adoption of lambda expressions recent versions of Java, C++ or C#, functional programming and related programming techniques are becoming increasingly more relevant even for programmers of languages that are not traditionally viewed as functional. This course is important to introduce students to such techniques',
        'Faculty of Engineering');

INSERT INTO Subclass
VALUES ('A', 'COMP3258', 2022, 1, 'Bruno Cesar Dos Santos Oliveira', 50, 0, 50, 0);

INSERT INTO subclass_info
VALUES ('A', 'COMP3258', 2022, 1, 'Friday', '14:30', '15:20', 'MB167'),
       ('A', 'COMP3258', 2022, 1, 'Tuesday', '13:30', '15:20', 'MB167');

--
-- COMP3270
--
INSERT INTO Course
VALUES ('COMP3270',
        'Artificial intelligence',
        'This is an introduction course on the subject of artificial intelligence. Topics include: intelligent agents; search techniques for problem solving; knowledge representation; logical inference; reasoning under uncertainty; statistical models and machine learning',
        'Faculty of Engineering');

-- Pass in COMP2119 or FITE2000; Mutually exclusive with: IIMT3688 or ELEC4544

INSERT INTO Subclass
VALUES ('A', 'COMP3270', 2022, 1, 'Dirk Schnieders', 50, 0, 50, 0);

INSERT INTO subclass_info
VALUES ('A', 'COMP3270', 2022, 1, 'Friday', '12:30', '14:20', 'CYCP1'),
       ('A', 'COMP3270', 2022, 1, 'Tuesday', '12:30', '13:20', 'CYCP1');

--
-- COMP3271
--
INSERT INTO Course
VALUES ('COMP3271',
        'Computer Graphics',
        'Overview of graphics hardware, basic drawing algorithms, 2-D transformations, windowing and clipping, interactive input devices, curves and surfaces, 3-D transformations and viewing, hidden-surface and hidden-line removal, shading and colour models, modelling, illumination models, image synthesis, computer animation.',
        'Faculty of Engineering');

INSERT INTO Subclass
VALUES ('A', 'COMP3271', 2022, 1, 'Komura Taku', 50, 0, 50, 0);

INSERT INTO subclass_info
VALUES ('A', 'COMP3271', 2022, 1, 'Monday', '12:30', '14:20', 'CBC'),
       ('A', 'COMP3271', 2022, 1, 'Thursday', '12:30', '14:20', 'CBC');

--
-- COMP3314
--
INSERT INTO Course
VALUES ('COMP3314',
        'Machine Learning',
        'This course introduces algorithms, tools, practices, and applications of machine learning. Topics include core methods such as supervised learning (classification and regression), unsupervised learning (clustering, principal component analysis), Bayesian estimation, neural networks; common practices in data pre-processing, hyper-parameter tuning, and model evaluation; tools/libraries/APIs such as scikit-learn, Theano/Keras, and multi/many-core CPU/GPU programming.',
        'Faculty of Engineering');

INSERT INTO Subclass
VALUES ('A', 'COMP3314', 2022, 1, 'Zhao Hengshuang', 50, 0, 50, 0),
       ('B', 'COMP3314', 2022, 2, 'Kong Lingpeng', 50, 0, 50, 0),
       ('C', 'COMP3314', 2022, 2, 'Yu Y Z', 50, 0, 50, 0),
       ('A', 'COMP3314', 2023, 1, 'Lo Yu Sum', 50, 0, 50, 0),
       ('A', 'COMP3314', 2023, 2, 'Zhao Hengshuang', 60, 0, 40, 0);

INSERT INTO subclass_info
VALUES ('A', 'COMP3314', 2022, 1, 'Tuesday', '12:30', '13:20', 'MWT7'),
       ('A', 'COMP3314', 2022, 1, 'Friday', '12:30', '14:20', 'MWT7'),
       ('B', 'COMP3314', 2022, 2, 'Monday', '12:30', '14:20', 'LE4'),
       ('B', 'COMP3314', 2022, 2, 'Thursday', '12:30', '13:20', 'LE4'),
       ('C', 'COMP3314', 2022, 2, 'Monday', '14:30', '17:20', 'CYPP3');

--
-- COMP3322
--
INSERT INTO Course
VALUES ('COMP3322',
        'Modern Technologies on World Wide Web',
        'Selected network protocols relevant to the World Wide Web (e.g., HTTP, DNS, IP); World Wide Web; technologies for programming the Web (e.g, HTML, XML, style sheets, PHP, JavaScript, Node.js.; other topics of current interest (AJAX, HTML5, web services, cloud computing)',
        'Faculty of Engineering');

-- Pass in COMP1117 or ENGG1330; Mutually exclusive with: IIMT3663

INSERT INTO Subclass
VALUES ('A', 'COMP3322', 2022, 1, 'Chuan Wu', 40, 0, 60, 0),
       ('B', 'COMP3322', 2022, 2, 'Tat Chun Tam', 40, 0, 60, 0);

INSERT INTO subclass_info
VALUES ('A', 'COMP3322', 2022, 1, 'Friday', '15:30', '17:20', 'CPD-LG.18'),
       ('A', 'COMP3322', 2022, 1, 'Monday', '15:30', '17:20', 'CPD-LG.18'),
       ('B', 'COMP3322', 2022, 2, 'Tuesday', '16:30', '18:20', 'MWT7'),
       ('B', 'COMP3322', 2022, 2, 'Thursday', '16:30', '18:20', 'MWT7');

--
-- COMP3330
--
INSERT INTO Course
VALUES ('COMP3330',
        'Interactive Mobile Application Design and Programming',
        'This course aims at introducing the design and development issues of mobile apps. Students will learn the basic principles, constraints and lifecycle of mobile apps. Then they will learn how to use modern object-oriented languages for the development and different design patterns. Next they will learn various development issues such as graphics, touch events, handling of concurrency, sensors, location services and server connection. Students will also participate in both individual assignments and group project to practice ideation, reading, writing, coding and presentation throughout this course',
        'Faculty of Engineering');

-- Pass in COMP2396 or FITE2000


INSERT INTO Subclass
VALUES ('A', 'COMP3330', 2022, 1, 'Tat Wing Chim', 30, 0, 70, 0);

INSERT INTO subclass_info
VALUES ('A', 'COMP3330', 2022, 1, 'Thursday', '12:30', '13:20', 'LE4'),
       ('A', 'COMP3330', 2022, 1, 'Monday', '12:30', '14:20', 'LE4');

--
-- COMP3340
--
INSERT INTO Course
VALUES ('COMP3340',
        'Applied Deep Learning',
        'An introduction to algorithms and applications of deep learning.  The course helps students get hands-on experience of building deep learning models to solve practical tasks including image recognition, image generation, reinforcement learning, and language translation. Topics include: machine learning theory; optimization in deep learning; convolutional neural networks; recurrent neural networks; generative adversarial networks; reinforcement learning; self-driving vehicle',
        'Faculty of Engineering');

-- Pass in COMP2119 or ELEC2543 or FITE2000; and MATH1853 or MATH2014; Mutually exclusive with: ELEC4544


INSERT INTO Subclass
VALUES ('A', 'COMP3340', 2022, 1, 'Chuan Wu', 50, 0, 50, 0);

INSERT INTO subclass_info
VALUES ('A', 'COMP3340', 2022, 1, 'Friday', '17:30', '18:20', 'KKLG109'),
       ('A', 'COMP3340', 2022, 1, 'Monday', '16:30', '18:20', 'KKLG109');

--
-- Debug course
--
INSERT INTO Course
VALUES ('ADEB3340',
        'Debug Course',
        'A course for debug purpose, will be removed up on lunch',
        'Faculty of Engineering');

INSERT INTO Subclass
VALUES ('A', 'ADEB3340', 2022, 1, 'Prof A', 50, 0, 50, 0),
       ('B', 'ADEB3340', 2022, 1, 'Prof B', 40, 10, 30, 20),
       ('A', 'ADEB3340', 2023, 2, 'Prof B', 50, 0, 50, 0),
       ('B', 'ADEB3340', 2023, 2, 'Prof A', 25, 25, 30, 20)
