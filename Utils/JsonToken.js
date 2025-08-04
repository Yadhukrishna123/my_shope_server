const jwt = require("jsonwebtoken")

exports.getToken = async (req, res) => {
    const userId = req.user._id

    const options = {
        id: userId,
        time: Date.now()
    }
     const cookieParams = { httpOnly: true, sameSite: "none", secure: true };

    const token = await jwt.sign(options, process.env.jwt_secret_key, { expiresIn: "10min" })

    if (!token) {
        return res.status(500).json({
            success: false,
            message: "Faild to generate token!",
            isAuthentication: false
        })
    }
    console.log("token", token);


    res.status(200).cookie("token",token, cookieParams).json({
        success: true,
        message: "You are successfully logged !",
        isAuthenTication: true,
        user:req.user,
        
    })

}