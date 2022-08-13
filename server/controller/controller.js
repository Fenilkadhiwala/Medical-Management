var Userdb = require('../model/model')

//CREATE AND SAVE NEW USER
exports.create = (req, res) => {
    //VALIDATE THE REQ
    if (!req.body) {
        res.status(400).send({ message: "Content Can Not Be Empty!" })
        return;
    }

    //NEW USER
    const user = new Userdb({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status
    })

    //SAVE USER IN THE DB
    user
        .save(user)
        .then(data => {
            // res.send(data)
            res.redirect("/add-user")
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating user"
            })
        })
}

//RETRIVE AND RETURN THE ALL USERS/SINGLE USER
exports.find = (req, res) => {

    if (req.query.id) {
        const id = req.query.id

        Userdb.findById(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: "Not Found User With Id " + id })
                }

                else {
                    res.send(data)
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error While Retriving user with id = " + id
                })
            })
    }

    else {
        Userdb.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while finding user"
                })
            })
    }



}

//UPDATE A NEW IDENTIFIED USER BY USER ID
exports.update = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update user information"})
        })
}
//DELETE A NEW IDENTIFIED USER BY USER ID
exports.delete = (req, res) => {

    const id = req.params.id;
    Userdb.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Can't Delete user with id ${id},May be ID is wrong` })
            }
            else {
                res.send({ message: "User Was Deleted Successfully!" })
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Can't Delete Specified User" })
        })
}