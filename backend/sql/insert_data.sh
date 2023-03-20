#!/bin/bash
host="localhost"
username="root"
dbname="vizta"
password="Dg980200**"
declare -a filenames=(
    "courses.sql" "users.sql" "prerequisites.sql" "mutual_exclusives.sql" "blocking_course.sql" "course_allowed_year.sql" "reviews.sql"
)

mysql -h $host -u $username -p$password $dbname --execute="drop database ${dbname}; create database ${dbname}; use ${dbname};"
echo "Dropped ${dbname}"
echo "Created ${dbname}"
echo "Using ${dbname}..."

uvicorn backend.src.main:app --reload

for fname in "${filenames[@]}"; do
    mysql -h $host -u $username -p$password $dbname < "backend/sql/${fname}" 2> /dev/null
    echo "Successfully executed ${fname}"
done

