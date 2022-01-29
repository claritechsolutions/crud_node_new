const express=require('express');
const app=express();
const Joi = require('joi');
// import bodyParser from 'body-parser'
// app.use(bodyParser.json());    use the json data
app.use(express.json());
let courses=[
    {id:1,name:"course1", age:12},
    {id:2,name:"course2", age:12}    
]
app.get('/',(req,res)=>{
    res.send('Helllo express data');
});
app.get('/api/customer',(req,res)=>{
    res.send([1,2,3]);
});

// pass id in api
app.get('/api/customer/:id',(req,res)=>{
    res.send(req.params.id);
}); 


// query param
app.get('/api/posts/:year/:month',(req,res)=>{
    res.send(req.query);
});

// 1. to get all data 
app.get('/api/courses',(req,res)=>{
    res.send(courses);

});

//2.  to get single data using id
app.get('/api/courses/:id',(req,res)=>{
    const course=courses.find(c=>c.id===parseInt(req.params.id))
    console.log(course);
    if(!course) res.status(404).send("Course Id is not found");
    res.send(course);
    
});


//3.  to insert data using post method 

app.post('/api/courses',(req,res)=>{
  
    const result=validateCourse(req.body)
    console.log(result)
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return
    }
    const course={
        id:courses.length + 1,
        name:req.body.name,
        age:req.body.age
    }
    courses.push(course)
    res.send(course);

});


//4. To update record using put method

app.put('/api/courses/:id',(req,res)=>{
     result=validateCourse(req.body)
    console.log(result)
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return
    }
    const course=courses.find(c=>c.id===parseInt(req.params.id))
    console.log(course);
    if(!course) res.status(404).send("Course Id is not found");
    course.name=req.body.name;
    course.age=req.body.age;
    res.send(course)

});


//5. To delete record using delete method
app.delete('/api/courses/:id',(req,res)=>{
    const course=courses.find(c=>c.id===parseInt(req.params.id))
    console.log(course);
    if(!course) res.status(404).send("Course Id is not found");
    let index=courses.indexOf(course);
    console.log('index',index)
    courses.splice(index,1)
    res.send(course);
})


const port=process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`listening  on port ${port}...`)
})

function validateCourse(course){
    const schema = Joi.object({
        name: Joi.string()
            .min(3)  
            .required(),
        age: Joi.number()
    })
    return schema.validate(course)
}