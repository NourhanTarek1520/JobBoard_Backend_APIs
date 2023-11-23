const { connectDb } = require("../Config/connect_db")
const util = require("util")
class Application {
    constructor(userID, jobID, cv, protfolio, applaiedOn) {
        this.userID = userID,
            this.jobID = jobID,
            this.cv = cv,
            this.protfolio = protfolio,
            this.applaiedOn = applaiedOn;
    }
    //========================= Getters ==================================
    getId() { return this.id; }
    getUserID() { return this.userID; }
    getJobID() { return this.jobID; }
    getCV() { return this.cv; }
    getProtfolio() { return this.protfolio; }
    getApplaiedOn() { return this.applaiedOn; }

    //=================================================== all setters ================================================
    setCV(value) { this.cv = value; }
    setProtfolio(value) { this.protfolio = value; }
    setUserId(value) { this.userID = value }
    setJobId(value) { this.jobID = value }
    setId(value) { this.id =value ; }
    setApplaiedOn(value) { this.applaiedOn = value; }
    //=====================================CRUDS Operations on candidates ================================================
    static query = util.promisify(connectDb.query).bind(connectDb);

    // using (userID AND jobID as a primary key) using by user
    static async addNew(application) {
        try {

            //pass this id to insert into applications
            const result = await this.query("INSERT INTO applications set ?", application)

            if (result.affectedRows === 1) {
                console.log('applications inserted successfully!');
                return true;
            } else {
                console.error('Error inserting applications!');
                return false;
            }
        } catch (error) {
            console.log(error)

        }


    }
    static async delete(userId, jobId) {
        try {

            const result = await this.query(`DELETE FROM applications WHERE  userID = ${userId} && jobID=${jobId}  ;`)

            if (result.affectedRows === 1) {
                console.log('applications deleted successfully!');
                return true;
            } else {
                console.error('Error deleting  applications!');
                return false;
            }
        } catch (error) {
            console.log(error)

        }

    }
    static async update(application) {
        try {

            // const result  = await this.query(`UPDATE applications SET jobID =${applications.jobID},cv =${applications.cv},protfolio=${applications.protfolio} ,applaiedOn=${applications.applaiedOn}  WHERE  userID = ${applications.userID} && jobID=${applications.jobID}  ;`) 
            const result = await this.query(`UPDATE applications SET protfolio =${application.protfolio} , cv =${application.cv}  WHERE  id = ${application.id} ;`)

            if (result.affectedRows === 1) {
                console.log('applications updated successfully!');
                return true;
            } else {
                console.error('Error deleting  applications!');
                return false;
            }
        } catch (error) {
            console.log(error)

        }
    }


    static async getUserApplications(userId) {
        // get all user_appications for user  that he applied for 
        try {
            const result = await this.query(`select * from applications  WHERE  userID = ${userId} `)
            return result
            // if (result.length =! 0) {
            //     return result
            // }

        } catch (error) {
            console.log(error)
        }

    }
    static async getUserApplication(userId, jobId) {
        // get user_appication for user  that he applied for in specific job
        try {
            const result = await this.query(`select * from applications  WHERE  userID = ${userId} && jobID=${jobId} `)
            return result
        } catch (error) {
            console.log(error)
        }

    }


    static async getJobApplications(jobId) {
        // get all appications for specific job 
        try {
            const result = await this.query(`select * from applications  WHERE  jobID = ${jobId} `)
            return result
        } catch (error) {
            console.log(error)
        }

    }
    static async getApplicationById(applicationId) {
        // get user_appication for user  that he applied for in specific job
        try {
            const result = await this.query(`select * from applications  WHERE  id = ${applicationId}  `)
            return result
        } catch (error) {
            console.log(error)
        }

    }


    static async appliedBefore(userId, jobId) {
        try {
            const result = await this.query(`select * from applications  WHERE   userID= ${userId} && jobID=${jobId} `)
            if (result.length === 0) return false;
            else return true
        } catch (error) {
            console.log(error)
        }

    }
    static async getApplicationId(userId, jobId) {
        try {
            const result = await this.query(`select id from applications  WHERE  userID = ${userId} && jobID=${jobId} `)
            return result
        } catch (error) {
            console.log(error)
        }
    }





    /*
    
        // useing the id of the row  using by admin
        static async getByID(id) {
            try {
                const result = await this.query(`select * from applications  WHERE  id = ${id} `)
                return result
            } catch (error) {
                console.log("Can not get data from DB getByID :  " + error)
            }
    
        }
        static async deleteByID(id) {
            try {
    
                const result = await this.query(`DELETE FROM applications WHERE  id = ${id} ;`)
    
                if (result.affectedRows === 1) {
                    console.log('applications deleted successfully!');
                    return true;
                } else {
                    console.error('Error deleting  applications!');
                    return false;
                }
            } catch (error) {
                console.log(  error)
    
            }
    
        }
        static async updateByID(application, id) {
            try {
    
                const result = await this.query(`UPDATE applications SET jobID =?,cv =? ,protfolio= ? ,applaiedOn=? WHERE id =?  ;`,
                    [application.jobID, application.cv, application.protfolio, application.applaiedOn, id])
    
                if (result.affectedRows === 1) {
                    console.log('applications updated successfully!');
                    return true;
                } else {
                    console.error('Error deleting  applications!');
                    return false;
                }
            } catch (error) {
                console.log(  error)
    
            }
        }
    
    */
}

module.exports = { Application }