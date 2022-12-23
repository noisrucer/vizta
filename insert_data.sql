--
-- COMP2396
--
INSERT INTO Course
VALUES ('COMP2396',
        'Object-oriented programming and Java',
        'Introduction to object-oriented programming; abstract data types and classes; inheritance and polymorphism; object-oriented program design; Java language and its program development environment; user interfaces and GUI programming; collection class and iteration protocol; program documentation',
        'BEng');

-- Pass in ENGG1340 or COMP2113 or COMP2123; Mutually exclusive with ELEC2543 or FITE2000

INSERT INTO CoursePrerequisites
VALUES ('COMP2396', 'COMP2113');

INSERT INTO CourseExclusivity
VALUES ('COMP2396', 'ELEC2543');

INSERT INTO Subclass
VALUES ('A', 'COMP2396', 2022, 1, 'Kwan Yee Wong', 50, 0, 50, 0);

INSERT INTO SubclassInfo
VALUES ('A', 'COMP2396', 'Tuesday', '10:30', '12:20', 'CPD-LG.18'),
VALUES ('A', 'COMP2396', 'Thursday', '10:30', '12:20', 'CPD-LG.18');

--
-- COMP2501
--
INSERT INTO Course
VALUES ('COMP2501',
        'Introduction to Data Science and Engineering',
        'The course introduces basic concepts and methodology of data science. The goal of this course is to provide students with an overview and practical experience of the entire data analysis process. Topics include: data source and data acquisition, data preparation and manipulation, exploratory data analysis, statistical and predictive analysis, data visualization and communication',
        'BEng');

-- Pass in COMP1117 or ENGG1330; Mutually exclusive with: STAT1005 or STAT1015

INSERT INTO CoursePrerequisites
VALUES ('COMP2501', 'COMP1117');

INSERT INTO CourseExclusivity
VALUES ('COMP2501', 'STAT1005');

INSERT INTO Subclass
VALUES ('A', 'COMP2501', 2022, 1, 'Hing Fung Ting', 50, 0, 50, 0);

INSERT INTO SubclassInfo
VALUES ('A', 'COMP2501', 'Monday', '14:30', '15:20', 'LE4'),
VALUES ('A', 'COMP2501', 'Thursday', '13:30', '15:20', 'LE4');

--
-- COMP3231
--
INSERT INTO Course
VALUES ('COMP3231',
        'Computer architecture',
        'Introduction to computer design process; performance and cost analysis; instruction set design; data-path and controller design; pipelining; memory system; I/O design; introduction to advanced topics',
        'BEng');

INSERT INTO CoursePrerequisites
VALUES ('COMP2501', 'COMP2120');

INSERT INTO Subclass
VALUES ('A', 'COMP3231', 2022, 1, 'Heming Cui', 60, 0, 40, 0);

INSERT INTO SubclassInfo
VALUES ('A', 'COMP3231', 'Monday', '17:30', '18:20', '--'),
VALUES ('A', 'COMP3231', 'Thursday', '16:30', '18:20', '--');

--
-- COMP3258
--
INSERT INTO Course
VALUES ('COMP3258',
        'Functional programming',
        'The course teaches the basics of functional programming using the language Haskell. The main goal is introduce students to fundamental programming concepts such as recursion, abstraction, lambda expressions and higher-order functions and data types. The course will also study the mathematical reasoning involved in the design of functional programs and techniques for proving properties about functions so defined. With the adoption of lambda expressions recent versions of Java, C++ or C#, functional programming and related programming techniques are becoming increasingly more relevant even for programmers of languages that are not traditionally viewed as functional. This course is important to introduce students to such techniques',
        'BEng');

INSERT INTO CoursePrerequisites
VALUES ('COMP3258', 'COMP2121');

INSERT INTO Subclass
VALUES ('A', 'COMP3258', 2022, 1, 'Bruno Cesar Dos Santos Oliveira', 50, 0, 50, 0);

INSERT INTO SubclassInfo
VALUES ('A', 'COMP3258', 'Friday', '14:30', '15:20', 'MB167'),
VALUES ('A', 'COMP3258', 'Tuesday', '13:30', '15:20', 'MB167');

--
-- COMP3270
--
INSERT INTO Course
VALUES ('COMP3270',
        'Artificial intelligence',
        'This is an introduction course on the subject of artificial intelligence. Topics include: intelligent agents; search techniques for problem solving; knowledge representation; logical inference; reasoning under uncertainty; statistical models and machine learning',
        'BEng');

-- Pass in COMP2119 or FITE2000; Mutually exclusive with: IIMT3688 or ELEC4544

INSERT INTO CoursePrerequisites
VALUES ('COMP3270', 'COMP2119');

INSERT INTO CourseExclusivity
VALUES ('COMP3270', 'IIMT3688');

INSERT INTO Subclass
VALUES ('A', 'COMP3270', 2022, 1, 'Dirk Schnieders', 50, 0, 50, 0);

INSERT INTO SubclassInfo
VALUES ('A', 'COMP3270', 'Friday', '12:30', '14:20', 'CYCP1'),
VALUES ('A', 'COMP3270', 'Tuesday', '12:30', '13:20', 'CYCP1');

--
-- COMP3271
--
INSERT INTO Course
VALUES ('COMP3271',
        'Computer Graphics',
        'Overview of graphics hardware, basic drawing algorithms, 2-D transformations, windowing and clipping, interactive input devices, curves and surfaces, 3-D transformations and viewing, hidden-surface and hidden-line removal, shading and colour models, modelling, illumination models, image synthesis, computer animation.',
        'BEng');

INSERT INTO CoursePrerequisites
VALUES ('COMP3271', 'COMP2119');

