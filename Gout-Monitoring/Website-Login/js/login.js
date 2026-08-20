import {
    signInWithEmailAndPassword,
    setPersistence,
    browserLocalPersistence,
    browserSessionPersistence,
    sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-auth.js";


import {
    auth
} from "./firebase-config.js";



const loginForm =
    document.getElementById("loginForm");


const emailInput =
    document.getElementById("email");


const passwordInput =
    document.getElementById("password");


const rememberMe =
    document.getElementById("rememberMe");


const loginButton =
    document.getElementById("loginButton");


const message =
    document.getElementById("message");


const forgotPassword =
    document.getElementById("forgotPassword");



/* =========================
   MESSAGE FUNCTION
========================= */

function showMessage(text, type) {

    message.textContent = text;

    message.className = type;

}



/* =========================
   LOGIN
========================= */

loginForm.addEventListener(
    "submit",
    async (event) => {

        event.preventDefault();


        const email =
            emailInput.value.trim();


        const password =
            passwordInput.value;



        if (!email || !password) {

            showMessage(
                "Please enter your email and password.",
                "error"
            );

            return;

        }



        loginButton.disabled = true;

        loginButton.textContent =
            "Logging in...";


        showMessage("", "");



        try {


            /* =========================
               LOGIN PERSISTENCE
            ========================= */

            await setPersistence(

                auth,

                rememberMe.checked
                    ? browserLocalPersistence
                    : browserSessionPersistence

            );



            /* =========================
               FIREBASE LOGIN
            ========================= */

            const userCredential =
                await signInWithEmailAndPassword(
                    auth,
                    email,
                    password
                );



            const user =
                userCredential.user;



            console.log(
                "Logged in UID:",
                user.uid
            );



            console.log(
                "Logged in Email:",
                user.email
            );



            /* =========================
               SUCCESS
            ========================= */

            showMessage(
                "Login successful! Redirecting...",
                "success"
            );


            loginButton.textContent =
                "Logged In";



            /* =========================
               REDIRECT
            ========================= */

            setTimeout(() => {

                window.location.href =
                    "home.html";

            }, 1000);


        }


        catch (error) {


            console.error(
                "Login error:",
                error
            );



            /* =========================
               FIREBASE ERRORS
            ========================= */

            if (

                error.code ===
                "auth/invalid-credential"

                ||

                error.code ===
                "auth/wrong-password"

                ||

                error.code ===
                "auth/user-not-found"

            ) {

                showMessage(
                    "Incorrect email or password.",
                    "error"
                );

            }


            else if (

                error.code ===
                "auth/invalid-email"

            ) {

                showMessage(
                    "Please enter a valid email address.",
                    "error"
                );

            }


            else if (

                error.code ===
                "auth/too-many-requests"

            ) {

                showMessage(
                    "Too many login attempts. Please try again later.",
                    "error"
                );

            }


            else if (

                error.code ===
                "auth/network-request-failed"

            ) {

                showMessage(
                    "Network error. Check your internet connection.",
                    "error"
                );

            }


            else {

                showMessage(
                    "Login failed. Please try again.",
                    "error"
                );

            }



            loginButton.disabled =
                false;


            loginButton.textContent =
                "Login";

        }

    }

);



/* =========================
   FORGOT PASSWORD
========================= */

forgotPassword.addEventListener(
    "click",
    async (event) => {

        event.preventDefault();


        const email =
            emailInput.value.trim();



        if (!email) {

            showMessage(
                "Enter your email address first.",
                "error"
            );


            emailInput.focus();


            return;

        }



        try {


            await sendPasswordResetEmail(
                auth,
                email
            );


            showMessage(
                "Password reset email sent. Check your inbox.",
                "success"
            );


        }


        catch (error) {


            console.error(
                "Password reset error:",
                error
            );


            if (

                error.code ===
                "auth/invalid-email"

            ) {

                showMessage(
                    "Please enter a valid email address.",
                    "error"
                );

            }


            else {

                showMessage(
                    "Unable to send password reset email.",
                    "error"
                );

            }

        }

    }

);