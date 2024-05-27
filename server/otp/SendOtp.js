import nodemailer from 'nodemailer';


export const otp = async(req,res)=>{
    try{
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'jazmyne43@ethereal.email',
                pass: 'v6sdV4QWmtVbSj3w1D'
            }
        });
        
        
        // async function main() {
            // send mail with defined transport object
            const info = await transporter.sendMail({
              from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
              to: "prateeky562@gmail.com", // list of receivers
              subject: "Hello ✔", // Subject line
              text: "Hello world?", // plain text body
              html: "<b>Hello world?</b>", // html body
            });
          
            console.log("Message sent: %s", info.messageId);
            // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
             res.json(info);  
          
        //   main().catch(console.error);
    }
    catch(e){
        console.log(e);
    }
}