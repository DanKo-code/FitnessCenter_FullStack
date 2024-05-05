INSERT INTO Service(id, Title, Phote)
VALUES (NEWID(), 'Pool', '*'),
		(NEWID(), 'Gym', '*'),
		(NEWID(), 'Sauna', '*');

Select * from Abonement
Select * from Service

insert into AbonementService(AbonementsId, ServicesId)
values ('BF703C7E-625C-4ED8-8B66-E37008F19F67', 'AE2F4595-0800-448F-859B-4281FFF9624E'),
('BF703C7E-625C-4ED8-8B66-E37008F19F67', 'A35D8738-B934-466F-9D31-A5D3379A3DDF'),
('BF703C7E-625C-4ED8-8B66-E37008F19F67', '4375D73A-5977-445A-B456-F9E98A7EDDCE')

insert into AbonementService(AbonementsId, ServicesId)
values ('0E6D2803-6660-4AC6-A54B-FBDF626D4992', 'A35D8738-B934-466F-9D31-A5D3379A3DDF'),
('0E6D2803-6660-4AC6-A54B-FBDF626D4992', 'AE2F4595-0800-448F-859B-4281FFF9624E')

insert into AbonementService(AbonementsId, ServicesId)
values ('1DAD2A49-4E48-41D3-8D0F-5F143A26D0B4', 'A35D8738-B934-466F-9D31-A5D3379A3DDF')

select * from AbonementsService

delete from Service;