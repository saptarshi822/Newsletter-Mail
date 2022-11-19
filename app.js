const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const http = require('https');
const port = 3000
app.listen(process.env.PORT || 3000,()=>{
    console.log('listening on port 3000');
});
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.get('/', function(req, res){
    res.sendFile(__dirname+'/signup.html');

});
app.post('/',function(req,res){
    var firstName=req.body.first;
    var lastName=req.body.last;
    var email=req.body.email;
    var data = {
        members : [
        {
            email_address : email,
            status : "subscribed",
            merge_fields : {
                Fname : firstName,
                Lname : lastName
            }
        }
        ]
    
    }
    var jsonData = JSON.stringify(data)
    const url = "https://us10.api.mailchimp.com/3.0/lists/3f213edcf8"
    const options = {
        method : "POST",
        auth : "sap1:7e60b3ae3e4f4398f1f3f40808d36359-us10"
    }

    const request=http.request(url, options ,function(response){
        response.on("data", function(data){
            console.log(JSON.parse(data));
            if(response.statusCode==200){
                res.sendFile(__dirname+'/success.html');
            }
            else{
                res.sendFile(__dirname+'/failure.html');
            }
        });

}); 
    
    request.write(jsonData);
    request.end();

});
app.post('/failure',(req,res) => {
    res.redirect('/');
});
//api: 7e60b3ae3e4f4398f1f3f40808d36359-us10
//audience:3f213edcf8

