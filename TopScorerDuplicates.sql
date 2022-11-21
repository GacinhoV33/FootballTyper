/****** Script for SelectTopNRows command from SSMS  ******/


  ------DELETE
  ------FROM [FootballTyperAPI.Data].[dbo].[TopScorers]

SELECT tp.Name, Count(*), Max(tp.id)
  FROM [FootballTyperAPI.Data].[dbo].[TopScorers] tp
  Group By tp.Name
  HAVING Count(*) > 1
  Order by Count(*) desc



  SELECT TOP (1000) [Id]
      ,[Name]
      ,[Group]
      ,[Goals]
      ,[Assists]
      ,[YellowCards]
      ,[RedCards]
  FROM [FootballTyperAPI.Data].[dbo].[TopScorers]
  Order by Goals desc

  --DELETE FROM [TopScorers]
  --WHERE Id IN (
	 -- SELECT Max(tp.id)
	 -- FROM [FootballTyperAPI.Data].[dbo].[TopScorers] tp
	 -- Group By tp.Name
	 -- HAVING Count(*) > 1)
