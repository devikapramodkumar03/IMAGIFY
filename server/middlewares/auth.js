import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.json({
      success: false,
      message: "Not authorized. Login again.",
    });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

    if (tokenDecode.id) {
      req.userId = tokenDecode.id;
    } else {
      return res.json({ success: false, message: "Not authorized. Login again." });  // ← Added 'return'
    }

    next();
  } catch (error) {
    return res.json({ success: false, message: error.message });  // ← Added 'return'
  }
};

export default userAuth;