INSERT INTO Subclass
VALUES ('A', 'COMP2396', 2022, 1, 'Komura Taku', 50, 0, 50, 0);

INSERT INTO SubclassInfo
VALUES ('A', 'COMP3271', 'Monday', '12:30', '14:20', 'CBC'),
VALUES ('A', 'COMP2396', 'Thursday', '12:30', '14:20', 'CBC');

--
-- COMP3314
--
INSERT INTO Course
VALUES ('COMP3314',
        'Machine Learning',
        'This course introduces algorithms, tools, practices, and applications of machine learning. Topics include core methods such as supervised learning (classification and regression), unsupervised learning (clustering, principal component analysis), Bayesian estimation, neural networks; common practices in data pre-processing, hyper-parameter tuning, and model evaluation; tools/libraries/APIs such as scikit-learn, Theano/Keras, and multi/many-core CPU/GPU programming.',
        'BEng');

INSERT INTO CoursePrerequisites
VALUES ('COMP3314', 'MATH1853');

INSERT INTO CourseExclusivity
VALUES ('COMP3314', 'IIMT3688');

INSERT INTO Subclass
VALUES ('A', 'COMP3314', 2022, 1, 'Zhao Hengshuang', 50, 0, 50, 0),
VALUES ('B', 'COMP3314', 2022, 2, 'Kong Lingpeng', 50, 0, 50, 0),
VALUES ('C', 'COMP3314', 2022, 2, 'Yu Y Z', 50, 0, 50, 0);

INSERT INTO SubclassInfo
VALUES ('A', 'COMP3314', 'Tuesday', '12:30', '13:20', 'MWT7'),
VALUES ('A', 'COMP3314', 'Friday', '12:30', '14:20', 'MWT7'),
VALUES ('B', 'COMP3314', 'Monday', '12:30', '14:20', 'LE4'),
VALUES ('B', 'COMP3314', 'Thursday', '12:30', '13:20', 'LE4'),
VALUES ('C', 'COMP3314', 'Monday', '14:30', '17:20', 'CYPP3');

--
-- COMP3322
--
INSERT INTO Course
VALUES ('COMP3322',
        'Modern Technologies on World Wide Web',
        'Selected network protocols relevant to the World Wide Web (e.g., HTTP, DNS, IP); World Wide Web; technologies for programming the Web (e.g, HTML, XML, style sheets, PHP, JavaScript, Node.js.; other topics of current interest (AJAX, HTML5, web services, cloud computing)',
        'BEng');

-- Pass in COMP1117 or ENGG1330; Mutually exclusive with: IIMT3663

INSERT INTO CoursePrerequisites
VALUES ('COMP3322', 'COMP1117');

INSERT INTO CourseExclusivity
VALUES ('COMP3322', 'IIMT3663');

INSERT INTO Subclass
VALUES ('A', 'COMP3322', 2022, 1, 'Chuan Wu', 40, 0, 60, 0),
VALUES ('B', 'COMP3322', 2022, 2, 'Tat Chun Tam', 40, 0, 60, 0);

INSERT INTO SubclassInfo
VALUES ('A', 'COMP3322', 'Friday', '15:30', '17:20', 'CPD-LG.18'),
VALUES ('A', 'COMP3322', 'Monday', '15:30', '17:20', 'CPD-LG.18'),
VALUES ('B', 'COMP3322', 'Tuesday', '16:30', '18:20', 'MWT7'),
VALUES ('B', 'COMP3322', 'Thursday', '16:30', '18:20', 'MWT7');

--
-- COMP3330
--
INSERT INTO Course
VALUES ('COMP3330',
        'Interactive Mobile Application Design and Programming',
        'This course aims at introducing the design and development issues of mobile apps. Students will learn the basic principles, constraints and lifecycle of mobile apps. Then they will learn how to use modern object-oriented languages for the development and different design patterns. Next they will learn various development issues such as graphics, touch events, handling of concurrency, sensors, location services and server connection. Students will also participate in both individual assignments and group project to practice ideation, reading, writing, coding and presentation throughout this course',
        'BEng');

-- Pass in COMP2396 or FITE2000

INSERT INTO CoursePrerequisites
VALUES ('COMP3330', 'COMP2396');

INSERT INTO Subclass
VALUES ('A', 'COMP3330', 2022, 1, 'Tat Wing Chim', 30, 0, 70, 0);

INSERT INTO SubclassInfo
VALUES ('A', 'COMP3330', 'Thursday', '12:30', '13:20', 'LE4'),
VALUES ('A', 'COMP3330', 'Monday', '12:30', '14:20', 'LE4');

--
-- COMP3340
--
INSERT INTO Course
VALUES ('COMP3340',
        'Applied Deep Learning',
        'An introduction to algorithms and applications of deep learning.  The course helps students get hands-on experience of building deep learning models to solve practical tasks including image recognition, image generation, reinforcement learning, and language translation. Topics include: machine learning theory; optimization in deep learning; convolutional neural networks; recurrent neural networks; generative adversarial networks; reinforcement learning; self-driving vehicle',
        'BEng');

-- Pass in COMP2119 or ELEC2543 or FITE2000; and MATH1853 or MATH2014; Mutually exclusive with: ELEC4544

INSERT INTO CoursePrerequisites
VALUES ('COMP3340', 'COMP2119');

INSERT INTO CourseExclusivity
VALUES ('COMP3340', 'ELEC4544');

INSERT INTO Subclass
VALUES ('A', 'COMP3340', 2022, 1, 'Chuan Wu', 50, 0, 50, 0);

INSERT INTO SubclassInfo
VALUES ('A', 'COMP3340', 'Friday', '17:30', '18:20', 'KKLG109'),
VALUES ('A', 'COMP3340', 'Monday', '16:30', '18:20', 'KKLG109');