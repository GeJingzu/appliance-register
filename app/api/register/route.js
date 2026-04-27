import mysql from 'mysql2/promise'; // use promise version for next.js
import xss from 'xss';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const body = await req.json();

        // 1. sanitize inputs
        const firstName = xss(body.firstName);
        const email = xss(body.email);
        const serial = xss(body.serial);
        const eircode = xss(body.eircode);

        // 2. regex validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json({ error: 'invalid email format' }, { status: 400 });
        }

        // 3. connect to db
        const db = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME
        });

        // 4. check if appliance exists
        const [existing] = await db.execute('SELECT * FROM Appliance WHERE SerialNumber = ?', [serial]);
        if (existing.length > 0) {
            await db.end();
            return NextResponse.json({ error: 'appliance already exists' }, { status: 400 });
        }

        // 5. insert user
        const [userResult] = await db.execute(
            'INSERT INTO User (FirstName, Email, Eircode) VALUES (?, ?, ?)',
            [firstName, email, eircode]
        );
        const userId = userResult.insertId; // get the new user ID

        // 6. insert appliance linked to user
        await db.execute(
            'INSERT INTO Appliance (UserID, ApplianceType, Brand, ModelNumber, SerialNumber, PurchaseDate, WarrantyExpirationDate) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [userId, body.type, body.brand, body.model, serial, body.buyDate, body.warnDate]
        );

        await db.end(); // close db
        return NextResponse.json({ message: 'appliance added successfully' }, { status: 200 });

    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'server error' }, { status: 500 });
    }
}