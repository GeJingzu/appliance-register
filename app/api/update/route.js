import mysql from 'mysql2/promise';
import xss from 'xss';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const body = await req.json();
        const serial = xss(body.serial);
        const date = xss(body.date); // sanitize inputs

        const db = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME
        });

        // check if serial exists first
        const [check] = await db.execute('SELECT * FROM Appliance WHERE SerialNumber = ?', [serial]);
        
        if (check.length === 0) {
            await db.end();
            return NextResponse.json({ error: 'Serial number does not exist' }, { status: 400 });
        }

        // update table
        await db.execute('UPDATE Appliance SET WarrantyExpirationDate = ? WHERE SerialNumber = ?', [date, serial]);
        await db.end();

        return NextResponse.json({ message: 'Updated' }, { status: 200 });

    } catch (err) {
        console.log(err);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}