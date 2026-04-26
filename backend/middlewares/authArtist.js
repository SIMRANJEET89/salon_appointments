import jwt from 'jsonwebtoken'

const authArtist = async (req,res,next) => {
    try {
        const artistToken  = req.headers.artisttoken

        console.log(artistToken);
        if (!artistToken) {
            return res.json({
                success: false,
                message: 'Not Authorized Login Again'
            })
            
        }
        
        

        const token_decode = jwt.verify(artistToken, process.env.JWT_SECRET)

        req.artId = token_decode.id
        next()
        
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error });
        
    }
}
export default authArtist