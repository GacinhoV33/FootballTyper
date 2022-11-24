namespace FootballTyperAPI.Common
{
    public class HttpRequestHelper
    {
        public static HttpResponseMessage Get(string path)
        {
            using var client = new HttpClient();
            client.DefaultRequestHeaders.Add("x-functions-key", Environment.GetEnvironmentVariable("FunctionKey"));
            client.BaseAddress = new Uri(Environment.GetEnvironmentVariable("HostUrl"));
            return client.GetAsync(path).GetAwaiter().GetResult();
        }
    }
}
