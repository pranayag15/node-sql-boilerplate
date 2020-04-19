const {query} = require('../../config/db')
  
	    //********** START: usersInsert **********
		module.exports.usersInsert =  (req, res) => {
			let sql = "INSERT INTO users SET ?"
			query(sql, [req.body]).then((data) => {
				res.status(200).json(data)
			}).catch((err) => {
				res.status(400).json({message: 'Bad Request', error: err})
			})
		}
		//********** END: usersInsert **********
 
		//********** START: usersUpdate **********
		module.exports.usersUpdate= (req, res) => {
			let sql = "REPLACE INTO users SET ?"
			query(sql, [req.body]).then((data) => {
				res.status(200).json(data)
			}).catch((err) => {
				res.status(400).json({message: 'Bad Request', error: err})
			})
		}
		//********** END: usersUpdate **********
 
		//********** START: usersPatch **********
		module.exports.usersPatch= (req, res) => {
			let sql = "UPDATE users SET ? where userID = ?"
			let temp = req.params.usersid.split("___")
			temp.unshift(req.body)
			query(sql, temp).then((data) => {
				res.status(200).json(data)
			}).catch((err) => {
				res.status(400).json({message: 'Bad Request', error: err})
			})
		}
		//********** END: usersPatch **********
  
		//********** START: usersDeleteByID **********
		module.exports.usersDeleteByID= (req, res) => {
			let sql = "DELETE FROM users where userID = ?"
			query(sql, req.params.usersid.split("___")).then((data) => {
					res.status(200).json(data)
			}).catch((err) => {
					res.status(400).json({message: 'Bad Request', error: err})
			})
		}
		//********** END: usersDeleteByID //**********

		//********** START: usersGetAll //**********
		module.exports.usersGetAll = (req, res) => {
			// let queryObj = queryGeneratorForGet(req, "users","users","users", 1)
            let sql = ' SELECT  users.*  FROM users'
            query(sql).then((data) => {
				res.status(200).json(data)
			}).catch((err) => {
				res.status(400).json({message: 'Bad Request', error: err})
			})
		}
		//********** END: usersGetAll **********
	
		//********** START: usersGetByID **********
		module.exports.usersGetByID = (req, res) => {
            let sql = 'SELECT  users.*  FROM users WHERE  users.userID = ?'
            console.log(req.params)
			// let queryObj = queryGeneratorForGet(req, "users","users","users", 2)
			query(sql, req.params.usersid).then((data) => {
				res.status(200).json(data)
			}).catch((err) => {
				res.status(400).json({message: 'Bad Request', error: err})
			})
		}
		//********** END: usersGetByID **********