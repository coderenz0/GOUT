import {
    createUserWithEmailAndPassword,
    updateProfile
} from
    "https://www.gstatic.com/firebasejs/12.17.0/firebase-auth.js";


import {
    doc,
    setDoc,
    serverTimestamp
} from
    "https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js";


import {
    auth,
    db
} from "./firebase-config.js";



const form =
    document.getElementById("registerForm");


const message =
    document.getElementById("message");


const registerButton =
    document.getElementById("registerButton");



form.addEventListener("submit", async (event) => {

    event.preventDefault();


    const fullName =
        document.getElementById("fullname").value.trim();


    const email =
        document.getElementById("email").value.trim();


    const password =
        document.getElementById("password").value;


    const confirmPassword =
        document.getElementById("confirmPassword").value;



    /* =========================
       CHECK PASSWORD
    ========================= */

    if (password !== confirmPassword) {

        message.textContent =
            "Passwords do not match.";

        message.className = "error";

        return;
    }



    /* =========================
       CHECK PASSWORD LENGTH
    ========================= */

    if (password.length < 6) {

        message.textContent =
            "Password must be at least 6 characters.";

        message.className = "error";

        return;
    }



    registerButton.disabled = true;

    registerButton.textContent =
        "Creating Account...";


    message.textContent = "";



    try {


        /* =========================
           CREATE FIREBASE ACCOUNT
        ========================= */

        const userCredential =
            await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );


        const user =
            userCredential.user;



        /* =========================
           SAVE DISPLAY NAME
        ========================= */

        await updateProfile(user, {

            displayName: fullName

        });



        /* =========================
           CREATE FIRESTORE USER
           DOCUMENT
        ========================= */

        await setDoc(

            doc(db, "users", user.uid),

            {

                uid: user.uid,

                fullName: fullName,

                email: email,

                createdAt: serverTimestamp()

            }

        );



        /* =========================
           SUCCESS
        ========================= */

        message.textContent =
            "Account created successfully!";

        message.className =
            "success";


        registerButton.textContent =
            "Account Created";


        console.log(
            "Firebase UID:",
            user.uid
        );


        console.log(
            "User saved to Firestore."
        );



        /* =========================
           GO TO HOME
        ========================= */

        setTimeout(() => {

            window.location.href =
                "home.html";

        }, 1500);


    }


    catch (error) {


        console.error(
            "Registration error:",
            error
        );


        /* =========================
           ERROR HANDLING
        ========================= */

        if (
            error.code ===
            "auth/email-already-in-use"
        ) {

            message.textContent =
                "This email is already registered.";

        }

        else if (
            error.code ===
            "auth/invalid-email"
        ) {

            message.textContent =
                "Invalid email address.";

        }

        else if (
            error.code ===
            "auth/weak-password"
        ) {

            message.textContent =
                "Password is too weak.";

        }

        else {

            message.textContent =
                "Registration failed: " +
                error.message;

        }


        message.className =
            "error";


        registerButton.disabled =
            false;


        registerButton.textContent =
            "Create Account";

    }

});