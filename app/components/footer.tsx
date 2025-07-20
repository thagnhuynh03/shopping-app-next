import Link from "next/link";
import { notoSerif } from "../constants/fonts";
import { FacebookOutlined, InstagramOutlined, TwitterOutlined } from "@ant-design/icons";

export default async function Footer() {
    return (
        <footer className={`${notoSerif.className} text-[#8a745c] w-full`}>
            <div className="flex flex-col items-center gap-7 py-10">
                <div className="w-full flex justify-around">
                    <Link href=''>About Us</Link>
                    <Link href=''>Contact</Link>
                    <Link href=''>FAQ</Link>
                    <Link href=''>Privacy Policy</Link>
                </div>
                <div className="flex gap-3">
                    <TwitterOutlined style={{ color: "#8a745c" }}/>
                    <InstagramOutlined />
                    <FacebookOutlined />
                </div>
                <div>
                    <p>@2025 Retro Threads. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}