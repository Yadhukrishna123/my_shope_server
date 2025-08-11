const Users = require("../Models/usermodel")
const bcrypt = require("bcrypt")
// const UserAddress = require("../Models/addressModel")
const { getToken } = require("../Utils/JsonToken")



exports.userSignup = async (req, res) => {
    const { fullName, email, password } = req.body
    const hashPassword = await bcrypt.hash(password, 10)

    try {
        const user = await Users.create({
            fullName,
            email,
            password: hashPassword
        })
        if (!user) {
            return res.status(500).json({
                success: false,
                message: " Signup faild "
            })
        }

        res.status(200).json({
            success: true,
            message: "Registration successfully completed"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }

}

exports.userlogin = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await Users.findOne({ email })
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "invalied email or password!",
                isAuthenTication: false,
            })
        }
        const isPassword = await bcrypt.compare(password, user.password)

        if (!isPassword) {
            return res.status(401).json({
                success: false,
                message: "Invalied credential!",
                isAuthenTication: false,
            })
        }

        req.user = user
        getToken(req, res)

        // res.status(200).json({
        //     success: true,
        //     message: "You are successfully logged !",
        //     isAuthenTication: true,
        //     user
        // })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.userAddress = async (req, res) => {
    const userId = req.user.id;
   
    const {
        fullName,
        phone,
        pincode,
        address,
        city_district_town,
        state,
        landMark
    } = req.body;

    try {
        const user = await Users.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const newAddress = {
            fullName,
            phone,
            pincode,
            address,
            city_district_town,
            state,
            landMark
        };

       
        
        const updatedUser = await Users.findByIdAndUpdate(
            userId,
            { $push: { addresses: newAddress } },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }


        res.status(200).json({
            success: true,
            message: "Youe registration is successfully completed",
            addresses: updatedUser.addresses
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.getAllUser = async (req, res) => {
    console.log(req.cookies);

    try {
        const users = await Users.find()
        if (!users) {
            return res.status(500).json({
                success: true,
                message: "users not found"
            })
        }
        res.status(200).json({
            successs: true,
            message: "users fatched successfully",
            users,

        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
