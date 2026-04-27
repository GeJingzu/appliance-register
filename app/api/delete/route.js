import mysql from 'mysql2/promise';
import xss from 'xss';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const body = await req.json();
        const serial = xss(body.serial); // sanitize

        const db = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME
        });

        // delete query
        const [result] = await db.execute('DELETE FROM Appliance WHERE SerialNumber = ?', [serial]);
        await db.end();

        // check if anything was actually deleted
        if (result.affectedRows > 0) {
            return NextResponse.json({ message: 'Deleted' }, { status: 200 });
        } else {
            return NextResponse.json({ error: 'Not found' }, { status: 404 });
        }

    } catch (err) {
        console.log(err);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}