using Microsoft.AspNetCore.Mvc;

namespace mbo.Controllers;

[ApiController]
[Route("[controller]")]
public class TokenController : ControllerBase
{
    private readonly ILogger<WeatherForecastController> _logger;

    public TokenController(ILogger<WeatherForecastController> logger)
    {
        _logger = logger;
    }

    Dictionary<string, string> res = new Dictionary<string, string>() { { "prosess", "tokenset" }};

    [HttpGet]
    public Dictionary<string, string> Get()
    {
        return res;
    }
}

