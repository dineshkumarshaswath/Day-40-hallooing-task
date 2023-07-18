
//express intialization
const express = require("express")

const app = express()

//json middleware
app.use(express.json())

//hall rough data

const hallstatus = [{
    id: 1,
    roomName: 'Double',
    numberofSeats: 110,
    price: '2000',
    amenities: ['ac', 'beverages', 'chairs'],
    isBooked: true,
    customerName: 'varma',
    date: '2-06-2023',
    startTime: '2-06-2023 9:00AM',
    endTime: '3-06-2023 9:00AM',
    roomId: 1
},
{
    id: 2,
    roomName: 'Suite',
    numberofSeats: 150,
    price: '3000',
    amenities: ['stage', 'ac', 'beverages', 'chairs'],
    isBooked: true,
    customerName: 'Gopal',
    date: '6-06-2023',
    startTime: '6-06-2023 9:00AM',
    endTime: '7-06-2023 9:00AM',
    roomId: 2
},
{
    id: 3,
    roomName: 'Murphy',
    numberofSeats: 200,
    price: '4000',
    amenities: ['stage', 'ac', 'beverages', 'chairs', 'sofa'],
    isBooked: true,
    customerName: 'Suresh',
    date: '11-06-2023',
    startTime: '11-06-2023 6:00AM',
    endTime: '12-06-2023 6:00AM',
    roomId: 3
},
{
    id: 4,
    roomName: 'Murphy',
    numberofSeats: 200,
    price: '4000',
    amenities: ['ac', 'beverages', 'chairs', 'sofa'],
    isBooked: false,
    customerName: '',
    date: '',
    startTime: '',
    endTime: '',
    roomId: ""
},
{
    id: 5,
    roomName: 'Double',
    numberofSeats: 110,
    price: '2000',
    amenities: ['stage', 'ac', 'beverages', 'chairs'],
    isBooked: false,
    customerName: '',
    date: '',
    startTime: '',
    endTime: '',
    roomId: ""
},

{
    id: 6,
    roomName: 'Suite',
    numberofSeats: 150,
    price: '3000',
    amenities: ['stage', 'ac', 'beverages', 'chairs'],
    isBooked: false,
    customerName: '',
    date: '',
    startTime: '',
    endTime: '',
    roomId: ''
}



]

//checking the server
app.get("/", (req, res) => {
    try {
        return res.status(200).json({ message: "Server condition would be fine" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error" })


    }


})



//1. Api for the create room with these details

app.post("/createroom", (req, res) => {

    try {
        const newhall = {
            id: +hallstatus.length + 1,
            roomName: req.body.roomName,
            numberofSeats: req.body.numberofSeats,
            price: req.body.price,
            amenities: req.body.amenities,
            isBooked: req.body.isBooked,
            customerName: '',
            date: '',
            startTime: '',
            endTime: '',
            roomId: ''
        }

        const newroom = hallstatus.push(newhall)
        return res.status(200).json({ message: " room created successfully ", newroom, newhall })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error" })

    }



})

//2. Api for the book the room with these details 

app.put("/bookingroom/:id", (req, res) => {
    try {
        const { id } = req.params
        if (id >= 7) {
            return res.status(400).json({ message: "The room not available" })
        }

        const halledit = hallstatus.find((hall) => hall.id == id)
        // console.log(halledit);

        if (halledit.isBooked == true) {
            return res.status(400).json({ message: "The room was already booked" })
        }
        else {
            halledit.isBooked = true,
                halledit.customerName = req.body.customerName,
                halledit.date = req.body.date,
                halledit.startTime = req.body.startTime,
                halledit.endTime = req.body.endTime,
                halledit.roomId = req.params.id

            //  console.log(halledit)

            return res.status(200).json({ message: "successfully booked your room", halledit })

        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error" })
    }

})

//3) List all the room with booked data

app.get("/rooms", (req, res) => {

    try {
        const { roomname, isbooked } = req.query
        if (roomname) {
            const filterhall = hallstatus.filter((hall) => hall.roomName == roomname)

            return res.status(200).json({ message: "successfully got the room details", filterhall })
        }
        else if (isbooked) {
            const hallAvailable = hallstatus.filter((hall) => hall.isBooked == isbooked)

            return res.status(200).json({ message: "successfully got the room details", hallAvailable })
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error" })
    }




})

//4.  List all the customers with booked data with these details


app.get("/customer", (req, res) => {
    try {
        const isbooked = true;
        const customerdetails = hallstatus.filter((hall) => {

            return hall.isBooked == isbooked
        })

        return res.status(200).json({ message: "successfully got the room details", customerdetails })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error" })

    }





})

//5. List how many times a customer has a booked with below details

app.get("/customerdetails/:customername", (req, res) => {

    try {
        const { customername } = req.params
        const filterhall = hallstatus.filter((hall) => {
            return hall.customerName == customername
        })
        const bookingTimes = filterhall.length

        return res.status(200).json({ message: "Got the customer details", filterhall, bookingTimes })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error" })
    }

})




//port running on this port

app.listen(8000, () => console.log('server running in localhost:8000'))





