using Microsoft.AspNetCore.Antiforgery;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllersWithViews();

// Sessionプロバイダを有効
builder.Services.AddDistributedMemoryCache();
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromSeconds(10);
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
});

builder.Services.AddAntiforgery(options =>
{
    // リクエストヘッダにX-CSRF-TOKENを要求する
    options.HeaderName = "X-CSRF-TOKEN";
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}
    
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.UseSession();

// XSRFトークンをCookieにセットする
var antiforgery = app.Services.GetRequiredService<IAntiforgery>();
app.Use((context, next) =>
{
    var requestPath = context.Request.Path.Value;
    if (string.Equals(requestPath, "/token", StringComparison.OrdinalIgnoreCase))
    {
        var tokenSet = antiforgery.GetAndStoreTokens(context);
        context.Response.Cookies.Append("XSRF-TOKEN", tokenSet.RequestToken!,
            new CookieOptions { HttpOnly = false });
    }

    return next(context);
});


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");;

app.Run();

