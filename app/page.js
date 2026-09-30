import Link from "next/link";

export default function Home() {
  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h1>Appliance Register</h1>
      <p>Register your appliances and keep track of their warranties.</p>
      <ul style={{ lineHeight: "2" }}>
        <li><Link href="/part-b-c">Register an appliance</Link></li>
        <li><Link href="/search">Search by serial number</Link></li>
        <li><Link href="/update">Update a warranty date</Link></li>
        <li><Link href="/delete">Delete an appliance</Link></li>
      </ul>
      <p style={{ marginTop: "30px", color: "#666" }}>
        Part A exercise: <Link href="/part-a">cinema booking form</Link>
      </p>
    </div>
  );
}
