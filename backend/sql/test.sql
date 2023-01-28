SELECT S.professor_name, S.academic_year, S.semester, S.final_exam_ratio, S.midterm_ratio, S.assignments_ratio, S.project_ratio
FROM subclass S
WHERE S.course_id = 'COMP3314' AND S.academic_year = (
    SELECT MAX(S2.academic_year) FROM subclass S2
    WHERE S2.professor_name = S.professor_name
);
