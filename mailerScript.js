const form = document.querySelector('main > form');
const greeting = document.getElementById('greeting');
const adminForm = document.getElementById("adminForm");


// Function to register new user
function registerNewUser (e) {
   e.preventDefault();
   const name = document.getElementById("name").value;
   const email = document.getElementById("email").value;
   const phone = document.getElementById("phone").value;
   const age = document.getElementById("age").value;
   const location = document.getElementById("location").value;
   const postCode = document.getElementById("postCode").value;


   // Mail body for email to user
   const mailBody = `
      Hi <b>${name}</b>,
      <br>
      <div>Your data has been successfully registered. Thank you.</div>
   `;

   // Sending email to user
   Email.send({
      Host: "smtp.elasticemail.com",
      Username: "rammroy99@gmail.com",
      Password: "23FCA58CBC34041855F04463694414B4426B",
      To: email,
      From: "rammroy99@gmail.com",
      Subject: "Mail from Mailer",
      Body: mailBody,
   }).then((message) => {
      console.log('user response ->', message);
      e.target.reset();
      form.classList.add('hidden');
      greeting.classList.remove('hidden');
      if (!adminForm.classList.contains("hidden")) {
         adminForm.classList.add("hidden");
      }
   });


   // Fetching admin email from local-storage
   const adminEmail = localStorage.getItem("MAILER_ADMIN_EMAIL");

   // Mail body for email to admin
   const adminMailBody = `
      Hey <b>Admin</b>,
      <br>
      &ensp;<b> New user registered</b>
      <div>
         Name : ${name},
         <br>
         Email : ${email},
         <br>
         Mobile number : ${phone},
         <br>
         Age : ${age},
         <br>
         Location : ${location},
         <br>
         Postal Code : ${postCode}
      </div>
   `;

   // Sending email to Admin
   Email.send({
      Host: "smtp.elasticemail.com",
      Username: "rammroy99@gmail.com",
      Password: "23FCA58CBC34041855F04463694414B4426B",
      To: adminEmail || "antu99gayen@gmail.com",
      From: "rammroy99@gmail.com",
      Subject: "Mail from Mailer",
      Body: adminMailBody,
   }).then((msg) => console.log('admin response ->', msg));
}


// Function to change admin email
function changeAdmin() {
   const adminEmail = document.getElementById("adminEmail").value;
   if (adminEmail == ''){
      alert('Please give email id properly to add admin');
   } else {
      localStorage.setItem("MAILER_ADMIN_EMAIL", adminEmail);      
      alert('New admin email added !');
   }
   adminForm.classList.add("hidden");
}


// ***Event Listeners*** //

// Event listener for registration form submit
form.addEventListener("submit", registerNewUser);

// All click event listeners
document.addEventListener('click', function(e){
   const {target} = e;

   if (target.id == "showAdminForm") {      
      adminForm.classList.remove('hidden');
   }
   else if (target.id == "cancelBtn") {      
      adminForm.classList.add('hidden');
   }
   else if (target.id == "addAdminBtn") {
      changeAdmin();
   }
});