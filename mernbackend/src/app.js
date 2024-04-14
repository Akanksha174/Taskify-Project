const express = require("express");
const path = require("path");
const exphbs= require('express-handlebars');
const app = express();
const hbs = require("hbs");

require("./db/conn");

const Register = require("./models/register");
const { json }= require("express");

const port = process.env.PORT || 3000;
const static_path = path.join(__dirname, "../public");
const template_path=path.join(__dirname,"../templates/views");
const partials_path=path.join(__dirname,"../templates/partials");


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(static_path));

app.set("view engine","hbs")
app.set("views",template_path)
hbs.registerPartials(partials_path);

app.get("/", (req, res) => {
    res.render("index"); // Render the index template directly
});

app.get("/about",(req,res)=>{
    res.render("about")
})

app.get("/task",(req,res)=>{
    res.render("task")
})

app.get("/login",(req,res)=>{
    res.render("login")
})

app.get("/register", (req, res) => {
    res.render("register"); // Render the register template directly
});

// Handle registration form submission with POST request
app.post("/register", async (req, res) => {
    try {
        const password=req.body.password;
        const cpassword=req.body.confirmpassword;
        if(password===cpassword){

            const regUser = new Register({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: req.body.password,
            })
            console.log(regUser.firstname, regUser.lastname, regUser.email, regUser.password);

            const registered = await regUser.save();
            console.log("User registered:", registered)
            res.status(201).redirect("/"); // Redirect to the root URL after successful registration

        }else{
            console.log("password do not match");
            res.send("password are not matching");
        }

    } catch (error) {
        console.error("Error saving registration details:", error);
        res.status(400).send("Could not register user. Please try again later.");
    }
});


app.post("/login",async(req,res)=>{
    try{
        const email=req.body.email;
        const password=req.body.password;
        console.log(`${email} and password is ${password}`);
        const useremail =await Register.findOne({email:email});
        if(useremail.password===password){
            res.status(201).render("index");

        }
        else{
            res.send("password are not matching");
        }

    }catch(error){
        res.status(400).send("Invalid email")
    }

})


app.listen(port, () => {
    console.log(`server is running ${port}`);
});
