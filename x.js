if (!document.cookie.includes("logged")) {
    console.log("hello");
    document.cookie = "logged=true; path=/; max-age=31536000";
}
