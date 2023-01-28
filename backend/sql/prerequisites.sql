-- Active: 1671800850866@@127.0.0.1@3306@vizta

INSERT INTO prerequisite_set VALUES
(1, 'COMP3314', false),
(2, 'COMP3314', false);


INSERT INTO prerequisite_set_course VALUES
(1, 'COMP2119'),
(1, 'ELEC2543'),
(1, 'FITE2000'),
(2, 'MATH1853'),
(2, 'MATH2014');

INSERT INTO prerequisite_type VALUES
('COMP3314', true);

-- Query to find prereq
-- SELECT REPLACE(GROUP_CONCAT(temp.chunk SEPARATOR '-'), '-', IF(PT.is_conjunction=true, ' AND ', ' OR ')) AS 'prerequisite' FROM (
--         SELECT PS.course_id,
--         concat('(', REPLACE(GROUP_CONCAT(PSC.course_id SEPARATOR '-'), '-', If(PS.is_conjunction=true, ' AND ', ' OR ')), ')') AS chunk
--         FROM prerequisite_set_course PSC JOIN prerequisite_set PS ON PSC.set_id = PS.set_id
--         WHERE PS.course_id = 'COMP3314'
--         GROUP BY PSC.set_id
-- ) AS temp JOIN prerequisite_type PT ON temp.course_id = PT.course_id
-- GROUP BY temp.course_id;

-- INSERT INTO course_prerequisite
-- VALUES ('COMP2396', 'COMP2113');

-- INSERT INTO course_prerequisite
-- VALUES ('COMP2501', 'COMP1117');

-- INSERT INTO course_prerequisite
-- VALUES ('COMP2501', 'COMP2120');

-- INSERT INTO course_prerequisite
-- VALUES ('COMP3258', 'COMP2121');


-- INSERT INTO course_prerequisite
-- VALUES ('COMP3270', 'COMP2119');

-- INSERT INTO course_prerequisite
-- VALUES ('COMP3271', 'COMP2119');

-- INSERT INTO course_prerequisite
-- VALUES ('COMP3314', 'MATH1853');

-- INSERT INTO course_prerequisite
-- VALUES ('COMP3322', 'COMP1117');

-- INSERT INTO course_prerequisite
-- VALUES ('COMP3330', 'COMP2396');

-- INSERT INTO course_prerequisite
-- VALUES ('COMP3340', 'COMP2119');