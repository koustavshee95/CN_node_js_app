//export default keep 3 things:
//1. Hoisted Decleration 
//2.Class
//3.assignment expression




import { body,validationResult } from "express-validator";

const  validateRequest = async(req,res,next)=>{


    //Validate data:from npm package.
    //There are few step to execute.
    //1.setip the rules for validation.

    console.log(req.body);
    const rules = [
        body('name').notEmpty().withMessage("name is reqired."),
        body('price').isFloat({gt:0}).withMessage("The price should be positive Value and not empty"),
        
         body('imageUrl').custom((Value,{req})=>{
            if (!req.file) {
                throw new Error("Image is required.")
            }; 
            return true;
         })
    ];

    //2.Run those rules.

    await Promise.all(rules.map(rule=>rule.run(req)));

    //3.Check if there are any errors after running the rules.
        var ValidationErrors = validationResult(req);

    //4.If there are any error then returns error message.   
    console.log(ValidationErrors); 
    if (!ValidationErrors.isEmpty()) {
            return res.render("new_product",
            {errorMessage:ValidationErrors.array()[0].msg});
        }
        next();
        
    };

    export default validateRequest;

