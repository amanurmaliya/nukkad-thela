const logOut = async(req, res) => {
    try{

        res.clearCookie("userInfo", { httpOnly: true, secure: true, sameSite: "None" });
        return res.json({ success: true, message: "Logged out successfully" });
    }
    catch(error)
    {
        return res.json({ success: false, message: "Failed Due To Some Reasons" });

    }
}

module.exports = logOut
