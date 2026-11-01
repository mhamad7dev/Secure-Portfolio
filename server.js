const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = Number(process.env.PORT) || 3002;
const JWT_SECRET = 'SuperSecretKeyForJWT2026!@#';

// إعدادات CORS شاملة ودقيقة لمنع أي مشاكل اتصال
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// مسار تجريبي للتأكد أن السيرفر يعمل
app.get('/', (req, res) => {
    res.send('السيرفر يعمل بنجاح!');
});

// بيانات الأدمن
const mockUser = {
    email: "M.Code737",
    password: "zK9#vL7!mP$2026"
};

// مسار تسجيل الدخول
app.post('/api/login', (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "يرجى تقديم البريد الإلكتروني وكلمة السر" });
        }

        if (email === mockUser.email && password === mockUser.password) {
            const token = jwt.sign(
                { email: mockUser.email },
                JWT_SECRET,
                { expiresIn: '1h' }
            );
            return res.status(200).json({
                message: "تم تسجيل الدخول بنجاح",
                token: token
            });
        } else {
            return res.status(401).json({ message: "البريد الإلكتروني أو كلمة السر غير صحيحة" });
        }
    } catch (error) {
        console.error("خطأ في الخادم:", error);
        return res.status(500).json({ message: "خطأ داخلي في السيرفر" });
    }
});

// تشغيل السيرفر
app.listen(PORT, () => {
    console.log(`السيرفر شغال على http://localhost:${PORT}`);
});