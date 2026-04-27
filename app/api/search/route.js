import mysql from 'mysql2/promise';
import xss from 'xss';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const body = await req.json();
        const serial = xss(body.serial); // sanitize input

        // connect db
        const db = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME
        });

        // get appliance and user info
        const query = `
            SELECT a.*, u.FirstName, u.Email 
            FROM Appliance a 
            JOIN User u ON a.UserID = u.UserID 
            WHERE a.SerialNumber = ?
        `;
        
        const [rows] = await db.execute(query, [serial]);
        await db.end(); // close connection

        // check if record exists
        if (rows.length > 0) {
            return NextResponse.json({ appliance: rows[0] }, { status: 200 });
        } else {
            return NextResponse.json({ error: 'Appliance not found' }, { status: 404 });
        }

    } catch (err) {
        console.log(err);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}