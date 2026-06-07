const emailInput = document.getElementById("user-email");
const passwordInput = document.getElementById("user-password");
const signInBtn = document.getElementById("signInButton");
const errorMsg = document.getElementById("errorMsg");

// 建立 Noctra的會員總名單
let noctraUsers = JSON.parse(localStorage.getItem("noctraUsers")) || [];

// 加入Demo用帳號
const demoUser = {
    name: "Bill",
    email: "s3618222@gmail.com",
    password: "123"
};

// 檢查 demo 帳號是否已存在，沒有就加入總清單中
const hasDemoUser = noctraUsers.some((user) => {
    return user.email === demoUser.email;
});

if (!hasDemoUser) {
    noctraUsers.push(demoUser);

    localStorage.setItem("noctraUsers", JSON.stringify(noctraUsers));
}

//登入訊息 簡易Validation
signInBtn.addEventListener("click", () => {
    errorMsg.textContent = ""; //清空錯誤訊息，避免前次訊息殘留

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    //trim()可以去除輸入內容字串的前後空白，把前後空白移除後，再做輸入判斷

    if (!email || !password) {
        errorMsg.textContent = "請輸入電子郵件與密碼";
        return;
    }

    if (!email.includes("@")) {
        errorMsg.textContent = "請輸入有效的電子郵件格式";
        return;
    }

    //從會員清單中，找出符合輸入信箱與密碼的會員資訊
    const matchedUser = noctraUsers.find((user) => {
        return user.email === email && user.password === password;
    });

    //如果沒找到，看是單純密碼輸入錯誤，還是信箱根本沒註冊過
    if (!matchedUser) {
        const hasEmail = noctraUsers.find((user) => {
            return user.email === email;
        });

        if (hasEmail) {
            errorMsg.textContent = "密碼輸入錯誤";
            return;
        } else {
            errorMsg.textContent = "此信箱尚未註冊會員";
            return;
        };
    }

    //登入成功時，就更新、覆寫目前使用者帳號資訊
    localStorage.setItem("currentNoctraUser", JSON.stringify({
        name: matchedUser.name,
        email: matchedUser.email
    })
    );

    //接著跳轉至學習中心首頁
    window.location.href = "../Post-learningCenter.html";
});