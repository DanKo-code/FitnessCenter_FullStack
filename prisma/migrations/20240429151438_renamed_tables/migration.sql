/*
  Warnings:

  - You are about to drop the `AbonementsService` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Couche` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CouchesService` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[AbonementsService] DROP CONSTRAINT [FK_AbonementsServices_Abonements_AbonementsId];

-- DropForeignKey
ALTER TABLE [dbo].[AbonementsService] DROP CONSTRAINT [FK_AbonementsServices_Services_ServicesId];

-- DropForeignKey
ALTER TABLE [dbo].[Comment] DROP CONSTRAINT [FK_Comments_Couches_CouchesId];

-- DropForeignKey
ALTER TABLE [dbo].[CouchesService] DROP CONSTRAINT [FK_CouchesServices_Couches_CouchesId];

-- DropForeignKey
ALTER TABLE [dbo].[CouchesService] DROP CONSTRAINT [FK_CouchesServices_Services_ServicesId];

-- DropTable
DROP TABLE [dbo].[AbonementsService];

-- DropTable
DROP TABLE [dbo].[Couche];

-- DropTable
DROP TABLE [dbo].[CouchesService];

-- CreateTable
CREATE TABLE [dbo].[AbonementService] (
    [AbonementsId] UNIQUEIDENTIFIER NOT NULL,
    [ServicesId] UNIQUEIDENTIFIER NOT NULL,
    CONSTRAINT [PK_AbonementsServices] PRIMARY KEY CLUSTERED ([AbonementsId],[ServicesId])
);

-- CreateTable
CREATE TABLE [dbo].[Coach] (
    [Id] UNIQUEIDENTIFIER NOT NULL,
    [Name] NVARCHAR(max) NOT NULL,
    [Description] NVARCHAR(max) NOT NULL,
    [Photo] NVARCHAR(max) NOT NULL CONSTRAINT [DF__Couches__Photo__59FA5E80] DEFAULT 'N''',
    CONSTRAINT [PK_Couches] PRIMARY KEY CLUSTERED ([Id])
);

-- CreateTable
CREATE TABLE [dbo].[CoachService] (
    [CouchesId] UNIQUEIDENTIFIER NOT NULL,
    [ServicesId] UNIQUEIDENTIFIER NOT NULL,
    CONSTRAINT [PK_CouchesServices] PRIMARY KEY CLUSTERED ([CouchesId],[ServicesId])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [IX_AbonementsServices_ServicesId] ON [dbo].[AbonementService]([ServicesId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [IX_CouchesServices_ServicesId] ON [dbo].[CoachService]([ServicesId]);

-- AddForeignKey
ALTER TABLE [dbo].[AbonementService] ADD CONSTRAINT [FK_AbonementsServices_Abonements_AbonementsId] FOREIGN KEY ([AbonementsId]) REFERENCES [dbo].[Abonement]([Id]) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[AbonementService] ADD CONSTRAINT [FK_AbonementsServices_Services_ServicesId] FOREIGN KEY ([ServicesId]) REFERENCES [dbo].[Service]([Id]) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[CoachService] ADD CONSTRAINT [FK_CouchesServices_Couches_CouchesId] FOREIGN KEY ([CouchesId]) REFERENCES [dbo].[Coach]([Id]) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[CoachService] ADD CONSTRAINT [FK_CouchesServices_Services_ServicesId] FOREIGN KEY ([ServicesId]) REFERENCES [dbo].[Service]([Id]) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Comment] ADD CONSTRAINT [FK_Comments_Couches_CouchesId] FOREIGN KEY ([CouchesId]) REFERENCES [dbo].[Coach]([Id]) ON DELETE CASCADE ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
