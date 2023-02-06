-- Active: 1671800850866@@127.0.0.1@3306@vizta
CREATE TABLE User
(
    -- user_id     INT         NOT NULL,
    email       VARCHAR(50) NOT NULL,
    enteredYear VARCHAR(4)  NOT NULL,
    major       VARCHAR(30) NOT NULL,
    password    VARCHAR(30) NOT NULL,
    created_at  TIMESTAMP   NOT NULL,
    PRIMARY KEY (email)
);

CREATE TABLE Course
(
    course_id   VARCHAR(100)  NOT NULL,
    name        VARCHAR(100)  NOT NULL,
    description VARCHAR(2000) NOT NULL,
    faculty     VARCHAR(40)   NOT NULL,
    PRIMARY KEY (course_id)
);

CREATE TABLE CoursePrerequisites
(
    course_id        VARCHAR(100) NOT NULL,
    prereq_course_id VARCHAR(100) NOT NULL,
    PRIMARY KEY (course_id, prereq_course_id),
    FOREIGN KEY (course_id) REFERENCES Course (course_id),
    FOREIGN KEY (prereq_course_id) REFERENCES Course (course_id)
);

CREATE TABLE CourseExclusivity
(
    course_id       VARCHAR(100) NOT NULL,
    exclu_course_id VARCHAR(100) NOT NULL,
    PRIMARY KEY (course_id, exclu_course_id),
    FOREIGN KEY (course_id) REFERENCES Course (course_id),
    FOREIGN KEY (exclu_course_id) REFERENCES Course (course_id)
);

CREATE TABLE Subclass
(
    subclass_id       VARCHAR(100) NOT NULL,
    course_id         VARCHAR(100) NOT NULL,
    academic_year     INT          NOT NULL,
    semester          INT ENUM(1, 2) NOT NULL,
    professor_name    VARCHAR(30)  NOT NULL,
    final_exam_ratio  INT,
    midterm_ratio     INT,
    assignments_ratio INT,
    project_ratio     INT,
    PRIMARY KEY (subclass_id, course_id, academic_year, semester),
    FOREIGN KEY (course_id) REFERENCES Course (course_id)
);

--Assume no class at 00:00
CREATE TABLE SubclassInfo
(
    subclass_id VARCHAR(100) NOT NULL,
    course_id   VARCHAR(100) NOT NULL,
    week_day    VARCHAR(100) NOT NULL,
    stime       VARCHAR(5) NOT NULL,
    etime       VARCHAR(5) NOT NULL,
    class_loca  VARCHAR(100) NOT NULL,
    PRIMARY KEY (subclass_id, course_id, week_day),
    FOREIGN KEY (subclass_id) REFERENCES Subclass (subclass_id),
    FOREIGN KEY (course_id) REFERENCES Subclass (course_id)
);

CREATE TABLE CourseReview
(
    user_id               INT  NOT NULL,
    subclass_id           VARCHAR(100) NOT NULL,
    course_id             VARCHAR(100) NOT NULL,
    academic_year         INT          NOT NULL,
    semester              INT ENUM(1, 2) NOT NULL,
    gpa                   VARCHAR(2) ENUM('F', 'D', 'D+', 'C-', 'C', 'C+', 'B-', 'B', 'B+', 'A-', 'A', 'A+') NOT NULL,
    workload              TINYINT ENUM(1, 2, 3, 4, 5, 6, 7, 8, 9, 10) NOT NULL,
    lecture_difficulty    TINYINT ENUM(1, 2, 3, 4, 5, 6, 7, 8, 9, 10) NOT NULL,
    final_exam_difficulty TINYINT ENUM(1, 2, 3, 4, 5, 6, 7, 8, 9, 10) NOT NULL,
    course_entertaining   TINYINT ENUM(1, 2, 3, 4, 5, 6, 7, 8, 9, 10) NOT NULL,
    course_delivery       TINYINT ENUM(1, 2, 3, 4, 5, 6, 7, 8, 9, 10) NOT NULL,
    course_interactivity  TINYINT ENUM(1, 2, 3, 4, 5, 6, 7, 8, 9, 10) NOT NULL,
    PRIMARY KEY (user_id, subclass_id, course_id, academic_year, semester),
    FOREIGN KEY (user_id) REFERENCES User (user_id),
    FOREIGN KEY (subclass_id) REFERENCES Subclass (subclass_id),
    FOREIGN KEY (course_id) REFERENCES Subclass (course_id),
    FOREIGN KEY (academic_year) REFERENCES Subclass (academic_year),
    FOREIGN KEY (semester) REFERENCES Subclass (semester),
    final_exam_ratio      INT          NOT NULL,
    midterm_ratio         INT          NOT NULL,
    assignments_ratio     INT          NOT NULL,
    project_ratio         INT          NOT NULL
);

CREATE TABLE UserFavorite
(
    user_id INT NOT NULL,
    course_id VARCHAR(100) NOT NULL,
    PRIMARY KEY (user_id, course_id),
    FOREIGN KEY (user_id) REFERENCES User (user_id),
    FOREIGN KEY (course_id) REFERENCES Course (course_id)
);


CREATE TABLE prerequisite_set
(
    set_id INT NOT NULL,
    course_id VARCHAR(100) NOT NULL,
    is_conjunction BOOLEAN NOT NULL,
    PRIMARY KEY (set_id),
    FOREIGN KEY (course_id) REFERENCES Course (course_id)
);


CREATE TABLE prerequisite_set_course
(
    set_id INT NOT NULL,
    course_id VARCHAR(100) NOT NULL,
    PRIMARY KEY(set_id, course_id),
    FOREIGN KEY (set_id) REFERENCES prerequisite_set (set_id)
    -- FOREIGN KEY (course_id) REFERENCES Course (course_id)
);


CREATE TABLE prerequisite_type
(
    course_id VARCHAR(100) NOT NULL,
    is_conjunction BOOLEAN NOT NULL,
    PRIMARY KEY (course_id),
    FOREIGN KEY (course_id) REFERENCES Course (course_id)
);