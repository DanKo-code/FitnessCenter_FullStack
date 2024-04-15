INSERT INTO Abonement(id, Title, Validity, VisitingTime, Photo, Price)
VALUES (NEWID(), 'Vip', '6', 'пн-вс', '*', 100),
		(NEWID(), 'Standard', '3', 'пн-пт', 'фото1', 50),
		(NEWID(), 'Premium', '12', 'ежедневно', 'фото2', 150);

delete from Abonement;