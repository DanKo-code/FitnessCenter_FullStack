BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Abonement] (
    [Id] UNIQUEIDENTIFIER NOT NULL,
    [Title] NVARCHAR(max),
    [Validity] NVARCHAR(max),
    [VisitingTime] NVARCHAR(max),
    [Photo] NVARCHAR(max),
    [Price] INT,
    CONSTRAINT [PK_Abonements] PRIMARY KEY CLUSTERED ([Id])
);

-- CreateTable
CREATE TABLE [dbo].[AbonementsService] (
    [AbonementsId] UNIQUEIDENTIFIER NOT NULL,
    [ServicesId] UNIQUEIDENTIFIER NOT NULL,
    CONSTRAINT [PK_AbonementsServices] PRIMARY KEY CLUSTERED ([AbonementsId],[ServicesId])
);

-- CreateTable
CREATE TABLE [dbo].[Client] (
    [Id] UNIQUEIDENTIFIER NOT NULL,
    [FirstName] NVARCHAR(max) NOT NULL,
    [LastName] NVARCHAR(max) NOT NULL,
    [Email] NVARCHAR(max) NOT NULL,
    [Role] INT NOT NULL,
    [Password] NVARCHAR(max) NOT NULL,
    [Photo] NVARCHAR(max) CONSTRAINT [DF__Clients__Photo__625A9A57] DEFAULT 'N''',
    CONSTRAINT [PK_Clients] PRIMARY KEY CLUSTERED ([Id])
);

-- CreateTable
CREATE TABLE [dbo].[Comment] (
    [Id] UNIQUEIDENTIFIER NOT NULL,
    [CommentBody] NVARCHAR(max) NOT NULL,
    [ClientsId] UNIQUEIDENTIFIER NOT NULL,
    [CouchesId] UNIQUEIDENTIFIER NOT NULL,
    CONSTRAINT [PK_Comments] PRIMARY KEY CLUSTERED ([Id])
);

-- CreateTable
CREATE TABLE [dbo].[Couche] (
    [Id] UNIQUEIDENTIFIER NOT NULL,
    [Name] NVARCHAR(max) NOT NULL,
    [Description] NVARCHAR(max) NOT NULL,
    [Photo] NVARCHAR(max) NOT NULL CONSTRAINT [DF__Couches__Photo__59FA5E80] DEFAULT 'N''',
    CONSTRAINT [PK_Couches] PRIMARY KEY CLUSTERED ([Id])
);

-- CreateTable
CREATE TABLE [dbo].[CouchesService] (
    [CouchesId] UNIQUEIDENTIFIER NOT NULL,
    [ServicesId] UNIQUEIDENTIFIER NOT NULL,
    CONSTRAINT [PK_CouchesServices] PRIMARY KEY CLUSTERED ([CouchesId],[ServicesId])
);

-- CreateTable
CREATE TABLE [dbo].[Order] (
    [Id] UNIQUEIDENTIFIER NOT NULL,
    [AbonementsId] UNIQUEIDENTIFIER,
    [ClientsId] UNIQUEIDENTIFIER,
    [Status] INT NOT NULL CONSTRAINT [DF__Orders__Status__5AEE82B9] DEFAULT 0,
    CONSTRAINT [PK_Orders] PRIMARY KEY CLUSTERED ([Id])
);

-- CreateTable
CREATE TABLE [dbo].[refresh_sessions] (
    [id] UNIQUEIDENTIFIER NOT NULL,
    [user_id] UNIQUEIDENTIFIER NOT NULL,
    [refresh_token] VARCHAR(400) NOT NULL,
    [finger_print] VARCHAR(32) NOT NULL,
    CONSTRAINT [PK__refresh___3213E83F1567B902] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Service] (
    [Id] UNIQUEIDENTIFIER NOT NULL,
    [Title] NVARCHAR(max),
    [Phote] NVARCHAR(max) CONSTRAINT [DF__Services__Phote__3B40CD36] DEFAULT 'N''',
    CONSTRAINT [PK_Services] PRIMARY KEY CLUSTERED ([Id])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [IX_AbonementsServices_ServicesId] ON [dbo].[AbonementsService]([ServicesId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [IX_Comments_ClientsId] ON [dbo].[Comment]([ClientsId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [IX_Comments_CouchesId] ON [dbo].[Comment]([CouchesId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [IX_CouchesServices_ServicesId] ON [dbo].[CouchesService]([ServicesId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [IX_Orders_AbonementsId] ON [dbo].[Order]([AbonementsId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [IX_Orders_ClientsId] ON [dbo].[Order]([ClientsId]);

-- AddForeignKey
ALTER TABLE [dbo].[AbonementsService] ADD CONSTRAINT [FK_AbonementsServices_Abonements_AbonementsId] FOREIGN KEY ([AbonementsId]) REFERENCES [dbo].[Abonement]([Id]) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[AbonementsService] ADD CONSTRAINT [FK_AbonementsServices_Services_ServicesId] FOREIGN KEY ([ServicesId]) REFERENCES [dbo].[Service]([Id]) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Comment] ADD CONSTRAINT [FK_Comments_Clients_ClientsId] FOREIGN KEY ([ClientsId]) REFERENCES [dbo].[Client]([Id]) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Comment] ADD CONSTRAINT [FK_Comments_Couches_CouchesId] FOREIGN KEY ([CouchesId]) REFERENCES [dbo].[Couche]([Id]) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[CouchesService] ADD CONSTRAINT [FK_CouchesServices_Couches_CouchesId] FOREIGN KEY ([CouchesId]) REFERENCES [dbo].[Couche]([Id]) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[CouchesService] ADD CONSTRAINT [FK_CouchesServices_Services_ServicesId] FOREIGN KEY ([ServicesId]) REFERENCES [dbo].[Service]([Id]) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Order] ADD CONSTRAINT [FK_Orders_Abonements_AbonementsId] FOREIGN KEY ([AbonementsId]) REFERENCES [dbo].[Abonement]([Id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Order] ADD CONSTRAINT [FK_Orders_Clients_ClientsId] FOREIGN KEY ([ClientsId]) REFERENCES [dbo].[Client]([Id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[refresh_sessions] ADD CONSTRAINT [FK__refresh_s__user___4A8310C6] FOREIGN KEY ([user_id]) REFERENCES [dbo].[Client]([Id]) ON DELETE CASCADE ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
