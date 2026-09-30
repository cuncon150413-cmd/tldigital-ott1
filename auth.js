const form = document.getElementById("loginForm");
const error = document.getElementById("error");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  error.textContent = "";

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("accounts.json", { cache: "no-store" });
    if (!response.ok) throw new Error("Không tải được accounts.json");

    const data = await response.json();
    const account = data.accounts.find(
      item => item.username === username &&
               item.password === password
    );

    if (!account) {
      error.textContent = "Tài khoản hoặc mật khẩu không đúng.";
      return;
    }

    sessionStorage.setItem("tl_admin_logged_in", "true");
    sessionStorage.setItem("tl_admin_user", account.username);
    location.replace("admin.html");
  } catch (err) {
    console.error(err);
    error.textContent = "Không thể kết nối tới dữ liệu tài khoản.";
  }
});
