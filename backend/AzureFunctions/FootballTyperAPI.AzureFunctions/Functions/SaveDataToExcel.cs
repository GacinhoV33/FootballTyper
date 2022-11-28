using Azure.Storage.Blobs;
using FootballTyperAPI.Models;
using Microsoft.Azure.WebJobs;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Logging;
using OfficeOpenXml;
using System;
using System.Collections.Generic;
using System.IO;

namespace FootballTyperAPI.AzureFunctions.Functions
{
    public class SaveDataToExcel
    {
        [FunctionName("SaveDataToExcel")]
        //public void Run([TimerTrigger("0 * * * * *")] TimerInfo myTimer, ILogger log)
        public void Run([TimerTrigger("0 1 11,14,17,20 * * *")] TimerInfo myTimer, ILogger log)
        {
            log.LogInformation($"-------------------------------------------------------------------------");
            log.LogInformation($"Execution date: {DateTime.Now}");
            log.LogInformation($"Starting execution of: SaveDataToExcel");

            try
            {
                ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
                var fileName = $"BETS_{DateTime.Now.ToString("dd_M_yyyy__HH_mm")}.xlsx";
                var file = new FileInfo(Path.Combine(Path.GetTempPath(), fileName));
                using (var package = new ExcelPackage(file))
                {
                    var rows = GetDateFromQuery();
                    var ws = package.Workbook.Worksheets.Add("Bets");
                    var range = ws.Cells["A1"].LoadFromCollection(rows, true);
                    range.AutoFitColumns();
                    package.Save();

                    string containerName = "bets-data-copy";
                    var blobConnectionString = Environment.GetEnvironmentVariable("FootballTyperStorageAccout");
                    var containerClient = new BlobContainerClient(blobConnectionString, containerName);
                    BlobClient blobClient = containerClient.GetBlobClient(fileName);

                    using (var stream = package.File.OpenRead())
                    {
                        var result = blobClient.Upload(stream, true);
                    }
                }
                file.Delete();
            }
            catch (Exception ex)
            {
                log.LogError(ex.Message);
                log.LogError(ex.InnerException.ToString());
            }

            log.LogInformation($"Ending execution of: SaveDataToExcel");
            log.LogInformation($"-------------------------------------------------------------------------");
        }

        public List<BetExcelData> GetDateFromQuery()
        {
            var sqlConnectionString = Environment.GetEnvironmentVariable("SqlConnectionString");
            var betExcelRows = new List<BetExcelData>();
            using (SqlConnection conn = new SqlConnection(sqlConnectionString))
            {
                //string oString = "SELECT \r\n\tb.[Id] as BetId\r\n\t,m.Date as MatchDate\r\n\t,m.[Group]\r\n\t,m.MatchNumber\r\n\t,m.Stage\r\n\t,th.Name as HomeTeamName\r\n\t,m.HomeTeamScore\r\n\t,[HomeTeamScoreBet]\r\n\t,ta.Name as AwayTeamName\r\n\t,m.AwayTeamScore\r\n\t,[AwayTeamScoreBet]\r\n\t,[MatchId]\r\n\t,u.FullName\r\n\t,[BetDate]\r\n\t,[BetResult]\r\n\r\nFROM [Bets] b\r\nLEFT JOIN [Match] m ON m.Id = b.MatchId\r\nLEFT JOIN [Teams] ta ON ta.Id = m.AwayTeamId\r\nLEFT JOIN [Teams] th ON th.Id = m.HomeTeamId\r\nLEFT JOIN [TyperUser] u ON u.Username = b.BettorUserName\r\nWHERE m.Date <= GetDate()\r\nORDER BY MatchDate DESC, BetDate DESC";
                string queryString = "SELECT " +
                    "b.[Id] as BetId" +
                    ",m.Date as MatchDate" +
                    ",m.[Group]" +
                    ",m.MatchNumber" +
                    ",m.Stage" +
                    ",th.Name as HomeTeamName" +
                    ",m.HomeTeamScore" +
                    ",[HomeTeamScoreBet]" +
                    ",ta.Name as AwayTeamName" +
                    ",m.AwayTeamScore" +
                    ",[AwayTeamScoreBet]" +
                    ",[MatchId]" +
                    ",u.FullName" +
                    ",[BetDate]" +
                    ",[BetResult] " +
                    "FROM [Bets] b " +
                    "LEFT JOIN [Match] m ON m.Id = b.MatchId " +
                    "LEFT JOIN [Teams] ta ON ta.Id = m.AwayTeamId " +
                    "LEFT JOIN [Teams] th ON th.Id = m.HomeTeamId " +
                    "LEFT JOIN [TyperUser] u ON u.Username = b.BettorUserName " +
                    "WHERE m.Date <= dateadd(hour, 1, GetDate()) " +
                    "ORDER BY MatchDate DESC, BetDate DESC";

                SqlCommand oCmd = new SqlCommand(queryString, conn);
                conn.Open();
                using (SqlDataReader oReader = oCmd.ExecuteReader())
                {
                    while (oReader.Read())
                    {
                        betExcelRows.Add(new BetExcelData
                        {
                            BetId = (int)oReader["BetId"],
                            MatchDate = ((DateTime)oReader["MatchDate"]).ToString("dd-M-yyyy HH:mm:ss"),
                            Group = ConvertFromDBVal<string>(oReader["Group"]),
                            MatchNumber = (int)oReader["MatchNumber"],
                            Stage = (int)oReader["Stage"],
                            HomeTeamName = ConvertFromDBVal<string>(oReader["HomeTeamName"]),
                            HomeTeamScore = (int)oReader["HomeTeamScore"],
                            HomeTeamScoreBet = (int)oReader["HomeTeamScoreBet"],
                            AwayTeamName = ConvertFromDBVal<string>(oReader["AwayTeamName"]),
                            AwayTeamScore = (int)oReader["AwayTeamScore"],
                            AwayTeamScoreBet = (int)oReader["AwayTeamScoreBet"],
                            MatchId = (int)oReader["MatchId"],
                            FullName = ConvertFromDBVal<string>(oReader["FullName"]),
                            BetDate = ((DateTime)oReader["BetDate"]).ToString("dd-M-yyyy HH:mm:ss"),
                            BetResult = ConvertFromDBVal<int>(oReader["BetResult"])
                        });
                    }
                    conn.Close();
                }
            }
            return betExcelRows;
        }

        public static T ConvertFromDBVal<T>(object obj)
        {
            if (obj == null || obj == DBNull.Value)
            {
                return default(T);
            }
            else
            {
                return (T)obj;
            }
        }
    }
}
