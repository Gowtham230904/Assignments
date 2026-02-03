use TestDb;

db.createCollection('images');

db.createCollection('students');

db.images.insertMany(
[{name:'Sparrow',ext:'jpg',category:'birds',quality:'H',price:2000},
 {name:'Eagle',ext:'png',category:'birds',quality:'M',price:1000},
 {name:'HondaCity',ext:'bmp',category:'cars',quality:'L',price:800},
 {name:'Mango',ext:'jpg',category:'fruits',quality:'H',price:5600},
 {name:'Banana',ext:'png',category:'fruits',quality:'H',price:6000},
 {name:'Maruti800',ext:'jpg',category:'cars',quality:'M',price:2700},
 {name:'Duster',ext:'bmp',category:'cars',quality:'H',price:8400},
 {name:'i20',ext:'png',category:'cars',quality:'M',price:4300},
 {name:'Peacock',ext:'jpg',category:'birds',quality:'L',price:2200},
 {name:'Apple',ext:'bmp',category:'fruits',quality:'L',price:1750}
 
]);


//-----------------------------------------------------------------
db.students.insertMany(
[{rollNo:10,name:'Mahesh',dob:new Date(Date.UTC(2000,1,20)),email:'mahesh@gmail.com',
    courses:[
                {cid:100,name:'MBA',fee:50000},
                {cid:101,name:'FrenchLang',fee:10000}
            ]    
},
{rollNo:11,name:'Gita',dob:new Date(Date.UTC(2010,4,13)),email:'gita@gmail.com',
    courses:[
                {cid:102,name:'Btech',fee:60000},
                {cid:101,name:'FrenchLang',fee:10000}
            ]    
},

{rollNo:12,name:'Suresh',dob:new Date(Date.UTC(2002,6,25)),email:'suresh@yahoo.com',
    courses:[
                {cid:103,name:'MCA',fee:45000},
                {cid:104,name:'Painting',fee:30000}
            ] 
},
{rollNo:13,name:'Anand',dob:new Date(Date.UTC(2010,4,13)),email:'gita@gmail.com',
    courses:[
               { cid: 102, name: 'Btech', fee: 60000 },
               { cid: 104, name: 'Painting', fee: 30000 }
            ] 
}
]);

db.students.find();

// Question 1
db.images.find({ext:{$eq:'png'}},{}).count();

// Question 2
db.images.aggregate([{$group:{_id:'$quality', TotalSum:{$sum:'$price'}}},{$project:{TotalSum:1}},{$match:{_id:{$eq:'M'}}}]);

// Question 3
db.images.aggregate([{$group:{_id:'$ext', TotalPrice:{$sum:'$price'}}},{$project:{_id:1, TotalPrice:1}}]);

// Question 4
db.images.find({quality:{$eq:'L'}},{}).sort({price:-1}).limit(1);

// Question 5
db.images.aggregate([{$group:{_id:'$ext', TotCount:{$sum:1}}},{$project:{_id:1, TotCount:1}}]);

// Question 6
db.images.aggregate([{$project:{_id:0, name:1, ext:1, quality:1, price:1}},{$sort:{price:-1}}]);

// Question 7
db.images.find({$or:[{category:'birds'}, {category:'cars'}]},{_id:0, name:1});

// Question 8
db.images.aggregate([{$group:{_id:'$category', SumOfPrice:{$sum:'$price'}}},{$project:{category:'$_id', SumOfPrice:1}},{$match:{SumOfPrice:{$gt:10000}}}]);

// Question 9
db.students.find({name:{$eq:'Mahesh'}},{_id:0, BirthMonth:{$month:'$dob'}, name:1});

// Question 10
db.students.find({name:{$eq:'Anand'}},{_id:0, name:1, BirthYear:{$year:'$dob'}});

//Question 11
db.students.find({$or:[{name:'Mahesh'}, {name:'Gita'}]},{_id:0, email:1});

//Question 12
db.students.aggregate([{$unwind:'$courses'},{$group:{_id:'$name', TotFee:{$sum:'$courses.fee'}}},{$match:{TotFee:{$gte:50000}}},{$project:{_id:0, Name:'$_id'}}]);

//Question 13
db.students.find();
db.students.aggregate([{$unwind:'$courses'},{$match:{$or:[{name:'Suresh'},{name:'Anand'}]}},{$project:{_id:0, Name:'$name', Course:'$courses.name'}}]);

//Question 14
db.students.aggregate([{$unwind:'$courses'},{$match:{'courses.name':'Painting'}},{$project:{_id:0, name:1}}]);

//Question 15
db.students.aggregate([{$unwind:'$courses'},{$group:{_id:'$name', TotFeesPaid:{$sum:'$courses.fee'}}},{$project:{_id:0, Name:'$_id', TotFeesPaid:1}}]);