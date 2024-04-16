INSERT INTO Service(id, Title, Phote)
VALUES (NEWID(), 'Pool', '*'),
		(NEWID(), 'Gym', '*'),
		(NEWID(), 'Sauna', '*');

Select * from Abonement
Select * from Service

insert into AbonementsService(AbonementsId, ServicesId)
values ('7BDF4AF1-33DA-435B-BB31-0BAEB5936A15', 'CE0B37C3-EEF4-4B37-906E-D07C8CCBBAB2'),
('7BDF4AF1-33DA-435B-BB31-0BAEB5936A15', '3944F4A2-6714-4FE1-ABC9-DC7F541CC7D3'),
('7BDF4AF1-33DA-435B-BB31-0BAEB5936A15', 'DA916733-D8F6-48A7-AA8A-F2508440C280')

insert into AbonementsService(AbonementsId, ServicesId)
values ('90EA145F-78DE-474C-A456-5142D2823661', 'CE0B37C3-EEF4-4B37-906E-D07C8CCBBAB2'),
('90EA145F-78DE-474C-A456-5142D2823661', '3944F4A2-6714-4FE1-ABC9-DC7F541CC7D3')

insert into AbonementsService(AbonementsId, ServicesId)
values ('0AA1389A-BC0B-4A82-8F66-8DDFB52F3178', 'DA916733-D8F6-48A7-AA8A-F2508440C280')

select * from AbonementsService

delete from Service;