INSERT INTO Abonement(id, Title, Validity, VisitingTime, Photo, Price)
VALUES (NEWID(), 'Vip', '6', '��-��', '*', 100),
		(NEWID(), 'Standard', '3', '��-��', '����1', 50),
		(NEWID(), 'Premium', '12', '���������', '����2', 150);

delete from Abonement;