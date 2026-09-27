use employee;

create table office(
 emp_id int primary key,
 emp_name varchar (30),
 mng_id int default 1);
 
 select * from office;
 
 insert into office 
 values(1, "Disha",null),
	  (2,"Amey",1),
      (3,"Ahilya",1),
      (4,"Meet",2);
      
select e.emp_name as employee,
       m.emp_name as manager
       from office e
       left join office m
       on e.mng_id = m.emp_id;      