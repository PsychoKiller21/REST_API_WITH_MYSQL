const {create, getUsers , getUserByUserId, updateUser , deleteUser ,getUserByUserEmail} = require('./user.service');
const {genSaltSync , hashSync ,compareSync} = require('bcrypt');
const {sign} = require('jsonwebtoken');

module.exports = {
    createUser:(req,res) =>{
        const body =req.body;
        const salt = genSaltSync(10);
        body.password =hashSync(body.password,salt);
        create(body,(err,results)=>{
            if(err){
                console.log(err);
            return res.status(400).json({
                success:0,
                message:"Database connection error"
            
              });
            }
            return res.status(200).json({
                success:1,
                data:results
            });
        });

    },

    getUserByUserId:(req,res) =>{
        const id=req.params.id;
        getUserByUserId(id,(error,results)=>{
            if(error){
                console.log(error);
                return;
            }
            if(!results){
                return res.json({
                    success:0,
                    message:"Record Not Found"
                });
            }
            return res.json({
                success:1,
                data:results
            });
        });

    },

    getUsers:(req,res) =>{
        getUsers((error,results) =>{
            if(error){
                console.log(error);
                return;
            }
            return res.json({
                success:1,
                data:results
            });


        });
    },

    updateUser:(req,res) =>{
     const body=req.body;
     const salt =genSaltSync(10);
     body.password=hashSync(body.password,salt);
     updateUser((error,results) => {
      if(error){
          console.log(error);
          return;
      }
      if(!results){
          return res.json({
              success:0,
              message:"Failed to update user"
          });
      }
      return res.json({
          success:1,
          message:"Updated Successfully"
      });

     });
    },

    deleteUser:(req,res) =>{
        const data=req.body
        deleteUser(data,(error,results)=>{
            if(error){
                console.log(error);
                return;
            }
            if(!results){
                res.json({
                    success:0,
                    message:"NO such element found"
                });
            }
            res.json({
                success:1,
                message:"User Deleted Successfully"
            });
        });
    },
    login:(req,res) =>{
       const body=req.body;
       getUserByUserEmail(body.email,(error,results)=>{
           if(error){
               console.log(error);
           }
           if(!results){
               return res.json({
                   success:0,
                   data:"Invalid username or password"
               });
           }
           const result= compareSync(body.password,results.password);
           if(result)
           {
               results.password=undefined;
               const jsontoken=sign({result:results},"qwe1234",{expiresIn:"1hr"})
               return res.json({
                success:1,
                message:"Login Successfully",
                token:jsontoken
            });
           }
           else
           {
              return res.json({
                  success:0,
                  message:"Invalid username or password"
              });
           }
           
       });

    }


};