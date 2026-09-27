
create database employee;
use employee;
create table details (
rollno TINYINT PRIMARY KEY,
    fullnm VARCHAR(50),
    std_id INT,
    branch CHAR(5) DEFAULT 'CT5-A',
    mark FLOAT,
    grade CHAR(1),
    addr VARCHAR(100) UNIQUE,
    fees DECIMAL NOT NULL,
    CONSTRAINT mrk_check CHECK (mark >= 0 AND mark <= 100)
);
INSERT INTO details (rollno, fullnm, std_id, mark, grade, addr, fees)
VALUES
(1, 'Aarav Mehta', 1001, 85.5, 'A', '12 Flat, Mumbai', 45000),
(2, 'Diya Sharma', 1002, 92.0, 'O', '45 Street, Delhi', 48000),
(3, 'Kabir Singh', 1003, 74.0, 'B', '88 Avenue, Pune', 42000);

INSERT INTO details (rollno, fullnm, std_id, branch, mark, grade, addr, fees)
VALUES
(4, 'Isha Patel', 1004, 'CT5-B', 68.5, 'B', '102 Residency, Bangalore', 46000),
(5, 'Vivaan Joshi', 1005, 'CT5-C', 95.0, 'O', '14 Block, Hyderabad', 50000),
(6, 'Ananya Rao', 1006, 'CT5-A', 55.0, 'C', '67 Lane, Chennai', 40000);

SELECT * FROM details;
SELECT branch, AVG(mark) AS average_marks
FROM details
GROUP BY branch;
select branch,count(branch) as no_stud
from details
group by branch;
select sum(fees)
from details;
create view student_data as
select rollno,fullnm,mark
from details;
select rollno,mark 
from student_data
where mark >= 40;

drop view student_data;

select fullnm, mark, mark + 5 as new_mark from details;

select fullnm, fees, fees / 2 as half_fees
from details;

select * from details
where not branch = "CT5-A";

select * from details
where  branch != "CT5-A";

select * from details 
where branch <> "CT5-A";

select * from details
where branch = "CT5-A" or branch = "CT5-B" or branch = "CT5-C";

select * from details
where branch not in ("CT5-A","CT5-B","CT5-C");

select * from details
where mark between 18 and 60;

select * from details
where fullnm like '_i%';

select * from details
where grade = null;

select * from details
where grade is null;

select * from details
where grade is not null;

/*select tb.c1,tb1.c2,tb2.c4....
from tb1
join type tb2
on tb1.c1 = tb2.c4;
*/
select branch ,count(branch) as no_stud
 from details
-- where mark>90
 group by branch
 having count(branch) <> 2;
 
 select  mark ,count(mark) as no_stud
 from details
-- where mark>90
 group by mark
 having max(mark) between 80 and 100;
 
create index idx
on details(fullnm);

show index from details;