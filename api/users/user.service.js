const pool = require("../../config/database");

module.exports ={
    create:(data,callBack) =>{
        pool.query(
            `insert into regcheck(firstname,lastname,gender,email,password,number)
            values(?,?,?,?,?,?)`,

            [
                data.firstname,
                data.lastname,
                data.gender,
                data.email,
                data.password,
                data.number
            ],
            (error,results,fields)=>{
                if(error){
                   return callBack(error);
                }
                return callBack(null,results);
            }
        )
    },
    getUsers: callBack =>{
        pool.query(
            `select id,firstname,lastname,gender,email,password,number from regcheck`,
            [],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        );
        
    },
    getUserByUserId:(id,callBack)=>{
        pool.query(
            `select id,firstname,lastname,gender,email,password,number from regcheck where id= ? `,
            [id],
            (error,results,fields)=>{
                if(error){
                    callBack(error);
                }
                return callBack(null,results[0]);//Since results is in array format we need only one result at a time for a paticular id
            }
        );
    },
    updateUser:(data,callBack)=>{
        pool.query(
            `update regcheck firstname=?,lastname=?,gender=?,email=?,password=?,number=? where id=?`,
            [
                data.firstname,
                data.lastname,
                data.gender,
                data.email,
                data.password,
                data.number,
                data.id
            ],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        );
    },
    deleteUser:(data,callBack)=>{
        pool.query(
         `delete from regcheck where id=?`,
         [data.id],
         (error,results,fields)=>{
             if(error){
                 return callBack(error);
             }
             return callBack(null,results[0]);
         }

        );
    },

    getUserByUserEmail:(email,callBack) =>{
        pool.query(
            `select * from regcheck where email=?`,
            [email],
            (error,results,fields)=>{
              if(error){
                   callBack(error);
              }
              return callBack(null,results[0]);
            }
        );
    }

};
