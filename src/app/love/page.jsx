"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function LovePage() {
    const [name, setName] = useState("");
    const [noPosition, setNoPosition] = useState({ top: "auto", left: "auto" });
    const [loveAccepted, setLoveAccepted] = useState(false);
    const [shouldMove, setShouldMove] = useState(false);
    const [eyeBallPosition, setEyeBallPosition] = useState({ x: 0, y: 0 });

    const router = useRouter();

    useEffect(() => {
        const storedName = localStorage.getItem("username");
        if (!storedName) {
            router.push("/");
        } else {
            setName(storedName);
        }
    }, [router]);

    const moveNoButton = (e) => {
        setShouldMove(true);
        const randomX = Math.random() * 80;
        const randomY = Math.random() * 80;
        setNoPosition({ top: `${randomY}%`, left: `${randomX}%` });

        // Move eyeballs inside eyes
        const rect = e.target.getBoundingClientRect();
        setEyeBallPosition({ x: (rect.left % 10) - 5, y: (rect.top % 10) - 5 });
    };

    const sendEmailNotification = async () => {
        setLoveAccepted(true);
        const response = await fetch("http://localhost:5000/send-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name }),
        });

        if (response.ok) {
            console.log("Email sent successfully!");
        } else {
            console.error("Failed to send email.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen relative">
            {!loveAccepted ? (
                <>
                    {/* Character */}
                    <motion.div
                        initial={{ rotate: 0 }}
                        animate={{ rotate: 10 }}
                        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                        className="relative mb-6"
                    >
                        {/* Head */}
                        <div className="w-24 h-24 bg-yellow-300 rounded-full flex flex-col items-center justify-center relative">
                            {/* Eyes */}
                            <div className="absolute flex space-x-4">
                                <div className="relative w-8 h-8 bg-white border-2 border-black rounded-full flex items-center justify-center">
                                    <motion.div
                                        animate={{ x: eyeBallPosition.x, y: eyeBallPosition.y }}
                                        transition={{ type: "spring", stiffness: 100 }}
                                        className="w-3 h-3 bg-black rounded-full"
                                    ></motion.div>
                                </div>
                                <div className="relative w-8 h-8 bg-white border-2 border-black rounded-full flex items-center justify-center">
                                    <motion.div
                                        animate={{ x: eyeBallPosition.x, y: eyeBallPosition.y }}
                                        transition={{ type: "spring", stiffness: 100 }}
                                        className="w-3 h-3 bg-black rounded-full"
                                    ></motion.div>
                                </div>
                            </div>
                            {/* Arms (Crossed) */}
                            <div className="absolute -bottom-4 flex space-x-2">
                                <div className="w-6 h-6 bg-yellow-400 rounded-full transform -rotate-45"></div>
                                <div className="w-6 h-6 bg-yellow-400 rounded-full transform rotate-45"></div>
                            </div>
                        </div>
                    </motion.div>

                    <h1 className="text-3xl mb-6">Do you love me?</h1>

                    <div className="flex space-x-6">
                        <button
                            onClick={sendEmailNotification}
                            className="px-6 py-2 bg-green-500 text-white rounded text-lg"
                        >
                            Yes
                        </button>

                        <button
                            onMouseEnter={moveNoButton}
                            style={shouldMove ? { position: "absolute", ...noPosition } : {}}
                            className="px-6 py-2 bg-red-500 text-white rounded text-lg"
                        >
                            No
                        </button>
                    </div>
                </>
            ) : (
                <>
                    {/* Character Blushes */}
                    <motion.div
                        initial={{ rotate: 0 }}
                        animate={{ rotate: 0 }}
                        className="relative mb-6"
                    >
                        {/* Head */}
                        <div className="w-24 h-24 bg-yellow-400 rounded-full flex flex-col items-center justify-center relative border-4 border-black">
                            {/* Blush */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                className="absolute bottom-2 flex space-x-4"
                            >
                                <div className="w-5 h-3 bg-red-400 rounded-full"></div>
                                <div className="w-5 h-3 bg-red-400 rounded-full"></div>
                            </motion.div>

                            {/* Hands covering eyes */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                                className="absolute -bottom-2 flex space-x-2"
                            >
                                <div className="w-6 h-6 bg-yellow-400 rounded-full"></div>
                                <div className="w-6 h-6 bg-yellow-400 rounded-full"></div>
                            </motion.div>
                        </div>
                    </motion.div>

                    <h1 className="text-3xl text-pink-600">I love you too ❤️</h1>
                </>
            )}
        </div>
    );
}