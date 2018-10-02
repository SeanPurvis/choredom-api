/*****************************
CSC 411 HW 2
Sean T. Purvis
3.11, 3.12, 3.15, and 3.24

*****************************
3.11)
*****************************/
--a)
select name from student natural join takes natural join course \
where course.dept_name='Comp. Sci.';

--b)
select id, name from student except select id, name from student \
natural join takes where year<2009;

--c)
select dept_name, max(salary) from instructor group by dept_name;

--d)
select min(maxsalary) from (select dept_name, max(salary) as maxsalary \
from instructor group by dept_name);

/*******************************
3.12)
*******************************/
--a)
insert into course values('CS-001', 'Weekly Seminar', 'Comp. Sci.', 0)

--b)
insert into section values('CS-001', 1, 'Autumn', 2009, null, null, null)

--c)
insert into takes select id, 'CS-001', 1, 'Autumn', 2009, null from \
student where dept_name='Comp. Sci.';

--d)
delete from takes where course_id='CS-001' and section_id=1 and \
year=2009 and semester='Autumn' and id in(select id from student where \
name='Chavez');

--e)
delete from takes where course_id='CS-001' delete from section where \
course_id='CS-001' delete from course where course_id='CS-001';

--f)
delete from takes where course_id in (select course_id from course \
where lower(title) like '%database%');

/********************************
3.15)
********************************/
--a)
with branchcount as (select count(*) branch where branch_city='Brooklyn') \
select customer_name from customer c where branchcount = (select \
count(distinct branch_name) from(customer natural join depositor \
natural join account natural join branch) as d where \
d.customer_name = c.customer_name);

--b)
select sum(amount) from loan;

--c)
select branch_name from branch where assets > some (select assets \
from branch where branch_city='Brooklyn');

/**********************************
3.24)
*********************************/
select distinct dept_name d from instructor i where \
(select sum(salary) from instructor where department=d) >= \
(select avg(s) from (select sum(salary) as s from instructor \
group by department));

